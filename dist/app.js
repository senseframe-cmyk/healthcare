const notes=[
{id:'domain-basics',title:'Speak the language.',sub:'도메인 기초 용어와 의원의 하루',category:'Healthcare',tags:['Healthcare','Basics'],asset:'chart',createdAt:'2026-11-17'},
{id:'ux-cases',title:'Care, well designed.',sub:'헬스케어 UX 우수 사례',category:'Healthcare',tags:['Healthcare','UX'],asset:'orb',createdAt:'2026-11-17'},
{id:'kr-regulation',title:'Rules of care.',sub:'국내 디지털 헬스케어 제도 지도',category:'Healthcare',tags:['Healthcare','Policy'],asset:'chart',createdAt:'2026-11-16'},
{id:'kr-competition',title:'Who holds the door.',sub:'국내 헬스케어 플랫폼 경쟁 지도',category:'Healthcare',tags:['Healthcare','Market'],asset:'chart',createdAt:'2026-11-16'},
{id:'cenacle-ormchart',title:'Inside the chart.',sub:'세나클과 오름차트, 그리고 클레',category:'Healthcare',tags:['Healthcare'],asset:'chart',createdAt:'2026-11-15'},
{id:'emr-ehr',title:'Records that reach beyond.',sub:'EMR·EHR, AI와 병원 밖으로',category:'Healthcare',tags:['Healthcare','EMR'],asset:'chart',createdAt:'2026-11-15'},
{id:'bigtech-health',title:'Big tech, bigger care.',sub:'애플·구글·MS의 헬스케어 AI',category:'Healthcare',tags:['Healthcare','Big Tech'],asset:'watch',createdAt:'2026-11-15'},
{id:'personal-agents',title:'Agents that act.',sub:'개인 AI 에이전트 지도 2026',category:'AI',tags:['AI','Agent'],asset:'chip',createdAt:'2026-11-15'},
{id:'healthcare-ux',title:'Design for care.',sub:'헬스케어 UX, 무엇을 고려할까',category:'Healthcare',tags:['Healthcare','UX'],asset:'orb',createdAt:'2026-11-15'},
{id:'naver-assets',title:'Assets in hand.',sub:'네이버 안의 헬스케어 자산',category:'Healthcare',tags:['Healthcare','Naver'],asset:'folder',createdAt:'2026-11-16'},
{id:'personas',title:'People, not patients.',sub:'환자 페르소나와 여정',category:'Healthcare',tags:['Healthcare','UX'],asset:'watch',createdAt:'2026-11-17'},
{id:'interview-notes',title:'Ready for the room.',sub:'2차 면접 실전 노트',category:'Healthcare',tags:['Private'],asset:'calendar',lock:1,createdAt:'2026-11-18'},
{id:'naver-ecosystem',title:'A more connected tomorrow.',sub:'네이버 헬스케어 생태계',category:'Healthcare',tags:['Naver'],asset:'folder'}
].map((c,i)=>({...c,tags:[...new Set([...c.tags,...(c.sub.includes('세나클')?['CENACLE']:[]),...(c.sub.includes('면접')?['INTERVIEW']:[])])],createdAt:c.createdAt||'2026-11-07',sequence:i,type:c.category,color:'#ededed',base:'#ededed'})).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)||b.sequence-a.sequence);

