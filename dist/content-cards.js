// Rich study content for the 2026-11-15 card set. Merges into window.NH_CONTENT (content.js loads first).
(function(){
const NH=window.NH_CONTENT=window.NH_CONTENT||{};
/* ---------- building blocks (same visual grammar as 네이버 헬스케어 생태계) ---------- */
const lead=t=>`<div class="rich-lead">${t}</div>`;
const h3=t=>`<h3 class="rich-h3">${t}</h3>`;
const stats=a=>`<div class="stat-grid">${a.map(([n,u,l])=>`<div class="stat"><strong>${n}${u?`<small>${u}</small>`:''}</strong><span>${l}</span></div>`).join('')}</div>`;
const timeline=a=>`<ol class="timeline">${a.map(([d,t,p])=>`<li><time>${d}</time><div><strong>${t}</strong><span>${p}</span></div></li>`).join('')}</ol>`;
const pillars=a=>`<div class="pillar-grid">${a.map(([k,t,items])=>`<article class="pillar"><span class="pillar-key">${k}</span><h3>${t}</h3><ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul></article>`).join('')}</div>`;
const table=(head,rows,note)=>`<div class="cmp-wrap"><table class="cmp-table"><thead><tr>${head.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>i?`<td>${c}</td>`:`<th scope="row">${c}</th>`).join('')}</tr>`).join('')}</tbody></table></div>${note?`<p class="cmp-note">${note}</p>`:''}`;
const fig=(svg,cap)=>`<figure class="nh-figure">${svg}<figcaption>${cap}</figcaption></figure>`;
const callout=(k,t,body)=>`<div class="nh-callout"><span class="pillar-key">${k}</span><h3>${t}</h3><div>${body}</div></div>`;
const qa=a=>`<div class="qa-grid">${a.map(([q,ans],i)=>`<article class="qa"><span class="qa-q">Q${i+1}</span><h3>${q}</h3><div>${ans}</div></article>`).join('')}</div>`;
const me=items=>`<div class="link-me" data-peek><span class="peek-buddy" aria-hidden="true"><i></i><i></i></span><span class="pillar-key">ME</span><h3>내 경험과 연결할 포인트</h3><ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`;
const journey=a=>`<ol class="journey">${a.map(([x,y])=>`<li><strong>${x}</strong><span>${y}</span></li>`).join('')}</ol>`;
const yt=(id,title,ch,note)=>`<figure class="video-card" data-id="${id}" data-title="${title}"><div class="video-frame"><img class="video-thumb" src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy"><button class="video-toggle" type="button" aria-label="재생" aria-pressed="false"><svg class="i-play" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg><svg class="i-pause" viewBox="0 0 24 24"><path d="M7 5h3.6v14H7zM13.4 5H17v14h-3.6z"/></svg></button></div><figcaption><strong>${title}</strong><span>${ch}${note?` · ${note}`:''}</span><a class="video-link" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">youtube.com/watch?v=${id}</a></figcaption></figure>`;
const videos=a=>`<div class="video-grid">${a.map(v=>yt(...v)).join('')}</div>`;
const sources=(S,note)=>`<ol class="source-list">${S.map((s,i)=>{const host=new URL(s[3]).hostname.replace(/^www\.|^m\./,'');return `<li id="src-${i+1}"><a href="${s[3]}" target="_blank" rel="noopener"><span class="src-n">${i+1}</span><span class="src-body"><span class="src-title">${s[0]}</span><span class="src-meta"><img class="src-fav" src="https://www.google.com/s2/favicons?domain=${host}&amp;sz=64" alt="" loading="lazy" onerror="this.remove()">${s[1]} · ${s[2]}</span></span><span class="src-arrow" aria-hidden="true">↗</span></a></li>`}).join('')}</ol><p class="source-note">${note}</p>`;
const NOTE='2026년 11월 15일 기준 공개 자료로 정리했습니다. 회사 발표·자체 설문 수치가 섞여 있으니 면접 전 원문을 한 번 더 확인하세요.';

/* ---------- SVG diagram helpers (vector, crisp at any size) ---------- */
const svg=(w,h,body,label)=>`<svg class="nh-diagram" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}" font-family="Pretendard, 'Space Grotesk', sans-serif">${body}</svg>`;
const tw=(t,fs)=>[...String(t)].reduce((a,ch)=>a+(/[\u3131-\uD79D]/.test(ch)?fs:/[A-Z0-9]/.test(ch)?fs*.64:fs*.54),0);
const T=(x,y,t,o='')=>`<text x="${x}" y="${y}" ${o}>${t}</text>`;
const box=(x,y,w,h,r,cls)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" class="${cls}"/>`;
const arrowDefs=`<defs><marker id="nh-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="d-arrow"/></marker></defs>`;
// Positioning map: points [label, x(0-1), y(0-1), highlight]
function posMap(xl,yl,quads,pts,label){const W=960,H=460,L=70,R=40,Tp=30,B=60,iw=W-L-R,ih=H-Tp-B;let b=arrowDefs;
 b+=box(L,Tp,iw,ih,22,'d-soft');
 b+=`<line x1="${L+iw/2}" y1="${Tp+14}" x2="${L+iw/2}" y2="${Tp+ih-14}" class="d-line" stroke-dasharray="4 6"/><line x1="${L+14}" y1="${Tp+ih/2}" x2="${L+iw-14}" y2="${Tp+ih/2}" class="d-line" stroke-dasharray="4 6"/>`;
 quads.forEach((q,i)=>{const qx=L+(i%2?iw-24:24),qy=Tp+(i<2?36:ih-20);b+=T(qx,qy,q,`class="d-muted" font-size="15" text-anchor="${i%2?'end':'start'}"`)});
 b+=`<line x1="${L}" y1="${H-26}" x2="${L+iw}" y2="${H-26}" class="d-axis" marker-end="url(#nh-arr)"/>`+T(L,H-6,xl[0],'class="d-muted" font-size="15"')+T(L+iw,H-6,xl[1],'class="d-ink" font-size="15" font-weight="700" text-anchor="end"');
 b+=`<line x1="${L-34}" y1="${Tp+ih}" x2="${L-34}" y2="${Tp}" class="d-axis" marker-end="url(#nh-arr)"/>`+T(L-44,Tp+ih,yl[0],`class="d-muted" font-size="15" transform="rotate(-90 ${L-44} ${Tp+ih})"`)+T(L-44,Tp,yl[1],`class="d-ink" font-size="15" font-weight="700" text-anchor="end" transform="rotate(-90 ${L-44} ${Tp})"`);
 pts.forEach(([t,x,y,hl])=>{const px=L+24+x*(iw-48),py=Tp+24+(1-y)*(ih-48),w=tw(t,16)+32;b+=`<g><rect x="${px-w/2}" y="${py-19}" width="${w}" height="38" rx="19" class="${hl?'d-green':'d-card'}"/>${T(px,py+6,t,`font-size="16" font-weight="700" text-anchor="middle" class="${hl?'d-onGreen':'d-ink'}"`)}</g>`});
 return svg(W,H,b,label)}

/* =====================================================================
   1. 세나클과 오름차트, 그리고 클레
   ===================================================================== */
const S1=[
 ['세나클소프트, 오름차트와 건강관리 앱 클레 연결','메디게이트뉴스','2024.03.05','https://medigatenews.com/news/2350488700'],
 ['SenacleSoft Launches Personal Health Record Service "Kle"','아시아경제','2024.03.05','https://www.asiae.co.kr/en/article/2024030513243244331'],
 ['디지털 헬스케어 스타트업 세나클소프트, 126억 원 투자 유치','메디게이트뉴스','2021.07.26','https://medigatenews.com/news/3386318923'],
 ['세나클소프트, \'마오름\'으로 업데이트 "병원과 환자 편의 모두 잡아"','아시아경제','2022.12.05','https://view.asiae.co.kr/article/2022120510313437079'],
 ['오름차트, 네이버∙카카오톡 연계 병원 예약 서비스 제공','메디게이트뉴스','2023.08.09','https://www.medigatenews.com/news/1781318872'],
 ['오름차트 사용 의사 절반은 질병관리청 연동·이미지뷰어 기능 가장 만족','메디게이트뉴스','2024.01.02','https://medigatenews.com/news/2940500540'],
 ['오름차트 선택 이유...편리성과 빠른 고객센터 대응, 매주 기능 업데이트','메디게이트뉴스','2025.07.16','https://medigatenews.com/news/2831206371'],
 ['오름차트 기능 만족도 1위 의사 그룹은 사전심사, 비의사 그룹은 진료검색','메디게이트뉴스','2025.07.23','https://medigatenews.com/news/2334850603'],
 ['네이버, 클라우드 EMR 기업 세나클 인수','메디게이트뉴스','2025.11.26','https://medigatenews.com/news/2406492325'],
 ['최인혁·위의석 대표 "네이버의 세나클 인수, 의사와 환자가 만족하는 헬스케어 서비스 꿈꾼다"','메디게이트뉴스','2026.01.06','https://medigatenews.com/news/3391544136'],
 ['사내 의료도 클라우드 전환… 네이버 부속의원, \'오름차트\'로 진료 혁신','벤처스퀘어','2026.07.20','https://www.venturesquare.net/1099701/'],
 ['병원 수납 창구서 얼굴로 결제한다…세나클 오름차트, 네이버페이 커넥트 연동','바이라인네트워크','2026.09.15','https://byline.network/2026/09/15_cenacle/'],
 ['네이버 헬스케어 전담조직 10월 출범','파이낸셜뉴스','2026.09.08','https://www.fnnews.com/news/202609082116568596'],
 ['세나클(오름차트) 투자 이력','THE VC','2026','https://thevc.kr/cenacle/fundings']
];
// Two-lane flow: patient (클레) above, clinic (오름차트) below
function flowSvg(){const steps=['예약','접수 · 문진','진료','청구','수납','진료 후'],top=['네이버 예약<br>카카오 채널','앱 접수<br>대기 순서','진료실<br>입실 안내','—','간편결제<br>페이스사인','검사결과 · 복약<br>후속 진료 안내'],bot=['예약 관리<br>병원홈','태블릿 접수<br>전자문진 · 동의','진료 화면<br>이미지뷰어','청구<br>사전심사','Npay 커넥트<br>수납 연동','결과 전송<br>CRM 메시지'];
 const W=960,H=400,x0=140,dx=134,w=118;let b=arrowDefs;
 b+=T(18,118,'환자','class="d-ink" font-size="17" font-weight="700"')+T(18,140,'클레 앱','class="d-muted" font-size="15"');
 b+=T(18,288,'병원','class="d-ink" font-size="17" font-weight="700"')+T(18,310,'오름차트','class="d-muted" font-size="15"');
 b+=box(120,72,W-136,110,20,'d-mint')+box(120,242,W-136,110,20,'d-soft');
 steps.forEach((s,i)=>{const cx=x0+i*dx+w/2;b+=`<rect x="${cx-46}" y="18" width="92" height="30" rx="15" class="d-ink-fill"/>`+T(cx,38,s,'font-size="15" font-weight="700" text-anchor="middle" class="d-onInk"');
  const lines=(a,y,cls)=>a[i].split('<br>').map((t,k)=>T(cx,y+k*20,t,`font-size="15" text-anchor="middle" class="${cls}" ${k?'':'font-weight="700"'}`)).join('');
  b+=box(cx-w/2,88,w,78,14,'d-card')+lines(top,122,top[i]==='—'?'d-muted':'d-ink');
  b+=box(cx-w/2,258,w,78,14,'d-card')+lines(bot,292,'d-ink');
  b+=`<line x1="${cx}" y1="170" x2="${cx}" y2="254" class="d-line" stroke-dasharray="3 5"/>`;
  if(i<steps.length-1)b+=`<line x1="${cx+w/2+2}" y1="297" x2="${cx+dx-w/2-6}" y2="297" class="d-axis" marker-end="url(#nh-arr)"/>`});
 b+=T(W/2+60,386,'같은 데이터가 병원(오름차트)과 환자(클레) 양쪽 화면으로 흐르는 구조','font-size="15" text-anchor="middle" class="d-muted"');
 return svg(W,H,b,'오름차트와 클레의 진료 흐름 다이어그램')}

NH['cenacle-ormchart']={
 intro:'오름차트는 <b>의원의 하루</b>를, 클레는 <b>환자의 병원 경험</b>을 한 데이터로 묶습니다. 네이버가 왜 이 회사를 품었는지가 여기서 보입니다.',
 summary:[
  '세나클(세나클소프트)은 <b>2018년 11월 설립</b>된 의원급 클라우드 EMR 회사로, <b>2025년 11월 네이버클라우드가 최대주주</b>가 됐다.',
  '<b>2021년 1월 출시</b>한 오름차트는 접수·태블릿 문진·진료·<b>청구 사전심사</b>까지 의원 업무를 하나의 클라우드 화면에서 처리한다.',
  '<b>2024년 3월 출시</b>한 환자 앱 <b>클레</b>는 예약·접수·결제·검사결과·가족 관리까지 병원과 환자를 잇는 PHR이다.',
  '의사가 가장 만족하는 기능은 <b>청구 사전심사(72%)</b>, 직원은 <b>진료검색</b>이다. 같은 EMR이라도 <b>역할마다 가치가 다르다</b>(자체 설문).',
  '네이버 예약·<b>Npay 커넥트</b>·사내 부속의원 도입까지 이어지며, 오름차트는 네이버 헬스케어의 <b>‘진료 현장’ 축</b>이 됐다.'
 ],
 sources:S1,
 sections:[
  {id:'overview',title:'한눈에 보기',html:lead('세나클은 <b>클라우드 EMR(오름차트)</b>과 <b>환자 앱(클레)</b>을 함께 가진 드문 회사입니다. 병원 쪽 기록과 환자 쪽 경험이 같은 데이터에서 출발합니다.')+
   stats([['2018. 11.','','세나클소프트 설립'],['230','억','누적 투자 (2021년 7월 기준)'],['72','%','의사 만족 1위 기능, 청구 사전심사 (2025 자체 설문)'],['~100','%','오름차트 2025년 전년 대비 성장률 (대표 인터뷰)']])+
   h3('오름차트 × 클레, 진료 흐름 한 장으로 보기')+fig(flowSvg(),'보도·제품 소개 내용을 바탕으로 재구성한 다이어그램입니다.')},
  {id:'history',title:'세나클 히스토리',html:timeline([
   ['2018.11','세나클소프트 설립','위의석·박찬희 공동대표 체제로 출발.'],
   ['2019~2020','Seed · Pre-A · Series A','Series A에 네이버클라우드가 전략적 투자자로 참여.'],
   ['2021.01','오름차트 출시','의원급 대상 클라우드 EMR을 SaaS로 출시.'],
   ['2021.07','Series B 126억 원','카카오벤처스·뮤렉스파트너스·두나무앤파트너스에 아산사회복지재단이 합류. 누적 230억 원.'],
   ['2022.12','‘마오름’ 대규모 업데이트','태블릿 접수·전자문진·전자동의, 국가건강검진 문진 자동 연동, 병원홈.'],
   ['2023','이미지뷰어 · Series C · 예약 연동','클라우드 EMR 최초 이미지뷰어(2월), Series C(2월), 네이버 예약·카카오 채널 연동 모바일 예약(8월).'],
   ['2024.03','환자 앱 ‘클레’ 출시','오름차트 사용 병원은 무료로 연동. 건강 콘텐츠는 서울아산병원 제휴.'],
   ['2025.04','진료 검색 전면 개편','약제·상병명·사용자코드로 찾는 진료검색을 다시 설계.'],
   ['2025.11','네이버클라우드 최대주주','기존 지분 8.8%에서 추가 투자로 최대주주 확보. 오름차트는 독립 운영.'],
   ['2026.07','네이버 사내 부속의원 도입','네이버웍스·네이버 예약 기반 사전문진과 건강 리포트를 한 진료 흐름으로.'],
   ['2026.09','Npay 커넥트 연동','수납 창구에서 카드·QR·간편결제·얼굴인식(페이스사인) 결제.'],
   ['2026.10','네이버 헬스케어 전담조직','세나클 공동대표가 테크비즈니스 부문 산하 전담조직을 이끄는 것으로 보도.']
  ])},
  {id:'ormchart',title:'오름차트 분석',html:lead('오름차트의 경쟁력은 화려한 AI보다 <b>의원이 매일 반복하는 일을 빠르게</b> 만드는 데 있습니다. 매주 기능을 업데이트하는 SaaS 방식이 그 속도를 받칩니다.')+
   pillars([
    ['접수 · 문진','진료 전 단계를 디지털로',['태블릿 접수·전자문진·전자동의, 전자서명','국가건강검진 문진 결과를 차트에 자동 연동','네이버 예약·카카오 채널과 예약 관리 연동']],
    ['진료실','진료에 집중하는 화면',['진료 영상을 차트에 띄워 캡처·편집하는 이미지뷰어','약제·상병명·사용자코드로 찾는 진료검색','감염병 신고·예방접종 등 질병관리청 연동']],
    ['청구','실수를 미리 거르는 청구',['심평원 기준을 반영한 <b>청구 사전심사</b>(특허 기술, 무료 제공)','자동 청구 집계, 통계·경영 보고서','진료정보교류·실손청구 간소화 등 제도 연동']],
    ['연결','병원 밖으로 이어지는 채널',['환자 앱 클레로 검사결과 전송·후속 진료 안내','Npay 커넥트 수납, 네이버 사내 부속의원 도입','2026년 계획: 키오스크, AI 환자호출, 전국 지원망']]
   ])+
   h3('역할별로 다른 ‘만족 기능’ (2025 자체 설문)')+
   table(['순위','의사 그룹 (116명)','직원 그룹 (120명)'],[
    ['1','청구 사전심사 72%','진료검색 43%'],
    ['2','청구 59%','예약관리 41%'],
    ['3','이미지뷰어 34%','태블릿 접수 29%'],
    ['4','예약관리 31%','—'],
    ['5','진료검색 29%','—']
   ],'세나클이 직접 실시한 설문(응답 236명)이라 회사 자료로 보는 것이 맞습니다.')+
   callout('UX','같은 EMR, 다른 사용자',`의사는 <b>돈과 실수(청구·심사)</b>에서, 직원은 <b>찾기와 일정(검색·예약)</b>에서 가치를 느낍니다. 한 화면을 모두에게 같게 만들기보다 <b>역할별 홈과 단축 동선</b>을 주는 것이 의원 EMR UX의 핵심입니다.`)},
  {id:'kle',title:'클레 분석',html:lead('클레는 오름차트를 쓰는 병원과 <b>환자 사이의 창구</b>입니다. 진료 기능은 연동 병원에서만 열리고, 모든 기능은 무료입니다.')+
   journey([['예약 · 접수','앱에서 예약하고 원격 접수'],['대기','진료 대기 순서와 입실 안내'],['결제','간편결제, 서류 발급 요청'],['결과','진료기록·검사결과·서류 보관'],['관리','복약·혈압·혈당 타임라인'],['가족','자녀·부모 대리 접수·결제·공유']])+
   h3('UX로 본 강점과 과제')+
   table(['구분','강점','과제 (해석)'],[
    ['데이터','병원 차트와 같은 원천이라 결과·서류가 정확하고 빠름','연동 병원 밖 기록은 비어 있음 → 네트워크가 커야 가치가 커짐'],
    ['가족','보호자가 아이·부모의 접수와 결제를 대신하는 실제 맥락 반영','공유 범위·동의를 이해하기 쉽게 보여주는 설계가 필요'],
    ['연속성','검사결과 전송, 후속 진료 메시지로 진료 후까지 이어짐','네이버 헬스케어 앱·건강 에이전트와 역할 정리가 필요'],
    ['비용','병원·환자 모두 무료라 도입 장벽이 낮음','수익 모델은 오름차트·네이버 서비스와의 결합에 달림']
   ],'과제 열은 공개 자료를 바탕으로 한 해석입니다.')},
  {id:'video',title:'영상으로 보기',html:videos([
   ['OE7bbzL86g8','세나클소프트, KIMES 2022서 클라우드 EMR 오름차트 소개','에이빙 뉴스','제품 소개'],
   ['AmtO1aIYWUA','[오름차트 EMR] 태블릿 패키지 KIMES 2023','오름차트 공식','태블릿 접수·문진'],
   ['LqM5kGXsGtQ','의사 VC가 pick한 디지털 헬스케어 기업들④ 세나클소프트','메디게이트뉴스','투자 관점']
  ])},
  {id:'interview',title:'면접 체크포인트',html:qa([
   ['오름차트가 의원 시장에서 빠르게 큰 이유는?','설치형이 대부분이던 의원 EMR에 <b>클라우드 SaaS</b>로 들어와 매주 업데이트하고, 의사가 체감하는 <b>청구 사전심사</b>를 무료로 줬다. 일부 진료과 신규 개원 점유율 60% 이상, 신규 가입의 절반 이상이 다른 EMR에서 옮겨 왔다.'],
   ['클레와 네이버 헬스케어(B2C)는 어떻게 나눠야 할까?','클레는 <b>내가 다니는 병원과의 관계</b>(예약·결과·결제), 네이버는 <b>병원을 찾기 전후의 탐색과 관리</b>(증상·추천·예약). 로그인과 기록을 이어 하나의 여정처럼 보이게 하는 것이 과제다.'],
   ['EMR에 AI를 얹는다면 어디부터?','이미 만족도가 높은 <b>반복 업무</b>(사전심사·진료검색)를 더 빠르게 하는 AI, 그리고 <b>진료기록 요약·작성</b>이 1순위. 새 기능보다 기존 흐름 안에서 시간을 줄이는 것이 채택률을 만든다.'],
   ['‘독점보다 표준’이라는 말의 UX 의미는?','외부 서비스와 잘 연결되는 EMR이 의원에게 더 큰 선택권을 준다는 뜻. 연동 설정·권한·데이터 흐름을 <b>의료진이 이해할 수 있게</b> 보여주는 설계가 필요하다.']
  ])+me(['통신·금융·보험처럼 <b>정책과 예외가 많은 서비스</b>를 구조화한 경험 → 청구·심사·보험 연동 화면','의료진 인터뷰 기반 <b>진료 시나리오와 와이어프레임</b> 설계 경험 → 진료실·접수 화면 개선','<b>AI 기능 출시</b> 경험 → AI 문진·기록 요약 UX'])},
  {id:'source',title:'참고 자료',html:sources(S1,NOTE)}
 ]
};

