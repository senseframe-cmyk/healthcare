// Rich study content per card. Keys match note ids in app.js.
(function(){
const S=[
 {n:1,title:'네이버 헬스케어 전담조직 10월 출범',outlet:'파이낸셜뉴스',date:'2026.09.08',url:'https://www.fnnews.com/news/202609082116568596'},
 {n:2,title:'네이버, 의료 AI 이어 시니어 케어까지···헬스케어 사업판 키운다',outlet:'뉴스웨이',date:'2026.11.03',url:'https://newsway.co.kr/news/view?ud=2026110216064398196'},
 {n:3,title:'네이버, 디지털 헬스케어 판 키운다…AI 접목될 가능성 높아',outlet:'글로벌이코노믹',date:'2026.09.28',url:'https://www.g-enews.com/article/ICT/2026/09/2026092809344691143d7a510102_1'},
 {n:4,title:'10년간 예열한 네이버, 헬스케어 속도 낸다',outlet:'비즈니스워치',date:'2026.09.28',url:'https://news.bizwatch.co.kr/article/mobile/2026/09/14/0028'},
 {n:5,title:'네이버, 클라우드 EMR 기업 세나클 인수',outlet:'메디게이트뉴스',date:'2025.11.26',url:'https://medigatenews.com/news/2406492325'},
 {n:6,title:'최인혁·위의석 대표 "네이버의 세나클 인수, 의사와 환자가 만족하는 헬스케어 서비스 꿈꾼다"',outlet:'메디게이트뉴스',date:'2026.01.06',url:'https://medigatenews.com/news/3391544136'},
 {n:7,title:'병원 수납 창구서 얼굴로 결제한다…세나클 오름차트, 네이버페이 커넥트 연동',outlet:'바이라인네트워크',date:'2026.09.15',url:'https://byline.network/2026/09/15_cenacle/'},
 {n:8,title:'사내 의료도 클라우드 전환… 네이버 부속의원, \'오름차트\'로 진료 혁신',outlet:'벤처스퀘어',date:'2026.07.20',url:'https://www.venturesquare.net/1099701/'},
 {n:9,title:'네이버 \'인수\' 카카오 \'매각\'…헬스케어 전략 주목',outlet:'데일리메디',date:'2025.11.27',url:'https://www.dailymedi.com/news/news_view.php?wr_id=931390'},
 {n:10,title:'\'최고의 사내병원\' 꿈꾸는 나군호 네이버 헬스케어연구소장',outlet:'메디게이트뉴스',date:'2022.09.16',url:'https://medigatenews.com/news/4256049158'},
 {n:11,title:'나군호 소장 "네이버 사내병원 3~4월 중 오픈…임직원 4300명·의료진 편의성 높여"',outlet:'메디게이트뉴스',date:'2022.01.22',url:'https://medigatenews.com/news/2760724789'},
 {n:12,title:'하나이비인후과병원, 네이버 스마트 서베이 활용한 AI 문진 서비스 가동',outlet:'메디게이트뉴스',date:'2023.05.29',url:'https://medigatenews.com/news/1167439782'},
 {n:13,title:'아플때 어디로 가지?…온라인 증상체크 서비스 \'네이버헬스케어\'가 답해준다',outlet:'메디게이트뉴스',date:'2025.03.01',url:'https://medigatenews.com/news/3745284062'},
 {n:14,title:'네이버, 주총서 AI 기반 헬스케어 서비스 확장 예고',outlet:'메디게이트뉴스',date:'2026.03.23',url:'https://www.medigatenews.com/news/3518931'},
 {n:15,title:'소버린 AI, 과기정통부 선정 5대 AI기업…네이버클라우드의 헬스케어 비전은',outlet:'메디게이트뉴스',date:'2025.08.21',url:'https://medigatenews.com/news/348183433'},
 {n:16,title:'의료 혁신에도 \'네이버클라우드\'…"이른 시일 내 서비스"',outlet:'바이라인네트워크',date:'2022.12.14',url:'https://byline.network/2022/12/14_navercloud_summit/'}
];
const T=n=>S.find(s=>s.n===n);
const c=(...ns)=>`<span class="cites">${ns.map(n=>`<a class="cite" href="#src-${n}" data-tip="${T(n).outlet} · ${T(n).date}">${n}</a>`).join('')}</span>`;
const yt=(id,title,channel,note)=>`<figure class="video-card" data-id="${id}" data-title="${title}"><div class="video-frame"><img class="video-thumb" src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy"><button class="video-toggle" type="button" aria-label="재생" aria-pressed="false"><svg class="i-play" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg><svg class="i-pause" viewBox="0 0 24 24"><path d="M7 5h3.6v14H7zM13.4 5H17v14h-3.6z"/></svg></button></div><figcaption><strong>${title}</strong><span>${channel}${note?` · ${note}`:''}</span><a class="video-link" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">youtube.com/watch?v=${id}</a></figcaption></figure>`;

const timeline=[
 ['2017~','D2SF, 헬스케어 스타트업 투자 시작','네이버의 스타트업 투자 조직 D2SF가 헬스케어에 꾸준히 투자. 2026년까지 29곳, 포트폴리오 중 약 16%.',[3,4]],
 ['2020.12','헬스케어연구소장 영입','세브란스병원 비뇨의학과 교수 출신 나군호 소장 합류. 이후 재활의학·내분비·가정의학·이비인후과 전문의가 함께함.',[10]],
 ['2021','클로바 케어콜 첫 시범','성남시와 코로나19 능동감시에 AI 전화를 적용. 11월 부산 해운대구 독거노인 100명 대상으로 확대.',[10]],
 ['2022.04','1784 사내 부속의원 오픈','임직원 4,300여 명 대상. 스마트서베이(AI 문진)·페이션트 서머리·보이스 EMR을 실제 진료에서 실증하는 테스트베드.',[10,11]],
 ['2022.05','클로바 케어콜 정식 출시','독거노인·중장년의 건강·식사·수면·정서를 확인하는 AI 안부 전화. 지자체로 확산.',[2]],
 ['2022.12','네이버클라우드 서밋','고려대안암병원과 P-HIS(병원정보시스템) 운영, 태국 헬스케어 스마트시티 참여 등 B2B 사례 공개.',[16]],
 ['2023.05','스마트서베이 첫 외부 병원 적용','하나이비인후과병원이 AI 문진을 도입. 사내병원 밖으로 나간 첫 사례.',[12]],
 ['2024.09','증상체크 서비스 출시','증상을 입력하면 예상 질환 정보와 가까운 병원을 보여주고 네이버 예약으로 연결.',[13]],
 ['2025.05','테크비즈니스 부문 신설','최인혁 전 COO 복귀, 헬스케어 등 신사업을 맡는 부문의 대표로.',[4]],
 ['2025.08~10','헬스케어 투자 가속','제이앤피메디(임상시험 플랫폼) 전략 투자, 인바디 지분 8.5%(약 325억 원) 확보.',[9]],
 ['2025.11','세나클 최대주주','클라우드 EMR ‘오름차트’ 운영사 세나클에 추가 투자(기존 지분 8.8%)해 사실상 인수.',[5]],
 ['2026.03','주총에서 ‘건강 AI 에이전트’ 예고','최수연 대표, 전 서비스 AI 에이전트 도입과 연내 건강 에이전트 공개 발표. 의료 AI(어플라이드 AI) 그룹도 테크비즈니스로 이관.',[14,1]],
 ['2026.04','케어콜, 일본 판매','라인웍스(LINE WORKS)를 통해 일본에서 정식 판매.',[2]],
 ['2026.07','사내 부속의원, 오름차트로 전환','네이버웍스·네이버 예약 기반 사전 문진·건강 리포트를 하나의 진료 흐름으로.',[8]],
 ['2026.09','오름차트 × Npay 커넥트','병원 수납 창구에서 카드·QR·얼굴인식(페이스사인) 결제까지.',[7]],
 ['2026.10','헬스케어 전담조직 출범','테크비즈니스 부문 산하. 세나클 위의석·박찬희 공동대표가 이끄는 것으로 보도.',[1,2]]
];

const pillars=[
 ['B2B','의료기관 인프라','<li>의원급 클라우드 EMR <b>오름차트</b> — 예약·접수·청구·처방·환자관리'+c(1)+'</li><li>EMR에 클라우드·AI를 얹어 진료기록 작성, 환자 정보 요약 같은 반복 업무를 줄이는 방향'+c(2,4)+'</li><li>대형·상급종합병원 클라우드·AI 지원, 공공(B2G)으로 확장 여지'+c(4)+'</li>'],
 ['B2C','건강 AI 에이전트','<li>건강 정보·탐색 맥락으로 병원을 추천하고 <b>예약·방문까지</b> 잇는 에이전트, 2026년 내 공개 예고'+c(14)+'</li><li>건강검진 결과 분석·건강관리 기능 포함'+c(2)+'</li><li>베타 ‘네이버 헬스케어’ — 증상체크·만보기·복약관리·인바디 연동'+c(3)+'</li>'],
 ['CARE','시니어 돌봄','<li><b>클로바 케어콜</b> — 하이퍼클로바X 기반, 이전 대화를 기억하는 AI 안부 전화'+c(2)+'</li><li>이모코그(인지건강)·인바디(체성분)와 제휴해 치매 예방·건강 데이터 돌봄으로 확장'+c(2)+'</li><li>라인웍스로 일본 시장 판매'+c(2)+'</li>'],
 ['AI','의료 특화 AI · 투자','<li>의료 LLM <b>KMed.ai</b>를 만든 어플라이드 AI 그룹을 사업 부문으로 이동'+c(1,3)+'</li><li>D2SF 헬스케어 투자 29곳, 인바디·제이앤피메디 등 데이터 접점 확보'+c(3,9)+'</li><li>방향은 아직 B2B 중심일 가능성이 높다는 내부 코멘트'+c(3)+'</li>']
];

const news=[
 ['2026.11.03','뉴스웨이',2,'의료 AI 이어 시니어 케어까지','케어콜 별도 약관, 이모코그·인바디 제휴, 헬스 에이전트 공개 임박.'],
 ['2026.09.28','비즈니스워치',4,'10년간 예열한 네이버, 헬스케어 속도 낸다','EMR+AI로 반복 업무 축소, 대형병원 B2B와 B2G까지 그림.'],
 ['2026.09.15','바이라인네트워크',7,'오름차트, 네이버페이 커넥트 연동','진료 → 수납까지 네이버 결제 인프라가 병원 안으로.'],
 ['2026.09.08','파이낸셜뉴스',1,'헬스케어 전담조직 10월 출범','세나클 공동대표가 이끄는 조직, 테크비즈니스 부문 산하.'],
 ['2026.03.23','메디게이트뉴스',14,'주총서 AI 기반 헬스케어 확장 예고','“검색·금융·건강·지도 전 영역 AI 에이전트 도입”.'],
 ['2025.11.27','데일리메디',9,'네이버 ‘인수’ 카카오 ‘매각’','같은 시기, 정반대의 헬스케어 전략.'],
 ['2025.11.26','메디게이트뉴스',5,'클라우드 EMR 기업 세나클 인수','오름차트·환자 앱 ‘클레’ 보유, 2025 TIME 헬스테크 선정.']
];

const journey=[
 ['검색 · 증상체크','네이버 헬스케어'],
 ['병원 찾기 · 예약','플레이스 · 네이버 예약'],
 ['사전 문진','스마트서베이'],
 ['진료 · 기록','오름차트 + AI'],
 ['수납','Npay 커넥트'],
 ['사후 관리','케어콜 · 인바디']
];

const qa=[
 ['왜 EMR 회사(세나클)를 품었을까?','진료 현장의 업무와 데이터가 시작되는 곳이 EMR. 예약(플레이스)–진료(오름차트)–결제(Npay)를 하나의 흐름으로 묶는 허브가 된다. 일부 진료과 신규 개원 점유율 60% 이상, 2025년 성장률 약 100%.'+c(6)],
 ['카카오헬스케어와 무엇이 다른가?','네이버는 지분 확보로 <b>인프라를 강화</b>하는 쪽, 카카오는 2025년 11월 차 그룹에 경영권(81.7%)을 넘기며 <b>효율화</b>를 택했다.'+c(9)],
 ['UX에서 가장 어려운 문제는?','의료진의 접수–대기–진료–청구 흐름을 깨지 않고 AI를 얹는 것. AI 요약의 신뢰·책임 범위, 기존 EMR에서 옮겨 오는 전환 비용(신규 가입의 절반 이상이 이전 고객)을 함께 봐야 한다.'+c(6)],
 ['건강 에이전트에서 던질 질문','진단·추천의 경계는 어디까지인가, 건강 정보 활용 동의는 어떻게 설계하나, 병원 추천의 공정성은 어떻게 설명하나. <span class="muted">(정리용 질문)</span>']
];

window.NH_CONTENT={
 'naver-ecosystem':{
  summary:[
   '네이버는 2017년 D2SF 투자부터 <b>약 10년간 헬스케어를 ‘예열’</b>했고, <b>2026년 10월 전담조직</b>을 만들며 본격적인 사업화에 들어갔다.',
   '중심에는 의원급 클라우드 EMR <b>‘오름차트’의 세나클</b>이 있다. <b>2025년 11월 최대주주</b>가 됐고, 세나클 공동대표가 전담조직을 이끈다.',
   '2022년 문을 연 <b>사내 부속의원은 테스트베드</b>로, AI 문진·환자 요약·보이스 EMR을 실증해 왔고 지금은 오름차트로 진료한다.',
   '사용자 쪽에서는 증상→병원 추천→예약을 잇는 <b>‘건강 AI 에이전트’</b>(2026년 내 공개 예고)와 시니어 돌봄 <b>‘클로바 케어콜’</b>이 축이다.',
   '검색·예약·결제·클라우드를 진료 전후로 잇는 <b>‘인프라형’ 전략</b>이 핵심이며, 경영권을 넘긴 <b>카카오헬스케어와 대비</b>된다.'
  ],
  intro:'네이버 헬스케어는 하나의 앱이 아니라, 검색에서 진료와 돌봄까지 이어지는 <b>연결의 구조</b>입니다.',
  sources:S,
  sections:[
   {id:'overview',title:'한눈에 보기',html:`
<div class="rich-lead">네이버는 병원 하나, 서비스 하나를 만드는 대신 <b>환자 여정의 각 지점에 이미 가진 서비스</b>를 놓고, 비어 있던 진료 현장(EMR)을 세나클로 채웠습니다.${c(4,5)}</div>
<div class="stat-grid">
 <div class="stat"><strong>29<small>곳</small></strong><span>D2SF가 투자한 헬스케어 기업 (2017~2026)</span>${c(3)}</div>
 <div class="stat"><strong>8.5<small>%</small></strong><span>인바디 지분 확보 · 약 325억 원 (2025.10)</span>${c(9)}</div>
 <div class="stat"><strong>~100<small>%</small></strong><span>오름차트 2025년 전년 대비 성장률</span>${c(6)}</div>
 <div class="stat"><strong>2026. 10.</strong><span>헬스케어 전담조직 출범</span>${c(1)}</div>
</div>
<h3 class="rich-h3">환자 여정 위의 네이버</h3>
<ol class="journey">${journey.map(([a,b],i)=>`<li><span class="j-step">0${i+1}</span><strong>${a}</strong><span>${b}</span></li>`).join('')}</ol>`},
   {id:'history',title:'히스토리',html:`
<ol class="timeline">${timeline.map(([d,t,p,ns])=>`<li><time>${d}</time><div><strong>${t}</strong><span>${p}${c(...ns)}</span></div></li>`).join('')}</ol>`},
   {id:'direction',title:'최근 방향',html:`
<div class="rich-lead">2026년 하반기 기준, 네이버 헬스케어는 네 갈래로 움직이고 있습니다.</div>
<div class="pillar-grid" data-peek>${pillars.map(([k,t,l])=>`<article class="pillar${k==='B2C'?' has-peek':''}">${k==='B2C'?'<span class="peek-buddy" aria-hidden="true"><i></i><i></i></span>':''}<span class="pillar-key">${k}</span><h3>${t}</h3><ul>${l}</ul></article>`).join('')}</div>`},
   {id:'news',title:'주요 뉴스',html:`
<ul class="news-list">${news.map(([d,o,n,t,p])=>`<li><a href="${T(n).url}" target="_blank" rel="noopener"><time>${d}</time><span class="news-outlet">${o}</span><strong>${t}</strong><span class="news-take">${p}</span><span class="news-arrow" aria-hidden="true">↗</span></a></li>`).join('')}</ul>`},
   {id:'video',title:'영상으로 보기',html:`
<div class="video-grid">
${yt('9YVTus3-BbU','AI 안부 전화 네이버 케어콜, 국경을 넘어 일본에 온기를 전하다','네이버클라우드','케어콜 일본 진출')}
${yt('rpyQ8bUlWVY','[AWC 2024] 차동철 네이버 헬스케어연구소 의료혁신센터장','THE AI TV','사내병원·의료 AI 발표')}
${yt('KAIOVUvW0vQ','네이버의 헬스케어 베팅, 핵심은 ‘데이터’','thebell','투자 관점 해설')}
</div>`},
   {id:'interview',title:'면접 체크포인트',html:`
<div class="qa-grid">${qa.map(([q,a],i)=>`<article class="qa"><span class="qa-q">Q${i+1}</span><h3>${q}</h3><div>${a}</div></article>`).join('')}</div>
<div class="link-me" data-peek><span class="peek-buddy" aria-hidden="true"><i></i><i></i></span><span class="pillar-key">ME</span><h3>내 경험과 연결할 포인트</h3><ul>
<li>통신·금융·보험처럼 <b>정책과 예외가 많은 서비스</b>를 구조화한 경험 → 진료·청구·보험 연동이 얽힌 의원 EMR 흐름</li>
<li>헬스케어 기업 AI-Native EHR 컨설팅의 <b>의사·간호사 인터뷰와 진료 시나리오</b> → 오름차트의 AI 진료 지원 설계</li>
<li><b>AI 전화</b> 서비스 출시 경험 → 클로바 케어콜 같은 시니어 대상 대화형 UX</li></ul></div>`},
   {id:'source',title:'참고 자료',html:`
<ol class="source-list">${S.map(s=>{const host=new URL(s.url).hostname.replace(/^www\.|^m\./,'');return `<li id="src-${s.n}"><a href="${s.url}" target="_blank" rel="noopener"><span class="src-n">${s.n}</span><span class="src-body"><span class="src-title">${s.title}</span><span class="src-meta"><img class="src-fav" src="https://www.google.com/s2/favicons?domain=${host}&amp;sz=64" alt="" loading="lazy" onerror="this.remove()">${s.outlet} · ${s.date}</span></span><span class="src-arrow" aria-hidden="true">↗</span></a></li>`}).join('')}</ol>
<p class="source-note">2026년 11월 10일 기준 공개 기사로 정리했습니다. 보도마다 표현(‘인수’/‘최대주주’, 조직 출범 시점)이 조금씩 달라 면접 전 원문 확인을 권합니다.</p>`}
  ]
 }
};
})();