const root=document.documentElement,main=document.querySelector('#main');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const theme=document.querySelector('.theme-toggle'),drawerTheme=document.querySelector('.drawer-theme');
const drawer=document.querySelector('#mobile-menu'),menuToggle=document.querySelector('.menu-toggle');
const categories=[['all','ALL'],['healthcare','HEALTHCARE'],['ai','AI']];
const noteCategory=n=>n.category.toLowerCase();
const count=category=>notes.filter(n=>category==='all'||noteCategory(n)===category).length;
const gridColumns=()=>innerWidth>=1600?6:innerWidth>=1350?5:innerWidth>=1100?4:innerWidth>=900?3:innerWidth>=701?2:1;
const ctx=document.createElement('canvas').getContext('2d');
let rows=[],active='all',cardObserver,revealObserver,cardTimers=[],stopReading=()=>{},homeScroll=0,entered=false,currentNote,stopHomeHeader=()=>{},stopInterludes=()=>{};
let nextWord='INSIGHT',rolling=false;
const brand=document.querySelector('.brand');
brand.innerHTML=Array.from(brand.textContent).map((ch,i)=>`<span class="brand-char" style="--char:${i}" aria-hidden="true">${ch===' '?'&nbsp;':ch}</span>`).join('');
function dateLabel(n){return new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}).formatToParts(new Date(n.createdAt+'T12:00:00Z')).filter(p=>p.type!=='literal').map(p=>p.value).join('. ')+'.'}
function rollMarkup(){return `<span class="rolling-word" aria-hidden="true">${Array.from('INSIGHT').map((_,i)=>`<span class="roll-slot" style="--delay:${i*45}ms"><span class="roll-current">${nextWord[i]||''}</span><span class="roll-incoming">${(nextWord==='INSIGHT'?'FUTURE':'INSIGHT')[i]||''}</span></span>`).join('')}</span>`}
function fitRoll(word,term){const cs=getComputedStyle(word);ctx.font=`${cs.fontWeight} 1000px ${cs.fontFamily}`;let prev=0;word.querySelectorAll('.roll-slot').forEach((slot,i)=>{const advance=ctx.measureText(term.slice(0,i+1)).width;slot.style.width=((advance-prev)/1000)+'em';prev=advance})}
function fitWords(){rows.forEach(row=>{const el=row.querySelector('.word'),cs=getComputedStyle(el);ctx.font=`${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;el.style.width=Math.max(0,ctx.measureText(el.dataset.text).width+(parseFloat(cs.letterSpacing)||0)*el.dataset.text.length)+'px'});document.querySelectorAll('.rolling-word').forEach(w=>fitRoll(w,nextWord))}
function advanceWord(){if(rolling||document.hidden||reduced.matches)return;const words=Array.from(document.querySelectorAll('.rolling-word'));if(!words.length)return;rolling=true;const target=nextWord==='INSIGHT'?'FUTURE':'INSIGHT';words.forEach(w=>{fitRoll(w,target);w.querySelectorAll('.roll-slot').forEach((slot,i)=>{slot.querySelector('.roll-current').textContent=nextWord[i]||'';slot.querySelector('.roll-incoming').textContent=target[i]||''})});requestAnimationFrame(()=>requestAnimationFrame(()=>words.forEach(w=>w.classList.add('is-rolling'))));setTimeout(()=>{nextWord=target;document.querySelectorAll('.rolling-word').forEach(w=>{w.classList.add('resetting');w.classList.remove('is-rolling');w.querySelectorAll('.roll-slot').forEach((slot,i)=>{slot.querySelector('.roll-current').textContent=nextWord[i]||'';slot.querySelector('.roll-incoming').textContent=(nextWord==='INSIGHT'?'FUTURE':'INSIGHT')[i]||''});fitRoll(w,nextWord)});requestAnimationFrame(()=>requestAnimationFrame(()=>document.querySelectorAll('.rolling-word').forEach(w=>w.classList.remove('resetting'))));rolling=false},1050)}
function scramble(el,duration=650){const text=el.dataset.text;if(reduced.matches){el.textContent=text;el.closest('.menu-row').classList.add('is-settled');paintMenuGlyphs(el.closest('.menu-row'));return}const start=performance.now(),glyphs='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';let last=0;function frame(now){if(!el.isConnected)return;const p=Math.min(1,(now-start)/duration);if(now-last>45||p===1){el.textContent=Array.from(text).map((ch,i)=>i<Math.floor(p*text.length)?ch:glyphs[Math.floor(Math.random()*glyphs.length)]).join('');last=now}if(p<1)requestAnimationFrame(frame);else{el.closest('.menu-row').classList.add('is-settled');paintMenuGlyphs(el.closest('.menu-row'));}}requestAnimationFrame(frame)}
function syncNavigation(){root.dataset.selection=active;const nav=document.querySelector('.detail-category-nav');const visible=!currentNote&&document.body.classList.contains('scrolled-menu');nav.inert=!visible;nav.setAttribute('aria-hidden',String(!visible));document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===active)));rows.forEach(r=>r.setAttribute('aria-pressed',String(r.dataset.category===active)));document.querySelector('#selection-status').textContent=`${active.toUpperCase()} 선택됨`}
function select(category,focusListing=false){if(!categories.some(([id])=>id===category))return;active=category;closeMenu();if(currentNote){homeScroll=0;location.hash=category;return}history.replaceState(null,'','#'+category);syncNavigation();renderCards(false);if(focusListing){const collection=main.querySelector('.collection'),bar=document.querySelector('.topbar');main.style.paddingBottom='0px';const target=Math.max(0,collection.getBoundingClientRect().top+scrollY-bar.getBoundingClientRect().bottom-36),naturalMax=Math.max(0,document.documentElement.scrollHeight-innerHeight);main.style.paddingBottom=Math.max(0,target-naturalMax)+'px';scrollTo({top:target,behavior:'instant'});dispatchEvent(new Event('scroll'))}document.title=`Naver Healthcare — ${category.toUpperCase()}`}
function categoryButtons(cls){return categories.map(([id,label])=>`<button class="${cls}" aria-label="${label} 콘텐츠 ${count(id)}개" data-filter="${id}" data-category="${id}" aria-pressed="${id===active}"><span>${label}</span><span class="category-separator" aria-hidden="true">·</span><span class="category-count">${count(id)}</span></button>`).join('')}
document.querySelector('.detail-category-nav').innerHTML=categoryButtons('header-category');
document.querySelector('.drawer-options').innerHTML=categoryButtons('drawer-option');
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>select(b.dataset.filter,b.classList.contains('header-category')));document.querySelector('.drawer-head>span').remove();document.querySelector('.drawer-head').insertAdjacentHTML('afterbegin','<span class="drawer-brand">NAVER HEALTHCARE</span>');document.querySelector('.drawer-options').insertAdjacentHTML('afterend',`<div class="drawer-next" aria-label="NEXT INSIGHT"><span>NEXT</span>${rollMarkup()}</div>`);
brand.onclick=e=>{e.preventDefault();document.body.classList.remove('listing-focused','scrolled-menu');homeScroll=0;select('all');scrollTo({top:0,behavior:'instant'});dispatchEvent(new Event('scroll'))};
function closeMenu(){if(typeof dotCursor!=='undefined'&&dotCursor.parentElement!==document.body)document.body.append(dotCursor);document.body.style.removeProperty('overflow');if(drawer.open)drawer.close();menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','메뉴 열기')}
menuToggle.onclick=()=>{const r=menuToggle.getBoundingClientRect();drawer.style.setProperty('--close-top',r.top+'px');drawer.style.setProperty('--close-right',(innerWidth-r.right)+'px');drawer.style.setProperty('--close-size',r.width+'px');drawer.showModal();drawer.append(dotCursor);document.body.style.overflow='hidden';menuToggle.setAttribute('aria-expanded','true')};
document.querySelector('.close-menu').onclick=closeMenu;drawer.addEventListener('close',closeMenu);drawer.addEventListener('click',e=>{if(e.target===drawer)closeMenu()});
function syncTheme(){const dark=root.dataset.theme==='dark';theme.setAttribute('aria-pressed',String(dark));theme.setAttribute('aria-label',dark?'라이트 테마로 전환':'다크 테마로 전환');drawerTheme.setAttribute('aria-checked',String(dark));document.querySelector('meta[name="theme-color"]').content=dark?'#000000':'#f6f6f6'}
function toggleTheme(){root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('nh-dot-theme',root.dataset.theme)}catch{}syncTheme()}
theme.onclick=toggleTheme;drawerTheme.onclick=toggleTheme;syncTheme();
function tagMarkup(n){const primary=noteCategory(n)==='ai'?'AI':'HEALTHCARE';const extras=n.tags.filter(t=>t.toUpperCase()!==primary);return `<div class="topic-tags"><span class="topic-tag">${primary}</span>${extras.map(t=>`<span class="topic-tag secondary-tag">${t.toUpperCase()}</span>`).join('')}</div>`}
const ART={
 'naver-ecosystem':{style:'ascii',shape:'heart',mode:'hover',chars:'ascii',bg:'#e3f3df',ink:'#17803a'},
 'naver-assets':{style:'tunnel',bg:'#d6f0db',ink:'#17803a'},
 'cenacle-ormchart':{style:'cenacle',bg:'#eef2fb',ink:'#3656d0'},
 'emr-ehr':{style:'rain3d',shape:'cross',bg:'#eef3fb',ink:'#16207a'},
 'kr-regulation':{style:'digits3d',letter:'h',bg:'#0a1330',ink:'#e3ecff',dark:1},
 'kr-competition':{style:'reeded',bg:'#d9d9de',ink:'#0b0b0c'},
 'domain-basics':{style:'flow',bg:'radial-gradient(120% 90% at 50% 55%,#1f4fd8 0%,#3f72ea 42%,#9dbaf4 100%)',ink:'#ffffff',dark:1},
 'bigtech-health':{style:'gboxes',bg:'#e9e6f1',ink:'#111111'},
 'personal-agents':{style:'ascii',shape:'bubble',mode:'float',chars:'binary',bg:'#1d1d1f',ink:'#ff9a57',dark:1},
 'interview-notes':{style:'cells',shape:'lock',bg:'#0b0b0c',ink:'#f5f5f7',dark:1},
 'healthcare-ux':{style:'tetris',bg:'#0b0b0c',ink:'#ffffff',dark:1},
 'ux-cases':{style:'morph',bg:'#fbe8ee',ink:'#b3234d'},
 'personas':{style:'mosaic',bg:'#0a0b26',ink:'#ffffff',dark:1}};
const artCanvas=(a,kind)=>`<canvas class="ascii-art" data-kind="${kind}" data-style="${a.style||'ascii'}" data-shape="${a.shape||''}" data-mode="${a.mode||'spin'}" data-chars="${a.chars||'ascii'}" data-letter="${a.letter||''}" aria-hidden="true"></canvas>`;
const artStyle=a=>`--art-bg:${a.bg};--art-ink:${a.ink}`;
const lockBack=()=>`<span class="lock-back"><span class="lock-title">비밀번호 4자리</span><span class="pin">${'<input type="password" inputmode="numeric" pattern="[0-9]*" maxlength="1" autocomplete="off" aria-label="비밀번호 숫자">'.repeat(4)}</span><span class="lock-msg" aria-live="polite">숫자 4자리를 입력하세요</span><span class="lock-close" role="button" tabindex="0">닫기</span></span>`;
function card(n,i){const art=ART[n.id];return `<a class="card${art?' has-art':''}${art&&art.dark?' art-dark':''}${n.lock?' lock-card':''}" data-category="${noteCategory(n)}" href="#content/${n.id}" aria-label="${n.sub} 상세 보기" style="--column:${i%(gridColumns())}${art?';'+artStyle(art):''}">${tagMarkup(n)}${art?artCanvas(art,'card'):''}<span class="card-copy"><span class="card-title loading-field"><span class="field-text">${n.sub}</span><span class="title-skeleton" aria-hidden="true"><i class="skeleton"></i></span></span><time class="card-date loading-field" datetime="${n.createdAt}"><span class="field-text">${dateLabel(n)}</span><i class="date-skeleton skeleton" aria-hidden="true"></i></time></span>${n.lock?lockBack():''}</a>`}
function watchCards(container,initial=false){cardObserver?.disconnect();cardTimers.forEach(clearTimeout);cardTimers=[];const readyAt=performance.now()+(initial&&!reduced.matches?(innerWidth<=700?1250:2750):0);cardObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;cardObserver.unobserve(e.target);const c=e.target;const delay=Math.max(0,readyAt-performance.now())+(reduced.matches?0:Number(c.style.getPropertyValue('--column'))*80);cardTimers.push(setTimeout(()=>{if(!c.isConnected)return;c.classList.add('is-visible');cardTimers.push(setTimeout(()=>{if(c.isConnected)c.classList.add('is-loaded')},reduced.matches?0:420))},delay))}),{rootMargin:'0px 0px 100px 0px',threshold:.01});container.querySelectorAll('.card').forEach(c=>cardObserver.observe(c))}
const interludeSeeds=[Math.random(),Math.random()];
function renderCards(initial=false){stopInterludes();const selected=notes.filter(n=>active==='all'||noteCategory(n)===active);const c=main.querySelector('#cards');const columns=gridColumns()===1?6:gridColumns();const items=[...selected];if(selected.length>=6){const first=1+Math.floor(interludeSeeds[0]*(columns-1));const second=columns+Math.floor(interludeSeeds[1]*Math.min(columns,selected.length+2-columns));items.splice(first,0,null);items.splice(second,0,null)}c.innerHTML=items.map((n,i)=>n?card(n,i):`<div class="card interlude-card" role="img" aria-label="그라데이션 하트가 떨어지고 튕기는 놀이 영역" style="--column:${i%(gridColumns())}"></div>`).join('');main.querySelector('#card-count').textContent=`${active.toUpperCase()} 콘텐츠 ${selected.length}개`;watchCards(c,initial);stopInterludes=setupHeartPlaygrounds(c)}
const footer=()=>'<footer class="site-footer">© 2026</footer>';
function cleanup(){stopInterludes();stopHomeHeader();main.style.removeProperty('padding-bottom');document.body.classList.remove('scrolled-menu','listing-focused');cardObserver?.disconnect();revealObserver?.disconnect();cardTimers.forEach(clearTimeout);cardTimers=[];stopReading()}
function home(initial=false){cleanup();currentNote=null;document.body.classList.remove('detail-page');main.dataset.reentry=String(!initial);main.innerHTML=`<nav class="index-menu" aria-label="콘텐츠 카테고리">${categories.map(([id,label],i)=>`<button class="menu-row" data-category="${id}" aria-pressed="${id===active}" aria-label="${label} 콘텐츠 ${count(id)}개" style="--row:${i}"><span class="menu-label"><span class="word" data-text="${label}" aria-hidden="true">${label}</span><span class="title-period" aria-hidden="true">·</span><span class="menu-total" aria-hidden="true">${count(id)}</span></span></button>`).join('')}<div class="menu-row next-action" style="--row:3" aria-label="NEXT INSIGHT"><span class="next-prefix">NEXT</span>${rollMarkup()}</div></nav><section class="collection" aria-label="학습 콘텐츠"><div class="cards" id="cards"></div><p class="sr-only" id="card-count" role="status"></p></section>${footer()}`;rows=Array.from(main.querySelectorAll('.menu-row[data-category]'));rows.forEach(row=>row.onclick=()=>select(row.dataset.category));fitWords();rows.forEach((row,i)=>{if(initial)setTimeout(()=>{if(row.isConnected)scramble(row.querySelector('.word'))},reduced.matches?0:1400+i*220);else{row.classList.add('is-settled');paintMenuGlyphs(row);}});renderCards(initial);syncNavigation();setupHomeHeader();document.title='Naver Healthcare — '+active.toUpperCase()}
function setupHomeHeader(){const collection=main.querySelector('.collection'),bar=document.querySelector('.topbar');let frame=0;function update(){frame=0;const runway=parseFloat(main.style.paddingBottom)||0;if(runway){const naturalMax=Math.max(0,document.documentElement.scrollHeight-innerHeight-runway),needed=Math.max(0,scrollY-naturalMax);if(needed<runway)main.style.paddingBottom=needed+'px'}const show=innerWidth>900&&(collection.getBoundingClientRect().top<=bar.getBoundingClientRect().bottom+75);document.body.classList.toggle('scrolled-menu',show);const nav=document.querySelector('.detail-category-nav');nav.inert=!show;nav.setAttribute('aria-hidden',String(!show))}function schedule(){if(!frame)frame=requestAnimationFrame(update)}addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});update();stopHomeHeader=()=>{removeEventListener('scroll',schedule);removeEventListener('resize',schedule);cancelAnimationFrame(frame)}}
const sections=[['what','핵심 내용','관련 소식과 핵심 내용을 정리합니다.'],['why','주요 인사이트','이 주제가 헬스케어와 AI, 사용자 경험에 갖는 의미를 기록합니다.'],['perspective','나의 관점','학습하며 떠오른 질문과 나의 관점을 정리합니다.'],['source','참고 자료','원문 링크와 참고 자료를 정리할 영역입니다. 실제 출처는 콘텐츠 추가 시 함께 작성됩니다.']];
function detail(n){cleanup();currentNote=n;rows=[];document.body.classList.add('detail-page');active=categories.some(([id])=>id===noteCategory(n))?noteCategory(n):'all';syncNavigation();const rich=window.NH_CONTENT?.[n.id],secs=rich?rich.sections.map(s=>[s.id,s.title]):sections;const related=notes.filter(x=>x.id!==n.id).sort((a,b)=>Number(b.category===n.category)-Number(a.category===n.category)).slice(0,6);main.innerHTML=`<article class="detail-article" data-category="${noteCategory(n)}"><header class="detail-hero section-reveal${ART[n.id]?' has-art':''}${ART[n.id]&&ART[n.id].dark?' art-dark':''}" data-category="${noteCategory(n)}"${ART[n.id]?` style="${artStyle(ART[n.id])}"`:''}>${tagMarkup(n)}${ART[n.id]?artCanvas(ART[n.id],'hero'):''}<div class="detail-heading"><h1>${n.sub}</h1><time datetime="${n.createdAt}">${dateLabel(n)}</time></div></header><div class="reading-layout"><nav class="article-toc" aria-label="콘텐츠 내비게이션">${secs.map(([id,title],i)=>`<button data-section="${id}"><span>0${i+1}</span>${title}</button>`).join('')}</nav><div class="article-body">${rich?richBody(rich):`<p class="article-intro section-reveal">이 주제를 이해하고, 나의 관점으로 정리하는 공간입니다.</p><p class="sample-notice section-reveal">학습 화면을 위한 더미 콘텐츠입니다. 실제 기사·분석·출처는 추후 추가됩니다.</p>${sections.map(([id,title,p],i)=>`<section class="article-section section-reveal" id="${id}"><span class="section-number">0${i+1}</span><h2>${title}</h2><p>${p}</p></section>`).join('')}`}</div></div></article>${n.lock?'':`<div class="pdf-action section-reveal"><a class="pdf-download" href="assets/pdf/${n.id}.pdf" download="${n.sub}.pdf">PDF DOWNLOAD <span aria-hidden="true">↓</span></a></div>`}<section class="related-content" id="related"><h2>다음으로 읽을 콘텐츠</h2><div class="cards">${related.map(card).join('')}</div></section>${footer()}`;watchCards(main.querySelector('.related-content'));setupReading();setupRich(main);document.title=n.sub+' — Naver Healthcare'}
function setupReading(){const buttons=Array.from(main.querySelectorAll('[data-section]')),targets=buttons.map(b=>document.getElementById(b.dataset.section));let frame=0;function update(){frame=0;const art=main.querySelector('.detail-article');if(art){const end=art.getBoundingClientRect().bottom+scrollY-innerHeight;document.body.style.setProperty('--read',(Math.max(0,Math.min(1,end>0?scrollY/end:1))*100).toFixed(2)+'%')}let current=targets[0];const offset=document.querySelector('.topbar').getBoundingClientRect().bottom+90;targets.forEach(t=>{if(t.getBoundingClientRect().top<=offset)current=t});buttons.forEach(b=>{const yes=b.dataset.section===current.id;b.classList.toggle('is-current',yes);if(yes)b.setAttribute('aria-current','location');else b.removeAttribute('aria-current')})}const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};buttons.forEach(b=>b.onclick=()=>{const t=document.getElementById(b.dataset.section),offset=document.querySelector('.topbar').getBoundingClientRect().bottom+25;scrollTo({top:t.getBoundingClientRect().top+scrollY-offset,behavior:reduced.matches?'auto':'smooth'})});addEventListener('scroll',onScroll,{passive:true});update();stopReading=()=>{removeEventListener('scroll',onScroll);cancelAnimationFrame(frame)};if(reduced.matches)main.querySelectorAll('.section-reveal').forEach(e=>e.classList.add('revealed'));else{revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');revealObserver.unobserve(e.target)}}),{rootMargin:'0px 0px -20px 0px',threshold:.05});main.querySelectorAll('.section-reveal').forEach(e=>revealObserver.observe(e))}}
function route(initial=false){const hash=location.hash.slice(1);if(hash.startsWith('content/')){const n=notes.find(x=>x.id===hash.split('/')[1]);if(n&&n.lock&&!(window.NH_CONTENT||{})[n.id]){history.replaceState(null,'',location.pathname+location.search);route(initial);setTimeout(()=>window.NH_openLock&&NH_openLock(n.id),700);return}if(n){if(!currentNote)homeScroll=scrollY;detail(n);scrollTo({top:0,behavior:'auto'});return}}const fromDetail=!!currentNote;active=categories.some(([id])=>id===hash)?hash:'all';home(initial);if(fromDetail)scrollTo({top:homeScroll,behavior:'auto'})}
let resizeFrame;addEventListener('resize',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(fitWords)},{passive:true});addEventListener('hashchange',()=>route(false));
document.fonts.ready.then(()=>{root.classList.add('ready');route(true);entered=true});
if(!reduced.matches)setInterval(advanceWord,4000);

// A fine-pointer-only blur cursor leaves touch and keyboard navigation native.
const cursorMedia=matchMedia('(hover: hover) and (pointer: fine)');
const dotCursor=document.createElement('div');dotCursor.className='dot-cursor';dotCursor.setAttribute('aria-hidden','true');dotCursor.innerHTML='<span class="cursor-read">READ MORE</span><span class="cursor-menu">CLICK</span>';document.body.append(dotCursor);
let cursorFrame=0,cursorX=0,cursorY=0;
addEventListener('pointermove',e=>{if(!cursorMedia.matches||e.pointerType==='touch')return;cursorX=e.clientX;cursorY=e.clientY;document.body.classList.add('custom-cursor');updateCursorTarget(e.target);if(!cursorFrame)cursorFrame=requestAnimationFrame(()=>{dotCursor.style.transform=`translate3d(${cursorX}px,${cursorY}px,0) translate(-50%,-50%)`;cursorFrame=0})},{passive:true});
document.documentElement.addEventListener('pointerleave',()=>document.body.classList.remove('custom-cursor'));
addEventListener('blur',()=>document.body.classList.remove('custom-cursor'));
cursorMedia.addEventListener('change',()=>document.body.classList.remove('custom-cursor'));




try{localStorage.removeItem('nh-dot-pixel')}catch{}

let tagFsKey=0;function syncCursorLabel(){if(tagFsKey===innerWidth)return;const tag=document.querySelector('.card .topic-tag');if(!tag)return;tagFsKey=innerWidth;dotCursor.style.setProperty('--tag-fs',getComputedStyle(tag).fontSize)}
function updateCursorTarget(target){syncCursorLabel();const el=target instanceof Element?target:null;dotCursor.classList.remove('over-control');dotCursor.classList.toggle('over-content',!!el?.closest('main')&&!el?.closest('a.card,.menu-row[data-category],button,a'));dotCursor.classList.toggle('over-card',!!el?.closest('a.card'));dotCursor.classList.toggle('over-menu',!!el?.closest('.menu-row[data-category],.header-category,.drawer-option'))}
addEventListener('pointerover',e=>{if(cursorMedia.matches)updateCursorTarget(e.target)},{passive:true});
addEventListener('scroll',()=>{if(cursorMedia.matches&&document.body.classList.contains('custom-cursor'))updateCursorTarget(document.elementFromPoint(cursorX,cursorY))},{passive:true});

let lastGridColumns=gridColumns();
addEventListener('resize',()=>{const cols=gridColumns();if(cols===lastGridColumns)return;lastGridColumns=cols;if(!currentNote&&main.querySelector('#cards'))renderCards(false);else main.querySelectorAll('.cards .card').forEach((el,i)=>el.style.setProperty('--column',i%cols))},{passive:true});

// Each visible glyph is painted once; no offset duplicate can leave a dark edge.
function paintMenuGlyphs(row){
 let index=0;
 row.querySelectorAll('.menu-label>.word,.menu-label>.title-period,.menu-label>.menu-total').forEach(field=>{
  const text=field.textContent;field.replaceChildren(...Array.from(text,ch=>{const glyph=document.createElement('span');glyph.className='menu-glyph';glyph.textContent=ch;glyph.style.setProperty('--glyph',index++);return glyph}));
 });
 row.style.setProperty('--glyph-count',index);
}


// One character travels between both portals. Seven lightweight rigid word bodies.
function setupHeartPlaygrounds(container){
 const cards=[...container.querySelectorAll('.interlude-card')];if(!cards.length)return()=>{};
 const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x)},backOut=(x,s=1.9)=>{x=clamp(x)-1;return 1+(s+1)*x*x*x+s*x*x},vocab=['NAVER','HEALTHCARE','AI','UX','HUMAN','EMR','PHR'],ICONS=[['heart',.894,.86],['pin',1.442,.8],['ai',.97,.64],['pill',.917,.72],['hospital',1,.86],['heart',.894,.86],['ai',.97,.64]];
 // Timeline (s): pop-in → Hi bubble → glance/bored → words drop → sink into portal → words fall in → portal closes.
 const RISE=1,RISE_DUR=.55,HI=2.7,HI_OUT=4.5,SINK=15.6,SINK_DUR=.7,DRAIN=SINK+SINK_DUR,LIP=.895,HIT_DUR=.32,CLOSE_DELAY=.06,CLOSE_DUR=.42;
 const ctx=document.createElement('canvas').getContext('2d');
 const scenes=cards.map((card,ci)=>{const kind=ci===0&&cards.length>1?'icons':'words';card.classList.add('hello-card');card.setAttribute('aria-label','두 포털 사이를 이동하는 캐릭터');card.innerHTML=`<div class="hello-stage"><div class="hello-hole"></div><div class="hello-window"><div class="hello-character"><div class="hello-face"><i class="hello-eye"><b></b></i><i class="hello-eye"><b></b></i><svg class="squint" viewBox="0 0 120 40"><path d="M31 10 L49 20 L31 30 M89 10 L71 20 L89 30"/></svg></div></div></div><span class="hello-hi${kind==='icons'?' is-bang':''}">${kind==='icons'?'!':'Hi!'}</span><i class="hello-impact"></i><div class="hello-words" aria-hidden="true">${kind==='words'?vocab.map(x=>`<span class="hello-word">${x}</span>`).join(''):ICONS.map(([f,ar,k])=>`<img class="hello-word hello-icon" src="assets/icons/${f}.png" data-ar="${ar}" data-k="${k}" alt="" draggable="false">`).join('')}</div></div>`;const stage=card.firstElementChild;return{kind,card,stage,hole:stage.querySelector('.hello-hole'),character:stage.querySelector('.hello-character'),face:stage.querySelector('.hello-face'),hi:stage.querySelector('.hello-hi'),burst:stage.querySelector('.hello-impact'),words:stage.querySelector('.hello-words'),visible:false,w:0,h:0,bodies:[],lastHit:-10,hits:0,hitX:0,hitY:0,hitRot:0,drainOrder:null,drainedAt:null}});
 let active=scenes.length-1,time=0,last=0,frame=0,dead=false;const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 // Collision boxes hug the actual glyph ink (cap height), not the line box, so words stack without air gaps.
 function glyphBox(el,text,fs){const cs=getComputedStyle(el);ctx.font=`${cs.fontWeight} ${fs}px ${cs.fontFamily}`;const m=ctx.measureText(text),fA=m.fontBoundingBoxAscent||fs*.8,fD=m.fontBoundingBoxDescent||fs*.2,lineH=el.offsetHeight||fs,base=(lineH-(fA+fD))/2+fA;return{w:m.actualBoundingBoxLeft+m.actualBoundingBoxRight,h:m.actualBoundingBoxAscent+m.actualBoundingBoxDescent,cx:(m.actualBoundingBoxRight-m.actualBoundingBoxLeft)/2,cy:base+(m.actualBoundingBoxDescent-m.actualBoundingBoxAscent)/2}}
 function reset(sc){sc.w=sc.card.clientWidth;sc.h=sc.card.clientHeight;sc.bodies=[...sc.card.querySelectorAll('.hello-word')].map((el,i)=>{let g;if(el.tagName==='IMG'){const ar=+el.dataset.ar,s=sc.w*(ar>1.2?.265:.235),iw=ar>1?s/ar:s,ih=ar>1?s:s*ar;el.style.width=iw+'px';el.style.height=ih+'px';const k=+el.dataset.k||1;g={w:iw*k,h:ih*k,vw:iw,vh:ih,cx:iw/2,cy:ih/2}}else{const fs=Math.min(sc.w*.125,sc.w*.88/(vocab[i].length*.64));el.style.fontSize=fs+'px';g=glyphBox(el,vocab[i],fs)}el.style.transformOrigin=`${g.cx}px ${g.cy}px`;return{el,x:sc.w*(.27+Math.random()*.46),y:-sc.h*.15,vx:(Math.random()-.5)*22,vy:0,a:(Math.random()-.5)*.7,av:(Math.random()-.5)*.2,w:g.w,h:g.h,vw:g.vw,vh:g.vh,cx:g.cx,cy:g.cy,start:6.8+i*.8,on:false,drop:false,out:false}});sc.hits=0;sc.lastHit=-10;sc.drainOrder=null;sc.drainedAt=null}
 function points(b){const c=Math.cos(b.a),s=Math.sin(b.a);return[[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,y])=>({x:b.x+x*b.w/2*c-y*b.h/2*s,y:b.y+x*b.w/2*s+y*b.h/2*c}))}
 function collide(a,b,staticB=false){const pa=points(a),pb=points(b);let depth=1e9,n;
  for(const angle of [a.a,a.a+Math.PI/2,b.a,b.a+Math.PI/2]){let ax={x:Math.cos(angle),y:Math.sin(angle)},aa=pa.map(p=>p.x*ax.x+p.y*ax.y),bb=pb.map(p=>p.x*ax.x+p.y*ax.y),d=Math.min(Math.max(...aa),Math.max(...bb))-Math.max(Math.min(...aa),Math.min(...bb));if(d<=0)return false;if(d<depth){depth=d;n=ax}}
  if((a.x-b.x)*n.x+(a.y-b.y)*n.y<0){n.x*=-1;n.y*=-1}const share=staticB?1:.5;a.x+=n.x*depth*share;a.y+=n.y*depth*share;if(!staticB){b.x-=n.x*depth*.5;b.y-=n.y*depth*.5}
  let velocity=(a.vx-(b.vx||0))*n.x+(a.vy-(b.vy||0))*n.y;if(velocity<0){const impulse=-velocity*.58;a.vx+=n.x*impulse;a.vy+=n.y*impulse;if(!staticB){b.vx-=n.x*impulse;b.vy-=n.y*impulse}a.av*=.75;a.vx*=.94}return true;
 }
 function closeAt(sc){return sc.drainedAt!=null?sc.drainedAt+CLOSE_DELAY:DRAIN+2.4}
 function render(sc,t,dt){const {w,h,stage}=sc;stage.style.opacity='1';
  // Portal pops open, and closes right after the last word has fallen in.
  const opening=backOut(t/.45,1.6)*(1-ease((t-closeAt(sc))/CLOSE_DUR));sc.hole.style.transform=`scale(${Math.max(0,opening)})`;
  // Character: springy pop-in with stretch → settle wobble, squash on hit, accelerating sink.
  const p=(t-RISE)/RISE_DUR,rise=backOut(p,1.7),sp=clamp((t-SINK)/SINK_DUR),sink=sp*sp*sp,hp=(t-sc.lastHit)/HIT_DUR,hit=hp>=0&&hp<1;let sx=1,sy=1;
  if(p>0&&p<1){const s=Math.sin(Math.PI*p)*.16;sy+=s;sx-=s*.55}else if(p>=1&&p<2.4){const k=p-1,wob=Math.sin(k*Math.PI*2.4)*Math.exp(-k*3.6)*.1;sy-=wob;sx+=wob*.6}
  if(sp>0&&sp<1){const s=Math.sin(Math.PI*sp)*.08;sy+=s;sx-=s*.5}
  if(hit){const s=Math.sin(Math.PI*clamp(hp*1.8))*.07;sy-=s;sx+=s*.6}
  const drop=sink*1.25;sc.character.style.transform=`translateY(${(1-rise+drop)*120}%) scale(${sx},${sy})`;
  // Hi! speech bubble pops from its tail.
  const hiIn=(t-HI)/.38,hiOut=ease((t-HI_OUT)/.22);sc.hi.style.opacity=String(clamp(hiIn*6)*(1-hiOut));sc.hi.style.transform=`translateX(-50%) scale(${Math.max(0,backOut(hiIn,2.4))*(1-hiOut*.25)})`;
  const headH=h*.2596,head={x:w*.5,y:h*.6354+drop*1.2*headH+headH/2,w:w*.487-20,h:headH,a:0,vx:0,vy:0};
  if(t>=DRAIN&&!sc.drainOrder){sc.drainOrder=sc.bodies.filter(b=>b.on).sort((a,b)=>b.y-a.y);sc.drainOrder.forEach((b,i)=>b.release=DRAIN+i*.09)}
  for(let step=0;step<2;step++){const d=dt/2;for(const b of sc.bodies){b.on=t>=b.start;if(!b.on||b.out)continue;
    if(b.release!=null&&t>=b.release&&!b.drop){b.drop=true;b.vy=-h*.38;b.tx=Math.max(w*.18+b.w*.4,Math.min(w*.82-b.w*.4,b.x));if(b.w*.8>w*.64)b.tx=w*.5;b.vx=(b.tx-b.x)*2.4;b.av=(Math.random()-.5)*1.4}
    if(b.drop){b.vy+=h*2.4*d;b.vx+=(b.tx-b.x)*3*d;b.x+=b.vx*d;b.y+=b.vy*d;b.a+=b.av*d;if(b.y-Math.hypot(b.w,b.h)/2>h*LIP)b.out=true;continue}
    b.vy+=h*1.3*d;b.x+=b.vx*d;b.y+=b.vy*d;b.a+=b.av*d;b.av*=.998;const ex=(Math.abs(Math.cos(b.a))*(b.vw||b.w)+Math.abs(Math.sin(b.a))*(b.vh||b.h))/2+6;if(b.x<ex){b.x=ex;b.vx=Math.abs(b.vx)*.3}if(b.x>w-ex){b.x=w-ex;b.vx=-Math.abs(b.vx)*.3}
    if(sp<1){const vIn=b.vy;if(collide(b,head,true)&&!b.landed&&t<SINK&&b.y<head.y){b.landed=true;if(vIn>h*.25&&t-sc.lastHit>.2){sc.lastHit=t;sc.hits++;sc.hitX=Math.max(head.x-head.w*.4,Math.min(head.x+head.w*.4,b.x));sc.hitY=head.y-head.h/2;sc.hitRot=Math.random()*90}}}
    if(b.y+b.h/2>h*.88){b.y=h*.88-b.h/2;b.vy=-Math.abs(b.vy)*.1;b.vx*=.9}}
   for(let j=0;j<3;j++)for(let i=0;i<sc.bodies.length;i++)for(let k=i+1;k<sc.bodies.length;k++){const A=sc.bodies[i],B=sc.bodies[k];if(!(A.on&&B.on&&!A.drop&&!B.drop&&!A.out&&!B.out))continue;const va=A.vy,vb=B.vy;if(collide(A,B)&&A.landed!==B.landed){const f=A.landed?B:A,v=A.landed?vb:va;f.landed=true;if(v>h*.25&&t<SINK&&Math.abs(f.x-head.x)<head.w*.5&&t-sc.lastHit>.2){sc.lastHit=t;sc.hits++;sc.hitX=Math.max(head.x-head.w*.4,Math.min(head.x+head.w*.4,f.x));sc.hitY=head.y-head.h/2;sc.hitRot=Math.random()*90}}}}
  sc.bodies.forEach(b=>{if(!b.on||b.drop||b.out)return;const ex=Math.min(w/2,(Math.abs(Math.cos(b.a))*(b.vw||b.w)+Math.abs(Math.sin(b.a))*(b.vh||b.h))/2+6);b.x=Math.max(ex,Math.min(w-ex,b.x))});
  if(t>=DRAIN&&sc.drainedAt==null&&sc.bodies.every(b=>b.out))sc.drainedAt=t;
  // Words keep their size and simply fall past the portal lip, where they are cut off.
  sc.words.style.clipPath=t>=SINK?`inset(0 0 ${(1-LIP)*100}% 0)`:'none';
  sc.bodies.forEach(b=>{b.el.style.opacity=b.on&&!b.out?'1':'0';b.el.style.transform=`translate(${b.x-b.cx}px,${b.y-b.cy}px) rotate(${b.a}rad)`});
  // Squint + impact burst fire on the exact frame a word lands on the head; worry starts only after the first hit.
  stage.dataset.expression=hit?'ouch':sc.hits>0?'worried':t>=4.8?'bored':t>=3.3?'glance':'normal';stage.style.setProperty('--look-x',t<4.05?'-25%':'25%');stage.dataset.skin=t-sc.lastHit<.65?['rainbow','stripes','dots','green'][sc.hits%4]:'green';sc.face.style.transform=hit?`translateY(${Math.sin(clamp(hp*1.6)*Math.PI)*4}px)`:'none';
  sc.burst.style.opacity=hit?String(hp<.65?1:1-(hp-.65)/.35):'0';sc.burst.style.left=sc.hitX+'px';sc.burst.style.top=sc.hitY+'px';sc.burst.style.transform=`translate(-50%,-50%) rotate(${sc.hitRot}deg) scale(${hit?.5+.5*backOut(hp/.28,2.6):.5})`;
 }
 function tick(now){frame=0;if(dead||document.hidden||!scenes[active].visible){last=0;return}const dt=last?Math.min((now-last)/1000,.035):0;last=now;time+=dt;const cur=scenes[active];if(time>closeAt(cur)+CLOSE_DUR+.3){cur.stage.style.opacity='0';active=(active+1)%scenes.length;time=0;reset(scenes[active])}render(scenes[active],reduced.matches?3:time,dt);if(!reduced.matches)frame=requestAnimationFrame(tick)}
 function resume(){cancelAnimationFrame(frame);last=0;if(!dead&&scenes[active].visible&&!document.hidden)frame=requestAnimationFrame(tick)}
 scenes.forEach(sc=>{sc.stage.style.opacity='0';reset(sc)});const io=new IntersectionObserver(es=>{es.forEach(e=>{scenes.find(s=>s.card===e.target).visible=e.isIntersecting});resume()},{threshold:.08});scenes.forEach(sc=>io.observe(sc.card));const ro=new ResizeObserver(()=>{scenes.forEach(reset)});scenes.forEach(sc=>ro.observe(sc.card));document.fonts.ready.then(()=>{if(!dead)scenes.forEach(reset)});document.addEventListener('visibilitychange',resume);return()=>{dead=true;cancelAnimationFrame(frame);io.disconnect();ro.disconnect();document.removeEventListener('visibilitychange',resume)}
}

// Card art: every card gets its own generative style so the grid reads at a glance.
// ascii volume · halftone · tiles · circle packing · contour lines · bars · orbits · wireframe · type specimen.
// Each style builds in once when it scrolls into view; the pointer only disturbs what is near it.
(function(){
 const RAMP=' .:-=+*#%@',DIG='0123456789',BIN='01',items=new Map();let last=0;
 const io=new IntersectionObserver(es=>es.forEach(e=>{const it=items.get(e.target);if(it)it.visible=e.isIntersecting}),{rootMargin:'120px'});
 const sdBox=(x,y,cx,cy,hx,hy,r=0)=>{const qx=Math.abs(x-cx)-hx+r,qy=Math.abs(y-cy)-hy+r;return Math.hypot(Math.max(qx,0),Math.max(qy,0))+Math.min(Math.max(qx,qy),0)-r};
 const sdCirc=(x,y,cx,cy,r)=>Math.hypot(x-cx,y-cy)-r;
 const sdPoly=(px,py,v)=>{let d=(px-v[0][0])**2+(py-v[0][1])**2,sg=1;for(let i=0,j=v.length-1;i<v.length;j=i,i++){const ex=v[j][0]-v[i][0],ey=v[j][1]-v[i][1],wx=px-v[i][0],wy=py-v[i][1],tt=Math.max(0,Math.min(1,(wx*ex+wy*ey)/(ex*ex+ey*ey))),bx=wx-ex*tt,by=wy-ey*tt;d=Math.min(d,bx*bx+by*by);const c1=py>=v[i][1],c2=py<v[j][1],c3=ex*wy>ey*wx;if((c1&&c2&&c3)||(!c1&&!c2&&!c3))sg=-sg}return sg*Math.sqrt(d)};
 const CURSOR=[[-.62,1.3],[-.62,-.95],[-.12,-.48],[.2,-1.22],[.52,-1.08],[.2,-.36],[.82,-.36]],TAIL=[[-.78,-.48],[-.18,-.48],[-1.02,-1.2]];
 function field(shape,X,Y){switch(shape){
  case 'bars':{let d=1e9;[.55,.95,1.35,1.8].forEach((hh,i)=>{d=Math.min(d,sdBox(X,Y,-1.1+i*.73,-1+hh/2,.27,hh/2,.06))});return d}
  case 'cross':return Math.min(sdBox(X,Y,0,0,.42,1.25,.1),sdBox(X,Y,0,0,1.25,.42,.1));
  case 'trio':return Math.min(Math.abs(sdCirc(X,Y,0,.5,.78))-.17,Math.abs(sdCirc(X,Y,-.56,-.42,.78))-.17,Math.abs(sdCirc(X,Y,.56,-.42,.78))-.17);
  case 'bubble':{const body=Math.min(sdBox(X,Y,0,.18,1.38,.82,.5),sdPoly(X,Y,TAIL));const dots=Math.min(sdCirc(X,Y,-.55,.18,.17),sdCirc(X,Y,0,.18,.17),sdCirc(X,Y,.55,.18,.17));return Math.max(body,-dots)}
  case 'cursor':return sdPoly(X,Y,CURSOR);
  case 'cross2':return Math.min(sdBox(X,Y,0,0,.3,1.3,.06),sdBox(X,Y,0,0,1.3,.3,.06));
  case 'H':return Math.min(sdBox(X,Y,-.62,0,.25,1.02,.03),sdBox(X,Y,.62,0,.25,1.02,.03),sdBox(X,Y,0,0,.45,.17,.02));
  case 'lock':{const sh=Math.max(Math.abs(sdCirc(X,Y,0,.3,.58))-.15,.3-Y),legs=Math.min(sdBox(X,Y,-.58,.12,.15,.2),sdBox(X,Y,.58,.12,.15,.2)),body=sdBox(X,Y,0,-.62,.98,.72,.16),hole=Math.min(sdCirc(X,Y,0,-.48,.18),sdBox(X,Y,0,-.78,.07,.22));return Math.min(sh,legs,Math.max(body,-hole))}
  case 'pill':{const ax=-.62,ay=-.62,dx=1.24,dy=1.24,px=X-ax,py=Y-ay,h=Math.max(0,Math.min(1,(px*dx+py*dy)/(dx*dx+dy*dy))),cap=Math.hypot(px-dx*h,py-dy*h)-.62;return Math.max(cap,-(Math.abs((X+Y)/1.4142)-.05))}
  case 'phone':{const body=sdBox(X,Y,0,0,.82,1.45,.22),scr=sdBox(X,Y,0,.08,.66,1.12,.08);let ui=Math.min(sdBox(X,Y,-.12,.82,.4,.1,.05),sdBox(X,Y,0,.38,.5,.2,.08),sdBox(X,Y,0,-.12,.5,.2,.08),sdBox(X,Y,0,-.62,.5,.2,.08));return Math.min(Math.max(body,-scr),ui,sdCirc(X,Y,0,-1.3,.09)-0)}
  case 'person':{const head=sdCirc(X,Y,0,.72,.5),bodyC=Math.max(sdCirc(X,Y,0,-1.15,1.05),-(Y+1.15));return Math.min(head,Math.max(bodyC,-sdCirc(X,Y,0,.72,.68)))}
  case 'doc':{const body=Math.max(sdBox(X,Y,0,0,.95,1.25,.12),-sdPoly(X,Y,[[.35,1.4],[1.1,1.4],[1.1,.65]]));let ln=1e9;[.42,-.08,-.58].forEach((yy,i)=>{ln=Math.min(ln,sdBox(X,Y,-.1-(i==2?.2:0),yy,.58-(i==2?.2:0),.11,.08))});const fold=sdPoly(X,Y,[[.35,1.25],[.35,.65],[.95,.65]]);return Math.max(body,-ln,-(Math.abs(fold)-.05))}
  case 'pins':{let d=1e9;[[-.98,-.15,.82],[.05,.18,1.05],[1.02,-.3,.7]].forEach(([cx,cy,k])=>{const head=sdCirc(X,Y,cx,cy+.3*k,.52*k),tail=sdPoly(X,Y,[[cx-.45*k,cy+.04*k],[cx+.45*k,cy+.04*k],[cx,cy-.82*k]]);d=Math.min(d,Math.max(Math.min(head,tail),-sdCirc(X,Y,cx,cy+.3*k,.2*k)))});return d}
  case 'magnifier':{const ring=Math.abs(sdCirc(X,Y,-.3,.3,.8))-.2;const ax=.3,ay=-.3,bx=1.2,by=-1.2,px=X-ax,py=Y-ay,dx=bx-ax,dy=by-ay,h=Math.max(0,Math.min(1,(px*dx+py*dy)/(dx*dx+dy*dy)));return Math.min(ring,Math.hypot(px-dx*h,py-dy*h)-.23)}
  default:{const Y2=Y+.18,a=X*X+Y2*Y2-1;return a*a*a-X*X*Y2*Y2*Y2}}}
 // Extruded particle cloud: front/back faces + side walls with normals. Cached per shape/density.
 const geoCache={};
 function geometry(shape,step){const key=shape+'|'+step.toFixed(3);if(geoCache[key])return geoCache[key];
  const B=1.75,n=Math.ceil(2*B/step),D=shape==='trio'?.22:.36,ins=[],out=[];
  for(let j=0;j<=n;j++){ins[j]=new Uint8Array(n+1);for(let i=0;i<=n;i++)ins[j][i]=field(shape,-B+i*step,-B+j*step)<=0?1:0}
  for(let j=1;j<n;j++)for(let i=1;i<n;i++){if(!ins[j][i])continue;const x=-B+i*step,y=-B+j*step;out.push(x,y,D,0,0,1,x,y,-D,0,0,-1);
   if(!ins[j][i-1]||!ins[j][i+1]||!ins[j-1][i]||!ins[j+1][i]){const e=step*.5;let gx=field(shape,x+e,y)-field(shape,x-e,y),gy=field(shape,x,y+e)-field(shape,x,y-e);const gl=Math.hypot(gx,gy)||1;gx/=gl;gy/=gl;
    const layers=Math.max(3,Math.round(2*D/step));for(let k=1;k<layers;k++)out.push(x,y,-D+k*2*D/layers,gx,gy,0)}}
  return geoCache[key]=new Float32Array(out)}
 const LX=-.42,LY=.55,LZ=.72;
 const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x)},easeOut=x=>1-Math.pow(1-clamp(x),3),back=x=>{x=clamp(x);const c=1.6;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)},TAU=Math.PI*2;
 const RM=matchMedia('(prefers-reduced-motion: reduce)');
 function setup(cv){const d=cv.dataset,it={cv,ctx:cv.getContext('2d'),kind:d.kind,style:d.style||'ascii',shape:d.shape||'heart',mode:d.mode||'spin',chars:d.chars||'ascii',letter:d.letter||'A',visible:false,hov:0,hovT:0,mx:null,my:null,sx:0,sy:0,tv:null,ts:1,t0:performance.now()/1000};
  const host=cv.parentElement;
  host.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')it.hovT=1});
  host.addEventListener('pointerleave',()=>{it.hovT=0;it.mx=null});
  host.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const r=cv.getBoundingClientRect();it.mx=e.clientX-r.left;it.my=e.clientY-r.top;if(!it.hovT){it.hovT=1}});
  fit(it);items.set(cv,it);io.observe(cv);return it}
 function fit(it){const r=it.cv.getBoundingClientRect();it.dpr=Math.min(2,devicePixelRatio||1);it.w=r.width;it.h=r.height;it.cv.width=Math.max(1,Math.round(r.width*it.dpr));it.cv.height=Math.max(1,Math.round(r.height*it.dpr));
  const hero=it.kind==='hero',wide=it.w>700;
  it.cell=hero?Math.max(9,Math.min(12.5,it.w/110)):Math.max(6,it.w/36);it.lh=it.cell*1.32;if(it.chars==='scan'){it.cell=hero?Math.max(6.5,Math.min(8.5,it.w/170)):Math.max(4.6,it.w/56);it.lh=it.cell*1.12}
  it.R=hero?(wide?Math.min(it.h*.26,it.w*.17):Math.min(it.h*.17,it.w*.24)):Math.min(it.h*.2,it.w*.27);
  it.cx=hero?(wide?it.w*.7:it.w*.5):it.w*.5;it.cy=hero?(wide?it.h*.48:it.h*.32):it.h*.56;it.c=null;
  if(it.style==='ascii'||it.style==='rain3d'){if(it.style==='rain3d'){it.cell=it.kind==='hero'?Math.max(10,Math.min(13,it.w/95)):Math.max(7,it.w/30);it.lh=it.cell*1.05}const step=Math.max(.035,Math.min(.09,(it.cell/it.R)*.55));const g=geometry(it.shape,Math.round(step*200)/200);
   if(it.geo!==g){it.geo=g;const n=g.length/6;it.st=new Float32Array(n*4);it.rnd=new Float32Array(n*3);for(let k=0;k<n;k++){const a=Math.random()*TAU,m=.55+Math.random();it.rnd[k*3]=Math.cos(a)*m;it.rnd[k*3+1]=Math.sin(a)*m;it.rnd[k*3+2]=Math.random()}}
   const cols=Math.ceil(it.w/it.cell),rows=Math.ceil(it.h/it.lh);it.cols=cols;it.rows=rows;it.zb=new Float32Array(cols*rows);it.cb=new Uint8Array(cols*rows);it.lb=new Float32Array(cols*rows)}}
 const F=(it,x,y)=>field(it.shape,(x-it.cx)/it.R,(it.cy-y)/it.R);
 const near=(it,x,y,rad)=>{if(it.mx===null||it.hov<.01)return 0;const d=Math.hypot(x-it.sx,y-it.sy);return d<rad?(1-d/rad)*(1-d/rad)*it.hov:0};
 let seed=1;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
 // 1. ASCII volume (spin / float / pass), pointer pushes nearby characters only
 function ascii(it,t,dt,ctx,ink){const {w,h,cell,lh,cols,rows,zb,cb,lb,geo,st,rnd:rn}=it;
  let ay=t*.6,ax=.28+.08*Math.sin(t*.7),cx=it.cx,cy=it.cy;const R=it.R;
  if(it.mode==='float'){ay=.62*Math.sin(t*.8);ax=.18+.12*Math.sin(t*.55);cy+=Math.sin(t*1.1)*R*.06}
  else if(it.mode==='hover'){const tx=it.mx!==null?(it.sx-it.cx)/(it.w*.5):0,ty=it.mx!==null?(it.sy-it.cy)/(it.h*.5):0;it.ty=(it.ty||0)+((tx*1.1*it.hov)-(it.ty||0))*.08;it.tx=(it.tx||0)+((ty*.8*it.hov)-(it.tx||0))*.08;ay=.28*Math.sin(t*.5)+it.ty;ax=.22+.08*Math.sin(t*.4)+it.tx;cy+=Math.sin(t*1.1)*R*.07;cx+=Math.cos(t*.7)*R*.03}
  else if(it.mode==='pass'){const P=9,u=(t%P)/P,span=w/2+R*2.2,k=u<.5?.5-.5*Math.pow(1-2*u,1.6):.5+.5*Math.pow(2*u-1,1.6);cx=w*.5+(1-2*k)*span;ay=t*.9}
  const ca=Math.cos(ay),sa=Math.sin(ay),cx2=Math.cos(ax),sx2=Math.sin(ax);zb.fill(-1e9);cb.fill(0);
  const n=geo.length/6,kS=Math.min(1,dt*60)*.09,damp=Math.pow(.86,Math.min(1,dt*60)),grow=easeOut(t/1.2);
  for(let p=0;p<n;p++){const o=p*6,x=geo[o],y=geo[o+1],z=geo[o+2];
   const x1=x*ca+z*sa,z1=-x*sa+z*ca,y2=y*cx2-z1*sx2,z2=y*sx2+z1*cx2;
   const nx=geo[o+3],ny=geo[o+4],nz=geo[o+5],nx1=nx*ca+nz*sa,nz1=-nx*sa+nz*ca,ny2=ny*cx2-nz1*sx2,nz2=ny*sx2+nz1*cx2;
   let lum=nx1*LX+ny2*LY+nz2*LZ;if(lum<0)lum*=.25;lum=Math.max(.06,lum);
   const f=4/(4-z2);let px=cx+x1*R*f*grow,py=cy-y2*R*f*grow;const sd=rn[p*3+2],s4=p*4;let tx=0,ty=0;
   if(it.mx!==null&&it.mode!=='hover'){const ddx=px-it.sx,ddy=py-it.sy,dd=Math.hypot(ddx,ddy),rad=R*.62;if(dd<rad&&dd>.01){const fl=1-dd/rad,push=fl*fl*R*(.35+.45*sd)*it.hov;tx=ddx/dd*push;ty=ddy/dd*push}}
   st[s4+2]=(st[s4+2]+(tx-st[s4])*kS)*damp;st[s4+3]=(st[s4+3]+(ty-st[s4+1])*kS)*damp;st[s4]+=st[s4+2];st[s4+1]+=st[s4+3];px+=st[s4];py+=st[s4+1];
   const c=Math.floor(px/cell),r=Math.floor(py/lh);if(c<0||r<0||c>=cols||r>=rows)continue;const id=r*cols+c;
   if(z2>zb[id]){zb[id]=z2;lb[id]=lum;cb[id]=(it.chars==='ascii'||it.chars==='scan')?1:2+((sd*97+Math.floor(t*5+sd*13))%10|0)}}
  ctx.font=`700 ${cell*1.15}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=ink;
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const id=r*cols+c,k=cb[id];if(!k)continue;const lum=lb[id];
   const RP=it.chars==='scan'?' .-=+*AA▲▲':RAMP,ri=Math.max(1,Math.min(RP.length-1,Math.round(lum*(RP.length-1)+(it.mode==='hover'&&hash(id,Math.floor(t*5))>.8?(hash(id+3,Math.floor(t*5))>.5?2:-2):0)))),ch=k===1?RP[ri]:(it.chars==='binary'?BIN[(k-2)%2]:DIG[k-2]);
   ctx.globalAlpha=.5+.5*Math.min(1,lum);if(it.mode==='hover')ctx.fillStyle=HCOL[Math.floor(hash(id,Math.floor(t*.7+((id*7)%13)/13))*HCOL.length)];ctx.fillText(ch,(c+.5)*cell,(r+.5)*lh)}}
 const HCOL=['#17803a','#2bb673','#00a3a3','#4a7fe0','#9b6bff','#f5a623','#ff6b6b','#e84a8a'];
 // 2. Halftone: dots sized by depth inside the silhouette, revealed by a ripple from the centre
 function halftone(it,t,ctx){const R=it.R,g=Math.max(6.5,R*.125);
  if(!it.c){const p=[],B=R*1.8;for(let y=it.cy-B;y<=it.cy+B;y+=g)for(let x=it.cx-B;x<=it.cx+B;x+=g){const d=F(it,x,y);if(d<.06)p.push(x,y,d,Math.hypot(x-it.cx,y-it.cy)/R)}it.c=p}
  const p=it.c;for(let i=0;i<p.length;i+=4){const x=p[i],y=p[i+1],d=p[i+2],dist=p[i+3],a=back((t-.1-dist*.6)/.6);if(a<=0)continue;
   let r=g*.47*Math.min(1,.3+(-d)*2.4);r*=1+.16*Math.sin(t*2-dist*5);const nb=near(it,x,y,R*.6);r=Math.min(g*.75,r*(1+nb*1.2));
   ctx.globalAlpha=.55+.45*Math.min(1,.3-d*2);ctx.beginPath();ctx.arc(x,y,Math.max(.4,r*a),0,TAU);ctx.fill()}}
 // 3. Tiles: rounded squares flip in along the diagonal; pointer tilts nearby tiles
 function tiles(it,t,ctx){const R=it.R,g=Math.max(9,R*.2),hs=g*.4;
  if(!it.c){const p=[],B=R*1.8;let mn=1e9,mx=-1e9;for(let y=it.cy-B;y<=it.cy+B;y+=g)for(let x=it.cx-B;x<=it.cx+B;x+=g){const d=F(it,x,y);if(d<0){p.push(x,y,d,x+y);mn=Math.min(mn,x+y);mx=Math.max(mx,x+y)}}for(let i=3;i<p.length;i+=4)p[i]=(p[i]-mn)/(mx-mn||1);it.c=p}
  const p=it.c;for(let i=0;i<p.length;i+=4){const x=p[i],y=p[i+1],d=p[i+2],o=p[i+3],s=back((t-.1-o*.9)/.5);if(s<=0)continue;
   const nb=near(it,x,y,R*.65),sh=.5+.5*Math.sin(t*1.4+x*.07+y*.05);
   ctx.save();ctx.translate(x,y);ctx.rotate(nb*Math.PI/4);ctx.scale(1-nb*.35,s*(1-nb*.35));
   ctx.globalAlpha=Math.min(1,.42+(-d)*1.6)*(.78+.22*sh);ctx.beginPath();ctx.roundRect?ctx.roundRect(-hs,-hs,hs*2,hs*2,hs*.38):ctx.rect(-hs,-hs,hs*2,hs*2);ctx.fill();ctx.restore()}}
 // 4. Circle packing: a large ring draws itself, then small circles travel from the ring into the figure
 function circles(it,t,ctx,ink){const R=it.R,Rb=R*1.42;
  if(!it.c){seed=11;const pk=[],N=2600;for(let k=0;k<N&&pk.length<480;k++){const x=it.cx+(rnd()*2-1)*R*1.7,y=it.cy+(rnd()*2-1)*R*1.7,d=F(it,x,y);if(d>-.02)continue;
    let r=Math.min(-d*R*.95,R*(.22-.17*k/N));for(let j=0;j<pk.length;j+=4){const q=Math.hypot(x-pk[j],y-pk[j+1])-pk[j+2]-1.5;if(q<r)r=q;if(r<R*.035)break}if(r>=R*.035)pk.push(x,y,r,Math.atan2(y-it.cy,x-it.cx))}it.c=pk}
  const lw=Math.max(1.2,R*.012);ctx.lineWidth=lw;ctx.strokeStyle=ink;
  const ring=easeOut(t/.9);ctx.globalAlpha=.9-.62*ease((t-1.1)/.8);ctx.beginPath();ctx.arc(it.cx,it.cy,Rb,-Math.PI/2,-Math.PI/2+ring*TAU);ctx.stroke();
  const p=it.c,n=p.length/4;for(let i=0;i<n;i++){const o=i*4,x=p[o],y=p[o+1],r=p[o+2],a=p[o+3],k=easeOut((t-.7-i/n*1.1)/.9);if(k<=0)continue;
   const sx=it.cx+Math.cos(a)*Rb,sy=it.cy+Math.sin(a)*Rb;let X=sx+(x-sx)*k,Y=sy+(y-sy)*k;const nb=near(it,X,Y,R*.6);if(nb){const dx=X-it.sx,dy=Y-it.sy,dd=Math.hypot(dx,dy)||1;X+=dx/dd*nb*R*.28;Y+=dy/dd*nb*R*.28}
   const rr=r*(.35+.65*k)*(1+.05*Math.sin(t*1.6+i));ctx.beginPath();ctx.arc(X,Y,Math.max(.5,rr-lw*.5),0,TAU);
   if(r>R*.09){ctx.globalAlpha=1;ctx.stroke()}else{ctx.globalAlpha=.9;ctx.fill()}}}
 // 5. Contour lines: concentric outlines swept in clockwise, with a slow inward pulse
 function contourSegs(shape){const N=96,B=1.75,stp=2*B/N,v=new Float32Array((N+1)*(N+1)),L=[.18,.06,-.06,-.16,-.26,-.36],out=[];
  for(let j=0;j<=N;j++)for(let i=0;i<=N;i++)v[j*(N+1)+i]=field(shape,-B+i*stp,-B+j*stp);
  L.forEach((lv,li)=>{const sg=[];for(let j=0;j<N;j++)for(let i=0;i<N;i++){const a=v[j*(N+1)+i]-lv,b=v[j*(N+1)+i+1]-lv,c=v[(j+1)*(N+1)+i+1]-lv,d=v[(j+1)*(N+1)+i]-lv,x0=-B+i*stp,y0=-B+j*stp,P=[];
   if((a<0)!==(b<0))P.push(x0+stp*a/(a-b),y0);if((b<0)!==(c<0))P.push(x0+stp,y0+stp*b/(b-c));if((c<0)!==(d<0))P.push(x0+stp*(1-c/(c-d)),y0+stp);if((d<0)!==(a<0))P.push(x0,y0+stp*(1-d/(d-a)));
   for(let k=0;k+3<P.length;k+=4)sg.push(P[k],P[k+1],P[k+2],P[k+3],(Math.atan2((P[k]+P[k+2])/2,(P[k+1]+P[k+3])/2)+TAU)%TAU)}out.push(sg)});return out}
 const segCache={};
 function contour(it,t,ctx,ink){const R=it.R,segs=segCache[it.shape]||(segCache[it.shape]=contourSegs(it.shape));ctx.strokeStyle=ink;ctx.lineCap='round';
  segs.forEach((sg,li)=>{const sweep=easeOut((t-.1-li*.14)/1.5)*TAU;if(sweep<=0)return;const base=li===1?1:li===0?.4:.85-.1*li;
   ctx.globalAlpha=base*(.62+.38*Math.sin(t*1.5-li*.8));ctx.lineWidth=Math.max(1.1,R*(li===1?.016:.011));ctx.beginPath();
   for(let k=0;k<sg.length;k+=5){if(sg[k+4]>sweep)continue;let x1=it.cx+sg[k]*R,y1=it.cy-sg[k+1]*R,x2=it.cx+sg[k+2]*R,y2=it.cy-sg[k+3]*R;
    if(it.mx!==null){const n1=near(it,x1,y1,R*.55),n2=near(it,x2,y2,R*.55);if(n1||n2){const d1=Math.hypot(x1-it.sx,y1-it.sy)||1,d2=Math.hypot(x2-it.sx,y2-it.sy)||1;x1+=(x1-it.sx)/d1*n1*R*.16;y1+=(y1-it.sy)/d1*n1*R*.16;x2+=(x2-it.sx)/d2*n2*R*.16;y2+=(y2-it.sy)/d2*n2*R*.16}}
    ctx.moveTo(x1,y1);ctx.lineTo(x2,y2)}ctx.stroke()})}
 // 6. Bars: hairline stripes rise into a bar chart, then a trend line draws across the tops
 function bars(it,t,ctx,ink){const R=it.R,H=[.55,.95,1.35,1.8],sp=Math.max(3,R*.05),lw=Math.max(1.1,R*.012),base=it.cy+R,tops=[];ctx.strokeStyle=ink;ctx.fillStyle=ink;
  ctx.globalAlpha=.35;ctx.lineWidth=lw;ctx.beginPath();ctx.moveTo(it.cx-R*1.55,base+lw);ctx.lineTo(it.cx-R*1.55+R*3.1*easeOut(t/.8),base+lw);ctx.stroke();
  H.forEach((hh,i)=>{const g=back((t-.2-i*.16)/.8)*(1+.035*Math.sin(t*1.3+i*1.7)),x0=it.cx+(-1.1+i*.73-.27)*R,x1=it.cx+(-1.1+i*.73+.27)*R;tops.push([(x0+x1)/2,base-hh*R*g]);
   for(let x=x0;x<=x1+.1;x+=sp){const nb=near(it,x,base-hh*R*g/2,R*.7),top=base-hh*R*g-nb*R*.18;ctx.globalAlpha=.55+.45*nb;ctx.beginPath();ctx.moveTo(x,base);ctx.lineTo(x,top);ctx.stroke()}});
  const lp=easeOut((t-1.2)/1.1);if(lp>0){ctx.globalAlpha=1;ctx.lineWidth=lw*2;ctx.lineJoin='round';const pts=[[it.cx-R*1.5,tops[0][1]+R*.3],...tops.map(([x,y])=>[x,y-R*.16]),[it.cx+R*1.5,tops[3][1]-R*.42]];
   const segL=pts.slice(1).map((q,i)=>Math.hypot(q[0]-pts[i][0],q[1]-pts[i][1])),tot=segL.reduce((a,b)=>a+b,0);let rem=tot*lp,ex=pts[0][0],ey=pts[0][1];ctx.beginPath();ctx.moveTo(ex,ey);
   for(let i=0;i<segL.length&&rem>0;i++){const f=Math.min(1,rem/segL[i]);ex=pts[i][0]+(pts[i+1][0]-pts[i][0])*f;ey=pts[i][1]+(pts[i+1][1]-pts[i][1])*f;ctx.lineTo(ex,ey);rem-=segL[i]}ctx.stroke();
   ctx.beginPath();ctx.arc(ex,ey,lw*3,0,TAU);ctx.fill();if(lp>=1){const pu=(t*.7)%1;ctx.globalAlpha=(1-pu)*.6;ctx.lineWidth=lw;ctx.beginPath();ctx.arc(ex,ey,lw*3+pu*R*.3,0,TAU);ctx.stroke()}}}
 // 7. Orbits: three rings turn in 3D with satellites; the ring under the pointer thickens
 function orbits(it,t,ctx,ink){const R=it.R,C=[[0,.5],[-.56,-.42],[.56,-.42]],lw=Math.max(1.2,R*.013);ctx.strokeStyle=ink;ctx.fillStyle=ink;
  C.forEach(([X,Y],i)=>{const cx=it.cx+X*R,cy=it.cy-Y*R,r=.78*R,p=easeOut((t-.15-i*.25)/1.3);if(p<=0)return;const sq=.28+.72*Math.abs(Math.cos(t*.55+i*2.1)),rot=i*2.09+t*.12,nb=near(it,cx,cy,R*1.1);
   [1,.82,.64].forEach((k,j)=>{ctx.globalAlpha=(j?.38:1)*(1-.2*j);ctx.lineWidth=lw*(j?1:1+nb*1.8);ctx.beginPath();ctx.ellipse(cx,cy,r*k,r*k*sq,rot,0,p*TAU);ctx.stroke()});
   if(p>=1){for(let s=0;s<2;s++){const a=t*(1.1+nb*1.6)+i*1.3+s*Math.PI,ex=Math.cos(a)*r,ey=Math.sin(a)*r*sq,cr=Math.cos(rot),sr=Math.sin(rot);ctx.globalAlpha=1;ctx.beginPath();ctx.arc(cx+ex*cr-ey*sr,cy+ex*sr+ey*cr,lw*(s?2:3.2),0,TAU);ctx.fill()}}})}
 // 8. Wireframe: a phone outline and its UI blocks draw in; a finger tap ripples on the button
 function rrect(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect?ctx.roundRect(x,y,w,h,r):ctx.rect(x,y,w,h)}
 function strokeIn(ctx,x,y,w,h,r,p){if(p<=0)return;const L=2*(w+h);ctx.setLineDash([L*p,L+2]);rrect(ctx,x,y,w,h,r);ctx.stroke();ctx.setLineDash([])}
 function wireframe(it,t,ctx,ink){const R=it.R,pw=R*1.05,ph=R*1.95,px=it.cx-pw/2,py=it.cy-ph/2+R*.05,lw=Math.max(1.2,R*.014);ctx.strokeStyle=ink;ctx.fillStyle=ink;ctx.lineWidth=lw*1.4;
  ctx.globalAlpha=1;strokeIn(ctx,px,py,pw,ph,pw*.16,easeOut(t/1));
  const U=[[.12,.07,.76,.035,.02],[.12,.15,.76,.2,.06],[.12,.39,.34,.2,.06],[.54,.39,.34,.2,.06],[.12,.63,.76,.09,.04],[.12,.76,.76,.04,.02],[.12,.86,.76,.075,.04]];
  U.forEach(([ux,uy,uw,uh,ur],i)=>{const p=easeOut((t-.8-i*.16)/.6);if(p<=0)return;const x=px+ux*pw,y=py+uy*ph,w=uw*pw,h=uh*ph,r=ur*pw;ctx.lineWidth=lw;ctx.globalAlpha=.85;strokeIn(ctx,x,y,w,h,r,p);
   const inside=it.mx!==null&&it.sx>x&&it.sx<x+w&&it.sy>y&&it.sy<y+h;let fa=.14*ease((t-1.3-i*.16)/.5)+(inside?.3*it.hov:0);
   if(i===6){const tc=(t-2.8)%3.4;if(t>2.8&&tc<.6)fa+=.5*(1-tc/.6)}if(fa>0){ctx.globalAlpha=fa;rrect(ctx,x,y,w,h,r);ctx.fill()}});
  if(t>2.8){const tc=(t-2.8)%3.4,bx=px+.5*pw,by=py+.897*ph;if(tc<1.2){const q=tc/1.2;ctx.globalAlpha=(1-q)*.8;ctx.lineWidth=lw;ctx.beginPath();ctx.arc(bx,by,R*.05+q*R*.4,0,TAU);ctx.stroke();ctx.globalAlpha=q<.3?.9:.9*(1-(q-.3)/.7);ctx.beginPath();ctx.arc(bx,by,R*.06,0,TAU);ctx.fill()}}}
 // 9. Type specimen: the card's initial sits in a selection box; the corner handle drags it bigger and smaller
 function typeSpec(it,t,ctx,ink){const R=it.R,ff=getComputedStyle(document.body).fontFamily,bg=getComputedStyle(it.cv.parentElement).getPropertyValue('--art-bg').trim()||'#fff';
  let target=1+.16*Math.sin(t*.9-Math.PI/2);if(it.mx!==null&&it.hov>.05){target=Math.max(.6,Math.min(1.4,Math.hypot(it.sx-it.cx,it.sy-it.cy)/(R*1.05)))}
  it.ts+=(target-it.ts)*.12;const sc=it.ts*(.9+.1*easeOut((t-.3)/.8)),fs=R*2.15*sc;
  ctx.font=`700 ${fs}px ${ff}`;ctx.textAlign='center';ctx.textBaseline='alphabetic';const m=ctx.measureText(it.letter),asc=m.actualBoundingBoxAscent||fs*.72,des=m.actualBoundingBoxDescent||0,gw=(m.actualBoundingBoxRight||m.width/2)+(m.actualBoundingBoxLeft||m.width/2);
  const by=it.cy+asc/2,x0=it.cx-gw/2-R*.08,x1=it.cx+gw/2+R*.08,y0=by-asc-R*.08,y1=by+des+R*.08,lw=Math.max(1,R*.01);
  const gp=easeOut(t/1);ctx.strokeStyle=ink;ctx.lineWidth=lw;ctx.globalAlpha=.22;ctx.setLineDash([lw*3,lw*3]);[by,by-asc,by-asc*.5].forEach(y=>{ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(it.w*gp,y);ctx.stroke()});ctx.setLineDash([]);
  ctx.fillStyle=ink;ctx.globalAlpha=easeOut((t-.25)/.7);ctx.fillText(it.letter,it.cx,by);
  const bp=easeOut((t-.7)/.6);if(bp<=0)return;ctx.globalAlpha=.9;ctx.lineWidth=lw*1.3;strokeIn(ctx,x0,y0,x1-x0,y1-y0,0,bp);
  const hp=back((t-1.1)/.5);if(hp<=0)return;const hs=Math.max(4,R*.045)*hp;
  [[x0,y0],[(x0+x1)/2,y0],[x1,y0],[x1,(y0+y1)/2],[x1,y1],[(x0+x1)/2,y1],[x0,y1],[x0,(y0+y1)/2]].forEach(([x,y])=>{ctx.globalAlpha=1;ctx.fillStyle=bg;ctx.fillRect(x-hs,y-hs,hs*2,hs*2);ctx.strokeRect(x-hs,y-hs,hs*2,hs*2)});
  ctx.fillStyle=ink;const label=`${it.letter} · ${Math.round(fs*.75)} pt`,lf=Math.max(10,R*.11);ctx.font=`600 ${lf}px ${ff}`;const lwd=ctx.measureText(label).width+lf*1.2;ctx.globalAlpha=hp;rrect(ctx,x0,y0-lf*2.4,lwd,lf*1.8,lf*.9);ctx.fill();ctx.fillStyle=bg;ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText(label,x0+lf*.6,y0-lf*1.5);
  if(it.mx===null||it.hov<.05){const cx=x1+hs*.6,cy=y1+hs*.6,k=Math.max(8,R*.12);ctx.globalAlpha=hp;ctx.fillStyle=ink;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx,cy+k);ctx.lineTo(cx+k*.28,cy+k*.72);ctx.lineTo(cx+k*.7,cy+k*.7);ctx.closePath();ctx.fill()}}
 const hash=(a,b)=>{let h=(a*374761393+b*668265263)|0;h=Math.imul(h^(h>>>13),1274126177);return ((h^(h>>>16))>>>0)/4294967295};
 const FF=()=>getComputedStyle(document.body).fontFamily;
 // 10. Cells: a mosaic of square cells whose opacity drifts; some cells light up and flicker random digits
 function cells(it,t,ctx){ctx.translate(0,-5);const R=it.R,g=Math.max(9,R*.15),gap=Math.max(1,g*.08);
  if(!it.c){const p=[],B=R*1.8;let i=0;for(let y=it.cy-B;y<=it.cy+B;y+=g,i++){let j=0;for(let x=it.cx-B;x<=it.cx+B;x+=g,j++)if(F(it,x+g/2,y+g/2)<0)p.push(x,y,hash(i,j),hash(j+7,i+3),(y-(it.cy-B))/(2*B),0)}
   const tr=[];let x=it.cx+R*.05,y=it.cy+R*1.25;for(let k=0;k<26;k++){x+=g*(hash(k,1)>.45?1:0);y+=g*(hash(k,2)>.25?1:0);tr.push(x-((x-it.cx)%g),y-((y-it.cy)%g),hash(k,3),hash(k,4),1+k/26*.6,1)}it.c=p}
  const p=it.c,fs=g*.6;ctx.font=`500 ${fs}px ui-monospace,SFMono-Regular,Menlo,monospace`;ctx.textAlign='center';ctx.textBaseline='middle';
  for(let k=0;k<p.length;k+=6){const x=p[k],y=p[k+1],h1=p[k+2],h2=p[k+3],o=p[k+4],trail=p[k+5],a=easeOut((t-.1-o*.9-h1*.25)/.45);if(a<=0)continue;
   const nb=trail?0:near(it,x+g/2,y+g/2,R*.55),lv=.16+.58*(.5+.5*Math.sin(t*(.5+h1*1.3)+h2*TAU)),lit=!trail&&(nb>.3||Math.sin(t*(.3+h2*.45)+h1*TAU*3)>.8);
   ctx.globalAlpha=a*(trail?.25+.45*(.5+.5*Math.sin(t*1.7+h1*9)):1);
   if(lit){ctx.fillStyle='#f5f5f7';ctx.fillRect(x+gap/2,y+gap/2,g-gap,g-gap);ctx.fillStyle='#111';ctx.fillText(String(Math.floor(hash(Math.floor(t*(1.5+h1*3)),k)*10)),x+g/2,y+g/2+fs*.05)}
   else{ctx.fillStyle=`rgba(236,236,240,${lv})`;ctx.fillRect(x+gap/2,y+gap/2,g-gap,g-gap)}}}
 // 11. Gradient figure: a soft-focus bust with drifting warm and cool light, fine contour lines over the neck
 function personPath(c,it){const R=it.R,cx=it.cx,hy=it.cy-R*.3;c.beginPath();c.ellipse(cx,hy,R*.58,R*.76,0,0,TAU,true);
  c.moveTo(cx-R*.36,hy+R*.45);c.lineTo(cx-R*.36,hy+R*1.05);c.bezierCurveTo(cx-R*.5,hy+R*1.36,cx-R*1.45,hy+R*1.42,cx-R*2.2,it.h+R);c.lineTo(cx+R*2.2,it.h+R);c.bezierCurveTo(cx+R*1.45,hy+R*1.42,cx+R*.5,hy+R*1.36,cx+R*.36,hy+R*1.05);c.lineTo(cx+R*.36,hy+R*.45);c.closePath()}
 function gradientFigure(it,t,ctx){const R=it.R,k=5,ow=Math.ceil(it.w/k),oh=Math.ceil(it.h/k);
  if(!it.oc||it.oc.width!==ow||it.oc.height!==oh){it.oc=document.createElement('canvas');it.oc.width=ow;it.oc.height=oh}
  const o=it.oc.getContext('2d');o.setTransform(1/k,0,0,1/k,0,0);o.clearRect(0,0,it.w,it.h);personPath(o,it);
  const hy=it.cy-R*.3,lg=o.createLinearGradient(0,hy-R*.8,0,hy+R*2.2);lg.addColorStop(0,'#ff8a5c');lg.addColorStop(.38,'#7b6cf0');lg.addColorStop(.62,'#2f3fc4');lg.addColorStop(1,'#0e1a6b');o.fillStyle=lg;o.fill();
  o.globalCompositeOperation='source-atop';
  let wx=it.cx-R*.18+Math.sin(t*.45)*R*.2,wy=hy-R*.12+Math.cos(t*.38)*R*.16;if(it.mx!==null&&it.hov>.05){wx+=(it.sx-wx)*.55*it.hov;wy+=(it.sy-wy)*.55*it.hov}
  [[wx,wy,R*.85,'255,92,58',.95],[it.cx+R*.5+Math.cos(t*.33)*R*.12,hy-R*.05,R*.75,'86,140,255',.85],[it.cx-R*.05,hy+R*1.15+Math.sin(t*.5)*R*.1,R*.55,'255,112,80',.55]].forEach(([x,y,r,c,a])=>{const rg=o.createRadialGradient(x,y,0,x,y,r);rg.addColorStop(0,`rgba(${c},${a})`);rg.addColorStop(1,`rgba(${c},0)`);o.fillStyle=rg;o.fillRect(0,0,it.w,it.h)});
  o.globalCompositeOperation='source-over';
  const fade=easeOut(t/1.3);ctx.globalAlpha=fade;ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(it.oc,0,0,ow*k,oh*k);
  ctx.save();personPath(ctx,it);ctx.clip();ctx.beginPath();ctx.rect(0,hy+R*.95,it.w,it.h);ctx.clip();ctx.lineWidth=Math.max(.6,R*.006);
  for(let i=0;i<34;i++){const y=hy+R*.55+i*R*.055,sh=Math.sin(t*.3+i*.4)*R*.05;ctx.strokeStyle=i%3?'rgba(255,255,255,.14)':'rgba(255,150,110,.28)';ctx.beginPath();ctx.moveTo(it.cx-R*2.4,y+R*.9);ctx.bezierCurveTo(it.cx-R*.8,y+R*.2+sh,it.cx+R*.8,y+R*.2-sh,it.cx+R*2.4,y+R*.9);ctx.stroke()}ctx.restore();
  if(it.kind!=='hero'){ctx.save();ctx.globalAlpha=1;ctx.globalCompositeOperation='destination-out';const fg=ctx.createLinearGradient(0,it.h*.74,0,it.h*.9);fg.addColorStop(0,'rgba(0,0,0,0)');fg.addColorStop(1,'rgba(0,0,0,1)');ctx.fillStyle=fg;ctx.fillRect(0,it.h*.74,it.w,it.h*.26);ctx.restore()}}
 // 12. Morph: coloured granules gather into U, then rearrange into X, every few seconds
 function glyphPts(letter,n){const S=220,c=document.createElement('canvas');c.width=c.height=S;const x=c.getContext('2d');x.font=`700 ${S*.92}px ${FF()}`;x.textAlign='center';x.textBaseline='middle';x.fillText(letter,S/2,S*.53);
  const d=x.getImageData(0,0,S,S).data,pts=[];for(let y=0;y<S;y+=2)for(let X=0;X<S;X+=2)if(d[(y*S+X)*4+3]>140)pts.push((X-S/2)/(S/2),(y-S/2)/(S/2));const out=new Float32Array(n*2);
  for(let i=0;i<n;i++){const k=Math.floor(rnd()*(pts.length/2))*2;out[i*2]=(pts[k]||0)+(rnd()-.5)*.04;out[i*2+1]=(pts[k+1]||0)+(rnd()-.5)*.04}return out}
 const PAL=['#b3234d','#e8543a','#f29a2e','#7a4fd6','#2c3e8f','#e86fa0','#c9a227','#ff7aa8'];
 function morph(it,t,ctx,ink,dt){const R=it.R,P=4.2;
  if(!it.c){seed=29;const n=it.kind==='hero'?1100:760,A=glyphPts('U',n),B=glyphPts('X',n),st=new Float32Array(n*4),pr=new Float32Array(n*3);
   for(let i=0;i<n;i++){st[i*4]=it.cx+(rnd()-.5)*R*.2;st[i*4+1]=it.cy+(rnd()-.5)*R*.2;pr[i*3]=R*(.014+.075*Math.pow(rnd(),3));pr[i*3+1]=Math.floor(rnd()*PAL.length);pr[i*3+2]=rnd()}it.c={n,A,B,st,pr}}
  const {n,A,B,st,pr}=it.c,cyc=Math.floor(t/P),u=t-cyc*P,f=Math.min(1,dt*60),S=R*1.5;
  for(let i=0;i<n;i++){const d=pr[i*3+2],useNew=u>d*.7,tg=(cyc+(useNew?0:-1))%2===0?A:B,o=i*4;
   let tx=it.cx+tg[i*2]*S+Math.sin(t*1.3+i)*R*.012,ty=it.cy+tg[i*2+1]*S+Math.cos(t*1.1+i*.7)*R*.012;
   if(cyc===0&&!useNew){tx=it.cx;ty=it.cy}
   let ax=(tx-st[o])*.035,ay=(ty-st[o+1])*.035;const dx=tx-st[o],dy=ty-st[o+1],dl=Math.hypot(dx,dy);if(dl>R*.1){ax+=-dy/dl*R*.004*(d>.5?1:-1);ay+=dx/dl*R*.004*(d>.5?1:-1)}
   if(it.mx!==null){const qx=st[o]-it.sx,qy=st[o+1]-it.sy,q=Math.hypot(qx,qy),rad=R*.5;if(q<rad&&q>.1){const s=(1-q/rad)*R*.03*it.hov;ax+=qx/q*s;ay+=qy/q*s}}
   st[o+2]=(st[o+2]+ax*f)*Math.pow(.86,f);st[o+3]=(st[o+3]+ay*f)*Math.pow(.86,f);st[o]+=st[o+2]*f;st[o+1]+=st[o+3]*f;
   const g=easeOut((t-.05-d*.5)/.8);if(g<=0)continue;ctx.globalAlpha=.88;ctx.fillStyle=PAL[pr[i*3+1]];ctx.beginPath();ctx.arc(st[o],st[o+1],pr[i*3]*g,0,TAU);ctx.fill()}}
 // 13. Flow: large type with dots and capsules streaming left to right through soft density fields
 function flow(it,t,ctx){const ff=FF(),wide=it.kind==='hero'&&it.w>700,x0=wide?it.w*.44:it.w*.07,maxW=wide?it.w*.5:it.w*.86;
  ctx.font=`500 100px ${ff}`;const fs=Math.min(it.h*.2,100*maxW/ctx.measureText('Healthcare').width),b1=wide?it.h*.5:it.h*.6,b2=b1+fs*1.02;
  if(!it.c||it.c.fs!==fs){seed=41;const rh=fs*.2,rows=Math.ceil(it.h/rh)+1,items=[];for(let r=0;r<rows;r++){const sp=rh*(1.2+rnd()*2.2),cnt=4+Math.floor(rnd()*6);for(let k=0;k<cnt;k++){const L=rnd()<.6?1:1+Math.floor(rnd()*3);items.push(r*rh+rh/2,rnd()*(it.w+rh*8),sp,L,rnd())}}it.c={fs,rh,items}}
  const {rh,items}=it.c,a0=easeOut(t/1.1),d=rh*.72;
  ctx.fillStyle='#ffffff';ctx.globalAlpha=.94*easeOut((t-.1)/.9);ctx.font=`500 ${fs}px ${ff}`;ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.fillText('Healthcare',x0,b1);ctx.fillText('Term',x0,b2);
  const bl=[[it.w*(.42+.08*Math.sin(t*.21)),it.h*(.42+.06*Math.cos(t*.17)),it.w*.32],[it.w*(.82+.05*Math.cos(t*.19)),it.h*(.68+.05*Math.sin(t*.23)),it.w*.26],[it.w*(.18+.06*Math.sin(t*.15)),it.h*(.86+.04*Math.cos(t*.2)),it.w*.24],[it.w*(.62+.07*Math.sin(t*.13+1)),it.h*(.2+.05*Math.cos(t*.27)),it.w*.22]];
  for(let i=0;i<items.length;i+=5){const y=items[i],sp=items[i+2],L=items[i+3],h=items[i+4],span=it.w+rh*8,len=d*L+(L-1)*rh*.28;let x=((items[i+1]+sp*t)%span)-rh*4;if(!wide&&y<it.h*.3)continue;if(wide&&x<it.w*.4&&y>it.h*.55)continue;
   let D=0;for(const [bx,by,br] of bl){const q=((x-bx)**2+(y-by)**2)/(br*br);D+=Math.exp(-q*2.2)}const nb=near(it,x+len/2,y,it.R*.6);const al=Math.min(1,Math.max(0,(D-.2)*2.2)+nb);if(al<=.02)continue;
   const s=1+nb*.5;ctx.globalAlpha=al*a0*(.75+.25*h);ctx.beginPath();ctx.roundRect?ctx.roundRect(x,y-d*s/2,len*s,d*s,d*s/2):ctx.rect(x,y-d*s/2,len*s,d*s);ctx.fill()}}
 // 11b. Gradient profile: a three-quarter bust drawn as a vector path, lit by drifting warm and cool gradients
 const PROF=[['M',-.15,-.95],['C',.35,-1,.72,-.72,.73,-.3],['C',.74,-.18,.79,-.1,.81,0],['L',.92,.17],['C',.92,.21,.86,.23,.79,.24],['C',.81,.3,.79,.35,.75,.39],['C',.78,.47,.73,.56,.63,.62],['C',.5,.71,.36,.73,.26,.7],['L',.3,1.02],['C',.45,1.2,1.05,1.32,1.62,1.68],['L',2,3.3],['L',-2,3.3],['C',-1.62,1.72,-.95,1.38,-.44,1.15],['C',-.33,.92,-.34,.72,-.37,.56],['C',-.64,.36,-.72,-.1,-.63,-.46],['C',-.55,-.8,-.4,-.94,-.15,-.95]];
 function profPath(c,ox,oy,u){c.beginPath();for(const p of PROF){const a=p.slice(1).map((v,i)=>i%2?oy+v*u:ox+v*u);if(p[0]==='M')c.moveTo(a[0],a[1]);else if(p[0]==='L')c.lineTo(a[0],a[1]);else c.bezierCurveTo(a[0],a[1],a[2],a[3],a[4],a[5])}c.closePath()}
 function profileFigure(it,t,ctx){const R=it.R,u=R*.8,ox=it.cx-R*.12,oy=it.cy-R*.45,fade=easeOut(t/1.3);
  ctx.save();ctx.globalAlpha=fade*.55;ctx.shadowColor='rgba(110,100,255,.55)';ctx.shadowBlur=R*.35;profPath(ctx,ox,oy,u);ctx.fillStyle='#4b4fd8';ctx.fill();ctx.restore();
  ctx.save();ctx.globalAlpha=fade;profPath(ctx,ox,oy,u);ctx.clip();
  const lg=ctx.createLinearGradient(0,oy-u,0,oy+u*2.6);lg.addColorStop(0,'#ff8a5c');lg.addColorStop(.36,'#8a6cf0');lg.addColorStop(.58,'#3443c9');lg.addColorStop(1,'#0d1766');ctx.fillStyle=lg;ctx.fillRect(0,0,it.w,it.h);
  let wx=ox+u*.3+Math.sin(t*.45)*u*.18,wy=oy-u*.1+Math.cos(t*.38)*u*.14;if(it.mx!==null&&it.hov>.05){wx+=(it.sx-wx)*.5*it.hov;wy+=(it.sy-wy)*.5*it.hov}
  [[wx,wy,u*1.05,'255,88,56',.95],[ox-u*.5+Math.cos(t*.33)*u*.1,oy-u*.3,u*.85,'92,146,255',.9],[ox+u*.05,oy+u*1.2+Math.sin(t*.5)*u*.08,u*.6,'255,120,86',.5]].forEach(([x,y,r,c,a])=>{const rg=ctx.createRadialGradient(x,y,0,x,y,r);rg.addColorStop(0,`rgba(${c},${a})`);rg.addColorStop(1,`rgba(${c},0)`);ctx.fillStyle=rg;ctx.fillRect(0,0,it.w,it.h)});
  ctx.fillStyle='rgba(40,36,140,.18)';ctx.beginPath();ctx.ellipse(ox-u*.1,oy+u*.1,u*.11,u*.19,-.15,0,TAU);ctx.fill();
  ctx.beginPath();ctx.rect(0,oy+u*.78,it.w,it.h);ctx.clip();ctx.lineWidth=Math.max(.6,R*.006);
  for(let i=0;i<44;i++){const y=oy+u*(.62+i*.055),sh=Math.sin(t*.3+i*.4)*u*.04;ctx.strokeStyle=i%3?'rgba(255,255,255,.16)':'rgba(255,150,110,.3)';ctx.beginPath();ctx.moveTo(ox-u*2.2,y+u*1.05);ctx.bezierCurveTo(ox-u*.8,y+u*.15+sh,ox+u*.55,y-u*.02-sh,ox+u*2.2,y+u*.85);ctx.stroke()}
  ctx.restore();
  if(it.kind!=='hero'){ctx.save();ctx.globalCompositeOperation='destination-out';const fg=ctx.createLinearGradient(0,it.h*.76,0,it.h*.9);fg.addColorStop(0,'rgba(0,0,0,0)');fg.addColorStop(1,'rgba(0,0,0,1)');ctx.fillStyle=fg;ctx.fillRect(0,it.h*.76,it.w,it.h*.24);ctx.restore()}}
 // 14. Tunnel: soft green frames recede into a bright square at the centre
 const TCOL=[[226,245,230],[206,238,213],[170,226,184],[110,200,132],[44,160,80],[22,124,56],[52,170,88],[160,236,180],[238,255,242]];
 const tcol=(f,lift)=>{f=clamp(f)*(TCOL.length-1);const i=Math.min(TCOL.length-2,Math.floor(f)),k=f-i,a=TCOL[i],b=TCOL[i+1],m=c=>Math.round(a[c]+(b[c]-a[c])*k+(255-(a[c]+(b[c]-a[c])*k))*lift);return `rgb(${m(0)},${m(1)},${m(2)})`};
 function tunnel(it,t,ctx){const N=46,ar=it.w/it.h,a0=easeOut(t/1.2);let cx=it.w/2,cy=it.h/2+5;if(it.mx!==null&&it.hov>.05){cx+=(it.sx-cx)*.12*it.hov;cy+=(it.sy-cy)*.12*it.hov}
  const M=Math.hypot(it.w,it.h)*.62,sp=.09,ph=(t*sp)%1,cyc=Math.floor(t*sp);ctx.fillStyle=tcol(0,0);ctx.fillRect(0,0,it.w,it.h);
  if('filter' in ctx)ctx.filter=`blur(${Math.max(2.5,it.R*.035)}px)`;
  for(let k=N;k>=1;k--){const f=(k-ph)/N;if(f<=0)continue;const s=Math.pow(f,2.5)*(.35+.65*a0)+.02,hw=M*s,hh=hw*(1+(1/ar-1)*Math.min(1,f*1.2)),id=k+cyc,lift=.07*(.5+.5*Math.sin(id*.9));
   ctx.fillStyle=tcol((1-f)*(.3+.7*a0),lift);ctx.beginPath();ctx.roundRect?ctx.roundRect(cx-hw,cy-hh,hw*2,hh*2,Math.min(hw,hh)*.18):ctx.rect(cx-hw,cy-hh,hw*2,hh*2);ctx.fill()}
  if('filter' in ctx)ctx.filter='none';
  const gl=ctx.createRadialGradient(cx,cy+it.R*.25,0,cx,cy+it.R*.25,it.R*.9);gl.addColorStop(0,`rgba(240,255,244,${.75*a0*(.85+.15*Math.sin(t*1.4))})`);gl.addColorStop(1,'rgba(240,255,244,0)');ctx.fillStyle=gl;ctx.fillRect(0,0,it.w,it.h)}
 // 15. Halo: an iridescent ring with dust drifting out of its right side, like an assistant waking up
 const HPAL=['#7effcd','#ffd678','#78c8ff','#9670ff','#ff5aaa','#7effcd'];
 function halo(it,t,ctx){const R=it.R*1.02,cx=it.cx,cy=it.cy,a0=easeOut(t/1.4);
  if(!it.c){seed=53;const n=it.kind==='hero'?1500:950,P=new Float32Array(n*6);for(let i=0;i<n;i++){P[i*6]=rnd();P[i*6+1]=rnd()*TAU;P[i*6+2]=Math.sqrt(rnd());P[i*6+3]=rnd();P[i*6+4]=1.2+rnd()*1.9;P[i*6+5]=.4+rnd()}it.c=P}
  const P=it.c;ctx.globalCompositeOperation='lighter';
  for(let i=0;i<P.length;i+=6){const ang=P[i+1],cr=Math.cos(ang),bias=cr>-.25?1:.35;const life=(P[i]+t*.045*P[i+5])%1;
   let x=cx+cr*P[i+2]*R*.95+Math.pow(life,1.6)*R*1.1*bias,y=cy+Math.sin(ang)*P[i+2]*R*.95+Math.sin(life*6+ang)*R*.04;
   const nb=near(it,x,y,R*.5);if(nb){const dx=x-it.sx,dy=y-it.sy,d=Math.hypot(dx,dy)||1;x+=dx/d*nb*R*.3;y+=dy/d*nb*R*.3}
   const al=Math.sin(life*Math.PI)*(.35+.65*bias)*a0;if(al<.03)continue;const c=P[i+3];ctx.fillStyle=c<.45?`rgba(255,120,70,${al})`:c<.82?`rgba(130,255,210,${al})`:`rgba(255,255,255,${al})`;
   const s=P[i+4];ctx.fillRect(x-s/2,y-s/2,s,s)}
  const ring=(k)=>{ctx.beginPath();const n=120;for(let j=0;j<=n;j++){const a=j/n*TAU,w=R*(.06+.09*(.5+.5*Math.cos(a-2.4+Math.sin(t*.3)*.6)))*k,r=R*(.92+.08*a0)+w/2;j?ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r):ctx.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}
   for(let j=n;j>=0;j--){const a=j/n*TAU,w=R*(.06+.09*(.5+.5*Math.cos(a-2.4+Math.sin(t*.3)*.6)))*k,r=R*(.92+.08*a0)-w/2;ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}ctx.closePath()};
  let g;if(ctx.createConicGradient){g=ctx.createConicGradient(t*.25,cx,cy);HPAL.forEach((c,i)=>g.addColorStop(i/(HPAL.length-1),c))}else{g=ctx.createLinearGradient(cx-R,cy-R,cx+R,cy+R);HPAL.forEach((c,i)=>g.addColorStop(i/(HPAL.length-1),c))}
  const hb=it.hov*.25;ctx.fillStyle=g;[[3,.16,.38],[1.8,.07,.6],[1.05,.028,.8]].forEach(([k,bl,al])=>{ctx.globalAlpha=(al+hb*.3)*a0;if('filter' in ctx)ctx.filter=`blur(${R*bl}px)`;ring(k);ctx.fill()});if('filter' in ctx)ctx.filter='none';ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1}
 // 16. Digit glyph: a Helvetica-style capital built from 1s and 2s of varying size, turning slowly
 function digitGlyph(it,t,ctx,ink){const R=it.R,g=Math.max(6.5,R*.1);
  if(!it.c){seed=61;const S=280,c=document.createElement('canvas');c.width=c.height=S;const x=c.getContext('2d');x.font=`700 ${S*.98}px "Helvetica Neue",Helvetica,Arial,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(it.letter||'H',S/2,S*.54);
   const d=x.getImageData(0,0,S,S).data,box=R*3,p=[];const ccy=it.cy+(it.kind==='hero'?0:R*.14);for(let y=ccy-box/2;y<=ccy+box/2;y+=g*1.05)for(let X=it.cx-box/2;X<=it.cx+box/2;X+=g*.82){const sx=Math.round((X-it.cx)/box*S+S/2),sy=Math.round((y-ccy)/box*S+S/2);if(sx>=0&&sy>=0&&sx<S&&sy<S&&d[(sy*S+sx)*4+3]>130)p.push(X,y,rnd(),rnd(),(y-(it.cy-box/2))/box)}it.c=p}
  const p=it.c,sq=.8+.2*Math.cos(t*.5),buckets=[[],[],[],[],[],[]];
  for(let i=0;i<p.length;i+=5){const h1=p[i+2],h2=p[i+3],a=easeOut((t-.1-p[i+4]*.7-h1*.3)/.5);if(a<=0)continue;const x=it.cx+(p[i]-it.cx)*sq,y=p[i+1],nb=near(it,x,y,R*.55);
   const sz=(.7+.6*h1)*(1+.12*Math.sin(t*1.4+h2*TAU))*(1+nb*.7),b=Math.min(5,Math.floor((sz-.6)/.25));buckets[Math.max(0,b)].push(x,y,hash(Math.floor(t*(.5+h2*1.2)),i)>.5?'1':'2',(.5+.5*h2)*a+nb*.4)}
  ctx.fillStyle=ink;ctx.textAlign='center';ctx.textBaseline='middle';
  buckets.forEach((bk,b)=>{if(!bk.length)return;ctx.font=`600 ${g*(.65+b*.25)}px "Helvetica Neue",Helvetica,Arial,sans-serif`;for(let k=0;k<bk.length;k+=4){ctx.globalAlpha=Math.min(1,bk[k+3]);ctx.fillText(bk[k+2],bk[k],bk[k+1])}})}
 // 17. Blobs: circles wander inside a soft quadrilateral whose corners are pulled by four of them
 function blobs(it,t,ctx){const R=it.R*.98,cx=it.cx,cy=it.cy+it.R*.08,a0=back(t/1),cr=R*.21;
  const base=[[-1,-.72],[1,-.66],[.58,.86],[-.68,.66]],C=base.map(([x,y],i)=>[cx+(x*R+Math.sin(t*.72+i*1.7)*R*.26)*a0,cy+(y*R+Math.cos(t*.61+i*2.3)*R*.22)*a0]);
  const bil=(u,v)=>[(1-v)*((1-u)*C[0][0]+u*C[1][0])+v*((1-u)*C[3][0]+u*C[2][0]),(1-v)*((1-u)*C[0][1]+u*C[1][1])+v*((1-u)*C[3][1]+u*C[2][1])];
  ctx.fillStyle=ctx.strokeStyle='#dcb3f6';ctx.lineJoin='round';ctx.lineWidth=cr*2;ctx.beginPath();C.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();ctx.stroke();
  const col=['#f0956e','#0d1a5c','#f0c040','#0d1a5c','#ec7350','#f5e3c6','#f0956e','#f0c040'],pts=C.slice();
  for(let k=0;k<4;k++)pts.push(bil(.5+.3*Math.sin(t*.5+k*1.6),.5+.3*Math.cos(t*.43+k*1.9)));
  pts.forEach(([x,y],i)=>{const nb=near(it,x,y,R*.6);if(nb){const dx=x-it.sx,dy=y-it.sy,d=Math.hypot(dx,dy)||1;x+=dx/d*nb*R*.25;y+=dy/d*nb*R*.25}ctx.fillStyle=col[i];ctx.globalAlpha=i===5?.95:1;ctx.beginPath();ctx.arc(x,y,cr*Math.min(1,a0),0,TAU);ctx.fill()})}
 // 18. Shapes: circles, capsules, bursts and AI sparkles in gradients line up into a cross over a dot grid
 const SPAL=[['#6ff0d0','#2fb38f'],['#3b5bff','#a7b6ff'],['#fff07a','#ffc531'],['#f7dcff','#ffffff'],['#ff8a3d','#ff4d1f'],['#62dd74','#a8f5b4'],['#7fd6ff','#2f8cff'],['#5a5a5e','#3a3a3e']];
 function starPath(c,n,ro,ri){c.beginPath();for(let i=0;i<n*2;i++){const r=i%2?ri:ro,a=i*Math.PI/n-Math.PI/2;i?c.lineTo(Math.cos(a)*r,Math.sin(a)*r):c.moveTo(Math.cos(a)*r,Math.sin(a)*r)}c.closePath()}
 function shapes(it,t,ctx){const R=it.R,g=Math.max(11,R*.2);
  ctx.fillStyle='rgba(255,255,255,.22)';const dg=g*.75;for(let y=dg/2;y<it.h;y+=dg)for(let x=dg/2;x<it.w;x+=dg)ctx.fillRect(x,y,1,1);
  if(!it.c){seed=71;const p=[],B=R*1.7;for(let y=it.cy-B;y<=it.cy+B;y+=g)for(let x=it.cx-B;x<=it.cx+B;x+=g){const jx=x+(rnd()-.5)*g*.25,jy=y+(rnd()-.5)*g*.25;if(F(it,jx,jy)<-.02)p.push(jx,jy,Math.floor(rnd()*6),Math.floor(rnd()*SPAL.length),rnd(),rnd()*TAU,Math.hypot(jx-it.cx,jy-it.cy)/R)}it.c=p}
  const p=it.c;for(let i=0;i<p.length;i+=7){const x=p[i],y=p[i+1],ty=p[i+2],pc=SPAL[p[i+3]],h=p[i+4],rot=p[i+5],o=p[i+6],s=back((t-.1-o*.5-h*.3)/.5);if(s<=0)continue;
   const nb=near(it,x,y,R*.55),r=g*.42*(.75+.45*h),bob=Math.sin(t*1.2+h*9)*g*.06;ctx.save();ctx.translate(x,y+bob);ctx.rotate(rot+(ty===2||ty===3?t*.4*(h-.5):0)+nb*.8);ctx.scale(s*(1+nb*.5),s*(1+nb*.5));
   const gr=ctx.createLinearGradient(-r,-r,r,r);gr.addColorStop(0,pc[0]);gr.addColorStop(1,pc[1]);ctx.fillStyle=gr;ctx.globalAlpha=1;
   if(ty===0){ctx.beginPath();ctx.arc(0,0,r,0,TAU);ctx.fill()}else if(ty===1){ctx.beginPath();ctx.roundRect?ctx.roundRect(-r*1.45,-r*.62,r*2.9,r*1.24,r*.62):ctx.rect(-r*1.45,-r*.62,r*2.9,r*1.24);ctx.fill()}
   else if(ty===2){starPath(ctx,4,r*1.2,r*.34);ctx.fill()}else if(ty===3){starPath(ctx,12,r*1.05,r*.74);ctx.fill()}
   else if(ty===4){ctx.beginPath();ctx.arc(-r*.32,-r*.2,r*.72,0,TAU);ctx.arc(r*.32,r*.2,r*.72,0,TAU);ctx.fill()}else{ctx.beginPath();ctx.arc(0,0,r*.55,0,TAU);ctx.fill()}ctx.restore()}}
 // 19. Ripple: a dot field bulges into a sphere; moving the pointer (or idle time) sends waves through it
 function ripple(it,t,ctx,ink){const R=it.R,g=Math.max(7,R*.09),Rc=R*1.1,cx=it.cx,cy=it.cy,top=g*.5,a0=easeOut(t/1.2);
  if(!it.rp){it.rp=[];it.rpl=-9;it.rpx=null}
  if(it.mx!==null&&it.hov>.3){if(it.rpx===null||Math.hypot(it.sx-it.rpx,it.sy-it.rpy)>R*.22){it.rp.push([it.sx,it.sy,t]);it.rpx=it.sx;it.rpy=it.sy}}
  else if(t-it.rpl>2.4){const a=rnd()*TAU,r=rnd()*Rc*.7;it.rp.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r,t]);it.rpl=t}
  it.rp=it.rp.filter(r=>t-r[2]<3).slice(-10);ctx.fillStyle=ink;
  const x0=g*.5,x1=it.w,y1=it.h;ctx.beginPath();
  for(let y=top;y<=y1;y+=g)for(let x=x0;x<=x1;x+=g){let X=x,Y=y;const dx=x-cx,dy=y-cy,d=Math.hypot(dx,dy);let sz=1;
   if(d<Rc){const k=d/Rc,nr=Rc*Math.sin(k*Math.PI/2)*(.15+.85*a0)+d*(1-a0)*0,sw=.35*(1-k)*Math.sin(t*.4);const an=Math.atan2(dy,dx)+sw;X=cx+Math.cos(an)*nr;Y=cy+Math.sin(an)*nr;sz=1+.7*Math.pow(k,6)}
   for(const [rx,ry,rt] of it.rp){const age=t-rt,ex=X-rx,ey=Y-ry,dr=Math.hypot(ex,ey)||1,front=age*R*1.3,amp=R*.06*Math.exp(-age*1.2)*Math.exp(-Math.pow((dr-front)/(R*.32),2))*Math.cos((dr-front)/(R*.09));X+=ex/dr*amp;Y+=ey/dr*amp;sz+=Math.abs(amp)/(R*.06)*.5}
   const rr=g*.16*sz;ctx.moveTo(X+rr,Y);ctx.arc(X,Y,rr,0,TAU)}
  ctx.globalAlpha=.85*a0;ctx.fill()}
 // 16b. Extruded digit glyph: a Helvetica-style letter built from 0s and 1s, with stacked depth layers that swing as it turns
 function digitGlyph3d(it,t,ctx,ink){const R=it.R,g=Math.max(6.5,R*.1);
  if(!it.c){seed=61;const S=280,c=document.createElement('canvas');c.width=c.height=S;const x=c.getContext('2d');x.font=`700 ${S*.98}px "Helvetica Neue",Helvetica,Arial,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(it.letter||'h',S/2,S*.5);
   const d=x.getImageData(0,0,S,S).data,box=R*2.9,p=[],ccy=it.cy+(it.kind==='hero'?0:R*.12)-25;for(let y=ccy-box/2;y<=ccy+box/2;y+=g*1.05)for(let X=it.cx-box/2;X<=it.cx+box/2;X+=g*.82){const sx=Math.round((X-it.cx)/box*S+S/2),sy=Math.round((y-ccy)/box*S+S/2);if(sx>=0&&sy>=0&&sx<S&&sy<S&&d[(sy*S+sx)*4+3]>130)p.push(X,y,rnd(),rnd(),(y-(ccy-box/2))/box)}it.c=p}
  const p=it.c,ang=Math.sin(t*.5)*.6,sq=Math.cos(ang),ex=Math.sin(ang)*g*1.1,ey=g*.55,L=6;ctx.fillStyle=ink;ctx.textAlign='center';ctx.textBaseline='middle';
  for(let l=L;l>=0;l--){const front=l===0,fs=g*(front?1:.9);ctx.font=`${front?700:500} ${fs}px "Helvetica Neue",Helvetica,Arial,sans-serif`;
   for(let i=0;i<p.length;i+=5){const h1=p[i+2],h2=p[i+3],a=easeOut((t-.1-p[i+4]*.7-h1*.3)/.5);if(a<=0)continue;let x=it.cx+(p[i]-it.cx)*sq+ex*l,y=p[i+1]+ey*l*.6;const nb=front?near(it,x,y,R*.55):0;
    ctx.globalAlpha=front?Math.min(1,(.65+.35*h2)*a+nb*.4):a*(.1+.32*(1-l/L));const ch=hash(Math.floor(t*(.5+h2*1.2))+l,i)>.5?'1':'0';
    if(front&&(nb>.05||h1>.82)){ctx.save();ctx.translate(x,y);ctx.scale(1+nb*.6+(h1>.82?.25:0),1+nb*.6+(h1>.82?.25:0));ctx.fillText(ch,0,0);ctx.restore()}else ctx.fillText(ch,x,y)}}}
 // 20. Lissajous: one closed line drifts between a circle, harmonic figures and the letters AI, leaving faint traces over a guide grid
 function polyResample(pts,n){const L=[0];for(let i=1;i<pts.length;i++)L.push(L[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));const tot=L[L.length-1],out=[];let j=0;for(let k=0;k<n;k++){const s=k/n*tot;while(j<L.length-2&&L[j+1]<s)j++;const f=(s-L[j])/((L[j+1]-L[j])||1);out.push([pts[j][0]+(pts[j+1][0]-pts[j][0])*f,pts[j][1]+(pts[j+1][1]-pts[j][1])*f])}return out}
 const AIPATH=polyResample([[-1,1],[-.58,-1],[-.16,1],[-.29,.42],[-.87,.42],[-.29,.42],[-.16,1],[.5,1],[.5,-1],[.5,1],[-.16,1],[-1,1]],420);
 function lissa(it,t,ctx,ink){const R=it.R*1.05,cx=it.cx,cy=it.cy,N=420,P=14,u=(t%P)/P*7,seg=Math.floor(u),f=ease((u-seg)*1.25-.12);
  const circle=k=>{const a=k/N*TAU+Math.PI*.75;return [Math.cos(a),Math.sin(a)]},liss=(a,b,ph)=>k=>{const th=k/N*TAU;return [Math.sin(a*th+ph),Math.sin(b*th)]},ai=k=>AIPATH[k];
  const ph=t*.6,K=[circle,liss(1,2,ph),liss(3,2,ph),ai,ai,liss(2,3,ph),circle,circle],A=K[seg],B=K[seg+1];
  if(!it.tr){it.tr=[];it.trt=0}ctx.strokeStyle='rgba(120,220,210,.28)';ctx.lineWidth=1;const gx=[cx-R,cx,cx+R],gy=[cy-R,cy,cy+R];ctx.globalAlpha=easeOut(t/1);
  ctx.beginPath();gx.forEach(x=>{ctx.moveTo(x,0);ctx.lineTo(x,it.h)});gy.forEach(y=>{ctx.moveTo(0,y);ctx.lineTo(it.w,y)});ctx.stroke();
  const pts=[];for(let k=0;k<N;k++){const a=A(k),b=B(k);let x=cx+(a[0]+(b[0]-a[0])*f)*R,y=cy+(a[1]+(b[1]-a[1])*f)*R;const nb=near(it,x,y,R*.5);if(nb){const dx=x-it.sx,dy=y-it.sy,d=Math.hypot(dx,dy)||1;x+=dx/d*nb*R*.18;y+=dy/d*nb*R*.18}pts.push(x,y)}
  if(t-it.trt>.14){it.tr.unshift(pts);it.tr=it.tr.slice(0,7);it.trt=t}
  const draw=(q,al,lw)=>{ctx.globalAlpha=al;ctx.lineWidth=lw;ctx.beginPath();for(let k=0;k<q.length;k+=2)k?ctx.lineTo(q[k],q[k+1]):ctx.moveTo(q[k],q[k+1]);ctx.closePath();ctx.stroke()};
  ctx.strokeStyle=ink;ctx.lineJoin='round';it.tr.forEach((q,i)=>draw(q,.22*(1-i/7)*easeOut(t/1),1));const prog=easeOut(t/1.2);
  if(prog<1){ctx.globalAlpha=1;ctx.lineWidth=Math.max(1.6,R*.016);ctx.beginPath();const m=Math.floor(N*prog);for(let k=0;k<m;k++)k?ctx.lineTo(pts[k*2],pts[k*2+1]):ctx.moveTo(pts[0],pts[1]);ctx.stroke()}else draw(pts,1,Math.max(1.6,R*.016));
  ctx.fillStyle='rgba(120,220,210,.8)';[[cx,cy-R],[cx-R,cy],[cx+R,cy],[cx,cy+R]].forEach(([x,y])=>{ctx.globalAlpha=1;ctx.beginPath();ctx.arc(x,y,2,0,TAU);ctx.fill()})}
 // 21. Rain 3D: a turning volumetric cross shaded in blue cells (AI / + / 1) while columns of 0s fall behind it
 function rain3d(it,t,dt,ctx){const {w,h,cell,lh,cols,rows,zb,cb,lb,geo}=it,R=it.R;
  const ay=.62*Math.sin(t*.55),ax=.32+.1*Math.sin(t*.4),ca=Math.cos(ay),sa=Math.sin(ay),cx2=Math.cos(ax),sx2=Math.sin(ax),grow=easeOut(t/1.2);zb.fill(-1e9);cb.fill(0);
  for(let p=0;p<geo.length;p+=6){const x=geo[p],y=geo[p+1],z=geo[p+2],x1=x*ca+z*sa,z1=-x*sa+z*ca,y2=y*cx2-z1*sx2,z2=y*sx2+z1*cx2;
   const nx=geo[p+3],ny=geo[p+4],nz=geo[p+5],nx1=nx*ca+nz*sa,nz1=-nx*sa+nz*ca,ny2=ny*cx2-nz1*sx2,nz2=ny*sx2+nz1*cx2;let lum=nx1*LX+ny2*LY+nz2*LZ;lum=Math.max(.04,lum<0?lum*.25:lum);
   const f=4/(4-z2),px=it.cx+x1*R*f*grow,py=it.cy-y2*R*f*grow,c=Math.floor(px/cell),r=Math.floor(py/lh);if(c<0||r<0||c>=cols||r>=rows)continue;const id=r*cols+c;if(z2>zb[id]){zb[id]=z2;lb[id]=lum;cb[id]=1}}
  ctx.font=`700 ${cell*.95}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace`;ctx.textAlign='center';ctx.textBaseline='middle';const top=it.kind==='hero'?0:Math.floor(h*.3/lh);
  for(let c=0;c<cols;c++){const sp=1.5+hash(c,5)*3,off=hash(c,9)*rows,len=4+hash(c,11)*10,head=(t*sp+off)%(rows+len);
   for(let r=top;r<rows;r++){const id=r*cols+c,x=(c+.5)*cell,y=(r+.5)*lh;
    if(cb[id]){const lum=lb[id],nb=near(it,x,y,R*.5);let bg,fg,ch;if(lum>.62){bg='#8fd6f2';fg='#14205e';ch=c%2?'I':'A'}else if(lum>.36){bg='#7d97ee';fg='#14205e';ch=hash(c+r,Math.floor(t*2))>.7?'+':(c%2?'I':'A')}else{bg='#16207a';fg='#ffffff';ch=hash(c*7+r,Math.floor(t*3))>.85?'0':'1'}
     ctx.globalAlpha=1;ctx.fillStyle=nb>.2?'#ffffff':bg;ctx.fillRect(c*cell,r*lh,cell+.5,lh+.5);ctx.fillStyle=nb>.2?'#16207a':fg;ctx.fillText(ch,x,y)}
    else{const d=head-r;if(d<0||d>len)continue;ctx.globalAlpha=(1-d/len)*.75;ctx.fillStyle='#1d2a8a';ctx.fillText(hash(c*13+r,Math.floor(t*4+c))>.8?'1':'0',x,y)}}}}
 // 22. Tetris words: UX principles drop in as blocks and stack up, then clear and start again
 const TPAL={p:'#9b6bff',g:'#6ee08f',b:'#4fb3ff',w:'#f2f2f2'};
 const TPLAN=[[0,0,3,'SAFETY','p'],[3,0,2,'CALM','g'],[5,0,1,'A','w'],[0,1,3,'TRUST','p'],[3,1,1,'+','w'],[4,1,2,'CLEAR','b'],[1,2,2,'CARE','g'],[3,2,1,'0','w'],[5,2,1,'?','w'],[0,3,2,'HUMAN','b'],[4,3,2,'ACCESS','p'],[2,3.35,2,'UX','b',-.5]];
 function tetris(it,t,ctx){const ff=FF(),wide=it.kind==='hero'&&it.w>700,cols=6,cs=wide?Math.min(it.w*.42/cols,it.h*.15):it.w/cols,x0=wide?it.w*.52:0,base=it.h-(wide?it.h*.08:it.h*.13),P=TPLAN.length,step=.55,cyc=P*step+3,u=t%cyc;
  const fade=u>P*step+2.4?1-(u-P*step-2.4)/.6:1;
  ctx.fillStyle='rgba(255,255,255,.9)';[[.22,.18],[.48,.12],[.8,.22],[.3,.33],[.7,.38]].forEach(([fx,fy],i)=>{const on=(Math.sin(t*1.3+i*2)+1)/2;if(!wide&&fy<.3)return;ctx.globalAlpha=.25+.6*on;const s=cs*.18;ctx.fillRect((wide?x0:0)+fx*(wide?it.w*.42:it.w),fy*it.h,s,s)});
  TPLAN.forEach(([c,r,wd,word,col,rot],i)=>{const st=i*step,k=(u-st)/.6;if(k<=0)return;const e=back(Math.min(1,k)),tx=x0+c*cs,ty=base-(r+1)*cs,y=-cs*1.5+(ty+cs*1.5)*e,w=wd*cs;
   const nb=near(it,tx+w/2,y+cs/2,cs*1.2),lift=nb*cs*.12;ctx.save();ctx.globalAlpha=fade;ctx.translate(tx+w/2,y+cs/2-lift);if(rot)ctx.rotate(rot*Math.min(1,e));
   ctx.fillStyle=TPAL[col];ctx.fillRect(-w/2,-cs/2,w,cs);ctx.strokeStyle='rgba(0,0,0,.12)';ctx.lineWidth=1;for(let q=1;q<wd;q++){ctx.beginPath();ctx.moveTo(-w/2+q*cs,-cs/2);ctx.lineTo(-w/2+q*cs,cs/2);ctx.stroke()}
   ctx.fillStyle='#0b0b0c';let fs=cs*.62;ctx.font=`700 ${fs}px ${ff}`;const mw=ctx.measureText(word).width;if(mw>w*.88){fs*=w*.88/mw;ctx.font=`700 ${fs}px ${ff}`}ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(word,0,cs*.04);ctx.restore()})}
 // 23. Gradient boxes: translucent colour blocks slide left to right, stretching and overlapping on a halftone grid
 const GBX=[['#b14dff','#ff6ad5'],['#ff5a3c','#ff9a6b'],['#2f8a3c','#ffffff'],['#e8452c','#f7a4a4'],['#ff7a2f','#ffc64a'],['#7a2b4a','#e04a6a'],['#c7d7e8','#7aa6d6'],['#a35bff','#e6c8ff'],['#f05a5a','#ffd0c0']];
 function gboxes(it,t,ctx){const wide=it.kind==='hero'&&it.w>700,top=wide?it.h*.1:it.h*.32,rh=(it.h-top-(wide?it.h*.1:it.h*.14))/6,a0=easeOut(t/1);
  
  if(!it.c){seed=83;const B=[];for(let i=0;i<16;i++)B.push(Math.floor(rnd()*6),rnd(),.6+rnd()*1.6,1+Math.floor(rnd()*2),Math.floor(rnd()*GBX.length),.25+rnd()*.5,rnd()*TAU);it.c=B}
  ctx.globalCompositeOperation='multiply';const B=it.c,span=it.w*1.6;
  for(let i=0;i<B.length;i+=7){const row=B[i],w=rh*1.6*(B[i+2]+.5*Math.sin(t*.7+B[i+6])),h=rh*B[i+3]*(1+.15*Math.sin(t*.9+B[i+6]*2)),x=((B[i+1]*span+t*rh*B[i+5]*1.4)%span)-it.w*.3,y=top+row*rh;const pc=GBX[B[i+4]],g=ctx.createLinearGradient(0,y,0,y+h);g.addColorStop(0,pc[0]);g.addColorStop(1,pc[1]);
   const nb=near(it,x+w/2,y+h/2,it.R*.8);ctx.globalAlpha=(.78+nb*.2)*a0;ctx.fillStyle=g;ctx.fillRect(x,y-nb*rh*.15,w*(1+nb*.15),h)}
  ctx.globalCompositeOperation='source-over';ctx.fillStyle='rgba(255,255,255,.28)';const dg=Math.max(3,rh*.12);ctx.globalAlpha=1;for(let y=top;y<it.h;y+=dg)for(let x=0;x<it.w;x+=dg)ctx.fillRect(x,y,1,1)}
 // 19b. Cenacle mark: the dot field forms the rounded C-and-bar logo; waves still ripple through it
 function cenMark(x,y,a,b){const X=x/a,Y=y/b;if(Math.pow(Math.abs(X),2.6)+Math.pow(Math.abs(Y),2.6)>1)return 0;const sx=X*1.3,sy=Y*.85;
  if(Math.abs(sx)<.05&&Math.abs(sy)<.6)return 2;if(sx>=0&&Math.abs(sy)<.05+.13*Math.exp(-sx/.08))return 2;if(sx>=0&&Math.abs(sy)<.6&&sx<.05+.13*Math.exp(-Math.abs(sy)/.08))return 2;return 1}
 function cenacle(it,t,ctx){const R=it.R,g=Math.max(5,R*.06),A=R*1.45,Bh=R*.95,cx=it.cx,cy=it.cy+(it.kind==='hero'?0:R*.12),a0=easeOut(t/1.2);
  if(!it.rp){it.rp=[];it.rpl=-9;it.rpx=null}
  if(it.mx!==null&&it.hov>.3){if(it.rpx===null||Math.hypot(it.sx-it.rpx,it.sy-it.rpy)>R*.2){it.rp.push([it.sx,it.sy,t]);it.rpx=it.sx;it.rpy=it.sy}}else if(t-it.rpl>2.4){it.rp.push([cx+(rnd()-.5)*A*1.4,cy+(rnd()-.5)*Bh*1.4,t]);it.rpl=t}
  it.rp=it.rp.filter(r=>t-r[2]<3).slice(-10);
  const lg=ctx.createLinearGradient(0,cy-Bh,0,cy+Bh);lg.addColorStop(0,'#4a80e2');lg.addColorStop(1,'#3656d0');const pin=new Path2D(),pout=new Path2D();
  for(let y=g*.5;y<it.h;y+=g)for(let x=g*.5;x<it.w;x+=g){const m=cenMark(x-cx,y-cy,A,Bh);if(m===2)continue;let X=x,Y=y,sz=m?1:.5;
   for(const [rx,ry,rt] of it.rp){const age=t-rt,ex=X-rx,ey=Y-ry,dr=Math.hypot(ex,ey)||1,front=age*R*1.3,amp=R*.06*Math.exp(-age*1.2)*Math.exp(-Math.pow((dr-front)/(R*.32),2))*Math.cos((dr-front)/(R*.09));X+=ex/dr*amp;Y+=ey/dr*amp;sz+=Math.abs(amp)/(R*.06)*.45}
   const rr=g*(m?.3:.13)*sz*(m?(.4+.6*a0):1),pp=m?pin:pout;pp.moveTo(X+rr,Y);pp.arc(X,Y,rr,0,TAU)}
  ctx.globalAlpha=.35;ctx.fillStyle='#3656d0';ctx.fill(pout);ctx.globalAlpha=a0;ctx.fillStyle=lg;ctx.fill(pin)}
 // 22b. Tetrominoes: four-cell pieces carry one letter per cell (vertical pieces read top to bottom) and stack up
 const TPAL2={p:'#9b6bff',g:'#6ee08f',b:'#4fb3ff',w:'#f2f2f2',y:'#ffd166'};
 const TPLAN2=[[[[0,0],[1,0],[2,0],[3,0]],'SAFE','p'],[[[4,1],[5,1],[4,0],[5,0]],'CALM','g'],[[[6,3],[6,2],[6,1],[6,0]],'CARE','b'],[[[7,3],[7,2],[7,1],[7,0]],'HOPE','w'],
  [[[0,2],[0,1],[1,1],[2,1]],'EASE','b'],[[[2,3],[2,2],[3,2],[3,1]],'KIND','y'],[[[3,3],[4,3],[5,3],[4,2]],'USER','p'],[[[0,4],[1,4],[2,4],[3,4]],'OPEN','g'],[[[4,5],[4,4],[5,4],[6,4]],'FLOW','w']];
 function tetris2(it,t,ctx){const ff=FF(),wide=it.kind==='hero'&&it.w>700,cols=8,cs=wide?Math.min(it.w*.4/cols,it.h*.12):it.w/cols,x0=wide?it.w*.54:0,base=it.h-(wide?it.h*.08:it.h*.13),P=TPLAN2.length,step=.6,cyc=P*step+3.2,u=t%cyc,fade=u>P*step+2.6?1-(u-P*step-2.6)/.6:1;
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`700 ${cs*.5}px ${ff}`;
  TPLAN2.forEach(([cells,word,col],i)=>{const k=(u-i*step)/.6;if(k<=0)return;const e=easeOut(Math.min(1,k)),topR=Math.max(...cells.map(c=>c[1])),drop=(1-e)*(base-(topR+1)*cs+cs*1.2);
   cells.forEach(([c,r],j)=>{const x=x0+c*cs,y=base-(r+1)*cs-drop,nb=near(it,x+cs/2,y+cs/2,cs*1.4);ctx.globalAlpha=fade;ctx.fillStyle=TPAL2[col];ctx.fillRect(x,y-nb*cs*.1,cs,cs);
    ctx.strokeStyle='rgba(0,0,0,.18)';ctx.lineWidth=1;ctx.strokeRect(x+.5,y+.5-nb*cs*.1,cs-1,cs-1);ctx.fillStyle='#0b0b0c';ctx.fillText(word[j],x+cs/2,y+cs*.53-nb*cs*.1)})})}
 // 24. Mosaic figure: a profile bust rendered as pixel cells, glyph tiles, ruled black cells and clusters of bubbles
 const MPAL=['#e04cc6','#9fe8d0','#2a4bff','#b9a6e8','#c66be8','#7fd9c0'],MCH='MKDSNW630%#&8';
 function mosaic(it,t,ctx){ctx.translate(0,-25);const R=it.R,g=Math.max(7,R*.12),u=R*.8,ox=it.cx-R*.12,oy=it.cy-R*.45;
  if(!it.c){seed=97;const m=document.createElement('canvas');m.width=Math.ceil(it.w);m.height=Math.ceil(it.h);const mc=m.getContext('2d');profPath(mc,ox,oy,u);mc.fill();const d=mc.getImageData(0,0,m.width,m.height).data,cells=[],bub=[];
   for(let y=0;y<it.h;y+=g)for(let x=0;x<it.w;x+=g){const px=Math.min(m.width-1,Math.floor(x+g/2)),py=Math.min(m.height-1,Math.floor(y+g/2));if(d[(py*m.width+px)*4+3]>120&&y>it.h*.27&&y<it.h*.88)cells.push(x,y,rnd(),rnd())}
   for(let i=0;i<70;i++){const k=Math.floor(rnd()*(cells.length/4))*4,bx=cells[k]+rnd()*g,by=cells[k+1]+rnd()*g;const zone=Math.sin(bx*.03)+Math.cos(by*.025);if(zone>.4||rnd()<.15)bub.push(bx,by,g*(.18+rnd()*.42),rnd())}it.c={cells,bub}}
  const {cells,bub}=it.c;ctx.font=`600 ${g*.72}px ui-monospace,SFMono-Regular,Menlo,monospace`;ctx.textAlign='center';ctx.textBaseline='middle';
  for(let i=0;i<cells.length;i+=4){const x=cells[i],y=cells[i+1],h1=cells[i+2],h2=cells[i+3],a=easeOut((t-.1-(y/it.h)*.8-h1*.3)/.5);if(a<=0)continue;const nb=near(it,x+g/2,y+g/2,R*.5);
   const band=(Math.sin(x*.04+t*.5)+Math.cos(y*.05-t*.4)+2)/4,flip=hash(i,Math.floor(t*(.6+h2)))>.88;let type=h1<.18?'line':h1<.42?'char':'pix';if(nb>.3)type='char';
   ctx.globalAlpha=a;if(type==='line'){ctx.fillStyle='#05050f';ctx.fillRect(x,y,g,g);ctx.fillStyle='rgba(159,232,208,.85)';ctx.fillRect(x,y+g*.72,g,1)}
   else{const col=MPAL[Math.floor((band*MPAL.length+(flip?2:0)))%MPAL.length];ctx.fillStyle=col;ctx.fillRect(x,y,g+.5,g+.5);if(type==='char'){ctx.fillStyle=h2>.5?'#05050f':'#ffffff';ctx.fillText(MCH[Math.floor(hash(i,Math.floor(t*(.8+h2*2)))*MCH.length)],x+g/2,y+g*.55)}}}
  ctx.lineWidth=1;ctx.strokeStyle='#14143a';for(let i=0;i<bub.length;i+=4){const x=bub[i],y=bub[i+1]-((t*g*.25*(.4+bub[i+3]))%(g*1.5)),r=bub[i+2]*(1+.08*Math.sin(t*2+i)),a=easeOut((t-.8-bub[i+3]*.6)/.5);if(a<=0)continue;ctx.globalAlpha=a;ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();ctx.stroke()}}
 // 25. Reeded glass: big type and a violet glow behind vertical fluted glass that refracts and drifts
 function reeded(it,t,ctx){const ff=FF(),w=it.w,h=it.h,a0=easeOut(t/1);
  if(!it.oc2||it.oc2.width!==Math.ceil(w*it.dpr)){const c=document.createElement('canvas');c.width=Math.ceil(w*it.dpr);c.height=Math.ceil(h*it.dpr);it.oc2=c}
  const o=it.oc2.getContext('2d');o.setTransform(it.dpr,0,0,it.dpr,0,0);o.clearRect(0,0,w,h);const gx=it.cx,gy=it.cy+(it.kind==='hero'?0:it.R*.1);
  const rg=o.createRadialGradient(gx,gy,0,gx,gy,it.R*1.9);rg.addColorStop(0,'rgba(150,40,255,.95)');rg.addColorStop(.5,'rgba(160,90,255,.45)');rg.addColorStop(1,'rgba(160,90,255,0)');o.fillStyle=rg;o.fillRect(0,0,w,h);
  const fs=it.R*2.3;o.font=`800 ${fs}px ${ff}`;o.textAlign='center';o.textBaseline='middle';o.fillStyle='#0b0b0c';o.fillText('VS',gx,gy+fs*.04);
  const sw=Math.max(10,it.R*.16),n=Math.ceil(w/sw);ctx.globalAlpha=a0;
  for(let i=0;i<n;i++){const x=i*sw,cxs=x+sw/2,dist=(cxs-gx)/(it.R*1.6),nb=near(it,cxs,gy,it.R*.9),f=1+.9*Math.exp(-dist*dist)+.35*Math.sin(t*.7+i*.45)+nb*.8,sh=Math.sin(t*.5+i*.3)*sw*.8,srcW=sw*f,sx=cxs-srcW/2+sh;
   ctx.drawImage(it.oc2,Math.max(0,sx)*it.dpr,0,srcW*it.dpr,h*it.dpr,x,0,sw,h)}}
 const STY={ascii,halftone,tiles,circles,contour,bars,orbits,wireframe,type:typeSpec,cells,gradient:profileFigure,morph,flow,tunnel,halo,digits:digitGlyph,digits3d:digitGlyph3d,blobs,shapes,ripple,lissa,tetris:tetris2,gboxes,cenacle,mosaic,reeded};
 function draw(it,lt,pt,dt){const {ctx,w,h,dpr}=it;if(!w||!h)return;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
  it.hov+=(it.hovT-it.hov)*Math.min(1,dt*6);if(it.mx!==null){it.sx+=(it.mx-it.sx)*.3;it.sy+=(it.my-it.sy)*.3}
  const ink=getComputedStyle(it.cv).color;ctx.fillStyle=ink;ctx.strokeStyle=ink;ctx.globalAlpha=1;
  if(it.style==='ascii')ascii(it,pt,dt,ctx,ink);else if(it.style==='rain3d')rain3d(it,lt,dt,ctx);else (STY[it.style]||halftone)(it,lt,ctx,ink,dt);ctx.globalAlpha=1}
 function frame(now){requestAnimationFrame(frame);const dt=last?Math.min(.05,(now-last)/1000):0;if(now-last<30)return;last=now;const sec=now/1000;
  document.querySelectorAll('canvas.ascii-art').forEach(cv=>{if(!items.has(cv))setup(cv)});
  for(const [cv,it] of items){if(!cv.isConnected){io.unobserve(cv);items.delete(cv);continue}if(!it.visible)continue;if(it.tv===null)it.tv=sec;const r=cv.getBoundingClientRect();if(Math.abs(r.width-it.w)>1||Math.abs(r.height-it.h)>1)fit(it);
   const still=RM.matches||matchMedia('print').matches;draw(it,still?20:sec-it.tv,still?1.2:sec-it.t0+1.5,still?0:Math.max(dt,1/60))}}
 requestAnimationFrame(frame)})();