/* =====================================================================
   2. 국내·해외 EMR/EHR — AI와 병원 밖 연결
   ===================================================================== */
const S2=[
 ['Epic unveils AI agents, showcases new foundational models','Healthcare IT News','2025.08','https://www.healthcareitnews.com/news/epic-unveils-ai-agents-showcases-new-foundational-models'],
 ['Epic AI in 2026: What Epic Ships, and What You Still Have to Build','Topflight','2026.10.07','https://topflightapps.com/ideas/epic-ai/'],
 ['Epic AI Features and the Platform Question','Global Health Congress','2026.08.24','https://globalhealthcongress.com/2026/08/24/epic-ai-features-and-the-platform-question-will-the-ehr-swallow-health-ai-startups/'],
 ['Epic vs Cerner: A Technical Comparison of AI in EHRs','IntuitionLabs','2026.08.09','https://intuitionlabs.ai/articles/epic-vs-cerner-ai-comparison'],
 ['Microsoft Dragon Copilot','Microsoft','2026','https://www.microsoft.com/en-us/health-solutions/clinical-workflow/dragon-copilot'],
 ['유비케어, \'의사랑 AI\' 공개로 AI 진료 및 운영 자동화 시대 제시','의학신문','2026.03.25','https://www.bosa.co.kr/news/articleView.html?idxno=3001465'],
 ['"이제 환자 눈 맞추며 진료합니다"…유비케어가 쏘아 올린 \'AI 진료 혁명\'','헤럴드경제','2026.03.19','https://biz.heraldcorp.com/article/10698426'],
 ['GC메디아이 vs 이지케어텍…\'메디컬 OS\' 선점 경쟁','데일리메디','2026.08.28','https://dailymedi.com/news/news_view.php?ca_id=&wr_id=939849'],
 ['대웅, 병상 이어 의무기록…퍼즐에이아이 협력','데일리메디','2026.04.29','https://www.dailymedi.com/news/news_view.php?wr_id=936095'],
 ['이지케어텍, \'음성인식 연동 EMR\' 위해 퍼즐에이아이와 협력','코메디닷컴','2024.05.22','https://kormedi.com/1691000/'],
 ['아플때 어디로 가지?…온라인 증상체크 서비스 \'네이버헬스케어\'','메디게이트뉴스','2025.03.01','https://medigatenews.com/news/3745284062'],
 ['세나클소프트, 오름차트와 건강관리 앱 클레 연결','메디게이트뉴스','2024.03.05','https://medigatenews.com/news/2350488700']
];
NH['emr-ehr']={
 intro:'EMR은 이제 <b>기록하는 도구</b>가 아니라 <b>일을 대신하는 에이전트</b>이자, 병원 밖 환자와 이어지는 <b>관문</b>이 되고 있습니다.',
 summary:[
  'EMR 경쟁의 축이 <b>‘기록’에서 ‘AI 에이전트’</b>로 옮겨가고 있다. Epic은 의사(<b>Art</b>)·환자(<b>Emmie</b>)·청구(<b>Penny</b>) 세 에이전트를 내놨다.',
  '대화를 듣고 기록을 대신 쓰는 <b>앰비언트 AI는 이제 기본기</b>다. Epic ‘Chart with Art’, MS <b>Dragon Copilot</b>, Abridge가 맞붙는다.',
  '국내도 GC메디아이(옛 유비케어) <b>‘의사랑 AI’</b>, <b>퍼즐에이아이</b> 음성 EMR처럼 음성인식·자동 차팅이 빠르게 상용화되고 있다.',
  '병원 밖 연결은 <b>환자 포털·앱</b>이 맡는다. 해외는 MyChart의 Emmie, 국내는 똑닥·클레처럼 예약·결과·결제를 잇는 앱이 핵심이다.',
  '<b>진료 이후(after-visit)</b>는 아직 빈칸이 많다. 결과 해석·복약·재방문 판단이 UX 기회가 가장 큰 영역이다.'
 ],
 sources:S2,
 sections:[
  {id:'overview',title:'한눈에 보기',html:lead('같은 ‘AI EMR’이라도 <b>누구의 일을 줄이느냐</b>(의사·간호사·원무·환자)와 <b>어디까지 닿느냐</b>(병원 안·밖)로 지도를 그려 보면 차이가 선명해집니다.')+
   stats([['3','종','Epic AI 에이전트 (Art·Emmie·Penny)'],['45','%','의사랑의 의원급 EMR 점유율 (회사 발표, 약 1.6만 곳)'],['56.9','%','Epic 미국 병상 점유율 (KLAS 2026, 2025년 기준)'],['200','+','퍼즐에이아이 음성 EMR 공급 병원 (회사 발표)']])+
   h3('AI EMR 포지셔닝 맵')+fig(posMap(['병원 안 업무 자동화','병원 밖 환자 연결'],['기록 중심','AI 에이전트'],['의료진 에이전트','환자까지 잇는 에이전트','기록·청구 도구','환자 연결 도구'],[
    ['Epic Art·Emmie',.78,.9,1],['Dragon Copilot',.2,.78],['Abridge',.12,.6],['Oracle Clinical AI',.4,.72],['의사랑 AI',.28,.42,1],['퍼즐에이아이',.12,.3],['메디컬 OS',.5,.5],['오름차트 + 클레',.74,.35,1],['MyChart',.88,.55]
   ],'AI EMR 포지셔닝 맵'),'공개 자료를 바탕으로 한 필자의 해석적 배치입니다. 녹색은 이 카드에서 주목한 서비스입니다.')},
  {id:'ai-global',title:'AI 접목 · 해외',html:table(['서비스','누구의 일을','핵심 AI','눈여겨볼 점'],[
    ['Epic Art','의사·간호사','앰비언트 기록(Chart with Art), 진료 전 요약, 누락 검사 탐지','2026년 2월 기본 탑재. 외래 → 병동 간호 → 가정간호로 확대'],
    ['Epic Emmie','환자','MyChart 안 디지털 컨시어지: 결과 설명, 진료 준비, 일정·청구 문의','Rush, 청구 관련 메시지 58% 감소(2차 인용)'],
    ['Epic Penny','원무·청구','청구 코딩·거부 관리 자동화','도입 기관에서 청구 거부 20~33% 감소(회사·2차 인용)'],
    ['Epic Agent Factory','병원 IT','병원이 직접 에이전트를 만드는 도구','HIMSS26 발표, 2027년 본격 확대 예정'],
    ['Epic Cosmos 모델','연구·의사결정','환자 1억 1,800만 명 데이터로 학습한 의료 기반 모델(CoMET/Curiosity)','EHR 안 출시는 2027년 예상'],
    ['MS Dragon Copilot','의사·간호사·영상의학','앰비언트 기록 + 정보 탐색 + 작업 자동화','Epic·athenahealth·MEDITECH 안에서 동작, 10개국 제공'],
    ['Abridge','의사','독립 앰비언트 스크라이브','2025년 6월 기업가치 약 53억 달러. EHR 내장 기능과 경쟁'],
    ['Oracle Clinical AI Agent','의사','30개+ 전문과 문서화 지원','차세대 EHR은 외래부터, 급성기는 2026년 예정']
   ],'수치 대부분은 벤더 발표 또는 2차 인용입니다.')},
  {id:'ai-korea',title:'AI 접목 · 국내',html:pillars([
    ['GC메디아이','의사랑 AI',['실시간 음성인식으로 대화를 기록하고 <b>SOAP 노트 자동 생성</b>','과거 기록·검사 요약, 청구 코드·처방 추천','환자 앱 똑닥 연동, 2027년 3월 클라우드 EMR 전환 추진']],
    ['이지케어텍','메디컬 OS',['상급종합병원 HIS·EMR 기반','외부 AI·솔루션을 HIS에 연결하는 <b>AI 오케스트레이션</b>','2024년 퍼즐에이아이와 음성인식 EMR 협력']],
    ['퍼즐에이아이','CL Note',['의사 음성 실시간 요약·구조화(퍼즐Gen), 간호 음성 기록(퍼즐ENR)','환자가 음성으로 요청하는 스마트콜벨','대웅제약과 공급 계약(2026.04), 국내 200여 병원']],
    ['세나클','오름차트 + 네이버',['의원급 클라우드 EMR, 반복 업무 자동화가 강점','네이버 클라우드·AI 결합으로 기록 작성·환자 요약 방향','환자 앱 클레로 병원 밖과 연결']]
   ])+callout('체크','허가와 책임',`국내 의료 AI는 <b>의료기기 소프트웨어 허가</b> 이슈가 함께 따라옵니다. 의사랑 AI도 허가 절차가 진행 중이라는 보도가 있었습니다. AI가 쓴 기록을 <b>누가 확인하고 확정하는지</b>가 화면에 드러나야 합니다.`)},
  {id:'outside',title:'병원 밖 · 진료 이후',html:lead('환자 입장에서 병원 경험은 <b>진료 전 → 진료 중 → 진료 후</b>로 이어집니다. 지금은 진료 중(기록)에 AI가 몰려 있고, 진료 후는 상대적으로 비어 있습니다.')+
   table(['단계','해외','국내'],[
    ['진료 전','Emmie: 검사 결과 질문, 진료 준비, 일정 안내','네이버 증상체크·예약, 스마트서베이 사전문진, 오름차트 태블릿 문진'],
    ['진료 중','Chart with Art · Dragon Copilot 앰비언트 기록','의사랑 AI · 퍼즐Gen 음성 차팅'],
    ['진료 후','Emmie 결과 설명·청구 문의, MyChart Central(여러 병원 단일 로그인)','클레 검사결과·후속 안내, 스마트콜벨(입원), 똑닥 연동'],
    ['빈칸','MyChart 밖 경험, 환자 자율성 지원 부족(비판)','결과 해석, 복약 순응, 재방문 판단, 보호자 공유가 약함']
   ])+
   h3('진료 이후에서 찾을 UX 기회')+
   pillars([
    ['해석','결과를 내 말로',['검사 수치를 쉬운 언어와 정상 범위로 설명','다음 행동(재검·생활 습관·문의)을 한 문장으로 제시']],
    ['지속','복약과 생활 관리',['처방과 연동된 복약 알림, 빠뜨렸을 때의 안내','웨어러블·가정 측정값과 진료 기록을 한 타임라인에']],
    ['판단','다시 가야 할까?',['증상 변화에 따른 재방문 기준을 미리 안내','병원 메시지·전화 대신 앱에서 간단히 문의']],
    ['함께','보호자와 나누기',['아이·부모 기록을 권한 범위 안에서 공유','공유 범위와 동의를 한눈에 확인']]
   ])},
  {id:'video',title:'영상으로 보기',html:videos([
   ['O3vPl7_4ZAQ','Epic\'s Approach to AI with Sean McGunigal','Healthcare IT Today','Epic AI 전략'],
   ['Qy55nkTO__Y','Empowering care teams with Dragon Copilot','Microsoft Events','앰비언트 AI'],
   ['S1rvllJKOGQ','KIMES 2025 부스투어 - 유비케어 의사랑','메디게이트뉴스','국내 EMR']
  ])},
  {id:'interview',title:'면접 체크포인트',html:qa([
   ['앰비언트 AI 화면에서 가장 중요한 UX는?','AI가 쓴 초안을 <b>빠르게 검토·수정·확정</b>하는 흐름. 근거가 된 대화 구간을 하이라이트하고, 확정 전후 상태와 책임 주체를 명확히 보여줘야 한다.'],
   ['Epic이 에이전트를 다 품으면 다른 회사의 자리는?','대형병원은 EHR 내장 쪽으로 가지만, <b>의원급·병원 밖·다중 EHR 연결</b>은 여전히 빈자리다. 네이버는 오름차트(의원)와 예약·결제(병원 밖)로 이 틈을 잡을 수 있다.'],
   ['진료 이후 경험을 하나 설계한다면?','검사결과 도착 → 쉬운 해석 → 다음 행동 제안 → 필요 시 재예약까지 한 흐름. <b>불안을 줄이는 언어</b>와 <b>의료진 확인 여부 표시</b>가 핵심.'],
   ['국내 의료 AI UX에서 특히 조심할 점은?','의료기기 SW 허가, 민감정보 동의, 진단처럼 보이는 표현. <b>“참고용 · 의료진 확인 필요”</b>를 형식이 아니라 흐름으로 녹이는 것이 중요하다.']
  ])+me(['<b>복잡한 정책·예외 구조화</b> 경험 → 청구·보험 연동, 진료 전후 단계 설계','의료진 인터뷰로 <b>진료 시나리오</b>를 만든 경험 → 앰비언트 기록 검토 화면','<b>AI 서비스 출시</b> 경험 → AI 초안의 신뢰·수정 UX'])},
  {id:'source',title:'참고 자료',html:sources(S2,NOTE)}
 ]
};

/* =====================================================================
   3. 빅테크 헬스케어 — Apple · Google · Microsoft
   ===================================================================== */
