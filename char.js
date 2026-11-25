/* 캐릭터 그림: 진담중국어 '중국어덩어리의 숲'(jindam_forest_student_hsk3.0)의 식물 친구 그림을 그대로 가져왔어요. */
(function(){
let profile={routes:{},branches:{}};const EDITION='student';const STUDENT_BG='x';
  const GROWTH = {
    petal:{name:'마음꽃',icon:'🌷',routes:[
      {id:'sunflower',name:'햇살의 길',final:'황금 해바라기',gift:'햇살 보석',badge:'☀️'},
      {id:'rose',name:'우아함의 길',final:'여왕 장미',gift:'장미 보석',badge:'🌹'},
      {id:'hibiscus',name:'용기의 길',final:'용감한 무궁화',gift:'용기 보석',badge:'🌺'}
    ]},
    mushroom:{name:'마음송이',icon:'🍄',routes:[
      {id:'matsutake',name:'든든함의 길',final:'대왕 송이버섯',gift:'숲의 보석',badge:'🌲'},
      {id:'horn',name:'멋쟁이의 길',final:'멋쟁이 뿔버섯',gift:'뿔 보석',badge:'🔶'},
      {id:'reishi',name:'윤기의 길',final:'잘생긴 영지버섯',gift:'호박 보석',badge:'🟠'}
    ]},
    succulent:{name:'마음담이',icon:'🪴',routes:[
      {id:'undulata',name:'물결의 길',final:'거대한 온두라타',gift:'물결 보석',badge:'💧'},
      {id:'euphorbia',name:'새침함의 길',final:'새침한 괴마옥',gift:'잎새 보석',badge:'🍃'},
      {id:'cactus',name:'끈기의 길',final:'끈질긴 칵투스',gift:'사막 보석',badge:'🌵'}
    ]}
  };
  const STUDENT_PETS=['clover','berry','tree'];
  // 체험판(무료판)은 마음꽃·마음송이 두 갈래만 고를 수 있어요. 이미 마음담이를 키우던 친구는 그대로 키워요.
  const FREE_LOCKED=EDITION==='free'?['succulent',...STUDENT_PETS]:STUDENT_PETS;
  const FREE_LEGACY=new Set();
  if(EDITION==='free')try{for(let i=0;i<3;i++){const f=JSON.parse(localStorage.getItem(forestKey(i))||'null')?.family;if(f==='succulent')FREE_LEGACY.add(f);}}catch{}
  const petAllowed=pet=>!FREE_LOCKED.includes(pet)||Boolean(STUDENT_BG)||FREE_LEGACY.has(pet);
  Object.assign(GROWTH,{
    clover:{name:'마음잎',icon:'🍀',routes:[
      {id:'lucky',name:'행운의 길',final:'행운의 네잎클로버',gift:'행운 보석'},
      {id:'silver',name:'달빛의 길',final:'달빛 은빛클로버',gift:'달빛 보석'},
      {id:'crimson',name:'다정함의 길',final:'다정한 붉은토끼풀',gift:'다정 보석'}]},
    berry:{name:'마음열매',icon:'🍓',routes:[
      {id:'strawberry',name:'달콤함의 길',final:'달콤한 왕딸기',gift:'딸기 보석'},
      {id:'blueberry',name:'별빛의 길',final:'별빛 블루베리',gift:'별빛 보석'},
      {id:'raspberry',name:'생기의 길',final:'생기 가득 산딸기',gift:'생기 보석'}]},
    tree:{name:'마음나무',icon:'🌳',routes:[
      {id:'oak',name:'든든함의 길',final:'든든한 참나무',gift:'참나무 보석'},
      {id:'willow',name:'바람의 길',final:'바람결 버드나무',gift:'바람 보석'},
      {id:'ginkgo',name:'황금빛의 길',final:'황금빛 은행나무',gift:'은행 보석'}]}
  });
  // Lv.15 두 갈래(이름) → Lv.20 최종 진화(최종 이름). 나무 '바람의 길'에는 대나무가 있어요.
  const ROUTE_BRANCHES={
    sunflower:[['twinsun','당당한 라플레시아','태양을 삼킨 타이탄 아룸'],['moonflower','날렵한 극락조화','해를 품은 부상목']],
    rose:[['crimsonrose','배고픈 파리지옥','태고의 거대 벌레잡이통풀'],['bluerose','째깍째깍 시계꽃','하늘에서 내린 만다라화']],
    hibiscus:[['hongdansim','고요한 연꽃','천년 잠에서 깬 아라홍련'],['baekdansim','나풀나풀 호접란','일곱 보석 칠보수']],
    matsutake:[['goldmatsutake','신비한 동충하초','산신령의 천년 산삼'],['twinmatsutake','레이스 두른 망태버섯','춤추는 요정의 고리']],
    horn:[['firehorn','반짝이는 야광버섯','태고의 거인 프로토택사이트'],['icehorn','퐁퐁 뿜는 먼지버섯','만년설 속 천산 설련화']],
    reishi:[['redreishi','단단한 말굽버섯','진시황이 찾던 불로초'],['nightreishi','수줍은 먹물버섯','한밤의 도깨비불 버섯']],
    undulata:[['pinkwave','통통한 에케베리아','천년을 사는 웰위치아'],['silverwave','동글동글 녹영','고생대의 칼라미테스']],
    euphorbia:[['bloomeuphorbia','뜨거운 사막의 장미','거꾸로 선 바오밥나무'],['violeteuphorbia','돌인 척하는 리톱스','최초의 식물 쿡소니아']],
    cactus:[['bloomcactus','폭신한 토끼귀 선인장','용의 피를 품은 용혈수'],['goldcactus','달밤의 월하미인','삼천 년에 한 번 피는 우담바라']],
    lucky:[['fiveleaf','사랑스러운 사랑초','신화 속 황금사과나무'],['goldclover','돌돌 말린 고사리 새순','공룡 시대의 나무고사리']],
    silver:[['starclover','용감한 에델바이스','오천 살 브리슬콘 소나무'],['frostclover','알록달록 수국','쥐라기의 아라우카리아']],
    crimson:[['bouquetclover','보송보송 토끼꼬리풀','바람을 타는 소원 민들레'],['ringclover','다정한 금낭화','두 나무가 하나 된 연리지']],
    strawberry:[['whiteberry','등불 든 꽈리','신선의 천도복숭아'],['berryfield','줄무늬 수박 덩굴','흥부네 보물 박넝쿨']],
    blueberry:[['violetberry','주렁주렁 포도 덩굴','억만 년을 견딘 소철'],['frostberry','폭신폭신 목화','하늘을 덮는 구름 목화']],
    raspberry:[['goldraspberry','멋쟁이 파인애플','하늘까지 닿은 콩나무'],['blackberry','화끈한 고추','봉황이 깃든 봉황목']],
    oak:[['elderoak','팔 벌린 반얀나무','세상을 떠받친 세계수'],['maple','붉게 물든 단풍나무','마을을 지키는 천년 당산나무']],
    willow:[['bamboo','곧게 뻗은 대나무','백 년 만에 꽃핀 대나무숲'],['weepingcherry','화사한 벚나무','하늘이 내린 신단수']],
    ginkgo:[['elderginkgo','키다리 메타세쿼이아','석탄기의 거인 인목'],['moonginkgo','향기로운 매화나무','달나라 계수나무']]
  };
  for(const info of Object.values(GROWTH))for(const r of info.routes)r.branches=(ROUTE_BRANCHES[r.id]||[]).map(([id,name,final])=>({id,name,final}));
  const routeFor=(pet,routes)=>GROWTH[pet]?.routes.find(r=>r.id===routes?.[pet]);
  const branchFor=(pet,routes,branches)=>routeFor(pet,routes)?.branches.find(b=>b.id===branches?.[pet]);
  function safeBranches(raw,level,routes){
    const out={};
    if(level>=15)for(const [pet,rid] of Object.entries(routes||{})){const r=GROWTH[pet]?.routes.find(x=>x.id===rid);if(r&&r.branches.some(b=>b.id===raw?.[pet]))out[pet]=raw[pet];}
    return out;
  }
  function safeRoutes(raw,level){
    const routes={};
    if(level>=3)for(const [pet,info] of Object.entries(GROWTH))if(petAllowed(pet)&&info.routes.some(r=>r.id===raw?.[pet]))routes[pet]=raw[pet];
    return routes;
  }
  const growthStage=(level,route)=>level===1?0:level<3?1:level>=10&&route?4:level>=4?3:2;
  const displayPet=(pet,level)=>level===1?'seed':level===2||!GROWTH[pet]?'sprout':pet;
  function growthName(pet,routes,level,branches=profile.branches){
    if(level===1)return '마음씨';if(level===2||!GROWTH[pet])return '마음싹';
    const route=routeFor(pet,routes),br=branchFor(pet,routes,branches);
    if(level>=20&&br)return br.final;
    if(level>=15&&br)return br.name;
    return level>=10&&route?route.final:level>=4?'쑥쑥 자라는 '+GROWTH[pet].name:GROWTH[pet].name;
  }
  const branchOf=(pet,route,level,adult,branch)=>branch!==undefined?branch:(level>=15&&adult&&profile?.routes?.[pet]===route?profile.branches?.[pet]:null);
  const legendForm=(br,level)=>br&&level>=15&&LEGEND.forms[br]?LEGEND.forms[br][level>=20?'l20':'l15']:null;
  function plantGeometry(pet,route,level,branch){
    const family=displayPet(pet,level),adult=level>=10&&Boolean(route);
    const form=adult?legendForm(branchOf(pet,route,level,adult,branch),level):null;
    // Lv.15 → 19: 한 레벨마다 조금씩 커져요. Lv.20은 가장 커요.
    if(form)return {family,adult,scale:level>=20?1:0.84+0.04*(level-15),face:form.face,head:form.head,neck:form.neck,form};
    const scale=family==='seed'?0.7:family==='sprout'?0.8:adult?0.86+0.035*(Math.min(level,14)-10):0.63+0.045*(Math.min(level,9)-3);
    let face=[90,144],head=[90,105],neck=[90,171];
    if(family==='sprout'){face=[90,151];head=[90,102];neck=[90,174];}
    if(family==='petal'){face=[90,91];head=[90,35];neck=[90,142];}
    if(family==='mushroom'){face=adult&&route==='reishi'?[99,148]:[91,157];head=adult&&route==='horn'?[88,25]:[90,39];neck=[91,180];}
    if(family==='succulent'){face=adult&&route==='cactus'?[94,105]:[90,147];head=adult&&route==='cactus'?[94,26]:[90,39];neck=[92,177];}
    if(family==='clover'){face=[90,115];head=[90,53];neck=[90,147];}
    if(family==='berry'){face=[90,119];head=[90,65];neck=[90,156];}
    if(family==='tree'){face=[90,159];head=[90,44];neck=[90,181];}
    return {family,adult,scale,face,head,neck};
  }
  // Botanical-inspired SVG illustrations. Horn mushroom is a fictional form.
  // Cotyledon-like undulating leaves, caudex-and-leaf Euphorbia, and columnar cactus.
  // This is a game growth sequence, not a botanical life-cycle diagram.
  /* =================================================================
   * Lv.15 · Lv.20 변신 모습 (36가지)
   * 각 모습: face 얼굴 위치, head/neck 장식 위치, f15/f20 표정, draw(lv20) 그림
   * 표정 종류: sparkle 별빛눈 · star 별눈 · wink 윙크 · cool 여유 · sleepy 졸림
   *           fierce 씩씩 · heart 하트눈 · laugh 활짝 · surprise 놀람 · owl 부엉이 · panda 판다
   * ================================================================= */
  const LEGEND=(()=>{
    const n=v=>Number(Number(v).toFixed(1));
    const at=(s,w)=>s&&s.includes('=')?s:s&&s!=='none'?` stroke="${s}" stroke-width="${w}" stroke-linejoin="round"`:'';
    const E=(cx,cy,rx,ry,f,s,w,x='')=>`<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" fill="${f}"${at(s,w)}${x}/>`;
    const C=(cx,cy,r,f,s,w,x='')=>`<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${f}"${at(s,w)}${x}/>`;
    const P=(d,f,s,w,x='')=>`<path d="${d}" fill="${f}"${at(s,w)}${x}/>`;
    const L=(d,s,w,x='')=>`<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${x}/>`;
    const R=(x,y,w,h,r,f,s,sw)=>`<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${n(r)}" fill="${f}"${at(s,sw)}/>`;
    const G=(t,c)=>`<g transform="${t}">${c}</g>`;
    const op=o=>` opacity="${o}"`;
    const rot=(a,x,y)=>` transform="rotate(${n(a)} ${n(x)} ${n(y)})"`;
    const star=(x,y,r,f='#f6d66b',s='#fffbe8')=>P(`M${n(x)} ${n(y-r)}L${n(x+r*.28)} ${n(y-r*.28)}L${n(x+r)} ${n(y)}L${n(x+r*.28)} ${n(y+r*.28)}L${n(x)} ${n(y+r)}L${n(x-r*.28)} ${n(y+r*.28)}L${n(x-r)} ${n(y)}L${n(x-r*.28)} ${n(y-r*.28)}Z`,f,s,.8);
    const star5=(x,y,r,f='#f4c542',s='#b8871c')=>{let d='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.45:r;d+=(i?'L':'M')+n(x+Math.cos(a)*rr)+' '+n(y+Math.sin(a)*rr);}return P(d+'Z',f,s,1.2);};
    const leaf=(x,y,a,s,f='#6f9e57',st='#416e42')=>G(`translate(${n(x)} ${n(y)}) rotate(${n(a)}) scale(${n(s)})`,P('M0 0Q-24 -24 0 -58Q26 -26 0 0Z',f,st,1.4)+L('M0 -4V-50','#c9dca8',1.2));
    const cloud=(x,y,s,f='#ffffff',o=1)=>G(`translate(${n(x)} ${n(y)}) scale(${n(s)})`,C(-18,4,14,f)+C(0,-6,18,f)+C(20,2,15,f)+R(-30,2,62,16,8,f)).replace(/<g /,`<g opacity="${o}" `);
    const bloom=(x,y,r,f,c='#f3cf5a',k=5)=>{let o='';for(let i=0;i<k;i++){const a=i*2*Math.PI/k-Math.PI/2;o+=C(x+Math.cos(a)*r*.9,y+Math.sin(a)*r*.9,r*.7,f,'#ffffff',.6);}return o+C(x,y,r*.55,c);};
    const heart=(x,y,s,f)=>P(`M${n(x)} ${n(y+s*.9)}C${n(x-s*1.6)} ${n(y-s*.1)} ${n(x-s*.7)} ${n(y-s*1.3)} ${n(x)} ${n(y-s*.4)}C${n(x+s*.7)} ${n(y-s*1.3)} ${n(x+s*1.6)} ${n(y-s*.1)} ${n(x)} ${n(y+s*.9)}Z`,f);
    const note=(x,y,f='#5a4a8a')=>E(x,y,4,3,f,'',0,rot(-20,x,y))+L(`M${n(x+3.5)} ${n(y-1)}V${n(y-15)}l6 3`,f,1.6);
    const shadow=(w=58)=>E(90,194,w,6,'#35503a','',0,op(.18));
    const sparkleSet=()=>star(20,30,7)+star(160,22,6)+star(166,128,5)+star(12,118,5)+star(92,6,5);

    /* ---------- 표정 ---------- */
    const INK='#2f3a28';
    // 얼굴은 마음씨·마음잎처럼 작고 자연스럽게: 작은 점 눈 + 작은 입. 표정만 살짝 달라요.
    function face(style,fx,fy,s=1,ink=INK){
      const d=10*s,r=2.4*s,hl=ink===INK?'#ffffff':'#3a2a2a';
      const eye=(x)=>E(x,fy,r,r*1.15,ink)+C(x-r*.35,fy-r*.45,r*.36,hl,'',0,op(.9));
      const eyes=eye(fx-d)+eye(fx+d);
      const arcs=(up=true)=>L(`M${n(fx-d-3*s)} ${n(fy+(up?1:-1)*s)}q${n(3*s)} ${n((up?-4:4)*s)} ${n(6*s)} 0M${n(fx+d-3*s)} ${n(fy+(up?1:-1)*s)}q${n(3*s)} ${n((up?-4:4)*s)} ${n(6*s)} 0`,ink,1.9*s);
      const smile=(w=4)=>L(`M${n(fx-w*s)} ${n(fy+6.5*s)}Q${n(fx)} ${n(fy+10.5*s)} ${n(fx+w*s)} ${n(fy+6.5*s)}`,ink,1.9*s);
      const open=()=>P(`M${n(fx-4.5*s)} ${n(fy+6*s)}Q${n(fx)} ${n(fy+13*s)} ${n(fx+4.5*s)} ${n(fy+6*s)}Z`,'#8a4a3e','',0);
      switch(style){
        case 'laugh':case 'star':return arcs(true)+open();
        case 'wink':return L(`M${n(fx-d-3*s)} ${n(fy+1*s)}q${n(3*s)} ${n(-4*s)} ${n(6*s)} 0`,ink,1.9*s)+eye(fx+d)+smile(4);
        case 'sleepy':return arcs(false)+E(fx,fy+8*s,1.8*s,2.2*s,'#8a4a3e');
        case 'cool':return L(`M${n(fx-d-3*s)} ${n(fy-1*s)}h${n(6*s)}M${n(fx+d-3*s)} ${n(fy-1*s)}h${n(6*s)}`,ink,1.4*s)+eyes+smile(3.5);
        case 'fierce':return L(`M${n(fx-d-3.5*s)} ${n(fy-5*s)}l${n(6*s)} ${n(2*s)}M${n(fx+d+3.5*s)} ${n(fy-5*s)}l${n(-6*s)} ${n(2*s)}`,ink,1.6*s)+eyes+smile(4);
        case 'surprise':return eyes+E(fx,fy+8*s,2*s,2.6*s,'#8a4a3e');
        case 'heart':return eyes+smile(4)+heart(fx+d+8*s,fy-6*s,2.2*s,'#ef8aa0');
        case 'sparkle':return eyes+smile(4)+star(fx+d+9*s,fy-8*s,3*s,'#fff3b0','#e8c85a');
        default:return eyes+smile(4);
      }
    }

    /* ---------- 식물 변신 (Lv.15 신기한 식물 → Lv.20 고대·전설의 식물) ---------- */
    const trunk=(x,top,bot,wt,wb,c,d)=>P(`M${n(x-wb/2)} ${bot}Q${n(x-wt/2-3)} ${n((top+bot)/2)} ${n(x-wt/2)} ${top}H${n(x+wt/2)}Q${n(x+wt/2+3)} ${n((top+bot)/2)} ${n(x+wb/2)} ${bot}Z`,c,d,2);
    const petal=(cx,cy,r0,len,w,ang,f,s,sw=1.2)=>E(cx,cy-r0-len/2,w,len/2,f,s,sw,rot(ang,cx,cy));
    const patch=()=>'';
    const blobs=(arr,c,d,w=2)=>arr.map(([x,y,r])=>C(x,y,r,c,d,w)).join('');
    const soil=(c='#6b5238')=>E(90,193,58,6,c,'',0,op(.22));
    const stem=(d,c='#4f7d3a',w=5)=>L(d,c,w);
    const F={};
    const def=(id,l15,l20)=>F[id]={l15,l20};

    /* ===== 마음꽃 · 해바라기 ===== */
    def('twinsun',
      {name:'당당한 라플레시아',face:[90,128],head:[90,70],neck:[90,150],st:'surprise',draw(){let a=soil();
        a+=G('translate(0 34) scale(1 .74)',[0,72,144,216,288].map(ang=>E(90,70,30,36,'#c2412f','#7a1f14',2.5,rot(ang,90,118))).join('')+(()=>{let o='';for(let i=0;i<5;i++)for(const [dx,dy,r] of [[-10,-28,5],[8,-34,4],[0,-44,6],[14,-22,3],[-16,-40,3]])o+=C(90+dx,118+dy,r,'#f5e6d8','',0,rot(i*72,90,118));return o;})());
        a+=E(90,122,30,20,'#8e2a1c','#5c160c',2)+E(90,118,24,13,'#f1d3c8');
        a+=leaf(34,190,-70,.5,'#6f8a4a')+leaf(146,190,70,.5,'#6f8a4a');return a;}},
      {name:'태양을 삼킨 타이탄 아룸',face:[90,96],head:[90,14],neck:[90,138],st:'star',fs:1,draw(){let a=soil();
        // 뒤쪽 잎
        a+=leaf(26,192,-58,.95,'#6f9a52','#456e3a')+leaf(154,192,58,.95,'#6f9a52','#456e3a');
        // 불염포 안쪽(자줏빛)
        a+=P('M22 120Q44 98 90 106Q136 98 158 120Q150 178 90 188Q30 178 22 120Z','#7a2440','#4e1428',2);
        for(let i=0;i<9;i++){const x=34+i*14;a+=L(`M${x} ${118+Math.abs(4-i)*1.5}Q${90+(x-90)*.8} 160 ${90+(x-90)*.55} 184`,'#9a3a58',1.6);}
        // 꽃차례 기둥(육수꽃차례)
        a+=P('M73 152Q68 74 81 24Q90 6 99 24Q112 74 107 152Z','#ead58a','#b39a3e',2.2);
        a+=P('M84 30Q80 80 82 150','none','#f7eab8',4,op(.8));
        for(let y=30;y<150;y+=9)if(y<82||y>114)for(let k=-1;k<=1;k++)a+=C(90+k*(6+(y-20)*.07)+(y%18?2:-2),y,1.3,'#c9ad52');
        // 불염포 바깥(초록, 가장자리 자줏빛 주름)
        a+=P('M12 118Q24 134 40 130Q56 144 72 134Q90 148 108 134Q124 144 140 130Q156 134 168 118Q164 178 90 194Q16 178 12 118Z','#5e8c4c','#3d6634',2.4);
        a+=P('M12 118Q24 134 40 130Q56 144 72 134Q90 148 108 134Q124 144 140 130Q156 134 168 118','none','#8a2a4a',4);
        for(const x of [36,58,90,122,144])a+=L(`M${x} ${x===90?146:138}Q${90+(x-90)*.7} 170 ${90+(x-90)*.5} 190`,'#79a862',1.6);
        a+=P('M30 150Q40 176 70 186','none','#86b46c',3,op(.6));
        return a;}});
    def('moonflower',
      {name:'날렵한 극락조화',face:[82,104],head:[96,40],neck:[82,126],st:'wink',draw(){let a=soil();
        a+=stem('M92 192Q90 150 86 118','#4f7d3a',6)+leaf(92,190,-40,1.05,'#4f8a4a')+leaf(92,190,34,.95,'#5f9a55');
        a+=P('M40 112Q86 92 140 104Q118 120 86 124Q56 124 40 112Z','#4f7d5a','#2f5a3a',2)+P('M44 112Q90 100 134 106','none','#c24a6a',2);
        for(const [ang,len] of [[-40,58],[-20,64],[0,60],[18,52]])a+=P(`M110 104Q${110-len*.25} ${104-len*.6} ${110+Math.sin(ang*Math.PI/180)*len} ${104-len}Q${118+Math.sin(ang*Math.PI/180)*len*.6} ${104-len*.55} 116 104Z`,'#f28b1f','#b85a0a',1.5);
        a+=P('M112 104Q124 70 150 58Q134 80 120 106Z','#3f6fd0','#23408a',1.5);
        a+=patch(82,108,17,11,'#e6f3dc');return a;}},
      {name:'해를 품은 부상목',face:[90,150],head:[90,14],neck:[90,172],st:'star',draw(){let a=soil();
        a+=C(90,70,64,'#ffd36a','',0,op(.35));
        a+=trunk(90,96,192,22,40,'#b8642a','#7a3a14')+L('M90 120L56 80M90 110L126 74M90 132L40 110M90 128L142 106','#b8642a',6);
        for(const [x,y,r] of [[56,76,18],[126,70,20],[40,106,14],[142,102,14],[90,44,22]]){a+=C(x,y,r+6,'#ffb23a','',0,op(.35));a+=C(x,y,r,'#ffcf4a','#e08a1a',2);for(let i=0;i<10;i++)a+=P(`M${x} ${y-r-2}l3 -7 3 7Z`,'#ff9a2a','',0,rot(i*36,x,y));}
        a+=patch(90,152,16,12,'#ffe7c2');return a;}});
    /* ===== 장미 ===== */
    def('crimsonrose',
      {name:'배고픈 파리지옥',face:[90,108],head:[90,52],neck:[90,146],st:'fierce',draw(){let a=soil();
        const trap=(x,y,s,ang)=>G(`translate(${x} ${y}) rotate(${ang}) scale(${s})`,P('M0 0Q-40 -10 -44 -46Q-20 -30 0 -30Z','#7fb24a','#4c7a2a',2)+P('M0 0Q40 -10 44 -46Q20 -30 0 -30Z','#7fb24a','#4c7a2a',2)+P('M0 -4Q-34 -12 -38 -42Q-18 -30 0 -32Q18 -30 38 -42Q34 -12 0 -4Z','#e0504a')+(()=>{let o='';for(let i=0;i<7;i++){o+=L(`M${-44+i*6} ${-46+i*2.4}l-3 -8`,'#c8e27a',1.5)+L(`M${44-i*6} ${-46+i*2.4}l3 -8`,'#c8e27a',1.5);}return o;})());
        a+=trap(40,176,.6,-50)+trap(140,176,.6,50)+trap(64,160,.5,-20)+trap(118,160,.5,20);
        a+=stem('M90 192V150','#4c7a2a',8);
        a+=P('M90 150Q30 136 26 70Q64 92 90 88Z','#8cc255','#4c7a2a',2.5)+P('M90 150Q150 136 154 70Q116 92 90 88Z','#8cc255','#4c7a2a',2.5);
        a+=P('M90 146Q38 132 34 80Q66 98 90 96Q114 98 146 80Q142 132 90 146Z','#e86a64');
        for(let i=0;i<9;i++){a+=L(`M${26+i*4} ${70+i*3}l-6 -10`,'#d9ef8a',2)+L(`M${154-i*4} ${70+i*3}l6 -10`,'#d9ef8a',2);}
        for(const [x,y] of [[70,118],[110,118],[90,130]])a+=L(`M${x} ${y}v-6`,'#f7b0a8',1.5);
        return a;}},
      {name:'태고의 거대 벌레잡이통풀',face:[90,122],head:[90,36],neck:[90,160],st:'laugh',draw(){let a=soil('#3f5a3a');
        a+=L('M10 40Q60 10 90 30Q130 6 172 30','#4c7a2a',4)+leaf(34,34,-110,.5,'#5f9a45')+leaf(150,26,110,.5,'#5f9a45');
        const pit=(x,y,s,c1,c2)=>G(`translate(${x} ${y}) scale(${s})`,P('M-18 -40Q-26 0 -16 30Q0 44 16 30Q26 0 18 -40Z',c1,'#6a4a1a',2)+E(0,-40,20,7,'#b8302a','#6a1a14',2)+E(0,-40,13,4,'#3a1a0a')+P('M-14 -46Q0 -70 20 -52Q6 -54 -14 -46Z',c2,'#6a4a1a',1.5)+C(-8,-10,3,'#b8302a')+C(8,4,2.5,'#b8302a'));
        a+=L('M40 38Q30 70 36 100M150 34Q160 70 146 110','#4c7a2a',2.5)+pit(36,128,.6,'#c9d86a','#8ab34a')+pit(146,138,.55,'#e0a84a','#b8842a');
        a+=L('M90 30Q84 50 90 70','#4c7a2a',3);
        a+=P('M62 80Q50 140 66 176Q90 196 114 176Q130 140 118 80Z','#b9cf5a','#6a7a2a',2.5)+E(90,80,30,10,'#b8302a','#6a1a14',2.5)+E(90,80,21,6,'#3a1a0a');
        for(let i=0;i<9;i++)a+=L(`M${63+i*6.5} ${82+Math.sin(i/8*Math.PI)*6}v5`,'#6a1a14',1.4);
        a+=P('M62 74Q86 36 128 58Q104 58 62 74Z','#8ab34a','#4c7a2a',2);
        for(const [x,y,r] of [[70,140,4],[110,150,5],[80,170,3],[104,120,3]])a+=C(x,y,r,'#c2412f',op(.8));
        a+=patch(90,124,17,12,'#f3f5d0');return a;}});
    def('bluerose',
      {name:'째깍째깍 시계꽃',face:[90,92],head:[90,38],neck:[90,128],st:'sparkle',draw(){let a=soil();
        a+=stem('M90 192Q70 160 88 124','#4f7d3a',5)+L('M78 160q-20 -6 -18 -20q4 -8 10 -2','#6f9e57',2)+leaf(80,168,-70,.8,'#5f9a55')+leaf(88,150,60,.7,'#5f9a55');
        for(let i=0;i<10;i++)a+=petal(90,92,8,40,10,i*36+18,'#f4f0fb','#b9a8d6');
        for(let i=0;i<36;i++){const ang=i*10;a+=L(`M90 ${92-24}v-18`,i%2?'#6a3fb0':'#b98ae8',1.8,rot(ang,90,92))+L(`M90 ${92-38}v-6`,'#ffffff',1.6,rot(ang,90,92));}
        a+=C(90,92,24,'#8a5ac8','#5a2f90',1.5)+C(90,92,19,'#f0e2ff');
        a+=L('M90 72V58M90 58L80 50M90 58L100 50M90 58V46','#6a9a3a',2.5)+C(80,50,3,'#8a5a2a')+C(100,50,3,'#8a5a2a')+C(90,45,3,'#8a5a2a');
        return a;}},
      {name:'하늘에서 내린 만다라화',face:[90,98],head:[90,30],neck:[90,138],st:'sparkle',draw(){let a='';
        a+=cloud(90,186,1.7,'#ffffff',.95);
        for(let i=0;i<16;i++)a+=petal(90,98,20,50,10,i*22.5,i%2?'#f7e6ff':'#e2c8ff','#b08ad8');
        for(let i=0;i<8;i++)a+=petal(90,98,12,32,9,i*45+11,'#ffffff','#d6c2f0');
        a+=C(90,98,22,'#fff3b0','#e0b84a',2);
        for(const [x,y,r] of [[22,40,10],[156,30,9],[20,120,8],[162,128,9],[132,176,7],[48,172,7]])a+=G(`rotate(${x} ${x} ${y})`,(()=>{let o='';for(let i=0;i<8;i++)o+=petal(x,y,2,r,r*.3,i*45,'#f0dcff','#c7a8e8',.8);return o+C(x,y,r*.3,'#fff3b0');})());
        return a;}});
    /* ===== 무궁화 ===== */
    def('hongdansim',
      {name:'고요한 연꽃',face:[90,98],head:[90,34],neck:[90,132],st:'laugh',draw(){let a='';
        a+=E(90,186,84,14,'#9fd3ea','#5a9ac0',2)+E(56,176,34,10,'#5f9a55','#3f6d3c',2)+P('M56 176L64 166','none','#9fd3ea',3);
        a+=stem('M100 184Q108 150 96 128','#4f7d3a',5);
        for(let i=0;i<7;i++)a+=P('M90 128Q64 104 76 60Q90 76 90 128Z','#f7a8c4','#d86a92',1.5,rot(-66+i*22,90,128));
        for(let i=0;i<5;i++)a+=P('M90 124Q74 106 82 74Q92 90 90 124Z','#ffd2e2','#e88aac',1.2,rot(-44+i*22,90,124));
        a+=P('M72 100Q90 88 108 100L104 112Q90 118 76 112Z','#e9d86a','#a8971c',1.5);
        a+=patch(90,100,15,10,'#fff6d6');return a;}},
      {name:'천년 잠에서 깬 아라홍련',face:[90,96],head:[90,26],neck:[90,132],st:'star',draw(){let a='';
        a+=E(90,184,86,16,'#7fbfdc','#4a8ab0',2);
        a+=E(90,176,70,12,'#5fa05a','#2f6d3a',2.5)+E(90,172,62,8,'#7fbf6a')+L('M28 176Q90 158 152 176','#3f7d3a',1.5);
        for(const x of [42,138])a+=C(x,160,10,'#f2c8d8','#d8849f',1.5,op(.8));
        a+=stem('M90 170V130','#4f7d3a',6);
        for(let i=0;i<9;i++)a+=P('M90 130Q52 104 64 44Q90 70 90 130Z','#f28bb0','#b8416a',1.8,rot(-80+i*20,90,130));
        for(let i=0;i<7;i++)a+=P('M90 126Q68 104 76 64Q92 84 90 126Z','#ffc4d8','#e0729a',1.4,rot(-54+i*18,90,126));
        a+=P('M70 98Q90 84 110 98L106 114Q90 122 74 114Z','#e9d86a','#a8971c',1.5);
        a+=patch(90,98,15,10,'#fff6d6');return a;}});
    def('baekdansim',
      {name:'나풀나풀 호접란',face:[96,88],head:[96,42],neck:[96,120],st:'sparkle',draw(){let a=soil();
        a+=E(70,186,34,9,'#3f7d4a','#2a5a34',2,rot(-10,70,186))+E(114,184,32,9,'#4f8d5a','#2a5a34',2,rot(14,114,184));
        a+=L('M84 184Q60 80 128 40Q156 30 160 60','#5a7a3a',3);
        const moth=(x,y,s,c,lip)=>G(`translate(${x} ${y}) scale(${s})`,E(-17,-6,16,13,c,'#c8a0c0',1.2,rot(-25,-17,-6))+E(17,-6,16,13,c,'#c8a0c0',1.2,rot(25,17,-6))+E(-12,10,11,9,c,'#c8a0c0',1.2)+E(12,10,11,9,c,'#c8a0c0',1.2)+E(0,-20,8,12,c,'#c8a0c0',1.2)+P('M-7 10Q0 26 7 10Q0 16 -7 10Z',lip));
        a+=moth(150,62,.6,'#ffffff','#e0508a')+moth(128,48,.7,'#fff0f6','#e0508a');
        a+=moth(96,90,1.35,'#fff5fa','#d83f7a');
        a+=patch(96,90,15,10,'#fffbfd');return a;}},
      {name:'일곱 보석 칠보수',face:[90,150],head:[90,14],neck:[90,172],st:'star',draw(){let a=soil();
        a+=C(90,70,70,'#e8e0ff','',0,op(.35));
        a+=trunk(90,100,192,18,34,'#c9c2d6','#7d7390')+L('M90 120L50 84M90 112L132 76M90 130L36 118M90 126L146 112M90 104V50','#c9c2d6',5);
        const gems=[['#e8403a',50,84],['#f2a33a',132,76],['#f6d66b',36,118],['#5fc46a',146,112],['#4f9ae8',90,48],['#8a5ae0',66,62],['#f07ab8',116,52]];
        for(const [c,x,y] of gems)a+=P(`M${x} ${y-12}L${x+10} ${y-3}L${x+6} ${y+10}H${x-6}L${x-10} ${y-3}Z`,c,'#ffffff',1.5)+P(`M${x-4} ${y-6}L${x} ${y-10}L${x+4} ${y-6}`,'none','#ffffff',1.5)+L(`M${x} ${y-12}v-5`,'#c9c2d6',2);
        for(let i=0;i<12;i++)a+=leaf(90+Math.sin(i*2.4)*56,80+Math.cos(i*2.4)*30,i*33,.3,'#b9d6c8','#6f9a88');
        a+=patch(90,152,14,11,'#f4f1fa');return a;}});
    /* ===== 마음송이 · 신비한 버섯 ===== */
    def('goldmatsutake',
      {name:'신비한 동충하초',face:[90,146],head:[90,30],neck:[90,166],st:'wink',draw(){let a='';
        a+=P('M20 192Q90 172 160 192Z','#8a6a4a')+P('M40 184Q90 170 140 184Q128 196 90 196Q52 196 40 184Z','#b89a6a','#7a5a3a',1.5);
        for(let i=0;i<10;i++)a+=L(`M${50+i*9} 186q2 -4 4 0`,'#7a5a3a',1);
        const club=(x,top,w,c)=>P(`M${x-w*.25} 184Q${x-w*.2} ${top+40} ${x-w*.45} ${top+18}Q${x-w*.6} ${top} ${x} ${top-6}Q${x+w*.6} ${top} ${x+w*.45} ${top+18}Q${x+w*.2} ${top+40} ${x+w*.25} 184Z`,c,'#a8501a',2);
        a+=club(48,70,20,'#f28b3a')+club(132,60,22,'#f07a2a')+club(66,40,18,'#ffa34a')+club(116,46,18,'#ffa34a');
        a+=club(90,20,40,'#ff9a3a');
        for(const [x,y] of [[82,40],[98,52],[86,66],[96,30],[90,80]])a+=C(x,y,2.4,'#ffd08a');
        a+=patch(90,148,14,11,'#fff0dc');return a;}},
      {name:'산신령의 천년 산삼',face:[90,150],head:[90,26],neck:[90,176],st:'laugh',draw(){let a=soil();
        a+=stem('M90 120V70','#5f8a3a',4);
        for(const ang of [-60,0,60])for(let k=0;k<5;k++)a+=leaf(90,70,ang+(k-2)*18,.55,'#5f9a45');
        a+=C(90,56,10,'#e8403a','#8a1f1f',1.5)+[[-8,-6],[8,-6],[0,-12],[-5,4],[6,5]].map(([dx,dy])=>C(90+dx,56+dy,4.5,'#ff5a4a','#8a1f1f',1)).join('');
        a+=P('M76 120Q66 150 72 172Q80 186 90 180Q100 186 108 172Q114 150 104 120Q90 112 76 120Z','#f3e0b8','#b8955a',2.5);
        a+=L('M74 168Q56 176 44 192M106 168Q124 176 136 192M84 180Q80 192 70 198M96 180Q100 192 110 198M72 140Q54 140 44 150M108 140Q126 138 136 150','#d9c090',3);
        for(let y=126;y<170;y+=8)a+=L(`M78 ${y}q12 3 24 0`,'#d9c090',1.2);
        a+=patch(90,150,13,10,'#fdf3de');return a;}});
    def('twinmatsutake',
      {name:'레이스 두른 망태버섯',face:[90,96],head:[90,34],neck:[90,114],st:'star',draw(){let a=soil();
        a+=P('M78 190V80H102V190Z','#fbf6ec','#c9c0ae',2);
        a+=P('M66 80Q66 44 90 42Q114 44 114 80Z','#5a5a3a','#3a3a22',2)+C(90,46,4,'#fbf6ec');
        let net='';for(let i=0;i<8;i++){const t=i/7;net+=L(`M${n(76-t*50)} ${n(84+t*96)}`,'none',0);}
        a+=P('M76 84Q40 130 26 186H154Q140 130 104 84Z','#ffffff','#e0dccf',1.5,op(.55));
        for(let r=0;r<8;r++){const y=92+r*12,w=20+r*9;for(let k=0;k<=r+3;k++){const x=90-w+k*(2*w/(r+3));a+=E(x,y,5,4,'none','#f0ebdc',1.8);}}
        a+=patch(90,98,12,10,'#fffdf8');return a;}},
      {name:'춤추는 요정의 고리',face:[90,120],head:[90,62],neck:[90,146],st:'sparkle',draw(){let a='';
        a+=E(90,176,84,20,'#8fc07a','#5f8a4a',2)+E(90,176,64,13,'#a8d48f');
        const m=(x,y,s,c)=>G(`translate(${x} ${y}) scale(${s})`,R(-5,-14,10,16,4,'#fbf3e0','#c9b89a',1.2)+P('M-16 -12Q-14 -30 0 -30Q14 -30 16 -12Z',c,'#8a5a3a',1.5)+C(-6,-20,2,'#ffffff')+C(5,-24,1.6,'#ffffff'));
        for(let i=0;i<12;i++){const ang=i/12*Math.PI*2;a+=m(90+Math.cos(ang)*70,178+Math.sin(ang)*16,.9+(Math.sin(ang)+1)*.15,i%2?'#e87a6a':'#f6c05a');}
        for(let i=0;i<7;i++)a+=C(40+i*16,70+Math.sin(i)*20,2.5,'#fff3a8',op(.9))+C(40+i*16,70+Math.sin(i)*20,6,'#fff3a8',op(.25));
        a+=R(80,110,20,56,6,'#fbf3e0','#c9b89a',2)+P('M52 116Q56 64 90 62Q124 64 128 116Q90 126 52 116Z','#c77adf','#7a3a9a',2.5);
        for(const [x,y,r] of [[70,90,5],[104,80,6],[90,100,4],[116,104,4]])a+=C(x,y,r,'#f7e6ff');
        a+=patch(90,124,13,10,'#fffaf0');return a;}});
    def('firehorn',
      {name:'반짝이는 야광버섯',face:[90,92],head:[90,40],neck:[90,112],st:'surprise',draw(){let a='';
        a+=C(90,110,86,'#1f3a4a','',0,op(.2));
        a+=P('M14 192Q20 172 60 170H130Q166 172 170 192Z','#6b4a32','#3f2a1a',2)+L('M30 182h40M100 180h50','#8a6a4a',1.5);
        const bell=(x,y,s)=>G(`translate(${x} ${y}) scale(${s})`,C(0,-10,22,'#9ff0d0','',0,op(.3))+L('M0 0V34','#e0fff0',2.5)+P('M-14 0Q-12 -22 0 -22Q12 -22 14 0Q7 -4 0 0Q-7 -4 -14 0Z','#7ff0c0','#2fa080',1.2));
        a+=bell(46,142,.8)+bell(134,138,.9)+bell(62,120,.6)+bell(118,116,.65)+bell(150,160,.5)+bell(32,160,.5);
        a+=L('M90 172V104','#e0fff0',5)+C(90,86,36,'#9ff0d0','',0,op(.3));
        a+=P('M58 106Q60 58 90 56Q120 58 122 106Q106 98 90 106Q74 98 58 106Z','#7ff0c0','#2fa080',2);
        a+=patch(90,94,15,10,'#e8fff6');return a;}},
      {name:'태고의 거인 프로토택사이트',face:[90,120],head:[90,10],neck:[90,150],st:'star',draw(){let a='';
        a+=E(90,194,68,8,'#8a7a5a');
        for(const [x,h] of [[22,120],[160,100]])a+=P(`M${x-8} 194V${194-h}Q${x} ${190-h-12} ${x+8} ${194-h}V194Z`,'#b9a88a','#7a6a4a',2,op(.7));
        a+=P('M64 194V30Q64 8 90 6Q116 8 116 30V194Z','#d8c8a4','#8a7650',3);
        for(let y=26;y<190;y+=14)a+=L(`M66 ${y}q24 6 48 0`,'#b8a67e',1.5);
        for(let y=40;y<190;y+=30)a+=L(`M70 ${y}v12M110 ${y+10}v12`,'#a89468',1.5);
        a+=leaf(30,194,-40,.4,'#6f9a4a')+leaf(150,194,40,.35,'#6f9a4a')+leaf(40,194,20,.3,'#8ab35a');
        a+=patch(90,122,15,11,'#f4ecd8');return a;}});
    def('icehorn',
      {name:'퐁퐁 뿜는 먼지버섯',face:[90,136],head:[90,96],neck:[90,160],st:'heart',draw(){let a=soil();
        for(let i=0;i<8;i++)a+=P('M90 160L72 150Q60 176 90 186Q120 176 108 150Z','#b89a6a','#7a5a3a',2,rot(i*45,90,160));
        a+=G('translate(0 40) scale(1 .75)',(()=>{let o='';for(let i=0;i<8;i++)o+=P('M90 160L80 130Q90 80 100 130Z','#c9a878','#7a5a3a',2,rot(i*45+22,90,160));return o;})());
        a+=C(90,138,26,'#d8c0a0','#8a6a4a',2.5)+C(90,114,4,'#8a6a4a');
        for(let i=0;i<5;i++)a+=C(84+i*4,100-i*8,3+i,'#d8c8b0',op(.6));
        a+=patch(90,140,14,10,'#f6ecdc');return a;}},
      {name:'만년설 속 천산 설련화',face:[90,110],head:[90,36],neck:[90,146],st:'sparkle',draw(){let a='';
        a+=P('M14 194L46 140L66 164L92 118L122 166L140 148L168 194Q90 202 14 194Z','#e8eef8','#b9c7de',2)+P('M46 140L53 152L39 153ZM92 118L101 134L83 135Z','#ffffff');
        for(let i=0;i<14;i++)a+=petal(90,112,6,56,15,i*25.7,'#f4f8e8','#b9c89a');
        for(let i=0;i<8;i++)a+=petal(90,112,4,38,12,i*45+10,'#fbfdf2','#c9d6a8');
        a+=C(90,112,20,'#b98ad8','#6a3a90',1.5)+C(90,112,16,'#e6d4f6');
        for(const [x,y] of [[20,40],[150,30],[160,90],[30,100]])a+=star(x,y,4,'#ffffff','#b9c7de');
        return a;}});
    def('redreishi',
      {name:'단단한 말굽버섯',face:[90,110],head:[90,60],neck:[90,140],st:'cool',draw(){let a='';
        a+=trunk(90,20,194,56,64,'#8a6a4a','#5a4228')+L('M72 30V190M104 40V186','#6f5236',1.5);
        a+=P('M40 126Q40 84 90 80Q140 84 140 126Q90 136 40 126Z','#9a8a70','#5a4a34',2.5)+P('M40 126Q90 118 140 126Q90 146 40 126Z','#f0e0c0','#8a7650',2);
        a+=P('M50 104Q90 96 130 104','none','#c9b89a',3)+P('M46 116Q90 108 134 116','none','#6a5a44',2.5);
        a+=P('M58 72Q58 48 90 46Q122 48 122 72Q90 80 58 72Z','#8a7a60','#5a4a34',2)+P('M58 72Q90 66 122 72Q90 84 58 72Z','#e8d8b8');
        a+=patch(90,112,14,9,'#f6ead4');return a;}},
      {name:'진시황이 찾던 불로초',face:[90,120],head:[90,56],neck:[90,150],st:'star',draw(){let a='';
        a+=cloud(34,170,.8,'#ffffff',.9)+cloud(148,176,.9,'#ffffff',.9);
        a+=L('M90 194Q100 160 88 140','#7a2a1a',12)+L('M92 180Q60 160 56 130','#7a2a1a',7)+L('M94 176Q126 150 130 118','#7a2a1a',7);
        const cap=(x,y,s)=>G(`translate(${x} ${y}) scale(${s})`,P('M-40 6C-44 -22 -18 -34 0 -24C18 -34 44 -22 40 6Q0 16 -40 6Z','#b8352c','#f0c068',5)+P('M-30 2C-32 -16 -14 -24 0 -16C14 -24 32 -16 30 2Q0 10 -30 2Z','#8a1f1c','#d9675a',3)+P('M-18 -2C-18 -10 -8 -14 0 -8C8 -14 18 -10 18 -2Q0 3 -18 -2Z','#6a1210'));
        a+=cap(56,128,.7)+cap(130,116,.75)+cap(90,120,1.15);
        a+=C(90,120,40,'#ffd36a','',0,op(.15));
        a+=patch(90,122,15,9,'#fbe6c8');return a;}});
    def('nightreishi',
      {ink:'#fff6e6',name:'수줍은 먹물버섯',face:[90,82],head:[90,24],neck:[90,132],st:'sleepy',draw(){let a=soil();
        a+=R(82,120,16,72,6,'#fbf8f0','#c9c0ae',2);
        a+=P('M62 124Q58 60 66 34Q90 12 114 34Q122 60 118 124Z','#f4f0e6','#b9b09a',2.5);
        for(let r=0;r<6;r++)for(let k=0;k<4;k++)a+=P(`M${68+k*12+(r%2?6:0)} ${40+r*14}q4 6 8 0`,'none','#c9b89a',1.5);
        a+=P('M62 124Q66 134 70 126Q74 138 80 126Q86 140 92 126Q98 138 104 126Q110 136 114 126Q118 132 118 124Z','#2a2a3a');
        for(const [x,l] of [[68,14],[86,20],[106,12]])a+=P(`M${x} 130q-3 ${l} 0 ${l+4}q3 -4 0 -${l+4}Z`,'#2a2a3a');
        a+=patch(90,84,15,10,'#fffdf6');return a;}},
      {name:'한밤의 도깨비불 버섯',face:[90,108],head:[90,50],neck:[90,140],st:'laugh',draw(){let a='';
        a+=C(90,110,86,'#1a2a4a','',0,op(.2));
        for(const [x,y,r] of [[26,60,10],[154,50,9],[20,130,8],[160,120,9],[60,30,6],[124,26,6]])a+=C(x,y,r+8,'#7fd8ff','',0,op(.2))+C(x,y,r,'#bff0ff','#6fd0e6',1.2)+P(`M${x-r*.7} ${y-r*.3}Q${x} ${y-r*2.4} ${x+r*.7} ${y-r*.3}Z`,'#dff8ff',op(.9));
        a+=L('M90 192Q84 160 90 136','#dff8ff',8);
        a+=C(90,104,50,'#7fd8ff','',0,op(.25));
        a+=P('M46 128Q42 62 90 58Q138 62 134 128Q112 118 90 128Q68 118 46 128Z','#5fc0e8','#2a7aa8',2.5);
        for(const [x,y,r] of [[64,88,5],[112,82,6],[88,72,4],[74,110,3],[116,108,4]])a+=C(x,y,r,'#dff8ff');
        a+=patch(90,110,15,10,'#e8fbff');return a;}});
    /* ===== 마음담이 · 다육 ===== */
    def('pinkwave',
      {name:'통통한 에케베리아',face:[90,128],head:[90,70],neck:[90,160],st:'laugh',draw(){let a=soil();
        for(let i=0;i<11;i++)a+=petal(90,140,4,50,16,i*32.7,'#9fc0b8','#6f9088',1.5);
        for(let i=0;i<9;i++)a+=petal(90,138,2,38,13,i*40+18,'#b8d4cc','#7f9f97',1.5);
        for(let i=0;i<7;i++)a+=petal(90,136,0,26,10,i*51+8,'#cfe4dd','#8faba3',1.2);
        for(let i=0;i<11;i++){const ang=(i*32.7-90)*Math.PI/180;a+=C(90+Math.cos(ang)*54,140+Math.sin(ang)*54,3.5,'#f08aa8');}
        a+=patch(90,132,15,10,'#effaf5');return a;}},
      {ink:'#fff6e6',name:'천년을 사는 웰위치아',face:[90,160],head:[90,120],neck:[90,176],st:'star',draw(){let a='';
        a+=E(90,194,68,8,'#e8c890');
        a+=P('M76 170Q30 150 10 176Q4 190 30 186Q20 176 40 172Q56 176 70 180Z','#6f8a3a','#3f5a1a',2)+L('M70 174Q40 162 20 180','#9ab45a',1.5)+P('M12 184q-6 6 2 8M22 186q-2 8 6 6','none','#8a6a3a',2);
        a+=P('M104 170Q150 150 170 176Q176 190 150 186Q160 176 140 172Q124 176 110 180Z','#6f8a3a','#3f5a1a',2)+L('M110 174Q140 162 160 180','#9ab45a',1.5)+P('M168 184q6 6 -2 8M158 186q2 8 -6 6','none','#8a6a3a',2);
        a+=P('M60 190Q56 150 90 144Q124 150 120 190Z','#8a5a3a','#5a3a1a',2.5);
        for(const [x,y] of [[76,140],[104,138],[90,132]])a+=L(`M${x} 146Q${x} ${y} ${x+(x<90?-10:10)} ${y-20}`,'#8a5a3a',2.5)+C(x+(x<90?-10:10),y-22,6,'#c2412f','#7a1f14',1.5)+C(x+(x<90?-10:10),y-22,3,'#e8703a');
        a+=patch(90,164,14,10,'#f3e0c8');return a;}});
    def('silverwave',
      {name:'동글동글 녹영',face:[90,74],head:[90,30],neck:[90,98],st:'sleepy',draw(){let a='';
        for(let s=0;s<9;s++){const x=46+s*11,len=70+(s%3)*30;for(let k=0;k<len/10;k++)a+=C(x+Math.sin(k*.6+s)*4,86+k*10,4.8,k%2?'#8cc46a':'#9fd67a','#4f8a3a',1);}
        a+=C(90,74,38,'#9fd67a','#4f8a3a',2);
        for(let i=0;i<14;i++)a+=C(90+Math.cos(i*.45)*30,74+Math.sin(i*.45)*22,6,'#b4e38c','#4f8a3a',1);
        a+=patch(90,76,16,11,'#f0fbe6');return a;}},
      {name:'고생대의 칼라미테스',face:[90,140],head:[90,6],neck:[90,164],st:'star',fs:.95,draw(){let a='';
        a+=E(90,194,68,8,'#5a7a4a');
        const horse=(x,top,w,col)=>{let o=R(x-w/2,top,w,194-top,w/2.5,col,'#3f5a2a',1.8);for(let y=top+20;y<190;y+=22){o+=L(`M${x-w/2} ${y}h${w}`,'#3f5a2a',2);for(let k=-3;k<=3;k++)if(k)o+=L(`M${x} ${y}l${k*9} -10`,'#6f9a4a',1.6);}return o;};
        a+=horse(30,70,10,'#8ab35a')+horse(150,50,10,'#8ab35a')+horse(56,40,12,'#7aa84a')+horse(126,30,12,'#7aa84a');
        a+=horse(90,10,34,'#9ac45a');
        a+=patch(90,142,14,10,'#eef8d8');return a;}});
    def('bloomeuphorbia',
      {name:'뜨거운 사막의 장미',face:[90,150],head:[90,60],neck:[90,176],st:'wink',draw(){let a=soil();
        a+=P('M58 192Q40 150 64 124Q90 110 116 124Q140 150 122 192Z','#c9a878','#8a6a3a',2.5);
        a+=L('M78 124Q70 96 56 80M100 122Q110 92 130 76M90 118V88','#b8956a',7);
        for(const [x,y] of [[56,76],[130,72],[90,84]])for(let k=0;k<4;k++)a+=leaf(x,y,-60+k*40,.4,'#5f9a45');
        const tr=(x,y,s)=>G(`translate(${x} ${y}) scale(${s})`,[0,72,144,216,288].map(ang=>E(0,-12,9,12,'#f26a9a','#b8386a',1.2,rot(ang,0,0))).join('')+C(0,0,6,'#fff0f6'));
        a+=tr(50,62,1)+tr(134,58,1)+tr(92,64,.9)+tr(70,50,.7)+tr(114,44,.7);
        a+=patch(90,152,15,11,'#f2e2c4');return a;}},
      {name:'거꾸로 선 바오밥나무',face:[90,140],head:[90,20],neck:[90,168],st:'laugh',draw(){let a='';
        a+=E(90,194,68,8,'#e0b870');
        a+=P('M50 194Q34 120 58 70H122Q146 120 130 194Z','#c9a07a','#7a5a3a',3);
        for(const x of [70,90,110])a+=L(`M${x} 80Q${x+4} 140 ${x} 190`,'#b08a64',1.5);
        a+=L('M62 72L40 44M62 72L56 30M90 70V26M118 72L124 30M118 72L142 44','#b08a64',7);
        for(const [x,y] of [[40,40],[56,26],[90,22],[124,26],[142,40]])a+=blobs([[x,y,14]],'#6f9a4a','#4f7348',1.5);
        for(const [x,y] of [[48,54],[134,56]])a+=L(`M${x} ${y}v14`,'#8a6a3a',1.5)+E(x,y+22,6,8,'#ffffff','#c9c0ae',1.2);
        a+=patch(90,142,17,12,'#f2dcc0');return a;}});
    def('violeteuphorbia',
      {name:'돌인 척하는 리톱스',face:[90,150],head:[90,84],neck:[90,170],st:'surprise',draw(){let a='';
        a+=E(90,194,68,8,'#d8c090');for(const [x,y] of [[20,190],[160,188],[40,198]])a+=E(x,y,7,4,'#b8a070');
        a+=P('M46 190Q40 120 88 116V190Z','#c9b0a8','#8a6a64',2.5)+P('M134 190Q140 120 92 116V190Z','#c2a8a0','#8a6a64',2.5);
        a+=P('M50 132Q60 118 86 118V134Q66 138 50 132Z','#a8847c',op(.6))+P('M130 132Q120 118 94 118V134Q114 138 130 132Z','#a8847c',op(.6));
        for(let i=0;i<10;i++)a+=petal(90,102,2,20,4.5,i*36,'#ffffff','#e0d8c8',.8);a+=C(90,102,6,'#f6d66b');
        a+=L('M90 108V118','#8a6a64',2);
        a+=patch(90,152,16,11,'#f4ece6');return a;}},
      {name:'최초의 식물 쿡소니아',face:[90,164],head:[90,40],neck:[90,180],st:'star',draw(){let a='';
        a+=E(90,194,68,8,'#6b5a4a')+E(40,186,20,5,'#9fd3ea',op(.7))+E(146,188,16,4,'#9fd3ea',op(.7));
        const fork=(x,y,len,ang,depth)=>{if(!depth)return C(x,y,6,'#e0b84a','#8a6a1a',1.5);const x2=x+Math.sin(ang)*len,y2=y-Math.cos(ang)*len;return L(`M${n(x)} ${n(y)}L${n(x2)} ${n(y2)}`,'#6f9a3a',5-depth*.5)+fork(x2,y2,len*.72,ang-.45,depth-1)+fork(x2,y2,len*.72,ang+.45,depth-1);};
        a+=fork(90,172,42,0,4)+fork(50,188,26,-.2,3)+fork(134,188,26,.2,3);
        a+=E(90,176,26,16,'#8ab35a','#4f7d3a',2);
        a+=patch(90,168,14,10,'#eef8d8');return a;}});
    def('bloomcactus',
      {name:'폭신한 토끼귀 선인장',face:[90,146],head:[90,62],neck:[90,176],st:'laugh',draw(){let a=soil();
        const pad=(x,y,rx,ry,ang)=>E(x,y,rx,ry,'#8cb86a','#4f7d3a',2.5,rot(ang,x,y))+(()=>{let o='';for(let i=0;i<9;i++)o+=C(x+Math.cos(i*1.3)*rx*.6,y+Math.sin(i*1.9)*ry*.6,2.2,'#f4ecc0',op(.9));return o;})();
        a+=pad(90,150,36,40,0)+pad(66,96,18,26,-22)+pad(114,96,18,26,22);
        a+=bloom(66,70,6,'#f6d66b','#f28b3a')+bloom(114,70,6,'#f6d66b','#f28b3a');
        a+=patch(90,148,15,11,'#f0f8e2');return a;}},
      {name:'용의 피를 품은 용혈수',face:[90,150],head:[90,10],neck:[90,172],st:'cool',draw(){let a='';
        a+=E(90,194,68,8,'#d0a870');
        a+=trunk(90,110,194,20,34,'#b8a07a','#6a5a3a');
        for(const [x,y] of [[40,78],[64,70],[90,66],[116,70],[140,78]])a+=L(`M90 112Q${(x+90)/2} ${y+30} ${x} ${y}`,'#b8a07a',6);
        a+=P('M10 86Q20 20 90 14Q160 20 170 86Q90 100 10 86Z','#4f8a4a','#2f5a2a',2.5);
        for(let i=0;i<20;i++)a+=L(`M${14+i*8} 86l-2 -12`,'#6fb35a',2);
        for(const [x,y] of [[70,130],[108,140],[84,172]])a+=P(`M${x} ${y}q-4 8 0 10q4 -2 0 -10Z`,'#c0203f');
        a+=patch(90,152,14,11,'#f2e6cc');return a;}});
    def('goldcactus',
      {name:'달밤의 월하미인',face:[90,76],head:[90,18],neck:[90,112],st:'sparkle',draw(){let a=soil();
        a+=C(150,30,18,'#fff4c8',op(.9));
        a+=P('M60 192Q56 150 70 120Q78 150 70 192Z','#6fa35a','#3f6d3c',2)+P('M120 192Q126 146 110 118Q102 150 110 192Z','#6fa35a','#3f6d3c',2)+P('M86 192Q80 150 90 110Q100 150 94 192Z','#7fb36a','#3f6d3c',2);
        a+=L('M90 112Q100 100 92 94','#b8704a',3);
        for(let i=0;i<14;i++)a+=petal(90,76,12,34,8,i*25.7,'#e8c8a0','#b88a5a');
        for(let i=0;i<14;i++)a+=petal(90,76,8,30,9,i*25.7+12,'#ffffff','#e0dccf');
        a+=C(90,76,14,'#fffbe8','#f0e6b0',1.5);
        return a;}},
      {name:'삼천 년에 한 번 피는 우담바라',face:[90,112],head:[90,40],neck:[90,146],st:'sparkle',draw(){let a='';
        a+=C(90,110,70,'#fff4c8','',0,op(.4));
        a+=L('M20 150Q90 136 160 150','#7a5a3a',4)+leaf(40,146,-100,.4,'#6f9a4a')+leaf(140,146,100,.4,'#6f9a4a');
        for(let i=0;i<9;i++){const x=34+i*14;a+=L(`M${x} 148Q${x+(i-4)*1.5} 120 ${x+(i-4)*2} ${96-Math.abs(i-4)*3}`,'#f4f0e0',1.2)+C(x+(i-4)*2,96-Math.abs(i-4)*3,3,'#fffdf0','#e0d8b8',.8);}
        for(let i=0;i<10;i++)a+=petal(90,112,8,26,8,i*36,'#fffdf4','#e8dcb8');
        a+=C(90,112,14,'#fff3b0','#e0c860',1.5);
        return a;}});
    /* ===== 마음잎 ===== */
    def('fiveleaf',
      {ink:'#fff6e6',name:'사랑스러운 사랑초',face:[90,86],head:[90,40],neck:[90,112],st:'heart',draw(){let a=soil();
        const tri=(x,y,s)=>G(`translate(${x} ${y}) scale(${s})`,[0,120,240].map(ang=>P('M0 0L-16 -30Q0 -38 16 -30Z','#7a3f9a','#4a1f6a',1.5,rot(ang,0,0))+E(0,-22,5,3,'#b98ad8',op(.7),rot(ang,0,0))).join(''));
        for(const [x,y,s] of [[46,128,.9],[134,124,.95],[62,158,.7],[120,160,.7]])a+=L(`M90 190Q${x} ${y+30} ${x} ${y}`,'#8a5a8a',2)+tri(x,y,s);
        a+=L('M90 190V100','#8a5a8a',3)+tri(90,96,1.5);
        for(const [x,y] of [[70,60],[110,56],[90,44]])a+=L(`M90 90Q${x} ${y+16} ${x} ${y}`,'#a8789a',1.5)+bloom(x,y,5,'#f7c0e0','#f6d66b');
        a+=patch(90,90,14,10,'#f6ecfb');return a;}},
      {name:'신화 속 황금사과나무',face:[90,154],head:[90,12],neck:[90,176],st:'star',draw(){let a=soil();
        a+=C(90,70,66,'#ffe7a0','',0,op(.35));
        a+=trunk(90,100,192,20,34,'#a8845c','#6f5236')+L('M90 120L60 92M90 114L124 88','#a8845c',6);
        a+=blobs([[44,82,26],[72,54,30],[112,52,32],[140,84,26],[90,86,32]],'#5f9a4a','#3f6d3a');
        for(const [x,y] of [[50,80],[76,48],[112,46],[138,84],[94,78],[66,96],[118,98]])a+=C(x,y,8,'#f6c83a','#b8871c',1.5)+L(`M${x} ${y-8}l2 -4`,'#6f5236',1.5)+E(x-2,y-3,2.5,1.6,'#fff3b0');
        a+=patch(90,156,14,11,'#f2e2c4');return a;}});
    def('goldclover',
      {name:'돌돌 말린 고사리 새순',face:[90,70],head:[90,30],neck:[90,104],st:'surprise',draw(){let a=soil();
        const curl=(x,y,s,c)=>G(`translate(${x} ${y}) scale(${s})`,P('M0 0Q20 -2 20 -20Q18 -38 0 -38Q-16 -36 -16 -22Q-14 -10 -2 -12Q8 -14 6 -24Q2 -30 -4 -26','none',c,6)+L('M0 0V70','#7a9a4a',6));
        a+=curl(46,112,.7,'#8ab35a')+curl(134,108,.7,'#8ab35a')+curl(66,96,.8,'#9ac45a')+curl(116,92,.8,'#9ac45a');
        a+=L('M90 192V94','#7a9a4a',8)+C(90,70,26,'#9ac45a','#5f8a3a',2.5)+P('M110 66Q112 46 94 44Q76 46 76 62','none','#6f9a4a',5);
        for(let i=0;i<14;i++)a+=L(`M${70+Math.cos(i*.45)*24} ${70+Math.sin(i*.45)*24}l2 -2`,'#c9b07a',2);
        a+=patch(90,74,14,10,'#f0f8e0');return a;}},
      {name:'공룡 시대의 나무고사리',face:[90,150],head:[90,20],neck:[90,172],st:'star',draw(){let a='';
        a+=E(90,194,68,8,'#5a7a4a');
        a+=R(78,70,24,124,8,'#6a4a32','#3f2a1a',2);for(let y=80;y<190;y+=12)a+=L(`M80 ${y}q10 4 20 0`,'#8a6a4a',1.5);
        const frond=(ang,len)=>G(`rotate(${ang} 90 70)`,L(`M90 70Q${90+len*.5} ${70-len*.3} ${90+len} ${70+len*.1}`,'#4f7d3a',3)+(()=>{let o='';for(let k=1;k<9;k++){const t=k/9,x=90+len*t,y=70-len*.3*Math.sin(t*Math.PI)+len*.1*t;o+=L(`M${n(x)} ${n(y)}l-4 -10M${n(x)} ${n(y)}l4 8`,'#6fa35a',3);}return o;})());
        for(const [ang,len] of [[-160,70],[-130,76],[-100,72],[-80,72],[-50,76],[-20,70],[-190,60],[10,60]])a+=frond(ang+90,len);
        a+=G('translate(90 64) scale(.5)',P('M0 0Q20 -2 20 -20Q18 -38 0 -38Q-16 -36 -16 -22Q-14 -10 -2 -12','none','#9ac45a',7));
        a+=patch(90,152,12,10,'#f0e6d6');return a;}});
    def('starclover',
      {name:'용감한 에델바이스',face:[90,90],head:[90,40],neck:[90,124],st:'sparkle',draw(){let a=soil();
        a+=L('M90 192V120','#9aa89a',5)+leaf(90,180,-60,.6,'#a8b8a8','#6f806f')+leaf(90,170,60,.55,'#a8b8a8','#6f806f');
        const ed=(x,y,s)=>G(`translate(${x} ${y}) scale(${s})`,(()=>{let o='';for(let i=0;i<9;i++)o+=P('M0 0L-8 -30Q0 -40 8 -30Z','#f4f6f0','#b9c2b0',1.4,rot(i*40,0,0));for(let i=0;i<5;i++)o+=C(Math.cos(i*1.26)*7,Math.sin(i*1.26)*7,4,'#e8d86a','#a89a3a',.8);return o+C(0,0,5,'#e8d86a');})());
        a+=L('M90 124L56 148M90 124L126 150','#9aa89a',3)+ed(56,150,.55)+ed(126,152,.5);
        a+=ed(90,90,1.3);
        a+=patch(90,92,13,9,'#fbfcf6');return a;}},
      {name:'오천 살 브리슬콘 소나무',face:[90,150],head:[70,24],neck:[90,170],st:'star',draw(){let a='';
        a+=P('M8 194L30 178L70 188L120 172L172 194Q90 202 8 194Z','#b8b0a0','#8a8270',2);
        a+=P('M60 194Q56 150 72 120Q60 90 76 60Q84 40 70 20M76 60Q96 70 104 40M72 120Q110 110 126 80Q140 60 150 64','none','#d8ccb0',14);
        a+=P('M60 194Q56 150 72 120Q60 90 76 60Q84 40 70 20M76 60Q96 70 104 40M72 120Q110 110 126 80Q140 60 150 64','none','#a8906a',6,op(.7));
        a+=P('M64 194Q60 150 76 122','none','#8a6a4a',6);
        for(const [x,y] of [[70,18],[104,36],[150,60],[126,78]])a+=blobs([[x,y,12],[x+10,y+4,9],[x-10,y+4,9]],'#3f6d4a','#2a4a34',1.5);
        a+=C(106,116,6,'#6a4a2a')+E(106,116,3,5,'#a8906a');
        a+=patch(84,150,14,11,'#f0e6d0');return a;}});
    def('frostclover',
      {name:'알록달록 수국',face:[90,90],head:[90,36],neck:[90,132],st:'laugh',draw(){let a=soil();
        a+=L('M90 192V130','#5f8a4a',6)+leaf(90,178,-70,.9,'#5f9a55')+leaf(90,170,70,.9,'#5f9a55')+leaf(90,150,-40,.7,'#6fa865');
        a+=C(90,90,48,'#a8c0f0','#6a86c8',2);
        for(let i=0;i<34;i++){const r=Math.sqrt(i/34)*42,t=i*2.4,x=90+Math.cos(t)*r,y=90+Math.sin(t)*r;a+=G(`rotate(${i*17} ${n(x)} ${n(y)})`,[0,90,180,270].map(ang=>E(x,y-4,3.5,4.5,i%3?'#c2d4f8':'#d8c8f4','#8aa0d8',.6,rot(ang,x,y))).join('')+C(x,y,1.4,'#f6f0ff'));}
        a+=patch(90,92,15,11,'#eef3fd');return a;}},
      {name:'쥐라기의 아라우카리아',face:[90,156],head:[90,8],neck:[90,176],st:'star',draw(){let a='';
        a+=E(90,194,68,8,'#8a7a5a');
        a+=R(82,40,16,154,6,'#7a5a42','#4a3422',2);for(let y=50;y<190;y+=10)a+=L(`M83 ${y}l14 4`,'#9a7a5a',1.2);
        const tier=(y,w)=>L(`M90 ${y}Q${90-w*.6} ${y-10} ${90-w} ${y+8}M90 ${y}Q${90+w*.6} ${y-10} ${90+w} ${y+8}`,'#3f6d3a',7)+L(`M90 ${y}Q${90-w*.6} ${y-10} ${90-w} ${y+8}M90 ${y}Q${90+w*.6} ${y-10} ${90+w} ${y+8}`,'#6fa35a',3,' stroke-dasharray="2 3"');
        for(const [y,w] of [[46,28],[70,44],[96,58],[122,70]])a+=tier(y,w);
        a+=C(90,36,12,'#6fa35a','#3f6d3a',2)+C(62,76,7,'#a8804a','#6a4a2a',1.5)+C(122,100,7,'#a8804a','#6a4a2a',1.5);
        a+=patch(90,158,11,10,'#efe0cc');return a;}});
    def('bouquetclover',
      {name:'보송보송 토끼꼬리풀',face:[90,70],head:[90,28],neck:[90,104],st:'laugh',draw(){let a=soil();
        for(let i=0;i<9;i++)a+=L(`M90 192Q${70+i*5} 160 ${40+i*12} ${150-(i%3)*10}`,'#8ab35a',2);
        const tail=(x,y,s)=>L(`M90 192Q${(x+90)/2} ${y+60} ${x} ${y+22*s}`,'#a8c47a',2)+E(x,y,11*s,20*s,'#fbf6e6','#d8ccb0',1.2)+(()=>{let o='';for(let k=0;k<8;k++)o+=L(`M${x-8*s+k*2*s} ${y-16*s}l-1 -5`,'#fffdf4',1.2);return o;})();
        a+=tail(48,110,.7)+tail(132,104,.75)+tail(64,82,.8)+tail(118,78,.8);
        a+=L('M90 192V96','#a8c47a',3)+E(90,70,22,32,'#fffdf4','#d8ccb0',2);
        for(let k=0;k<12;k++)a+=L(`M${72+k*3} ${42+Math.abs(k-6)}l-1 -6`,'#ffffff',1.4);
        a+=patch(90,74,14,10,'#fffef8');return a;}},
      {name:'바람을 타는 소원 민들레',face:[90,78],head:[90,20],neck:[90,112],st:'wink',draw(){let a=soil();
        a+=L('M90 192V112','#7aa84a',5)+leaf(90,190,-70,.8,'#6f9e57')+leaf(90,188,70,.8,'#6f9e57');
        for(let i=0;i<40;i++){const ang=i/40*Math.PI*2,x2=90+Math.cos(ang)*46,y2=78+Math.sin(ang)*46;a+=L(`M90 78L${n(x2)} ${n(y2)}`,'#f4f0e0',1);for(let k=0;k<6;k++)a+=L(`M${n(x2)} ${n(y2)}l${n(Math.cos(ang+(k-2.5)*.5)*6)} ${n(Math.sin(ang+(k-2.5)*.5)*6)}`,'#ffffff',1);}
        a+=C(90,78,10,'#c9b89a');
        for(const [x,y,r] of [[150,30,-30],[166,58,-50],[132,14,-20]])a+=G(`rotate(${r} ${x} ${y})`,L(`M${x} ${y}v14`,'#e8e0c8',1)+(()=>{let o='';for(let k=0;k<7;k++)o+=L(`M${x} ${y}l${n(Math.cos(k*.9-2)*6)} ${n(Math.sin(k*.9-2)*6)}`,'#ffffff',1);return o;})())+star(x+6,y-8,3,'#fde37a');
        a+=patch(90,80,15,11,'#fffdf6');return a;}});
    def('ringclover',
      {name:'다정한 금낭화',face:[90,122],head:[90,52],neck:[90,150],st:'heart',draw(){let a=soil();
        a+=L('M40 192Q30 90 90 60Q150 50 162 110','#6f9a4a',3);
        a+=leaf(50,190,-30,.8,'#7aa865')+leaf(44,176,30,.6,'#7aa865');
        const bh=(x,y,s)=>L(`M${x} ${y-16*s}v-${10*s}`,'#6f9a4a',1.5)+G(`translate(${x} ${y}) scale(${s})`,P('M0 18C-26 4 -20 -18 -6 -16Q0 -14 0 -8Q0 -14 6 -16C20 -18 26 4 0 18Z','#f26a9a','#b8386a',1.5)+P('M-3 16Q0 28 3 16Z','#ffffff'));
        a+=bh(136,86,.6)+bh(154,104,.5)+bh(110,72,.7)+bh(62,90,.6);
        a+=L('M90 64V96','#6f9a4a',2)+bh(90,124,1.7);
        a+=patch(90,122,13,9,'#ffe6ef');return a;}},
      {name:'두 나무가 하나 된 연리지',face:[90,150],head:[90,14],neck:[90,172],st:'heart',draw(){let a=soil();
        a+=C(90,70,62,'#ffd6e2','',0,op(.35));
        a+=P('M40 194Q52 150 84 120Q90 100 70 80','none','#9a6a4a',16)+P('M140 194Q128 150 96 120Q90 100 110 80','none','#8a5a3a',16);
        a+=E(90,120,16,14,'#a8784a','#6a4a2a',2);
        a+=blobs([[60,70,30],[120,70,30],[90,44,30]],'#f7a8c4','#d86a92');
        for(let i=0;i<12;i++)a+=heart(40+(i*23)%100,30+((i*17)%60),4,'#e8406e');
        a+=heart(90,46,12,'#f04a78');
        a+=patch(90,152,14,11,'#f2e0cc');return a;}});
    /* ===== 마음열매 ===== */
    def('whiteberry',
      {name:'등불 든 꽈리',face:[90,120],head:[90,50],neck:[90,148],st:'laugh',draw(){let a=soil();
        a+=L('M30 60Q90 30 160 60','#6f9a4a',3)+leaf(50,52,-100,.5,'#7aa865')+leaf(140,50,100,.5,'#7aa865');
        const lan=(x,y,s,c,d)=>L(`M${x} ${y-24*s}V${y-34*s}`,'#6f9a4a',1.5)+G(`translate(${x} ${y}) scale(${s})`,P('M0 -26Q-24 -18 -22 6Q-14 26 0 30Q14 26 22 6Q24 -18 0 -26Z',c,d,1.8)+L('M0 -26Q-8 0 0 30M0 -26Q8 0 0 30M0 -26Q-18 -4 -14 20M0 -26Q18 -4 14 20',d,1));
        a+=lan(46,94,.6,'#f28b3a','#b8520a')+lan(140,90,.65,'#f28b3a','#b8520a')+lan(66,78,.5,'#9ab45a','#5f7a2a');
        a+=L('M90 40V86','#6f9a4a',2)+lan(90,122,1.4,'#ff7a2a','#b8420a');
        a+=patch(90,122,14,10,'#fff0e0');return a;}},
      {name:'신선의 천도복숭아',face:[90,154],head:[90,12],neck:[90,176],st:'star',draw(){let a='';
        a+=cloud(90,190,1.5,'#ffffff',.9);
        a+=trunk(90,100,186,18,30,'#8a5a3a','#5a3a1a')+L('M90 120L58 94M90 114L124 90','#8a5a3a',6);
        a+=blobs([[46,82,24],[72,56,28],[112,54,30],[138,84,24],[90,86,30]],'#8ac46a','#4f8a3a');
        for(let i=0;i<10;i++)a+=bloom(40+(i*31)%110,40+((i*19)%60),4,'#ffd0dc','#f6d66b');
        for(const [x,y,s] of [[56,92,1],[124,88,1],[90,70,1.3]])a+=P(`M${x} ${y-12*s}Q${x-14*s} ${y-12*s} ${x-13*s} ${y+2*s}Q${x-8*s} ${y+14*s} ${x} ${y+14*s}Q${x+8*s} ${y+14*s} ${x+13*s} ${y+2*s}Q${x+14*s} ${y-12*s} ${x} ${y-12*s}Z`,'#ffb0bc','#d86a7a',1.5)+P(`M${x} ${y-12*s}Q${x+6*s} ${y} ${x} ${y+14*s}`,'none','#f08a9a',1.2)+E(x-6*s,y-4*s,4*s,6*s,'#ff8a9a',op(.6));
        a+=patch(90,156,13,10,'#f4e2cc');return a;}});
    def('berryfield',
      {ink:'#fff6e6',name:'줄무늬 수박 덩굴',face:[90,146],head:[90,106],neck:[90,176],st:'laugh',draw(){let a=soil();
        a+=L('M10 150Q40 120 60 140T110 120T170 140','#5f9a45',3)+P('M150 128q10 -10 16 0q-6 10 -16 0','none','#5f9a45',2);
        for(const [x,y] of [[30,136],[78,126],[134,124]])a+=leaf(x,y,-40,.55,'#6fae55');
        a+=bloom(106,116,6,'#f6d66b','#f2a33a');
        a+=E(90,154,58,38,'#3f8a3a','#1f5a2a',3);
        for(let i=0;i<7;i++)a+=P(`M${46+i*15} 120Q${40+i*15+(i-3)*6} 154 ${46+i*15} 190`,'none','#1f5a2a',5);
        a+=patch(90,148,17,12,'#e6f6d8');return a;}},
      {name:'흥부네 보물 박넝쿨',face:[90,146],head:[90,100],neck:[90,178],st:'fierce',draw(){let a=soil();
        a+=P('M10 110Q20 70 60 64Q90 40 120 60Q160 64 170 100','none','#8a6a3a',4)+L('M20 110V194M160 100V194','#8a6a3a',4);
        for(const [x,y] of [[30,74],[70,56],[112,52],[150,70]])a+=leaf(x,y,-30,.55,'#6fae55');
        for(const [x,y] of [[50,62],[132,60]])a+=bloom(x,y,6,'#ffffff','#f6d66b');
        a+=L('M90 52V106','#6f9a4a',3);
        a+=P('M90 106Q48 106 44 144Q42 188 90 190Q138 188 136 144Q132 106 90 106Z','#f4ecd0','#b8a878',3);
        for(let i=0;i<5;i++)a+=P(`M${58+i*16} 110Q${54+i*16+(i-2)*4} 150 ${58+i*16} 188`,'none','#d8cca8',2);
        a+=P('M60 134L120 134L112 142Q90 150 68 142Z','#3a2a1a',op(.25));
        for(const [x,y,c] of [[48,176,'#f6d66b'],[132,178,'#e8403a'],[40,160,'#4f9ae8'],[140,158,'#f6d66b']])a+=C(x,y,5,c,'#ffffff',1.5);
        a+=patch(90,148,16,12,'#fffaf0');return a;}});
    def('violetberry',
      {ink:'#fff6e6',name:'주렁주렁 포도 덩굴',face:[90,118],head:[90,64],neck:[90,160],st:'wink',draw(){let a=soil();
        a+=L('M8 60Q50 40 90 56Q130 40 172 60','#8a6a3a',5);
        for(const [x,y] of [[30,62],[150,62],[64,56],[116,54]])a+=G(`translate(${x} ${y})`,P('M0 0Q-20 -4 -22 -18Q-14 -30 0 -22Q14 -30 22 -18Q20 -4 0 0Z','#6fae55','#3f7d3a',1.5));
        a+=P('M150 64q10 10 4 18q-8 4 -6 -4','none','#8a6a3a',1.5);
        a+=L('M90 56V76','#8a6a3a',3);
        for(let r=0;r<6;r++)for(let k=0;k<6-r;k++)a+=C(90-(5-r-1)*9+k*18,86+r*16,10,(r+k)%2?'#7a4aa8':'#8a5ac0','#4a2a70',1.2)+C(86-(5-r-1)*9+k*18,82+r*16,2.5,'#c8a8f0');
        a+=patch(90,120,15,11,'#f4ecfb');return a;}},
      {ink:'#fff6e6',name:'억만 년을 견딘 소철',face:[90,150],head:[90,56],neck:[90,172],st:'star',draw(){let a='';
        a+=E(90,194,68,8,'#8a7a5a');
        a+=P('M66 194Q60 130 70 100H110Q120 130 114 194Z','#8a6a4a','#5a4228',2.5);
        for(let r=0;r<8;r++)for(let k=0;k<4;k++)a+=P(`M${70+k*10+(r%2?5:0)} ${106+r*11}l5 -5 5 5-5 5Z`,'#a8845c','#6f5236',.8);
        const frond=ang=>G(`rotate(${ang} 90 98)`,L('M90 98Q130 70 168 90','#4f7d3a',3)+(()=>{let o='';for(let k=1;k<12;k++){const t=k/12,x=90+78*t,y=98-28*Math.sin(t*Math.PI)+(-8)*t;o+=L(`M${n(x)} ${n(y)}l-3 -9M${n(x)} ${n(y)}l3 9`,'#5f9a45',2.5);}return o;})());
        for(const ang of [-170,-140,-110,-70,-40,-10,-190,20])a+=frond(ang);
        a+=E(90,86,14,20,'#e0b84a','#8a6a1a',2)+L('M80 76l20 20M80 92l20 -20','#b8901a',1.2);
        a+=patch(90,152,14,11,'#efe0cc');return a;}});
    def('frostberry',
      {name:'폭신폭신 목화',face:[90,82],head:[90,34],neck:[90,114],st:'sleepy',draw(){let a=soil();
        a+=L('M90 192V100M90 150L52 118M90 136L130 104','#7a5a3a',4);
        const boll=(x,y,s)=>G(`translate(${x} ${y}) scale(${s})`,P('M-14 6L0 16L14 6','none','#7a5a3a',3)+blobs([[-10,-2,11],[10,-2,11],[0,-12,12],[0,4,11]],'#ffffff','#d8d0c0',1.2));
        a+=boll(52,112,.8)+boll(132,98,.8)+boll(60,160,.6)+boll(124,150,.6);
        for(const [x,y] of [[40,140],[142,126]])a+=leaf(x,y,-50,.45,'#6f9a4a');
        a+=boll(90,82,1.7);
        a+=patch(90,86,15,11,'#fffefb');return a;}},
      {name:'하늘을 덮는 구름 목화',face:[90,110],head:[90,40],neck:[90,146],st:'sleepy',draw(){let a='';
        a+=C(90,110,80,'#dff0ff','',0,op(.4));
        a+=cloud(90,186,1.5,'#ffffff',.95);
        a+=L('M90 176V120M90 150L50 126M90 138L132 116','#b8a08a',4);
        for(const [x,y,s] of [[40,70,.7],[140,64,.8],[50,120,.6],[130,112,.65],[70,40,.55],[114,36,.6]])a+=G(`translate(${x} ${y}) scale(${s})`,blobs([[-10,-2,12],[10,-2,12],[0,-12,13],[0,4,12]],'#ffffff','#c8d8e8',1.2)+star(16,-16,4,'#fde37a'));
        a+=G('translate(90 108) scale(2.2)',blobs([[-10,-2,12],[10,-2,12],[0,-12,13],[0,4,12]],'#ffffff','#c8d8e8',.8));
        a+=patch(90,112,16,11,'#fffefb');return a;}});
    def('goldraspberry',
      {name:'멋쟁이 파인애플',face:[90,130],head:[90,50],neck:[90,168],st:'cool',draw(){let a=soil();
        for(let i=0;i<9;i++)a+=leaf(90,188,-80+i*20,.9,i%2?'#5f8a4a':'#7aa865','#3f6d3a');
        a+=E(90,132,30,40,'#f2b83a','#a8771f',2.5);
        for(let r=0;r<7;r++)for(let k=0;k<4;k++)a+=P(`M${66+k*14+(r%2?7:0)} ${102+r*10}l6 -5 6 5-6 5Z`,'#e8a02a','#b8871c',.8);
        for(let i=0;i<9;i++)a+=leaf(90,94,-60+i*15,.62,'#4f8a3a','#2f5a2a');
        a+=patch(90,134,15,11,'#fdecc0');return a;}},
      {name:'하늘까지 닿은 콩나무',face:[90,160],head:[70,10],neck:[90,176],st:'star',draw(){let a='';
        a+=cloud(40,40,.9,'#ffffff',.95)+cloud(150,70,.8,'#ffffff',.95)+cloud(100,14,.7,'#ffffff',.9);
        a+=P('M76 194Q60 150 96 120Q126 92 90 70Q60 50 88 20','none','#4f8a3a',16)+P('M104 194Q116 150 84 124Q60 100 96 76Q124 56 96 24','none','#6fae55',11);
        for(const [x,y,r] of [[60,140,-60],[124,110,60],[58,84,-50],[118,54,50],[80,30,-30]])a+=leaf(x,y,r,.8,'#7ac060');
        for(const [x,y] of [[40,130],[138,96],[64,62]])a+=P(`M${x} ${y}q-4 -14 6 -18q-2 8 -6 18`,'none','#4f8a3a',2);
        a+=C(150,40,6,'#f6d66b','#b8871c',1.5)+C(34,104,5,'#f6d66b','#b8871c',1.5);
        a+=E(90,170,40,12,'#8a6a4a',op(.3));
        a+=patch(90,162,14,10,'#ecf8dc');return a;}});
    def('blackberry',
      {name:'화끈한 고추',face:[90,124],head:[90,62],neck:[90,166],st:'fierce',draw(){let a=soil();
        a+=L('M90 192V80M90 140L54 110M90 120L128 96','#5f8a3a',4);
        for(const [x,y,r] of [[54,104,-50],[128,90,50],[76,82,-30],[106,76,30]])a+=leaf(x,y,r,.5,'#6fae55');
        const chili=(x,y,s,c)=>G(`translate(${x} ${y}) scale(${s})`,P('M-6 0Q-10 30 4 52Q0 30 6 0Z',c,'#8a1f1f',1.5)+P('M-7 0Q0 -6 7 0L4 -6H-4Z','#5f8a3a'));
        a+=chili(54,112,1,'#e8403a')+chili(128,98,1,'#f28b3a')+chili(66,140,.8,'#e8403a')+chili(116,130,.8,'#e8403a');
        a+=P('M78 100Q66 150 92 186Q106 150 102 100Z','#e8403a','#8a1f1f',2.5)+P('M76 100Q90 88 104 100L98 92H82Z','#5f8a3a','#3f6d3a',1.5);
        a+=P('M82 110Q80 130 84 140','none','#ff9a8a',3);
        a+=patch(90,126,12,10,'#ffe6e2');return a;}},
      {name:'봉황이 깃든 봉황목',face:[90,154],head:[90,12],neck:[90,174],st:'fierce',draw(){let a='';
        a+=C(90,70,66,'#ffcf8a','',0,op(.35));
        a+=trunk(90,100,192,18,32,'#8a6a4a','#5a4228')+L('M90 118L46 84M90 112L136 80M90 104V64','#8a6a4a',6);
        a+=P('M6 90Q20 30 90 22Q160 30 174 90Q90 106 6 90Z','#6fae55','#3f7d3a',2);
        for(let i=0;i<26;i++){const x=16+(i*29)%150,y=30+((i*17)%56);a+=[0,72,144,216,288].map(ang=>E(x,y-5,3.4,5,i%3?'#e8403a':'#ff7a2a','',0,rot(ang,x,y))).join('')+C(x,y,1.6,'#f6d66b');}
        for(const [x,y] of [[30,120],[150,126],[60,150]])a+=P(`M${x} ${y}q-10 14 -2 22q4 -12 2 -22Z`,'#ff7a2a',op(.8));
        a+=patch(90,156,13,10,'#f4e2cc');return a;}});
    /* ===== 마음나무 ===== */
    def('elderoak',
      {name:'팔 벌린 반얀나무',face:[90,150],head:[90,20],neck:[90,172],st:'laugh',draw(){let a=soil();
        a+=blobs([[36,78,28],[66,50,34],[114,50,34],[144,78,28],[90,82,36]],'#4f8a4a','#2f6a3a');
        for(const x of [30,46,62,118,134,150])a+=L(`M${x} 90V${190-(x%3)*6}`,'#8a6a4a',x%2?3:5);
        a+=trunk(90,96,194,28,44,'#9a7a5a','#6a4a2a')+L('M80 110Q84 150 76 190M100 110Q96 150 104 190','#7a5a3a',2);
        a+=patch(90,152,15,11,'#f0e0c8');return a;}},
      {name:'세상을 떠받친 세계수',face:[90,160],head:[90,6],neck:[90,178],st:'star',draw(){let a='';
        a+=C(90,90,86,'#e0f8d0','',0,op(.4));
        a+=P('M20 194Q60 176 76 150L74 70Q56 58 40 40M76 104Q50 96 24 76M104 104Q130 96 156 76M106 70Q124 58 140 40M104 150Q120 176 160 194','none','#9a7a5a',10);
        a+=trunk(90,60,194,26,50,'#9a7a5a','#6a4a2a');
        a+=blobs([[30,60,24],[60,34,28],[90,20,30],[120,34,28],[150,60,24],[46,86,20],[134,86,20]],'#5fae6a','#3f7d4a');
        for(let i=0;i<14;i++)a+=C(24+(i*31)%132,20+((i*23)%74),2.5,'#fff3a8');
        a+=E(90,196,70,5,'#9fd3ea',op(.6));
        a+=patch(90,162,15,11,'#f2e2cc');return a;}});
    def('maple',
      {name:'붉게 물든 단풍나무',face:[90,158],head:[90,16],neck:[90,176],st:'wink',draw(){let a=soil();
        const ml=(x,y,s,c)=>G(`translate(${n(x)} ${n(y)}) scale(${s})`,P('M0 -14L4 -6L10 -9L8 -2L14 0L8 3L10 9L3 6L0 14L-3 6L-10 9L-8 3L-14 0L-8 -2L-10 -9L-4 -6Z',c,'#9a2f18',.8));
        a+=trunk(90,100,194,22,34,'#7a4a2a','#4a2a14')+L('M90 120L58 94M90 114L124 90','#7a4a2a',5);
        a+=blobs([[48,80,28],[76,52,32],[112,50,34],[138,82,28],[90,86,32]],'#e0643c','#9a2f18');
        for(let i=0;i<24;i++)a+=ml(28+(i*37)%128,30+((i*23)%74),.9,['#c2412f','#f0a24a','#e87a3c'][i%3]);
        for(const [x,y] of [[30,170],[150,176],[46,188]])a+=ml(x,y,.7,'#f0a24a');
        a+=patch(90,160,13,10,'#f4e0cc');return a;}},
      {name:'마을을 지키는 천년 당산나무',face:[90,156],head:[90,10],neck:[90,176],st:'cool',draw(){let a=soil();
        a+=P('M40 194Q60 150 70 110Q40 90 20 80M70 110Q70 60 60 40M110 110Q110 60 124 40M110 110Q140 90 160 80M140 194Q120 150 110 110','none','#8a6a4a',12);
        a+=trunk(90,90,194,40,60,'#9a7a5a','#6a4a2a');
        a+=blobs([[26,70,26],[60,36,30],[100,26,32],[138,44,30],[158,78,24],[90,70,30]],'#5f9a4a','#3f6d3a');
        a+=P('M60 140Q90 150 120 140','none','#e8d8a8',5);
        for(const [x,c] of [[66,'#e8403a'],[78,'#4f9ae8'],[90,'#f6d66b'],[102,'#5fc46a'],[114,'#f07ab8']])a+=P(`M${x} 144l-3 22 6 0Z`,c);
        for(let i=0;i<6;i++)a+=P(`M${68+i*9} 142l-3 -6h6Z`,'#fffaf0');
        a+=patch(90,158,15,11,'#f2e2cc');return a;}});
    def('bamboo',
      {name:'곧게 뻗은 대나무',face:[90,150],head:[90,14],neck:[90,176],st:'laugh',draw(){let a='';
        const stalk=(x,top,w,col='#79ad55',dark='#4c7a36')=>{let o=R(x-w/2,top,w,194-top,w/2.6,col,dark,1.6)+L(`M${n(x-w/4)} ${top+6}V190`,'#d9ecb5',n(w/9),op(.55));for(let y=top+28;y<188;y+=28)o+=L(`M${n(x-w/2)} ${y}h${w}`,dark,2.4);return o;};
        const blade=(x,y,dir,len=26,col='#7fb15a')=>P(`M${x} ${y}q${n(dir*len*.45)} ${n(-len*.28)} ${n(dir*len)} ${n(len*.08)}q${n(-dir*len*.48)} ${n(len*.2)} ${n(-dir*len)} ${n(-len*.08)}Z`,col,'#4d7b38',.8);
        for(const [x,t,w] of [[42,40,14],[138,30,14]]){a+=stalk(x,t,w,'#8ec364','#5a8740');for(let y=t+22;y<t+110;y+=34)a+=blade(x,y,x<90?-1:1,26)+blade(x,y+8,x<90?-1:1,20,'#9ccc6e');}
        a+=stalk(90,16,38);
        for(const [x,y,d,l] of [[90,20,-1,34],[90,20,1,34],[90,30,-1,28],[90,30,1,30]])a+=blade(x,y,d,l,d<0?'#86ba5e':'#6fa24d');
        a+=patch(90,152,14,10,'#eef7dc');return a;}},
      {name:'백 년 만에 꽃핀 대나무숲',face:[90,150],head:[90,14],neck:[90,176],st:'star',draw(){let a='';
        const stalk=(x,top,w,col='#79ad55',dark='#4c7a36')=>{let o=R(x-w/2,top,w,194-top,w/2.6,col,dark,1.6)+L(`M${n(x-w/4)} ${top+6}V190`,'#d9ecb5',n(w/9),op(.55));for(let y=top+28;y<188;y+=28)o+=L(`M${n(x-w/2)} ${y}h${w}`,dark,2.4);return o;};
        for(const [x,t,w] of [[14,60,10],[32,30,13],[56,50,10],[124,40,10],[148,22,13],[168,60,10]])a+=stalk(x,t,w,'#9ccc6e','#5a8740');
        a+=stalk(90,16,38,'#e0c860','#a8901a');
        for(let i=0;i<14;i++){const x=20+(i*23)%150,y=28+((i*31)%70);a+=L(`M${x} ${y}q-2 12 2 22`,'#c9b04a',1.2)+E(x+1,y+24,3,6,'#f6e08a','#c9a83a',.8)+E(x+5,y+14,2.5,5,'#f6e08a','#c9a83a',.8);}
        a+=patch(90,152,14,10,'#fff8dc');return a;}});
    def('weepingcherry',
      {name:'화사한 벚나무',face:[90,158],head:[90,14],neck:[90,176],st:'sparkle',draw(){let a=soil();
        a+=trunk(90,100,194,20,32,'#6a4a3a','#3f2a20')+L('M90 120L56 92M90 114L126 88','#6a4a3a',5);
        a+=blobs([[44,80,28],[72,50,32],[112,48,34],[140,80,28],[90,84,32]],'#ffd0dc','#f0a0b8');
        for(let i=0;i<22;i++)a+=bloom(24+(i*37)%132,26+((i*23)%76),4,i%3?'#ffffff':'#ffb8cc','#f07a9a');
        for(const [x,y] of [[24,150],[156,140],[40,178],[140,184]])a+=E(x,y,3.5,2.2,'#ffc0d0','',0,rot(30,x,y));
        a+=patch(90,160,13,10,'#f4e2d8');return a;}},
      {name:'하늘이 내린 신단수',face:[90,156],head:[90,8],neck:[90,176],st:'sparkle',draw(){let a='';
        a+=C(90,80,84,'#fff3c8','',0,op(.45));
        a+=P('M10 194L44 154L70 180L110 142L148 178L170 194Q90 202 10 194Z','#8aa0b8','#5a708a',2,op(.6));
        a+=trunk(90,70,194,26,46,'#8a6a4a','#5a4228');
        a+=blobs([[36,60,24],[66,30,28],[114,30,28],[144,60,24],[90,50,30]],'#4f9a6a','#2f6a4a');
        for(const [x,y] of [[36,62],[66,32],[114,32],[144,62],[90,24]])a+=C(x,y,6,'#fff3b0','#e0c860',1)+C(x,y,12,'#fff3b0',op(.3));
        a+=P('M60 120Q90 132 120 120','none','#e8d8a8',4)+[64,78,92,106,116].map((x,i)=>P(`M${x} 124l-3 20h6Z`,['#e8403a','#4f9ae8','#f6d66b','#5fc46a','#ffffff'][i])).join('');
        a+=patch(90,158,15,11,'#f2e2cc');return a;}});
    def('elderginkgo',
      {name:'키다리 메타세쿼이아',face:[90,164],head:[90,10],neck:[90,180],st:'surprise',draw(){let a=soil();
        a+=R(82,120,16,74,4,'#9a5a3a','#6a3a1a',2);
        for(let t=0;t<7;t++){const y=24+t*16,w=12+t*9;a+=P(`M90 ${y-12}L${90-w} ${y+14}H${90+w}Z`,t%2?'#d88a4a':'#c8783a','#8a4a1a',1.5);}
        for(let i=0;i<20;i++)a+=L(`M${60+(i*13)%60} ${30+((i*17)%100)}l-4 3M${60+(i*13)%60} ${30+((i*17)%100)}l4 3`,'#f0b870',1.2);
        a+=patch(90,166,11,9,'#f4e0cc');return a;}},
      {ink:'#fff6e6',name:'석탄기의 거인 인목',face:[90,150],head:[90,10],neck:[90,172],st:'star',draw(){let a='';
        a+=E(90,194,68,8,'#4f6a4a')+E(40,194,30,5,'#7fa0a8',op(.6));
        a+=R(74,40,32,154,10,'#6f8a5a','#3f5a34',2.5);
        for(let r=0;r<14;r++)for(let k=0;k<3;k++)a+=P(`M${78+k*9+(r%2?4.5:0)} ${46+r*10}l4 -4 4 4-4 5Z`,'#8aa870','#4f6a44',.8);
        a+=L('M90 44L60 20M90 44L120 20M60 20L44 10M60 20L64 4M120 20L116 4M120 20L136 10','#6f8a5a',6);
        for(const [x,y] of [[44,10],[64,4],[116,4],[136,10]])for(let k=0;k<9;k++)a+=L(`M${x} ${y}l${n(Math.cos(k*.7)*12)} ${n(Math.sin(k*.7)*12)}`,'#4f8a3a',2);
        a+=patch(90,152,14,11,'#e8f0dc');return a;}});
    def('moonginkgo',
      {name:'향기로운 매화나무',face:[92,160],head:[70,20],neck:[92,178],st:'sleepy',draw(){let a=soil();
        a+=C(146,34,20,'#fff4c8',op(.9));
        a+=P('M86 194Q80 150 96 130Q108 110 90 90Q72 70 84 44M96 130Q124 120 140 96M90 90Q62 88 44 70','none','#4a3a3a',9);
        for(const [x,y] of [[84,44],[140,96],[44,70],[110,112],[66,84],[96,64],[122,108]])a+=bloom(x,y,6,'#ffffff','#f6d66b')+C(x+10,y+8,3,'#ffc0d0');
        for(let i=0;i<8;i++)a+=bloom(50+(i*19)%90,50+((i*29)%70),3.2,'#ffe0ea','#f6d66b');
        a+=patch(92,162,13,10,'#f0e6e2');return a;}},
      {name:'달나라 계수나무',face:[90,156],head:[90,40],neck:[90,176],st:'sparkle',draw(){let a='';
        a+=C(90,96,86,'#fff3c4','#f0d98a',2,op(.95));
        for(const [x,y,r] of [[40,60,8],[140,70,6],[130,140,10],[46,140,7]])a+=C(x,y,r,'#f0e2a6');
        a+=trunk(90,100,188,18,30,'#8a6a4a','#5a4228')+L('M90 116L58 90M90 110L122 86','#8a6a4a',5);
        a+=blobs([[52,82,20],[74,58,24],[108,56,26],[130,82,20],[90,84,24]],'#6fae8a','#3f7d5a');
        for(let i=0;i<16;i++)a+=C(40+(i*29)%100,48+((i*17)%50),2.2,'#fff7c0');
        a+=patch(90,158,13,10,'#f4e6cc');return a;}});
    return {forms:F,face};
  })();
  const fx2=n=>Number(n.toFixed(1));
  const star=(x,y,r,fill='#f6d66b')=>`<path d="M${x} ${y-r}L${fx2(x+r*.28)} ${fx2(y-r*.28)}L${x+r} ${y}L${fx2(x+r*.28)} ${fx2(y+r*.28)}L${x} ${y+r}L${fx2(x-r*.28)} ${fx2(y+r*.28)}L${x-r} ${y}L${fx2(x-r*.28)} ${fx2(y-r*.28)}Z" fill="${fill}" stroke="#fffbe8" stroke-width=".8"/>`;
  let auraSeq=0;
  const finalAura=c=>{const id='aura'+(++auraSeq);return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity=".7"/><stop offset=".55" stop-color="${c}" stop-opacity=".32"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs><circle cx="90" cy="104" r="96" fill="url(#${id})"/>`;};
  const finalSparkles=()=>star(22,34,7)+star(160,24,6)+star(166,132,5)+star(14,120,5)+star(90,6,5);
  // 친구 색깔 = 계절·빛 '분위기'. 원색을 그대로 입히지 않고, 식물 종류마다 자연에 있을 법한 색으로만 바꿔요.
  //  (해바라기는 분홍·레몬·붉은·하얀·크림 해바라기가 될 수 있지만 보라·파랑은 되지 않아요.)
  //  [대표 색 색상(도), 최대 채도, 밝기 조절] · 'W'는 하얀 품종
  const W='W';
  const FAMILY_TONES={
    petal:    {spring:[338,.55,.08],summer:[48,.8,.02],autumn:[12,.68,-.05],winter:W,sunset:[6,.6,0],dawn:[22,.5,.12],moon:[48,.28,.18]},
    mushroom: {spring:[350,.35,.1],summer:[38,.7,.02],autumn:[8,.62,-.05],winter:W,sunset:[24,.62,0],dawn:[285,.3,.02],moon:[195,.28,.08]},
    succulent:{spring:[340,.35,.06],summer:[85,.42,.02],autumn:[14,.48,-.04],winter:[205,.14,.12],sunset:[26,.48,0],dawn:[275,.24,.04],moon:[215,.2,.05]},
    clover:   {spring:[340,.45,.08],summer:[105,.5,0],autumn:[18,.5,-.05],winter:W,sunset:[28,.52,0],dawn:[290,.28,-.02],moon:[200,.2,.06]},
    berry:    {spring:[345,.55,.1],summer:[356,.72,0],autumn:[345,.6,-.12],winter:W,sunset:[28,.7,.02],dawn:[320,.35,.1],moon:[332,.45,-.18]},
    tree:     {spring:[340,.45,.14],summer:[100,.5,0],autumn:[12,.6,-.03],winter:[180,.1,.18],sunset:[24,.6,0],dawn:[45,.7,.02],moon:[200,.28,.02]}
  };
  FAMILY_TONES.seed=FAMILY_TONES.sprout=FAMILY_TONES.tree;
  // 대표 색이 아닌 잎·줄기(초록)도 분위기에 맞게 살짝 물들여요.
  const LEAF_TONES={spring:([h,s,l])=>[h-4,s,l+.04],summer:x=>x,autumn:([h,s,l])=>[Math.max(55,h-35),s*.8,l-.02],winter:([h,s,l])=>[h,s*.35,l+.12],
    sunset:([h,s,l])=>[h-14,s*.9,l],dawn:([h,s,l])=>[h+6,s*.7,l+.04],moon:([h,s,l])=>[h+20,s*.6,l-.04]};
  const GREEN_BODY=new Set(['succulent','clover','tree','sprout','seed']);
  const CHEEK='#efb69f';
  function hexToHsl(hex){let h=hex.slice(1);if(h.length===3)h=h.split('').map(c=>c+c).join('');const r=parseInt(h.slice(0,2),16)/255,g=parseInt(h.slice(2,4),16)/255,b=parseInt(h.slice(4,6),16)/255;
    const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let hh=0,ss=0;if(mx!==mn){const d=mx-mn;ss=l>.5?d/(2-mx-mn):d/(mx+mn);hh=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;hh*=60;}return [hh,ss,l];}
  function hslToHex(h,s,l){h=((h%360)+360)%360;s=Math.max(0,Math.min(1,s));l=Math.max(.06,Math.min(.97,l));const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,9-k(n),1));return '#'+[f(0),f(8),f(4)].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('');}
  const tintCache=new Map();
  function tintArt(art,mood,family,leafOnly=false){
    const tones=FAMILY_TONES[family]||FAMILY_TONES.petal,tone=tones[mood];if(!tone)return art;
    const key=mood+family+(leafOnly?'L':'')+'|'+art.length+'|'+art.slice(0,80)+art.slice(-80);if(tintCache.has(key))return tintCache.get(key);
    const counts={};for(const m of art.matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g)){const c=m[0].toLowerCase();counts[c]=(counts[c]||0)+1;}
    const info=Object.entries(counts).map(([c,n])=>[c,n,hexToHsl(c)]);
    const green=([h,s,l])=>h>=60&&h<=200&&s>=.07&&l>=.2&&l<=.93;
    const brown=([h,s,l])=>h>=8&&h<=50&&l<.56;
    const body=GREEN_BODY.has(family)&&!leafOnly;
    // 대표 색: 초록이 아닌 선명한 색(꽃잎·갓·열매). 초록 몸 식물은 잎·몸통도 대표 색으로 봐요.
    const sig=info.filter(([,,x])=>x[1]>=.35&&x[2]>=.3&&x[2]<=.93&&!green(x)&&!brown(x)).concat(body?info.filter(([,,x])=>green(x)):[]);
    const map={};
    if(sig.length){
      const dom=sig.slice().sort((a,b)=>b[1]-a[1])[0][2][0];
      for(const [c,,[h,s,l]] of sig){
        if(tone===W){map[c]=hslToHex(h,.08,.72+l*.26);continue;}
        const [th,maxS,dl]=tone;map[c]=hslToHex(th+Math.max(-12,Math.min(12,((h-dom+540)%360)-180)),maxS*(.7+.3*Math.min(1,s)),l+dl);
      }
    }
    if(!body)for(const [c,,x] of info)if(green(x)&&!map[c]){const [h,s,l]=LEAF_TONES[mood](x);map[c]=hslToHex(h,s,l);}
    const out=art.replace(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g,m=>map[m.toLowerCase()]||m);
    if(tintCache.size>300)tintCache.clear();tintCache.set(key,out);return out;
  }
  let shadeSeq=0;
  function creatureSVG(pet,route,level,color='#aac875',silhouette=false,branch,tint,rich=false){
    const g=plantGeometry(pet,route,level,branch),kind=g.family,adult=g.adult;let richOverlay='';
    const C=(x,y,r,fill)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
    const leaf=(x,y,angle,size=1,fill='#648e52')=>`<g transform="translate(${x} ${y}) rotate(${angle}) scale(${size})"><path d="M0 0Q-24 -24 0 -58Q26 -26 0 0Z" fill="${fill}" stroke="#416e42" stroke-width="1.3"/><path d="M0 -3V-50M0 -20L-10 -30M0 -30L9 -40" stroke="#b5c695" stroke-width="1" fill="none"/></g>`;
    let art='';
    if(kind==='seed'){
      art='<path d="M91 97C53 108 50 152 68 176C87 199 119 177 124 148C126 125 109 104 91 97Z" fill="#b89360" stroke="#745432" stroke-width="3"/><path d="M91 108Q70 147 84 174" stroke="#e4c99c" stroke-width="4" fill="none"/><path d="M100 122L112 130M99 173L112 163" stroke="#957040" fill="none"/>';
    }else if(kind==='sprout'){
      art='<path d="M89 178Q94 147 91 105" stroke="#668954" stroke-width="9" fill="none"/>'+leaf(91,112,-57,.9)+leaf(92,103,52,.8)+'<ellipse cx="90" cy="156" rx="31" ry="37" fill="#c5ab7f" stroke="#9c8058" stroke-width="2"/><path d="M76 185Q82 164 78 136" stroke="#e3d1ad" stroke-width="2" fill="none"/>';
    }else if(kind==='petal'){
      art='<path d="M90 191Q103 145 90 111" stroke="#547443" stroke-width="8" fill="none"/>'+leaf(95,162,-59,.9)+leaf(94,148,62,.78);
      if(!adult){
        const petals=level>=5?8:5;
        for(let i=0;i<petals;i++)art+=`<ellipse cx="90" cy="61" rx="19" ry="30" fill="${i%2?'#eab4b3':'#f4d2c0'}" stroke="#c99191" stroke-width="1" transform="rotate(${i*360/petals} 90 91)"/>`;
        art+=C(90,91,24,'#efce83');
      }else if(route==='sunflower'){
        for(let layer=0;layer<2;layer++)for(let i=0;i<17;i++)art+=`<path d="M90 77Q67 30 89 8Q109 35 92 77" fill="${layer?'#efc843':'#dba331'}" stroke="#c29125" stroke-width=".7" transform="rotate(${i*360/17+layer*11} 90 85) ${layer?'translate(9 8) scale(.9)':''}"/>`;
        art+=C(90,85,35,'#694c2e');
        for(let r=9;r<=30;r+=7)for(let i=0;i<20;i++)art+=C(90+Math.cos(i*.314+r)*r,85+Math.sin(i*.314+r)*r,1.25,'#c99e56');
      }else if(route==='rose'){
        for(let i=0;i<10;i++)art+=`<path d="M90 91Q31 83 41 42Q80 5 119 42Q150 83 90 91Z" fill="${i%2?'#bb6578':'#d48694'}" stroke="#a8566d" stroke-width="1.4" transform="rotate(${i*36} 90 86) translate(${i*1.7} ${i*1.6}) scale(${1-i*.036})"/>`;
        art+='<path d="M67 79Q86 52 112 75Q126 102 98 112Q76 120 66 96Q63 72 86 72Q109 71 105 91Q99 105 84 94" fill="#c27488" stroke="#e7acb6" stroke-width="5"/>';
      }else{
        for(let i=0;i<5;i++)art+=`<path d="M90 91Q51 71 51 40Q57 22 75 29Q93 7 115 31Q134 61 90 91Z" fill="${i%2?'#d4b2ce':'#e7c5db'}" stroke="#ba8fb4" stroke-width="1.5" transform="rotate(${i*72} 90 91)"/>`;
        for(let i=0;i<5;i++)art+=`<path d="M90 92L81 57L97 64Z" fill="#a34e79" transform="rotate(${i*72} 90 91)"/>`;
        art+='<path d="M91 89L103 56" stroke="#f0d9bc" stroke-width="7"/>';
        for(const [x,y] of [[101,55],[106,52],[105,60],[99,61],[109,58]])art+=C(x,y,3,'#e7c25c');
      }
    }else if(kind==='mushroom'){
      if(adult&&route==='reishi'){
        art='<path d="M101 99Q89 148 104 189" stroke="#854c30" stroke-width="23" fill="none" stroke-linecap="round"/>';
        art+='<path d="M101 115C40 142 11 111 20 71C28 41 62 23 88 43C112 15 159 40 165 78C169 109 143 129 101 115Z" fill="#b06b38" stroke="#e8cfa4" stroke-width="9"/>';
        art+='<path d="M98 107C51 125 27 104 31 78C39 53 64 42 87 57C111 33 147 50 151 80C155 104 128 116 98 107Z" fill="#9c482d" stroke="#cc995c" stroke-width="7"/><path d="M96 98C56 111 43 94 51 75C61 61 76 62 89 74C111 55 134 64 135 86C135 104 112 106 96 98Z" fill="#743e2b" stroke="#b97340" stroke-width="5"/>';
      }else{
        art='<path d="M76 97Q68 145 63 182Q91 198 117 182Q108 137 105 97Z" fill="#dfcfac" stroke="#b59b77" stroke-width="2"/>';
        for(let x=74;x<=106;x+=8)art+=`<path d="M${x} 132L${x-5} 180" stroke="#b3a080" stroke-width="1.5"/>`;
        art+=`<path d="M21 111Q28 44 89 42Q151 44 160 111Q94 131 21 111Z" fill="${adult&&route==='horn'?'#847264':'#a98458'}" stroke="#69533a" stroke-width="2"/><path d="M23 111Q87 96 157 111Q96 137 23 111Z" fill="#e0cfab"/>`;
        for(let i=0;i<17;i++){const x=29+i*7.5;art+=`<path d="M90 116L${x} ${108+Math.abs(x-90)*.12}" stroke="#b6a080" stroke-width="1"/>`;}
        for(const [x,y] of [[55,77],[89,60],[118,81],[69,94],[126,98],[41,99],[104,93]])art+=`<path d="M${x-5} ${y+3}l4 -9 7 6" fill="#725039" opacity=".6"/>`;
        if(adult&&route==='matsutake')art+='<path d="M71 126Q88 144 110 127L108 139Q89 151 70 139Z" fill="#c3b18e"/>';
        if(adult&&route==='horn')art+='<path d="M48 73Q26 50 40 16Q44 46 68 54Z" fill="#c3b496" stroke="#7e7262" stroke-width="2"/><path d="M115 55Q144 41 143 14Q161 49 137 75Z" fill="#c3b496" stroke="#7e7262" stroke-width="2"/>';
      }
    }else if(kind==='clover'){
      const tint=adult&&route==='silver'?'#a7c4b2':'#70a363';
      art='<path d="M90 189Q103 153 90 116" fill="none" stroke="#567f4e" stroke-width="7"/>'+leaf(95,171,65,.65);
      for(let i=0;i<(adult?4:3);i++)art+=`<path d="M90 116C60 106 41 77 56 60Q75 47 90 69Q109 46 124 61C141 80 118 107 90 116Z" fill="${tint}" stroke="#4f7951" stroke-width="2" transform="rotate(${i*(adult?90:120)} 90 116)"/><path d="M90 113V77" stroke="#ccdbad" stroke-width="1.5" transform="rotate(${i*(adult?90:120)} 90 116)"/>`;
      if(adult&&route==='crimson'){art+='<path d="M90 143L113 50" stroke="#567f4e" stroke-width="4"/>';for(let i=0;i<15;i++)art+=`<ellipse cx="${113+Math.sin(i*2.4)*13}" cy="${38+Math.cos(i*2.4)*17}" rx="5" ry="9" fill="${i%2?'#c57493':'#e3a5b7'}"/>`;}
    }else if(kind==='berry'){
      art='<path d="M90 181Q67 126 90 61" fill="none" stroke="#64814e" stroke-width="6"/>'+leaf(85,168,-60,.8)+leaf(87,156,62,.75);
      if(adult&&route==='blueberry'){
        for(const [x,y] of [[68,99],[106,96],[90,125],[65,135],[111,133]])art+=C(x,y,22,'#7684ae')+C(x-5,y-8,5,'#aeb8ce')+`<path d="M${x-6} ${y}l5 -4 5 4-5 4Z" fill="#505d89"/>`;
      }else if(adult&&route==='raspberry'){
        for(let row=0;row<5;row++)for(let col=0;col<5-row;col++)art+=C(57+col*17+row*8,88+row*15,12,row%2?'#c66c80':'#d38494');
      }else{
        art+='<path d="M48 89Q48 69 90 82Q132 68 132 92Q128 140 90 166Q53 141 48 89Z" fill="#d78983" stroke="#aa625e" stroke-width="2"/>';
        for(let y=97;y<148;y+=15)for(let x=65;x<122-(y-95)*.3;x+=18)art+=`<ellipse cx="${x}" cy="${y}" rx="1.6" ry="3" fill="#f2d5a1"/>`;
      }
      for(let i=0;i<5;i++)art+=leaf(90,83,-85+i*42,.38,'#789854');
    }else if(kind==='tree'){
      art='<path d="M76 189L80 94H102L112 189L95 183Z" fill="#aa8963" stroke="#806848" stroke-width="2"/><path d="M90 183V114M88 135L65 113M99 142L121 118" fill="none" stroke="#806848" stroke-width="2"/>';
      if(adult&&route==='willow'){
        art+='<path d="M30 83Q90 5 150 83Z" fill="#97b180"/>';
        for(let i=0;i<9;i++){const x=30+i*15;art+=`<path d="M90 58Q${x} 44 ${x} 145" stroke="#5f8657" stroke-width="3" fill="none"/>`;for(let y=80;y<144;y+=15)art+=leaf(x,y,-25,.28,'#8dab70');}
      }else if(adult&&route==='ginkgo'){
        for(let i=0;i<13;i++){const x=90+Math.sin(i*2.4)*49,y=77+Math.cos(i*2.4)*34;art+=`<path d="M${x} ${y+29}L${x-25} ${y-6}Q${x} ${y-33} ${x+25} ${y-6}Z" fill="${i%2?'#d2b559':'#e9cd77'}" stroke="#b29949" stroke-width="1"/>`;}
      }else{
        for(const [x,y,r] of [[49,92,29],[72,63,32],[111,63,33],[132,94,29],[90,103,38]])art+=C(x,y,r,'#86a575');
        for(let i=0;i<(adult?20:8);i++)art+=leaf(90+Math.sin(i*2.4)*49,89+Math.cos(i*2.4)*29,i*33,.4,i%2?'#6b915d':'#abc18e');
        if(adult)for(const x of [48,130])art+=`<ellipse cx="${x}" cy="115" rx="7" ry="10" fill="#b39362"/><path d="M${x-8} 109Q${x} 98 ${x+8} 109Z" fill="#7d704a"/>`;
      }
    }else{
      if(!adult){
        art='<path d="M76 128L75 186Q90 195 109 185L104 128Z" fill="#bdab80"/>';
        const n=level>=5?9:6;
        for(let i=0;i<n;i++)art+=leaf(90,138,i*360/n,.95,i%2?'#88a58b':'#a6bb9f');
      }else if(route==='undulata'){
        art='<path d="M80 111L76 187Q91 196 111 185L102 111Z" fill="#ac9d80"/>';
        for(let layer=0;layer<2;layer++)for(let i=0;i<5;i++)art+=`<path d="M90 145Q52 127 49 100Q31 91 47 79Q31 65 51 55Q43 39 64 41Q74 19 88 41Q107 26 115 48Q137 49 121 69Q140 82 121 96Q125 122 90 145Z" fill="${layer?'#b5c5ba':'#95ada3'}" stroke="#dce4d2" stroke-width="3" transform="rotate(${i*72+layer*30} 90 119) translate(${layer*17} ${layer*21}) scale(${layer?.8:1})"/>`;
      }else if(route==='euphorbia'){
        art='<path d="M64 109Q58 73 89 70Q124 74 120 109L127 168Q117 193 89 193Q59 190 54 166Z" fill="#ae9470" stroke="#796c50" stroke-width="2"/>';
        for(let y=98;y<184;y+=13)for(let x=65;x<123;x+=13)art+=`<path d="M${x} ${y}l5 -5 5 5 -5 6Z" fill="${(x+y)%2?'#c1aa85':'#927f5d'}" stroke="#806f52" stroke-width=".8"/>`;
        for(let i=0;i<9;i++)art+=leaf(90,82,-95+i*24,.98,i%2?'#638d49':'#80a55c');
      }else{
        art='<path d="M72 181V110H55Q31 110 31 86V65Q31 49 43 49Q55 49 55 65V85H72V42Q72 18 94 18Q116 18 116 42V112H132V83Q132 67 144 67Q156 67 156 83V112Q156 137 130 137H116V185Q94 197 72 181Z" fill="#789768" stroke="#4f7553" stroke-width="3"/>';
        for(const x of [80,93,106])art+=`<path d="M${x} 42V182" stroke="#b0be83" stroke-width="2" fill="none"/>`;
        for(let y=51;y<180;y+=22)for(const x of [83,105])art+=`<path d="M${x-3} ${y-3}l6 6m-6 0l6 -6" stroke="#ece2b4" stroke-width="1.5"/>`;
      }
    }
    // Lv.15 갈래 · Lv.20 최종 진화
    if(g.form){
      art=g.form.draw();
      if(level>=20)art=(silhouette?'':finalAura(g.form.aura||'#fff0b3'))+art+(silhouette?'':finalSparkles());
      // Lv.16 ~ 19: 레벨마다 신비한 빛 알갱이가 하나씩 늘어나요.
      else if(level>15&&!silhouette)art=`<ellipse cx="90" cy="110" rx="${60+(level-15)*6}" ry="${70+(level-15)*6}" fill="#fff6c8" opacity="${(0.18+(level-15)*0.08).toFixed(2)}"/>`+art+[[24,40],[158,30],[164,120],[16,112]].slice(0,level-15).map(([x,y])=>star(x,y,5)).join('');
    }
    const [fx,fy]=g.face;
    const baseFace=C(fx-10,fy,level>=5?2.3:3,'#38442d')+C(fx+10,fy,level>=5?2.3:3,'#38442d')+`<path d="M${fx-4} ${fy+7}Q${fx} ${fy+11} ${fx+4} ${fy+7}" stroke="#38442d" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    const face=g.form?LEGEND.face(g.form.st,fx,fy,g.form.fs||1,g.form.ink):baseFace;
    const charm=`<ellipse cx="${fx-18}" cy="${fy+7}" rx="4" ry="2.5" fill="${color}"/><ellipse cx="${fx+18}" cy="${fy+7}" rx="4" ry="2.5" fill="${color}"/>`;
    if(rich&&!silhouette&&kind!=='seed'){const id='shade'+(++shadeSeq),mask=art.replace(/fill="(?!none)[^"]+"/g,'fill="#fff"').replace(/stroke="(?!none)[^"]+"/g,'stroke="#fff"');
      // 빛이 왼쪽 위에서 비치는 것처럼 은은한 명암을 입혀 입체감을 더해요.
      richOverlay=`<defs><linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".42" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#1d2a1a" stop-opacity="0"/><stop offset="1" stop-color="#1d2a1a" stop-opacity=".2"/></linearGradient><mask id="${id}m" maskUnits="userSpaceOnUse" x="-40" y="-40" width="260" height="290">${mask}</mask></defs><rect x="-40" y="-40" width="260" height="290" fill="url(#${id}g)" mask="url(#${id}m)" pointer-events="none"/>`;}
    if(tint&&tint!=='original'&&!silhouette)art=tintArt(art,tint,kind,g.form&&branchOf(pet,route,level,adult,branch)==='bamboo');
    // SVG filter is local to each SVG. Silhouette removes all fill/stroke colors and facial detail.
    if(silhouette)art=art.replace(/fill="[^"]+"/g,'fill="#34453d"').replace(/stroke="[^"]+"/g,'stroke="#34453d"').replace(/opacity="[^"]+"/g,'opacity="1"');
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 210" aria-hidden="true"><g transform="translate(${90*(1-g.scale)} ${197*(1-g.scale)}) scale(${g.scale})"><g class="plant-body"><g class="plant-art">${art}</g>${richOverlay}</g>${silhouette?'':charm+`<g class="expression-normal">${face}</g><g class="expression-happy"><path d="M${fx-16} ${fy+1}q6 -10 12 0M${fx+4} ${fy+1}q6 -10 12 0" fill="none" stroke="#38442d" stroke-width="2.6" stroke-linecap="round"/><path d="M${fx-7} ${fy+8}q7 4 14 0q-1 14-7 14t-7-14" fill="#79473f"/><path d="M${fx-4} ${fy+17}q4 -4 8 0" fill="none" stroke="#edaaa0" stroke-width="3"/><ellipse cx="${fx-19}" cy="${fy+9}" rx="6" ry="3.5" fill="#eaa28d" opacity=".8"/><ellipse cx="${fx+19}" cy="${fy+9}" rx="6" ry="3.5" fill="#eaa28d" opacity=".8"/></g><g class="expression-lift"><circle cx="${fx-10}" cy="${fy}" r="4" fill="#38442d"/><circle cx="${fx+10}" cy="${fy}" r="4" fill="#38442d"/><ellipse cx="${fx}" cy="${fy+10}" rx="4" ry="6" fill="#68483a"/></g><g class="expression-land"><path d="M${fx-15} ${fy-4}l7 4-7 4M${fx+15} ${fy-4}l-7 4 7 4M${fx-5} ${fy+12}q5 -5 10 0" stroke="#38442d" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>`}</g></svg>`;
  }
window.FOREST_CHAR={creatureSVG,GROWTH,plantGeometry,setProfile:p=>{profile=p}};
})();
