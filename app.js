/* 덩어리숲 · Korece Kelime Ormanı — © 2026 Wonju (원주). Tüm hakları saklıdır. */
{
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const SPK='<svg><use href="#i-spk"/></svg>';
const CH=window.FOREST_CHAR;
const CFG=window.SITE_CONFIG||{};
const OWNER=CFG.owner||'Wonju Kim (원주)';
const CONTACT=(CFG.contact||'').trim(),KAKAO=(CFG.kakao||'').trim(),KAKAO_OPEN=(CFG.kakaoOpen||'').trim(),ASLI_YT=(CFG.asliYoutube||'').trim(),INSTA=(CFG.instagram||'').trim().replace(/^@/,'');

// ---------- kelimeler ----------
const isVerb=tr=>/m(?:[ae]k|aq|ək)(\b|\s|\)|,|$)/i.test(tr);
const LEVELS=(window.LEVELS||[]).map(L=>{
 const units=[],words=[],seenKo={};let unit=null,n=0;
 for(const raw of L.text.split('\n')){
  const line=raw.trim();if(!line)continue;
  if(line.startsWith('#')){unit={key:line.slice(1).trim(),words:[]};units.push(unit);continue}
  let [ko,tr,ps='',note='']=line.split('|').map(x=>x.trim());if(!ko||!tr)continue;
  if(!unit){unit={key:'1',words:[]};units.push(unit)}
  let id;const mx=ko.match(/^(.+)#(\d+)$/);
  if(mx){ko=mx[1];id=L.id+':'+ko+'#'+mx[2]}else{const base=L.id+':'+ko;seenKo[base]=(seenKo[base]||0)+1;id=seenKo[base]>1?base+'#'+seenKo[base]:base}n++;
  const w={id,ko,tr,lv:L.id,unit:unit.key,ui:units.length-1,verb:isVerb(tr),hanja:!!L.hanja,note,pairs:[]};
  w.pairs=ps.split(';').map(x=>x.trim()).filter(Boolean).map((p,j)=>{const k=p.indexOf('=');const pt=p.slice(k+1).trim();return {id:id+'~'+j,ko:p.slice(0,k).trim(),tr:pt,parent:w,verb:isVerb(pt)}}).filter(p=>p.ko&&p.tr);
  unit.words.push(w);words.push(w);
 }
 return {...L,units,words};
}).filter(L=>L.words.length);
// B1.1–B2.2 tek seviyede (kelime kimlikleri değişmez: ilerleme ve kontrol kayıtları korunur)
const GROUPS=[{id:'B1-B2',name:'B1–B2',parts:['B1.1','B1.2','B2.1','B2.2']}];
for(const G of GROUPS){const parts=G.parts.map(id=>LEVELS.find(L=>L.id===id)).filter(Boolean);if(!parts.length)continue;
 const units=[],words=[];
 parts.forEach(P=>P.units.forEach(u=>{const nu={key:P.name+' · '+u.key,words:u.words};units.push(nu);u.words.forEach(w=>{w.unit=nu.key;w.ui=units.length-1;w.grp=G.id;words.push(w)})}));
 parts.forEach(P=>LEVELS.splice(LEVELS.indexOf(P),1));LEVELS.push({id:G.id,name:G.name,units,words})}
LEVELS.forEach(L=>L.words.forEach(w=>{if(!w.grp)w.grp=L.id}));
const ORDER=['A1-A2','B1-B2','TOPIK1','TOPIK2','HANJA'];
LEVELS.sort((a,b)=>ORDER.indexOf(a.id)-ORDER.indexOf(b.id));
const ALL=LEVELS.flatMap(L=>L.words);
const lvOf=w=>(w.parent||w).grp;
const BYID=new Map();ALL.forEach(w=>{BYID.set(w.id,w);w.pairs.forEach(p=>BYID.set(p.id,p))});
const lvById=id=>LEVELS.find(L=>L.id===id)||LEVELS[0];
const norm=s=>s.toLowerCase().replace(/\(.*?\)/g,'').replace(/[^a-zçğıöşüâîûəxq0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const clash=(a,b)=>{const x=norm(a),y=norm(b);return !x||!y||x===y||x.includes(y)||y.includes(x)};

// ---------- dil ----------
const TX={
az:{sub:'Koreya dili söz meşəsi · A1–B2 · TOPIK Ⅰ·Ⅱ',a2hsT:'📲 Əsas ekrana əlavə et (tətbiq kimi istifadə et)',installBtn:'Əsas ekrana əlavə et',
 and1:'Bu səhifəni Chrome-da aç.',and2:'Yuxarı sağdakı ⋮ menyusuna toxun.',and3:'“Əsas ekrana əlavə et” və ya “Tətbiqi quraşdır” seçimini et.',
 ios1:'Bu səhifəni Safari-də aç.',ios2:'Aşağıdakı Paylaş düyməsinə (□↑) toxun.',ios3:'“Əsas ekrana əlavə et” (Add to Home Screen) seçimini et və “Əlavə et”ə toxun.',feedback:'💬 덩어리숲 mütəmadi olaraq yenilənəcək. Öyrənərkən çətinlik çəkdiyin bir şey və ya ehtiyac duyduğun bir funksiya olsa, bizə mütləq yaz!',rvH:'Söz yoxlaması (redaktor)',rvOpen:'Yoxlama rejimini aç',rvTitle:'Söz yoxlaması',rvSend:'Göndər',rvMean:'Azərbaycanca mənası',rvPairs:'Söz birləşmələri (koreyaca = azərbaycanca)',rvAdd:'+ Söz birləşməsi əlavə et',rvNote:'Qeyd (istəyə görə)',rvNotePh:'Məs. bu söz köhnədir, əvəzinə … daha təbiidir',rvEmpty:'Bu süzgəcdə söz yoxdur.',
 rvAll:'Hamısı',rvTodo:'Baxılmayıb',rvOkF:'Düzgün',rvEditF:'Düzəldildi',rvDelF:'Çıxarılacaq',rvOkBtn:'✓ Düzgün',rvSaveBtn:'✓ Yadda saxla',rvDelBtn:'🗑 Çıxar',rvUndel:'↺ Geri qaytar',
 rvStOk:'Düzgün',rvDraft:'✎ Yadda saxlanmayıb (qaralama)',rvStEdit:'Düzəldildi',rvStDel:'Çıxarılacaq',rvStat:(d,n,e,x)=>`Yoxlama: ${d} / ${n} · düzəldilən ${e} · çıxarılacaq ${x}`,
 rvxTitle:'Yoxlamanı göndər',rvxStat:(d,e,x)=>`Cəmi ${d} sözə baxıldı · ${e} düzəliş · ${x} çıxarma`,rvxHow:'Faylı Wonju-ya KakaoTalk və ya e-poçtla göndər. İşin telefonda yadda qalır, istədiyin vaxt davam edə bilərsən.',rvxShare:'Paylaş (KakaoTalk, e-poçt…)',rvxDown:'Faylı yüklə (.json)',rvxCsv:'Excel üçün yüklə (.csv)',rvxNoShare:'Bu brauzer paylaşmağı dəstəkləmir; faylı yükləyib göndər.',codex:'Bitki kitabçası',storyTitle:'Deongi-nin hekayəsi',
 story1:'Deongi (덩이) Koreyadakı 덩어리숲 meşəsindən gələn balaca bir könül toxumudur. Bir bahar küləyi onu uçurub Bakıya, Xəzər sahilindəki bulvarın nar bağına gətirdi.',
 story2:'Deongi koreyaca sözlərlə qidalanır: hər düzgün cavab bir damla qidadır. Söz öyrəndikcə cücərir, çiçək açır və sonda əfsanəvi bir bitkiyə çevrilir. Bığını Bakıdakı ilk dostu Elvin qardaş hədiyyə edib!',
 pathH:'Böyümə yolu',famH:'Bitki ailələri',
 path:[['Lv.1','Könül Toxumu','Səyahət başlayır. Deongi torpağa düşdü.'],['Lv.2','Könül Cücərtisi','İlk iki yarpaq çıxdı!'],['Lv.3','Ailə seçimi','6 bitki ailəsindən birini seçirsən.'],['Lv.4–9','Böyümə','Hər səviyyədə bir az da böyüyür.'],['Lv.10','Təkamül','Ailənin 3 yolundan birini seçirsən.'],['Lv.15','Sirli çevrilmə','İki sirli formadan birini seçirsən.'],['Lv.20','Əfsanəvi forma','Qədim və əfsanəvi bitkiyə çevrilir.']],
 kakaoOpen:'Açıq söhbət · 덩어리숲',famTxt:(f,mine)=>mine?`Sənin ailən: ${f}`:'Başqa ailə — kölgə kimi görünür.',locked:'Kilidlidir',lvReq:n=>`Lv.${n}`,cur:'İndi',music:'Musiqi',musicOn:'Fon musiqisi: Açıq',musicOff:'Fon musiqisi: Bağlı',notesH:'Yenilik qeydləri',notesBtn:'Nə yenilik var?',kakaoCopied:'Kopyalandı ✓',bizTitle:'Əməkdaşlıq və əlaqə',bizText:'Təşkilat və şirkətlərlə əməkdaşlıq, təhsil və məzmun tərəfdaşlığı üçün bizimlə əlaqə saxlaya bilərsiniz.',myProg:'İrəliləyiş cədvəlim',stLearned:'Öyrənildi',stReview:'Təkrar ediləcək',stNew:'Hələ öyrənilməyib',learned:'Öyrənilən',toReview:'Təkrar',bestStreak:'Ən yaxşı seriya',
 start:'Başla',quiz:'Test',cards:'Kartlar',review:n=>`Təkrar ${n}`,allUnits:'Bütün bölmələr',unitN:k=>{const m=k.match(/^(.+) · (\d+)$/);return m?`${m[1]} · Bölmə ${m[2]}`:/^\d+$/.test(k)?`Bölmə ${k}`:k},
 level:'Səviyyə',unit:'Bölmə',timerOn:'12 saniyə',timerOff:'Vaxt məhdudiyyəti yoxdur',timeLimit:'Vaxt məhdudiyyəti (test)',
 hint:'Düzgün mənaya toxun · klaviatura 1–4',qWord:'Bu sözün mənası nədir?',qPair:'Bu söz birləşməsinin mənası nədir?',qHanja:'Bu Çin heroqlifinin mənası nədir?',
 kNew:'✦ Yeni söz',kBase:'Söz',kRev:'↺ Təkrar',kBonus:'✦ Söz birləşməsi bonusu',kPairRev:'↺ Söz birləşməsi təkrarı',
 modeTimed:'Vaxtlı',modeFree:'Vaxtsız',sec:s=>`${s} san`,
 ok:'Yaxşı',right:'Düzdür!',streakT:n=>`Ardıcıl ${n} düzgün cavab!`,wrong:'Eybi yox, yenidən öyrənək',timeup:'Vaxt bitdi',
 plus:(x,s)=>`+${x} qida`+(s?` (seriya bonusu +${s})`:''),bonusFree:'Bonusda səhv etsən də problem deyil',willRepeat:'Təkrar siyahısına əlavə edildi',
 mine:'Sənin seçimin: ',
 askBonus:'Bu sözlə birlikdə işlənən ifadəni də öyrənək?',sayIt:'Dinlə və ucadan təkrar et.',
 bonusBtn:'Söz birləşməsi bonusu · +3 qida',skip:'Keç →',next:'Növbəti söz →',seeRes:'Nəticələrə bax',
 resTitle:'Tur bitdi!',resSub:(a,b)=>`${b} sualdan ${a} düzgün`,correct:'Düzgün',nutrient:'Qida',streak:'Ən uzun seriya',
 cardRes:'Kartlar bitdi!',cardSub:(a,b)=>`${b} kartdan ${a} dənəsini bilirsən`,known:'Bilirəm',unknown:'Bilmirəm',
 mistakes:'Təkrar ediləcəklər',noMistake:'Hamısı düzdür! Əla iş gördün.',home:'Ana səhifə',retryWrong:'Səhvləri təkrarla',
 tapFlip:'Çevirmək üçün toxun',tapBack:'Ön üzə qayıtmaq üçün toxun',cardHint:'Kartı çevir · sola sürüşdür: bilmirəm · sağa: bilirəm',
 kNoBtn:'↺ Bilmirəm',kYesBtn:'✓ Bilirəm',knownN:n=>`✓ ${n}`,
 welTitle:'덩어리숲-a xoş gəldin!',
 letter:'Əziz azərbaycanlı dostlarım, Koreya dilini həvəslə öyrənib TOPIK imtahanından mütləq keçməyinizi və bütün arzularınıza çatmağınızı diləyirəm!',
 sig:'— Koreyalı dostunuz Wonju (원주)',
 thanksPre:'Hazırlayanlar',roleMake:'Oyunun hazırlanması və dizaynı',roleCheck:'Söz siyahıları, yoxlama və düzəliş',thanksPost:'Zəhmətinə görə Aslıya çox təşəkkür edirik! 💚',
 how1:'Koreyaca sözə bax, dörd variantdan onun mənasını seç.',how2:'Düzgün cavabdan sonra söz birləşməsi bonusuna qatıl. Çevrilən kartlarla da öyrənə bilərsən.',how3:'Hər düzgün cavab qida verir və bitki dostun böyüyür.',
 namePh:'Bitki dostunun adı (istəyə görə)',chromeTxt:'Bir tətbiqin içindəki brauzerdəsən. Səsli oxunuş üçün Chrome-da açmaq daha yaxşıdır.',openChrome:'Chrome-da aç',copy:'Kopyala',copied:'Kopyalandı ✓',
 rights:'Bütün hüquqlar qorunur.',biz:'Əməkdaşlıq',
 credit:'Oyunun hazırlanması və dizaynı: Wonju Kim · Söz siyahıları: Aslıhan Erdoğan',
 settings:'Parametrlər',lang:'Dil',roundSize:'Bir turdakı söz sayı',sizeAll:'Hamısı',sound:'Səs',autoOn:'Sözü avtomatik oxu: Açıq',autoOff:'Sözü avtomatik oxu: Bağlı',test:'Səsi yoxla',voiceH:'Səs seçimi',vAuto:'Avtomatik (qadın səsi)',vGT:'Google Tərcümə səsi (qadın · internet)',vMale:'Kişi səsi',vLow1:'Bir az qalın səs',vLow2:'Qalın səs',vHQ:'təkmilləşdirilmiş',vHQ2:'premium',vOnline:'onlayn',noVoice:'Bu brauzerdə koreyaca səs tapılmadı. Chrome-da Google 한국의 səsindən istifadə edə bilərsən.',speedH:'Oxuma sürəti',rSlow2:'Çox yavaş',rSlow:'Yavaş',rNorm:'Normal',name:'Bitki dostunun adı',
 look:'Görünüş',stacheOn:'Bığ: Var',stacheOff:'Bığ: Yoxdur',
 reset:'İrəliləyişi sıfırla',resetSure:'Əminsən? Yenidən toxun',msg:'Mesaj',settingsA:'Parametrlər',quit:'Çıx',listen:'Dinlə',
 lvUp:'Səviyyən artdı!',lvSub:n=>`Artıq Lv.${n}`,great:'Əla!',
 pickFam:'Lv.3 · Hansı bitki olsun?',pickFamSub:'Bitki dostunun ailəsini seç. Sonra dəyişmək olmaz.',
 pickRoute:'Lv.10 · Təkamül vaxtıdır!',pickRouteSub:'Hansı yolla böyüsün?',pickBranch:'Lv.15 · Sirli çevrilmə!',pickBranchSub:'İki yoldan birini seç.',
 xpLeft:(a,b)=>`${a} / ${b} qida`,
 seed:'Könül Toxumu',sprout:'Könül Cücərtisi',growing:x=>'Böyüyən '+x,magic:x=>'Sirli '+x,legend:x=>'Əfsanəvi '+x,
 nextGoal:L=>L<3?'Lv.3-də bitki ailəni seçəcəksən':L<10?'Lv.10-da təkamül keçəcək':L<15?'Lv.15-də sirli çevrilmə':L<20?'Lv.20-də əfsanəvi forma':'Ən yüksək formaya çatdın!',
 fam:{petal:'Könül Çiçəyi',mushroom:'Könül Göbələyi',succulent:'Könül Sukulenti',clover:'Könül Yarpağı',berry:'Könül Meyvəsi',tree:'Könül Ağacı'},
 route:{sunflower:'Qızıl Günəbaxan',rose:'Kraliça Qızılgül',hibiscus:'Cəsur Hibiskus',matsutake:'Kral Matsutake',horn:'Zərif Buynuzlu Göbələk',reishi:'Parlaq Reyşi',undulata:'Nəhəng Undulata',euphorbia:'Nazlı Südləyən',cactus:'Əzmkar Kaktus',lucky:'Bəxtəvər Dördyarpaq Yonca',silver:'Ay İşığı Yoncası',crimson:'Mehriban Qırmızı Yonca',strawberry:'Şirin Nəhəng Çiyələk',blueberry:'Ulduzlu Qaragilə',raspberry:'Canlı Moruq',oak:'Möhkəm Palıd',willow:'Küləkli Söyüd',ginkgo:'Qızıl Ginkqo'},
 way:'Yol'},
ko:{sub:'한국어 단어의 숲 · A1–B2 · TOPIK Ⅰ·Ⅱ',a2hsT:'📲 홈 화면에 추가하기 (앱처럼 쓰기)',installBtn:'홈 화면에 추가',
 and1:'이 페이지를 Chrome에서 열어요.',and2:'오른쪽 위 ⋮ 메뉴를 눌러요.',and3:'“홈 화면에 추가” 또는 “앱 설치”를 골라요.',
 ios1:'이 페이지를 Safari에서 열어요.',ios2:'아래쪽 공유 버튼(□↑)을 눌러요.',ios3:'“홈 화면에 추가”를 고르고 “추가”를 눌러요.',feedback:'💬 덩어리숲은 앞으로도 꾸준히 업데이트돼요. 공부하면서 어려운 점이나 필요한 게 있으면 언제든 건의해 주세요!',rvH:'단어 검수 (편집자)',rvOpen:'검수 모드 열기',rvTitle:'단어 검수',rvSend:'보내기',rvMean:'아제르바이잔어 뜻',rvPairs:'짝꿍어휘 (한국어 = 아제르바이잔어)',rvAdd:'+ 짝꿍어휘 추가',rvNote:'메모 (선택)',rvNotePh:'예: 이 단어는 오래된 말, … 가 더 자연스러움',rvEmpty:'이 필터에 해당하는 단어가 없어요.',
 rvAll:'전체',rvTodo:'안 본 것',rvOkF:'맞음',rvEditF:'고침',rvDelF:'뺄 것',rvOkBtn:'✓ 맞아요',rvSaveBtn:'✓ 저장',rvDelBtn:'🗑 빼기',rvUndel:'↺ 되돌리기',
 rvStOk:'맞음',rvDraft:'✎ 아직 저장 안 됨 (임시)',rvStEdit:'고침',rvStDel:'뺄 것',rvStat:(d,n,e,x)=>`검수 ${d} / ${n} · 고침 ${e} · 뺄 것 ${x}`,
 rvxTitle:'검수 결과 보내기',rvxStat:(d,e,x)=>`모두 ${d}개 확인 · 고침 ${e} · 뺄 것 ${x}`,rvxHow:'파일을 원주에게 카카오톡이나 이메일로 보내 주세요. 작업 내용은 휴대폰에 저장돼서 언제든 이어서 할 수 있어요.',rvxShare:'공유하기 (카카오톡, 이메일…)',rvxDown:'파일 내려받기 (.json)',rvxCsv:'엑셀용 내려받기 (.csv)',rvxNoShare:'이 브라우저는 공유를 지원하지 않아요. 파일을 내려받아 보내 주세요.',codex:'식물 도감',storyTitle:'덩이의 이야기',
 story1:'덩이는 한국의 덩어리숲에서 온 작은 마음씨예요. 어느 봄바람이 덩이를 바쿠, 카스피해 바닷가 불바르의 석류 정원까지 데려왔어요.',
 story2:'덩이는 한국어 단어를 먹고 자라요. 정답 하나가 양분 한 방울! 단어를 익힐수록 싹이 트고 꽃이 피고, 마침내 전설의 식물이 돼요. 콧수염은 바쿠에서 처음 사귄 친구, 엘빈 동생의 선물이에요!',
 pathH:'성장 단계',famH:'식물 계열',
 path:[['Lv.1','마음씨','여행이 시작돼요. 덩이가 땅에 떨어졌어요.'],['Lv.2','마음싹','첫 떡잎 두 장이 나왔어요!'],['Lv.3','계열 선택','6가지 식물 계열 중 하나를 골라요.'],['Lv.4–9','쑥쑥 성장','레벨마다 조금씩 커져요.'],['Lv.10','진화','계열마다 3가지 길 중 하나를 골라요.'],['Lv.15','신기한 변신','두 갈래 중 하나를 골라요.'],['Lv.20','전설의 모습','고대·전설의 식물로 변신해요.']],
 kakaoOpen:'오픈채팅 · 덩어리숲',famTxt:(f,mine)=>mine?`나의 계열: ${f}`:'다른 계열이에요 — 그림자로 보여요.',locked:'잠김',lvReq:n=>`Lv.${n}`,cur:'지금',music:'음악',musicOn:'배경 음악: 켜짐',musicOff:'배경 음악: 꺼짐',notesH:'업데이트 노트',notesBtn:'새로운 내용 보기',kakaoCopied:'복사됨 ✓',bizTitle:'비즈니스 협업 · 문의',bizText:'기관·기업 협업, 교육·콘텐츠 제휴는 아래로 연락 주세요.',myProg:'나의 진도표',stLearned:'익힘',stReview:'다시 볼 단어',stNew:'아직 안 함',learned:'익힌 단어',toReview:'복습',bestStreak:'최고 연속',
 start:'시작하기',quiz:'퀴즈',cards:'카드',review:n=>`복습 ${n}`,allUnits:'전체 단원',unitN:k=>{const m=k.match(/^(.+) · (\d+)$/);return m?`${m[1]} · ${m[2]}단원`:/^\d+$/.test(k)?`${k}단원`:k},
 level:'단계',unit:'단원',timerOn:'12초',timerOff:'시간제한 없음',timeLimit:'제한 시간 (퀴즈)',
 hint:'알맞은 뜻을 누르세요 · 키보드 1–4',qWord:'이 단어의 뜻은 무엇일까요?',qPair:'이 짝꿍어휘의 뜻은 무엇일까요?',qHanja:'이 한자의 뜻은 무엇일까요?',
 kNew:'✦ 새 단어',kBase:'기본 단어',kRev:'↺ 복습 단어',kBonus:'✦ 짝꿍어휘 보너스',kPairRev:'↺ 짝꿍어휘 복습',
 modeTimed:'시간제한',modeFree:'시간제한 없음',sec:s=>`${s}초`,
 ok:'확인',right:'정답이에요!',streakT:n=>`${n}개 연속 정답!`,wrong:'다시 익히면 괜찮아요',timeup:'시간이 다 됐어요',
 plus:(x,s)=>`+${x} 양분`+(s?` (연속 보너스 +${s})`:''),bonusFree:'보너스는 틀려도 괜찮아요',willRepeat:'복습 목록에 넣었어요',
 mine:'내가 고른 답: ',
 askBonus:'이 단어와 함께 쓰는 표현도 익혀 볼까요?',sayIt:'발음을 듣고 한 번 따라 말해 보세요.',
 bonusBtn:'짝꿍어휘 도전 · +3 양분',skip:'건너뛰기 →',next:'다음 단어 →',seeRes:'학습 결과 보기',
 resTitle:'한 판 끝!',resSub:(a,b)=>`${b}문제 중 ${a}개 정답`,correct:'정답',nutrient:'양분',streak:'최고 연속',
 cardRes:'카드 끝!',cardSub:(a,b)=>`${b}장 중 ${a}장 알아요`,known:'알아요',unknown:'몰라요',
 mistakes:'다시 익힐 단어',noMistake:'모두 맞혔어요! 정말 잘했어요.',home:'처음으로',retryWrong:'틀린 것 다시',
 tapFlip:'눌러서 뒤집기',tapBack:'다시 누르면 앞면',cardHint:'카드를 뒤집어요 · 왼쪽으로 밀면 몰라요 · 오른쪽은 알아요',
 kNoBtn:'↺ 몰라요',kYesBtn:'✓ 알아요',knownN:n=>`✓ ${n}`,
 welTitle:'덩어리숲에 오신 것을 환영해요!',
 letter:'아제르바이잔 친구들, 한국어 열심히 공부해서 꼭 토픽을 합격하고 원하는 일 모두 이루기 바랍니다!',
 sig:'— 한국 친구 원주',
 thanksPre:'만든 사람들',roleMake:'게임 제작 및 기획',roleCheck:'단어 자료 · 검수 및 교정',thanksPost:'도와준 아슬르에게 정말 고마워요! 💚',
 how1:'한국어 단어를 보고 네 개의 보기에서 알맞은 뜻을 골라요.',how2:'맞히면 짝꿍어휘 보너스에 도전해요. 카드 뒤집기로도 공부할 수 있어요.',how3:'맞힐 때마다 양분이 쌓여 식물 친구가 자라요.',
 namePh:'식물 친구 이름 (선택)',chromeTxt:'앱 안의 브라우저에서는 음성이 안 나올 수 있어요. Chrome에서 여는 게 좋아요.',openChrome:'Chrome에서 열기',copy:'복사',copied:'복사됨 ✓',
 rights:'All rights reserved.',biz:'비즈니스 협업',
 credit:'게임 제작 및 기획: Wonju Kim · 단어 자료: Aslıhan Erdoğan',
 settings:'설정',lang:'언어',roundSize:'한 판 단어 수',sizeAll:'전체',sound:'소리',autoOn:'단어 자동 읽기: 켜짐',autoOff:'단어 자동 읽기: 꺼짐',test:'소리 들어 보기',voiceH:'목소리 선택',vAuto:'자동 (여성 목소리)',vGT:'구글 번역 목소리 (여성 · 인터넷)',vMale:'남자 목소리',vLow1:'조금 낮은 목소리',vLow2:'낮은 목소리',vHQ:'고음질',vHQ2:'프리미엄',vOnline:'온라인',noVoice:'이 브라우저에는 한국어 음성이 없어요. Chrome의 Google 한국의 음성을 쓸 수 있어요.',speedH:'읽기 속도',rSlow2:'아주 느리게',rSlow:'느리게',rNorm:'보통',name:'식물 친구 이름',
 look:'꾸미기',stacheOn:'콧수염: 있음',stacheOff:'콧수염: 없음',
 reset:'기록 초기화',resetSure:'정말요? 한 번 더 누르세요',msg:'메시지',quit:'그만하기',listen:'듣기',
 lvUp:'레벨 업!',lvSub:n=>`이제 Lv.${n}`,great:'좋아요!',
 pickFam:'Lv.3 · 어떤 식물로 자랄까요?',pickFamSub:'식물 친구의 계열을 골라요. 나중에 바꿀 수 없어요.',
 pickRoute:'Lv.10 · 진화할 시간!',pickRouteSub:'어떤 길로 자랄까요?',pickBranch:'Lv.15 · 신기한 변신!',pickBranchSub:'두 갈래 중 하나를 골라요.',
 xpLeft:(a,b)=>`${a} / ${b} 양분`,
 seed:'마음씨',sprout:'마음싹',growing:x=>'쑥쑥 자라는 '+x,magic:x=>'신비한 '+x,legend:x=>'전설의 '+x,
 nextGoal:L=>L<3?'Lv.3에 식물 계열을 골라요':L<10?'Lv.10에 진화해요':L<15?'Lv.15에 신기한 변신':L<20?'Lv.20에 전설의 모습':'가장 높은 모습이에요!',
 fam:{petal:'마음꽃',mushroom:'마음송이',succulent:'마음담이',clover:'마음잎',berry:'마음열매',tree:'마음나무'},
 route:{},
 way:'갈래'}
};
TX.ko.route=Object.fromEntries(Object.values(CH.GROWTH).flatMap(g=>g.routes.map(r=>[r.id,r.final])));
let S={music:true,vol:45,lang:'az',xp:0,level:1,name:'',pet:'',route:'',branch:'',mem:{},retry:[],lv:LEVELS[0].id,unit:'all',timer:true,size:10,auto:true,best:0,stache:true,voice:'',rate:1};
try{Object.assign(S,JSON.parse(localStorage.getItem('deongeoriForestAZ')||'{}'))}catch(e){}
if(S.size!==0&&S.size!==10)S.size=10;
if(/^B[12]\.[12]$/.test(S.lv)){S.lv='B1-B2';S.unit='all'}
S.retry=S.retry.filter(id=>BYID.has(id));if(!LEVELS.some(L=>L.id===S.lv))S.lv=LEVELS[0].id;
const save=()=>{try{localStorage.setItem('deongeoriForestAZ',JSON.stringify(S))}catch(e){}};
const t=(k,...a)=>{const v=TX[S.lang][k];return typeof v==='function'?v(...a):v};

function applyLang(){
 document.documentElement.lang=S.lang;
 document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t(el.dataset.t));
 document.querySelectorAll('[data-al]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.al)));
 document.querySelectorAll('[data-ph]').forEach(el=>el.placeholder=t(el.dataset.ph));
 document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===S.lang));
 document.querySelectorAll('.copy').forEach(el=>el.textContent=`© 2026 ${OWNER} · ${t('rights')}`);
 renderLinks();
 renderHome();renderSettings();
 if(state&&!$('game').hidden){renderQuestionText();if(!$('fb').hidden)renderFeedback()}
 if(deck&&!$('cards').hidden)renderCard();
 if(!$('result').hidden)renderResult();
 if(!$('prog').hidden)renderProg();
 if(!$('mBook').hidden)renderBook();
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-lang]');if(b){S.lang=b.dataset.lang;save();applyLang()}});

// ---------- seviye ----------
const xpStart=L=>{const n=L-1;return Math.round(.4*(100*n+25*n*(n-1)+10*n*(n-1)*(2*n-1)/6))};
const levelOf=xp=>{let L=1;while(xp>=xpStart(L+1))L++;return L};
function growthName(L=S.level){
 if(L===1)return t('seed');if(L===2||!S.pet)return t('sprout');
 const fam=TX[S.lang].fam[S.pet];
 if(L>=10&&S.route){const r=TX[S.lang].route[S.route];return L>=20&&S.branch?t('legend',r):L>=15&&S.branch?t('magic',r):r}
 return L>=4?t('growing',fam):fam;
}
function art(L=S.level,pet=S.pet,route=S.route,branch=S.branch){
 const p=pet||'',r=L>=10?route||null:null,b=L>=15?branch||null:null;
 CH.setProfile({routes:p&&r?{[p]:r}:{},branches:p&&b?{[p]:b}:{}});
 const lv=!p&&L>=3?2:(L>=10&&!r?9:(L>=15&&!b?14:L));
 const svg=CH.creatureSVG(p||'tree',r,lv,undefined,false,b||null);
 if(!S.stache)return svg;
 const g=CH.plantGeometry(p||'tree',r,lv,b||null),[fx,fy]=g.face,k=g.form?(g.form.fs||1):1;
 return svg.replace('<g class="expression-normal">',stache(fx,fy,k)+'<g class="expression-normal">');
}
// büyük bıyık
function stache(x,y,k){
 const m=(sx)=>{const X=d=>x+sx*d*1.15*k,Y=d=>y+(d+4)*k;
  return `M${X(0)} ${Y(5)}C${X(5)} ${Y(1)} ${X(13)} ${Y(1)} ${X(19)} ${Y(5)}C${X(23)} ${Y(8)} ${X(27)} ${Y(8)} ${X(29)} ${Y(3)}C${X(31)} ${Y(9)} ${X(27)} ${Y(15)} ${X(19)} ${Y(14)}C${X(12)} ${Y(13)} ${X(5)} ${Y(11)} ${X(0)} ${Y(10)}Z`};
 return `<g class="stache"><path d="${m(-1)}${m(1)}" fill="#3a2a1f" stroke="#2a1d14" stroke-width="${.8*k}" stroke-linejoin="round"/><path d="M${x-17*k} ${y+9.5*k}Q${x-9*k} ${y+7.5*k} ${x-2*k} ${y+10*k}M${x+17*k} ${y+9.5*k}Q${x+9*k} ${y+7.5*k} ${x+2*k} ${y+10*k}" fill="none" stroke="#6b5140" stroke-width="${1.2*k}" stroke-linecap="round" opacity=".8"/></g>`;
}

const displayName=()=>S.name||growthName();

// ---------- Bakı mənzərəsi ----------
function sceneSVG(){
 // Alov qüllələri (Flame Towers)
 const flame=(x,base,h,w,lean)=>`<path d="M${x-w} ${base}C${x-w} ${base-h*.45} ${x-w*.55} ${base-h*.8} ${x+lean} ${base-h}C${x+w*.35} ${base-h*.78} ${x+w} ${base-h*.5} ${x+w} ${base}Z"/>`;
 const flameWin=(x,base,h,w)=>{let o='';for(let i=1;i<9;i++){const y=base-h*i/10,k=1-Math.pow(i/10,1.6)*.85;o+=`<path d="M${x-w*k} ${y}H${x+w*k*.95}"/>`}return o};
 const gull=(x,y,s)=>`<g class="bal"><path transform="translate(${x} ${y}) scale(${s})" d="M-10 0Q-5 -6 0 0Q5 -6 10 0" fill="none" stroke="#8a6f6a" stroke-width="1.6" stroke-linecap="round"/></g>`;
 const pom=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0V-16" stroke="#6b4a2f" stroke-width="2.6"/><ellipse cx="0" cy="-26" rx="17" ry="14" fill="#5f8f4a"/><ellipse cx="-7" cy="-30" rx="9" ry="7" fill="#6f9e57"/><circle cx="-8" cy="-22" r="4.2" fill="#c8323f"/><circle cx="7" cy="-27" r="4.6" fill="#d23c48"/><circle cx="2" cy="-17" r="3.6" fill="#b82a38"/><path d="M-9.5 -26.5l1.5 -1.6 1.5 1.6M5.5 -31.8l1.5 -1.6 1.5 1.6" stroke="#8c1f2b" stroke-width=".9" fill="none"/></g>`;
 const flower=(x,y,s,c)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0V-14" stroke="#4f7d3a" stroke-width="2"/><circle cx="0" cy="-17" r="4" fill="${c}"/><circle cx="0" cy="-17" r="1.6" fill="#f6d36b"/></g>`;
 let houses='';for(let i=0;i<18;i++){const x=i*23-4,h=8+((i*37)%11);houses+=`<rect x="${x}" y="${228-h}" width="20" height="${h}"/>`}
 let walls='';for(const x of [...Array(13).keys()].map(i=>2+i*8).concat([...Array(11).keys()].map(i=>312+i*8)))walls+=`<rect x="${x}" y="${x>300?208:206}" width="5" height="5"/>`;
 return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
 <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3c9a6"/><stop offset=".55" stop-color="#fbe3c4"/><stop offset="1" stop-color="#fdf0dc"/></linearGradient>
 <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9cc3cf"/><stop offset="1" stop-color="#7aaab8"/></linearGradient>
 <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b9a3a8"/><stop offset="1" stop-color="#9c8590"/></linearGradient></defs>
 <rect width="400" height="300" fill="url(#sky)"/>
 <circle cx="318" cy="132" r="30" fill="#fff4dc" opacity=".9"/><circle cx="318" cy="132" r="48" fill="#fff4dc" opacity=".35"/>
 ${gull(150,120,.9)}${gull(170,110,.6)}${gull(40,120,.8)}${gull(300,170,.8)}${gull(360,110,.6)}
 <g fill="#c7a99f" opacity=".75">${houses}</g>
 <path d="M150 228Q188 184 226 180Q262 178 300 208L316 228Z" fill="#bfa293"/>
 <g fill="url(#glass)">${flame(196,196,80,15,3)}${flame(226,186,108,17,4)}${flame(258,194,86,15,3)}</g>
 <g stroke="#e9d9cf" stroke-width=".7" opacity=".55">${flameWin(196,196,80,15)}${flameWin(226,186,108,17)}${flameWin(258,194,86,15)}</g>
 <g fill="#a98b8a">
  <rect x="0" y="210" width="104" height="18"/><rect x="310" y="212" width="90" height="16"/>${walls}
  <path d="M96 228V160Q96 152 114 152Q132 152 132 160V228Z"/>
  <path d="M130 228V176L144 182V228Z"/>
  <rect x="94" y="150" width="40" height="4" rx="1"/>
  <path d="M104 176h20M104 196h20" stroke="#bea0a0" stroke-width="1.4"/>
  <rect x="110" y="214" width="8" height="14" rx="4" fill="#8e7272"/>
  <rect x="40" y="186" width="18" height="24"/><path d="M38 188h22L49 172Z"/>
  <rect x="372" y="150" width="3" height="78"/><path d="M368 176h11v6h-11z"/>
 </g>
 <rect y="228" width="400" height="30" fill="url(#sea)"/>
 <path d="M20 236h40M120 242h60M240 236h30M300 246h70M60 250h40" stroke="#e6f2f0" stroke-width="2" stroke-linecap="round" opacity=".8"/>
 <g class="ferry"><path d="M0 238h30l-4 7H4Z" fill="#fff"/><path d="M15 236V216L27 234Z" fill="#fff"/><path d="M13 236V220L5 234Z" fill="#f3e6d6"/><rect x="14" y="214" width="1.4" height="22" fill="#8a6142"/></g>
 <path d="M-10 300V262Q80 246 200 250Q320 246 410 262V300Z" fill="#b9cf98"/>
 <path d="M-10 300V276Q100 262 200 266Q300 262 410 276V300Z" fill="#a6c283"/>
 ${pom(30,284,1.05)}${pom(370,286,1.05)}${pom(92,290,.8)}${pom(312,292,.8)}
 ${flower(60,292,.9,'#ef7aa0')}${flower(120,294,.8,'#f2b134')}${flower(286,294,.8,'#ef7aa0')}${flower(344,296,.8,'#f2b134')}${flower(110,284,.7,'#d7263d')}
 </svg>`;
}

$('scene').innerHTML=sceneSVG();

// ---------- ana sayfa ----------
const curLevel=()=>lvById(S.lv);
function pool(){const L=curLevel();return S.unit==='all'?L.words:(L.units.find(u=>u.key===S.unit)||{words:L.words}).words}
function renderHome(){
 const L=S.level,a=xpStart(L),b=xpStart(L+1);
 $('mascot').innerHTML=art();
 $('cName').textContent=displayName();
 $('cLv').textContent='Lv.'+L;
 $('cGrowth').textContent=(S.name?growthName()+' · ':'')+t('nextGoal',L);
 $('xpText').textContent=t('xpLeft',S.xp-a,b-a);
 $('xpBar').style.width=Math.min(100,(S.xp-a)/(b-a)*100)+'%';
 const lw=curLevel().words,ln=lw.filter(w=>status(w)==='ok').length;
 $('progSmall').textContent=`${S.lang==='ko'&&curLevel().nameKo?curLevel().nameKo:curLevel().name} · ${ln} / ${lw.length}`;
 $('progBar').style.width=(ln/lw.length*100)+'%';
 $('selLv').innerHTML=LEVELS.map(L=>`<option value="${esc(L.id)}"${L.id===S.lv?' selected':''}>${esc(S.lang==='ko'&&L.nameKo?L.nameKo:L.name)} · ${L.words.length}</option>`).join('');
 const units=curLevel().units;if(S.unit!=='all'&&!units.some(u=>u.key===S.unit))S.unit='all';
 $('selUnit').innerHTML=`<option value="all">${esc(t('allUnits'))}</option>`+units.map(u=>`<option value="${esc(u.key)}"${u.key===S.unit?' selected':''}>${esc(t('unitN',u.key))} · ${u.words.length}</option>`).join('');
 $('bStart').textContent=t('quiz')+' →';$('bCards').textContent=t('cards');
 $('bReview').textContent=t('review',S.retry.length);$('bReview').disabled=!S.retry.length;
}
$('selLv').onchange=e=>{S.lv=e.target.value;S.unit='all';save();renderHome()};
$('selUnit').onchange=e=>{S.unit=e.target.value;save();renderHome()};

// ---------- seçenekler: aynı bölüm, aynı tür, birbirine yakın ----------
function rankCands(e,list){
 const sc=x=>(x.verb!==e.verb?100:0)+(x.unit!==e.unit?10+Math.min(Math.abs(x.ui-e.ui),20):0)+(x.lv!==e.lv?50:0)+Math.random()*3;
 return list.map(x=>[sc(x),x]).sort((a,b)=>a[0]-b[0]).map(a=>a[1]);
}
function optionsFor(e){
 let cand;
 if(e.parent){const w=e.parent,L=lvById(w.grp);
  const sib=shuffle(w.pairs.filter(p=>p!==e));
  const near=rankCands({...w,verb:e.verb},L.words.filter(x=>x!==w&&x.pairs.length));
  const others=near.flatMap(x=>{const ps=shuffle(x.pairs.slice());return ps.filter(p=>p.verb===e.verb).concat(ps.filter(p=>p.verb!==e.verb)).slice(0,1)});
  cand=[...sib,...others];
 }else{const L=lvById(e.grp);cand=rankCands(e,L.words.filter(x=>x!==e&&x.ko!==e.ko))}
 const wrong=[];
 for(const c of cand){if(clash(c.tr,e.tr)||wrong.some(w=>clash(w.tr,c.tr))||c.ko===e.ko)continue;wrong.push(c);if(wrong.length===3)break}
 return shuffle([e,...wrong]);
}

// ---------- test ----------
let state=null,deck=null,timer=null;
const SECONDS=12,BONUS_EXTRA=2,BASE=5,BONUS=3,STREAK_EVERY=5,STREAK_XP=3;
function show(id){['home','game','cards','prog','review','result'].forEach(s=>$(s).hidden=s!==id)}
function buildQueue(){
 const score=w=>{const m=S.mem[w.id];return (m?m.c*2-m.w:-1)+Math.random()*1.5};
 return pool().slice().sort((x,y)=>score(x)-score(y)).slice(0,S.size||Infinity);
}
function start(kind,items){
 const queue=items||(kind==='review'?shuffle(S.retry.map(id=>BYID.get(id)).filter(Boolean)).slice(0,20):buildQueue());
 if(!queue.length)return;
 state={kind,queue,index:0,phase:'q',bonus:false,entry:null,options:[],correct:0,answered:0,xp:0,streak:0,bestStreak:0,mistakes:new Map(),offerBonus:false,chosen:null};
 deck=null;show('game');ask(false);
}
const sayText=e=>e.hanja?(e.ko.match(/\((.+?)\)/)||[,e.ko])[1]:e.ko;
function ask(bonus){
 clearInterval(timer);
 const item=state.queue[state.index];
 state.bonus=bonus;state.phase='q';state.chosen=null;
 state.entry=bonus?shuffle(item.pairs.slice())[0]:item;
 state.options=optionsFor(state.entry);
 $('fb').hidden=true;
 renderQuestionText();
 $('answers').innerHTML=state.options.map((o,i)=>`<button class="answer" data-o="${esc(o.id)}"><span class="n">${i+1}</span><span>${esc(o.tr)}</span></button>`).join('');
 $('qMini').innerHTML=art();
 const secs=SECONDS+(bonus?BONUS_EXTRA:0);
 $('tLine').hidden=!S.timer;state.secs=secs;
 if(S.timer){state.deadline=performance.now()+secs*1000;tick();timer=setInterval(tick,100)}else $('gTime').textContent='';
 if(S.auto)speak(sayText(state.entry));
 $('answers').querySelector('button').focus({preventScroll:true});
}
function renderQuestionText(){
 const e=state.entry,item=state.queue[state.index],m=S.mem[item.id];
 $('gCount').textContent=`${state.index+1} / ${state.queue.length}`;
 $('gXp').textContent=`+${state.xp} ${t('nutrient').toLowerCase()}`;
 $('gProg').style.width=(state.index/state.queue.length*100)+'%';
 $('gMode').textContent=S.timer?t('modeTimed'):t('modeFree');
 const k=$('qKind'),lvName=lvById(lvOf(item)).name;
 if(state.bonus){k.textContent=t('kBonus');k.className='qkind bonus'}
 else if(item.parent){k.textContent=t('kPairRev');k.className='qkind rev'}
 else if(state.kind==='review'){k.textContent=t('kRev')+' · '+lvName;k.className='qkind rev'}
 else{k.textContent=(m?t('kBase'):t('kNew'))+' · '+lvName;k.className='qkind'}
 $('qIns').textContent=e.parent?t('qPair'):e.hanja?t('qHanja'):t('qWord');
 $('qWord').textContent=e.ko;$('qWord').classList.toggle('long',e.ko.length>6);
}
function tick(){
 if(!state||state.phase!=='q'||!$('mLv').hidden)return;
 const left=Math.max(0,(state.deadline-performance.now())/1000);
 $('gTimer').style.width=(left/state.secs*100)+'%';
 $('gTime').textContent=t('sec',left.toFixed(1));
 $('tLine').classList.toggle('urgent',left<=3);$('gTime').classList.toggle('urgent',left<=3);
 if(left<=0)answer(null);
}
function addRetry(id){if(!S.retry.includes(id))S.retry=[...S.retry,id].slice(-200)}
function gain(n){const before=S.level;S.xp+=n;S.level=Math.max(S.level,levelOf(S.xp));save();if(S.level>before)setTimeout(levelUp,350)}
function answer(id){
 if(!state||state.phase!=='q')return;
 clearInterval(timer);state.phase='fb';
 const e=state.entry,item=state.queue[state.index],bonus=state.bonus,correct=id===e.id;
 state.chosen=id&&!correct?state.options.find(o=>o.id===id):null;state.timeout=id===null;
 document.querySelectorAll('.answer').forEach(b=>{b.disabled=true;const o=b.dataset.o;b.classList.add(o===e.id?'ok':o===id?'no':'dim')});
 if(!bonus){
  state.answered++;
  const m=S.mem[item.id]||(S.mem[item.id]={c:0,w:0});
  if(correct){m.c++;state.correct++}else m.w++;
  if(correct&&state.kind==='review')S.retry=S.retry.filter(x=>x!==item.id);
 }
 if(!correct){state.mistakes.set(e.id,e);addRetry(e.id)}
 else if(bonus)S.retry=S.retry.filter(x=>x!==e.id);
 let g=0,sb=0;
 if(!bonus){state.streak=correct?state.streak+1:0;state.bestStreak=Math.max(state.bestStreak,state.streak);S.best=Math.max(S.best,state.streak);
  if(correct&&state.streak%STREAK_EVERY===0)sb=STREAK_XP}
 if(correct)g=(bonus?BONUS:BASE)+sb;
 state.gain=g;state.sb=sb;state.correctNow=correct;state.xp+=g;
 state.offerBonus=!bonus&&correct&&!item.parent&&item.pairs.length>0;
 if(correct){$('qMini').classList.add('happy');setTimeout(()=>$('qMini').classList.remove('happy'),1500)}
 renderFeedback();$('fb').hidden=false;$('fNext').focus({preventScroll:true});
 gain(g);
}
function renderFeedback(){
 const e=state.entry,correct=state.correctNow;
 $('fIcon').textContent=correct?'✓':state.timeout?'◷':'↻';$('fIcon').className='ficon'+(correct?'':' no');
 $('fTitle').textContent=correct?(state.sb?t('streakT',state.streak):t('right')):state.timeout?t('timeup'):t('wrong');
 $('fReward').textContent=correct?t('plus',state.gain,state.sb):state.bonus?t('bonusFree'):t('willRepeat');
 $('fWord').textContent=e.ko;$('fMean').textContent=e.tr;
 const w=e.parent||e;
 $('fPairs').innerHTML=(w.note&&!state.offerBonus?`<span class="note">${esc(w.note)}</span>`:'')+(!state.offerBonus?w.pairs:[]).map(p=>`<span>${esc(p.ko)} · ${esc(p.tr)}</span>`).join('');
 $('fMine').hidden=!state.chosen;if(state.chosen)$('fMine').textContent=t('mine')+state.chosen.tr;
 $('fNote').textContent=state.offerBonus?t('askBonus'):correct?t('sayIt'):'';
 const last=state.index===state.queue.length-1;
 $('fNext').textContent=state.offerBonus?t('bonusBtn'):last?t('seeRes'):t('next');
 $('fSkip').hidden=!state.offerBonus;$('fSkip').textContent=last?t('seeRes'):t('skip');
}
function advance(){if(state.index>=state.queue.length-1){finish();return}state.index++;ask(false)}
$('answers').addEventListener('click',e=>{const b=e.target.closest('.answer');if(b)answer(b.dataset.o)});
$('fNext').onclick=()=>{if(state.offerBonus){state.offerBonus=false;ask(true)}else advance()};
$('fSkip').onclick=()=>advance();
$('qSay').onclick=()=>speak(sayText(state.entry),true);
$('fSay').onclick=()=>speak(sayText(state.entry),true);
$('bQuit').onclick=()=>{clearInterval(timer);if(state.answered)finish();else{state=null;show('home');renderHome()}};

// ---------- kartlar (çevirmeli) ----------
function startCards(items){
 const list=items||buildQueue();if(!list.length)return;
 state=null;deck={list:list.slice(),i:0,known:0,unknown:new Map(),xp:0,again:new Set()};
 show('cards');renderCard();
}
function renderCard(){
 const w=deck.list[deck.i];$('flip').classList.remove('on');
 $('cCount').textContent=`${deck.i+1} / ${deck.list.length}`;$('cKnown').textContent=t('knownN',deck.known);
 $('cProg').style.width=(deck.i/deck.list.length*100)+'%';
 const base=w.parent||w;
 $('cUnit').textContent=w.parent?t('kPairRev'):`${lvById(base.grp).name} · ${t('unitN',base.unit)}`;
 $('cFront').textContent=w.ko;$('cFront').classList.toggle('long',w.ko.length>6);
 $('cBackKo').innerHTML=`<span>${esc(w.ko)}</span><button class="say sm" data-say="${esc(w.id)}" aria-label="${esc(t('listen'))}">${SPK}</button>`;
 $('cBackTr').textContent=w.tr;
 $('cPairs').innerHTML=(w.note?`<li class="note"><div><span>${esc(w.note)}</span></div></li>`:'')+(w.pairs||[]).map(p=>`<li><div><b>${esc(p.ko)}</b><span>${esc(p.tr)}</span></div><button class="say sm" data-say="${esc(p.id)}" aria-label="${esc(t('listen'))}">${SPK}</button></li>`).join('');
 $('kNo').textContent=t('kNoBtn');$('kYes').textContent=t('kYesBtn');
 if(S.auto)speak(sayText(w));
}
$('flip').addEventListener('click',e=>{const s=e.target.closest('[data-say]');if(s){e.stopPropagation();speak(sayText(BYID.get(s.dataset.say)),true);return}$('flip').classList.toggle('on')});
function cardAnswer(knew){
 if(!deck||$('cards').hidden)return;const w=deck.list[deck.i];
 const m=S.mem[w.id]||(S.mem[w.id]={c:0,w:0});
 if(knew){m.c++;deck.known++;deck.xp+=1;S.retry=S.retry.filter(x=>x!==w.id);gain(1)}
 else{m.w++;deck.unknown.set(w.id,w);addRetry(w.id);if(!deck.again.has(w.id)){deck.again.add(w.id);deck.list.push(w)}save()}
 if(deck.i>=deck.list.length-1){finishCards();return}
 deck.i++;renderCard();
}
$('kNo').onclick=()=>cardAnswer(false);$('kYes').onclick=()=>cardAnswer(true);
$('cQuit').onclick=()=>{if(deck.i)finishCards();else{deck=null;show('home');renderHome()}};
function finishCards(){save();show('result');renderResult()}
{let sx=null;$('flip').addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});
 $('flip').addEventListener('touchend',e=>{if(sx==null)return;const dx=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(dx)>70){e.preventDefault();cardAnswer(dx>0)}})}

// ---------- ilerleme tablosu ----------
function status(w){if(S.retry.includes(w.id))return 'rv';const m=S.mem[w.id];return m&&m.c>0?'ok':m?'rv':'no'}
let progLv=null,openUnits=new Set();
function renderProg(){
 progLv=progLv||S.lv;
 const all=ALL.filter(w=>status(w)==='ok').length;
 $('pTotal').textContent=`${all} / ${ALL.length}`;
 $('pTabs').innerHTML=LEVELS.map(L=>{const n=L.words.filter(w=>status(w)==='ok').length;return `<button data-pl="${esc(L.id)}" aria-pressed="${L.id===progLv}">${esc(S.lang==='ko'&&L.nameKo?L.nameKo:L.name)} · ${Math.round(n/L.words.length*100)}%</button>`}).join('');
 const L=lvById(progLv);
 $('pList').innerHTML=L.units.map(u=>{
  const st=u.words.map(status),ok=st.filter(x=>x==='ok').length,rv=st.filter(x=>x==='rv').length,k=L.id+'|'+u.key,open=openUnits.has(k);
  return `<div class="unit${open?' open':''}" data-u="${esc(k)}"><button><b>${esc(t('unitN',u.key))}</b><small>✓ ${ok}${rv?` · ↺ ${rv}`:''} / ${u.words.length}</small><span class="pbar"><i style="width:${ok/u.words.length*100}%"></i></span></button>
  <div class="ws">${open?u.words.map((w,i)=>{const m=S.mem[w.id];return `<div class="wrow" data-w="${esc(w.id)}"><i class="st ${st[i]}"></i><b>${esc(w.ko)}</b><span>${esc(w.tr)}</span>${m?`<small>${m.c}✓ ${m.w}✗</small>`:''}</div>`}).join(''):''}</div></div>`}).join('');
}
$('bProg').onclick=()=>{progLv=S.lv;show('prog');renderProg()};
$('pQuit').onclick=()=>{show('home');renderHome()};
$('pTabs').addEventListener('click',e=>{const b=e.target.closest('[data-pl]');if(b){progLv=b.dataset.pl;renderProg();$('pList').scrollTop=0}});
$('pList').addEventListener('click',e=>{
 const r=e.target.closest('.wrow');if(r){speak(sayText(BYID.get(r.dataset.w)),true);return}
 const u=e.target.closest('.unit>button');if(u){const k=u.parentElement.dataset.u;openUnits.has(k)?openUnits.delete(k):openUnits.add(k);const y=$('pList').scrollTop;renderProg();$('pList').scrollTop=y}
});

// ---------- sonuç ----------
function finish(){clearInterval(timer);state.phase='done';save();show('result');renderResult()}
let lastList=[];
function renderResult(){
 $('rMini').innerHTML=art();
 if(deck){$('rTitle').textContent=t('cardRes');$('rSub').textContent=t('cardSub',deck.known,deck.list.length);
  $('rCorrect').textContent=deck.known;$('rL1').textContent=t('known');$('rXp').textContent='+'+deck.xp;$('rStreak').textContent=deck.unknown.size;$('rL3').textContent=t('unknown');lastList=[...deck.unknown.values()]}
 else{$('rTitle').textContent=t('resTitle');$('rSub').textContent=t('resSub',state.correct,state.answered);
  $('rCorrect').textContent=state.correct;$('rL1').textContent=t('correct');$('rXp').textContent='+'+state.xp;$('rStreak').textContent=state.bestStreak;$('rL3').textContent=t('streak');lastList=[...state.mistakes.values()]}
 $('rList').innerHTML=lastList.length?lastList.map(e=>`<div class="ritem"><div><strong>${esc(e.ko)}</strong><small>${esc(e.tr)}</small></div><button class="say sm" data-s="${esc(e.id)}" aria-label="${esc(t('listen'))}">${SPK}</button></div>`).join(''):`<div class="empty">${esc(t('noMistake'))}</div>`;
 $('rHome').textContent=t('home');$('rRetry').textContent=t('retryWrong');$('rRetry').disabled=!lastList.length;
}
$('rList').addEventListener('click',e=>{const b=e.target.closest('[data-s]');if(b)speak(sayText(BYID.get(b.dataset.s)),true)});
$('rHome').onclick=()=>{state=null;deck=null;show('home');renderHome()};
$('rRetry').onclick=()=>{const list=shuffle(lastList.slice());if(deck)startCards(list);else start('review',list)};
$('bStart').onclick=()=>start('normal');
$('bCards').onclick=()=>startCards();
$('bReview').onclick=()=>start('review');

document.addEventListener('keydown',e=>{
 if(!$('mLv').hidden||!$('mSet').hidden||!$('mWel').hidden||!$('mNotes').hidden||!$('mBook').hidden||!introDone||!$('review').hidden)return;
 if(state&&!$('game').hidden){
  if(state.phase==='q'&&/^[1-4]$/.test(e.key))answer(state.options[+e.key-1].id);
  else if(state.phase==='fb'&&e.key==='Enter'&&document.activeElement.tagName!=='BUTTON')$('fNext').click();
 }else if(deck&&!$('cards').hidden){
  if(e.key===' '||e.key==='ArrowUp'||e.key==='ArrowDown'){e.preventDefault();$('flip').classList.toggle('on')}
  else if(e.key==='ArrowLeft')cardAnswer(false);else if(e.key==='ArrowRight')cardAnswer(true);
 }
});

// ---------- seviye atlama / evrim ----------
function levelUp(){
 const L=S.level;const box=$('lvBody');$('mLv').hidden=false;
 const need=L>=3&&!S.pet?'fam':L>=10&&!S.route?'route':L>=15&&!S.branch?'branch':null;
 if(need==='fam'){
  $('lvTitle').textContent=t('pickFam');$('lvSub').textContent=t('pickFamSub');
  box.innerHTML=`<div class="choice c3">${Object.keys(CH.GROWTH).map(p=>`<button class="pick" data-pet="${p}">${art(3,p,'','')}<span>${esc(TX[S.lang].fam[p])}</span></button>`).join('')}</div>`;
 }else if(need==='route'){
  $('lvTitle').textContent=t('pickRoute');$('lvSub').textContent=t('pickRouteSub');
  box.innerHTML=`<div class="choice c3">${CH.GROWTH[S.pet].routes.map(r=>`<button class="pick" data-route="${r.id}">${art(10,S.pet,r.id,'')}<span>${esc(TX[S.lang].route[r.id])}</span></button>`).join('')}</div>`;
 }else if(need==='branch'){
  $('lvTitle').textContent=t('pickBranch');$('lvSub').textContent=t('pickBranchSub');
  const r=CH.GROWTH[S.pet].routes.find(x=>x.id===S.route);
  box.innerHTML=`<div class="choice c2">${r.branches.map((b,i)=>`<button class="pick" data-branch="${b.id}">${art(15,S.pet,S.route,b.id)}<span>${esc(t('way'))} ${i+1}</span></button>`).join('')}</div>`;
 }else{
  $('lvTitle').textContent=t('lvUp');$('lvSub').textContent=t('lvSub',L);
  box.innerHTML=`<div class="rmini">${art()}</div><p style="font-weight:800;margin:4px 0 0">${esc(growthName())}</p><button class="primary" id="lvOk" style="margin-top:12px">${esc(t('great'))}</button>`;
  $('lvOk').onclick=closeLv;
 }
}
function closeLv(){$('mLv').hidden=true;renderHome();if(state&&state.phase==='q'&&S.timer)state.deadline=performance.now()+state.secs*1000}
$('lvBody').addEventListener('click',e=>{const b=e.target.closest('.pick');if(!b)return;
 if(b.dataset.pet)S.pet=b.dataset.pet;if(b.dataset.route)S.route=b.dataset.route;if(b.dataset.branch)S.branch=b.dataset.branch;save();
 const L=S.level;if((L>=3&&!S.pet)||(L>=10&&!S.route)||(L>=15&&!S.branch))levelUp();else closeLv();
});

// ---------- ayarlar ----------
function renderSettings(){try{$('rvSet').hidden=!(RV.unlocked||Object.keys(RV.items||{}).length)}catch(e){}
 $('sizeChips').innerHTML=[10,0].map(n=>`<button class="chip" data-size="${n}" aria-pressed="${n===S.size}">${n?n:t('sizeAll')+' · '+pool().length}</button>`).join('');
 $('bTimer').textContent=S.timer?t('timerOn'):t('timerOff');$('bTimer').setAttribute('aria-pressed',S.timer);
 $('bAuto').textContent=S.auto?t('autoOn'):t('autoOff');$('bAuto').setAttribute('aria-pressed',S.auto);
 $('bMusic').textContent=S.music?t('musicOn'):t('musicOff');$('bMusic').setAttribute('aria-pressed',S.music);$('vol').value=S.vol;
 $('bStache').textContent=S.stache?t('stacheOn'):t('stacheOff');$('bStache').setAttribute('aria-pressed',S.stache);
 renderVoices();
 $('rateChips').innerHTML=RATES.map(([r,k])=>`<button class="chip" data-rate="${r}" aria-pressed="${S.rate==r}">${t(k)}</button>`).join('');
 $('nameSet').value=S.name;$('bReset').textContent=t('reset');
}
$('sizeChips').addEventListener('click',e=>{const b=e.target.closest('[data-size]');if(b){S.size=+b.dataset.size;save();renderSettings()}});
$('bTimer').onclick=()=>{S.timer=!S.timer;save();renderSettings()};
$('bStache').onclick=()=>{S.stache=!S.stache;save();renderSettings();renderHome()};
$('bAuto').onclick=()=>{S.auto=!S.auto;save();renderSettings()};
$('bTest').onclick=()=>speak('안녕하세요. 토픽 합격을 응원해요!',true);
$('voiceSel').onchange=e=>{S.voice=e.target.value;save();pickVoice();speak('안녕하세요. 반가워요!',true)};
$('rateChips').addEventListener('click',e=>{const b=e.target.closest('[data-rate]');if(!b)return;S.rate=+b.dataset.rate;save();renderSettings();speak('천천히 따라 읽어 보세요.',true)});
$('nameSet').addEventListener('input',e=>{S.name=e.target.value.trim();save();renderHome()});
$('bSet').onclick=()=>{renderSettings();$('mSet').hidden=false};
$('bSetOk').onclick=()=>{$('mSet').hidden=true};
let resetArm=false;
$('bReset').onclick=()=>{if(!resetArm){resetArm=true;$('bReset').textContent=t('resetSure');setTimeout(()=>{resetArm=false;$('bReset').textContent=t('reset')},3000);return}
 Object.assign(S,{xp:0,level:1,pet:'',route:'',branch:'',mem:{},retry:[],best:0});save();resetArm=false;$('mSet').hidden=true;renderHome()};

// ---------- iletişim bağlantıları ----------
function chromeURL(u){return /Android/i.test(navigator.userAgent)?'intent://'+u.replace(/^https?:\/\//,'')+'#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url='+encodeURIComponent(u)+';end':u}
function renderLinks(){
 const h=[];
 if(INSTA)h.push(`<a class="lk ig" href="${esc(chromeURL('https://www.instagram.com/'+encodeURIComponent(INSTA)+'/'))}" target="_blank" rel="noopener"><span class="ic"><svg><use href="#i-ig"/></svg></span><span class="tx"><b>Instagram</b><small>@${esc(INSTA)}</small></span></a>`);
 if(KAKAO_OPEN)h.push(`<a class="lk kk" href="${esc(KAKAO_OPEN)}" target="_blank" rel="noopener"><span class="ic"><svg><use href="#i-kk"/></svg></span><span class="tx"><b>KakaoTalk</b><small>${esc(t('kakaoOpen'))}</small></span></a>`);
 else if(KAKAO)h.push(`<button class="lk kk" data-copy="${esc(KAKAO)}"><span class="ic"><svg><use href="#i-kk"/></svg></span><span class="tx"><b>KakaoTalk</b><small>ID · ${esc(KAKAO)}</small></span></button>`);
 if(CONTACT)h.push(`<a class="lk ml" href="${esc(chromeURL('https://mail.google.com/mail/?view=cm&fs=1&to='+encodeURIComponent(CONTACT)+'&su='+encodeURIComponent('덩어리숲')))}" target="_blank" rel="noopener"><span class="ic"><svg><use href="#i-mail"/></svg></span><span class="tx"><b>E-mail</b><small>${esc(CONTACT)}</small></span></a>`);
 ['links','linksW','linksN'].forEach(id=>{$(id).innerHTML=h.join('')});
 if(ASLI_YT&&$('asliYt')){const a=$('asliYt');a.href=chromeURL(ASLI_YT);a.hidden=false;const m=ASLI_YT.match(/@[\w.-]+/);if(m)a.querySelector('span').textContent='YouTube · '+m[0]}
}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-copy]');if(!b)return;const sm=b.querySelector('small');
 try{await navigator.clipboard.writeText(b.dataset.copy);sm.textContent=t('kakaoCopied');sm.classList.add('ok')}catch(err){}
 setTimeout(()=>{sm.textContent='ID · '+b.dataset.copy;sm.classList.remove('ok')},2200)});
// logo: bıyıklı gönül tohumu
function logoSVG(){CH.setProfile({routes:{},branches:{}});const g=CH.plantGeometry('tree',null,1,null),[fx,fy]=g.face;
 return CH.creatureSVG('tree',null,1).replace(/viewBox="[^"]*"/,'viewBox="57 119 66 74"').replace('<g class="expression-normal">',stache(fx,fy,1)+'<g class="expression-normal">')}
document.querySelectorAll('.logo-seed').forEach(el=>el.innerHTML=logoSVG());

// ---------- bitki rehberi (도감) ----------
let bookFam=null;
function svgAt(pet,lv,route,branch,lock){CH.setProfile({routes:route?{[pet]:route}:{},branches:branch?{[pet]:branch}:{}});return CH.creatureSVG(pet,route||null,lv,undefined,lock,branch||null)}
function renderBook(){
 $('bkMascot').innerHTML=art();
 const L=S.level,stageIdx=L>=20?6:L>=15?5:L>=10?4:L>=4?3:L>=3?2:L>=2?1:0,mins=[1,2,3,4,10,15,20];
 $('bkPath').innerHTML=t('path').map(([lv,n,d],i)=>`<li class="${L>=mins[i]?'on':''}${i===stageIdx?' now':''}"><span class="lv">${esc(lv)}</span><div><b>${esc(n)}${i===stageIdx?` · ${esc(t('cur'))}`:''}</b><small>${esc(d)}</small></div></li>`).join('');
 const fams=Object.keys(CH.GROWTH);bookFam=bookFam||S.pet||fams[0];
 $('bkFam').innerHTML=fams.map(f=>`<button data-bf="${f}" aria-pressed="${f===bookFam}">${esc(TX[S.lang].fam[f])}${f===S.pet?' ★':''}</button>`).join('');
 const mine=bookFam===S.pet;
 $('bkFamTxt').textContent=t('famTxt',TX[S.lang].fam[bookFam],mine);
 const card=(svg,name,sub,ok)=>`<div class="ccard ${ok?'mine':'lock'}">${svg}<b>${esc(name)}</b><small>${esc(sub)}</small></div>`;
 const reach=(lv,route,branch)=>mine&&L>=lv&&(!route||S.route===route)&&(!branch||S.branch===branch);
 let h=`<div class="sep">Lv.3 · Lv.6</div>`;
 h+=card(svgAt(bookFam,3,null,null,!reach(3)),TX[S.lang].fam[bookFam],t('lvReq',3),reach(3));
 h+=card(svgAt(bookFam,6,null,null,!reach(6)),t('growing',TX[S.lang].fam[bookFam]),t('lvReq',6),reach(6));
 h+=`<div class="sep">Lv.10</div>`;
 const routes=CH.GROWTH[bookFam].routes;
 routes.forEach(r=>{const ok=reach(10,r.id);h+=card(svgAt(bookFam,10,r.id,null,!ok),TX[S.lang].route[r.id],t('lvReq',10),ok)});
 routes.forEach(r=>{h+=`<div class="sep">${esc(TX[S.lang].route[r.id])} · Lv.15 / Lv.20</div>`;
  r.branches.forEach((b,i)=>{
   const n15=S.lang==='ko'?b.name:t('magic',TX.az.route[r.id])+' '+(i+1),n20=S.lang==='ko'?b.final:t('legend',TX.az.route[r.id])+' '+(i+1);
   const o15=reach(15,r.id,b.id),o20=reach(20,r.id,b.id);
   h+=card(svgAt(bookFam,15,r.id,b.id,!o15),o15?n15:'?',t('lvReq',15),o15);
   h+=card(svgAt(bookFam,20,r.id,b.id,!o20),o20?n20:'?',t('lvReq',20),o20);
  })});
 $('bkGrid').innerHTML=h;
}
function openBook(){bookFam=S.pet||null;renderBook();$('mBook').hidden=false;$('mBook').querySelector('.box').scrollTop=0}
$('bBook').onclick=openBook;$('mascot').addEventListener('click',openBook);
$('bBookX').onclick=()=>{$('mBook').hidden=true};
$('bkFam').addEventListener('click',e=>{const b=e.target.closest('[data-bf]');if(b){bookFam=b.dataset.bf;renderBook()}});

// ---------- kelime kontrolü (editör modu) ----------
let RV={items:{}};try{RV=JSON.parse(localStorage.getItem('deongeoriReviewAZ')||'{"items":{}}')}catch(e){}
RV.drafts=RV.drafts||{};
const rvSave=()=>{try{localStorage.setItem('deongeoriReviewAZ',JSON.stringify(RV))}catch(e){}};
let rvLv=null,rvUnit='all',rvFilter='all',rvList=[],rvI=0;
// nerede kaldığını hatırla
function rvSavePos(){const w=rvList[rvI];RV.pos={lv:rvLv,unit:rvUnit,filter:rvFilter,id:w?w.id:null};rvSave()}
// yazılan ama kaydedilmeyen değişiklikler (taslak)
function rvDraft(){const w=rvList[rvI];if(!w)return;const v=rvRead(),r=RV.items[w.id]||{},c=rvCur(w);
 if(v.tr===c.tr&&JSON.stringify(v.pairs)===JSON.stringify(c.pairs)&&(v.note||'')===(r.note||''))delete RV.drafts[w.id];else RV.drafts[w.id]=v;rvSave()}
const rvOrig=w=>({tr:w.tr,pairs:w.pairs.map(p=>[p.ko,p.tr])});
function rvCur(w){const r=RV.items[w.id];return r&&r.st!=='del'&&r.tr!=null?{tr:r.tr,pairs:r.pairs}:rvOrig(w)}
function rvBuild(){
 const L=lvById(rvLv);let ws=rvUnit==='all'?L.words:(L.units.find(u=>u.key===rvUnit)||L).words;
 if(rvFilter!=='all')ws=ws.filter(w=>{const st=(RV.items[w.id]||{}).st;return rvFilter==='todo'?!st:st===rvFilter});
 rvList=ws;if(rvI>=rvList.length)rvI=Math.max(0,rvList.length-1);
}
function rvRender(){
 const L=lvById(rvLv);
 $('rvLv').innerHTML=LEVELS.map(x=>`<option value="${esc(x.id)}"${x.id===rvLv?' selected':''}>${esc(x.name)}</option>`).join('');
 $('rvUnit').innerHTML=`<option value="all">${esc(t('allUnits'))}</option>`+L.units.map(u=>`<option value="${esc(u.key)}"${u.key===rvUnit?' selected':''}>${esc(t('unitN',u.key))}</option>`).join('');
 $('rvFil').innerHTML=[['all','rvAll'],['todo','rvTodo'],['ok','rvOkF'],['edit','rvEditF'],['del','rvDelF']].map(([k,l])=>`<button data-rf="${k}" aria-pressed="${k===rvFilter}">${esc(t(l))}</button>`).join('');
 const all=L.words,st=all.map(w=>(RV.items[w.id]||{}).st),d=st.filter(Boolean).length;
 $('rvBar').style.width=(d/all.length*100)+'%';
 $('rvStat').textContent=t('rvStat',d,all.length,st.filter(x=>x==='edit').length,st.filter(x=>x==='del').length);
 const w=rvList[rvI];
 ['rvTr','rvNote','rvAdd','rvPairs'].forEach(id=>$(id).hidden=!w);$('rvEmpty').hidden=!!w;
 document.querySelectorAll('#rvCard .rvl,#rvCard .rvhead').forEach(el=>el.hidden=!w);
 if(!w){$('rvOk').disabled=$('rvDel').disabled=true;return}
 $('rvOk').disabled=$('rvDel').disabled=false;
 const r=RV.items[w.id]||{},dr=RV.drafts[w.id],c=dr?{tr:dr.tr,pairs:dr.pairs}:rvCur(w);
 $('rvKo').textContent=w.ko;$('rvWhere').textContent=`${L.name} · ${t('unitN',w.unit)} · ${rvI+1}/${rvList.length}`;
 $('rvSt').className='rvst '+(r.st||'');$('rvSt').textContent=r.st?t({ok:'rvStOk',edit:'rvStEdit',del:'rvStDel'}[r.st]):'';
 $('rvTr').value=c.tr;$('rvNote').value=dr?(dr.note||''):(r.note||'');
 $('rvSt').hidden=false;if(dr){$('rvSt').className='rvst edit';$('rvSt').textContent=t('rvDraft')}
 $('rvPairs').innerHTML=c.pairs.map(([k,v],i)=>`<div class="rvpair" data-i="${i}"><input value="${esc(k)}" lang="ko"><input value="${esc(v)}"><button aria-label="sil">✕</button></div>`).join('');
 $('rvDel').textContent=r.st==='del'?t('rvUndel'):t('rvDelBtn');
 rvRefreshOk();rvSavePos();
}
function rvRead(){return {tr:$('rvTr').value.trim(),pairs:[...document.querySelectorAll('#rvPairs .rvpair')].map(r=>{const [a,b]=r.querySelectorAll('input');return [a.value.trim(),b.value.trim()]}).filter(p=>p[0]&&p[1]),note:$('rvNote').value.trim()}}
function rvChanged(w,v){const o=rvOrig(w);return v.tr!==o.tr||JSON.stringify(v.pairs)!==JSON.stringify(o.pairs)}
function rvRefreshOk(){const w=rvList[rvI];if(!w)return;$('rvOk').textContent=rvChanged(w,rvRead())?t('rvSaveBtn'):t('rvOkBtn')}
function rvStore(st){const w=rvList[rvI];if(!w)return;const v=rvRead();
 const ch=rvChanged(w,v);const rec={st:st||(ch?'edit':'ok'),lv:w.lv,ko:w.ko,otr:w.tr,note:v.note||undefined};
 if(rec.st==='edit'){rec.tr=v.tr;rec.pairs=v.pairs}
 if(rec.st==='del'&&ch){rec.tr=v.tr;rec.pairs=v.pairs}
 RV.items[w.id]=rec;delete RV.drafts[w.id];RV.updated=new Date().toISOString();rvSave()}
function rvGo(d){rvBuild();rvI=Math.max(0,Math.min(rvList.length-1,rvI+d));rvRender();$('rvCard').scrollTop=0}
function openReview(){if(!RV.unlocked){RV.unlocked=true;rvSave()}$('rvSet').hidden=false;
 if(!rvLv&&RV.pos&&LEVELS.some(L=>L.id===RV.pos.lv)){const P=RV.pos;rvLv=P.lv;rvUnit=P.unit||'all';rvFilter=P.filter||'all';rvBuild();const i=rvList.findIndex(w=>w.id===P.id);rvI=i>=0?i:0}
 rvLv=rvLv||S.lv;rvBuild();show('review');rvRender()}
$('bReview2').onclick=()=>{$('mSet').hidden=true;openReview()};
window.addEventListener('hashchange',()=>{if(location.hash==='#kontrol'&&introDone)openReview()});
$('rvQuit').onclick=()=>{show('home');renderHome()};
$('rvLv').onchange=e=>{rvLv=e.target.value;rvUnit='all';rvI=0;rvBuild();rvRender()};
$('rvUnit').onchange=e=>{rvUnit=e.target.value;rvI=0;rvBuild();rvRender()};
$('rvFil').addEventListener('click',e=>{const b=e.target.closest('[data-rf]');if(b){rvFilter=b.dataset.rf;rvI=0;rvBuild();rvRender()}});
$('rvPrev').onclick=()=>rvGo(-1);$('rvNext').onclick=()=>rvGo(1);
$('rvOk').onclick=()=>{const w=rvList[rvI];rvStore();const keep=rvFilter!=='all';rvBuild();if(!keep||rvList[rvI]===w)rvGo(1);else rvRender()};
$('rvDel').onclick=()=>{const w=rvList[rvI];if((RV.items[w.id]||{}).st==='del'){delete RV.items[w.id];delete RV.drafts[w.id];rvSave();rvRender()}else{rvStore('del');rvBuild();if(rvList[rvI]===w)rvGo(1);else rvRender()}};
$('rvAdd').onclick=()=>{const d=document.createElement('div');d.className='rvpair';d.innerHTML='<input lang="ko"><input><button aria-label="sil">✕</button>';$('rvPairs').append(d);d.querySelector('input').focus();rvRefreshOk()};
$('rvPairs').addEventListener('click',e=>{const b=e.target.closest('button');if(b){b.parentElement.remove();rvRefreshOk();rvDraft()}});
$('rvCard').addEventListener('input',()=>{rvRefreshOk();rvDraft()});
addEventListener('pagehide',()=>{if(!$('review').hidden)rvDraft()});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&!$('review').hidden)rvDraft()});
$('rvSay').onclick=()=>{const w=rvList[rvI];if(w)speak(sayText(w),true)};
// gönderme
function rvPayload(){const items=RV.items;return {app:'덩어리숲',kind:'review',reviewer:S.name||'',updated:RV.updated||new Date().toISOString(),count:Object.keys(items).length,items}}
function rvFileName(ext){const d=new Date();return `deongeori-kontrol-${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}-${String(d.getHours()).padStart(2,'0')}${String(d.getMinutes()).padStart(2,'0')}.${ext}`}
function rvCSV(){const q=x=>'"'+String(x??'').replace(/"/g,'""')+'"';const rows=[['seviye','korece','eski_anlam','durum','yeni_anlam','yeni_es_kelimeler','not']];
 for(const [id,r] of Object.entries(RV.items))rows.push([r.lv,r.ko,r.otr,r.st,r.tr||'',(r.pairs||[]).map(p=>p.join('=')).join('; '),r.note||'']);
 return '﻿'+rows.map(r=>r.map(q).join(',')).join('\r\n')}
function rvDownload(text,name,type){const b=new Blob([text],{type});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500)}
$('rvSend').onclick=()=>{const its=Object.values(RV.items);$('rvxStat').textContent=t('rvxStat',its.length,its.filter(x=>x.st==='edit').length,its.filter(x=>x.st==='del').length);$('mRvx').hidden=false};
$('rvxClose').onclick=()=>{$('mRvx').hidden=true};
$('rvxDown').onclick=()=>rvDownload(JSON.stringify(rvPayload(),null,1),rvFileName('json'),'application/json');
$('rvxCsv').onclick=()=>rvDownload(rvCSV(),rvFileName('csv'),'text/csv');
$('rvxShare').onclick=async()=>{const f=new File([JSON.stringify(rvPayload(),null,1)],rvFileName('json'),{type:'application/json'});
 if(navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],title:'덩어리숲 kontrol'})}catch(e){}}
 else{alert(t('rvxNoShare'));rvDownload(JSON.stringify(rvPayload(),null,1),rvFileName('json'),'application/json')}};

// ---------- güncelleme notları ----------
const NOTES=[
 ['1.1','2026-11-25',{az:['A1–A2 (893), B1–B2 (1.791), TOPIK Ⅰ (1.671) və Hanca (390): bütün sözlərin mənası və söz birləşmələri azərbaycancaya çevrildi','TOPIK Ⅱ: 1.520 / 2.689 söz azərbaycancaya çevrildi, qalanı tezliklə','Giriş ekranında TOPIK Ⅰ · TOPIK Ⅱ yazısı','Fon musiqisi: Azərbaycan xalq mahnısı “Apardı selər Saranı”'],ko:['A1–A2(893)·B1–B2(1,791)·TOPIK Ⅰ(1,671)·한자(390): 모든 단어 뜻과 짝꿍어휘를 아제르바이잔어로','TOPIK Ⅱ: 2,689개 중 1,520개 아제르바이잔어로 (나머지도 곧)','첫 화면에 TOPIK Ⅰ · TOPIK Ⅱ 표시','배경 음악: 아제르바이잔 민요 “Apardı selər Saranı”']}],
 ['1.0','2026-11-25',{az:['덩어리숲 azərbaycanlı dostlar üçün açıldı! 🇦🇿','Səviyyələr: A1–A2, B1–B2, TOPIK Ⅰ (1.671 söz), TOPIK Ⅱ (2.689 söz), Hanca (Çin heroqlifləri)','Hər sözə söz birləşmələri (짝꿍어휘), çevrilən kartlar, irəliləyiş cədvəli','Bakı mənzərəli arxa fon: Alov qüllələri, Qız qalası, Xəzər dənizi və nar ağacları','Fon musiqisi: Azərbaycan xalq mahnısı “Apardı selər Saranı” — balaban, kamança, tar, qanun, qaval və Xəzər dalğalarının səsi ilə sakit düzənləmə','Sözlərin mənaları hazırda türkcədir; azərbaycanca yoxlaması davam edir'],ko:['아제르바이잔 친구들을 위한 덩어리숲이 열렸어요! 🇦🇿','레벨: A1–A2, B1–B2, TOPIK Ⅰ (1,671단어), TOPIK Ⅱ (2,689단어), 한자','단어마다 짝꿍어휘, 카드 뒤집기, 나의 진도표','바쿠 풍경 배경: 불꽃 타워, 처녀의 탑, 카스피해, 석류나무','배경 음악: 아제르바이잔 전통 민요 “Apardı selər Saranı”를 발라반·카만차·타르·가눈·가발과 카스피해 파도 소리로 잔잔하게 편곡','단어 뜻은 아직 튀르키예어예요. 아제르바이잔어 검수를 진행하고 있어요']}]
];
function renderNotes(){$('notesBody').innerHTML=NOTES.map(([v,d,n])=>`<div class="nver"><b>v${v}</b><small>${d}</small><ul>${n[S.lang].map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}
$('mBook').addEventListener('click',e=>{if(e.target.id==='mBook')$('mBook').hidden=true});
$('bNotes').onclick=()=>{renderNotes();$('mSet').hidden=true;$('mNotes').hidden=false;$('mNotes').querySelector('.box').scrollTop=0};
$('bNotesOk').onclick=()=>{$('mNotes').hidden=true};

// ---------- arka plan müziği (WebAudio ile üretilir) ----------
const BGM=(()=>{
 // Azərbaycan xalq mahnısı "Apardı selər Saranı" — yavaş, sakit və dinləndirici düzənləmə (3/8)
 // balaban və kamança növbə ilə, tar, qanun, yumşaq qaval və Xəzər dalğalarının səsi
 let ctx=null,master=null,duckG=null,bus=null,timer=null,step=0,next=0,on=false,noise=null,waves=null,pass=0;
 const E=0.42,S16=E/2;// səkkizlik 0,42 san — yavaş və rahat
 const BAR=6;// 3/8 = 6 on altılıq
 const N=m=>440*Math.pow(2,(m-69)/12);
 const Fs=66,G4=67,A4=69,B4=71,R=null;
 const UP={66:67,67:69,69:71,71:73};// trel/bəzək üçün üst qonşu nota
 // [nota, uzunluq(on altılıq), bəzək] — 't' = trel, 'g' = aşağıdan sürüşmə
 const M={
  a1:[[A4,4],[A4,2]],a2:[[A4,3],[A4,1],[G4,2]],a3:[[A4,4,'t'],[G4,2]],a4:[[G4,4],[Fs,2]],a5:[[A4,6,'g']],a6:[[A4,2],[R,4]],
  a7:[[Fs,4],[G4,2]],a9:[[A4,4],[G4,2]],a10:[[G4,4,'t'],[Fs,2]],a11:[[Fs,6]],a12:[[Fs,2],[R,4]],
  b0:[[A4,2],[A4,4]],b2:[[A4,3],[B4,1],[A4,2]],b3:[[G4,4,'t'],[Fs,2]],b6:[[Fs,2],[G4,4]],
  c2:[[A4,2],[A4,2],[G4,2]],r:[[R,6]]};
 M.a8=M.a2;M.b1=M.a2;M.b4=M.a5;M.b5=M.a6;M.b7=M.a2;M.b8=M.b2;M.b9=M.b3;M.b10=M.a11;M.b11=M.a12;M.c1=M.a7;M.c3=M.b2;M.c4=M.b3;M.c5=M.b2;M.c6=M.b3;M.c7=M.b2;M.c8=M.b3;M.c9=M.a11;M.c10=M.a12;
 const A=['a1','a2','a3','a4','a5','a6','a7','a8','a9','a10','a11','a12'];
 const B=['b0','b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11'];
 const C=['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10'];
 const FORM=[...A,...A,...B,...B,...C,'r','r','r','r'];
 // burdon: notaya görə Re, Mi və ya Fa# üzərində
 const CH={69:[38,45,50],67:[40,47,52],66:[42,49,54],71:[43,50,55]};
 let lead='balaban',prevM=null;
 function reverb(){const len=ctx.sampleRate*3.5,b=ctx.createBuffer(2,len,ctx.sampleRate);for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.2)}const r=ctx.createConvolver();r.buffer=b;return r}
 function init(){
  ctx=new (window.AudioContext||window.webkitAudioContext)();
  master=ctx.createGain();master.gain.value=0;duckG=ctx.createGain();bus=ctx.createGain();bus.connect(duckG);
  const rv=reverb(),wet=ctx.createGain();wet.gain.value=.6;duckG.connect(master);duckG.connect(rv);rv.connect(wet);wet.connect(master);master.connect(ctx.destination);
  const len=ctx.sampleRate*2;noise=ctx.createBuffer(1,len,ctx.sampleRate);const d=noise.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;
 }
 // Xəzər dalğaları: yavaş gəlib-gedən yumşaq səs
 function startWaves(){
  if(waves)return;const n=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain(),lfo=ctx.createOscillator(),lg=ctx.createGain();
  n.buffer=noise;n.loop=true;f.type='lowpass';f.frequency.value=520;f.Q.value=.4;g.gain.value=.016;lfo.frequency.value=.085;lg.gain.value=.013;
  lfo.connect(lg);lg.connect(g.gain);n.connect(f);f.connect(g);g.connect(master);n.start();lfo.start();waves=[n,lfo];
 }
 // burdon: isti, yumşaq fon
 function pad(ch,t,dur){
  ch.forEach((m,i)=>{const o=ctx.createOscillator(),g=ctx.createGain(),f=ctx.createBiquadFilter();
   o.type=i?'triangle':'sawtooth';o.frequency.value=N(m);o.detune.value=i*4-3;f.type='lowpass';f.frequency.value=i?800:320;
   const v=[.035,.026,.015][i];
   g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+1.2);g.gain.setValueAtTime(v,t+dur-.5);g.gain.linearRampToValueAtTime(0,t+dur+.8);
   o.connect(f);f.connect(g);g.connect(bus);o.start(t);o.stop(t+dur+.9)});
 }
 // balaban: yumşaq, isti nəfəsli qamış səsi; notlar arasında sürüşmə
 function balaban(m,t,dur,v=.05,from=null){
  const o=ctx.createOscillator(),o2=ctx.createOscillator(),f=ctx.createBiquadFilter(),g=ctx.createGain(),lfo=ctx.createOscillator(),lg=ctx.createGain();
  o.type='sawtooth';o2.type='sine';o.frequency.value=N(m);o2.frequency.value=N(m);
  if(from!==null&&from!==m){const c=(from-m)*100;o.detune.setValueAtTime(c,t);o.detune.linearRampToValueAtTime(0,t+.12);o2.detune.setValueAtTime(c,t);o2.detune.linearRampToValueAtTime(0,t+.12)}
  f.type='lowpass';f.frequency.value=1150;f.Q.value=1.2;
  lfo.frequency.value=5;lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(9,t+Math.min(.7,dur*.7));lfo.connect(lg);lg.connect(o.detune);lg.connect(o2.detune);
  const og=ctx.createGain();og.gain.value=.45;const o2g=ctx.createGain();o2g.gain.value=.7;
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.12);g.gain.setValueAtTime(v*.9,t+Math.max(.15,dur-.15));g.gain.linearRampToValueAtTime(0,t+dur+.25);
  const n=ctx.createBufferSource(),bp=ctx.createBiquadFilter(),ng=ctx.createGain();n.buffer=noise;n.loop=true;bp.type='bandpass';bp.frequency.value=N(m)*1.5;bp.Q.value=3;ng.gain.value=.012;
  o.connect(og);og.connect(f);o2.connect(o2g);o2g.connect(f);n.connect(bp);bp.connect(ng);ng.connect(f);f.connect(g);g.connect(bus);
  [o,o2,lfo,n].forEach(x=>{x.start(t);x.stop(t+dur+.35)});
 }
 // kamança: yayla çalınan, dərin vibratolu
 function kamanca(m,t,dur,v=.045,from=null){
  const o=ctx.createOscillator(),o2=ctx.createOscillator(),f=ctx.createBiquadFilter(),g=ctx.createGain(),lfo=ctx.createOscillator(),lg=ctx.createGain();
  o.type='sawtooth';o2.type='sawtooth';o.frequency.value=N(m);o2.frequency.value=N(m);o2.detune.value=5;
  if(from!==null&&from!==m){const c=(from-m)*100;o.detune.setValueAtTime(c,t);o.detune.linearRampToValueAtTime(0,t+.18)}
  f.type='lowpass';f.frequency.setValueAtTime(900,t);f.frequency.linearRampToValueAtTime(1900,t+.35);f.Q.value=2;
  lfo.frequency.value=5.8;lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(14,t+Math.min(.6,dur*.6));lfo.connect(lg);lg.connect(o.detune);lg.connect(o2.detune);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.25);g.gain.setValueAtTime(v,t+Math.max(.3,dur-.2));g.gain.linearRampToValueAtTime(0,t+dur+.35);
  const og=ctx.createGain();og.gain.value=.4;o.connect(og);o2.connect(og);og.connect(f);f.connect(g);g.connect(bus);
  [o,o2,lfo].forEach(x=>{x.start(t);x.stop(t+dur+.45)});
 }
 // tar: parlaq, metal telli çəkmə
 function tar(m,t,v=.05,len=1){
  const f=ctx.createBiquadFilter();f.type='lowpass';f.Q.value=4;f.frequency.setValueAtTime(5200,t);f.frequency.exponentialRampToValueAtTime(1100,t+.35);
  const g=ctx.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.003);g.gain.exponentialRampToValueAtTime(.0006,t+len);
  [[0,'sawtooth',.45,1],[7,'square',.12,1],[-3,'triangle',.25,2]].forEach(([det,ty,gv,mul])=>{const o=ctx.createOscillator();o.type=ty;o.frequency.value=N(m)*mul;o.detune.value=det;
   const og=ctx.createGain();og.gain.value=gv;o.connect(og);og.connect(f);o.start(t);o.stop(t+len+.1)});
  f.connect(g);g.connect(bus);
 }
 // qanun: işıltılı, incə
 function qanun(m,t,v=.026){const o=ctx.createOscillator(),o2=ctx.createOscillator(),g=ctx.createGain();o.type='triangle';o2.type='sine';o.frequency.value=N(m);o2.frequency.value=N(m)*2;
  const g2=ctx.createGain();g2.gain.value=.3;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.003);g.gain.exponentialRampToValueAtTime(.0005,t+1.1);
  o.connect(g);o2.connect(g2);g2.connect(g);g.connect(bus);o.start(t);o2.start(t);o.stop(t+1.2);o2.stop(t+1.2)}
 // qaval: yumşaq bas və kənar zərbəsi
 function dum(t,v=.09){const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.setValueAtTime(88,t);o.frequency.exponentialRampToValueAtTime(52,t+.3);
  g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+.5);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.55)}
 function tek(t,v=.02){const n=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();n.buffer=noise;f.type='bandpass';f.frequency.value=3000;f.Q.value=1.3;
  g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+.07);n.connect(f);f.connect(g);g.connect(bus);n.start(t);n.stop(t+.09)}
 function schedule(){
  while(next<ctx.currentTime+1.6){
   const pos=step%BAR,bar=Math.floor(step/BAR),fi=bar%FORM.length,id=FORM[fi],t=next,notes=M[id];
   if(fi===0&&pos===0){pass++;lead=pass%2?'balaban':'kamanca'}
   const first=(notes.find(n=>n[0]!==null)||[66])[0],ch=CH[first];
   if(pos===0)pad(ch,t,S16*BAR);
   const play=id!=='r';
   // 3/8 ritm: DUM . . tek . tek
   if(play&&pass>1){if(pos===0)dum(t,.08);else if(pos===4)tek(t,.018);else if(pos===2&&Math.random()<.4)tek(t,.012)}
   // tar: yumşaq arpecio
   if(pos===0)tar(ch[0]+12,t,play?.038:.028,1.2);else if(pos===2||pos===4)tar(ch[pos/2]+12,t,.024,.7);
   if(pos===5&&Math.random()<.4)qanun(ch[Math.random()*3|0]+36,t,.018);
   // melodiya
   let acc=0;for(const [m,l,o] of notes){if(acc===pos){if(m!==null){let st=t,dur=l*S16;
     const L=lead==='balaban'?balaban:kamanca,v=lead==='balaban'?.05:.042;
     if(o==='t'){L(UP[m],st,.1,v*.8,prevM);st+=.1;dur-=.1;L(m,st,dur*.97,v,UP[m])}
     else L(m,st,dur*.97,v,o==='g'?m-2:(prevM!==null&&Math.abs(prevM-m)<=2&&Math.random()<.4?prevM:null));
     if(l>=6)qanun(m+12,t+E,.016);
     prevM=m}break}acc+=l}
   step++;next+=S16;
  }
 }
 function vol(){return (S.vol/100)*.8}
 return{
  start(){if(!S.music)return;try{if(!ctx)init();ctx.resume();if(on)return;on=true;startWaves();next=ctx.currentTime+.1;schedule();timer=setInterval(schedule,300);
   master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setValueAtTime(master.gain.value,ctx.currentTime);master.gain.linearRampToValueAtTime(vol(),ctx.currentTime+3)}catch(e){}},
  stop(){if(!ctx||!on)return;on=false;clearInterval(timer);master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setValueAtTime(master.gain.value,ctx.currentTime);master.gain.linearRampToValueAtTime(0,ctx.currentTime+.8)},
  setVol(){if(ctx&&on){master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setTargetAtTime(vol(),ctx.currentTime,.1)}},
  duck(d){if(ctx&&duckG)duckG.gain.setTargetAtTime(d?.25:1,ctx.currentTime,.15)},
  pause(){if(ctx)ctx.suspend()},resume(){if(ctx&&on)ctx.resume()}
 };
})();
$('bMusic').onclick=()=>{S.music=!S.music;save();renderSettings();S.music?BGM.start():BGM.stop()};
$('vol').addEventListener('input',e=>{S.vol=+e.target.value;save();BGM.setVol()});
document.addEventListener('visibilitychange',()=>{document.hidden?BGM.pause():BGM.resume()});