const S3=[
 ['Google Rebrands Fitbit to Google Health as Gemini AI Coach Invades Apple Watch','NBC Palm Springs','2026.05.08','https://www.nbcpalmsprings.com/2026/05/08/google-rebrands-fitbit-to-google-health-as-gemini-ai-coach-invades-apple-watch'],
 ['The Health AI Wars: Apple, Google, Samsung, and OpenAI Are Racing to Coach You','Sahha','2026.06.25','https://sahha.ai/blog/health-ai-coach-wars-2026/'],
 ['Apple Quietly Killed Its AI Health Coach','Ness','2026.10.06','https://ness-health.com/blog/apple-ai-health-coach-killed'],
 ['Apple might launch Health+ with AI doctor','Cult of Mac','2025.10.10','https://www.cultofmac.com/news/apple-may-launch-health-with-ai-doctor-food-tracking-more'],
 ['Apple used AI models to discover Apple Watch\'s new Hypertension Notification feature','MacDailyNews','2025.09.19','https://macdailynews.com/2025/09/19/apple-used-ai-models-to-discover-apple-watchs-new-hypertension-notification-feature/'],
 ['Microsoft Dragon Copilot','Microsoft','2026','https://www.microsoft.com/en-us/health-solutions/clinical-workflow/dragon-copilot'],
 ['Epic vs Cerner: A Technical Comparison of AI in EHRs','IntuitionLabs','2026.08.09','https://intuitionlabs.ai/articles/epic-vs-cerner-ai-comparison'],
 ['네이버, 주총서 AI 기반 헬스케어 서비스 확장 예고','메디게이트뉴스','2026.03.23','https://www.medigatenews.com/news/3518931']
];
function stackSvg(){const W=960,H=420;let b=arrowDefs;const rows=[['임상 워크플로','의료진의 기록·업무를 줄인다',[['Microsoft','Dragon Copilot',1]]],['임상급 신호 · 검증','규제를 거친 감지·알림',[['Apple','고혈압 알림',1],['Samsung','Vitals 알림',0]]],['웰니스 코치','대화형 AI가 생활을 코칭',[['Google','Gemini 헬스 코치',1],['OpenAI','ChatGPT Health',0],['Apple','Workout Buddy',0]]]];
 rows.forEach(([t,s,chips],i)=>{const y=30+i*124;b+=box(150,y,770,104,22,i===0?'d-mint':'d-soft');b+=T(176,y+44,t,'font-size="19" font-weight="700" class="d-ink"')+T(176,y+72,s,'font-size="15" class="d-muted"');
  let x=420;chips.forEach(([c,p,hl])=>{const w=Math.max(tw(c,14),tw(p,15))+36;b+=box(x,y+20,w,64,16,hl?'d-green':'d-card')+T(x+w/2,y+46,c,`font-size="15" text-anchor="middle" class="${hl?'d-onGreen':'d-muted'}" font-weight="700"`)+T(x+w/2,y+68,p,`font-size="15" text-anchor="middle" font-weight="700" class="${hl?'d-onGreen':'d-ink'}"`);x+=w+12})});
 b+=`<line x1="80" y1="380" x2="80" y2="40" class="d-axis" marker-end="url(#nh-arr)"/>`+T(60,380,'접근성 · 규모',`font-size="15" class="d-muted" transform="rotate(-90 60 380)"`)+T(60,40,'신뢰 · 규제 요구','font-size="15" font-weight="700" class="d-ink" text-anchor="end" transform="rotate(-90 60 40)"');
 return svg(W,H,b,'빅테크 헬스케어 AI 레이어 다이어그램')}
NH['bigtech-health']={
 intro:'빅테크의 헬스케어는 <b>소비자 코치</b>와 <b>병원 워크플로</b> 두 갈래로 나뉩니다. 누가 어디서 신뢰를 쌓는지 보면 전략이 보입니다.',
 summary:[
  '2026년 빅테크 헬스케어의 키워드는 <b>‘AI 코치’와 ‘임상 워크플로’</b>다. 소비자는 코치, 병원은 기록 자동화로 갈린다.',
  '구글은 <b>2026년 5월 Fitbit 앱을 ‘Google Health’</b>로 바꾸고 <b>Gemini 코치(월 $9.99)</b>를 냈으며, 애플워치 사용자에게도 문을 열었다.',
  '애플은 <b>AI 코치(Project Mulberry)를 축소</b>하는 대신 <b>고혈압 알림</b>처럼 센서와 임상 검증을 거친 기능에 집중한다.',
  '마이크로소프트는 <b>Dragon Copilot</b>으로 의사·간호사·영상의학 기록을 자동화하며 <b>Epic 등 EHR 안</b>으로 들어가 있다.',
  'OpenAI(<b>ChatGPT Health</b>)까지 합류하며 승부는 모델보다 <b>데이터 연결과 신뢰</b>에서 갈린다.'
 ],
 sources:S3,
 sections:[
  {id:'overview',title:'한눈에 보기',html:lead('세 회사는 같은 ‘헬스케어 AI’를 말하지만 <b>서 있는 층</b>이 다릅니다. 위로 갈수록 신뢰와 규제 요구가 크고, 아래로 갈수록 사용자 규모가 큽니다.')+
   stats([['$9.99','/월','Google Health Premium (Gemini 코치)'],['150','+','Apple Watch 고혈압 알림 제공 국가 (2025.09 발표)'],['10','개국','Dragon Copilot 의사용 제공 국가'],['2026. 01.','','OpenAI ChatGPT Health 발표']])+
   h3('빅테크 헬스케어 AI 레이어')+fig(stackSvg(),'공개 자료를 바탕으로 재구성한 해석적 다이어그램입니다.')},
  {id:'services',title:'서비스 분석',html:table(['구분','Apple','Google','Microsoft'],[
    ['핵심 무대','Apple Watch · Health 앱','Google Health 앱(옛 Fitbit) · Fitbit Air','Dragon Copilot · 병원 EHR'],
    ['2026 주요 변화','WWDC에서 Health 앱 재설계, AI 코치는 빠짐. AI Insights·Readiness 점수 테스트(단일 출처)','5월 Fitbit → Google Health 리브랜딩, Gemini 코치, $99 화면 없는 Fitbit Air','의사·간호사·영상의학 대상으로 확장, 병원별 AI 에이전트 구축'],
    ['데이터 접점','워치 센서(광학 심장 센서 등)와 HealthKit','HealthKit·Health Connect 모두 연동(애플워치 사용자 포함)','EHR 안 진료 대화·기록'],
    ['수익 모델','기기 판매 중심','구독(월 $9.99 / 연 $99)','병원 대상 B2B'],
    ['신뢰 장치','FDA 승인 고혈압 알림, 대규모 임상 검증','코치형이라 규제 기능은 확인되지 않음','EHR 파트너(Epic·athenahealth·MEDITECH) 내장']
   ],'Apple의 2026년 하반기 기능은 일부 단일 출처라 확인이 필요합니다.')},
  {id:'ai',title:'AI 접목 분석',html:pillars([
    ['APPLE','AI로 ‘신호’를 찾는다',['고혈압 알림: 10만 명+ 데이터로 학습, 2,000명 임상으로 검증, 30일 단위 판단','혈압을 직접 재지 않고 알림 후 커프 측정·의사 상담으로 연결','AI 코치는 축소, 기능은 Health 앱에 나눠 탑재하는 방향']],
    ['GOOGLE','AI가 ‘코치’가 된다',['Gemini가 수면·영양·운동을 종합해 대화로 답하고 주간 계획 생성','“운동선수처럼 영양사·수면 코치·트레이너 팀을” 개인에게','경쟁사 기기까지 품는 개방 전략']],
    ['MICROSOFT','AI가 ‘기록’을 대신한다',['진료 대화를 듣고 기록을 작성하는 앰비언트 AI','정보 탐색·작업 자동화까지 묶은 임상 비서','간호사는 Epic Rover 등 모바일 EHR에서 사용']],
    ['+ OPENAI','대화창이 건강 입구로',['2026년 1월 ChatGPT Health 발표, 7월 미국 전체 제공','Apple Health·환자 포털·웰니스 앱 연결','매주 수억 건의 건강 질문(출처마다 수치 다름)']]
   ])},
  {id:'insight',title:'네이버에 주는 시사점',html:pillars([
    ['개방','코치는 연결이 승부',['구글은 애플워치까지 품었다','네이버도 인바디·삼성헬스 등 외부 데이터 연동이 건강 에이전트의 기본기']],
    ['신뢰','검증된 한 가지가 열 가지 코칭보다 강하다',['애플은 규제 기능으로 신뢰를 쌓는다','건강검진 결과 분석처럼 근거가 분명한 기능부터']],
    ['현장','임상은 EHR 안에서',['MS는 EHR 안에 들어가 있다','네이버는 오름차트 안에서 AI 기록·요약을 시작할 수 있다']],
    ['한국형','찾기·예약·결제까지',['빅테크에 없는 강점은 검색·지도·예약·Npay','코칭에서 끝나지 않고 실제 병원 방문까지 잇는 흐름']]
   ])+callout('정리','한 문장으로',`빅테크가 <b>기기(Apple)·데이터(Google)·병원(Microsoft)</b>을 쥐고 있다면, 네이버의 무기는 <b>생활 서비스와 진료 현장을 잇는 연결</b>입니다.`)},
  {id:'video',title:'영상으로 보기',html:videos([
   ['B_2KfMsv2Lw','Google rebrands Fitbit app as Google Health with new AI coach','CBS Texas','Google Health 코치'],
   ['Uyjd14Phwo4','Dragon Copilot Demo · Clinical AI Assistant for Healthcare','Total Voice Technologies','Dragon Copilot 데모']
  ])},
  {id:'interview',title:'면접 체크포인트',html:qa([
   ['구글은 왜 애플워치 사용자에게 문을 열었을까?','웨어러블 점유율이 뒤처진 상황에서 <b>기기보다 코치(소프트웨어)와 구독</b>으로 승부하기 위해서. 데이터가 많을수록 코치가 좋아진다.'],
   ['AI 헬스 코치 UX에서 가장 어려운 점은?','의료 조언과 생활 코칭의 <b>경계</b>, 틀린 답의 위험, 그리고 <b>꾸준히 쓰게 만드는 동기</b>. 근거 표시와 “의료진 상담” 전환 지점 설계가 핵심.'],
   ['애플이 AI 코치를 줄인 이유를 어떻게 보나?','브랜드 신뢰를 지키려면 <b>검증 가능한 기능</b>부터 내야 한다는 판단으로 해석된다. 헬스케어에서는 속도보다 신뢰가 우선이다.'],
   ['네이버가 빅테크와 다르게 갈 길은?','코칭에서 멈추지 않고 <b>찾기 → 예약 → 진료(오름차트) → 결제(Npay) → 관리</b>까지 실제 행동을 잇는 것.']
  ])+me(['<b>AI 서비스 출시</b> 경험 → 코칭·에이전트 대화 UX 설계','<b>규제·정책이 복잡한 서비스</b> 설계 경험 → 의료 조언 경계·고지 흐름','의료진 인터뷰 기반 <b>진료 시나리오</b> 경험 → 임상 워크플로 AI 이해'])},
  {id:'source',title:'참고 자료',html:sources(S3,NOTE)}
 ]
};

/* =====================================================================
   4. 개인 AI 에이전트 2026
   ===================================================================== */
