"""Azərbaycanca tərcüməni data/*.js faylına yazır.
İstifadə: python3 tools/az_apply.py a12   → tools/az/a12.txt oxunur, data/a12.js yenilənir.
tools/az/<ad>.txt sətirləri data faylı ilə eyni formatdadır:  koreyaca|məna|birləşmə=məna;...|qeyd
Sətirlər sıra ilə uyğunlaşdırılır (koreyaca söz və birləşmələrin koreyaca hissəsi eyni olmalıdır)."""
import os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
name = sys.argv[1]
dp = os.path.join(ROOT, 'data', name + '.js')
tp = sys.argv[2] if len(sys.argv) > 2 else os.path.join(ROOT, 'tools', 'az', name + '.txt')
src = open(dp, encoding='utf-8').read()
a = src.index('text:`') + 6
b = src.rindex('`')
lines = src[a:b].split('\n')
tr = [l.rstrip('\n') for l in open(tp, encoding='utf-8') if l.strip() and not l.startswith('#') and '|' in l]

def pk(ps):
    return [p.split('=')[0].strip() for p in ps.split(';') if p.strip()]

i = 0; done = 0; warn = []
for t in tr:
    f = [x.strip() for x in t.split('|')]
    while i < len(lines) and not (lines[i] and not lines[i].startswith('#') and '|' in lines[i] and lines[i].split('|')[0].strip() == f[0]):
        i += 1
    if i >= len(lines):
        sys.exit('tapılmadı: ' + f[0])
    old = [x.strip() for x in lines[i].split('|')]
    if len(old) > 2 and len(f) > 2 and pk(old[2]) != pk(f[2]):
        warn.append(f[0])
    lines[i] = '|'.join(f).rstrip('|')
    i += 1; done += 1
open(dp, 'w', encoding='utf-8').write(src[:a] + '\n'.join(lines) + src[b:])
print(name, done, 'sətir yeniləndi', ('· birləşmə fərqi: ' + ' '.join(warn)) if warn else '')