// ---------- hoş geldin ----------
$('bMsg').onclick=()=>{$('nameIn').value=S.name;$('mWel').hidden=false};
$('bWel').onclick=()=>{const n=$('nameIn').value.trim();if(n)S.name=n;save();$('mWel').hidden=true;renderHome();
 $('mascot').className='mascot hop';setTimeout(()=>$('mascot').className='mascot',1200);speak('안녕하세요! 같이 공부해요.')};

// ---------- ses (kadın sesi öncelikli) ----------
let voice=null,KOV=[],maleReal=null;
const RATES=[[.4,'rSlow2'],[.65,'rSlow'],[1,'rNorm']];
if(!RATES.some(([r])=>r===S.rate))S.rate=S.rate<.6?.4:S.rate<.8?.65:1;
const FEMALE=/yuna|sora|sunhi|heami|jimin|seoyeon|female|여성|google 한국의|standard-a|wavenet-a|neural2-a/i;
const MALE=/injoon|minsu|hyunsu|bongjin|gookmin|\bmale\b|남성|standard-c|standard-d|wavenet-c|wavenet-d|neural2-c/i;
function pickVoice(){try{KOV=speechSynthesis.getVoices().filter(v=>/^ko/i.test(v.lang));
 maleReal=KOV.find(v=>MALE.test(v.name))||null;
 const fem=KOV.find(v=>FEMALE.test(v.name))||KOV.find(v=>!MALE.test(v.name))||KOV[0]||null;
 voice=S.voice==='male'?(maleReal||fem):(S.voice&&KOV.find(v=>v.voiceURI===S.voice||v.name===S.voice))||fem}catch(e){}
 if($('mSet')&&!$('mSet').hidden)renderVoices()}
