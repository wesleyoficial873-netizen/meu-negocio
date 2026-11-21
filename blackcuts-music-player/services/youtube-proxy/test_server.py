import unittest
from unittest.mock import patch
import server


class SearchTests(unittest.TestCase):
    def test_transform_discards_invalid_ids_and_decodes_text(self):
        result = server.transform({'items': [
            {'id': {'videoId': 'abcdefghijk'}, 'snippet': {'title': 'Rock &amp; Roll', 'channelTitle': 'Canal', 'thumbnails': {'medium': {'url': 'https://example.com/cover'}}}},
            {'id': {'videoId': 'bad'}, 'snippet': {'title': 'Ignored'}},
        ]})
        self.assertEqual(result['items'], [{'id': 'abcdefghijk', 'title': 'Rock & Roll', 'channel': 'Canal', 'thumbnail': 'https://example.com/cover'}])

    def test_search_uses_official_endpoint_and_does_not_return_key(self):
        class Response:
            def __enter__(self): return self
            def __exit__(self, *args): pass
            def read(self, limit): return b'{"items":[]}'
        with patch('server.urlopen', return_value=Response()) as call:
            self.assertEqual(server.search('musica', 'private-key'), {'items': []})
            self.assertTrue(call.call_args.args[0].full_url.startswith('https://www.googleapis.com/youtube/v3/search?'))


if __name__ == '__main__':
    unittest.main()
