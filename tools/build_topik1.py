"""TOPIK Ⅰ seviyesini üretir: tools/topik1_words.txt (kelimeler) + mevcut seviyelerdeki anlamlar
(önce A1–A2, sonra B, sonra TOPIK Ⅱ) + tools/topik1_tr.txt (yeni anlamlar) + data/topik1_pairs.txt (eş kelimeler).
Kullanım: python3 tools/build_topik1.py  → data/topik1.js"""
import sys
sys.exit("Azərbaycan versiyasında data/topik1.js birbaşa redaktə olunur (tərcümə: tools/az/topik1.txt + tools/az_apply.py). Bu skripti işlətməyin — tərcüməni silər.")
import os,re
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P=lambda *a:os.path.join(ROOT,*a)
words=[l.strip() for l in open(P('tools/topik1_words.txt'),encoding='utf-8') if l.strip() and not l.startswith('#')]
def kv(path):
    d={}
    if os.path.exists(path):
        for l in open(path,encoding='utf-8'):
            l=l.rstrip('\n')
            if l and not l.startswith('#') and '|' in l:
                k,v=l.split('|',1);d[k.strip()]=v.strip()
    return d
TR=kv(P('tools/topik1_tr.txt'));PAIRS=kv(P('data/topik1_pairs.txt'))
known={}
for f in ['a12','b11','b12','b21','b22','topik2']:
    s=open(P('data',f+'.js'),encoding='utf-8').read();s=s[s.index('text:`')+6:]
    for l in s.split('\n'):
        if '|' in l and not l.startswith('#'):
            p=[x.strip() for x in l.split('|')];k=re.sub(r'#\d+$','',p[0])
            known.setdefault(k,[]).append((p[1],p[2] if len(p)>2 else ''))
# Konu (bölüm) ataması: tools/topik1_topics.txt önce, yoksa A1–A2'deki konusu
T=[];assign={}
for l in open(P('tools/topik1_topics.txt'),encoding='utf-8'):
    l=l.rstrip('\n')
    if not l or '|' not in l:continue
    n,ws=l.split('|');T.append(n)
    for w in ws.split():assign.setdefault(w.replace('_',' '),n)
A12MAP={'여행 (səyahət)':'여행과 나라 (səyahət və ölkələr)','동물과 식물 (heyvanlar və bitkilər)':'동물·식물·자연 (heyvanlar, bitkilər və təbiət)','부사와 표현 (zərflər və ifadələr)':'부사와 연결어 (zərflər və bağlayıcılar)'}
a=open(P('data','a12.js'),encoding='utf-8').read();a=a[a.index('text:`')+6:];u=None
for l in a.split('\n'):
    if l.startswith('#'):u=l[1:];continue
    if '|' in l:
        k=re.sub(r'#\d+$','',l.split('|')[0]);assign.setdefault(k,A12MAP.get(u,u))
        if A12MAP.get(u,u) not in T:T.append(A12MAP.get(u,u))
miss=[w for w in words if w not in assign]
if miss:raise SystemExit('konusu yok: '+' '.join(miss))
order=[w for t in T for w in words if assign[w]==t]
out=[];n_known=0;cur=None
for w in order:
    if assign[w]!=cur:
        cur=assign[w];out.append('#'+cur)
    if w in TR and w not in known: tr=TR[w];pr=''
    elif w in known:
        n_known+=1;ms=[];pr=''
        for t,p in known[w]:
            if t not in ms:ms.append(t)
            if not pr and p:pr=p
        tr='; '.join(ms[:2])
    else: raise SystemExit('anlam yok: '+w)
    if w in TR and w in known: tr=TR[w]  # elle verilen anlam önceliklidir
    pr=PAIRS.get(w,pr)
    out.append(f'{w}|{tr}|{pr}' if pr else f'{w}|{tr}')
js="/* TOPIK Ⅰ kelimeleri (1671). Anlamların bir kısmı Aslı'nın kontrol ettiği seviyelerden alınmıştır.\n   tools/build_topik1.py ile üretilir — elle düzenlemeyin. */\n(window.LEVELS=window.LEVELS||[]).push({id:'TOPIK1',name:'TOPIK Ⅰ',nameKo:'TOPIK Ⅰ',text:`\n"+'\n'.join(out)+"\n`});\n"
open(P('data/topik1.js'),'w',encoding='utf-8').write(js)
print(len(words),'kelime ·',n_known,'mevcut anlam ·',sum(1 for l in out if l.count('|')>=2),'eş kelimeli')
