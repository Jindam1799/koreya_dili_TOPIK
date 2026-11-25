"""Aslıhan Erdoğan'ın TOPİK SINAV KELİMELERİ.docx dosyasından data/topik2.js üretir.
Kullanım: python3 tools/build_topik2.py <docx>  → data/topik2.js + tools/topik2_report.md"""
import sys,re,docx,os
SRC=sys.argv[1]
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIX={'익논하다':'의논하다','휘지르다':'휘젓다','사고팔':'사고팔다','회열을 느끼다':'희열을 느끼다','얇팍하다':'얄팍하다',
 '곁면':'겉면','빠곡히':'빼곡히','훽':'홱','그렇저럭':'그럭저럭','맥맥':'명맥','최대하다':'최대한','재현한':'재현하다','향신':'향신료','막이':'막'}
TRFIX={'지중해':'Akdeniz','상해를 가하다':'yaralamak, bedensel zarar vermek','인도양':'Hint Okyanusu','극동':'Uzak Doğu','화성':'Mars (gezegen)','서양':'Batı, Batı dünyası','외면하다':'görmezden gelmek, yüz çevirmek','중세':'Orta Çağ','비록':'her ne kadar, -se de','주지를 않다':'(birine) vermemek','비비다':'ovuşturmak, ovmak','본격화되다':'tam anlamıyla başlamak, hız kazanmak','수납':'tahsilat; eşya saklama','간담회':'samimi görüşme toplantısı','탄식이 새어 나오다':'iç çekişi dışarı sızmak','끼우다':'takmak, araya sıkıştırmak','향상하다':'geliştirmek, yükseltmek','재배하다':'yetiştirmek (bitki)','피하다':'kaçınmak, sakınmak','번식하다':'üremek, çoğalmak','겉면':'dış yüzey','요청하다':'talep etmek, istemek','황금연휴':'uzun tatil (altın tatil)','기부':'bağış','연단':'kürsü, platform','어지간하다':'epey, oldukça, makul düzeyde olmak','밝혀지다':'ortaya çıkmak, açığa kavuşmak','세균':'bakteri, mikrop','개인':'birey, kişi','남극':'Antarktika','감정하다':'değerini belirlemek, ekspertiz yapmak','동일하다':'aynı olmak, eşit olmak','데우다':'ısıtmak','온도':'sıcaklık','사고팔다':'alıp satmak','성장률':'büyüme oranı','티끌 모아 태산':'damlaya damlaya göl olur','희열을 느끼다':'büyük bir sevinç duymak, coşmak'}
SHORT={'늘다':'artmak, çoğalmak, uzamak','지다':'kaybetmek, yenilmek','역할':'rol, görev','자랑하다':'övünmek, gurur duymak','삭제':'silme','훨훨 날다':'özgürce uçmak','횡단하다':'baştan sona geçmek',
 '끼치다':'(etki, zarar) vermek, neden olmak','몸살 앓다':'yorgunluktan hasta olmak','한 술 더 뜨다':'işi daha da ileri götürmek',
 '발목을 잡다':'ayağına bağ olmak, engellemek','눈을 딱 감다':'görmezden gelmek','목에 힘을 주다':'kibirli davranmak',
 '생사가 갈리다':'ölüm kalım meselesi olmak','윗물이 맑아야 아랫물이 맑다':'önce üsttekiler düzgün olmalı','마일리지':'puan sistemi',
 '속도':'hız','경고음':'uyarı sesi','상점':'mağaza, dükkân','석':'üç (석 달 = üç ay)'}
HOLD={'머지다','경충하다','축인','변식','주기하다','툭하다'}  # Aslı onaylayana kadar oyunda yok
UP='A-ZÇĞİÖŞÜ'
def lower1(s):
    if re.match(r'(Kore|Joseon|Ulaştırma|Antarktika|Orta Çağ|Hint|Uzak Doğu|Mars|Batı|Akdeniz)',s) or 'Bakanlığı' in s:return s
    c=s[0];return ({'I':'ı','İ':'i'}.get(c,c.lower()))+s[1:]