const S4=[
 ['Always-On AI Agents: Dots vs Muse vs Grok Bot (2026 Guide)','Taskade','2026.11.07','https://www.taskade.com/blog/always-on-ai-agents'],
 ['AI Assistants 2026: Meta Muse, OpenAI dots, Claude Duet, Grok Bot and Gemini Spark Compared','wetheflywheel','2026.11.05','https://wetheflywheel.com/en/ai-assistants/'],
 ['Best Personal AI Agent 2026: Grok Bot vs Meta Muse vs OpenAI Dots vs Gemini Spark','TechVerdict','2026.10.22','https://www.techverdict.io/articles/best-personal-ai-agents-2026'],
 ['Proactive AI Agents Compared','Pinggy','2026.10.31','https://pinggy.io/blog/proactive_ai_agents_compared/'],
 ['xAI Wants In on the Enterprise With Grok Bot','VKTR','2026.08.12','https://www.vktr.com/collaboration-productivity/xai-launches-grok-bot-ai-agents-in-beta/'],
 ['Pickle, an AI agent app from a Silicon Valley startup, shakes up Korea\'s tech scene','헤럴드경제','2026.10.22','https://biz.heraldcorp.com/article/10911808'],
 ['Hark releases an AI personal assistant with a focus on privacy','TechCrunch','2026.10.06','https://techcrunch.com/2026/10/06/hark-releases-an-ai-personal-assistant-with-a-focus-on-privacy/'],
 ['Cue by Manus: Personal agents with identity','Product Hunt','2026','https://www.producthunt.com/products/cue-by-manus'],
 ['[AI 에이전트 시대 성큼] ①답변 넘어 먼저 제안하고 일도 하는 AI 비서','메트로신문','2026.11.10','https://www.metroseoul.co.kr/article/20261110500302'],
 ['Vooy Says AI Agents Are Moving Beyond Answers to Action','Bloomingbit','2026.09.28','https://en.bloomingbit.io/feed/news/121127'],
 ['vooy - App Store','App Store','2026','https://apps.apple.com/kr/app/vooy/id6800661620'],
 ['"불법 빼고 다해준다" 사람 살린 AI 비서 \'똑비\'','한국일보','2025.12.12','https://hankookilbo.com/News/Read/A2025121117040002257'],
 ['똑비, AI 시니어 비서 넘어 여행 큐레이션 플랫폼으로','머니투데이','2026.03.23','https://www.mt.co.kr/future/2026/03/23/2026032308420740562'],
 ['x lance xchat sa nouvelle messagerie','Siècle Digital','2026.04.28','https://siecledigital.fr/2026/04/28/x-lance-xchat-sa-nouvelle-messagerie-taillee-pour-concurrencer-whatsapp/'],
 ['네이버 최수연 "올해 AI 에이전트 전면 도입…연내 건강 에이전트"','메디게이트뉴스','2026.03.23','https://www.medigatenews.com/news/3518931']
];
NH['personal-agents']={
 intro:'2026년 AI 비서는 <b>대답하는 챗봇</b>에서 <b>대신 일하는 에이전트</b>로 넘어갔습니다. 헬스케어의 다음 입구도 여기서 열립니다.',
 summary:[
  '2026년 AI 비서는 <b>‘대답’에서 ‘대신 실행’</b>으로 넘어갔다. 클라우드 컴퓨터에서 <b>사용자가 자리를 비워도</b> 일한다.',
  '8월 <b>xAI Grok Bot</b>, 9월 <b>Meta Muse</b>(무료)·<b>OpenAI dots</b>(Pro $100), 10월 <b>Claude Duet</b>까지 빅테크가 일제히 상시형 에이전트를 냈다.',
  '공통 문법은 <b>‘승인 게이트’</b>다. 결제·발송·서명·삭제 전에는 반드시 사용자에게 묻는다.',
  '한국에서는 <b>피클</b>(정부24·KTX·병원 예약), <b>vooy</b>, 시니어 비서 <b>똑비</b>처럼 로컬 서비스와 붙은 에이전트가 뜬다.',
  '헬스케어로 오면 <b>예약·문진·복약 관리를 대행하는 건강 에이전트</b>가 다음 격전지다(네이버 연내 건강 에이전트 예고).'
 ],
 sources:S4,
 sections:[
  {id:'overview',title:'한눈에 보기',html:lead('에이전트를 볼 때는 <b>언제 움직이는가</b>(요청할 때 vs 먼저)와 <b>어디서 강한가</b>(글로벌 범용 vs 로컬·특화) 두 축이 가장 유용합니다.')+
   stats([['1,000','만+','Meta Muse 설정 사용자, 출시 6주 (미국·캐나다)'],['4,000','+','OpenAI dots 연결 앱 플러그인'],['17','위','피클, 한국 앱스토어 소셜 무료 순위 (2026.10.22)'],['4','만','똑비 누적 회원 (2026.03)']])+
   h3('개인 AI 에이전트 포지셔닝 맵')+fig(posMap(['요청할 때 움직임','먼저 움직임 (상시·선제)'],['글로벌 범용','로컬 · 특화'],['로컬 도우미','로컬 상시 비서','범용 어시스턴트','범용 상시 에이전트'],[
    ['Meta Muse',.66,.18,1],['OpenAI dots',.82,.12,1],['Grok Bot',.9,.28,1],['Claude Duet',.74,.36],['Gemini Spark',.56,.3],['Hark Pro',.62,.46],['Cue',.88,.52],['피클',.72,.84,1],['vooy',.44,.7],['똑비',.22,.92],['말랑AI',.14,.62]
   ],'개인 AI 에이전트 포지셔닝 맵'),'공개 자료를 바탕으로 한 필자의 해석적 배치입니다.')},
  {id:'trend',title:'트렌드 분석',html:pillars([
    ['ALWAYS-ON','먼저 움직이는 비서',['아침 브리프, 몇 시간마다 계정 확인, 답 없는 대화 챙기기','일정·이벤트(웹훅)·스스로 다시 확인하는 3가지 작동 방식']],
    ['CLOUD PC','나 대신 쓰는 컴퓨터',['dots는 전용 컴퓨터, Muse는 사용자별 VM, Grok Bot은 공유 컴퓨터','기기를 꺼도 예약·구매·서류 작업이 계속됨']],
    ['APPROVAL','승인 게이트가 기본값',['발송·결제·서명·삭제 전 사용자 확인','일회용 카드 결제, 비밀번호는 모델 밖에서 입력']],
    ['MEMORY','기억은 어디에 둘까',['벤더 클라우드, 에이전트 단위, 기기 로컬 등 제각각','삭제 방식도 “forget” 명령, 에이전트 삭제 등으로 다름']],
    ['MULTI','에이전트끼리 대화',['Grok Bot 팀, 피클 에이전트 간 약속 잡기, Cue 그룹 채팅','사용자는 두 에이전트의 대화를 볼 수 있음']],
    ['LOCAL','로컬 서비스가 경쟁력',['피클: 정부24·홈택스·KTX·병원 예약','똑비: AI가 못 하면 사람 상담원이 이어받는 하이브리드']]
   ])},
  {id:'compare',title:'피클 · Muse · Grok · dots 비교',html:table(['구분','피클 (Pickle)','Meta Muse','Grok Bot (SpaceX·xAI)','OpenAI dots'],[
    ['공개','2026 (한국인 창업 실리콘밸리 스타트업)','2026.09.08','2026.08.11 베타','2026.09.29 DevDay'],
    ['가격','확인 필요','무료 · Power $20 · Max $100','The X Subscription 포함 (Premium $30~)','ChatGPT Pro $100~'],
    ['채널','모바일 앱, 네이버·카카오톡 연동','독립 앱 · WhatsApp · 웹','데스크톱 · iOS (출처마다 다름)','ChatGPT · Slack · Teams · 음성'],
    ['실행 방식','자체 클라우드 브라우저','사용자별 격리 VM + 승인 에이전트 Sentinel','계정당 영구 클라우드 컴퓨터, 여러 Bot이 공유','dot마다 클라우드 컴퓨터·브라우저'],
    ['대표 작업','통신 요금 변경·환불, 쿠팡 주문, 식당·병원 예약, KTX 취소표 감시','예약·양식·청구서·쇼핑','병렬 Bot, 루틴 저장, Slack·GitHub 이벤트 대응','4,000+ 앱 연결, 예약 작업, 업무 위임'],
    ['안전장치','결제·예약은 최종 승인','일회용 카드, forget 명령, 감사 기록','발송·구매·삭제 전 승인, 결제정보 기록 안 남김','허용·승인·차단 규칙, 활동 보기'],
    ['한국 이용','이용 가능 (앱스토어 순위권)','공식 미출시 (우회 사용 보도)','X 구독으로 이용','Pro는 EEA·영국 제외, 한국 이용 가능']
   ],'피클은 단일 기사 기반이라 가격 등 일부 정보가 확인되지 않았습니다.')},
  {id:'others',title:'그 외 주목할 AI 비서',html:pillars([
    ['KR','vooy (부이)',['메신저 대화로 검색·비교·예약을 돕는 “반려 에이전트”','2026.09 EastPoint Seoul 공개, 초대제 베타, iPhone 앱 1.5에서 음성 대화 추가']],
    ['KR','똑비',['5060 액티브 시니어 비서, 검색·추천·구매·예약 대행','AI가 못 하면 상담원이 이어받는 하이브리드, 상담원 이용 월 9,900원','보험사가 이용료를 내는 B2B(메트라이프·삼성화재), 2026년 여행 큐레이션 확장']],
    ['KR','말랑AI',['음성 요청을 받아 앱 화면을 읽고 버튼을 대신 누르는 실행형 비서','세부 정보는 공개 자료가 적어 확인 필요']],
    ['US','Claude Duet',['2026.10.21 리서치 프리뷰, 미국 대기자 명단','아침 브리프, 답장 초안, 수치마다 출처 이메일·파일 표시','계좌 간 송금은 승인해도 불가, Claude Pro에 포함']],
    ['US','Hark Pro',['2026.10.06 공개, “AI용 운영체제”를 지향하는 전체 화면 홈','에이전트가 웹에서 하는 일을 작은 창으로 보여줌','광고·데이터 판매 없음 강조, 2027년 AI 기기 예정']],
    ['US','Cue',['Cue by Manus: 에이전트마다 전화번호·이메일·지갑·컴퓨터를 부여','같은 이름의 데스크톱 비서(heycue.io)도 있어 구분 필요']]
   ])+callout('확인','‘키링’은 확인되지 않음',`요청하신 목록 중 <b>‘키링’</b>은 공개 자료에서 개인 AI 비서로 확인되지 않았습니다. 정확한 서비스명이나 링크를 알려주시면 이 카드에 보강할게요.`)},
  {id:'x',title:'X의 Blue · Grok',html:lead('공개 자료에서 <b>‘X Blue’라는 이름의 에이전트 서비스는 확인되지 않았습니다.</b> 대신 X와 관련해 2026년에 확인되는 변화는 아래와 같습니다. 말씀하신 ‘Blue’가 X 구독(옛 Twitter Blue) 또는 Grok Bot을 가리키는 것이라면 이 흐름으로 보면 됩니다.')+
   timeline([
    ['2026','xAI, SpaceX 산하로','Grok을 만드는 xAI가 SpaceX 체계로 편입(보도에서는 SpaceX·xAI로 표기).'],
    ['2026.04','XChat 앱 출시','X가 독립 메신저 앱 XChat을 내며 메시지·AI 결합을 시도.'],
    ['2026.08','Grok Bot 베타','계정당 클라우드 컴퓨터에서 여러 Bot이 병렬로 일하는 상시형 에이전트.'],
    ['2026.10.12','The X Subscription에 Grok Bot 포함','Premium $30 · Super $100 · Ultra $200 구독에 에이전트를 묶음.']
   ])+callout('UX','구독 = 에이전트 번들',`X는 소셜 구독(옛 Blue)에 <b>에이전트를 묶어</b> 구독 가치를 키우는 방식입니다. 네이버 멤버십·Npay처럼 <b>기존 구독·결제에 건강 에이전트를 얹는</b> 전략과 비교해 볼 만합니다.`)},
  {id:'health',title:'헬스케어 시사점',html:pillars([
    ['대행','건강 에이전트가 할 일',['증상 정리 → 병원 추천 → 예약 → 사전문진까지 대신','검진 결과 정리, 복약·재방문 리마인드']],
    ['승인','의료 행위의 경계',['예약·결제는 승인 게이트로, 진단처럼 보이는 답은 의료진 연결로','에이전트가 한 일을 기록으로 보여주기']],
    ['시니어','AI + 사람 하이브리드',['똑비처럼 어려운 순간은 사람이 이어받는 구조','보호자와 함께 쓰는 공유·대리 기능']],
    ['신뢰','건강 데이터는 더 민감하다',['기억의 저장 위치와 삭제 방법을 쉽게 보여주기','출처 표시(Duet), 활동 기록(dots)처럼 투명성 장치']]
   ])},
  {id:'video',title:'영상으로 보기',html:videos([
   ['BvvfZKKz4Yo','I Tested OpenAI\'s Dots vs. Meta\'s Muse','Nate Herk','dots·Muse 비교'],
   ['1VO3x5HH78A','Meta Muse vs OpenAI Dots vs Grok Bot vs Hermes','Web3 Wesley','4종 비교']
  ])},
  {id:'interview',title:'면접 체크포인트',html:qa([
   ['상시형 에이전트 UX에서 가장 중요한 것은?','<b>먼저 움직일 때의 예의.</b> 언제·왜 알렸는지 설명하고, 승인 지점과 되돌리기를 분명히. 사용자가 통제권을 잃었다고 느끼면 바로 꺼진다.'],
   ['네이버 건강 에이전트가 빅테크 에이전트를 이길 지점은?','<b>한국 의료 인프라와의 연결</b>: 네이버 예약·지도·Npay·오름차트. 피클이 정부24·KTX로 뜬 것처럼 로컬 연결이 곧 경쟁력이다.'],
   ['시니어 대상 에이전트 설계 원칙은?','음성·큰 글씨·한 번에 하나의 결정, 그리고 <b>AI가 막히면 사람이 이어받는 출구</b>(똑비). 보호자 공유도 기본.'],
   ['에이전트의 기억(메모리)을 어떻게 보여줄까?','무엇을 기억하는지 목록으로 보여주고, <b>항목별 삭제</b>와 건강 정보의 별도 동의를 제공. 기억이 답에 쓰였을 때 표시.']
  ])+me(['<b>AI 전화 서비스 출시</b> 경험 → 음성·통화형 에이전트 UX','<b>복잡한 정책 구조화</b> 경험 → 승인 게이트·권한 설계','의료진·환자 인터뷰 경험 → 건강 에이전트 시나리오'])},
  {id:'source',title:'참고 자료',html:sources(S4,NOTE)}
 ]
};

/* =====================================================================
   5. 헬스케어 UX — 고려할 것과 트렌드
   ===================================================================== */
const S5=[
 ['UX Healthcare Design London 2024: Designing for Safety in Digital Health & AI','UX Healthcare (YouTube)','2024','https://www.youtube.com/watch?v=g9ku7Xane6w'],
 ['Designing Trustworthy Clinical AI','JAMA Network (YouTube)','—','https://www.youtube.com/watch?v=_GpgCINYTfg'],
 ['오름차트 기능 만족도 1위 의사 그룹은 사전심사, 비의사 그룹은 진료검색','메디게이트뉴스','2025.07.23','https://medigatenews.com/news/2334850603'],
 ['Apple used AI models to discover Apple Watch\'s new Hypertension Notification feature','MacDailyNews','2025.09.19','https://macdailynews.com/2025/09/19/apple-used-ai-models-to-discover-apple-watchs-new-hypertension-notification-feature/'],
 ['AI Assistants 2026: Meta Muse, OpenAI dots, Claude Duet…','wetheflywheel','2026.11.05','https://wetheflywheel.com/en/ai-assistants/'],
 ['"불법 빼고 다해준다" 사람 살린 AI 비서 \'똑비\'','한국일보','2025.12.12','https://hankookilbo.com/News/Read/A2025121117040002257'],
 ['Epic AI in 2026: What Epic Ships, and What You Still Have to Build','Topflight','2026.10.07','https://topflightapps.com/ideas/epic-ai/'],
 ['Microsoft Dragon Copilot','Microsoft','2026','https://www.microsoft.com/en-us/health-solutions/clinical-workflow/dragon-copilot'],
 ['유비케어, \'의사랑 AI\' 공개로 AI 진료 및 운영 자동화 시대 제시','의학신문','2026.03.25','https://www.bosa.co.kr/news/articleView.html?idxno=3001465'],
 ['Google Rebrands Fitbit to Google Health as Gemini AI Coach Invades Apple Watch','NBC Palm Springs','2026.05.08','https://www.nbcpalmsprings.com/2026/05/08/google-rebrands-fitbit-to-google-health-as-gemini-ai-coach-invades-apple-watch']
];
function trustSvg(){const W=960,H=430;let b='';const L=[['관계','공감 · 지속 · 함께 쓰기','보호자 공유, 습관이 되는 리듬'],['통제','승인 · 되돌리기 · 권한','결제·공유·AI 반영 전 확인'],['이해','쉬운 언어 · 설명','수치의 의미와 다음 행동'],['정확','근거 · 출처 · 검증','AI 답의 출처, 의료진 확인 표시'],['안전','오류 방지 · 위험 신호','용량·단위·알림 피로 관리']];
 const cx=290,hw=i=>80+i*40;L.forEach(([k,t,s],i)=>{const y=26+i*78;b+=`<path d="M${cx-hw(i)} ${y} H${cx+hw(i)} L${cx+hw(i+1)} ${y+70} H${cx-hw(i+1)} Z" class="${i===4?'d-green':i===0?'d-mint':'d-soft'}"/>`;
  b+=T(cx,y+32,k,`font-size="20" font-weight="700" text-anchor="middle" class="${i===4?'d-onGreen':'d-ink'}"`)+T(cx,y+56,t,`font-size="15" text-anchor="middle" class="${i===4?'d-onGreen':'d-muted'}"`);
  b+=`<line x1="${cx+hw(i+.5)+14}" y1="${y+36}" x2="600" y2="${y+36}" class="d-line" stroke-dasharray="3 5"/>`+T(614,y+42,s,'font-size="16" class="d-ink"')});
 b+=T(290,H-4,'아래층이 무너지면 위층의 좋은 경험도 신뢰받지 못합니다','font-size="15" text-anchor="middle" class="d-muted"');
 return svg(W,H,b,'헬스케어 UX 신뢰 피라미드')}
NH['healthcare-ux']={
 intro:'헬스케어 UX는 <b>편리함보다 신뢰</b>를 먼저 설계합니다. 틀리지 않는 구조 위에 이해와 통제, 그리고 관계가 쌓입니다.',
 summary:[
  '헬스케어 UX의 첫 원칙은 <b>‘안전’</b>이다. 예쁜 화면보다 <b>틀린 정보를 주지 않는 구조</b>가 먼저다.',
  '사용자가 한 명이 아니다. <b>환자·보호자·의사·간호사·원무 직원</b>의 목표가 달라 역할별 설계가 필요하다.',
  'AI가 들어오면 <b>설명·검토·책임</b>이 UX 요소가 된다. 출처 표시, 사람의 최종 확인, 되돌리기가 기본값이다.',
  '의료진 UX는 클릭 수가 아니라 <b>‘진료 흐름을 끊지 않는가’</b>로 평가받는다. 앰비언트 AI가 뜬 이유다.',
  '트렌드는 <b>선제적 케어·건강 에이전트·병원 밖 연속 케어</b>로 간다. 경쟁력은 <b>신뢰를 쌓는 작은 경험의 반복</b>이다.'
 ],
 sources:S5,
 sections:[
  {id:'overview',title:'한눈에 보기',html:lead('헬스케어 UX를 한 장으로 줄이면 <b>신뢰 피라미드</b>입니다. 안전과 정확이 받쳐 주지 않으면, 이해하기 쉬운 화면도 의미가 없습니다.')+
   fig(trustSvg(),'필자가 정리한 헬스케어 UX 신뢰 구조입니다.')+
   h3('헬스케어 서비스의 사용자들')+journey([['환자','불안 속에서 빠른 답과 다음 행동'],['보호자','아이·부모를 대신 관리하고 공유'],['의사','진료 흐름 유지, 기록 부담 감소'],['간호사','병동 업무·기록, 환자 요청 대응'],['원무 직원','접수·예약·청구를 빠르고 정확하게'],['병원 운영','효율·수익·규제 준수']])},
  {id:'consider',title:'고려해야 하는 부분',html:pillars([
    ['SAFETY','안전 · 오류 방지',['용량·단위·날짜를 오해 없이 표기, 위험한 행동엔 확인 단계','중요 알림과 일반 알림을 구분해 <b>알림 피로</b> 줄이기']],
    ['RULES','규제 · 개인정보',['의료기기 SW 허가, 의료법상 진단·처방 경계','민감정보는 목적별로 <b>분리 동의</b>, 공유 범위 시각화']],
    ['ROLES','역할별 사용자',['같은 EMR에서도 의사는 청구 사전심사, 직원은 진료검색에 만족(오름차트 설문)','역할별 홈·단축 동선·권한 설계']],
    ['ACCESS','접근성 · 시니어',['큰 글씨·고대비·음성 입력, 한 화면 한 결정','막힐 때 사람에게 넘기는 출구(똑비의 하이브리드)']],
    ['AI TRUST','AI 신뢰',['답의 출처 표시(Claude Duet), 확신도와 한계 안내','AI 초안은 <b>검토 후 반영</b>, 확정 주체 명시']],
    ['EMOTION','감정 · 맥락',['검사 결과를 기다리는 불안, 나쁜 소식을 전하는 언어','의학 용어를 쉬운 말과 정상 범위로 번역']]
   ])+
   h3('화면별 체크리스트')+
   table(['화면','체크 질문','예시'],[
    ['검사 결과','이 숫자가 좋은지 나쁜지, 다음에 뭘 해야 하는지 바로 보이나?','정상 범위 막대 + “다음 진료 때 상담” 한 줄'],
    ['AI 요약 · 답변','근거가 보이나? 의료진이 확인했는지 구분되나?','출처 링크, “의료진 확인 전” 배지'],
    ['예약 · 결제','되돌릴 수 있나? 비용과 취소 규정이 먼저 보이나?','결제 전 요약, 취소 가능 시간 표시'],
    ['알림','지금 꼭 알아야 하는 정보인가?','복약·검사 결과만 푸시, 나머지는 피드'],
    ['보호자 공유','누가 무엇을 보는지 한눈에 보이나?','공유 대상·항목 토글, 언제든 해제'],
    ['오류 · 장애','실패했을 때 다음 행동을 알려주나?','“병원에 전화하기” 같은 대체 경로']
   ])},
  {id:'trend',title:'미래 · 트렌드 인사이트',html:pillars([
    ['01','앰비언트에서 에이전트로',['기록을 대신 쓰는 AI(Dragon Copilot·의사랑 AI)에서 일을 처리하는 에이전트(Epic Art·Penny)로','UX 질문: AI가 한 일을 의료진이 어떻게 빠르게 검토할까?']],
    ['02','건강 에이전트',['증상 → 추천 → 예약 → 방문을 잇는 대행(네이버 건강 에이전트 예고)','UX 질문: 어디까지 대신하고 어디서 사람에게 넘길까?']],
    ['03','선제적 케어',['웨어러블이 먼저 위험 신호를 알림(Apple 고혈압 알림)','UX 질문: 겁주지 않고 행동하게 만드는 알림은?']],
    ['04','병원 밖 연속 케어',['진료 후 결과 해석·복약·재방문까지 이어지는 경험','UX 질문: 병원과 집의 기록을 한 타임라인으로?']],
    ['05','개방과 상호운용',['구글은 애플워치까지 품었다, 데이터 연결이 경쟁력','UX 질문: 연결 설정과 권한을 쉽게 이해시키려면?']],
    ['06','신뢰 디자인',['승인 게이트·출처 표시·활동 기록이 새 표준','UX 질문: 투명함을 피로하지 않게 보여주려면?']]
   ])+callout('정리','면접에서 한 문장으로',`“헬스케어 UX는 <b>틀리지 않게, 이해되게, 통제할 수 있게, 그리고 계속 함께하게</b> 만드는 일입니다.”`)},
  {id:'video',title:'영상으로 보기',html:videos([
   ['g9ku7Xane6w','Designing for Safety in Digital Health & AI','UX Healthcare','UX Healthcare London 2024'],
   ['_GpgCINYTfg','Designing Trustworthy Clinical AI','JAMA Network','임상 AI 신뢰']
  ])},
  {id:'interview',title:'면접 체크포인트',html:qa([
   ['헬스케어 UX가 일반 서비스 UX와 다른 점은?','실수의 비용이 크고, 사용자가 여럿이며, 규제가 있다. 그래서 <b>전환율보다 안전·신뢰</b>가 첫 지표가 된다.'],
   ['AI 기능의 신뢰를 화면에서 어떻게 만드나?','출처와 근거, AI가 한 일의 기록, <b>사람의 최종 확인 지점</b>, 되돌리기. 그리고 한계를 솔직하게 알리는 문구.'],
   ['의료진 대상 리서치는 어떻게 하나?','진료실 관찰·섀도잉으로 <b>실제 흐름과 예외</b>를 보고, 인터뷰로 이유를 묻는다. 바쁜 의료진을 위해 짧고 여러 번.'],
   ['네이버 헬스케어에 하나를 제안한다면?','검진 결과 도착부터 해석·상담 예약·관리까지 잇는 <b>“결과 이후” 경험</b>. 네이버의 연결 강점이 가장 잘 드러나는 지점이다.']
  ])+me(['<b>정책과 예외가 많은 서비스</b>를 구조화한 경험 → 의료 규제·예외 흐름 설계','의료진 인터뷰·<b>진료 시나리오</b> 설계 경험 → 역할별 사용자 이해','<b>AI 서비스 출시</b> 경험 → AI 신뢰 UX'])},
  {id:'source',title:'참고 자료',html:sources(S5,NOTE)}
 ]
};