function voiceLabel(v){let n=v.name.replace(/^Microsoft\s+/,'').replace(/\s*\(.*?\)\s*/g,' ').replace(/Online|Natural/g,'').replace(/\s*-\s*Korean.*$/i,'').replace(/\s+/g,' ').trim();
 if(/google/i.test(v.name))n='Google 한국의 (Chrome)';
 if(/premium/i.test(v.voiceURI+v.name))n+=' · '+t('vHQ2');else if(/enhanced/i.test(v.voiceURI+v.name))n+=' · '+t('vHQ');
 return n+(v.localService===false&&!/google/i.test(v.name)?' · '+t('vOnline'):'')}
function renderVoices(){const sel=$('voiceSel');if(!sel)return;
 const seen=new Set(),vs=[...KOV].sort((a,b)=>(/google/i.test(b.name)-/google/i.test(a.name))).filter(v=>{const k=voiceLabel(v);if(seen.has(k))return false;seen.add(k);return true});
 sel.innerHTML=`<option value="">${esc(t('vAuto'))}</option><option value="low1">${esc(t('vLow1'))}</option><option value="low2">${esc(t('vLow2'))}</option>`+(maleReal?`<option value="male">${esc(t('vMale'))}</option>`:'')+`<option value="gt">${esc(t('vGT'))}</option>`
  +vs.map(v=>`<option value="${esc(v.voiceURI)}">${esc(voiceLabel(v))}</option>`).join('');
 if(S.voice==='male'&&!maleReal)S.voice='low2';
 sel.value=(['gt','low1','low2'].includes(S.voice)||(S.voice==='male'&&maleReal)||vs.some(v=>v.voiceURI===S.voice))?S.voice:''}