def short(t):
    if len(t)<=40:return t
    s=re.split(r'\s*\(|;|\.\s|\s→|/\s*(?=['+UP+'])|'+r',\s*(?=['+UP+r'])|\s{2,}',t)[0].strip(' ,.')
    if len(s)>40:
        parts=[p.strip() for p in s.split(',')];acc=parts[0]
        for p in parts[1:]:
            if len(acc)+2+len(p)>40:break
            acc+=', '+p
        s=acc
    return s
PAIRS={}
pp=os.path.join(ROOT,'data/topik2_pairs.txt')
if os.path.exists(pp):
    for line in open(pp,encoding='utf-8'):
        line=line.strip()
        if line and not line.startswith('#') and '|' in line:
            k,v=line.split('|',1);PAIRS[k.strip()]=v.strip()
d=docx.Document(SRC)
seen={};occ={};SAME={'애쓰다','따지다','안타깝다','숨다','꾸미다','부피','녹다','급변하다','휴지','북극곰','담당하다','확보하다','펼치다','합리적이다','소화','개입하다','적','차단하다','향하다','독창적','질','권하다'};out=[];rep=[];held=[];dups=[];n=0
for ti,t in enumerate(d.tables):
    out.append(f'#{ti+1}')
    for r in t.rows:
        cs=[c.text for c in r.cells];ko=re.sub(r'\s+',' ',cs[0]).strip();tr=re.sub(r'\s+',' ',cs[1]).strip().rstrip('.').strip()
        if not ko or not tr:continue
        note=''
        if '=' in ko or '/' in ko:
            a=re.split(r'\s*[=/]\s*',ko);ko=a[0];note='= '+', '.join(a[1:])
        if ko in FIX:rep.append(f'| {ko} | {FIX[ko]} | yazım düzeltmesi |');ko=FIX[ko]
        if ko in HOLD:held.append(f'| {ko} | {tr} |');continue
        if ko in TRFIX:rep.append(f'| {ko} | anlam: “{tr}” → “{TRFIX[ko]}” | anlam düzeltmesi |');tr=TRFIX[ko]
        k0=re.sub(r'[^a-zçğıöşü ]','',tr.lower()).split()
        if ko in seen and (set(k0[:2])&seen[ko] or ko in SAME):dups.append(ko);continue
        seen.setdefault(ko,set()).update(k0[:2])
        tr=lower1(tr.replace('|','/'));s=SHORT.get(ko) or short(tr)
        fx=lambda x:re.sub(r'(?<=/)([A-ZÇĞİÖŞÜ])(?=[a-zçğıöşü])',lambda m:lower1(m.group(1)),x).replace(' Ücreti',' ücreti').replace(' Pazar payı',' pazar payı')
        tr=fx(tr);s=fx(s)
        if ko=='석':tr=s
        if s!=tr:note=(note+' · ' if note else '')+tr
        occ[ko]=occ.get(ko,0)+1
        pr=PAIRS.get(f'{ko}#{occ[ko]}') or (PAIRS.get(ko,'') if occ[ko]==1 else '')
        out.append(f'{ko}|{s}|{pr}|{note}' if note else (f'{ko}|{s}|{pr}' if pr else f'{ko}|{s}'));n+=1
js="/* TOPIK Ⅱ sınav kelimeleri — Aslıhan Erdoğan'ın derlediği liste (yaklaşık 15 TOPIK Ⅱ sınavının okuma bölümlerinden).\n   Biçim: korece|türkçe|eş kelimeler|açıklama */\n(window.LEVELS=window.LEVELS||[]).push({id:'TOPIK2',name:'TOPIK Ⅱ',nameKo:'TOPIK Ⅱ',text:`\n"+'\n'.join(out)+"\n`});\n"
open(os.path.join(ROOT,'data/topik2.js'),'w').write(js)
md=f"# TOPIK Ⅱ listesi — dönüştürme raporu\n\nOyuna alınan kelime: **{n}** · tekrar edenler atlandı: {len(dups)}\n\n## Düzeltmeler\n| Önce | Sonra | Tür |\n|---|---|---|\n"+'\n'.join(rep)+"\n\n## Aslı'nın kontrolü bekleniyor (şimdilik oyunda yok)\n| Kelime | Anlam |\n|---|---|\n"+'\n'.join(held)+"\n\n## Tekrar eden kelimeler (ilki tutuldu)\n"+', '.join(dups)+"\n"
open(os.path.join(ROOT,'tools/topik2_report.md'),'w').write(md)
print(n,len(dups),len(held))
