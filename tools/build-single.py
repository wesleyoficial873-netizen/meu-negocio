#!/usr/bin/env python3
"""
Gera henrique-sites-catalogos.html: um único arquivo .html independente,
com CSS, dados, renderizadores e runtime embutidos, e imagens locais
convertidas para data URI.

Uso:  python3 tools/build-single.py
"""
import base64
import glob
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'henrique-sites-catalogos.html')
OPT_DIR = '/tmp/meu-negocio-opt'
MAX_W = 1200
QUALITY = 72


def optimize(src):
    """Cópia redimensionada/recomprimida para embutir (mantém o original intacto)."""
    os.makedirs(OPT_DIR, exist_ok=True)
    dst = os.path.join(OPT_DIR, os.path.basename(src))
    try:
        subprocess.run(['convert', src, '-resize', '%dx%d>' % (MAX_W, MAX_W),
                        '-quality', str(QUALITY), '-strip', dst], check=True)
        if os.path.exists(dst) and os.path.getsize(dst) > 0:
            return dst
    except Exception:
        pass
    return src


def local_images():
    files = glob.glob(os.path.join(ROOT, 'assets/img/*/*.jpg'))
    out = {}
    for path in files:
        rel = os.path.relpath(path, os.path.join(ROOT, 'assets/img'))
        with open(optimize(path), 'rb') as fh:
            out[rel] = 'data:image/jpeg;base64,' + base64.b64encode(fh.read()).decode('ascii')
    return out


def patch_local_resolution(js):
    old = "if (ref.indexOf('l:') === 0) return 'assets/img/' + ref.slice(2);"
    new = ("if (ref.indexOf('l:') === 0) return (window.LOCAL_IMAGES && "
           "window.LOCAL_IMAGES[ref.slice(2)]) || 'assets/img/' + ref.slice(2);")
    return js.replace(old, new)


def main():
    html = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
    images = local_images()

    # CSS -> <style>
    for name in ('core', 'demo'):
        css = open(os.path.join(ROOT, 'assets/css/%s.css' % name), encoding='utf-8').read()
        tag = '<link rel="stylesheet" href="assets/css/%s.css">' % name
        if tag not in html:
            sys.exit('tag não encontrada: ' + tag)
        html = html.replace(tag, '<style>\n%s\n</style>' % css)

    # ordem de carregamento: dados -> renderizadores -> app
    data_files = sorted(os.listdir(os.path.join(ROOT, 'assets/js/data')))
    order = ['data/' + f for f in data_files]
    order += ['render/base.js', 'render/layouts-a.js', 'render/layouts-b.js',
              'render/layouts-c.js', 'app.js']

    # mapa de imagens locais precisa existir antes dos dados
    map_js = 'window.LOCAL_IMAGES=' + json.dumps(images) + ';'
    first = '<script src="assets/js/data/%s"></script>' % data_files[0]
    if first not in html:
        sys.exit('tag de dados não encontrada')
    hydrator = ('<script>document.querySelectorAll("img[data-local]").forEach(function(img){'
                'var k=img.getAttribute("data-local");if(window.LOCAL_IMAGES[k])img.src=window.LOCAL_IMAGES[k];});</script>')
    html = html.replace(first, '<script>%s</script>\n%s\n%s' % (map_js, hydrator, first))

    for rel in order:
        tag = '<script src="assets/js/%s"></script>' % rel
        if tag not in html:
            sys.exit('tag não encontrada: ' + tag)
        js = patch_local_resolution(open(os.path.join(ROOT, 'assets/js', rel), encoding='utf-8').read())
        if '</script' in js.lower():
            sys.exit('conteúdo com </script> em ' + rel)
        html = html.replace(tag, '<script>\n%s\n</script>' % js)

    # <img src="assets/img/..."> e og:image -> data-local (evita duplicar base64)
    for rel, uri in images.items():
        html = html.replace('src="assets/img/%s"' % rel, 'data-local="%s"' % rel)
        html = html.replace('"assets/img/%s"' % rel, '"%s"' % uri)

    html = html.replace('<head>', '<head>\n<!-- Arquivo único: CSS, dados e scripts embutidos. '
                                   'Basta abrir no navegador. -->', 1)

    with open(OUT, 'w', encoding='utf-8') as fh:
        fh.write(html)
    print('gerado %s (%.2f MB)' % (OUT, os.path.getsize(OUT) / 1048576))


if __name__ == '__main__':
    main()