// Rich study body: buddy-delivered 5-line summary + structured sections.
function richBody(r){return `<p class="article-intro section-reveal">${r.intro}</p><aside class="nh-brief section-reveal" aria-label="5줄 요약"><div class="brief-bubble"><div class="brief-buddy" aria-hidden="true"><i></i><i></i></div><p class="brief-label">5줄 요약</p><ol>${r.summary.map(x=>`<li><span>${x}</span></li>`).join('')}</ol></div></aside>${r.sections.map((x,i)=>`<section class="article-section rich-section section-reveal" id="${x.id}"><span class="section-number">${String(i+1).padStart(2,'0')}</span><h2>${x.title}</h2>${x.html}</section>`).join('')}`}
function setupRich(scope){
 scope.querySelectorAll('[data-peek]').forEach(grid=>{if(!grid.querySelector('.peek-buddy'))return;let timer=0;const o=new IntersectionObserver(es=>es.forEach(e=>{clearTimeout(timer);if(e.isIntersecting)timer=setTimeout(()=>grid.classList.add('is-peek'),reduced.matches?0:450);else grid.classList.remove('is-peek')}),{threshold:.45});o.observe(grid)});
 scope.querySelectorAll('a.cite').forEach(a=>a.onclick=e=>{e.preventDefault();const t=document.getElementById(a.getAttribute('href').slice(1));if(!t)return;const off=document.querySelector('.topbar').getBoundingClientRect().bottom+30;scrollTo({top:t.getBoundingClientRect().top+scrollY-off,behavior:reduced.matches?'auto':'smooth'});t.classList.remove('is-flash');void t.offsetWidth;t.classList.add('is-flash')});
 scope.querySelectorAll('.video-card').forEach(v=>{const btn=v.querySelector('.video-toggle');let frame=null,playing=false;const send=f=>frame?.contentWindow?.postMessage(JSON.stringify({event:'command',func:f,args:[]}),'*');
  btn.onclick=()=>{if(location.protocol==='file:'){open('https://www.youtube.com/watch?v='+v.dataset.id,'_blank','noopener');return}
   if(!frame){scope.querySelectorAll('.video-card.is-playing .video-toggle').forEach(o=>o!==btn&&o.click());frame=document.createElement('iframe');frame.src=`https://www.youtube-nocookie.com/embed/${v.dataset.id}?autoplay=1&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&enablejsapi=1`;frame.allow='autoplay; encrypted-media; picture-in-picture';frame.title=v.dataset.title;frame.tabIndex=-1;frame.referrerPolicy='strict-origin-when-cross-origin';v.querySelector('.video-frame').prepend(frame);playing=true}
   else{if(!playing)scope.querySelectorAll('.video-card.is-playing .video-toggle').forEach(o=>o!==btn&&o.click());send(playing?'pauseVideo':'playVideo');playing=!playing}
   v.classList.toggle('is-playing',playing);v.classList.add('is-started');btn.setAttribute('aria-label',playing?'일시정지':'재생');btn.setAttribute('aria-pressed',String(playing))}});
}