try{pickVoice();speechSynthesis.onvoiceschanged=pickVoice;setTimeout(pickVoice,800)}catch(e){}
// Google Çeviri sesi (internet gerekir; olmazsa cihaz sesine döner)
const GTA=new Audio();GTA.preload='auto';try{GTA.referrerPolicy='no-referrer';GTA.crossOrigin=null}catch(e){}
let gtUnlocked=false;
const SILENT=(()=>{const n=800,b=new ArrayBuffer(44+n),d=new DataView(b),w=(o,t)=>{for(let k=0;k<t.length;k++)d.setUint8(o+k,t.charCodeAt(k))};
 w(0,'RIFF');d.setUint32(4,36+n,true);w(8,'WAVE');w(12,'fmt ');d.setUint32(16,16,true);d.setUint16(20,1,true);d.setUint16(22,1,true);d.setUint32(24,8000,true);d.setUint32(28,8000,true);d.setUint16(32,1,true);d.setUint16(34,8,true);w(36,'data');d.setUint32(40,n,true);for(let k=0;k<n;k++)d.setUint8(44+k,128);
 return URL.createObjectURL(new Blob([b],{type:'audio/wav'}))})();
document.addEventListener('pointerdown',()=>{if(gtUnlocked)return;gtUnlocked=true;
 try{GTA.src=SILENT;GTA.play().catch(()=>{})}catch(e){}},{capture:true});
