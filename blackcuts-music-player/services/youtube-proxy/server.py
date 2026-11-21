"""Example YouTube Data API proxy. Run behind an authenticated HTTPS gateway, not directly on the internet."""
import html
import json
import os
import re
import time
from collections import defaultdict, deque
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from threading import Lock
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, urlencode, urlparse
from urllib.request import Request, urlopen

API_URL = 'https://www.googleapis.com/youtube/v3/search'
REQUESTS = defaultdict(deque)
LOCK = Lock()


def transform(payload):
    items = []
    for item in payload.get('items', []):
        video_id = item.get('id', {}).get('videoId', '')
        if not re.fullmatch(r'[A-Za-z0-9_-]{11}', video_id):
            continue
        snippet = item.get('snippet', {})
        thumbnail = snippet.get('thumbnails', {}).get('medium', {}).get('url', '')
        items.append({'id': video_id, 'title': html.unescape(snippet.get('title', '')),
                      'channel': html.unescape(snippet.get('channelTitle', '')),
                      'thumbnail': thumbnail if thumbnail.startswith('https://') else None})
    return {'items': items}


def search(query, key):
    params = urlencode({'part': 'snippet', 'type': 'video', 'videoCategoryId': '10',
                        'maxResults': 20, 'q': query, 'key': key})
    request = Request(API_URL + '?' + params, headers={'Accept': 'application/json'})
    with urlopen(request, timeout=12) as response:
        data = response.read(512 * 1024 + 1)
    if len(data) > 512 * 1024:
        raise ValueError('upstream response too large')
    return transform(json.loads(data))


class Handler(BaseHTTPRequestHandler):
    def respond(self, code, data):
        body = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path != '/api/search':
            return self.respond(404, {'error': 'not found'})
        query = parse_qs(parsed.query).get('q', [''])[0].strip()
        if not 1 <= len(query) <= 200:
            return self.respond(400, {'error': 'invalid query'})
        key = os.environ.get('YOUTUBE_API_KEY')
        if not key:
            return self.respond(503, {'error': 'service not configured'})
        now = time.monotonic()
        with LOCK:
            queue = REQUESTS[self.client_address[0]]
            while queue and queue[0] <= now - 60:
                queue.popleft()
            if len(queue) >= 30:
                return self.respond(429, {'error': 'rate limit'})
            queue.append(now)
        try:
            return self.respond(200, search(query, key))
        except (HTTPError, URLError, ValueError, OSError):
            return self.respond(502, {'error': 'upstream unavailable'})

    def log_message(self, format, *args):
        # Query terms and upstream credentials are not recorded in access logs.
        pass


if __name__ == '__main__':
    ThreadingHTTPServer(('127.0.0.1', int(os.environ.get('PORT', '8080'))), Handler).serve_forever()