/* =====================================================================
   6. 국내 디지털 헬스케어 제도 지도
   ===================================================================== */
const S6=[
 ['비대면진료 의료법, 정부 공포 초읽기…내년 12월 시행','데일리팜','2025.12.23','https://www.dailypharm.com/user/news/334199'],
 ['비대면진료 12월 24일 제도화…초진은 같은 시·도, 처방 7일','교육포커스','2026.10.20','https://www.edu-focus.com/news/534402'],
 ['비대면 진료 2026년 12월 24일 정식 시행…초진·재진 기준','위닥스','2026.09.17','https://widocs.com/news/%EB%B9%84%EB%8C%80%EB%A9%B4-%EC%A7%84%EB%A3%8C-2026%EB%85%84-12%EC%9B%94-24%EC%9D%BC-%EC%A0%95%EC%8B%9D-%EC%8B%9C%ED%96%89%EC%B4%88%EC%A7%84%C2%B7%EC%9E%AC%EC%A7%84-%EA%B8%B0%EC%A4%80/'],
 ['실손24 연계율 47%…미참여 병원·약국·EMR 과태료 추진','데일리팜','2026.09.30','https://dailypharm.com/user/news/342946'],
 ['실손보험 청구전산화 도입 1년에도…2단계 참여율 3.3%','뉴데일리','2025.10.22','https://biz.newdaily.co.kr/site/data/html/2025/10/22/2025102200207.html'],
 ['비상 걸린 금융당국...실손24 참여 의원·약국에 인센티브','데일리팜','2025.09.10','https://www.dailypharm.com/user/news/2280'],
 ['식약처, 생성형 AI 디지털의료기기 첫 허가','MTN','2026.04.01','https://news.mtn.co.kr/news-detail/2026040116511420909'],
 ['식약처, 디지털의료기기 인허가 합리화...특례대상 확대','데일리팜','2026.07.28','https://www.dailypharm.com/user/news/340892'],
 ['디지털의료기기 표시 제도, 변화와 과제 (기고)','메디칼타임즈','2026.07.27','https://medicaltimes.com/Main/News/NewsView.html?ID=1169875'],
 ['강북삼성병원, 건강정보 고속도로 개통식 개최','메디포뉴스','2024.10.17','https://medifonews.com/news/article.html?no=195941'],
 ['정밀 의료 데이터 구축 속도내는 정부…표준화+보안 화두','메디칼타임즈','2026.04.27','https://medicaltimes.com/Main/News/NewsView.html?ID=1168441']
];
NH['kr-regulation']={
 intro:'헬스케어 서비스는 <b>할 수 있는 것보다 해도 되는 것</b>이 먼저 정해집니다. 2026년 말, 그 판이 크게 바뀌고 있습니다.',
 summary:[
  '<b>2026년 12월 24일</b>부터 비대면진료가 <b>법으로 제도화</b>된다. 대면 원칙 아래 <b>의원급·재진 중심</b>으로 운영된다.',
  '초진은 <b>같은 시·도 의원</b>에서, 처방은 원칙적으로 <b>7일 이내</b>(입법예고안). 플랫폼은 <b>신고·인증</b>을 받고 특정 병원 유도가 금지된다.',
  '<b>실손24</b>는 2025년 10월 의원·약국까지 확대됐지만 연계율은 <b>47.7%</b>. 정부는 <b>EMR 업체 과태료</b>까지 검토 중이다.',
  '식약처는 2026년 4월 <b>생성형 AI 의료기기를 처음 허가</b>했고, AI 제품에 <b>환각 가능성과 전문가 확인</b>을 표시하도록 안내한다.',
  '<b>건강정보 고속도로</b>는 2029년 진료정보 교류와 통합을 목표로, 환자가 <b>내 의료 기록을 옮겨 쓰는</b> 기반이 되고 있다.'
 ],
 sources:S6,
 sections:[
  {id:'overview',title:'한눈에 보기',html:lead('네 가지 제도가 동시에 움직입니다. <b>진료 방식(비대면)</b>, <b>청구(실손24)</b>, <b>AI 제품(디지털의료제품법)</b>, <b>데이터(마이데이터)</b>입니다.')+
   stats([['2026. 12. 24.','','비대면진료 제도화 시행'],['47.7','%','실손24 요양기관 연계율 (2026.09.28)'],['57','종','첫 허가 생성형 AI 기기가 판독하는 흉부 X선 소견'],['2029','년','건강정보 고속도로·진료정보 교류 통합 목표']])+
   h3('타임라인')+timeline([
    ['2024.10','실손24 1단계','병원급·보건소 약 7,800곳에서 서류 없이 실손 청구.'],
    ['2025.01','디지털의료제품법 시행','디지털 의료기기·소프트웨어를 위한 별도 법체계.'],
    ['2025.10','실손24 2단계','의원·약국 약 9만 6,000곳으로 확대.'],
    ['2025.12.23','의료법 개정 공포','15년 만에 비대면진료 법제화. 공포 1년 후 시행.'],
    ['2026.04.01','생성형 AI 의료기기 첫 허가','흉부 X선 예비 소견서를 만들어 판독을 돕는 기기.'],
    ['2026.06~07','AI 표시·허가 기준 정비','표시기재 가이드라인 개정, 임상자료 기준 명확화와 특례 확대 고시.'],
    ['2026.09~11','비대면 하위법령 입법예고','초진 기준·처방 일수·기관 한도·플랫폼 인증 세부안.'],
    ['2026.12.24','비대면진료 제도화 시행','대면 원칙, 의원급·재진 중심, 플랫폼 신고·인증.']
   ])},
  {id:'telemedicine',title:'비대면진료 제도화',html:table(['항목','주요 내용 (입법예고안 포함)'],[
    ['원칙','대면진료가 원칙. 재진·의원급 중심, 비대면 전담 의료기관 금지'],
    ['재진','같은 기관에서 6개월 안에 같은 증상으로 대면진료를 받았다면 비대면 가능'],
    ['초진','주소지와 같은 시·도 의료기관에서만. 희귀질환자·장애인·장기요양수급자 등은 예외'],
    ['처방','초진은 원칙적으로 7일 이내, 필요 시 1회 30일까지'],
    ['처방 제한','마약·향정신성의약품, 오남용 우려 의약품 원칙적 금지 (비만치료제는 보도마다 표현이 다름)'],
    ['기관 한도','기관별 반기 진료의 30% 이내, 의사 1인 월평균 500건 (야간·휴일 제외)'],
    ['약 배송','섬·벽지, 장기요양수급자, 장애인, 감염병 확진자 등 일부에 처음 법제화'],
    ['플랫폼','복지부 신고, 가입자 10만 명 이상은 인증. 의료 판단 개입·특정 병원·약국 유도 금지']
   ],'세부 수치는 2026년 9~11월 입법예고안 기준입니다. 최종 공포본은 국가법령정보센터에서 확인이 필요합니다.')+
   callout('UX','플랫폼 규정이 곧 화면 규칙',`<b>특정 병원·약국 추천 유도 금지</b>는 병원 목록의 정렬·광고·추천 문구 설계에 직접 영향을 줍니다. 네이버 건강 에이전트의 “병원 추천”도 <b>추천 기준을 설명하는 UX</b>가 필요해집니다.`)},
  {id:'silson',title:'실손보험 청구 간소화',html:pillars([
    ['현황','연계율 47.7%',['요양기관 10만 5,643곳 중 5만 340곳 연계 (2026.09.28)','가입자 약 521만 명, 누적 청구 461만 건','약국은 약 82%로 높고 의원 연계가 과제']],
    ['쟁점','EMR 업체가 열쇠',['EMR 업체의 추가 비용 요구 보도, 주요 3사가 시장 약 50%','정부는 미연계 의료기관·EMR 업체 과태료(보험업법 개정)를 검토','연말까지 병·의원 연계율 80~90% 목표']],
    ['플랫폼','생활 앱에서 청구',['네이버페이·네이버 지도·토스에서 실손24 청구 연계 발표(2026.10.07)','진료 → 결제 → 청구가 한 흐름으로 묶일 가능성']],
    ['네이버','오름차트와 Npay',['EMR(오름차트)과 결제(Npay 커넥트)를 모두 가진 드문 구조','“결제 영수증에서 바로 청구” 같은 경험이 가능']]
   ])},
  {id:'ai-rules',title:'디지털의료제품법 · 의료 AI',html:pillars([
    ['법','디지털의료제품법',['2025년 1월 시행, 소프트웨어 의료기기를 별도로 다룸','2026.07 고시 개정: 임상시험 자료 기준 명확화, 우수관리체계 특례 확대, 실사용 특례 1~3년']],
    ['허가','생성형 AI 첫 허가',['2026.04.01 흉부 X선 57종 소견을 생성형 AI가 예비 판독','전문의 5명 비교 임상에서 실제 판독과 유사(식약처 발표)','식약처는 생성형 AI 의료기기 허가·심사 가이드라인을 세계 최초로 발간했다고 밝힘']],
    ['표시','AI 고지가 규칙이 된다',['생성형 AI 제품은 환각 등 예상과 다른 출력 가능성을 명시','전문가 확인을 안내하는 예시, ‘전문가용’ 표시 기준 정비(기고 해석)']],
    ['의미','UX에 들어오는 규제',['AI 답변 화면의 경고·출처·확인 절차가 디자인 요소','허가 여부에 따라 같은 기능도 표현을 달리해야 함']]
   ])},
  {id:'mydata',title:'의료 마이데이터',html:lead('건강정보 고속도로는 여러 병원의 기록을 <b>표준 형식으로 모아</b> 환자 동의에 따라 원하는 곳으로 보내는 중계 플랫폼입니다.')+
   pillars([
    ['현재','연결이 넓어지는 중',['상급종합병원 47곳 연계, 12종 핵심 항목 우선 표준화','건보공단·질병청·심평원 자료로 10년+ 검진 기록과 실시간 처방 정보 제공']],
    ['목표','2029년 통합',['분산된 건강정보 고속도로와 진료정보 교류 시스템을 하나로','동네 의원 참여를 위한 국고 지원 등 유인책 준비']],
    ['데이터','바이오 빅데이터',['2032년까지 100만 명 목표, 약 12만 명 동의 확보','폐쇄망에서만 연구, 결과물만 반출']],
    ['과제','내 기록인데 불편',['본인 기록을 보려 해도 별도 승인 절차가 필요하다는 지적','동의·열람 흐름을 쉽게 만드는 UX가 핵심']]
   ])},
  {id:'naver',title:'네이버에 주는 의미',html:pillars([
    ['에이전트','추천은 설명 가능하게',['비대면 플랫폼 규정(의료 판단 비개입, 유도 금지)을 건강 에이전트 설계에 반영','추천 이유와 기준을 사용자에게 보여주기']],
    ['오름차트','청구 연동은 기본기',['실손24 연계가 EMR의 의무가 되는 흐름','오름차트 + Npay로 청구까지 한 번에']],
    ['AI','고지 문구를 디자인으로',['환각 가능성·전문가 확인을 흐름 속에 자연스럽게','허가 기능과 정보 제공 기능의 표현 구분']],
    ['데이터','내 기록을 불러오는 경험',['마이데이터로 검진·처방 이력을 불러와 상담·예약에 활용','동의는 목적별로, 철회는 쉽게']]
   ])},
  {id:'video',title:'영상으로 보기',html:videos([
   ['_a9UuLHcUzI','‘비대면 진료’ 법제화 임박…거주지 의원서 초진도 허용','KBS News','2025.11.21'],
   ['RQ7XZRMJZu8','‘비대면 진료’ 의원·재진 중심으로 확대…“약 배달은 언제?”','YTN','비대면진료 기준']
  ])},
  {id:'interview',title:'면접 체크포인트',html:qa([
   ['비대면진료 제도화가 네이버에 기회인가 위기인가?','기회에 가깝다. <b>재진·의원급 중심</b>이라 이미 다니는 병원과의 연결이 중요해지고, 오름차트(의원 EMR)와 예약을 가진 네이버에 유리하다. 다만 <b>플랫폼 인증·유도 금지</b> 규정을 지켜야 한다.'],
   ['실손24 연계율이 낮은 이유를 UX 관점에서 보면?','병원 입장에서 <b>이득이 적고 설정이 번거롭다</b>. EMR 안에서 기본값처럼 켜지고, 환자가 결제 직후 자연스럽게 청구하는 흐름이면 참여가 늘 수 있다.'],
   ['AI 의료 기능의 고지 문구, 어떻게 디자인하나?','매번 뜨는 경고창이 아니라 <b>근거·한계·확인 주체</b>를 답변 구조 안에 넣는다. 위험도가 높을수록 확인 단계를 강하게.'],
   ['의료 마이데이터 동의 화면에서 중요한 것은?','무엇을, 누구에게, 왜, 언제까지 보내는지 한 화면에. <b>목적별 동의와 쉬운 철회</b>, 그리고 받은 데이터로 무엇이 좋아지는지 보여주기.']
  ])+me(['<b>정책과 예외가 많은 서비스</b>를 구조화한 경험 → 비대면 초진·재진·예외 규칙 화면','<b>약관·고지·동의</b> 흐름 설계 경험 → 마이데이터·AI 고지 UX','<b>복잡한 청구 흐름</b> 이해 → 실손24·결제 연동 설계'])},
  {id:'source',title:'참고 자료',html:sources(S6,NOTE+' 특히 비대면진료 세부 수치는 입법예고안이라 최종 확정본과 다를 수 있습니다.')}
 ]
};

/* =====================================================================
   7. 국내 헬스케어 플랫폼 경쟁 지도
   ===================================================================== */