function speakDevice(text,male){
 speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='ko-KR';
 const v=male?(maleReal||voice):voice;if(v)u.voice=v;
 const r=+S.rate||1;u.rate=r;
 u.pitch=male?(maleReal?1:.65):S.voice==='low1'?.8:S.voice==='low2'?.62:(v&&FEMALE.test(v.name)||S.voice)?1:1.15;
 BGM.duck(true);u.onend=u.onerror=()=>BGM.duck(false);speechSynthesis.speak(u)}
function speakGT(text){
 try{speechSynthesis.cancel()}catch(e){}
 let done=false;const fail=()=>{if(done)return;done=true;BGM.duck(false);try{speakDevice(text,false)}catch(e){}};
 GTA.onended=()=>{done=true;BGM.duck(false)};GTA.onerror=fail;
 GTA.src='https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ko&q='+encodeURIComponent(text.slice(0,190));
 const r=+S.rate||1;try{GTA.preservesPitch=true;GTA.playbackRate=Math.max(.35,r)}catch(e){}
 BGM.duck(true);const p=GTA.play();if(p&&p.catch)p.catch(fail)}
function speak(text,force){
 if(!S.auto&&!force)return;
 try{try{GTA.pause()}catch(e){}
  if(S.voice==='gt'&&navigator.onLine!==false)speakGT(text);else speakDevice(text,S.voice==='male')}catch(e){}
}

