(() => {
  'use strict';
  const D = window.GAME_DATA;
  const $ = (s, root = document) => root.querySelector(s);
  const game = $('#game'), modal = $('#modal');
  const KEY = 'hunminjeongeum-v1';
  const defaults = () => ({name:'', cards:[], asked:{}, classes:[[],[],[]], inference:['','',''], explored:false, checkpoint:'royal', royalLine:0, preferences:{typeSpeed:28,reduceMotion:false}, report:{answers:['',''],draft:['',''],savedAt:null}});
  let state = defaults(), storageOK = true;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved && typeof saved === 'object') {
      state.name = typeof saved.name === 'string' ? saved.name.slice(0,12) : '';
      state.cards = Array.isArray(saved.cards) ? [...new Set(saved.cards.filter(n => Number.isInteger(n) && n >= 0 && n < 8))] : [];
      for(const p of D.people){
        const ids=D.npcDialogues[p.asset].questions.map(q=>q.id);
        state.asked[p.asset]=Array.isArray(saved.asked?.[p.asset])?[...new Set(saved.asked[p.asset].filter(id=>ids.includes(id)))]:[];
      }
      if (Array.isArray(saved.classes)) state.classes = [0,1,2].map(i => Array.isArray(saved.classes[i]) ? [...new Set(saved.classes[i].filter(n => state.cards.includes(n)))] : []);
      if (Array.isArray(saved.inference)) state.inference = [0,1,2].map(i => ['자주','애민','실용'].includes(saved.inference[i]) ? saved.inference[i] : '');
      state.explored = saved.explored === true;
      state.checkpoint = ['royal','map','classify','spirit','report'].includes(saved.checkpoint) ? saved.checkpoint : 'royal';
      state.royalLine = Number.isInteger(saved.royalLine) ? Math.max(0,Math.min(3,saved.royalLine)) : 0;
      if(saved.preferences){state.preferences.typeSpeed=[0,18,28,42].includes(saved.preferences.typeSpeed)?saved.preferences.typeSpeed:28;state.preferences.reduceMotion=saved.preferences.reduceMotion===true;}
      if (saved.report && typeof saved.report === 'object') {
        for (const key of ['answers','draft']) if (Array.isArray(saved.report[key])) state.report[key] = [0,1].map(i => typeof saved.report[key][i] === 'string' ? saved.report[key][i].slice(0,6000) : '');
        state.report.savedAt = typeof saved.report.savedAt === 'string' && !Number.isNaN(Date.parse(saved.report.savedAt)) ? saved.report.savedAt : null;
      }
    }
  } catch { storageOK = false; }
  let screen = 'home', personIndex = 0, selectedCard = null, typingTimer = null, typed = '', typingDone = true, lastFocus = null;
  let npcFlow = null, openingFlow = null, typingElement = null;
  let openingGeneration = 0, openingFrame = 0, openingTextAnimation = null, toastTimer;
  const reduced = () => state.preferences.reduceMotion || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); return true; }
    catch { storageOK = false; toast('브라우저 저장 공간을 사용할 수 없습니다. 이번 실행 중에만 기록이 유지됩니다.'); return false; }
  }
  function toast(text) { $('#toast').textContent = text; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3600); }
  function updateHeader() {
    $('#record-count').textContent = state.cards.length;
    const places={home:'이야기의 시작',royal:'1차시 · 궁궐',map:'1차시 · 마을 탐험',npc:`1차시 · ${D.people[personIndex].place}`,classify:'1차시 · 증언 분류',spirit:'1차시 · 창제 정신',report:'1차시 · 조사 보고서','report-view':'1차시 · 나의 보고서'};
    $('#chapter-label').textContent=places[screen];
    game.classList.toggle('study-mode',['classify','spirit','report','report-view'].includes(screen));
    document.body.classList.toggle('reduced-motion',reduced());
  }
  function updateAdvanceHint(){
    const hint=$('#advance-hint');
    const openingReading=openingFlow&&['notice','narration'].includes(openingFlow.phase);
    const sceneReading=!openingFlow&&(screen==='royal'||(screen==='npc'&&npcFlow?.phase!=='choices'));
    hint.hidden=modal.open||!(openingReading||sceneReading);
    hint.classList.toggle('on-paper',openingFlow?.phase==='notice');
  }
  function heading(kicker,title,desc) { return `<header class="study-heading"><div><span class="eyebrow">${kicker}</span><h1>${title}</h1></div>${desc?`<p>${desc}</p>`:''}</header>`; }
  function clearTyping() { clearInterval(typingTimer); typingTimer = null; }
  function setScreen(next, checkpoint = true) {
    stopOpening(); clearTyping(); screen = next;
    $('#game-shell').classList.remove('opening-active');
    $('#game-logo').classList.remove('logo-grand','logo-hidden');
    if (checkpoint && next !== 'home' && next !== 'npc') {state.checkpoint = next; persist();}
    render(); game.focus({preventScroll:true}); game.scrollTop=0;
  }
  function render() {
    updateHeader();
    if (screen === 'home') home();
    else if (screen === 'royal') royal();
    else if (screen === 'map') map();
    else if (screen === 'npc') npc();
    else if (screen === 'classify') classify();
    else if (screen === 'spirit') spirit();
    else if (screen === 'report') report();
    else if (screen === 'report-view') reportView();
    updateAdvanceHint();
  }
  function titleGlyphs() {
    return [...'훈민정음'].map((c,i) => `<svg class="glyph" viewBox="0 0 100 116" aria-hidden="true"><defs><mask id="write-${i}" maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="140"><path class="brush-path" pathLength="1" style="--delay:${.5+i*.38}s" d="M8 -4 L90 9 L4 29 L92 40 L5 60 L93 75 L2 93 L98 110 L0 125" fill="none" stroke="white" stroke-width="36" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><text x="0" y="96" mask="url(#write-${i})">${c}</text></svg>`).join('');
  }
  function home() {
    game.innerHTML = `<section class="stage home-stage" aria-label="프로젝트 훈민정음 타이틀"><div class="palace"></div><div class="home-menu"><p class="menu-invitation">백성의 목소리에서 시작되는 새로운 글자의 이야기</p><div class="lesson-row"><button class="lesson-card active" data-action="start"><span class="lesson-number">一</span><span><small>1차시 · ${state.name ? '이어서 조사하기':'첫 번째 이야기'}</small><strong>세종의 어명</strong></span><span class="arrow">→</span></button><button class="lesson-card" disabled><span class="lesson-number">二</span><span><small>2차시 · 준비 중</small><strong>집현전 학자 되기</strong></span></button><button class="lesson-card" disabled><span class="lesson-number">三</span><span><small>3차시 · 준비 중</small><strong>한글 홍보 프로젝트</strong></span></button></div><div class="home-actions"><button class="text-button" data-action="replay">▷ 오프닝 다시 보기</button><button class="text-button" data-action="guide">이야기 안내</button></div></div></section>`;
  }

  // 미리 그린 종이 섬유 모양의 먹 자국을 재사용합니다. 프레임마다 노이즈 필터를 계산하지 않습니다.
  function inkStamp(seed) {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 320;
    const ctx = canvas.getContext('2d');
    let s = seed;
    const rand = () => ((s = (Math.imul(s,1664525) + 1013904223) >>> 0) / 4294967296);
    const phases = [rand()*6.28,rand()*6.28,rand()*6.28];
    const edge = Array.from({length:140}, (_,i) => {
      const a=i/140*Math.PI*2;
      return .86 + .075*Math.sin(a*3+phases[0]) + .04*Math.sin(a*7+phases[1]) + .018*Math.sin(a*13+phases[2]) + rand()*.006;
    });
    for (let layer=7;layer>=0;layer--) {
      const r = 138 + layer*2;
      ctx.filter = layer===0 ? 'blur(.6px)' : 'blur(1.8px)';
      ctx.beginPath();
      for (let i=0;i<edge.length;i++) { const a = i/edge.length*Math.PI*2; const rr = r*edge[i]; const x = 160+Math.cos(a)*rr, y=160+Math.sin(a)*rr; i ? ctx.lineTo(x,y) : ctx.moveTo(x,y); }
      ctx.closePath();ctx.fillStyle = layer===0 ? '#141c18' : 'rgba(20,28,24,.12)';ctx.fill();
    }
    ctx.filter='none';
    // 흩어진 섬유와 미세한 가장자리: 중심부는 짙고 경계는 불규칙하게 스며듭니다.
    for(let i=0;i<230;i++) { const a=rand()*Math.PI*2,r=126+rand()*29;ctx.beginPath();ctx.ellipse(160+Math.cos(a)*r,160+Math.sin(a)*r,rand()*2.2+.3,rand()*4+.5,a,0,Math.PI*2);ctx.fillStyle=`rgba(20,28,24,${rand()*.2})`;ctx.fill(); }
    return canvas;
  }
  function clearOpeningTextFade(){
    const animation=openingTextAnimation;openingTextAnimation=null;
    if(animation){animation.onfinish=null;animation.cancel();}
  }
  function showOpeningText(text,element,duration){
    clearOpeningTextFade();
    const flow=openingFlow;
    // Render the complete sentence before animating opacity; main dialogue typing is separate.
    element.textContent=text;element.setAttribute('aria-label',text);element.style.opacity='1';
    flow.textReady=false;
    if(reduced()||typeof element.animate!=='function'){flow.textReady=true;return;}
    const animation=element.animate([{opacity:0},{opacity:1}],{duration,easing:'ease-out'});
    openingTextAnimation=animation;
    animation.onfinish=()=>{
      if(openingTextAnimation!==animation)return;
      openingTextAnimation=null;
      if(openingFlow===flow)flow.textReady=true;
    };
  }
  function finishOpeningTextFade(){
    // Cancelling reveals the element's underlying opacity:1 immediately, without advancing.
    clearOpeningTextFade();
    if(openingFlow)openingFlow.textReady=true;
  }
  function stopOpening() { openingGeneration++; cancelAnimationFrame(openingFrame); clearOpeningTextFade(); openingFlow=null; }
  const delay = ms => new Promise(resolve => setTimeout(resolve,ms));
  async function spreadInk(overlay,stage,live) {
    const canvas=$('canvas',overlay),ctx=canvas.getContext('2d',{alpha:true});
    if(!ctx){$('.intro-copy',overlay)?.remove();$('.intro-progress',overlay)?.remove();overlay.classList.add('ink-phase','reveal');return;}
    const rect=stage.getBoundingClientRect(),scale=Math.min(1.3,1100/rect.width);
    canvas.width=Math.round(rect.width*scale);canvas.height=Math.round(rect.height*scale);
    const w=canvas.width,h=canvas.height,diagonal=Math.hypot(w,h);
    const stamps=[inkStamp(321),inkStamp(932),inkStamp(871)];
    const points=[[.19,.42,0],[.78,.69,.14],[.57,.17,.26],[.96,.09,.4]];
    const drawSpread=(p,erase)=>{
      ctx.globalCompositeOperation='source-over';ctx.clearRect(0,0,w,h);
      if(erase){ctx.fillStyle='#141c18';ctx.fillRect(0,0,w,h);ctx.globalCompositeOperation='destination-out';}
      points.forEach(([x,y,lag],i)=>{const t=Math.max(0,Math.min(1,(p-lag)/(1-lag)));if(!t)return;const r=diagonal*Math.pow(t,1.15)*.9;ctx.drawImage(stamps[i%3],x*w-r,y*h-r,r*2,r*2);});
      ctx.globalCompositeOperation='source-over';
    };
    const animate=(duration,erase)=>new Promise(resolve=>{let start,previous=0;function tick(now){if(!live()){resolve();return;}start??=now;const t=Math.min(1,(now-start)/duration);if(now-previous>=30||t===1){drawSpread(t,erase);previous=now;}if(t<1)openingFrame=requestAnimationFrame(tick);else resolve();}openingFrame=requestAnimationFrame(tick);});
    overlay.classList.add('ink-phase');await animate(2600,false);if(!live())return;
    $('.intro-copy',overlay)?.remove();$('.intro-progress',overlay)?.remove();overlay.classList.add('reveal');
    await animate(2600,true);
  }
  function opening() {
    setScreen('home',false);
    openingFlow={phase:'notice',index:0,generation:++openingGeneration};
    const shell=$('#game-shell'),logo=$('#game-logo'),stage=$('.stage');
    shell.classList.add('opening-active');logo.classList.add('logo-hidden');
    const overlay=document.createElement('div');overlay.className='opening';
    overlay.innerHTML=`<div class="opening-paper"></div><div class="intro-copy"><div class="eyebrow">이야기에 들어가며</div><h2>기록되지 못한 마음들</h2><p id="opening-text"></p></div><canvas aria-hidden="true"></canvas><div class="narration" aria-live="off"></div><div class="opening-controls"><button class="skip" data-action="skip">오프닝 건너뛰기 →</button></div><div class="intro-progress">序 · 가상의 이야기</div>`;
    stage.append(overlay);
    document.fonts.load('100px Brush').catch(()=>{});
    showOpeningText(D.disclaimer,$('#opening-text',overlay),800);updateAdvanceHint();
  }
  function showOpeningNarration(index){
    openingFlow.phase='narration';openingFlow.index=index;
    const narration=$('.opening .narration');
    narration.innerHTML=`<p id="opening-text"></p><span class="narration-index">${index+1} / ${D.opening.length}</span>`;
    narration.classList.add('visible');
    showOpeningText(D.opening[index],$('#opening-text',narration),1000);updateAdvanceHint();
  }
  async function advanceOpening(){
    const flow=openingFlow;
    if(!flow||!['notice','narration'].includes(flow.phase))return;
    if(!flow.textReady){finishOpeningTextFade();return;}
    const live=()=>openingFlow===flow&&openingGeneration===flow.generation&&screen==='home';
    if(flow.phase==='notice'){
      flow.phase='transition';updateAdvanceHint();clearTyping();
      const overlay=$('.opening');$('.intro-copy',overlay).classList.add('fading');
      if(reduced()){
        $('.intro-copy',overlay).remove();$('.intro-progress',overlay).remove();
        overlay.classList.add('ink-phase','reveal');
      }else await spreadInk(overlay,$('.stage'),live);
      if(live())showOpeningNarration(0);return;
    }
    if(flow.index+1<D.opening.length){showOpeningNarration(flow.index+1);return;}
    // Only the visual title ceremony is timed; no notice or narration auto-advances.
    flow.phase='title';updateAdvanceHint();clearTyping();
    $('.opening').remove();const logo=$('#game-logo');
    logo.classList.remove('logo-hidden');logo.classList.add('logo-grand');
    await delay(4700);if(!live())return;
    logo.classList.remove('logo-grand');await delay(reduced()?0:1800);if(live())finishOpening();
  }
  function finishOpening(){
    stopOpening();clearTyping();typingElement=null;typingDone=true;$('.opening')?.remove();
    $('#game-shell').classList.remove('opening-active');
    $('#game-logo').classList.remove('logo-grand','logo-hidden');updateAdvanceHint();
  }
  function splitDialogue(text){return text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(part=>part.trim()).filter(Boolean)||[text];}
  function dialogueMarkup(name,role,action='dialogue-next',extra=''){
    return `<section class="dialogue" tabindex="0" aria-label="${esc(name)}의 대화. 클릭 또는 계속하기로 진행"><div class="speaker">${esc(name)}<small>${esc(role)}</small></div><p class="dialogue-text" id="dialogue-text"></p><div class="dialogue-bottom"><div class="dialogue-actions">${extra}<button class="continue-button" data-action="${action}">계속하기 <span aria-hidden="true">▸</span></button></div></div></section>`;
  }

  function royal() {
    const lines=[`${state.name} 조사관, 어서 오너라. 내가 그대에게 맡길 일이 있다.`,
      '백성들이 말하고 싶은 바가 있어도, 글로 제 뜻을 펴지 못하는 일이 많다고 들었다. 나는 그들의 삶을 직접 살피고자 한다.',
      '장터와 민가, 서당과 농가을 찾아가 보아라. 백성들이 어떤 어려움을 겪는지 묻고, 그들의 목소리를 기록해 오너라.',
      '모은 증언을 살펴, 백성에게 어떤 문자가 필요한지 생각해 보거라. 그대의 보고를 기다리겠다.'];
    const expressions=['smile','serious','talking','thinking'];
    game.innerHTML=`<section class="scene royal-scene"><div class="scene-bg palace-bg"></div><span class="scene-location">궁궐 · 편전</span><img class="character sejong" src="assets/sejong_${expressions[state.royalLine]}.png" alt="세종" data-expression="${expressions[state.royalLine]}">${dialogueMarkup('세종','조선의 임금','royal-next')}</section>`;
    type(lines[state.royalLine]);updateAdvanceHint();
  }
  function advanceRoyal(){
    if(!typingDone){finishTyping();return;}
    if(state.royalLine<3){state.royalLine++;persist();royal();}else setScreen('map');
  }

  function type(text,el=$('#dialogue-text')) {
    clearTyping();typed=text;typingElement=el;typingDone=reduced()||state.preferences.typeSpeed===0;if(!el)return;
    el.setAttribute('aria-label',text);el.setAttribute('aria-live','off');
    if(typingDone){el.textContent=text;return;}
    let count=0;el.textContent='';typingTimer=setInterval(()=>{if(!el.isConnected){clearTyping();return;}count+=1;el.textContent=text.slice(0,count);if(count>=text.length){clearTyping();typingDone=true;}},state.preferences.typeSpeed);
  }
  function finishTyping(){clearTyping();if(typingElement?.isConnected)typingElement.textContent=typed;typingDone=true;}
  function map() {
    const complete=D.people.filter((_,i)=>state.cards.includes(i*2)&&state.cards.includes(i*2+1)).length;
    game.innerHTML=`<section class="map-screen"><div class="map-art"><img src="${esc(D.backgrounds.map)}" alt="장터, 민가, 서당과 농가가 펼쳐진 조선 마을 지도">${D.people.map((p,i)=>{const n=state.cards.filter(c=>Math.floor(c/2)===i).length;return `<button class="map-spot ${n===2?'complete':''}" style="left:${p.pos[0]}%;top:${p.pos[1]}%" data-person="${i}" aria-label="${p.place}, ${p.name}, 증언 ${n}/2"><strong>${p.place} ${n===2?'✓':''}</strong><small>${p.name} · ${n}/2</small></button>`;}).join('')}</div><div class="map-hud"><span>마을 조사 · ${complete}/4곳</span><span>증언 ${state.cards.length}/8</span>${state.cards.length===8?'<button class="primary" data-action="to-classify">증언 분류하기 →</button>':'<span class="map-hint">장소를 선택해 백성의 이야기를 들어 보세요.</span>'}</div></section>`;
  }
  function enterNPC(index){
    personIndex=index;
    npcFlow={phase:'intro',line:0,question:null,expression:'basic'};
    setScreen('npc',false);
  }
  function currentNPCLine(p){
    const script=D.npcDialogues[p.asset];
    if(npcFlow.phase==='intro')return script.intro[npcFlow.line];
    if(npcFlow.phase==='choices')return script.prompt;
    if(npcFlow.phase==='question')return script.questions[npcFlow.question].lines[0];
    if(npcFlow.phase==='answer')return script.questions[npcFlow.question].lines[npcFlow.line];
    return npcFlow.phase==='farewell'?script.farewell:script.ack;
  }
  function npcSprite(p,expression){
    const sprites=D.npcVisuals[p.asset];
    const aspect=Math.max(...Object.values(sprites).map(frame=>(frame.bounds[2]-frame.bounds[0])/(frame.bounds[3]-frame.bounds[1])));
    const poses=Object.entries(sprites).map(([pose,frame])=>{
      const [left,top,right,bottom]=frame.bounds,h=bottom-top;
      // visible bounds occupy the same height, top and horizontal center for both poses.
      const css=`width:${100*frame.width/(h*aspect)}%;height:${100*frame.height/h}%;left:${100*(.5-(left+right)/(2*h*aspect))}%;top:${-100*top/h}%;`;
      return `<img class="npc-pose" data-pose="${pose}" style="${css}" src="${esc(frame.src)}" alt="${p.name} · ${pose==='gomin'?'고민하는 표정':'기본 표정'}" aria-hidden="true" decoding="async" draggable="false">`;
    }).join('');
    return `<div class="character-slot" data-character="${p.asset}" data-expression="${expression}" role="img" aria-label="${p.name}"><div class="npc-sprite-rig" style="--sprite-aspect:${aspect}">${poses}</div></div>`;
  }
  function setNPCExpression(slot,expression){
    slot.dataset.expression=expression;
    slot.setAttribute('aria-label',`${D.people[personIndex].name} · ${expression==='gomin'?'고민하는 표정':'기본 표정'}`);
    const ready=[...slot.querySelectorAll('.npc-pose[data-ready="true"]')];
    const active=ready.find(img=>img.dataset.pose===expression)||ready.find(img=>img.dataset.pose==='basic');
    slot.querySelectorAll('.npc-pose').forEach(img=>img.classList.toggle('is-active',img===active));
  }
  function mountNPCSprite(slot){
    const images=[...slot.querySelectorAll('.npc-pose')];
    // Decode both images before the first appearance; later dialogue updates retain both nodes.
    Promise.allSettled(images.map(img=>img.decode?img.decode():new Promise((resolve,reject)=>{
      if(img.complete){img.naturalWidth?resolve():reject(new Error('image load failed'));return;}
      img.onload=resolve;img.onerror=reject;
    }))).then(results=>{
      if(!slot.isConnected)return;
      results.forEach((result,i)=>{if(result.status==='fulfilled'&&images[i].naturalWidth)images[i].dataset.ready='true';});
      if(results.some(result=>result.status==='rejected'))toast('인물 이미지 일부를 불러오지 못했습니다. 이미지 파일 경로를 확인해 주세요.');
      requestAnimationFrame(()=>{
        if(!slot.isConnected)return;
        slot.querySelector('.npc-sprite-rig').classList.add('sprite-ready');
        setNPCExpression(slot,slot.dataset.expression);
      });
    });
  }
  function npc() {
    if(!npcFlow)npcFlow={phase:'intro',line:0,question:null,expression:'basic'};
    const p=D.people[personIndex],script=D.npcDialogues[p.asset],phase=npcFlow.phase;
    const all=state.cards.includes(personIndex*2)&&state.cards.includes(personIndex*2+1);
    const line=currentNPCLine(p);
    // Investigator lines deliberately do not assign an expression. Retain the last NPC state.
    if(line.speaker==='npc')npcFlow.expression=line.expression;
    let scene=$('.npc-scene');
    if(!scene||scene.dataset.person!==p.asset){
      game.innerHTML=`<section class="scene npc-scene" data-person="${p.asset}"><div class="scene-bg npc-bg" style="background-image:linear-gradient(0deg,#12201680,transparent 70%),url('${esc(D.backgrounds[p.bg])}')"></div><span class="scene-location">${p.place} · ${p.name}</span>${npcSprite(p,npcFlow.expression)}<div class="npc-interface"></div></section>`;
      scene=$('.npc-scene');mountNPCSprite($('.character-slot',scene));
    }
    scene.dataset.phase=phase;
    setNPCExpression($('.character-slot',scene),npcFlow.expression);
    const investigator=line.speaker==='investigator';
    const speaker=investigator?`${state.name} 조사관`:p.name;
    const role=investigator?'백성의 삶을 살피는 조사관':p.role;
    const choices=phase==='choices'?`<div class="question-choices" aria-label="조사관의 질문">${script.questions.map((q,i)=>{
      const asked=state.asked[p.asset]?.includes(q.id),recorded=q.card!==null&&state.cards.includes(q.card);
      return `<button class="question" data-question="${i}"><span>${esc(q.label)}</span><small>${asked?'다시 묻기 ✓':recorded?'증언 있음':'질문하기'}</small></button>`;
    }).join('')}<button class="question leave-choice" data-action="npc-leave">${all?'조사를 마치고':'잠시'} 마을 지도로 돌아간다 →</button></div>`:'';
    const extra=phase==='farewell'?'<button class="text-button" data-action="npc-more">추가 질문</button>':'';
    $('.npc-interface',scene).innerHTML=choices+dialogueMarkup(speaker,role,'npc-next',extra);
    if(phase==='choices'){
      clearTyping();typed=line.text;typingElement=$('#dialogue-text');typingDone=true;
      typingElement.textContent=line.text;$('.continue-button').hidden=true;
      $('.question')?.focus({preventScroll:true});
    }else type(line.text);
    updateAdvanceHint();
  }
  function askQuestion(index){
    const script=D.npcDialogues[D.people[personIndex].asset];
    if(npcFlow?.phase!=='choices'||!script.questions[index])return;
    npcFlow={...npcFlow,phase:'question',line:0,question:index};
    npc();
  }
  function advanceNPC(){
    if(!npcFlow||npcFlow.phase==='choices')return;
    if(!typingDone){finishTyping();return;}
    const p=D.people[personIndex],script=D.npcDialogues[p.asset];
    if(npcFlow.phase==='intro'){
      if(npcFlow.line+1<script.intro.length)npcFlow.line++;else npcFlow.phase='choices';
    }else if(npcFlow.phase==='question'){
      npcFlow.phase='answer';npcFlow.line=1;
    }else if(npcFlow.phase==='answer'){
      const question=script.questions[npcFlow.question];
      if(npcFlow.line+1<question.lines.length)npcFlow.line++;
      else {
        // Keep the same 0..7 card IDs and award once, only after hearing the complete exchange.
        if(question.card!==null&&!state.cards.includes(question.card)){
          state.cards.push(question.card);toast('새로운 증언이 기록되었습니다 · '+state.cards.length+' / 8');
        }
        state.asked[p.asset]??=[];
        if(!state.asked[p.asset].includes(question.id))state.asked[p.asset].push(question.id);
        persist();npcFlow.phase='ack';
      }
    }else if(npcFlow.phase==='ack'){
      npcFlow.phase=state.cards.includes(personIndex*2)&&state.cards.includes(personIndex*2+1)?'farewell':'choices';
    }else if(npcFlow.phase==='farewell'){setScreen('map');return;}
    npc();updateHeader();
  }

  function evidence(card, selectable=true) {
    return `<${selectable?'button':'div'} class="evidence ${selectedCard===card?'selected':''}" ${selectable?`data-card="${card}" draggable="true" aria-pressed="${selectedCard===card}"`:''}><small>증언 ${String(card+1).padStart(2,'0')} · ${D.people[Math.floor(card/2)].name}</small>${D.cards[card]}${state.classes.some(c=>c.includes(card))?`<span class="evidence-tags">${D.categories.filter((_,i)=>state.classes[i].includes(card)).join(' · ')}</span>`:''}</${selectable?'button':'div'}>`;
  }
  function classify() {
    if(state.cards.length<8){setScreen('map');return;}
    const count=D.cards.filter((_,c)=>state.classes.some(a=>a.includes(c))).length;
    game.innerHTML=heading('CHAPTER 01 · 증언 분류','흩어진 목소리, 하나의 뜻으로','카드를 끌어 놓거나, 카드를 선택한 뒤 범주의 「선택한 증언 넣기」를 누르세요.',2)+`<div class="paper-panel fade-in"><p class="instruction">하나의 증언을 여러 범주에 넣어도 됩니다. 분류 후에도 다른 범주에 추가할 수 있어요.<br>현재 <strong>${count} / 8장</strong>의 증언을 분류했습니다. ${selectedCard===null?'먼저 증언을 선택해 주세요.':`증언 ${selectedCard+1} 선택 중`}</p><div class="classify-layout"><div class="evidence-list">${D.cards.map((_,i)=>evidence(i)).join('')}</div><div>${D.categories.map((cat,i)=>`<section class="category" data-category="${i}"><h3>${cat}</h3><button class="category-add" data-add="${i}" ${selectedCard===null?'disabled':''}>선택한 증언 넣기 +</button>${state.classes[i].map(c=>`<div class="assigned"><span>${c+1}. ${D.cards[c]}</span><button data-remove="${i}:${c}" aria-label="${cat}에서 증언 ${c+1} 제외">×</button></div>`).join('')}<small class="instruction">이곳으로 증언 카드를 끌어 놓으세요.</small></section>`).join('')}</div></div><div class="action-row"><button class="secondary" data-action="to-map">지도 돌아가기</button><button class="primary" data-action="classification-done" ${count<8?'disabled':''}>분류 완료 · 창제 정신 탐구 →</button></div></div>`;
  }
  function addClass(cat,card){if(!Number.isInteger(card)||!state.cards.includes(card)||cat<0||cat>2)return;if(!state.classes[cat].includes(card)){state.classes[cat].push(card);persist();}selectedCard=card;classify();$(`[data-add="${cat}"]`)?.focus({preventScroll:true});}
  function spirit() {
    if(state.cards.length<8){setScreen('map');return;}
    game.innerHTML=heading('CHAPTER 01 · 창제 정신','새 글자에 담긴 세종의 마음','백성들의 증언을 떠올리며, 서문의 말과 창제 정신을 연결해 보세요.',3)+`<section class="paper-panel fade-in"><div class="source-box"><span class="eyebrow">훈민정음 어제 서문 · 세종실록 수록문</span><p class="original" lang="zh">${D.original}</p><p>${D.translation}</p><small>현대어 풀이는 국사편찬위원회 번역을 바탕으로 학습용으로 다듬었습니다.<br>‘어리석은 백성’은 이 문맥에서 글을 알지 못하는 백성을 가리킵니다.<br><a href="${D.source}" target="_blank" rel="noopener">출처: 국사편찬위원회 · 『세종실록』 권113, 세종 28년 9월 29일 ↗</a></small></div><div class="spirit-grid">${D.spirits.map((s,i)=>`<article class="spirit-card"><span class="eyebrow">서문의 단서 0${i+1}</span><blockquote>“${s.phrase}”</blockquote><label for="spirit-${i}" class="instruction">어떤 정신과 연결될까요?</label><select id="spirit-${i}" data-infer="${i}"><option value="">먼저 추론해 보세요</option>${['자주','애민','실용'].map(a=>`<option ${state.inference[i]===a?'selected':''}>${a}</option>`).join('')}</select>${state.explored?`<div class="spirit-feedback"><strong>${state.inference[i]===s.answer?'잘 연결했어요.':'다시 살펴보세요.'} ${s.answer} 정신</strong><br>${s.meaning}</div>`:''}</article>`).join('')}</div><details class="report-hints" style="margin-top:22px"><summary>내가 분류한 증언 참고하기</summary>${D.categories.map((cat,i)=>`<p><strong>${cat}</strong><br>${state.classes[i].map(c=>`${c+1}. ${D.cards[c]}`).join('<br>')||'분류한 증언 없음'}</p>`).join('')}</details><div class="action-row"><button class="secondary" data-action="to-classify">분류 돌아보기</button>${state.explored?'<button class="primary" data-action="to-report">조사 보고서 작성하기 →</button>':`<button class="primary" data-action="check-spirits" ${state.inference.some(x=>!x)?'disabled':''}>나의 추론 확인하기 →</button>`}</div></section>`;
  }
  const reportQuestions=['조사를 통해 알게 된 백성들의 어려움은 무엇인가요?','백성들에게 우리말에 알맞은 새로운 문자가 필요한 까닭은 무엇인가요?'];
  function reportMarkup(edit=true) {
    return `<article class="report"><header class="report-header"><span class="eyebrow">백성의 목소리를 담아 전하께 올립니다</span><h1>세종에게 올리는 조사 보고서</h1><p>조사관 ${esc(state.name||'이름 미설정')} · 1차시 세종의 어명 · 증언 ${state.cards.length}/8</p></header>${edit?`<details class="report-hints"><summary>증언과 창제 정신 참고하기</summary><p>자주 · ${D.spirits[0].meaning}<br>애민 · ${D.spirits[1].meaning}<br>실용 · ${D.spirits[2].meaning}</p>${D.categories.map((cat,i)=>`<p><strong>${cat}</strong><br>${state.classes[i].map(c=>D.cards[c]).join('<br>')||'분류한 증언 없음'}</p>`).join('')}</details>`:''}${reportQuestions.map((q,i)=>`<label ${edit?`for="report-${i}"`:''}>${i+1}. ${q}</label>${edit?`<textarea id="report-${i}" data-answer="${i}" maxlength="6000" placeholder="들은 이야기를 떠올리며 자신의 생각을 적어 보세요.">${esc(state.report.draft[i])}</textarea>`:`<div class="report-read">${esc(state.report.answers[i])||'아직 작성한 내용이 없습니다.'}</div>`}`).join('')}${state.report.savedAt?`<p class="report-date">저장일 · ${new Date(state.report.savedAt).toLocaleDateString('ko-KR')}</p>`:''}${!edit?'<span class="saved-mark">조사 완료</span>':''}</article>`;
  }
  function report() {
    game.innerHTML=heading('CHAPTER 01 · 조사 보고서','그대가 발견한 새로운 글자의 까닭','자신의 생각을 기록해 전하께 올려 보세요. 저장한 보고서는 「나의 기록」에서 수정할 수 있습니다.',4)+reportMarkup()+`<div class="action-row"><span class="instruction" id="draft-status">${storageOK?'작성 중인 내용도 이 브라우저에 임시 저장됩니다.':'브라우저 저장 공간을 사용할 수 없습니다.'}</span><button class="secondary" data-action="to-spirit">창제 정신 돌아보기</button><button class="primary" data-action="save-report">보고서 저장하기 →</button></div>`;
  }
  function reportView() { game.innerHTML = '<div class="action-row"><button class="secondary" data-action="to-report">보고서 수정하기</button><button class="secondary" data-action="home">타이틀 돌아가기</button></div><div class="capture-report">' + reportMarkup(false) + '</div>'; }
  function openModal(html, className='') {if(!modal.open)lastFocus=document.activeElement;modal.dataset.mode='';modal.className=className;modal.innerHTML=html;if(!modal.open)modal.showModal();updateAdvanceHint();}
  function closeModal(){modal.close();lastFocus?.focus({preventScroll:true});updateAdvanceHint();}
  function requestReset(){
    openModal(`<h2 id="modal-title">모든 진행 기록 초기화</h2><p>정말 모든 진행 기록을 초기화하시겠습니까?</p><p>닉네임, 수집한 증언, 학습 활동 결과, 작성한 보고서가 모두 삭제됩니다.</p><p class="error">이 작업은 되돌릴 수 없습니다.</p><div class="settings-row"><button class="secondary" data-action="reset-cancel">취소</button><button class="danger-button" data-action="reset-confirm">초기화하기</button></div>`);
    modal.dataset.mode='reset-confirmation';$('[data-action="reset-cancel"]',modal).focus();
  }
  function confirmReset(){
    if(modal.dataset.mode!=='reset-confirmation')return;
    try{localStorage.removeItem(KEY);}catch{toast('저장 데이터를 삭제하지 못했습니다. 진행 기록을 유지합니다.');return;}
    closeModal();stopOpening();clearTyping();clearTimeout(toastTimer);$('#toast').classList.remove('visible');
    state=defaults();storageOK=true;personIndex=0;selectedCard=null;npcFlow=null;typingElement=null;typingDone=true;
    setScreen('home',false);nickname(true);
  }
  function settings(){
    openModal(`<button class="close" data-action="close" aria-label="설정 닫기">×</button><h2 id="modal-title">게임 설정</h2><p>조사관 · ${esc(state.name||'아직 이름을 정하지 않았습니다')}</p><div class="settings-row"><button class="secondary" data-action="nickname">닉네임 수정</button><button class="secondary" data-action="fullscreen">${document.fullscreenElement?'전체 화면 나가기':'전체 화면으로 플레이'}</button></div><label for="type-speed">대사 표시 속도</label><select id="type-speed" data-setting="typeSpeed">${[[42,'천천히'],[28,'보통'],[18,'빠르게'],[0,'즉시 표시']].map(([v,label])=>`<option value="${v}" ${state.preferences.typeSpeed===v?'selected':''}>${label}</option>`).join('')}</select><label class="checkbox-label"><input type="checkbox" data-setting="reduceMotion" ${state.preferences.reduceMotion?'checked':''}> 움직임 줄이기</label><div class="settings-row"><button class="secondary" data-action="review-royal">세종 대화 다시 듣기</button><button class="secondary" data-action="replay">오프닝 다시 보기</button></div><details><summary>인물 이미지 준비 상태</summary><p>NPC 네 명의 투명 PNG 8장을 기본·고민 표정으로 연결했습니다. 대사에 따라 전환하며, 두 표정의 투명 여백을 보정해 같은 높이와 중심에 표시합니다.</p></details><p>기록은 이 브라우저에 저장됩니다. 효과음은 사용하지 않습니다.</p><div class="reset-section"><button class="danger-button" data-action="reset-request">모든 진행 기록 초기화</button></div>`);
  }
  function nickname(start=false) {
    openModal(`<button class="close" data-action="close" aria-label="닫기">×</button><div class="eyebrow">새로운 조사관을 맞이하며</div><h2 id="modal-title">그대의 이름은 무엇인가요?</h2><p>실명 대신 게임에서 사용할 닉네임을 적어 주세요.<br>이름과 기록은 현재 브라우저에만 저장됩니다.</p><form id="nickname-form" data-start="${start}"><label for="nickname">조사관 닉네임</label><input id="nickname" name="nickname" maxlength="12" autocomplete="off" placeholder="예: 윤하" value="${esc(state.name)}" required><p class="error" id="name-error"></p><button class="primary" type="submit">${start?'어명을 받으러 가기':'이름 저장하기'} →</button></form>`);
    $('#nickname').focus();
  }
  function records(tab='cards') {
    openModal(`<button class="close" data-action="close" aria-label="나의 기록 닫기">×</button><span class="eyebrow">${esc(state.name||'나의')} 조사 기록</span><h2 id="modal-title">나의 기록</h2><div class="record-tabs"><button data-tab="cards" aria-pressed="${tab==='cards'}">증언 기록 수첩 · ${state.cards.length}/8</button><button data-tab="report" aria-pressed="${tab==='report'}">조사 보고서</button></div>${tab==='cards'?`<div class="evidence-list">${state.cards.length?state.cards.slice().sort((a,b)=>a-b).map(c=>evidence(c,false)).join(''):'<p class="empty-state">아직 기록한 증언이 없습니다.<br>마을에서 백성들의 이야기를 들어 보세요.</p>'}</div>`:state.report.savedAt?`${reportMarkup(false)}<div class="action-row"><button class="secondary" data-action="view-report">보고서 전체 보기</button><button class="primary" data-action="edit-report">보고서 수정하기 →</button></div>`:'<p class="empty-state">저장된 보고서가 없습니다.<br>조사를 마친 뒤 보고서를 작성하고 저장해 주세요.</p>'}`, 'records');
  }
  function resume(){const next=state.checkpoint;if(['classify','spirit','report'].includes(next)&&state.cards.length<8)setScreen('map');else setScreen(next);}
  document.addEventListener('click',event=>{
    const button=event.target.closest('button');
    if(!button){
      if(modal.open)return;
      if(openingFlow){advanceOpening();return;}
      if(screen==='royal'&&event.target.closest('.royal-scene'))advanceRoyal();
      else if(screen==='npc'&&event.target.closest('.npc-scene'))advanceNPC();
      return;
    }
    if(button.disabled)return;
    if(button.dataset.person!==undefined){enterNPC(Number(button.dataset.person));return;}
    if(button.dataset.question!==undefined){askQuestion(Number(button.dataset.question));return;}
    if(button.dataset.card!==undefined){selectedCard=Number(button.dataset.card);classify();$(`[data-card="${selectedCard}"]`)?.focus({preventScroll:true});return;}
    if(button.dataset.add!==undefined){addClass(Number(button.dataset.add),selectedCard);return;}
    if(button.dataset.remove){const [cat,c]=button.dataset.remove.split(':').map(Number);state.classes[cat]=state.classes[cat].filter(x=>x!==c);persist();classify();return;}
    if(button.dataset.tab){records(button.dataset.tab);$(`[data-tab="${button.dataset.tab}"]`)?.focus();return;}
    const action=button.dataset.action;
    if(action==='home'){if(modal.open)closeModal();setScreen('home',false);}
    if(action==='replay'){if(modal.open)closeModal();opening();}
    if(action==='skip')finishOpening();
    if(action==='guide')openModal(`<button class="close" data-action="close" aria-label="닫기">×</button><h2 id="modal-title">이야기에 들어가며</h2><p>${D.disclaimer}</p><p>1차시는 어명 → 마을 조사 → 증언 분류 → 창제 정신 → 보고서 순서로 진행됩니다. 2·3차시는 준비 중입니다.</p><p>화면 위 「나의 기록」에서 수집한 증언과 저장한 보고서를 확인하세요. 애니메이션은 운영체제의 동작 줄이기 설정을 따릅니다.</p>`);
    if(action==='start'){if(!state.name)nickname(true);else resume();}
    if(action==='nickname')nickname();
    if(action==='settings')settings();
    if(action==='reset-request')requestReset();
    if(action==='reset-cancel')settings();
    if(action==='reset-confirm')confirmReset();
    if(action==='fullscreen'){
      const operation=document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.();
      if(operation)operation.then(()=>{if(modal.open)settings();}).catch(()=>toast('전체 화면 전환을 사용할 수 없습니다. 브라우저의 전체 화면 기능을 이용해 주세요.'));
      else toast('이 브라우저는 전체 화면 전환을 지원하지 않습니다.');
    }
    if(action==='review-royal'){closeModal();state.royalLine=0;setScreen('royal');}
    if(action==='close')closeModal();
    if(action==='records')records();
    if(action==='royal-next')advanceRoyal();
    if(action==='npc-next')advanceNPC();
    if(action==='npc-leave'){npcFlow.phase='farewell';npc();}
    if(action==='npc-more'){npcFlow.phase='choices';npc();}
    if(action==='to-map')setScreen('map');
    if(action==='to-classify')setScreen('classify');
    if(action==='classification-done')setScreen('spirit');
    if(action==='to-spirit')setScreen('spirit');
    if(action==='to-report')setScreen('report');
    if(action==='check-spirits'&&state.inference.every(Boolean)){state.explored=true;persist();spirit();}
    if(action==='save-report'){
      if(state.report.draft.some(x=>!x.trim())){toast('두 질문에 자신의 생각을 적어 주세요.');return;}
      state.report.answers=[...state.report.draft];state.report.savedAt=new Date().toISOString();
      if(persist()){toast('조사 보고서가 저장되었습니다. 수고했어요, '+state.name+' 조사관.');records('report');}
    }
    if(action==='edit-report'){closeModal();setScreen('report');}
    if(action==='view-report'){closeModal();setScreen('report-view',false);}
  });
  document.addEventListener('submit',event=>{
    if(event.target.id!=='nickname-form')return;event.preventDefault();const value=$('#nickname').value.trim();
    if(!value){$('#name-error').textContent='한 글자 이상의 닉네임을 적어 주세요.';return;}
    state.name=value;persist();const start=event.target.dataset.start==='true';closeModal();updateHeader();
    if(start)resume();else {if(['royal','npc','report','report-view'].includes(screen))render();toast('조사관 이름을 저장했습니다.');}
  });
  document.addEventListener('change',event=>{
    if(event.target.dataset.setting){
      const key=event.target.dataset.setting;
      if(key==='typeSpeed')state.preferences.typeSpeed=Number(event.target.value);
      if(key==='reduceMotion')state.preferences.reduceMotion=event.target.checked;
      persist();updateHeader();return;
    }
    if(event.target.dataset.infer!==undefined){state.inference[Number(event.target.dataset.infer)]=event.target.value;state.explored=false;persist();spirit();$(`#spirit-${event.target.dataset.infer}`)?.focus();}
  });
  document.addEventListener('input',event=>{
    if(event.target.dataset.answer!==undefined){state.report.draft[Number(event.target.dataset.answer)]=event.target.value;persist();}
  });
  document.addEventListener('dragstart',event=>{const card=event.target.closest('[data-card]');if(card){event.dataTransfer.setData('text/plain',card.dataset.card);event.dataTransfer.effectAllowed='copy';}});
  document.addEventListener('dragover',event=>{const cat=event.target.closest('[data-category]');if(cat){event.preventDefault();event.dataTransfer.dropEffect='copy';cat.classList.add('dragover');}});
  document.addEventListener('dragleave',event=>event.target.closest('[data-category]')?.classList.remove('dragover'));
  document.addEventListener('drop',event=>{const cat=event.target.closest('[data-category]');if(cat){event.preventDefault();const text=event.dataTransfer.getData('text/plain');if(/^\d$/.test(text))addClass(Number(cat.dataset.category),Number(text));}});
  modal.addEventListener('cancel',event=>{if(modal.dataset.mode==='reset-confirmation'){event.preventDefault();settings();return;}lastFocus?.focus({preventScroll:true});});
  modal.addEventListener('close',updateAdvanceHint);
  document.addEventListener('keydown',event=>{
    if(event.code!=='Space'||event.repeat||modal.open)return;
    if(event.target.closest('button,input,select,textarea,a'))return;
    if(openingFlow){event.preventDefault();advanceOpening();return;}
    if(!['royal','npc'].includes(screen))return;
    event.preventDefault();if(screen==='royal')advanceRoyal();else advanceNPC();
  });
  // 로고는 메인 화면을 다시 그려도 교체하지 않습니다. 중앙 등장부터 HUD 정착까지 같은 노드입니다.
  $('#game-logo .title-large').innerHTML=titleGlyphs();
  updateHeader();opening();
  if(!storageOK)toast('이 브라우저에서는 저장 기능을 사용할 수 없습니다.');
})();