const S7=[
 ['카카오헬스케어 매출 231억·적자 392억…혈당 앱, 돈은 언제 버나','밸류타임즈','2026.11.08','https://www.valuetimes.kr/2026/11/blood-sugar-app-industry-trend-2026.html'],
 ['약배송 중단에도 168만 건 돌파…닥터나우, 비대면진료 ‘일상 의료’로','뉴스탭','2026.02.14','https://www.newstap.co.kr/news/articleView.html?idxno=322295'],
 ['네이버·카카오, AI 헬스케어로 의료혁신 가속…글로벌 무대 정조준','CEO스코어데일리','2025.08.19','https://www.ceoscoredaily.com/page/view/2025081916322068071'],
 ['네카오, 새로운 격전지 디지털헬스케어서 슈퍼앱 선점 경쟁','이투데이','2024.10.28','https://www.etoday.co.kr/news/view/2412774'],
 ['“살아야 한다”…비대면진료 플랫폼 춘추전국시대','팜이데일리','2023.02.09','https://pharm.edaily.co.kr/news/read?newsId=01646566635508552&mediaCodeNo=257'],
 ['닥터나우·똑닥·굿닥 등 ‘플랫폼 경쟁’ 가열','데일리메디','2021.09.25','https://www.dailymedi.com/news/news_view.php?wr_id=874536'],
 ['삼성전자, 삼성 헬스 앱 개편…5대 영역 맞춤형 건강 지표','디지털데일리','2026.06.04','https://www.ddaily.co.kr/page/view/2026060409104902801'],
 ['Samsung Launches Health Assistant Beta','Samsung Mobile Press','2026.07.21','https://samsungmobilepress.com/articles/health-assistant-beta-ai-powered-wellness'],
 ['네이버 \'인수\' 카카오 \'매각\'…헬스케어 전략 주목','데일리메디','2025.11.27','https://www.dailymedi.com/news/news_view.php?wr_id=931390'],
 ['네이버, 의료 AI 이어 시니어 케어까지···헬스케어 사업판 키운다','뉴스웨이','2026.11.03','https://newsway.co.kr/news/view?ud=2026110216064398196']
];
NH['kr-competition']={
 intro:'국내 헬스케어 앱 시장은 <b>진료 전 입구</b>와 <b>진료 후 관리</b>로 나뉘고, 그 사이를 잇는 <b>병원 시스템 연결</b>이 승부처입니다.',
 summary:[
  '진료 전 <b>‘입구’ 경쟁</b>: 똑닥(예약·접수), 닥터나우(비대면진료), 굿닥(병원 찾기), 그리고 검색·지도·예약을 가진 <b>네이버</b>.',
  '<b>닥터나우</b>는 2025년 <b>연 168만 건</b>(전년 대비 +110%)을 기록하며 비대면진료 1위 플랫폼으로 자리 잡았다(회사 발표).',
  '<b>카카오헬스케어</b>는 2025년 매출 231억 원·<b>영업손실 392억 원</b>, 같은 해 <b>12월 차바이오그룹으로 최대주주</b>가 바뀌었다.',
  '<b>삼성헬스</b>는 2026년 앱을 수면·활동·식이·마음·생체징후로 개편하고 <b>AI Health Assistant</b>(미국 베타)를 냈다.',
  '만성질환 관리 앱은 <b>사용자는 모아도 수익이 어렵다</b>(캐즐 종료). 결국 <b>병원·EMR과 연결</b>된 쪽이 오래 간다.'
 ],
 sources:S7,
 sections:[
  {id:'overview',title:'한눈에 보기',html:lead('플레이어를 <b>환자 여정의 어느 지점</b>을 잡고 있는지(진료 전·후)와 <b>병원 시스템에 얼마나 붙어 있는지</b>로 놓으면 경쟁 구도가 선명해집니다.')+
   stats([['168','만','닥터나우 2025년 비대면진료 건수 (회사 발표)'],['392','억','카카오헬스케어 2025년 영업손실'],['83.61','%','차바이오그룹 측 카카오헬스케어 지분 (2025년 말)'],['6,200','+','닥터나우 제휴 병원·약국 (누적)']])+
   h3('국내 헬스케어 플랫폼 포지셔닝 맵')+fig(posMap(['진료 전 (찾기·예약·진료)','진료 후 (관리·만성질환)'],['앱 단독','병원 시스템·EMR 연결'],['병원과 붙은 입구','병원과 붙은 관리','앱 중심 입구','앱 중심 관리'],[
    ['네이버',.22,.72,1],['오름차트 + 클레',.5,.9,1],['똑닥',.14,.82],['의사랑 · 똑닥 연동',.3,.94],['닥터나우',.3,.42],['굿닥',.1,.3],['카카오 파스타',.8,.36],['삼성헬스',.88,.18],['닥터다이어리',.7,.12]
   ],'국내 헬스케어 플랫폼 포지셔닝 맵'),'공개 자료를 바탕으로 한 필자의 해석적 배치입니다.')},
  {id:'players',title:'플레이어 분석',html:table(['플레이어','핵심 서비스','최근 지표 · 변화','눈여겨볼 점'],[
    ['네이버','검색·AI 브리핑, 네이버케어 증상체크, 지도·예약, 오름차트·클레','2025.11 세나클 최대주주, 2026.10 헬스케어 전담조직','찾기 → 예약 → 진료(EMR) → 결제까지 이어지는 유일한 구조'],
    ['닥터나우','비대면진료·약국 연결','2025년 168만 건(+110%), 다운로드 750만, 재진률 66%','제도화(재진 중심) 이후 어떤 흐름을 유지할지'],
    ['똑닥 (비브로스)','소아과 중심 모바일 예약·접수','다수 EMR 업체와 연동, 소아과 시장 높은 점유(보도)','EMR 연동이 해자, 의사랑과 연결'],
    ['굿닥 (케어랩스)','병원·약국 검색, 예약, 태블릿 접수','의료 광고·클리닉 마켓 수익','검색 입구에서 네이버와 정면 경쟁'],
    ['카카오헬스케어','파스타(연속혈당측정 연동), 케어챗, 데이터 플랫폼','2025 매출 231억·손실 392억, 12월 차바이오 계열로 경영권 이동','만성질환 관리 수익화의 어려움을 보여줌'],
    ['삼성헬스','워치·링 기반 건강 지표, AI Health Assistant','2026.06 앱 개편, 2026.07 미국 베타, Xealth 인수','기기 데이터 + 병원 연결(Xealth)로 확장'],
    ['혈당·만성질환 앱','닥터다이어리, 슈가지니 등','닥터다이어리 300만 다운로드, 캐즐 2024.12 종료','센서·구독 모델의 지속 가능성']
   ],'지표 대부분은 회사 발표 또는 기사 재인용이며, 일부(똑닥·굿닥)는 2026년 최신 수치가 공개되지 않았습니다.')},
  {id:'read',title:'경쟁 구도 읽기',html:pillars([
    ['입구','진료 전 첫 화면 싸움',['검색(네이버) · 접수(똑닥) · 비대면(닥터나우) · 병원 찾기(굿닥)','사용자는 “지금 아픈데 어디로?”를 가장 먼저 해결해 주는 곳으로 간다']],
    ['관리','진료 후는 돈이 어렵다',['파스타 적자, 캐즐 서비스 종료','센서·구독만으로는 부족, 병원·보험과 엮여야 지속 가능']],
    ['연결','EMR이 해자',['똑닥은 EMR 연동, 네이버는 오름차트 인수','병원 안 시스템과 붙은 서비스가 쉽게 대체되지 않는다']],
    ['제도','규칙이 판을 바꾼다',['2026.12.24 비대면진료 제도화, 플랫폼 인증','실손24 연계로 결제·청구가 플랫폼 경쟁 요소가 됨']]
   ])},
  {id:'vs',title:'네이버 vs 카카오',html:table(['구분','네이버','카카오'],[
    ['전략','지분 확보로 인프라 강화 (세나클·인바디·제이앤피메디)','2025.12 카카오헬스케어 경영권을 차바이오그룹에 넘김'],
    ['진료 현장','의원급 클라우드 EMR 오름차트 보유','케어챗(카톡 채널 예약·문진·결제)으로 병원 연결'],
    ['소비자 앱','네이버케어 증상체크, 건강 에이전트 예고','파스타(혈당 관리)'],
    ['강점','검색·지도·예약·Npay가 한 생태계','카카오톡 접점, 연속혈당 관리 경험'],
    ['과제','서비스 간 연결을 하나의 경험으로 묶기','지속적인 적자, 지배구조 변화 이후 방향']
   ])},
  {id:'interview',title:'면접 체크포인트',html:qa([
   ['네이버 헬스케어의 가장 큰 경쟁자는?','앱 단위로는 똑닥·닥터나우지만, 진짜 경쟁은 <b>사용자의 첫 질문을 누가 받느냐</b>다. 검색·AI 브리핑은 이미 입구이고, 이를 예약·진료까지 끊김 없이 잇는 것이 과제다.'],
   ['카카오헬스케어 사례에서 배울 점은?','사용자를 모아도 <b>병원·보험과 엮이지 않은 관리 서비스</b>는 수익화가 어렵다. 그래서 네이버는 진료 현장(오름차트)부터 잡았다고 볼 수 있다.'],
   ['닥터나우가 제도화 이후 맞을 변화를 UX로 보면?','재진 중심으로 바뀌면 <b>이전 진료 기록 확인</b>과 <b>같은 병원 재연결</b>이 핵심 흐름이 된다. 초진 제한을 안내하는 문구와 대안 경로도 필요.'],
   ['네이버가 이 시장에서 차별화할 한 가지는?','<b>“찾고 → 예약하고 → 진료받고 → 결제·청구하고 → 관리하는”</b> 전 과정을 하나의 계정·기록으로 잇는 것.']
  ])+me(['<b>서비스 생태계 구조화</b> 경험 → 플랫폼 간 연결 지도 그리기','<b>경쟁 서비스 분석·비딩</b> 경험 → 차별화 포인트 도출','<b>예약·결제 흐름</b> 설계 경험 → 진료 전후 여정 설계'])},
  {id:'source',title:'참고 자료',html:sources(S7,NOTE)}
 ]
};

/* =====================================================================
   8. 네이버 안의 헬스케어 자산
   ===================================================================== */
const S8=[
 ['[단독] 네이버, ‘AI 헬스 비서’ 첫발 뗐다…예상 질병에 병원도 찾아준다','이투데이','2024.09.27','https://www.etoday.co.kr/news/view/2404296'],
 ['네이버 AI의 변신…환자 맞춤형 서비스ㆍ독거노인 건강 체크까지','이투데이','2024.09.27','https://www.etoday.co.kr/news/view/2404298'],
 ['네이버, AI의료 사업 본격 확장','팜이데일리','2024.10.06','https://pharm.edaily.co.kr/news/read?newsId=01741686639050296'],
 ['네이버, 건강 정보 품질 강화… 언론사보다 전문 의료기관 비중 확대','SEO NEWS','2026.07.06','https://seonews.co.kr/naver-health-ai-briefing-changes/'],
 ['“AI 브리핑에 우리 병원은 왜 안 나와요?” 네이버 공개 기준으로 짚어 본 점검표','오픈애즈','2026.10.19','https://www.openads.co.kr/content/contentDetail?contsId=20790'],
 ['네이버, 의료 AI 이어 시니어 케어까지···헬스케어 사업판 키운다','뉴스웨이','2026.11.03','https://newsway.co.kr/news/view?ud=2026110216064398196'],
 ['네이버, 디지털 헬스케어 판 키운다…AI 접목될 가능성 높아','글로벌이코노믹','2026.09.28','https://www.g-enews.com/article/ICT/2026/09/2026092809344691143d7a510102_1'],
 ['네이버, 주총서 AI 기반 헬스케어 서비스 확장 예고','메디게이트뉴스','2026.03.23','https://www.medigatenews.com/news/3518931'],
 ['병원 수납 창구서 얼굴로 결제한다…오름차트, 네이버페이 커넥트 연동','바이라인네트워크','2026.09.15','https://byline.network/2026/09/15_cenacle/'],
 ['실손24 연계율 47%…미참여 병원·약국·EMR 과태료 추진','데일리팜','2026.09.30','https://dailypharm.com/user/news/342946']
];
function assetSvg(){const W=960,H=470;let b='';const rows=[['찾기','증상과 정보를 찾는 순간',['검색 · AI 브리핑','지식백과 · 지식iN','네이버케어 증상체크']],['연결','병원을 고르고 예약',['지도 · 플레이스','네이버 예약']],['진료','병원 안에서',['오름차트 (EMR)','사내 부속의원 · 스마트서베이']],['결제 · 청구','진료가 끝난 뒤',['Npay 커넥트','실손24 연계']],['관리','일상으로 돌아가서',['클레','클로바 케어콜','건강 에이전트 (예고)']]];
 rows.forEach(([t,s,chips],i)=>{const y=14+i*90;b+=box(20,y,920,78,20,i===2?'d-mint':'d-soft');b+=T(48,y+36,t,'font-size="19" font-weight="700" class="d-ink"')+T(48,y+60,s,'font-size="15" class="d-muted"');
  let x=300;chips.forEach(c=>{const w=tw(c,16)+40,hl=/오름차트|네이버 예약|검색/.test(c);b+=box(x,y+17,w,44,22,hl?'d-green':'d-card')+T(x+w/2,y+45,c,`font-size="16" font-weight="700" text-anchor="middle" class="${hl?'d-onGreen':'d-ink'}"`);x+=w+12})});
 return svg(W,H,b,'네이버 헬스케어 자산 지도')}
NH['naver-assets']={
 intro:'면접에서 제안할 때 필요한 건 새 아이디어보다 <b>네이버가 이미 가진 것들의 연결</b>입니다. 그 재료를 한 장에 모았습니다.',
 summary:[
  '네이버는 <b>찾기(검색·AI 브리핑) → 예약(지도·플레이스) → 진료(오름차트) → 결제(Npay) → 관리(케어콜)</b>를 모두 가진 드문 회사다.',
  '건강 검색의 <b>AI 브리핑</b>은 2026년 6월 치료법·시술명까지 넓어졌고, <b>상급종합병원·학회 등 공신력 출처</b>를 우선한다.',
  'AI 기반은 <b>하이퍼클로바X</b>와 의료 특화 LLM <b>KMed.ai</b>. 검진 소견서 자동 작성, 진료 대화 기록 등을 실증해 왔다.',
  '<b>네이버케어</b>(2024년 9월 베타)는 증상을 입력하면 예상 질환과 가까운 병원을 보여주고 네이버 예약으로 잇는다.',
  '다음 퍼즐은 <b>건강 에이전트</b>(연내 공개 예고)다. 흩어진 자산을 <b>한 사람의 건강 여정</b>으로 묶는 것이 핵심 과제다.'
 ],
 sources:S8,
 sections:[
  {id:'overview',title:'한눈에 보기',html:lead('흩어져 있는 자산을 <b>환자가 겪는 순서</b>로 다시 놓아 보면, 네이버 헬스케어가 무엇을 연결해야 하는지 보입니다.')+
   stats([['2024. 09.','','네이버케어 증상체크 베타 출시'],['2026. 06.','','건강 AI 브리핑 범위 확대 (치료법·시술)'],['128','곳','클로바 케어콜 도입 시군구 (2024년 보도)'],['63.3','%','건강 검색 결과 중 네이버 자체 콘텐츠 비중 (외부 분석)']])+
   h3('네이버 헬스케어 자산 지도')+fig(assetSvg(),'공개 자료를 바탕으로 재구성한 다이어그램입니다. 녹색은 핵심 연결 고리입니다.')},
  {id:'search',title:'검색 · AI 브리핑',html:pillars([
    ['확대','건강 AI 브리핑',['2026.06.30 치료법·시술명·신체 기관 정보까지 범위 확대','비급여 가격은 건보공단, 안전성·효과성은 건보공단·보건의료연구원 자료 인용(외부 분석 인용)']],
    ['출처','공신력 우선',['질환 정보는 상급종합병원·학회 등 공신력 출처 중심','신뢰도 중심 통합 랭킹 테스트(2025.11), 공공기관 클릭 77.2% 증가(네이버 수치 인용)']],
    ['콘텐츠','블로그·카페·지식iN',['건강 검색 결과 중 블로그 27.2%, 카페 20.6%, 지식iN 12.3%(외부 분석)','서울아산병원·서울대병원 공식 콘텐츠가 반복 상위 노출']],
    ['한계','병의원 플레이스는 아직',['플레이스 AI 브리핑 대상 업종에 병의원은 없음(2026.10 기준 외부 분석)','동네 의원 정보가 AI 답변에 어떻게 들어갈지가 과제']]
   ])+callout('UX','의료 정보에서는 출처가 곧 UX',`같은 답이라도 <b>누가 한 말인지</b>가 신뢰를 정합니다. 출처 기관명, 업데이트 날짜, 의료진 검수 여부를 답변 가까이에 두는 것이 건강 AI 화면의 기본입니다.`)},
  {id:'ai',title:'AI 모델',html:table(['모델 · 기술','무엇을 하나','상태'],[
    ['하이퍼클로바X','한국어 특화 대형 언어모델. 케어콜의 대화·기억 기능의 기반','네이버 서비스 전반에 적용, “소버린 AI” 전략'],
    ['하이퍼클로바 메드','진료 대화를 기록하고 진단명을 의학 용어로 추출','2024년 순천향대병원 간호사 테스트, 삼성의료원 응급실 실증 보도'],
    ['KMed.ai','어플라이드 AI 그룹이 만든 의료 특화 LLM','2026.03 의료 AI 그룹이 테크비즈니스 부문으로 이동'],
    ['검진 소견서 자동 작성','건강검진 결과를 분석해 소견서 초안 작성','사내 부속의원에서 테스트(회사 설명)'],
    ['스마트서베이 · 페이션트 서머리','AI 문진과 환자 요약','사내병원 실증 후 외부 병원 적용']
   ])},
  {id:'services',title:'서비스 자산',html:table(['자산','역할','헬스케어 연결','상태'],[
    ['네이버케어','증상 입력 → 예상 질환·가까운 병원','지식백과 설명, 지도·예약 연결','2024.09 베타'],
    ['지도 · 플레이스','병원 위치·정보·리뷰','병원 선택의 출발점','운영 중'],
    ['네이버 예약','병원 예약','오름차트와 연동된 예약 관리','운영 중'],
    ['오름차트 · 클레','의원 EMR · 환자 앱','진료 기록, 검사결과 전송, 가족 관리','2025.11 세나클 최대주주'],
    ['Npay 커넥트','병원 수납','카드·QR·얼굴인식 결제','2026.09 오름차트 연동'],
    ['실손24 연계','실손 청구','네이버페이·지도에서 청구','2026.10 연계 발표'],
    ['클로바 케어콜','시니어 AI 안부 전화','건강·식사·수면 확인, 일본 판매','2026.11.26 별도 약관 적용 예정'],
    ['건강 에이전트','증상 → 추천 → 예약 → 방문','검진 분석·건강관리까지','연내 공개 예고']
   ])},
  {id:'ideas',title:'자산을 잇는 제안 아이디어',html:lead('면접에서 꺼낼 수 있는 <b>연결형 아이디어</b>입니다. 모두 네이버가 이미 가진 자산의 조합입니다.')+
   pillars([
    ['01','검진 결과 이후의 여정',['검진 결과 → AI 브리핑식 쉬운 해석 → 상담이 필요하면 네이버 예약','결과와 상담 기록을 클레·네이버 헬스케어에 한 타임라인으로']],
    ['02','증상에서 진료까지 이어달리기',['네이버케어 증상 입력 → 병원 추천 → 예약 → 사전문진(스마트서베이)','같은 정보를 두 번 묻지 않기']],
    ['03','결제와 청구를 한 번에',['진료 후 Npay 결제 → 영수증에서 실손 청구 원탭','청구 진행 상태를 알림으로']],
    ['04','보호자 모드',['부모님 케어콜 대화 요약과 진료 일정을 자녀가 확인','클레 가족 그룹과 연결, 공유 범위는 부모님이 결정']]
   ])+callout('정리','한 문장으로',`네이버 헬스케어의 과제는 기능을 더하는 것이 아니라 <b>이미 가진 자산을 한 사람의 여정으로 꿰는 것</b>입니다.`)},
  {id:'video',title:'영상으로 보기',html:videos([
   ['98L1ZILavcM','네이버, 하이퍼클로바X 소버린 AI로 진화시킨다','JTBC News','JTBC 내일포럼 2025'],
   ['4gbQ2R6YdZY','“한국을 가장 잘 이해하는 AI”…하이퍼클로바X','MTN 머니투데이방송','하이퍼클로바X 소개']
  ])},
  {id:'interview',title:'면접 체크포인트',html:qa([
   ['네이버 헬스케어의 가장 큰 자산은?','<b>사용자의 첫 질문을 이미 받고 있다는 것</b>(검색). 여기에 예약·결제·EMR까지 있어, 질문에서 진료까지 한 번에 이을 수 있다.'],
   ['자산이 많은데 왜 하나의 경험이 아닐까?','서비스마다 조직·데이터·로그인이 따로 발전했기 때문. 전담조직 출범은 이를 묶으려는 신호로 볼 수 있다. UX는 <b>공통 건강 프로필과 타임라인</b>에서 시작할 수 있다.'],
   ['AI 브리핑의 의료 답변을 더 신뢰받게 하려면?','출처 기관·작성일·검수 여부를 보여주고, 위험 증상은 바로 <b>병원 찾기·응급 안내</b>로 연결.'],
   ['입사 후 첫 과제로 무엇을 하고 싶나?','검진 결과 이후 여정처럼 <b>자산 2~3개를 잇는 작은 흐름</b>을 리서치로 검증하고, 작게 출시해 지표로 확인하는 것.']
  ])+me(['<b>대형 서비스 생태계</b> 설계 경험 → 여러 서비스를 하나의 흐름으로','<b>AI 서비스 출시</b> 경험 → 건강 에이전트·AI 브리핑 UX','<b>설계 기준 정립·코칭</b> 경험 → 여러 팀이 함께 쓰는 공통 UX 기준'])},
  {id:'source',title:'참고 자료',html:sources(S8,NOTE)}
 ]
};

