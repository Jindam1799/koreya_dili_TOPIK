#!/usr/bin/env python3
"""덩어리숲 · 검수 파일 반영 도구

Aslı가 게임의 '단어 검수' 모드에서 보낸 파일(deongeori-kontrol-....json)을
data/*.js 단어 데이터에 한꺼번에 반영합니다.

사용법:
    python3 tools/merge_review.py 검수파일.json [검수파일2.json ...]
    python3 tools/merge_review.py 검수파일.json --dry-run   # 바꾸지 않고 보고서만

- st='ok'   : 그대로 둠 (검수 완료로 기록)
- st='edit' : 튀르키예어 뜻과 짝꿍어휘를 새 내용으로 바꿈
- st='del'  : 그 단어 줄을 지움
- 메모(note)와 바뀐 내용은 tools/review_report.md 에 정리됩니다.
"""
import json, re, sys, pathlib, datetime

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = sorted((ROOT / 'data').glob('*.js'))


def clean(x):
    return str(x).replace('|', '/').replace(';', ',').replace('`', "'").replace('\n', ' ').strip()


def load_reviews(paths):
    items = {}
    for p in paths:
        d = json.loads(pathlib.Path(p).read_text(encoding='utf-8'))
        for k, v in d.get('items', {}).items():
            items[k] = v  # 나중 파일이 우선
    return items


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    dry = '--dry-run' in sys.argv
    if not args:
        print(__doc__); sys.exit(1)
    items = load_reviews(args)
    used = set()
    report = [f'# 검수 반영 보고서 ({datetime.date.today()})', '', f'파일: {", ".join(args)}', '']
    stats = {'ok': 0, 'edit': 0, 'del': 0}
    for f in DATA:
        text = f.read_text(encoding='utf-8')
        m = re.search(r"id:'([^']+)'", text)
        if not m:
            continue
        lv = m.group(1)
        start = text.index('`') + 1
        end = text.rindex('`')
        body = text[start:end].split('\n')
        seen, out, section = {}, [], []
        for line in body:
            s = line.strip()
            if not s or s.startswith('#'):
                out.append(line); continue
            rawko = s.split('|')[0].strip()
            mx = re.match(r'^(.+)#(\d+)$', rawko)
            if mx:  # açık işaret: aynı kelimenin 2. anlamı (ör. 배#2)
                ko = mx.group(1); wid = f'{lv}:{ko}#{mx.group(2)}'
            else:
                ko = rawko; base = f'{lv}:{ko}'
                seen[base] = seen.get(base, 0) + 1
                wid = base if seen[base] == 1 else f'{base}#{seen[base]}'
            r = items.get(wid)
            if not r:
                out.append(line); continue
            used.add(wid)
            st = r.get('st')
            stats[st] = stats.get(st, 0) + 1
            note = f" — 메모: {r['note']}" if r.get('note') else ''
            if st == 'del':
                section.append(f'- 🗑 **{ko}** ({s.split("|")[1]}){note}')
                continue
            if st == 'edit':
                tr = clean(r.get('tr', ''))
                pairs = ';'.join(f'{clean(a)}={clean(b)}' for a, b in r.get('pairs', []) if a and b)
                old_tr = s.split('|')[1]
                parts = s.split('|')
                extra = '|' + parts[3] if len(parts) > 3 and parts[3].strip() else ''
                out.append(f'{rawko}|{tr}|{pairs}{extra}')
                section.append(f'- ✏️ **{ko}**: {old_tr} → {tr}{note}')
                continue
            out.append(line)
            if note:
                section.append(f'- ✓ **{ko}**{note}')
        if section:
            report += [f'## {lv}', ''] + section + ['']
        if not dry:
            f.write_text(text[:start] + '\n'.join(out) + text[end:], encoding='utf-8')
    missing = [k for k in items if k not in used]
    if missing:
        report += ['## 찾지 못한 단어', ''] + [f'- {k}' for k in missing] + ['']
    report.insert(3, f"맞음 {stats.get('ok',0)} · 고침 {stats.get('edit',0)} · 뺌 {stats.get('del',0)}\n")
    rp = ROOT / 'tools' / 'review_report.md'
    rp.write_text('\n'.join(report), encoding='utf-8')
    print('\n'.join(report[:6]))
    print(f'보고서: {rp}' + (' (dry-run: 데이터는 바꾸지 않음)' if dry else ''))


if __name__ == '__main__':
    main()