// ---------- uygulama içi tarayıcı → Chrome ----------
const URL0='https://jindam1799.github.io/koreya_dili_TOPIK/';
const ua=navigator.userAgent||'';
const inApp=/KAKAOTALK|Instagram|FBAN|FBAV|FB_IAB|Line\/|NAVER|DaumApps|everytimeApp|Twitter|Snapchat|TikTok|musical_ly|WhatsApp|Telegram|; wv\)/i.test(ua);
const isAndroid=/Android/i.test(ua),isIOS=/iPhone|iPad|iPod/i.test(ua);
const bare=URL0.replace(/^https?:\/\//,'');
$('openChrome').href=/KAKAOTALK/i.test(ua)?'kakaotalk://web/openExternal?url='+encodeURIComponent(URL0)
 :isAndroid?'intent://'+bare+'#Intent;scheme=https;package=com.android.chrome;end'
 :isIOS?'googlechromes://'+bare:URL0;
// Uygulama içi tarayıcıdan (KakaoTalk, Instagram…) otomatik olarak Chrome'a geç (bir kez)
const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone;
if(inApp&&!standalone&&(isAndroid||/KAKAOTALK/i.test(ua))){
 let tried=false;try{tried=sessionStorage.getItem('toChrome')==='1';sessionStorage.setItem('toChrome','1')}catch(e){}
 if(!tried)setTimeout(()=>{location.href=$('openChrome').href},300);
}
// Ana ekrana ekleme
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('bInstall').hidden=false});
$('bInstall').onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice.catch(()=>{});deferredPrompt=null;$('bInstall').hidden=true};
if(standalone)$('a2hs').hidden=true;

// ---------- başlat ----------
S.level=Math.max(S.level,levelOf(S.xp));
applyLang();
$('nameIn').value=S.name;
$('iScene').innerHTML=sceneSVG();$('iMascot').innerHTML=art();
let introDone=false;
function closeIntro(){if(introDone)return;introDone=true;$('intro').classList.add('out');BGM.start();setTimeout(()=>{$('intro').remove();if(location.hash==='#kontrol')openReview();else $('mWel').hidden=false},550)}
$('intro').addEventListener('click',closeIntro);
document.addEventListener('keydown',e=>{if(!introDone){e.preventDefault();closeIntro()}},{capture:true});
$('intro').focus();
if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('sw.js').catch(()=>{});
}