/* =====================================================================
   9. 도메인 기초 용어 · 의원의 하루
   ===================================================================== */
const S9=[
 ['\'고령화 시대\' 노인 진료비 50조 돌파…의사 수 14년 만에 줄어','뉴시스','2025.11.28','https://www.newsis.com/view/NISX20251127_0003419435'],
 ['\'3高\' 환자 10명 중 3~5명, 알고도 방치했다 병 키워…진료비만 \'90조\'','머니투데이','2025.12.29','https://www.mt.co.kr/thebio/2025/12/29/2025122909075922511'],
 ['실손24 연계율 47%…미참여 병원·약국·EMR 과태료 추진','데일리팜','2026.09.30','https://dailypharm.com/user/news/342946'],
 ['비대면진료 12월 24일 제도화…초진은 같은 시·도, 처방 7일','교육포커스','2026.10.20','https://www.edu-focus.com/news/534402'],
 ['병원 수납 창구서 얼굴로 결제한다…오름차트, 네이버페이 커넥트 연동','바이라인네트워크','2026.09.15','https://byline.network/2026/09/15_cenacle/'],
 ['강북삼성병원, 건강정보 고속도로 개통식 개최','메디포뉴스','2024.10.17','https://medifonews.com/news/article.html?no=195941']
];
function daySvg(){const W=960,H=430;let b=arrowDefs;
 const steps=[['접수','본인 확인 · 대기 등록','원무'],['문진','증상 · 복용약 확인','간호'],['진료','진찰 · 상병 · 처방','의사'],['수납','본인부담금 결제','원무'],['약국','처방전으로 조제','약사']];
 const sw=164,gap=26,x0=(W-(steps.length*sw+(steps.length-1)*gap))/2;
 steps.forEach(([t,d,who],i)=>{const x=x0+i*(sw+gap),hl=i===2;b+=box(x,30,sw,118,20,hl?'d-green':'d-card')+T(x+20,62,who,`font-size="15" font-weight="700" class="${hl?'d-onGreen':'d-muted'}"`)+T(x+20,96,t,`font-size="22" font-weight="700" class="${hl?'d-onGreen':'d-ink'}"`)+T(x+20,126,d,`font-size="15" class="${hl?'d-onGreen':'d-muted'}"`);
  if(i<steps.length-1)b+=`<line x1="${x+sw+4}" y1="89" x2="${x+sw+gap-6}" y2="89" class="d-axis" marker-end="url(#nh-arr)"/>`});
 b+=box(x0,190,steps.length*sw+(steps.length-1)*gap,96,20,'d-soft');
 b+=T(x0+24,224,'병원 안 시스템','font-size="15" font-weight="700" class="d-ink"')+T(x0+24,252,'EMR(진료기록) · OCS(처방 전달) · PACS(영상) · LIS(검사) · 원무·청구','font-size="15" class="d-muted"');
 b+=box(x0,306,steps.length*sw+(steps.length-1)*gap,96,20,'d-mint');
 b+=T(x0+24,340,'진료가 끝난 뒤','font-size="15" font-weight="700" class="d-ink"')+T(x0+24,368,'청구(심평원 심사 → 건보공단 지급) · 실손 청구(실손24) · 재진 예약 · 검사 결과 안내','font-size="15" class="d-muted"');
 return svg(W,H,b,'의원 진료 흐름과 시스템')}
NH['domain-basics']={
 intro:'헬스케어 UX 회의에서 쓰이는 말을 알아들어야 질문이 날카로워집니다. <b>핵심 용어와 동네 의원의 하루</b>로 기초를 다집니다.',
 summary:[
  '의료기관은 <b>의원 → 병원 → 종합병원 → 상급종합병원</b>으로 나뉘고, 비대면진료 제도화도 <b>의원급 중심</b>이다.',
  '진료 한 번은 <b>접수 → 문진 → 진료 → 수납 → 약국</b>으로 흐르고, 뒤에서는 <b>EMR·OCS·청구 시스템</b>이 함께 움직인다.',
  '돈의 흐름은 <b>급여(건강보험) / 비급여</b>, 환자가 내는 <b>본인부담금</b>, 병원이 심평원에 하는 <b>청구</b>로 이해하면 된다.',
  '2024년 <b>65세 이상 진료비가 52조 원</b>(전체의 44.9%)을 넘었고, 만성질환 진료 인원은 <b>2,294만 명</b>이다.',
  '의원의 하루는 <b>오전 피크·점심 공백·오후 재진</b>으로 움직인다. 화면 하나가 줄이는 <b>몇 초의 반복</b>이 곧 가치다.'
 ],
 sources:S9,
 sections:[
  {id:'overview',title:'한눈에 보기',html:lead('도메인을 이해하는 가장 빠른 길은 <b>한 번의 진료가 어떻게 흘러가는지</b>를 따라가 보는 것입니다.')+
   stats([['52','조','65세 이상 진료비 (2024년, 전체의 44.9%)'],['2,294','만','만성질환 진료 인원 (2024년)'],['762','만','고혈압 진료 인원 (2024년)'],['66.9','%','고혈압 유병자 치료율 (질병청 자료)']])+
   h3('의원 진료 흐름과 시스템')+fig(daySvg(),'일반적인 동네 의원 흐름을 단순화한 다이어그램입니다. 실제 순서는 의원마다 다릅니다.')},
  {id:'institutions',title:'의료기관과 돈의 흐름',html:table(['구분','무엇인가','UX에서 기억할 점'],[
    ['의원','외래 중심의 동네 의료기관 (의원·치과의원·한의원)','오름차트·비대면진료·실손24 확대의 주 무대'],
    ['병원 · 종합병원','입원 병상을 갖춘 기관, 진료과가 많아질수록 종합병원','진료과·검사 동선이 복잡해져 길 안내·대기 UX 중요'],
    ['상급종합병원','중증 진료 중심, 복지부 지정 (현재 47곳)','진료의뢰서가 필요, 건강정보 고속도로 우선 연계'],
    ['급여 / 비급여','건강보험이 보장하는 항목 / 보장하지 않는 항목','비급여 가격 비교·안내는 민감한 정보 (AI 브리핑도 공공 자료 인용)'],
    ['본인부담금','진료비 중 환자가 직접 내는 금액','수납 화면·영수증·실손 청구의 출발점'],
    ['청구 · 심사','병원이 공단 부담분을 심평원에 청구 → 심사 → 건보공단 지급','EMR의 핵심 기능, 삭감을 줄이는 입력 도움이 가치'],
    ['실손보험 청구','환자가 민간 보험사에 본인부담분을 청구','실손24로 서류 없이 청구, 병원·EMR 연계가 관건']
   ])},
  {id:'terms',title:'꼭 알아둘 용어',html:pillars([
    ['시스템','병원 안 IT',['<b>EMR</b> 전자의무기록, 병원 안 진료기록 / <b>EHR</b> 기관을 넘어 이어지는 건강기록','<b>OCS</b> 처방 전달 시스템, 의사 처방을 검사실·약제부로','<b>PACS</b> 영상 저장·조회 / <b>LIS</b> 검사실 정보 시스템','<b>PHR</b> 개인이 관리하는 건강기록 (앱·웨어러블)']],
    ['진료','진료실에서 쓰는 말',['<b>초진 / 재진</b> 처음 진료 / 같은 질환으로 다시 진료 (진찰료가 다름)','<b>주호소(C.C.)</b> 환자가 온 가장 큰 이유','<b>상병코드</b> 질병분류(KCD) 코드, 청구의 기준','<b>SOAP</b> 주관적 증상·객관적 소견·평가·계획 순의 기록 형식']],
    ['처방','약과 관련된 말',['<b>원외처방</b> 처방전을 받아 밖의 약국에서 조제 (의약분업)','<b>DUR</b> 함께 먹으면 안 되는 약·중복 처방을 알려주는 점검','<b>복약순응도</b> 처방대로 약을 먹는 정도, 만성질환 관리의 핵심','<b>반복 처방</b> 만성질환자의 정기 처방, 재진 예약과 연결']],
    ['데이터','연결과 표준',['<b>마이데이터</b> 본인 동의로 내 데이터를 원하는 곳에 전송','<b>건강정보 고속도로</b> 국가 의료 마이데이터 중계 플랫폼','<b>FHIR · HL7</b> 의료 데이터를 주고받는 국제 표준','<b>진료의뢰 · 회송</b> 의원 → 큰 병원 의뢰, 치료 후 다시 의원으로']]
   ])+callout('TIP','면접에서 쓰는 법',`용어를 나열하기보다 <b>“재진 환자의 반복 처방 흐름에서 DUR 경고를 어떻게 보여줄지”</b>처럼, 용어를 <b>상황과 화면</b>에 붙여 말하면 도메인 이해도가 드러납니다.`)},
  {id:'day',title:'의원의 하루',html:lead('동네 내과 의원의 하루를 <b>가상의 예시</b>로 그려 보았습니다. 시간대별로 누가 어떤 화면을 보는지 상상해 보세요.')+
   timeline([
    ['08:30','오픈 전 준비','원무 직원이 오늘 예약·대기 앱 접수 목록을 확인. 검사 결과 도착 여부 체크.'],
    ['09:00','오전 피크','출근 전 직장인·어르신이 몰림. 접수 → 문진 → 진료가 몇 분 단위로 반복.'],
    ['10:30','검사와 결과 안내','혈액검사·초음파. 지난 검사 결과 설명과 생활 습관 상담.'],
    ['12:00','처방 · 청구 정리','오전 진료 기록 보완, 누락된 상병코드·처방 확인, 서류 발급 요청 처리.'],
    ['13:00','점심 공백','전화 문의·예약 변경, 비대면진료 요청 확인.'],
    ['14:00','오후 재진','고혈압·당뇨 등 만성질환 재진과 반복 처방. 복약 확인이 핵심.'],
    ['17:00','하교 · 퇴근 후','소아 환자·보호자, 퇴근길 직장인. 대기 시간이 길어지는 시간대.'],
    ['18:30','마감','수납 마감, 청구 데이터 점검, 다음 날 예약·검사 준비.']
   ])+callout('UX','하루에서 보이는 기회',`<b>같은 질문을 두 번 묻지 않기</b>(앱 문진 → 진료실), <b>재진 환자의 지난 기록 한 줄 요약</b>, <b>점심 공백에 몰리는 전화 문의를 메시지로</b>. 큰 기능보다 <b>반복되는 몇 초</b>를 줄이는 것이 의원 UX의 가치입니다.`)},
  {id:'actors',title:'누가 무엇을 원하나',html:table(['사람','가장 바라는 것','싫어하는 것'],[
    ['원장 (의사)','진료 흐름이 끊기지 않기, 기록 시간 줄이기','클릭이 많은 기록, 진료 중 뜨는 불필요한 알림'],
    ['간호사 · 간호조무사','문진·검사·안내를 빠르게','같은 정보를 여러 화면에 반복 입력'],
    ['원무 직원','접수·수납·서류를 정확하고 빠르게','전화와 창구가 동시에 몰리는 상황, 청구 오류'],
    ['환자','덜 기다리고, 무엇을 해야 할지 알기','설명 없는 대기, 결과를 들으러 다시 가야 하는 것'],
    ['보호자','아이·부모를 대신 접수·결제·공유','본인 인증이 막혀 대신 처리할 수 없는 순간']
   ])},
  {id:'video',title:'영상으로 보기',html:videos([
   ['S1rvllJKOGQ','의사랑, KIMES 2025에서 AI 기반 EMR 선보여','유비케어','KIMES 2025']
  ])},
  {id:'interview',title:'면접 체크포인트',html:qa([
   ['EMR과 EHR의 차이를 한 문장으로?','<b>EMR은 한 병원 안의 기록</b>, <b>EHR은 기관을 넘어 이어지는 기록</b>. 국내에서는 건강정보 고속도로가 EHR 역할을 넓혀 가고 있다.'],
   ['의원급 EMR에서 가장 중요한 UX는?','<b>진료 흐름을 끊지 않는 속도</b>. 재진 환자의 지난 기록 요약, 반복 처방, 상병코드 입력 도움처럼 반복을 줄이는 것.'],
   ['급여·비급여가 서비스 설계에 왜 중요한가?','가격 정보의 출처와 정확도가 민감하고, 실손 청구 가능 여부와도 연결된다. 비급여 안내는 <b>공공 자료 출처와 기준일</b>을 함께 보여줘야 한다.'],
   ['도메인 지식이 부족한 상태에서 어떻게 시작하나?','<b>현장 관찰과 인터뷰</b>로 실제 하루를 따라가고, 용어집과 업무 흐름도를 먼저 만든 뒤 화면을 그린다.']
  ])+me(['<b>정책·예외가 복잡한 도메인</b>(통신·금융·보험)을 빠르게 익혀 구조화한 경험','<b>현장 인터뷰 분석</b>으로 업무 흐름을 정리한 경험','<b>용어집·설계 기준</b>을 만들어 팀이 같은 말을 쓰게 한 경험'])},
  {id:'source',title:'참고 자료',html:sources(S9,NOTE+' 용어 설명은 일반적인 의미를 쉽게 풀어 쓴 것입니다.')}
 ]
};

/* =====================================================================
   10. 헬스케어 UX 우수 사례
   ===================================================================== */