// Locked card: tap flips the card to a 4-digit PIN pad; the right PIN decrypts the note and opens it.
(function(){
 const b64=x=>Uint8Array.from(atob(x),ch=>ch.charCodeAt(0)),reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const idOf=c=>c.getAttribute('href').split('/')[1],locked=id=>!(window.NH_CONTENT||{})[id];
 async function unlock(id,pin){const L=(window.NH_LOCKED||{})[id];if(!L||!window.crypto||!crypto.subtle)throw new Error('unsupported');
  const base=await crypto.subtle.importKey('raw',new TextEncoder().encode(pin),'PBKDF2',false,['deriveKey']);
  const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:b64(L.s),iterations:L.it,hash:'SHA-256'},base,{name:'AES-GCM',length:256},false,['decrypt']);
  const buf=await crypto.subtle.decrypt({name:'AES-GCM',iv:b64(L.iv)},key,b64(L.ct));
  (window.NH_CONTENT=window.NH_CONTENT||{})[id]=JSON.parse(new TextDecoder().decode(buf))}
 const inputs=c=>[...c.querySelectorAll('.pin input')];
 function clear(c,msg){inputs(c).forEach(i=>i.value='');const m=c.querySelector('.lock-msg');if(m)m.textContent=msg||'숫자 4자리를 입력하세요'}
 function flip(c,show){if(c.dataset.flipping||c.classList.contains('show-lock')===show)return;
  const swap=()=>{c.classList.toggle('show-lock',show);c.classList.remove('lock-error','lock-ok');clear(c)};
  if(reduce.matches||!c.animate){swap();if(show)inputs(c)[0].focus({preventScroll:true});return}
  c.dataset.flipping=1;const P='perspective(1400px) ';
  c.animate([{transform:P+'rotateY(0deg)'},{transform:P+'rotateY(90deg)'}],{duration:200,easing:'cubic-bezier(.5,0,1,1)'}).onfinish=()=>{swap();
   c.animate([{transform:P+'rotateY(-90deg)'},{transform:P+'rotateY(0deg)'}],{duration:340,easing:'cubic-bezier(0,.6,.3,1)'}).onfinish=()=>{delete c.dataset.flipping;if(show)inputs(c)[0].focus({preventScroll:true})}}}
 async function submit(c){const pin=inputs(c).map(i=>i.value).join(''),id=idOf(c);c.classList.add('lock-busy');
  try{await unlock(id,pin);c.classList.add('lock-ok');c.querySelector('.lock-msg').textContent='열렸어요';setTimeout(()=>{c.classList.remove('show-lock','lock-ok','lock-busy');location.hash='content/'+id},420)}
  catch(err){c.classList.remove('lock-busy');c.classList.remove('lock-error');void c.offsetWidth;c.classList.add('lock-error');clear(c,err.message==='unsupported'?'이 브라우저에서는 열 수 없어요':'비밀번호가 맞지 않아요');inputs(c)[0].focus({preventScroll:true})}}
 window.NH_openLock=id=>{const c=document.querySelector(`a.lock-card[href="#content/${id}"]`);if(!c)return;c.scrollIntoView({block:'center',behavior:'smooth'});setTimeout(()=>flip(c,true),450)};
 document.addEventListener('click',e=>{const c=e.target.closest('a.lock-card');
  document.querySelectorAll('a.lock-card.show-lock').forEach(o=>{if(o!==c)flip(o,false)});
  if(!c||!locked(idOf(c)))return;e.preventDefault();
  if(e.target.closest('.lock-close')){flip(c,false);return}
  if(!c.classList.contains('show-lock'))flip(c,true);else if(!e.target.closest('input')){const f=inputs(c).find(i=>!i.value)||inputs(c)[0];f.focus()}},true);
 document.addEventListener('input',e=>{const i=e.target;if(!i.matches||!i.matches('.lock-card .pin input'))return;const c=i.closest('a.lock-card'),all=inputs(c),k=all.indexOf(i);
  i.value=i.value.replace(/\D/g,'').slice(-1);if(i.value&&k<3)all[k+1].focus();
  if(all.every(x=>x.value))submit(c)});
 document.addEventListener('keydown',e=>{const i=e.target;if(!i.closest)return;const c=i.closest('a.lock-card.show-lock');if(!c)return;
  if(e.key==='Escape'){flip(c,false);c.focus();return}
  if(e.key==='Enter'){e.preventDefault();if(i.classList.contains('lock-close'))flip(c,false);return}
  if(e.key==='Backspace'&&i.matches('.pin input')&&!i.value){const all=inputs(c),k=all.indexOf(i);if(k>0){all[k-1].value='';all[k-1].focus()}}});
 document.addEventListener('paste',e=>{const i=e.target;if(!i.matches||!i.matches('.lock-card .pin input'))return;const d=(e.clipboardData.getData('text')||'').replace(/\D/g,'').slice(0,4);if(!d)return;e.preventDefault();const c=i.closest('a.lock-card'),all=inputs(c);d.split('').forEach((ch,k)=>all[k].value=ch);if(d.length===4)submit(c);else all[d.length].focus()});
})();