const S10=[
 ['Epic\'s Ask Emmie offers EHR-backed AI chatbot option for patients','TechTarget','2026.04.06','https://www.techtarget.com/patientengagement/feature/Epics-Ask-Emmie-offers-EHR-backed-AI-chatbot-option-for-patients'],
 ['Community Health Network launches Epic\'s Emmie in MyChart','Becker\'s Hospital Review','2025','https://www.beckershospitalreview.com/healthcare-information-technology/community-health-network-launches-epics-emmie-in-mychart/'],
 ['New look NHS App: what is changing','NHS England','2026.05.13','https://nhsd-proxy.openprescribing.net/services/nhs-app/resources/new-look-nhs-app-what-is-changing'],
 ['Is the government on track to make the NHS App a ‘full front door to the NHS’ by 2028?','Full Fact','2026.02.16','https://fullfact.org/government-tracker/nhs-app-improvements/'],
 ['NHS App roadmap highlights pilots, integrated services, appointments, prescriptions, messaging','HTN','2026.01.29','https://htn.co.uk/2026/01/29/nhs-app-roadmap-highlights-pilots-integrated-services-appointments-prescriptions-messaging/'],
 ['Samsung Launches Health Assistant Beta','Samsung Mobile Press','2026.07.21','https://samsungmobilepress.com/articles/health-assistant-beta-ai-powered-wellness'],
 ['삼성전자, 삼성 헬스 앱 개편…5대 영역 맞춤형 건강 지표','디지털데일리','2026.06.04','https://www.ddaily.co.kr/page/view/2026060409104902801'],
 ['약배송 중단에도 168만 건 돌파…닥터나우, 비대면진료 ‘일상 의료’로','뉴스탭','2026.02.14','https://www.newstap.co.kr/news/articleView.html?idxno=322295'],
 ['병원 수납 창구서 얼굴로 결제한다…오름차트, 네이버페이 커넥트 연동','바이라인네트워크','2026.09.15','https://byline.network/2026/09/15_cenacle/'],
 ['[단독] 네이버, ‘AI 헬스 비서’ 첫발 뗐다…예상 질병에 병원도 찾아준다','이투데이','2024.09.27','https://www.etoday.co.kr/news/view/2404296']
];
NH['ux-cases']={
 intro:'좋은 헬스케어 UX는 화려하지 않습니다. <b>덜 불안하게, 덜 기다리게, 다음 행동을 분명하게</b> 만듭니다. 국내외 사례에서 그 원리를 뽑았습니다.',
 summary:[
  '<b>NHS App</b>은 1,000명 이상 사용자 조사를 거쳐 홈을 <b>처방·예약·검사결과·백신·질환·서류 6개</b>로 단순화했다.',
  'Epic <b>MyChart의 Emmie</b>는 환자 차트에 근거해 답하고, 필요하면 <b>화상진료 대기열까지 바로 연결</b>한다.',
  '<b>삼성헬스</b>는 수치를 나열하지 않고 <b>점수·한 줄 해석</b>으로 바꿨고, AI 답변은 의사·코치 검증을 강조한다.',
  '국내에서는 <b>똑닥(원격 접수·대기)</b>, <b>닥터나우(비대면진료)</b>, <b>오름차트+Npay(얼굴 결제)</b>가 <b>기다림과 창구</b>를 줄였다.',
  '공통 원리는 다섯 가지: <b>하나의 입구, 근거 있는 AI, 다음 행동, 쉬운 해석, 대신 해주는 가족</b>.'
 ],
 sources:S10,
 sections:[
  {id:'overview',title:'한눈에 보기',html:lead('사례를 <b>무엇을 줄였는가</b>로 보면 원리가 보입니다. 찾는 시간, 기다리는 시간, 이해하는 시간, 그리고 불안.')+
   stats([['6','개','NHS App 새 홈의 핵심 메뉴'],['1,000','+','NHS App 개편 전 사용자 조사 참여자'],['2028','년','NHS App ‘전체 NHS의 입구’ 목표'],['168','만','닥터나우 2025년 비대면진료 건수 (회사 발표)']])},
  {id:'global',title:'해외 사례',html:pillars([
    ['NHS App','하나의 입구',['홈 6개 메뉴: 처방 · 예약 · 검사결과 · 백신 · 건강상태 · 서류','하단은 홈 · 메시지 · 프로필 3개, 프로필에서 다른 사람의 건강 서비스도 관리','1,000명 이상 사용자 조사(접근성 포함) 후 중복 메뉴 정리','2028년까지 NHS 전체의 입구가 되겠다는 정부 목표']],
    ['MyChart · Emmie','근거 있는 AI',['2025년 8월 예약·진료비 안내 AI로 시작, 2026년 대화형 건강 Q&A로 확장','환자 본인 차트에 근거해 답변','아이 눈 충혈 질문 → 화상진료 대기열 연결처럼 답에서 행동으로','진료팀과 대화 공유 방식은 아직 검토 중 (투명성 과제)']],
    ['삼성헬스','쉬운 해석',['수면·활동·식이·마음·생체징후 5대 영역으로 재구성(2026.06)','에너지 점수·심장 건강 점수처럼 수치를 한 줄 판단으로','Health Assistant 베타(미국): 의사·코치가 검증한 답변을 강조']],
    ['Apple Health','기록을 내 손에',['병원 기록·약·검사 수치를 한 곳에 모아 보는 개인 건강기록','복약 알림, 가족과 공유 기능','기기 데이터와 병원 데이터를 같은 타임라인에']]
   ])},
  {id:'korea',title:'국내 사례',html:table(['서비스','줄인 것','핵심 화면 · 장치','배울 점'],[
    ['똑닥','병원 대기 시간','모바일 접수, 실시간 대기 순서, 진료 직전 알림','“기다림을 보이게” 만들면 불안이 줄어든다'],
    ['닥터나우','병원에 가는 수고','증상 선택 → 의사 연결 → 처방 → 약국 연결','진료 전후를 한 흐름으로, 재진 중심 제도화 이후가 과제'],
    ['오름차트 + Npay 커넥트','수납 창구','카드·QR·얼굴인식 결제','진료 끝 → 결제 → 청구를 이어붙이는 연결형 개선'],
    ['클레','결과를 들으러 가는 수고','진료기록·검사결과 전송, 가족 관리','병원 차트와 같은 원천이라 정확, 연동 범위가 커져야 가치'],
    ['네이버케어','“어디로 가야 하지?”','증상 → 예상 질환 → 가까운 병원 → 예약','검색에서 바로 행동으로, 면책 문구와 출처 표시'],
    ['클로바 케어콜','어르신 안부 확인','AI가 전화로 건강·식사·수면을 묻고 기억','화면 없이도 되는 UX, 보호자·지자체와 연결']
   ],'각 서비스의 화면 구성은 공개 자료와 일반적인 사용 흐름을 기준으로 요약했습니다.')},
  {id:'principles',title:'다섯 가지 원리',html:pillars([
    ['01','하나의 입구',['NHS App처럼 자주 하는 일 몇 개만 홈에','“나에게 지금 필요한 것”이 맨 위로']],
    ['02','근거 있는 AI',['내 기록·공신력 출처에 근거해 답하기','출처·한계·확인 주체를 답변 옆에']],
    ['03','답에서 다음 행동으로',['정보로 끝내지 않고 예약·접수·상담으로 연결','위험 신호는 즉시 응급 안내']],
    ['04','숫자보다 해석',['수치는 점수·범위·변화로','“그래서 나는 괜찮은가?”에 먼저 답하기']],
    ['05','대신 해주는 가족',['보호자의 대리 접수·결제·조회','공유 범위는 본인이 정하고 언제든 철회']]
   ])+callout('네이버','적용해 본다면',`검색(입구) → AI 브리핑(근거 있는 답) → 네이버 예약(다음 행동) → 클레·검진 결과(쉬운 해석) → 보호자 모드(가족). <b>다섯 원리가 네이버 자산 위에 그대로 올라갑니다.</b>`)},
  {id:'anti',title:'피해야 할 패턴',html:table(['패턴','왜 문제인가','대안'],[
    ['수치만 나열한 결과 화면','정상 범위를 모르면 불안만 커짐','범위 막대와 한 줄 해석, 지난 결과와 비교'],
    ['답만 주고 끝나는 챗봇','후속 진료로 이어지지 않을 위험 (챗봇 사용 후 후속 진료를 받지 않는 비율이 높다는 초기 자료 인용)','답변마다 다음 행동 버튼, 위험도별 안내'],
    ['매번 뜨는 면책 팝업','습관적으로 닫게 되어 의미가 사라짐','답변 구조 안에 근거·한계를 자연스럽게'],
    ['보호자를 고려하지 않은 인증','실제로는 자녀가 부모 대신 처리하는 경우가 많음','가족 연결과 대리 권한 설계'],
    ['광고와 추천의 경계가 흐린 병원 목록','신뢰 하락, 비대면 플랫폼 규정(유도 금지)과 충돌','정렬 기준 공개, 광고 표시 분리']
   ])},
  {id:'interview',title:'면접 체크포인트',html:qa([
   ['가장 인상 깊은 헬스케어 UX 사례는?','NHS App 개편. 기능을 더하지 않고 <b>사용자 조사로 홈을 6개로 줄였다</b>. 공공 서비스처럼 사용자가 넓을수록 단순함이 접근성이다.'],
   ['AI 건강 상담 UX에서 가장 중요한 것은?','<b>근거와 다음 행동</b>. 내 기록·공신력 출처에 근거해 답하고, 필요하면 진료 예약으로 이어져야 한다. Emmie가 좋은 예.'],
   ['국내 사례에서 배울 점은?','똑닥은 <b>기다림을 보이게</b> 했고, 오름차트+Npay는 <b>창구를 없앴다</b>. 큰 혁신보다 병원 방문 중 반복되는 마찰을 하나씩 지우는 것.'],
   ['우수 사례를 네이버에 그대로 가져오면 안 되는 이유는?','제도(비대면 규정·광고 규제), 사용자층(검색 사용자 전체), 데이터 연결 범위가 다르다. <b>원리는 가져오고 형태는 맥락에 맞게.</b>']
  ])+me(['<b>대형 서비스 개편</b>에서 메뉴 구조를 단순화한 경험','<b>AI 서비스 출시</b>에서 답변·행동 연결을 설계한 경험','<b>가족·대리 이용</b> 같은 예외 흐름을 정책과 함께 설계한 경험'])},
  {id:'source',title:'참고 자료',html:sources(S10,NOTE)}
 ]
};

/* =====================================================================
   11. 환자 페르소나 · 여정
   ===================================================================== */
const S11=[
 ['\'고령화 시대\' 노인 진료비 50조 돌파…의사 수 14년 만에 줄어','뉴시스','2025.11.28','https://www.newsis.com/view/NISX20251127_0003419435'],
 ['\'3高\' 환자 10명 중 3~5명, 알고도 방치했다 병 키워…진료비만 \'90조\'','머니투데이','2025.12.29','https://www.mt.co.kr/thebio/2025/12/29/2025122909075922511'],
 ['만성콩팥병 환자 의료비 분석 (삼성화재 자체 DB)','메트로신문','2026.09.30','https://www.metroseoul.co.kr/article/20260930500299'],
 ['약배송 중단에도 168만 건 돌파…닥터나우, 비대면진료 ‘일상 의료’로','뉴스탭','2026.02.14','https://www.newstap.co.kr/news/articleView.html?idxno=322295'],
 ['네이버 AI의 변신…환자 맞춤형 서비스ㆍ독거노인 건강 체크까지','이투데이','2024.09.27','https://www.etoday.co.kr/news/view/2404298'],
 ['네이버, 의료 AI 이어 시니어 케어까지···헬스케어 사업판 키운다','뉴스웨이','2026.11.03','https://newsway.co.kr/news/view?ud=2026110216064398196'],
 ['비대면진료 12월 24일 제도화…초진은 같은 시·도, 처방 7일','교육포커스','2026.10.20','https://www.edu-focus.com/news/534402']
];
function journeyMap(rows){const cols=['알아차림','찾기','예약·방문','진료','진료 후 관리'];const W=960,L=150,cw=(W-L-20)/5,H=60+rows.length*92;let b='';
 cols.forEach((c,i)=>{b+=T(L+i*cw+cw/2,30,c,'font-size="15" font-weight="700" text-anchor="middle" class="d-ink"')});
 rows.forEach(([name,cells],r)=>{const y=50+r*92;b+=T(20,y+44,name,'font-size="16" font-weight="700" class="d-ink"');
  cells.forEach((c,i)=>{const pain=c[0]==='!',t=pain?c.slice(1):c,x=L+i*cw+4;b+=box(x,y,cw-8,78,16,pain?'d-mint':'d-card');
   const words=t.split('|');words.forEach((w,k)=>{b+=T(x+(cw-8)/2,y+34+k*22-(words.length-1)*11,w,`font-size="15" text-anchor="middle" class="${pain?'d-ink':'d-muted'}"${pain?' font-weight="700"':''}`)})})});
 return svg(W,H,b,'페르소나별 건강 여정 맵')}
NH['personas']={
 intro:'“환자”는 한 사람이 아닙니다. 네이버 헬스케어가 만날 사람들을 <b>가상의 페르소나 4명</b>으로 나누고, 각자의 여정에서 <b>어디가 막히는지</b>를 찾아봅니다.',
 summary:[
  '페르소나는 <b>공개 통계에 근거한 가상 인물</b>이다. 만성질환 진료 인원 <b>2,294만 명</b>, 65세 이상 <b>970만 명</b>이 배경이다.',
  '<b>워킹맘</b>은 아이 진료의 <b>대기와 대리 처리</b>, <b>50대 직장인</b>은 <b>검진 결과 이후의 행동</b>에서 막힌다.',
  '<b>70대 어르신</b>은 화면보다 <b>목소리와 보호자</b>가 필요하고, <b>의원 원장</b>은 <b>진료 흐름을 끊지 않는 도구</b>를 원한다.',
  '고혈압 유병자 <b>3명 중 1명은 치료받지 않고</b>, 당뇨 유병자 중 혈당 조절 목표 도달은 <b>4명 중 1명</b>이다. 진료 후 관리가 비어 있다.',
  '공통 기회는 <b>진료 후 관리</b>. 네이버의 검색·예약·EMR·케어콜이 <b>여정의 빈칸</b>을 채울 수 있다.'
 ],
 sources:S11,
 sections:[
  {id:'overview',title:'한눈에 보기',html:lead('통계가 말하는 것은 하나입니다. <b>진료실 밖, 진료 후의 시간</b>이 길어지고 있고, 그 시간을 도와주는 서비스는 아직 부족합니다.')+
   stats([['2,294','만','만성질환 진료 인원 (2024년)'],['970','만','65세 이상 건강보험 적용 인구 (2024년)'],['66.9','%','고혈압 유병자 치료율'],['24.2','%','당뇨 유병자 중 혈당 조절 목표 도달 비율']])+
   callout('주의','가상 페르소나입니다',`아래 인물은 공개 통계와 일반적인 서비스 이용 맥락을 바탕으로 만든 <b>학습용 가상 인물</b>입니다. 실제 서비스 설계에서는 인터뷰·로그 데이터로 검증해야 합니다.`)},
  {id:'persona',title:'페르소나 4명',html:pillars([
    ['P1','지수 (38) · 워킹맘',['5살 아이가 자주 열이 나고 소아과 대기가 길다','퇴근 후 진료, 아이 기록을 남편과 나눠 보고 싶다','<b>바람</b>: 덜 기다리고, 아이 일을 대신 처리하기','<b>막힘</b>: 오픈런 접수, 아이 명의 인증·결제']],
    ['P2','민호 (52) · 직장인',['건강검진에서 혈압·혈당 “주의” 판정','바빠서 병원은 미루고 검색으로 먼저 찾아본다','<b>바람</b>: 내 결과가 괜찮은지 바로 알기','<b>막힘</b>: 검진 결과 이후 무엇을 해야 할지 모름']],
    ['P3','순자 (76) · 혼자 사는 어르신',['고혈압·관절 약을 꾸준히 먹는다','스마트폰은 전화·메시지 정도만, 자녀는 다른 도시','<b>바람</b>: 약을 잘 챙기고, 아플 때 연락할 곳','<b>막힘</b>: 앱 가입·인증, 작은 글씨, 혼자일 때의 불안']],
    ['P4','박 원장 (47) · 동네 내과 원장',['하루 외래 환자가 많고 재진 비중이 높다','오름차트 사용, 실손24 연계와 비대면진료 제도화를 고민','<b>바람</b>: 진료 흐름 유지, 반복 업무 줄이기','<b>막힘</b>: 시스템마다 다른 입력, 전화 문의 폭주']]
   ])},
  {id:'journey',title:'여정과 막히는 지점',html:fig(journeyMap([
    ['P1 지수',['밤에 아이 열|해열제 먹일까?','!가까운 소아과|오늘 진료?','!오픈런 접수|대기 1시간','진료 · 처방','!약 먹이기|어린이집 서류']],
    ['P2 민호',['!검진 결과|“주의” 판정','검색으로|수치 의미 찾기','!병원은 미룸|시간이 없다','진료 · 약 처방','!약을 자주 잊음|재검 놓침']],
    ['P3 순자',['무릎 통증|혈압약 남은 양','!어디에 물어볼지|모름','!자녀 도움 필요|교통편','진료 · 반복 처방','!혼자 복약|이상 신호 놓침']],
    ['P4 원장',['오전 예약·접수|목록 확인','!전화 문의|점심 공백','!같은 정보|반복 입력','진료 · 기록','!청구·서류|결과 안내 전화']]
   ]),'녹색 칸이 주요 막힘 지점입니다. 공개 자료와 일반 맥락을 바탕으로 만든 가상 여정입니다.')+
   h3('여정에서 보이는 패턴')+pillars([
    ['패턴 1','진료 후가 가장 비어 있다',['복약·재검·생활 관리가 개인에게 맡겨짐','고혈압 3명 중 1명 미치료, 당뇨 조절 목표 도달 4명 중 1명']],
    ['패턴 2','대신 해주는 사람이 있다',['아이는 부모가, 어르신은 자녀가 처리','대리 권한과 공유 범위 설계가 필요']],
    ['패턴 3','검색이 첫 행동이다',['병원보다 먼저 검색으로 “괜찮은지” 확인','검색 → 예약 연결이 자연스러워야 함']]
   ])},
  {id:'naver',title:'네이버가 채울 수 있는 빈칸',html:table(['페르소나','막힘','네이버 자산','아이디어'],[
    ['P1 지수','오픈런 접수, 대리 처리','네이버 예약, 오름차트, 클레 가족 관리','지도에서 “지금 접수 가능한 소아과” → 원격 접수 → 대기 알림, 아이 기록은 가족 공유'],
    ['P2 민호','검진 결과 이후 행동','AI 브리핑, 하이퍼클로바X, 네이버 예약','검진 결과를 쉬운 말로 해석 → 재검 필요 시 가까운 내과 예약 → 복약 알림'],
    ['P3 순자','앱 장벽, 혼자일 때 불안','클로바 케어콜','케어콜이 복약·통증을 묻고 기억 → 이상 신호는 자녀에게 요약 → 재진 예약 도움'],
    ['P4 원장','전화 문의, 반복 입력','오름차트, Npay 커넥트, 실손24','사전 문진 결과가 차트에 바로, 결제·실손 청구 자동 연결, 결과 안내는 클레로']
   ])+callout('정리','한 문장으로',`네 사람의 공통 빈칸은 <b>진료 후의 시간</b>입니다. 네이버는 <b>검색(시작)과 EMR(병원)을 모두 가진</b> 드문 회사라, 그 사이를 이을 수 있습니다.`)},
  {id:'video',title:'영상으로 보기',html:videos([
   ['9YVTus3-BbU','네이버클라우드 클로바 케어콜, 일본 시장 진출','네이버클라우드','케어콜']
  ])},
  {id:'interview',title:'면접 체크포인트',html:qa([
   ['네이버 헬스케어의 핵심 사용자는 누구라고 보나?','<b>검색으로 건강을 먼저 찾는 모든 사람</b>이 입구지만, 가치가 큰 곳은 <b>만성질환자와 보호자</b>다. 진료 후 관리가 길고 반복되기 때문.'],
   ['어르신 사용자를 위한 UX에서 중요한 것은?','앱을 잘 쓰게 만들기보다 <b>앱이 없어도 되게</b>. 케어콜처럼 음성 중심, 그리고 보호자와의 연결.'],
   ['페르소나를 만들 때 주의할 점은?','통계와 인터뷰로 <b>근거를 남기고</b>, 가상의 이야기에 끌려가지 않기. 페르소나보다 <b>막히는 순간(Job)</b>에 집중.'],
   ['병원(원장)도 사용자로 봐야 하나?','그렇다. 환자 경험의 절반은 병원 안 시스템에서 결정된다. <b>B2B 사용자의 업무가 줄어야 B2C 경험도 좋아진다.</b>']
  ])+me(['<b>의료진·사용자 인터뷰 분석</b>으로 페르소나와 시나리오를 만든 경험','<b>B2C와 B2B를 함께 설계</b>한 경험 (사용자 앱 + 운영 도구)','<b>가족·대리 이용</b> 같은 예외 흐름을 구조화한 경험'])},
  {id:'source',title:'참고 자료',html:sources(S11,NOTE+' 페르소나와 여정은 학습용 가상 예시입니다.')}
 ]
};
})();
