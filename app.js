(() => {
  'use strict';
  const D = window.GAME_DATA;
  const $ = (s, root = document) => root.querySelector(s);
  const game = $('#game'), modal = $('#modal');
  const KEY = 'hunminjeongeum-v1';
  const defaults = () => ({name:'', cards:[], asked:{}, classes:[[],[],[]], inference:['','',''], explored:false, checkpoint:'royal', royalLine:0, preferences:{typeSpeed:28,reduceMotion:false}, report:{answers:['',''],draft:['',''],savedAt:null}, checkpoint2:'workshop', royal2IntroDone:false, royal2Line:0, scholarLine:0, shapeActivityIndex:0, shapeActivitySchema:2, vowelActivityIndex:0, vowelMatchDone:false, shapePrincipleDone:false, gahoekSeriesIndex:0, gahoekStarted:false, gahoekSummary:{q1:'',q2:'',savedAt:null}, gahoekDone:false, composeSeriesIndex:0, composeStarted:false, composeDone:false, hapyeRecord:{answers:['','',''],draft:['','',''],savedAt:null}, checkpoint3:'royal3', royal3IntroDone:false, royal3Line:0, changeCards:[], changeAsked:{}, chapter3Reflection:{text:'',savedAt:null}, royal3bLine:0, chapter3Done:false});
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
      state.checkpoint2 = ['workshop','royal2','scholar','sanghyeong','moeum','gahoek','compose','hapye'].includes(saved.checkpoint2) ? saved.checkpoint2 : 'workshop';
      state.royal2Line = Number.isInteger(saved.royal2Line) ? Math.max(0,Math.min(7,saved.royal2Line)) : 0;
      state.scholarLine = Number.isInteger(saved.scholarLine) ? Math.max(0,Math.min(5,saved.scholarLine)) : 0;
      // shapeActivitySchema 2 = ㄱ/ㄴ/ㅁ/ㅅ/ㅇ 5단계 순서. 이전(스키마 미표시) 저장분의 인덱스는
      // 예전 'ㅁ' 단독 활동 기준이라 새 순서와 호환되지 않으므로 0으로 되돌려 ㄱ부터 다시 시작합니다.
      state.shapeActivityIndex = (saved.shapeActivitySchema===2 && Number.isInteger(saved.shapeActivityIndex)) ? Math.max(0,Math.min(D.chapter2.shapeActivities.length,saved.shapeActivityIndex)) : 0;
      state.shapeActivitySchema = 2;
      state.vowelActivityIndex = (saved.shapeActivitySchema===2 && Number.isInteger(saved.vowelActivityIndex)) ? Math.max(0,Math.min(D.chapter2.vowelActivities.length,saved.vowelActivityIndex)) : 0;
      state.vowelMatchDone = saved.shapeActivitySchema===2 && saved.vowelMatchDone === true;
      state.shapePrincipleDone = saved.shapeActivitySchema===2 && saved.shapePrincipleDone === true;
      state.gahoekSeriesIndex = (saved.shapeActivitySchema===2 && Number.isInteger(saved.gahoekSeriesIndex)) ? Math.max(0,Math.min(3,saved.gahoekSeriesIndex)) : 0;
      if(saved.shapeActivitySchema===2 && saved.gahoekSummary && typeof saved.gahoekSummary==='object'){
        state.gahoekSummary.q1 = typeof saved.gahoekSummary.q1==='string' ? saved.gahoekSummary.q1.slice(0,1000) : '';
        state.gahoekSummary.q2 = typeof saved.gahoekSummary.q2==='string' ? saved.gahoekSummary.q2.slice(0,1000) : '';
        state.gahoekSummary.savedAt = typeof saved.gahoekSummary.savedAt==='string' && !Number.isNaN(Date.parse(saved.gahoekSummary.savedAt)) ? saved.gahoekSummary.savedAt : null;
      }
      state.gahoekDone = saved.shapeActivitySchema===2 && saved.gahoekDone === true;
      state.gahoekStarted = saved.shapeActivitySchema===2 && saved.gahoekStarted === true;
      state.composeSeriesIndex = (saved.shapeActivitySchema===2 && Number.isInteger(saved.composeSeriesIndex)) ? Math.max(0,Math.min(D.chapter2.compose.buildSeries.length,saved.composeSeriesIndex)) : 0;
      state.composeStarted = saved.shapeActivitySchema===2 && saved.composeStarted === true;
      state.composeDone = saved.shapeActivitySchema===2 && saved.composeDone === true;
      state.royal2IntroDone = saved.shapeActivitySchema===2 && saved.royal2IntroDone === true;
      if(saved.shapeActivitySchema===2 && saved.hapyeRecord && typeof saved.hapyeRecord==='object'){
        for(const key of ['answers','draft']) if(Array.isArray(saved.hapyeRecord[key])) state.hapyeRecord[key] = [0,1,2].map(i => typeof saved.hapyeRecord[key][i] === 'string' ? saved.hapyeRecord[key][i].slice(0,80) : '');
        state.hapyeRecord.savedAt = typeof saved.hapyeRecord.savedAt === 'string' && !Number.isNaN(Date.parse(saved.hapyeRecord.savedAt)) ? saved.hapyeRecord.savedAt : null;
      }
      state.checkpoint3 = ['royal3','map3notice','map3','compare3','royal3b'].includes(saved.checkpoint3) ? saved.checkpoint3 : 'royal3';
      state.royal3IntroDone = saved.royal3IntroDone === true;
      state.royal3Line = Number.isInteger(saved.royal3Line) ? Math.max(0,Math.min(3,saved.royal3Line)) : 0;
      state.changeCards = Array.isArray(saved.changeCards) ? [...new Set(saved.changeCards.filter(n => Number.isInteger(n) && n >= 0 && n < 4))] : [];
      if(saved.changeAsked && typeof saved.changeAsked === 'object'){
        for(const p of D.people){
          const ids = D.chapter3.npcChange[p.asset].questions.map(q => q.id);
          state.changeAsked[p.asset] = Array.isArray(saved.changeAsked[p.asset]) ? [...new Set(saved.changeAsked[p.asset].filter(id => ids.includes(id)))] : [];
        }
      }
      if(saved.chapter3Reflection && typeof saved.chapter3Reflection === 'object'){
        state.chapter3Reflection.text = typeof saved.chapter3Reflection.text === 'string' ? saved.chapter3Reflection.text.slice(0,300) : '';
        state.chapter3Reflection.savedAt = typeof saved.chapter3Reflection.savedAt === 'string' && !Number.isNaN(Date.parse(saved.chapter3Reflection.savedAt)) ? saved.chapter3Reflection.savedAt : null;
      }
      state.royal3bLine = Number.isInteger(saved.royal3bLine) ? Math.max(0,Math.min(4,saved.royal3bLine)) : 0;
      state.chapter3Done = saved.chapter3Done === true;
    }
  } catch { storageOK = false; }
  let screen = 'home', personIndex = 0, selectedCard = null, typingTimer = null, typed = '', typingDone = true, lastFocus = null;
  let npcFlow = null, openingFlow = null, typingElement = null, scholarFlow = null, sanghyeongFlow = null, moeumFlow = null, gahoekFlow = null, composeFlow = null, npcFlow3 = null;
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
    const places={home:'이야기의 시작',royal:'1차시 · 궁궐',map:'1차시 · 마을 탐험',npc:`1차시 · ${D.people[personIndex].place}`,classify:'1차시 · 증언 분류',spirit:'1차시 · 창제 정신',report:'1차시 · 조사 보고서','report-view':'1차시 · 나의 보고서',royal2:'2차시 · 집현전',scholar:'2차시 · 집현전',sanghyeong:'2차시 · 상형 탐구실',moeum:'2차시 · 상형 탐구실',gahoek:'2차시 · 가획 탐구실',compose:'2차시 · 합성 탐구실',workshop:'2차시 · 집현전 글자 공방',hapye:'2차시 · 나의 해례 기록','hapye-view':'2차시 · 나의 해례 기록',royal3:'3차시 · 궁궐',map3notice:'3차시 · 다시 찾은 마을',map3:'3차시 · 다시 찾은 마을',npc3:`3차시 · ${D.people[personIndex].place}`,compare3:'3차시 · 백성들의 변화 기록',royal3b:'3차시 · 궁궐'};
    $('#chapter-label').textContent=places[screen];
    game.classList.toggle('study-mode',['classify','spirit','report','report-view','hapye','hapye-view','compare3'].includes(screen));
    document.body.classList.toggle('reduced-motion',reduced());
  }
  function updateAdvanceHint(){
    const hint=$('#advance-hint');
    const openingReading=openingFlow&&['notice','narration'].includes(openingFlow.phase);
    const sceneReading=!openingFlow&&(screen==='royal'||screen==='royal2'||screen==='royal3'||(screen==='royal3b'&&!state.chapter3Done)||(screen==='npc'&&npcFlow?.phase!=='choices')||(screen==='npc3'&&npcFlow3?.phase!=='choices')||(screen==='scholar'&&scholarFlow?.phase==='talking')||(screen==='sanghyeong'&&['guide','reveal'].includes(sanghyeongFlow?.phase))||(screen==='moeum'&&['bridge1','bridgeReaction','bridge3','guessReaction','matchSuccess'].includes(moeumFlow?.phase))||(screen==='gahoek'&&['bridge1','bridgeReaction','bridge3','completion'].includes(gahoekFlow?.phase))||(screen==='compose'&&['bridge1','bridgeReaction','bridge3','completion'].includes(composeFlow?.phase)));
    hint.hidden=modal.open||!(openingReading||sceneReading);
    hint.classList.toggle('on-paper',openingFlow?.phase==='notice');
  }
  function heading(kicker,title,desc) { return `<header class="study-heading"><div><span class="eyebrow">${kicker}</span><h1>${title}</h1></div>${desc?`<p>${desc}</p>`:''}</header>`; }
  function clearTyping() { clearInterval(typingTimer); typingTimer = null; }
  function setScreen(next, checkpoint = true) {
    stopOpening(); clearTyping(); screen = next;
    $('#game-shell').classList.remove('opening-active');
    $('#game-logo').classList.remove('logo-grand','logo-hidden');
    $('#game-logo').classList.toggle('logo-home',next==='home');
    if (checkpoint && next !== 'home' && next !== 'npc' && next !== 'npc3') {
      if (['workshop','royal2','scholar','sanghyeong','moeum','gahoek','compose','hapye'].includes(next)) state.checkpoint2 = next;
      else if (['royal3','map3notice','map3','compare3','royal3b'].includes(next)) state.checkpoint3 = next;
      else state.checkpoint = next;
      persist();
    }
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
    else if (screen === 'royal2') royal2();
    else if (screen === 'scholar') scholar();
    else if (screen === 'sanghyeong') sanghyeong();
    else if (screen === 'moeum') moeum();
    else if (screen === 'gahoek') gahoek();
    else if (screen === 'compose') compose();
    else if (screen === 'workshop') workshop();
    else if (screen === 'report') report();
    else if (screen === 'report-view') reportView();
    else if (screen === 'hapye') hapye();
    else if (screen === 'royal3') royal3();
    else if (screen === 'map3notice') map3notice();
    else if (screen === 'map3') map3();
    else if (screen === 'npc3') npc3();
    else if (screen === 'compare3') compare3();
    else if (screen === 'royal3b') royal3b();
    else if (screen === 'hapye-view') hapyeView();
    updateAdvanceHint();
  }
  function titleGlyphs() {
    return [...'훈민정음'].map((c,i) => `<svg class="glyph" viewBox="0 0 100 116" aria-hidden="true"><defs><mask id="write-${i}" maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="140"><path class="brush-path" pathLength="1" style="--delay:${.5+i*.38}s" d="M8 -4 L90 9 L4 29 L92 40 L5 60 L93 75 L2 93 L98 110 L0 125" fill="none" stroke="white" stroke-width="36" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><text x="50" y="96" text-anchor="middle" mask="url(#write-${i})">${c}</text></svg>`).join('');
  }
  function home() {
    const ch2Started=state.royal2Line>0||state.scholarLine>0||state.shapeActivityIndex>0||state.vowelActivityIndex>0||state.vowelMatchDone||state.shapePrincipleDone||state.gahoekStarted||state.gahoekSeriesIndex>0||state.gahoekDone;
    const ch3Started=state.royal3IntroDone||state.changeCards.length>0||state.royal3bLine>0||state.chapter3Done;
    game.innerHTML = `<section class="stage home-stage" aria-label="프로젝트 훈민정음 타이틀"><div class="palace"></div><div class="home-menu"><p class="menu-invitation">백성의 목소리에서 시작되는 새로운 글자의 이야기</p><div class="lesson-row"><button class="lesson-card active" data-action="start"><span class="lesson-number">一</span><span><small>1차시 · ${state.name ? '이어서 조사하기':'첫 번째 이야기'}</small><strong>세종의 어명</strong></span><span class="arrow">→</span></button><button class="lesson-card active" data-action="start2"><span class="lesson-number">二</span><span><small>2차시 · ${ch2Started?'이어서 탐구하기':'두 번째 이야기'}</small><strong>집현전 학자 되기</strong></span><span class="arrow">→</span></button><button class="lesson-card active" data-action="start3"><span class="lesson-number">三</span><span><small>3차시 · ${ch3Started?'이어서 살펴보기':'세 번째 이야기'}</small><strong>한글 홍보 프로젝트</strong></span><span class="arrow">→</span></button></div><div class="home-actions"><button class="text-button" data-action="replay">▷ 오프닝 다시 보기</button><button class="text-button" data-action="guide">이야기 안내</button></div></div></section>`;
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
  function fadeOpeningElement(element,duration){
    clearOpeningTextFade();
    const flow=openingFlow;
    element.style.opacity='1';
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
  function showOpeningText(text,element,duration){
    // Render the complete sentence before animating opacity; main dialogue typing is separate.
    element.textContent=text;element.setAttribute('aria-label',text);
    fadeOpeningElement(element,duration);
  }
  function showOpeningParagraphs(text,element,duration){
    // Blank lines mark paragraph breaks; single newlines are forced line breaks within a paragraph.
    element.innerHTML=text.split('\n\n').map(p=>`<p>${p.split('\n').map(esc).join('<br>')}</p>`).join('');
    element.setAttribute('aria-label',text.replace(/\n+/g,' ').trim());
    fadeOpeningElement(element,duration);
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
    overlay.innerHTML=`<div class="opening-paper"></div><div class="intro-copy"><div class="eyebrow">이야기에 들어가며</div><h2>기록되지 못한 마음들</h2><p id="opening-text"></p></div><canvas aria-hidden="true"></canvas><div class="narration" aria-live="off"></div><div class="opening-controls"><button class="skip" data-action="skip">오프닝 건너뛰기 →</button></div>`;
    stage.append(overlay);
    document.fonts.load('100px Brush').catch(()=>{});
    showOpeningText(D.disclaimer,$('#opening-text',overlay),800);updateAdvanceHint();
  }
  function showOpeningNarration(index){
    openingFlow.phase='narration';openingFlow.index=index;
    const narration=$('.opening .narration');
    narration.innerHTML=`<div id="opening-text" class="narration-text"></div><span class="narration-index">${index+1} / ${D.opening.length}</span>`;
    narration.classList.add('visible');
    showOpeningParagraphs(D.opening[index],$('#opening-text',narration),1000);updateAdvanceHint();
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
    return `<section class="dialogue" tabindex="0" aria-label="${esc(name)}의 대화. 클릭 또는 계속하기로 진행"><div class="speaker"><span class="speaker-name">${esc(name)}</span><small>${esc(role)}</small></div><p class="dialogue-text" id="dialogue-text"></p><div class="dialogue-bottom"><div class="dialogue-actions">${extra}<button class="continue-button" data-action="${action}">계속하기 <span aria-hidden="true">▸</span></button></div></div></section>`;
  }

  function royal() {
    const lines=[`${state.name} 조사관, 어서 오너라. 내가 그대에게 맡길 일이 있다.`,
      '백성들이 말하고 싶은 바가 있어도, 글로 제 뜻을 펴지 못하는 일이 많다고 들었다. 나는 그들의 삶을 직접 살피고자 한다.',
      '장터와 민가, 서당과 농가을 찾아가 보아라. 백성들이 어떤 어려움을 겪는지 묻고, 그들의 목소리를 기록해 오너라.',
      '모은 증언을 살펴, 백성에게 어떤 문자가 필요한지 생각해 보거라. 그대의 보고를 기다리겠다.'];
    const expressions=['smile','worried','serious','basic'];
    game.innerHTML=`<section class="scene royal-scene"><div class="scene-bg palace-bg"></div><span class="scene-location">궁궐 · 편전</span><img class="character sejong" src="assets/characters/sejong_${expressions[state.royalLine]}.png" alt="세종" data-expression="${expressions[state.royalLine]}">${dialogueMarkup('세종','조선의 임금','royal-next')}</section>`;
    type(lines[state.royalLine]);updateAdvanceHint();
  }
  function advanceRoyal(){
    if(!typingDone){finishTyping();return;}
    if(state.royalLine<3){state.royalLine++;persist();royal();}else setScreen('map');
  }

  function royal2() {
    const greeting=state.report.savedAt
      ? `${state.name} 조사관, 어서 오너라. 지난번 네가 올린 조사 보고서를 잘 살펴보았다.`
      : `${state.name} 조사관, 어서 오너라. 네가 백성들의 이야기를 살펴보았던 일을 내 기억하고 있느니라.`;
    const lines=[greeting,
      '백성들은 저마다 전하고 싶은 말이 있었으나, 그 마음을 글로 옮기기 어려워하고 있었지.',
      '그 어려움을 덜고자 짐은 새로운 문자, 훈민정음을 만들었느니라.',
      '허나 글자의 모양 하나하나에는 그렇게 만든 까닭과 원리가 담겨 있느니라.',
      '이제 너에게 새로운 임무를 맡기겠다.',
      '집현전 학자가 되어 훈민정음의 창제 원리를 살펴보고, 다른 이들도 이해할 수 있도록 해설해 보아라.',
      '알아낸 내용을 「훈민정음 해례 초안」에 정리하여 내게 올리도록 하거라.',
      '집현전에는 너의 탐구를 도와줄 학자가 기다리고 있다. 그와 함께 글자의 원리를 살펴보거라.'];
    const expressions=['smile','worried','basic','serious','basic','serious','smile','basic'];
    game.innerHTML=`<section class="scene royal-scene"><div class="scene-bg jiphyeonjeon-bg"></div><span class="scene-location">집현전</span><img class="character sejong" src="assets/characters/sejong_${expressions[state.royal2Line]}.png" alt="세종" data-expression="${expressions[state.royal2Line]}">${dialogueMarkup('세종','조선의 임금','royal2-next')}</section>`;
    type(lines[state.royal2Line]);updateAdvanceHint();
  }
  function advanceRoyal2(){
    if(!typingDone){finishTyping();return;}
    if(state.royal2Line<7){state.royal2Line++;persist();royal2();}else enterScholar();
  }
  function enterScholar(){scholarFlow=null;setScreen('scholar');}
  const scholarIntroLines=[
    {speaker:'npc',expression:'basic',text:()=>`어서 오십시오, ${state.name} 학자님. 전하께서 새로운 임무를 맡기셨다고 들었습니다.`},
    {speaker:'investigator',text:()=>'훈민정음의 글자들이 어떤 원리로 만들어졌는지 탐구하고, 그 내용을 정리하라는 명을 받았습니다.'},
    {speaker:'npc',expression:'thinking',text:()=>'그렇다면 먼저 글자의 모양을 살펴보겠습니다. 훈민정음의 기본 글자에는 특별한 원리가 담겨 있습니다.'},
    {speaker:'npc',expression:'basic',text:()=>'글자의 모양을 본뜬 상형, 획을 더하는 가획, 기본 요소를 결합하는 합성의 원리를 살펴볼 것입니다.'},
    {speaker:'npc',expression:'thinking',text:()=>'단순히 설명을 듣는 것보다 직접 관찰하고 글자를 조작해 보는 것이 좋겠습니다.'},
    {speaker:'npc',expression:'basic',text:()=>'먼저 상형의 원리부터 알아보시겠습니까?'}
  ];
  function scholar(){
    let justEntered=false;
    if(!scholarFlow){scholarFlow={phase:'talking',expression:'basic'};justEntered=true;}
    const sceneClass=`scene npc-scene scholar-scene${justEntered?' scene-fade-in':''}`;
    if(scholarFlow.phase==='talking'){
      const line=scholarIntroLines[state.scholarLine];
      if(line.speaker==='npc')scholarFlow.expression=line.expression;
      const investigator=line.speaker==='investigator';
      const speaker=investigator?`${state.name} 조사관`:'집현전 학자';
      const role=investigator?'백성의 삶을 살피는 조사관':'집현전의 선배 학자';
      game.innerHTML=`<section class="${sceneClass}" data-phase="talking" data-speaker="${investigator?'investigator':'npc'}"><div class="scene-bg gahoek-bg"></div><span class="scene-location">집현전</span><img class="character scholar" src="assets/characters/jiphyeonjeon_${scholarFlow.expression}.png" alt="집현전 학자" data-expression="${scholarFlow.expression}">${dialogueMarkup(speaker,role,'scholar-next')}</section>`;
      type(line.text());
    } else {
      game.innerHTML=`<section class="${sceneClass}" data-phase="ready"><div class="scene-bg gahoek-bg"></div><span class="scene-location">집현전</span><img class="character scholar" src="assets/characters/jiphyeonjeon_${scholarFlow.expression}.png" alt="집현전 학자" data-expression="${scholarFlow.expression}"><div class="scholar-ready"><button class="primary" data-action="finish-royal2-intro">집현전 글자 공방으로 →</button></div></section>`;
    }
    updateAdvanceHint();
  }
  function advanceScholar(){
    if(!typingDone){finishTyping();return;}
    if(state.scholarLine<scholarIntroLines.length-1){state.scholarLine++;persist();scholar();}
    else{scholarFlow.phase='ready';scholar();}
  }
  function enterSanghyeong(){sanghyeongFlow=null;setScreen('sanghyeong');}
  function sanghyeong(){
    const activities=D.chapter2.shapeActivities;
    if(state.shapeActivityIndex>=activities.length){enterMoeum();return;}
    const activity=activities[state.shapeActivityIndex];
    if(!sanghyeongFlow)sanghyeongFlow={phase:'guide',line:0,selected:null};
    const ambient=`<img class="sanghyeong-ambient" src="assets/characters/scholars_sanghyeong.png" alt="" aria-hidden="true">`;
    const floatingImage=sanghyeongFlow.phase==='reveal'?`<img class="principle-image" src="assets/learning/principle_${activity.imageKey}.png" alt="'${activity.id}'의 발음기관 모양">`:'';
    let body='';
    if(sanghyeongFlow.phase==='guide'){
      body=dialogueMarkup('집현전 학자','집현전의 선배 학자','sanghyeong-next');
    }else if(sanghyeongFlow.phase==='card'){
      body=`<div class="study-card"><h2>${esc(activity.card.title)}</h2><ol class="card-steps">${activity.card.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><button class="primary" data-action="sanghyeong-observed">${esc(activity.card.button)}</button></div>`;
    }else if(sanghyeongFlow.phase==='reveal'){
      body=dialogueMarkup('집현전 학자','집현전의 선배 학자','sanghyeong-next');
    }else{
      const q=activity.question,correct=sanghyeongFlow.selected===q.answer;
      const feedback=sanghyeongFlow.selected?`<p class="quiz-feedback ${correct?'correct':'incorrect'}">${esc(correct?q.correctFeedback:q.incorrectFeedback).split('\n').join('<br>')}</p>`:'';
      body=`<div class="study-card quiz-card"><img class="principle-image principle-image-inline" src="assets/learning/principle_${activity.imageKey}.png" alt="'${activity.id}'의 발음기관 모양"><h2>${esc(q.prompt)}</h2><div class="quiz-choices">${q.choices.map(c=>`<button class="quiz-choice ${sanghyeongFlow.selected===c?'selected':''}" data-quiz-choice="${esc(c)}">${esc(c)}</button>`).join('')}</div>${feedback}${correct?'<button class="primary" data-action="sanghyeong-complete">계속하기 →</button>':''}</div>`;
    }
    game.innerHTML=`<section class="scene sanghyeong-scene" data-phase="${sanghyeongFlow.phase}"><div class="scene-bg sanghyeong-bg"></div><span class="scene-location">집현전 · 상형 탐구실</span>${ambient}<h1 class="sanghyeong-title">${esc(activity.title)}</h1>${renderExploreNav('shape')}${floatingImage}${body}</section>`;
    if(sanghyeongFlow.phase==='guide')type(activity.guide[sanghyeongFlow.line]);
    if(sanghyeongFlow.phase==='reveal')type(activity.revealText);
    updateAdvanceHint();
  }
  function advanceSanghyeong(){
    if(!typingDone){finishTyping();return;}
    const activity=D.chapter2.shapeActivities[Math.min(state.shapeActivityIndex,D.chapter2.shapeActivities.length-1)];
    if(sanghyeongFlow.phase==='guide'){
      if(sanghyeongFlow.line+1<activity.guide.length){sanghyeongFlow.line++;sanghyeong();}
      else{sanghyeongFlow.phase='card';sanghyeong();}
    }else if(sanghyeongFlow.phase==='reveal'){
      sanghyeongFlow.phase='question';sanghyeong();
    }
  }
  function selectSanghyeongChoice(choice){
    if(!sanghyeongFlow||sanghyeongFlow.phase!=='question')return;
    sanghyeongFlow.selected=choice;sanghyeong();
  }
  function completeSanghyeong(){
    state.shapeActivityIndex=Math.min(state.shapeActivityIndex+1,D.chapter2.shapeActivities.length);
    persist();
    if(state.shapeActivityIndex>=D.chapter2.shapeActivities.length){enterMoeum();return;}
    sanghyeongFlow={phase:'guide',line:0,selected:null};
    sanghyeong();updateHeader();
  }
  function enterMoeum(){moeumFlow=null;setScreen('moeum');}
  const vowelBridgeLines=[
    {expression:'basic',text:()=>`훌륭합니다, ${state.name} 학자님. 다섯 자음 기본자가 어떤 모양을 본떴는지 모두 살펴보았군요.`},
    {expression:'thinking',text:()=>'그렇다면 모음 기본자는 어떻게 만들어졌을까요? 자음과 같은 원리로 만들어졌을까요?'}
  ];
  const vowelBridgeChoices=[
    {text:'모음도 발음기관의 모양을 본떴을 것 같습니다.',expression:'thinking',reaction:'그렇게 생각할 수도 있겠습니다. 하지만 모음 기본자는 발음기관과는 다른 모습을 본떴습니다.'},
    {text:'발음기관이 아닌 다른 모습을 본떴을 것 같습니다.',expression:'basic',reaction:'좋은 생각입니다. 모음 기본자에는 자연과 사람의 모습이 담겨 있습니다.'}
  ];
  const vowelBridgeLine3={expression:'basic',text:'지금부터 세 가지 그림을 살펴보면서 모음 기본자의 창제 원리를 탐구해 봅시다.'};
  function renderMatchBoard(){
    const activities=D.chapter2.vowelActivities;
    const letterOrder=[activities[1],activities[2],activities[0]];
    const allDone=moeumFlow.matched.length>=activities.length;
    const images=activities.map(a=>{
      const done=moeumFlow.matched.includes(a.imageKey);
      return `<button class="match-tile ${done?'matched':''} ${moeumFlow.selectedImage===a.imageKey?'selected':''}" data-match-image="${a.imageKey}" draggable="${done?'false':'true'}"><img src="assets/learning/principle_${a.imageKey}.png" alt="${esc(a.label)}">${done?'<span class="match-done">✓</span>':''}<small>${esc(a.label)}</small></button>`;
    }).join('');
    const letters=letterOrder.map(a=>{
      const done=moeumFlow.matched.includes(a.imageKey);
      return `<button class="match-letter ${done?'matched':''} ${moeumFlow.selectedLetter===a.id?'selected':''}" data-match-letter="${esc(a.id)}">${done?'<span class="match-done">✓</span>':''}${esc(a.id)}</button>`;
    }).join('');
    const wrongNote=(!allDone&&moeumFlow.wrong)?'<p class="quiz-feedback incorrect">그림 속 점과 선의 모양을 다시 살펴보세요.</p>':'';
    const successNote=allDone?'<p class="quiz-feedback correct">잘하셨습니다!<br>하늘은 ㆍ, 땅은 ㅡ, 사람은 ㅣ와 연결됩니다.</p><button class="primary" data-action="moeum-match-continue">다음 단계로 →</button>':'';
    const resetBtn=(!allDone&&moeumFlow.matched.length>0)?'<button class="text-button" data-action="moeum-reset-match">다시 연결하기</button>':'';
    return `<div class="study-card match-card"><p class="instruction">왼쪽 그림과 오른쪽 글자를 차례로 눌러(또는 끌어서) 짝을 지어 보세요. 이미 연결한 카드를 다시 누르면 연결이 풀립니다.</p><div class="match-grid"><div class="match-images">${images}</div><svg class="match-lines" aria-hidden="true"></svg><div class="match-letters">${letters}</div></div>${wrongNote}${successNote}${resetBtn}</div>`;
  }
  function drawMoeumMatchLines(){
    const svg=$('.match-lines'),grid=$('.match-grid');
    if(!svg||!grid||!moeumFlow||moeumFlow.phase!=='match')return;
    const gridRect=grid.getBoundingClientRect();
    svg.setAttribute('viewBox',`0 0 ${gridRect.width} ${gridRect.height}`);
    svg.innerHTML='';
    const activities=D.chapter2.vowelActivities;
    const pairs=activities.filter(a=>moeumFlow.matched.includes(a.imageKey)).map(a=>({imageKey:a.imageKey,letterId:a.id,wrong:false}));
    if(moeumFlow.wrong&&moeumFlow.selectedImage&&moeumFlow.selectedLetter)pairs.push({imageKey:moeumFlow.selectedImage,letterId:moeumFlow.selectedLetter,wrong:true});
    pairs.forEach(p=>{
      const imgEl=grid.querySelector(`[data-match-image="${p.imageKey}"]`);
      const letterEl=[...grid.querySelectorAll('[data-match-letter]')].find(el=>el.dataset.matchLetter===p.letterId);
      if(!imgEl||!letterEl)return;
      const r1=imgEl.getBoundingClientRect(),r2=letterEl.getBoundingClientRect();
      const x1=r1.right-gridRect.left,y1=r1.top+r1.height/2-gridRect.top;
      const x2=r2.left-gridRect.left,y2=r2.top+r2.height/2-gridRect.top;
      const midX=(x1+x2)/2;
      const path=document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d',`M${x1} ${y1} C${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`);
      path.setAttribute('class','match-line'+(p.wrong?' wrong':''));
      svg.appendChild(path);
    });
  }
  function resetMoeumMatches(){
    if(!moeumFlow||moeumFlow.phase!=='match'||moeumFlow.matched.length>=D.chapter2.vowelActivities.length)return;
    moeumFlow.matched=[];moeumFlow.selectedImage=null;moeumFlow.selectedLetter=null;moeumFlow.wrong=false;
    moeum();
  }
  function renderShapeSummary(){
    const s=D.chapter2.shapeSummary;
    const actions=state.shapePrincipleDone?'<button class="primary" data-action="to-workshop">집현전 글자 공방으로 →</button>':`<button class="primary" data-action="moeum-finish">${esc(s.button)}</button>`;
    return `<div class="study-card summary-card"><div class="summary-block"><h3>${esc(s.consonants.label)}</h3><p class="summary-letters">${esc(s.consonants.letters)}</p><p>${esc(s.consonants.desc)}</p></div><div class="summary-block"><h3>${esc(s.vowels.label)}</h3><p class="summary-letters">${esc(s.vowels.letters)}</p><p>${esc(s.vowels.desc)}</p></div><div class="summary-block"><h3>${esc(s.common.label)}</h3><p><strong>${esc(s.common.title)}</strong><br>${esc(s.common.desc)}</p></div>${actions}</div>`;
  }
  function moeum(){
    const vActivities=D.chapter2.vowelActivities;
    if(!moeumFlow){
      if(state.shapePrincipleDone||state.vowelMatchDone)moeumFlow={phase:'summary'};
      else if(state.vowelActivityIndex>=vActivities.length)moeumFlow={phase:'match',selectedImage:null,selectedLetter:null,matched:[],wrong:false};
      else if(state.vowelActivityIndex>0)moeumFlow={phase:'guess',selected:null};
      else moeumFlow={phase:'bridge1'};
    }
    const activity=vActivities[Math.min(state.vowelActivityIndex,vActivities.length-1)];
    const ambient=`<img class="sanghyeong-ambient" src="assets/characters/scholars_sanghyeong.png" alt="" aria-hidden="true">`;
    const dialoguePhases=['bridge1','bridge2','bridgeReaction','bridge3','guess','guessReaction','matchSuccess'];
    let body='',title='모음 기본자 상형 탐구';
    if(moeumFlow.phase==='bridge1'){
      moeumFlow.expression=vowelBridgeLines[0].expression;
      body=dialogueMarkup('집현전 학자','집현전의 선배 학자','moeum-next');
    }else if(moeumFlow.phase==='bridge2'){
      moeumFlow.expression=vowelBridgeLines[1].expression;
      const choices=`<div class="question-choices" aria-label="학자의 질문">${vowelBridgeChoices.map((c,i)=>`<button class="question" data-moeum-choice="${i}"><span>${esc(c.text)}</span></button>`).join('')}</div>`;
      body=choices+dialogueMarkup('집현전 학자','집현전의 선배 학자','moeum-next');
    }else if(moeumFlow.phase==='bridgeReaction'){
      moeumFlow.expression=vowelBridgeChoices[moeumFlow.choice].expression;
      body=dialogueMarkup('집현전 학자','집현전의 선배 학자','moeum-next');
    }else if(moeumFlow.phase==='bridge3'){
      moeumFlow.expression=vowelBridgeLine3.expression;
      body=dialogueMarkup('집현전 학자','집현전의 선배 학자','moeum-next');
    }else if(moeumFlow.phase==='ready'){
      body=`<div class="scholar-ready"><button class="primary" data-action="moeum-start">${esc(D.chapter2.vowelStartButton)} →</button></div>`;
    }else if(moeumFlow.phase==='guess'){
      moeumFlow.expression='basic';
      title=`${activity.label} · '${activity.id}'`;
      const choices=`<div class="question-choices" aria-label="학자의 질문">${activity.guessChoices.map((c,i)=>`<button class="question" data-moeum-guess="${i}"><span>${esc(c)}</span></button>`).join('')}</div>`;
      body=choices+dialogueMarkup('집현전 학자','집현전의 선배 학자','moeum-next');
    }else if(moeumFlow.phase==='guessReaction'){
      moeumFlow.expression='basic';
      title=`${activity.label} · '${activity.id}'`;
      body=dialogueMarkup('집현전 학자','집현전의 선배 학자','moeum-next');
    }else if(moeumFlow.phase==='reveal'){
      title=`${activity.label} · '${activity.id}'`;
      body=`<div class="study-card"><img class="principle-image-reveal" src="assets/learning/principle_${activity.imageKey}.png" alt="${esc(activity.label)}과 '${activity.id}'"><p>${esc(activity.revealPrompt)}</p><button class="primary" data-action="moeum-observed">그림을 관찰했어요</button></div>`;
    }else if(moeumFlow.phase==='question'){
      title=`${activity.label} · '${activity.id}'`;
      const q=activity.question,correct=moeumFlow.selected===q.answer;
      const feedback=moeumFlow.selected?`<p class="quiz-feedback ${correct?'correct':'incorrect'}">${esc(correct?q.correctFeedback:q.incorrectFeedback).split('\n').join('<br>')}</p>`:'';
      const isLast=state.vowelActivityIndex>=vActivities.length-1;
      body=`<div class="study-card quiz-card"><img class="principle-image principle-image-inline" src="assets/learning/principle_${activity.imageKey}.png" alt="${esc(activity.label)}과 '${activity.id}'"><h2>${esc(q.prompt)}</h2><div class="quiz-choices">${q.choices.map(c=>`<button class="quiz-choice ${moeumFlow.selected===c?'selected':''}" data-quiz-choice="${esc(c)}">${esc(c)}</button>`).join('')}</div>${feedback}${correct?`<button class="primary" data-action="moeum-complete">${isLast?'모음 기본자 연결하기':'다음 탐구로'} →</button>`:''}</div>`;
    }else if(moeumFlow.phase==='match'){
      title='모음 기본자의 창제 원리 정리하기';
      body=renderMatchBoard();
    }else if(moeumFlow.phase==='matchSuccess'){
      moeumFlow.expression=D.chapter2.vowelMatchSuccess[moeumFlow.line].expression;
      body=dialogueMarkup('집현전 학자','집현전의 선배 학자','moeum-next');
    }else{
      title=D.chapter2.shapeSummary.title;
      body=renderShapeSummary();
    }
    const showPortrait=dialoguePhases.includes(moeumFlow.phase);
    const portrait=showPortrait?`<img class="character scholar" src="assets/characters/jiphyeonjeon_${moeumFlow.expression||'basic'}.png" alt="집현전 학자" data-expression="${moeumFlow.expression||'basic'}">`:'';
    game.innerHTML=`<section class="scene sanghyeong-scene" data-phase="${moeumFlow.phase}"><div class="scene-bg sanghyeong-bg"></div><span class="scene-location">집현전 · 상형 탐구실</span>${ambient}${portrait}<h1 class="sanghyeong-title">${esc(title)}</h1>${renderExploreNav('shape')}${body}</section>`;
    if(moeumFlow.phase==='bridge1')type(vowelBridgeLines[0].text());
    if(moeumFlow.phase==='bridge2')type(vowelBridgeLines[1].text());
    if(moeumFlow.phase==='bridgeReaction')type(vowelBridgeChoices[moeumFlow.choice].reaction);
    if(moeumFlow.phase==='bridge3')type(vowelBridgeLine3.text);
    if(moeumFlow.phase==='guess')type(activity.guessPrompt);
    if(moeumFlow.phase==='guessReaction')type('그렇게 생각할 수 있겠군요. 그림으로 직접 확인해 봅시다.');
    if(moeumFlow.phase==='matchSuccess')type(D.chapter2.vowelMatchSuccess[moeumFlow.line].text);
    updateAdvanceHint();
    if(moeumFlow.phase==='match')requestAnimationFrame(drawMoeumMatchLines);
  }
  function advanceMoeum(){
    if(!typingDone){finishTyping();return;}
    if(moeumFlow.phase==='bridge1'){moeumFlow.phase='bridge2';moeum();}
    else if(moeumFlow.phase==='bridgeReaction'){moeumFlow.phase='bridge3';moeum();}
    else if(moeumFlow.phase==='bridge3'){moeumFlow.phase='ready';moeum();}
    else if(moeumFlow.phase==='guessReaction'){moeumFlow.phase='reveal';moeum();}
    else if(moeumFlow.phase==='matchSuccess'){
      if(moeumFlow.line+1<D.chapter2.vowelMatchSuccess.length){moeumFlow.line++;moeum();}
      else{moeumFlow={phase:'summary'};moeum();}
    }
  }
  function selectMoeumBridgeChoice(i){
    if(!moeumFlow||moeumFlow.phase!=='bridge2')return;
    moeumFlow.choice=i;moeumFlow.phase='bridgeReaction';moeum();
  }
  function selectMoeumGuess(i){
    if(!moeumFlow||moeumFlow.phase!=='guess')return;
    moeumFlow.phase='guessReaction';moeum();
  }
  function startMoeumActivities(){
    moeumFlow={phase:'guess',selected:null};moeum();
  }
  function moeumObserved(){
    if(!moeumFlow||moeumFlow.phase!=='reveal')return;
    moeumFlow.phase='question';moeum();
  }
  function selectMoeumQuizChoice(choice){
    if(!moeumFlow||moeumFlow.phase!=='question')return;
    moeumFlow.selected=choice;moeum();
  }
  function completeMoeumActivity(){
    state.vowelActivityIndex=Math.min(state.vowelActivityIndex+1,D.chapter2.vowelActivities.length);
    persist();
    moeumFlow=state.vowelActivityIndex>=D.chapter2.vowelActivities.length
      ?{phase:'match',selectedImage:null,selectedLetter:null,matched:[],wrong:false}
      :{phase:'guess',selected:null};
    moeum();updateHeader();
  }
  function tryMoeumMatch(){
    if(!moeumFlow.selectedImage||!moeumFlow.selectedLetter)return;
    const activity=D.chapter2.vowelActivities.find(a=>a.imageKey===moeumFlow.selectedImage);
    if(activity&&activity.id===moeumFlow.selectedLetter){
      moeumFlow.matched.push(moeumFlow.selectedImage);
      moeumFlow.selectedImage=null;moeumFlow.selectedLetter=null;moeumFlow.wrong=false;
      if(moeumFlow.matched.length>=D.chapter2.vowelActivities.length){state.vowelMatchDone=true;persist();}
      moeum();
    }else{
      moeumFlow.wrong=true;moeum();
      const snapshot=moeumFlow;
      setTimeout(()=>{
        if(moeumFlow!==snapshot)return;
        moeumFlow.selectedImage=null;moeumFlow.selectedLetter=null;moeumFlow.wrong=false;
        moeum();
      },900);
    }
  }
  function selectMatchImage(key){
    if(!moeumFlow||moeumFlow.phase!=='match'||moeumFlow.matched.length>=D.chapter2.vowelActivities.length)return;
    if(moeumFlow.matched.includes(key)){
      moeumFlow.matched=moeumFlow.matched.filter(k=>k!==key);
      moeumFlow.selectedImage=null;moeumFlow.selectedLetter=null;moeumFlow.wrong=false;
      moeum();return;
    }
    moeumFlow.wrong=false;
    moeumFlow.selectedImage=moeumFlow.selectedImage===key?null:key;
    tryMoeumMatch();
  }
  function selectMatchLetter(letter){
    if(!moeumFlow||moeumFlow.phase!=='match'||moeumFlow.matched.length>=D.chapter2.vowelActivities.length)return;
    const activity=D.chapter2.vowelActivities.find(a=>a.id===letter);
    if(activity&&moeumFlow.matched.includes(activity.imageKey)){
      moeumFlow.matched=moeumFlow.matched.filter(k=>k!==activity.imageKey);
      moeumFlow.selectedImage=null;moeumFlow.selectedLetter=null;moeumFlow.wrong=false;
      moeum();return;
    }
    moeumFlow.wrong=false;
    moeumFlow.selectedLetter=moeumFlow.selectedLetter===letter?null:letter;
    tryMoeumMatch();
  }
  function finishShapePrinciple(){
    state.shapePrincipleDone=true;persist();moeum();updateHeader();
  }
  function enterGahoek(){gahoekFlow=null;setScreen('gahoek');}
  const gahoekBridgeLines=[
    {expression:'basic',text:()=>`훌륭합니다, ${state.name} 학자님. 기본자가 어떤 모양을 본떠 만들어졌는지 살펴보았습니다.`},
    {expression:'thinking',text:()=>'그런데 훈민정음에는 기본자 외에도 여러 자음자가 있습니다. 이 글자들은 어떤 방법으로 만들어졌을까요?'}
  ];
  const gahoekBridgeChoices=[
    {text:'기본자에 획을 더했을 것 같습니다.',expression:'thinking',reaction:'그렇게 생각할 수 있습니다. 직접 글자를 비교하며 확인해 봅시다.'},
    {text:'기본자와 관계없이 만들었을 것 같습니다.',expression:'thinking',reaction:'그럴 수도 있겠지요. 하지만 직접 살펴보면 흥미로운 관계를 발견할 수 있을 것입니다.'}
  ];
  const gahoekBridgeLine3={expression:'basic',text:'직접 글자를 조작하면서 어떤 변화가 일어나는지 살펴봅시다.'};
  function renderStrokeStage(){
    const g=D.chapter2.gahoek,series=g.strokeSeries[gahoekFlow.seriesIndex],step=series.steps[gahoekFlow.stepIndex];
    const isLastStep=gahoekFlow.stepIndex>=series.steps.length-1;
    const quote=gahoekFlow.stepIndex===0?`<p class="scholar-quote">“${esc(series.guideLine)}”</p>`:'';
    const display=gahoekFlow.placed?step.result:step.base;
    const boxClass=gahoekFlow.placing&&!gahoekFlow.placed?'placing':'';
    const zones=gahoekFlow.placed?'':step.targets.map(t=>`<button class="stroke-zone ${gahoekFlow.wrongTarget===t.id?'wrong':''}" style="left:${t.x}%;top:${t.y}%" data-stroke-target="${t.id}" aria-label="획을 놓을 위치"></button>`).join('');
    const piece=gahoekFlow.placed?'':`<button class="stroke-piece ${gahoekFlow.placing?'selected':''}" draggable="true" data-stroke-piece="true" aria-pressed="${!!gahoekFlow.placing}"><span class="stroke-piece-bar"></span><small>획 조각 — 끌거나 눌러서 놓기</small></button>`;
    const extra=(isLastStep&&series.completeFeedback)?`<p class="quiz-feedback correct">${esc(series.completeFeedback).split('\n').join('<br>')}</p>`:'';
    const feedback=gahoekFlow.placed
      ?`<p class="quiz-feedback correct">${esc(step.correctFeedback).split('\n').join('<br>')}</p>${extra}<div class="action-row"><button class="text-button" data-action="gahoek-stroke-retry">다시 만들어 보기</button><button class="primary" data-action="gahoek-stroke-next">다음 →</button></div>`
      :(gahoekFlow.wrong?`<p class="quiz-feedback incorrect">${esc(step.incorrectFeedback)}</p>`:'');
    return `<div class="study-card stroke-card"><h2>${esc(series.cardTitle)}</h2>${quote}<p class="instruction">${esc(step.instruction)}</p><p class="hint">획 조각을 글자 위로 끌어다 놓거나, 조각을 누른 뒤 놓을 자리를 눌러 보세요.</p><div class="stroke-glyph-box ${boxClass}">${zones}<div class="stroke-glyph ${gahoekFlow.placed?'done':''}">${esc(display)}</div></div><div class="stroke-tray">${piece}</div>${feedback}</div>`;
  }
  function renderOrderStage(){
    const o=D.chapter2.gahoek.orderSeries;
    const allFilled=gahoekFlow.slots.every(Boolean);
    const trayCards=o.cards.filter(c=>!gahoekFlow.slots.includes(c));
    const slotsHtml=gahoekFlow.slots.map((c,i)=>`<button class="order-slot ${c?'filled':''}" data-order-slot="${i}">${c?esc(c):''}</button>`).join('');
    const trayHtml=trayCards.map(c=>`<button class="order-card ${gahoekFlow.selectedCard===c?'selected':''}" data-order-card="${esc(c)}" draggable="true">${esc(c)}</button>`).join('');
    const feedback=gahoekFlow.wrong?`<p class="quiz-feedback incorrect">${esc(o.incorrectFeedback)}</p>`:'';
    const confirmBtn=allFilled?`<button class="primary" data-action="gahoek-order-confirm">${esc(o.confirmButton)}</button>`:'';
    return `<div class="study-card order-card-wrap"><h2>${esc(o.cardTitle)}</h2><p class="scholar-quote">“${esc(o.guideLine)}”</p><p class="instruction">${esc(o.intro)}</p><p class="hint">카드를 끌어다 놓거나 클릭해 배치한 뒤 정답을 확인해 보세요.</p><div class="order-row">${slotsHtml}</div><div class="order-tray">${trayHtml}</div>${feedback}${confirmBtn}</div>`;
  }
  function renderOrderCompare(){
    const o=D.chapter2.gahoek.orderSeries,q=o.basicQuestion;
    const big=o.answer.map(c=>`<span class="order-big">${esc(c)}</span>`).join('<span class="order-arrow">→</span>');
    const feedback=gahoekFlow.wrong?`<p class="quiz-feedback incorrect">${esc(q.incorrectFeedback)}</p>`:'';
    return `<div class="study-card order-card-wrap"><div class="order-result">${big}</div><p class="scholar-quote">“${esc(q.prompt)}”</p><div class="quiz-choices">${q.choices.map(c=>`<button class="quiz-choice" data-order-basic="${esc(c)}">${esc(c)}</button>`).join('')}</div>${feedback}</div>`;
  }
  function renderOrderPrinciple(){
    const q=D.chapter2.gahoek.orderSeries.principleQuestion;
    const feedback=gahoekFlow.wrong?`<p class="quiz-feedback incorrect">${esc(q.incorrectFeedback)}</p>`:'';
    return `<div class="study-card order-card-wrap"><p class="scholar-quote">“${esc(q.prompt)}”</p><div class="quiz-choices">${q.choices.map(c=>`<button class="quiz-choice" data-order-principle="${esc(c)}">${esc(c)}</button>`).join('')}</div>${feedback}</div>`;
  }
  function renderOrderDone(){
    const o=D.chapter2.gahoek.orderSeries;
    return `<div class="study-card order-card-wrap"><p class="quiz-feedback correct">${esc(o.finalFeedback).split('\n').join('<br>')}</p><button class="primary" data-action="gahoek-order-next">다음 →</button></div>`;
  }
  function renderGahoekSummary(){
    const s=D.chapter2.gahoek.summary;
    const revealed=!!gahoekFlow.principleRevealed;
    return `<div class="study-card summary-card gahoek-summary"><h2>${esc(s.title)}</h2><label for="gahoek-q1">${esc(s.q1)}</label><textarea id="gahoek-q1" data-gahoek-answer="0" maxlength="1000" placeholder="자신의 생각을 적어 보세요.">${esc(state.gahoekSummary.q1)}</textarea><label for="gahoek-q2">${esc(s.q2)}</label><textarea id="gahoek-q2" data-gahoek-answer="1" maxlength="1000" placeholder="자신의 생각을 적어 보세요.">${esc(state.gahoekSummary.q2)}</textarea>${revealed?`<div class="principle-box"><strong>핵심 정리</strong><p>${esc(s.principle)}</p></div>`:''}<div class="action-row"><button class="secondary" data-action="gahoek-reveal">원리 확인하기</button><button class="primary" data-action="gahoek-finish">${esc(s.button)}</button></div></div>`;
  }
  function gahoek(){
    const g=D.chapter2.gahoek;
    if(!gahoekFlow){
      if(state.gahoekDone)gahoekFlow={phase:'done'};
      else if(state.gahoekSeriesIndex>=3)gahoekFlow={phase:'summary'};
      else if(state.gahoekSeriesIndex>=g.strokeSeries.length)gahoekFlow={phase:'order',slots:[null,null,null],selectedCard:null,wrong:false};
      else if(state.gahoekSeriesIndex>0)gahoekFlow={phase:'stroke',seriesIndex:state.gahoekSeriesIndex,stepIndex:0,placed:false,wrong:false,wrongTarget:null};
      else gahoekFlow={phase:'bridge1'};
    }
    const ambient='<img class="sanghyeong-ambient" src="assets/characters/scholars_gahoek.png" alt="" aria-hidden="true">';
    const dialoguePhases=['bridge1','bridge2','bridgeReaction','bridge3','completion'];
    let body='',title='가획 원리 탐구';
    if(gahoekFlow.phase==='bridge1'){
      gahoekFlow.expression=gahoekBridgeLines[0].expression;
      body=dialogueMarkup('집현전 학자','집현전의 선배 학자','gahoek-next');
    }else if(gahoekFlow.phase==='bridge2'){
      gahoekFlow.expression=gahoekBridgeLines[1].expression;
      const choices=`<div class="question-choices" aria-label="학자의 질문">${gahoekBridgeChoices.map((c,i)=>`<button class="question" data-gahoek-choice="${i}"><span>${esc(c.text)}</span></button>`).join('')}</div>`;
      body=choices+dialogueMarkup('집현전 학자','집현전의 선배 학자','gahoek-next');
    }else if(gahoekFlow.phase==='bridgeReaction'){
      gahoekFlow.expression=gahoekBridgeChoices[gahoekFlow.choice].expression;
      body=dialogueMarkup('집현전 학자','집현전의 선배 학자','gahoek-next');
    }else if(gahoekFlow.phase==='bridge3'){
      gahoekFlow.expression=gahoekBridgeLine3.expression;
      body=dialogueMarkup('집현전 학자','집현전의 선배 학자','gahoek-next');
    }else if(gahoekFlow.phase==='ready'){
      body=`<div class="scholar-ready"><button class="primary" data-action="gahoek-start">${esc(g.startButton)} →</button></div>`;
    }else if(gahoekFlow.phase==='stroke'){
      title=`가획 원리 탐구 ${gahoekFlow.seriesIndex+1} / 3`;
      body=renderStrokeStage();
    }else if(gahoekFlow.phase==='order'){
      title='가획 원리 탐구 3 / 3';
      body=renderOrderStage();
    }else if(gahoekFlow.phase==='orderCompare'){
      title='가획 원리 탐구 3 / 3';
      body=renderOrderCompare();
    }else if(gahoekFlow.phase==='orderPrinciple'){
      title='가획 원리 탐구 3 / 3';
      body=renderOrderPrinciple();
    }else if(gahoekFlow.phase==='orderDone'){
      title='가획 원리 탐구 3 / 3';
      body=renderOrderDone();
    }else if(gahoekFlow.phase==='summary'){
      title=g.summary.title;
      body=renderGahoekSummary();
    }else if(gahoekFlow.phase==='completion'){
      gahoekFlow.expression=g.completion[gahoekFlow.line].expression;
      body=dialogueMarkup('집현전 학자','집현전의 선배 학자','gahoek-next');
    }else{
      body=`<div class="study-card"><h2>가획 원리 탐구를 완료했습니다.</h2><p>다음 탐구인 합성 원리를 이어서 살펴보거나, 지금까지 탐구한 원리를 「나의 해례 기록」에 정리할 수 있습니다.</p><div class="action-row"><button class="secondary" data-action="to-workshop">집현전 글자 공방으로 →</button><button class="secondary" data-action="to-hapye">나의 해례 기록 작성하기 →</button><button class="primary" data-action="enter-compose">합성 원리 탐구하기 →</button></div></div>`;
    }
    const showPortrait=dialoguePhases.includes(gahoekFlow.phase);
    const portrait=showPortrait?`<img class="character scholar" src="assets/characters/jiphyeonjeon_${gahoekFlow.expression||'basic'}.png" alt="집현전 학자" data-expression="${gahoekFlow.expression||'basic'}">`:'';
    game.innerHTML=`<section class="scene sanghyeong-scene" data-phase="${gahoekFlow.phase}"><div class="scene-bg gahoek-bg"></div><span class="scene-location">집현전 · 가획 탐구실</span>${ambient}${portrait}<h1 class="sanghyeong-title">${esc(title)}</h1>${renderExploreNav('gahoek')}${body}</section>`;
    if(gahoekFlow.phase==='bridge1')type(gahoekBridgeLines[0].text());
    if(gahoekFlow.phase==='bridge2')type(gahoekBridgeLines[1].text());
    if(gahoekFlow.phase==='bridgeReaction')type(gahoekBridgeChoices[gahoekFlow.choice].reaction);
    if(gahoekFlow.phase==='bridge3')type(gahoekBridgeLine3.text);
    if(gahoekFlow.phase==='completion')type(g.completion[gahoekFlow.line].text);
    updateAdvanceHint();
  }
  function advanceGahoek(){
    if(!typingDone){finishTyping();return;}
    if(gahoekFlow.phase==='bridge1'){gahoekFlow.phase='bridge2';gahoek();}
    else if(gahoekFlow.phase==='bridgeReaction'){gahoekFlow.phase='bridge3';gahoek();}
    else if(gahoekFlow.phase==='bridge3'){gahoekFlow.phase='ready';gahoek();}
    else if(gahoekFlow.phase==='completion'){
      if(gahoekFlow.line+1<D.chapter2.gahoek.completion.length){gahoekFlow.line++;gahoek();}
      else{state.gahoekDone=true;persist();gahoekFlow={phase:'done'};gahoek();updateHeader();}
    }
  }
  function selectGahoekBridgeChoice(i){
    if(!gahoekFlow||gahoekFlow.phase!=='bridge2')return;
    gahoekFlow.choice=i;gahoekFlow.phase='bridgeReaction';gahoek();
  }
  function startGahoekActivities(){
    state.gahoekStarted=true;persist();
    gahoekFlow={phase:'stroke',seriesIndex:0,stepIndex:0,placed:false,wrong:false,wrongTarget:null};gahoek();updateHeader();
  }
  function toggleStrokePlacing(){
    if(!gahoekFlow||gahoekFlow.phase!=='stroke'||gahoekFlow.placed)return;
    gahoekFlow.placing=!gahoekFlow.placing;gahoek();
  }
  function attemptStrokeTarget(targetId){
    if(!gahoekFlow||gahoekFlow.phase!=='stroke'||gahoekFlow.placed)return;
    const series=D.chapter2.gahoek.strokeSeries[gahoekFlow.seriesIndex],step=series.steps[gahoekFlow.stepIndex];
    const target=step.targets.find(t=>t.id===targetId);
    if(!target)return;
    gahoekFlow.placing=false;
    if(target.correct){
      gahoekFlow.placed=true;gahoekFlow.wrong=false;gahoekFlow.wrongTarget=null;gahoek();
    }else{
      gahoekFlow.wrong=true;gahoekFlow.wrongTarget=targetId;gahoek();
      const snapshot=gahoekFlow;
      setTimeout(()=>{if(gahoekFlow!==snapshot)return;gahoekFlow.wrong=false;gahoekFlow.wrongTarget=null;gahoek();},900);
    }
  }
  function advanceGahoekStroke(){
    if(!gahoekFlow||gahoekFlow.phase!=='stroke'||!gahoekFlow.placed)return;
    const series=D.chapter2.gahoek.strokeSeries[gahoekFlow.seriesIndex];
    if(gahoekFlow.stepIndex+1<series.steps.length){
      gahoekFlow={phase:'stroke',seriesIndex:gahoekFlow.seriesIndex,stepIndex:gahoekFlow.stepIndex+1,placed:false,wrong:false,wrongTarget:null};
      gahoek();return;
    }
    state.gahoekSeriesIndex=Math.min(gahoekFlow.seriesIndex+1,3);persist();
    gahoekFlow=state.gahoekSeriesIndex>=D.chapter2.gahoek.strokeSeries.length
      ?{phase:'order',slots:[null,null,null],selectedCard:null,wrong:false}
      :{phase:'stroke',seriesIndex:state.gahoekSeriesIndex,stepIndex:0,placed:false,wrong:false,wrongTarget:null};
    gahoek();updateHeader();
  }
  function retryStrokeStep(){
    if(!gahoekFlow||gahoekFlow.phase!=='stroke'||!gahoekFlow.placed)return;
    gahoekFlow.placed=false;gahoekFlow.wrong=false;gahoekFlow.wrongTarget=null;gahoekFlow.placing=false;gahoek();
  }
  function selectOrderCard(card){
    if(!gahoekFlow||gahoekFlow.phase!=='order')return;
    gahoekFlow.wrong=false;
    gahoekFlow.selectedCard=gahoekFlow.selectedCard===card?null:card;gahoek();
  }
  function placeOrderCard(slotIndex){
    if(!gahoekFlow||gahoekFlow.phase!=='order')return;
    gahoekFlow.wrong=false;
    if(gahoekFlow.slots[slotIndex]){gahoekFlow.slots[slotIndex]=null;gahoek();return;}
    if(!gahoekFlow.selectedCard)return;
    gahoekFlow.slots[slotIndex]=gahoekFlow.selectedCard;gahoekFlow.selectedCard=null;gahoek();
  }
  function confirmOrderActivity(){
    if(!gahoekFlow||gahoekFlow.phase!=='order'||!gahoekFlow.slots.every(Boolean))return;
    const o=D.chapter2.gahoek.orderSeries;
    if(gahoekFlow.slots.every((c,i)=>c===o.answer[i])){gahoekFlow={phase:'orderCompare',wrong:false};}
    else gahoekFlow.wrong=true;
    gahoek();
  }
  function selectOrderBasic(choice){
    if(!gahoekFlow||gahoekFlow.phase!=='orderCompare')return;
    const q=D.chapter2.gahoek.orderSeries.basicQuestion;
    if(choice===q.answer){gahoekFlow={phase:'orderPrinciple',wrong:false};}
    else gahoekFlow.wrong=true;
    gahoek();
  }
  function selectOrderPrinciple(choice){
    if(!gahoekFlow||gahoekFlow.phase!=='orderPrinciple')return;
    const q=D.chapter2.gahoek.orderSeries.principleQuestion;
    if(choice===q.answer){gahoekFlow={phase:'orderDone'};}
    else gahoekFlow.wrong=true;
    gahoek();
  }
  function finishOrderActivity(){
    if(!gahoekFlow||gahoekFlow.phase!=='orderDone')return;
    state.gahoekSeriesIndex=3;persist();
    gahoekFlow={phase:'summary'};gahoek();updateHeader();
  }
  function revealGahoekPrinciple(){
    if(!gahoekFlow||gahoekFlow.phase!=='summary')return;
    gahoekFlow.principleRevealed=true;gahoek();
  }
  function finishGahoekSummary(){
    if(!gahoekFlow||gahoekFlow.phase!=='summary')return;
    if(!state.gahoekSummary.q1.trim()||!state.gahoekSummary.q2.trim()){toast('두 질문에 자신의 생각을 적어 주세요.');return;}
    state.gahoekSummary.savedAt=new Date().toISOString();persist();
    gahoekFlow={phase:'completion',line:0};gahoek();updateHeader();
  }
  function enterCompose(){composeFlow=null;setScreen('compose');}
  const composeBridgeLines=[
    {expression:'basic',text:()=>"이제 모음 기본자 'ㆍ, ㅡ, ㅣ'를 결합하는 원리를 살펴보겠습니다."},
    {expression:'thinking',text:()=>"'ㆍ'는 하늘의 둥근 모양을, 'ㅡ'는 땅의 평평한 모양을, 'ㅣ'는 사람이 서 있는 모양을 본뜬 글자였지요. 이 세 모음 기본자를 서로 합치면 어떤 모음이 만들어질까요?"}
  ];
  const composeBridgeChoices=[
    {text:'모음 기본자들을 합쳐 새로운 모음을 만들 것 같습니다.',expression:'thinking',reaction:'그렇습니다. 직접 모음 기본자를 배치하며 확인해 봅시다.'},
    {text:'모음 기본자는 서로 합쳐지지 않을 것 같습니다.',expression:'thinking',reaction:'그렇게 생각할 수도 있지만, 직접 조작해 보면 새로운 모음이 만들어지는 것을 확인할 수 있습니다.'}
  ];
  const composeBridgeLine3={expression:'basic',text:"모음 기본자 'ㆍ'를 'ㅡ'와 'ㅣ'의 둘레에 놓아 새로운 모음을 만들어 봅시다."};
  function renderComposeStage(){
    const g=D.chapter2.compose,item=g.buildSeries[composeFlow.index];
    const isLast=composeFlow.index>=g.buildSeries.length-1;
    const quote=`<p class="scholar-quote">“${esc(item.guideLine)}”</p>`;
    const display=composeFlow.placed?item.result:item.base;
    const boxClass=composeFlow.placing&&!composeFlow.placed?'placing':'';
    const zones=composeFlow.placed?'':item.targets.map(t=>`<button class="stroke-zone ${composeFlow.wrongTarget===t.id?'wrong':''}" style="left:${t.x}%;top:${t.y}%" data-compose-target="${t.id}" aria-label="하늘 조각을 놓을 위치"></button>`).join('');
    const piece=composeFlow.placed?'':`<button class="stroke-piece ${composeFlow.placing?'selected':''}" draggable="true" data-compose-piece="true" aria-pressed="${!!composeFlow.placing}"><span class="stroke-piece-bar compose-dot"></span><small>하늘(ㆍ) 조각 — 끌거나 눌러서 놓기</small></button>`;
    const extra=(isLast&&g.completeFeedback)?`<p class="quiz-feedback correct">${esc(g.completeFeedback).split('\n').join('<br>')}</p>`:'';
    const feedback=composeFlow.placed
      ?`<p class="quiz-feedback correct">${esc(item.correctFeedback).split('\n').join('<br>')}</p>${extra}<div class="action-row"><button class="text-button" data-action="compose-build-retry">다시 만들어 보기</button><button class="primary" data-action="compose-build-next">다음 →</button></div>`
      :(composeFlow.wrong?`<p class="quiz-feedback incorrect">${esc(item.incorrectFeedback)}</p>`:'');
    return `<div class="study-card stroke-card"><h2>${esc(item.cardTitle)}</h2>${quote}<p class="instruction">${esc(item.instruction)}</p><p class="hint">하늘 조각을 글자 위로 끌어다 놓거나, 조각을 누른 뒤 놓을 자리를 눌러 보세요.</p><div class="stroke-glyph-box ${boxClass}">${zones}<div class="stroke-glyph ${composeFlow.placed?'done':''}">${esc(display)}</div></div><div class="stroke-tray">${piece}</div>${feedback}</div>`;
  }
  function renderComposePrinciple(){
    const s=D.chapter2.compose.summary;
    return `<div class="study-card summary-card"><h2>${esc(s.title)}</h2><div class="principle-box"><strong>핵심 정리</strong><p>${esc(s.principle)}</p></div><div class="action-row"><button class="primary" data-action="compose-finish">${esc(s.button)}</button></div></div>`;
  }
  function compose(){
    const g=D.chapter2.compose;
    if(!composeFlow){
      if(state.composeDone)composeFlow={phase:'done'};
      else if(state.composeSeriesIndex>=g.buildSeries.length)composeFlow={phase:'principle'};
      else if(state.composeSeriesIndex>0)composeFlow={phase:'build',index:state.composeSeriesIndex,placed:false,wrong:false,wrongTarget:null,placing:false};
      else composeFlow={phase:'bridge1'};
    }
    const ambient='<img class="sanghyeong-ambient" src="assets/characters/scholars_hapseong.png" alt="" aria-hidden="true">';
    const dialoguePhases=['bridge1','bridge2','bridgeReaction','bridge3','completion'];
    let body='',title='합성 원리 탐구';
    if(composeFlow.phase==='bridge1'){
      composeFlow.expression=composeBridgeLines[0].expression;
      body=dialogueMarkup('집현전 학자','집현전의 선배 학자','compose-next');
    }else if(composeFlow.phase==='bridge2'){
      composeFlow.expression=composeBridgeLines[1].expression;
      const choices=`<div class="question-choices" aria-label="학자의 질문">${composeBridgeChoices.map((c,i)=>`<button class="question" data-compose-choice="${i}"><span>${esc(c.text)}</span></button>`).join('')}</div>`;
      body=choices+dialogueMarkup('집현전 학자','집현전의 선배 학자','compose-next');
    }else if(composeFlow.phase==='bridgeReaction'){
      composeFlow.expression=composeBridgeChoices[composeFlow.choice].expression;
      body=dialogueMarkup('집현전 학자','집현전의 선배 학자','compose-next');
    }else if(composeFlow.phase==='bridge3'){
      composeFlow.expression=composeBridgeLine3.expression;
      body=dialogueMarkup('집현전 학자','집현전의 선배 학자','compose-next');
    }else if(composeFlow.phase==='ready'){
      body=`<div class="scholar-ready"><button class="primary" data-action="compose-start">${esc(g.startButton)} →</button></div>`;
    }else if(composeFlow.phase==='basicCheck'){
      title='합성 원리 탐구 · 모음 기본자 확인';
      body=renderComposeBasicCheck();
    }else if(composeFlow.phase==='build'){
      title=`합성 원리 탐구 ${composeFlow.index+1} / ${g.buildSeries.length}`;
      body=renderComposeStage();
    }else if(composeFlow.phase==='principle'){
      title='합성 원리 탐구 정리';
      body=renderComposePrinciple();
    }else if(composeFlow.phase==='completion'){
      composeFlow.expression=g.completion[composeFlow.line].expression;
      body=dialogueMarkup('집현전 학자','집현전의 선배 학자','compose-next');
    }else{
      body=`<div class="study-card"><h2>합성 원리 탐구를 완료했습니다.</h2><p>상형, 가획, 합성 세 가지 원리를 모두 살펴보았습니다. 「나의 해례 기록」에 탐구한 내용을 정리해 보세요.</p><div class="action-row"><button class="secondary" data-action="to-workshop">집현전 글자 공방으로 →</button><button class="primary" data-action="to-hapye">나의 해례 기록 작성하기 →</button></div></div>`;
    }
    const showPortrait=dialoguePhases.includes(composeFlow.phase);
    const portrait=showPortrait?`<img class="character scholar" src="assets/characters/jiphyeonjeon_${composeFlow.expression||'basic'}.png" alt="집현전 학자" data-expression="${composeFlow.expression||'basic'}">`:'';
    game.innerHTML=`<section class="scene sanghyeong-scene" data-phase="${composeFlow.phase}"><div class="scene-bg hapseong-bg"></div><span class="scene-location">집현전 · 합성 탐구실</span>${ambient}${portrait}<h1 class="sanghyeong-title">${esc(title)}</h1>${renderExploreNav('compose')}${body}</section>`;
    if(composeFlow.phase==='bridge1')type(composeBridgeLines[0].text());
    if(composeFlow.phase==='bridge2')type(composeBridgeLines[1].text());
    if(composeFlow.phase==='bridgeReaction')type(composeBridgeChoices[composeFlow.choice].reaction);
    if(composeFlow.phase==='bridge3')type(composeBridgeLine3.text);
    if(composeFlow.phase==='completion')type(g.completion[composeFlow.line].text);
    updateAdvanceHint();
  }
  function advanceCompose(){
    if(!typingDone){finishTyping();return;}
    if(composeFlow.phase==='bridge1'){composeFlow.phase='bridge2';compose();}
    else if(composeFlow.phase==='bridgeReaction'){composeFlow.phase='bridge3';compose();}
    else if(composeFlow.phase==='bridge3'){composeFlow.phase='ready';compose();}
    else if(composeFlow.phase==='completion'){
      if(composeFlow.line+1<D.chapter2.compose.completion.length){composeFlow.line++;compose();}
      else{state.composeDone=true;persist();composeFlow={phase:'done'};compose();updateHeader();}
    }
  }
  function selectComposeBridgeChoice(i){
    if(!composeFlow||composeFlow.phase!=='bridge2')return;
    composeFlow.choice=i;composeFlow.phase='bridgeReaction';compose();
  }
  function startComposeActivities(){
    if(!composeFlow||composeFlow.phase!=='ready')return;
    state.composeStarted=true;persist();
    composeFlow={phase:'basicCheck',selected:null,wrong:false,correct:false};compose();updateHeader();
  }
  function renderComposeBasicCheck(){
    const q=D.chapter2.compose.basicQuiz;
    const choices=`<div class="quiz-choices">${q.choices.map(c=>`<button class="quiz-choice ${composeFlow.selected===c?'selected':''}" data-compose-basic-check="${esc(c)}">${esc(c)}</button>`).join('')}</div>`;
    const feedback=composeFlow.correct
      ?`<p class="quiz-feedback correct">${esc(q.correctFeedback).split('\n').join('<br>')}</p><div class="action-row"><button class="primary" data-action="compose-basiccheck-next">다음 →</button></div>`
      :(composeFlow.wrong?`<p class="quiz-feedback incorrect">${esc(q.incorrectFeedback)}</p>`:'');
    return `<div class="study-card quiz-card"><h2>${esc(q.prompt)}</h2>${choices}${feedback}</div>`;
  }
  function selectComposeBasicCheck(choice){
    if(!composeFlow||composeFlow.phase!=='basicCheck'||composeFlow.correct)return;
    const q=D.chapter2.compose.basicQuiz;
    composeFlow.selected=choice;
    if(choice===q.answer){composeFlow.correct=true;composeFlow.wrong=false;}
    else composeFlow.wrong=true;
    compose();
  }
  function proceedToComposeBuild(){
    if(!composeFlow||composeFlow.phase!=='basicCheck'||!composeFlow.correct)return;
    composeFlow={phase:'build',index:0,placed:false,wrong:false,wrongTarget:null,placing:false};compose();
  }
  function toggleComposePlacing(){
    if(!composeFlow||composeFlow.phase!=='build'||composeFlow.placed)return;
    composeFlow.placing=!composeFlow.placing;compose();
  }
  function attemptComposeTarget(targetId){
    if(!composeFlow||composeFlow.phase!=='build'||composeFlow.placed)return;
    const item=D.chapter2.compose.buildSeries[composeFlow.index];
    const target=item.targets.find(t=>t.id===targetId);
    if(!target)return;
    composeFlow.placing=false;
    if(target.correct){
      composeFlow.placed=true;composeFlow.wrong=false;composeFlow.wrongTarget=null;compose();
    }else{
      composeFlow.wrong=true;composeFlow.wrongTarget=targetId;compose();
      const snapshot=composeFlow;
      setTimeout(()=>{if(composeFlow!==snapshot)return;composeFlow.wrong=false;composeFlow.wrongTarget=null;compose();},900);
    }
  }
  function retryComposeStep(){
    if(!composeFlow||composeFlow.phase!=='build'||!composeFlow.placed)return;
    composeFlow.placed=false;composeFlow.wrong=false;composeFlow.wrongTarget=null;composeFlow.placing=false;compose();
  }
  function advanceComposeBuild(){
    if(!composeFlow||composeFlow.phase!=='build'||!composeFlow.placed)return;
    const g=D.chapter2.compose;
    state.composeSeriesIndex=Math.min(composeFlow.index+1,g.buildSeries.length);persist();
    composeFlow=state.composeSeriesIndex>=g.buildSeries.length
      ?{phase:'principle'}
      :{phase:'build',index:state.composeSeriesIndex,placed:false,wrong:false,wrongTarget:null,placing:false};
    compose();updateHeader();
  }
  function finishComposePrinciple(){
    if(!composeFlow||composeFlow.phase!=='principle')return;
    composeFlow={phase:'completion',line:0};compose();updateHeader();
  }
  function resume2(){
    if(!state.royal2IntroDone){setScreen(['royal2','scholar'].includes(state.checkpoint2)?state.checkpoint2:'royal2');return;}
    setScreen('workshop');
  }
  function finishRoyal2Intro(){
    if(!scholarFlow||scholarFlow.phase!=='ready')return;
    state.royal2IntroDone=true;persist();
    enterWorkshop();
  }
  let exploreNavOpen=false;
  function sanghyeongPrincipleStatus(){
    if(state.shapePrincipleDone)return'완료';
    if(state.shapeActivityIndex>0||state.vowelActivityIndex>0||state.vowelMatchDone)return'학습 중';
    return'시작 전';
  }
  function gahoekPrincipleStatus(){
    if(state.gahoekDone)return'완료';
    if(state.gahoekSeriesIndex>0||state.gahoekStarted)return'학습 중';
    return'시작 전';
  }
  function composePrincipleStatus(){
    if(state.composeDone)return'완료';
    if(state.composeSeriesIndex>0||state.composeStarted)return'학습 중';
    return'시작 전';
  }
  function statusClass(label){return label==='완료'?'done':label==='학습 중'?'progress':'todo';}
  function enterWorkshop(){exploreNavOpen=false;setScreen('workshop');}
  function workshop(){
    const shapeStatus=sanghyeongPrincipleStatus(),gahoekStat=gahoekPrincipleStatus(),composeStat=composePrincipleStatus();
    game.innerHTML=`<section class="scene workshop-scene"><div class="scene-bg gahoek-bg"></div><span class="scene-location">집현전 · 글자 공방</span><div class="workshop-panel"><h1>집현전 글자 공방</h1><p class="instruction">훈민정음의 글자 만들기 원리를 차례대로 탐구해 보세요.</p><div class="workshop-grid"><button class="workshop-card" data-action="enter-shape"><strong>① 상형 원리</strong><small>글자의 모양은 무엇을 본떴을까?</small><span class="workshop-status status-${statusClass(shapeStatus)}">${shapeStatus}</span></button><button class="workshop-card" data-action="enter-gahoek"><strong>② 가획 원리</strong><small>획을 더하면 글자가 어떻게 달라질까?</small><span class="workshop-status status-${statusClass(gahoekStat)}">${gahoekStat}</span></button><button class="workshop-card" data-action="enter-compose"><strong>③ 합성 원리</strong><small>모음 기본자를 결합하면 어떤 글자가 될까?</small><span class="workshop-status status-${statusClass(composeStat)}">${composeStat}</span></button></div><button class="text-button" data-action="review-royal2">▷ 세종의 어명 다시 보기</button></div></section>`;
    updateAdvanceHint();
  }
  function renderExploreNav(current){
    const items=[
      {key:'shape',label:'상형 원리',action:'enter-shape'},
      {key:'gahoek',label:'가획 원리',action:'enter-gahoek'},
      {key:'compose',label:'합성 원리',action:'enter-compose'},
      {key:'workshop',label:'탐구 선택 화면으로',action:'to-workshop'}
    ];
    const list=exploreNavOpen?`<ul class="explore-list">${items.map(it=>`<li class="explore-item ${it.key===current?'current':''}"><button data-action="${it.action}">${esc(it.label)}</button></li>`).join('')}</ul>`:'';
    return `<div class="explore-nav ${exploreNavOpen?'open':''}"><button class="explore-toggle" data-action="toggle-explore-nav" aria-expanded="${exploreNavOpen}">${exploreNavOpen?'✕ 닫기':'☰ 탐구 메뉴'}</button>${list}</div>`;
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
    game.innerHTML=`<section class="map-screen"><div class="map-art"><img src="${esc(D.backgrounds.map)}" alt="장터, 민가, 서당과 농가가 펼쳐진 조선 마을 지도">${D.people.map((p,i)=>{const n=state.cards.filter(c=>Math.floor(c/2)===i).length,done=n===2;return `<button class="map-spot ${done?'complete':''}" style="left:${p.pos[0]}%;top:${p.pos[1]}%" data-person="${i}" aria-label="${p.place}, ${p.name}, 증언 ${n}/2${done?', 조사 완료':''}">${done?'<span class="map-spot-done">조사 완료</span>':''}<strong>${p.place}</strong><small>${p.name} | 증언 ${n}/2</small></button>`;}).join('')}</div><div class="map-hud"><div class="map-progress"><span class="map-stat"><strong>${complete}</strong><small>장소 조사 완료</small></span><span class="map-stat"><strong>${state.cards.length}</strong><small>증언 수집</small></span></div>${state.cards.length===8?'<button class="primary" data-action="to-classify">증언 분류하기 →</button>':'<span class="map-hint">장소를 선택해 백성의 이야기를 들어 보세요.</span>'}</div></section>`;
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
    const prevSpeaker=scene.dataset.speaker,nextSpeaker=investigator?'investigator':'npc';
    const choices=phase==='choices'?`<div class="question-choices" aria-label="조사관의 질문">${script.questions.map((q,i)=>{
      const asked=state.asked[p.asset]?.includes(q.id),recorded=q.card!==null&&state.cards.includes(q.card);
      return `<button class="question" data-question="${i}"><span>${esc(q.label)}</span><small>${asked?'다시 묻기 ✓':recorded?'증언 있음':'질문하기'}</small></button>`;
    }).join('')}<button class="question leave-choice" data-action="npc-leave">${all?'조사를 마치고':'잠시'} 마을 지도로 돌아간다 →</button></div>`:'';
    const extra=phase==='farewell'?'<button class="text-button" data-action="npc-more">추가 질문</button>':'';
    scene.dataset.speaker=nextSpeaker;
    $('.npc-interface',scene).innerHTML=choices+dialogueMarkup(speaker,role,'npc-next',extra);
    if(prevSpeaker&&prevSpeaker!==nextSpeaker){
      // Start the freshly rendered dialogue from the previous speaker's colors so the swap can transition, not snap.
      const dialogueEl=$('.dialogue',scene),fromClass='speaker-from-'+prevSpeaker;
      dialogueEl.classList.add(fromClass);
      requestAnimationFrame(()=>requestAnimationFrame(()=>dialogueEl.classList.remove(fromClass)));
    }
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
    const glossary=['자주','애민','실용'].map(term=>D.spirits.find(s=>s.answer===term)).filter(Boolean);
    game.innerHTML=heading('CHAPTER 01 · 창제 정신','새 글자에 담긴 세종의 마음','백성들의 증언을 떠올리며, 서문의 말과 창제 정신을 연결해 보세요.',3)+`<section class="paper-panel fade-in"><div class="source-box"><span class="eyebrow">훈민정음 어제 서문 · 세종실록 수록문</span><small class="source-note">훈민정음 어제 서문을 학습용으로 쉽게 풀어 읽은 내용입니다.</small>${D.translation.split(/(?<=\.)\s+/).map(line=>`<p class="translation-line">${line}</p>`).join('')}<small>현대어 풀이는 국사편찬위원회 번역을 바탕으로 학습용으로 다듬었습니다.<br>‘어리석은 백성’은 이 문맥에서 글을 알지 못하는 백성을 가리킵니다.<br><a href="${D.source}" target="_blank" rel="noopener">출처: 국사편찬위원회 · 『세종실록』 권113, 세종 28년 9월 29일 ↗</a></small></div><div class="spirit-columns"><details class="spirit-glossary" open><summary>창제 정신의 뜻 살펴보기</summary><ul class="glossary-list">${glossary.map(s=>`<li class="glossary-item" data-term="${s.answer}"><span class="glossary-term">${s.answer}</span><p>${s.meaning}</p></li>`).join('')}</ul></details><div class="spirit-connect"><h2 class="connect-title">서문의 구절과 창제 정신 연결하기</h2><p class="instruction">각 구절이 어떤 창제 정신과 관련 있는지 선택해 보세요.</p><div class="spirit-grid">${D.spirits.map((s,i)=>`<article class="spirit-card"><span class="eyebrow">서문의 단서 0${i+1}</span><blockquote>“${s.phrase}”</blockquote><label for="spirit-${i}" class="instruction">어떤 정신과 연결될까요?</label><select id="spirit-${i}" data-infer="${i}"><option value="">먼저 추론해 보세요</option>${['자주','애민','실용'].map(a=>`<option ${state.inference[i]===a?'selected':''}>${a}</option>`).join('')}</select>${state.explored?`<div class="spirit-feedback"><p class="feedback-status">${state.inference[i]===s.answer?'잘 연결했어요.':'다시 살펴보세요.'}</p><strong class="feedback-answer">${s.answer} 정신</strong><p class="feedback-meaning">${s.meaning}</p></div>`:''}</article>`).join('')}</div></div></div><details class="report-hints" style="margin-top:22px"><summary>내가 분류한 증언 참고하기</summary>${D.categories.map((cat,i)=>`<p><strong>${cat}</strong><br>${state.classes[i].map(c=>`${c+1}. ${D.cards[c]}`).join('<br>')||'분류한 증언 없음'}</p>`).join('')}</details><div class="action-row"><button class="secondary" data-action="to-classify">분류 돌아보기</button>${state.explored?'<button class="primary" data-action="to-report">조사 보고서 작성하기 →</button>':`<button class="primary" data-action="check-spirits" ${state.inference.some(x=>!x)?'disabled':''}>나의 추론 확인하기 →</button>`}</div></section>`;
  }
  const reportQuestions=['조사를 통해 알게 된 백성들의 어려움은 무엇인가요?','백성들에게 우리말에 알맞은 새로운 문자가 필요한 까닭은 무엇인가요?'];
  function reportMarkup(edit=true) {
    return `<article class="report"><header class="report-header"><span class="eyebrow">백성의 목소리를 담아 전하께 올립니다</span><h1>세종에게 올리는 조사 보고서</h1><p>조사관 ${esc(state.name||'이름 미설정')} · 1차시 세종의 어명 · 증언 ${state.cards.length}/8</p></header>${edit?`<details class="report-hints"><summary>증언과 창제 정신 참고하기</summary><p>자주 · ${D.spirits[0].meaning}<br>애민 · ${D.spirits[1].meaning}<br>실용 · ${D.spirits[2].meaning}</p>${D.categories.map((cat,i)=>`<p><strong>${cat}</strong><br>${state.classes[i].map(c=>D.cards[c]).join('<br>')||'분류한 증언 없음'}</p>`).join('')}</details>`:''}${reportQuestions.map((q,i)=>`<label ${edit?`for="report-${i}"`:''}>${i+1}. ${q}</label>${edit?`<textarea id="report-${i}" data-answer="${i}" maxlength="6000" placeholder="들은 이야기를 떠올리며 자신의 생각을 적어 보세요.">${esc(state.report.draft[i])}</textarea>`:`<div class="report-read">${esc(state.report.answers[i])||'아직 작성한 내용이 없습니다.'}</div>`}`).join('')}${state.report.savedAt?`<p class="report-date">저장일 · ${new Date(state.report.savedAt).toLocaleDateString('ko-KR')}</p>`:''}${!edit?'<span class="saved-mark">조사 완료</span>':''}</article>`;
  }
  function report() {
    game.innerHTML=heading('CHAPTER 01 · 조사 보고서','그대가 발견한 새로운 글자의 까닭','자신의 생각을 기록해 전하께 올려 보세요. 저장한 보고서는 「나의 기록」에서 수정할 수 있습니다.',4)+reportMarkup()+`<div class="action-row"><span class="instruction" id="draft-status">${storageOK?'작성 중인 내용도 이 브라우저에 임시 저장됩니다.':'브라우저 저장 공간을 사용할 수 없습니다.'}</span><button class="secondary" data-action="to-spirit">창제 정신 돌아보기</button><button class="primary" data-action="save-report">보고서 저장하기 →</button></div>`;
  }
  function reportView() { game.innerHTML = '<div class="action-row"><button class="secondary" data-action="to-report">보고서 수정하기</button><button class="secondary" data-action="home">타이틀 돌아가기</button></div><div class="capture-report">' + reportMarkup(false) + '</div>'; }
  function hapyeMarkup(edit=true) {
    const h=D.chapter2.hapyeRecord;
    const items=h.items.map((item,i)=>`<section class="hapye-item"><h2>${esc(item.heading)}</h2><p class="hapye-summary">${esc(item.summary)}</p>${edit?`<label for="hapye-${i}">${esc(item.question)}</label><input id="hapye-${i}" type="text" maxlength="80" data-hapye-answer="${i}" placeholder="${esc(item.placeholder||'')}" value="${esc(state.hapyeRecord.draft[i])}">`:`<p class="hapye-question">${esc(item.question)}</p><div class="hapye-answer">${esc(state.hapyeRecord.answers[i])||'아직 작성한 내용이 없습니다.'}</div>`}</section>`).join('');
    return `<article class="hapye-scroll"><header class="hapye-header"><span class="eyebrow">집현전 학자의 탐구 정리</span><h1>${esc(h.title)}</h1><p class="hapye-intro">${esc(h.intro)}</p></header>${items}${state.hapyeRecord.savedAt?`<p class="hapye-date">저장일 · ${new Date(state.hapyeRecord.savedAt).toLocaleDateString('ko-KR')}</p>`:''}${!edit?'<span class="saved-mark">기록 완료</span>':''}<p class="hapye-padlet-note">${esc(h.padletNote)}</p></article>`;
  }
  function hapye() {
    game.innerHTML=heading('CHAPTER 02 · 나의 해례 기록','집현전 학자들과 함께 탐구한 원리를 정리해 봅시다')+hapyeMarkup()+`<div class="action-row"><span class="instruction" id="hapye-draft-status">${storageOK?'작성 중인 내용도 이 브라우저에 임시 저장됩니다.':'브라우저 저장 공간을 사용할 수 없습니다.'}</span><button class="secondary" data-action="to-workshop">집현전 글자 공방으로</button><button class="primary" data-action="save-hapye">${esc(D.chapter2.hapyeRecord.saveButton)} →</button></div>`;
  }
  function hapyeView() { game.innerHTML = '<div class="action-row"><button class="secondary" data-action="to-hapye">해례 기록 수정하기</button><button class="secondary" data-action="home">타이틀 돌아가기</button></div><div class="capture-report">' + hapyeMarkup(false) + '</div>'; }

  // 3차시 「한글 홍보 프로젝트」: 세종 도입(royal3) → 마을 재방문 안내(map3notice) → 마을 지도(map3)
  // → NPC 4명과 변화 대화(npc3, 1차시 npc()와 같은 intro/choices/question/answer 흐름을 재사용하되
  // 표정 전환 없는 단일 '밝은 모습' 이미지만 사용) → 변화 기록 비교+소감(compare3) → 세종 마지막
  // 대화(royal3b, 완료 시 같은 화면에서 완료 안내로 전환)의 순서로 진행합니다.
  function resume3(){
    if(!state.royal3IntroDone){setScreen(['royal3'].includes(state.checkpoint3)?state.checkpoint3:'royal3');return;}
    if(state.chapter3Done){setScreen('royal3b');return;}
    setScreen(['map3notice','map3','compare3','royal3b'].includes(state.checkpoint3)?state.checkpoint3:'map3');
  }
  function royal3(){
    const lines=[
      '그대가 집현전에서 글자의 원리를 살펴보았다 들었노라. 참으로 수고가 많았네.',
      '이제 그대에게 마지막 임무를 맡기고자 하네.',
      '새로운 글자가 반포된 뒤, 백성들의 삶에는 어떠한 변화가 생겼는지 궁금하구나.',
      '전에 만났던 백성들을 다시 찾아가 그들의 이야기를 들어 보고, 달라진 점을 기록해 오도록 하게.'
    ];
    const expressions=['smile','serious','worried','basic'];
    game.innerHTML=`<section class="scene royal-scene"><div class="scene-bg palace-bg"></div><span class="scene-location">3차시 · 궁궐</span><img class="character sejong" src="assets/characters/sejong_${expressions[state.royal3Line]}.png" alt="세종" data-expression="${expressions[state.royal3Line]}">${dialogueMarkup('세종','조선의 임금','royal3-next')}</section>`;
    type(lines[state.royal3Line]);updateAdvanceHint();
  }
  function advanceRoyal3(){
    if(!typingDone){finishTyping();return;}
    if(state.royal3Line<3){state.royal3Line++;persist();royal3();}
    else{state.royal3IntroDone=true;persist();setScreen('map3notice');}
  }
  function map3notice(){
    const n=D.chapter3.villageNotice;
    game.innerHTML=`<section class="scene royal-scene"><div class="scene-bg" style="background-image:linear-gradient(0deg,#10201870,transparent 55%),url('${esc(D.backgrounds.map)}')"></div><span class="scene-location">3차시 · 다시 찾은 마을</span><div class="study-card"><h2>${esc(n.title)}</h2><p>${esc(n.text)}</p><div class="action-row"><button class="primary" data-action="to-map3">마을로 가기 →</button></div></div></section>`;
    updateAdvanceHint();
  }
  function map3(){
    const n=state.changeCards.length;
    game.innerHTML=`<section class="map-screen"><div class="map-art"><img src="${esc(D.backgrounds.map)}" alt="장터, 민가, 서당과 농가가 펼쳐진 조선 마을 지도">${D.people.map((p,i)=>{const done=state.changeCards.includes(i);return `<button class="map-spot ${done?'complete':''}" style="left:${p.pos[0]}%;top:${p.pos[1]}%" data-npc3-person="${i}" aria-label="${p.place}, ${p.name}${done?', 변화 기록 완료':''}">${done?'<span class="map-spot-done">기록 완료</span>':''}<strong>${p.place}</strong><small>${p.name}</small></button>`;}).join('')}</div><div class="map-hud"><div class="map-progress"><span class="map-stat"><strong>${n}</strong><small>변화 기록 · ${n}/4</small></span></div>${n===4?'<button class="primary" data-action="to-compare3">백성들의 변화 기록 보기 →</button>':'<span class="map-hint">장소를 선택해 백성들을 다시 만나 보세요.</span>'}</div></section>`;
  }
  function enterNPC3(index){
    personIndex=index;
    npcFlow3={phase:'greeting',line:0,question:null,expression:'happy'};
    setScreen('npc3',false);
  }
  function currentNPC3Line(script){
    if(npcFlow3.phase==='greeting')return script.greeting[npcFlow3.line];
    if(npcFlow3.phase==='choices')return {speaker:'npc',text:script.idle,expression:script.idleExpression||'basic'};
    if(npcFlow3.phase==='question')return script.questions[npcFlow3.question].lines[0];
    if(npcFlow3.phase==='answer')return script.questions[npcFlow3.question].lines[npcFlow3.line];
    return script.farewell;
  }
  // 3차시 전용 인물 스프라이트 : 1차시 npcSprite()와 같은 bounds-정규화 방식을 쓰되,
  // 1차시의 D.npcVisuals/npcSprite()/setNPCExpression()/mountNPCSprite()는 건드리지 않고
  // 별도 함수로 둡니다. basic/gomin 프레임은 D.npcVisuals(1차시 자료)를 그대로 '읽기만' 하고,
  // happy 프레임만 D.chapter3.npcHappyVisual에서 가져와 세 프레임의 높이 기준을 맞춥니다.
  function npc3Sprites(asset){
    return {basic:D.npcVisuals[asset].basic,gomin:D.npcVisuals[asset].gomin,happy:D.chapter3.npcHappyVisual[asset]};
  }
  function npc3Sprite(p,expression){
    const sprites=npc3Sprites(p.asset);
    const aspect=Math.max(...Object.values(sprites).map(frame=>(frame.bounds[2]-frame.bounds[0])/(frame.bounds[3]-frame.bounds[1])));
    const poses=Object.entries(sprites).map(([pose,frame])=>{
      const [left,top,right,bottom]=frame.bounds,h=bottom-top;
      const css=`width:${100*frame.width/(h*aspect)}%;height:${100*frame.height/h}%;left:${100*(.5-(left+right)/(2*h*aspect))}%;top:${-100*top/h}%;`;
      const label=pose==='happy'?'밝은 표정':pose==='gomin'?'고민하는 표정':'기본 표정';
      return `<img class="npc-pose" data-pose="${pose}" style="${css}" src="${esc(frame.src)}" alt="${p.name} · ${label}" aria-hidden="true" decoding="async" draggable="false">`;
    }).join('');
    return `<div class="character-slot" data-character="${p.asset}" data-expression="${expression}" role="img" aria-label="${p.name}"><div class="npc-sprite-rig" style="--sprite-aspect:${aspect}">${poses}</div></div>`;
  }
  function setNPC3Expression(slot,expression){
    slot.dataset.expression=expression;
    const label=expression==='happy'?'밝은 표정':expression==='gomin'?'고민하는 표정':'기본 표정';
    slot.setAttribute('aria-label',`${D.people[personIndex].name} · ${label}`);
    const ready=[...slot.querySelectorAll('.npc-pose[data-ready="true"]')];
    const active=ready.find(img=>img.dataset.pose===expression)||ready.find(img=>img.dataset.pose==='basic');
    slot.querySelectorAll('.npc-pose').forEach(img=>img.classList.toggle('is-active',img===active));
  }
  function mountNPC3Sprite(slot){
    const images=[...slot.querySelectorAll('.npc-pose')];
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
        setNPC3Expression(slot,slot.dataset.expression);
      });
    });
  }
  function npc3(){
    if(!npcFlow3)npcFlow3={phase:'greeting',line:0,question:null,expression:'happy'};
    const p=D.people[personIndex],script=D.chapter3.npcChange[p.asset];
    const collected=state.changeCards.includes(personIndex);
    const askedList=state.changeAsked[p.asset]||[];
    const line=currentNPC3Line(script);
    if(line.speaker==='npc')npcFlow3.expression=line.expression||'happy';
    const investigator=line.speaker==='investigator';
    const speaker=investigator?`${state.name} 조사관`:p.name;
    const role=investigator?'백성의 삶을 살피는 조사관':p.role;
    const nextSpeaker=investigator?'investigator':'npc';
    let scene=$('.npc3-scene');
    if(!scene||scene.dataset.person!==p.asset){
      game.innerHTML=`<section class="scene npc-scene npc3-scene" data-person="${p.asset}"><div class="scene-bg npc-bg" style="background-image:linear-gradient(0deg,#12201680,transparent 70%),url('${esc(D.backgrounds[p.bg])}')"></div><span class="scene-location">3차시 · ${esc(p.place)} · ${esc(p.name)}</span>${npc3Sprite(p,npcFlow3.expression)}<div class="npc3-interface"></div></section>`;
      scene=$('.npc3-scene');
      mountNPC3Sprite($('.character-slot',scene));
    }
    scene.dataset.phase=npcFlow3.phase;
    scene.dataset.speaker=nextSpeaker;
    setNPC3Expression($('.character-slot',scene),npcFlow3.expression);
    const choices=npcFlow3.phase==='choices'?`<div class="question-choices" aria-label="조사관의 질문">${script.questions.map((q,i)=>`<button class="question" data-npc3-question="${i}"><span>${esc(q.label)}</span><small>${askedList.includes(q.id)?'다시 묻기 ✓':'질문하기'}</small></button>`).join('')}<button class="question leave-choice" data-action="npc3-leave">${collected?'인사를 마치고':'잠시'} 마을 지도로 돌아간다 →</button></div>`:'';
    $('.npc3-interface',scene).innerHTML=choices+dialogueMarkup(speaker,role,'npc3-next');
    if(npcFlow3.phase==='choices'){
      clearTyping();typed=line.text;typingElement=$('#dialogue-text');typingDone=true;
      typingElement.textContent=line.text;$('.continue-button').hidden=true;
      $('.question')?.focus({preventScroll:true});
    }else type(line.text);
    updateAdvanceHint();
  }
  function askNPC3Question(index){
    if(npcFlow3?.phase!=='choices')return;
    const script=D.chapter3.npcChange[D.people[personIndex].asset];
    if(!script.questions[index])return;
    npcFlow3={...npcFlow3,phase:'question',line:0,question:index};
    npc3();
  }
  function advanceNPC3(){
    if(!npcFlow3||npcFlow3.phase==='choices')return;
    if(!typingDone){finishTyping();return;}
    const p=D.people[personIndex],script=D.chapter3.npcChange[p.asset];
    if(npcFlow3.phase==='greeting'){
      if(npcFlow3.line+1<script.greeting.length)npcFlow3.line++;else npcFlow3.phase='choices';
    }else if(npcFlow3.phase==='question'){
      npcFlow3.phase='answer';npcFlow3.line=1;
    }else if(npcFlow3.phase==='answer'){
      const q=script.questions[npcFlow3.question];
      if(npcFlow3.line+1<q.lines.length)npcFlow3.line++;
      else{
        state.changeAsked[p.asset]??=[];
        if(!state.changeAsked[p.asset].includes(q.id))state.changeAsked[p.asset].push(q.id);
        const allAsked=state.changeAsked[p.asset].length>=script.questions.length;
        if(allAsked&&!state.changeCards.includes(personIndex)){state.changeCards.push(personIndex);toast('변화 기록을 얻었습니다 · '+state.changeCards.length+' / 4');}
        persist();
        npcFlow3.phase=allAsked?'farewell':'choices';
      }
    }else if(npcFlow3.phase==='farewell'){setScreen('map3');return;}
    npc3();updateHeader();
  }
  function renderChangeCompare(edit=true){
    const cards=D.people.map(p=>{
      const c=D.chapter3.npcChange[p.asset].card;
      return `<article class="change-card"><h2>${esc(p.name)}</h2><div class="change-row change-before"><span class="change-label">이전</span><p>${esc(c.before)}</p></div><div class="change-row change-after"><span class="change-label">이후</span><p>${esc(c.after)}</p></div><p class="change-meaning">${esc(c.meaning)}</p></article>`;
    }).join('');
    const r=D.chapter3.reflection;
    const reflectionField=edit
      ?`<textarea id="reflection-input" data-reflection-answer maxlength="300" placeholder="자신의 생각을 적어 보세요.">${esc(state.chapter3Reflection.text)}</textarea>`
      :`<div class="report-read">${esc(state.chapter3Reflection.text)||'아직 작성한 내용이 없습니다.'}</div>`;
    return `<div class="change-compare"><p class="instruction">${esc(D.chapter3.compareIntro)}</p><div class="change-grid">${cards}</div><div class="reflection-box"><h2>${esc(r.title)}</h2><label for="reflection-input">${esc(r.question)}</label><p class="hint">${esc(r.guide)}</p>${reflectionField}${state.chapter3Reflection.savedAt?`<p class="report-date">저장일 · ${new Date(state.chapter3Reflection.savedAt).toLocaleDateString('ko-KR')}</p>`:''}</div></div>`;
  }
  function compare3(){
    if(state.changeCards.length<4){setScreen('map3');return;}
    const proceedLabel=(state.royal3bLine>0||state.chapter3Done)?'소감 수정 저장하기':'소감 저장하고 세종께 돌아가기 →';
    game.innerHTML=heading('CHAPTER 03 · 백성들의 변화 기록','훈민정음과 함께 달라진 백성들의 삶을 살펴봅시다','네 사람의 이야기를 비교해 보고, 떠오른 생각을 짧게 적어 보세요.')+renderChangeCompare()+`<div class="action-row"><span class="instruction">${storageOK?'작성 중인 내용도 이 브라우저에 임시 저장됩니다.':'브라우저 저장 공간을 사용할 수 없습니다.'}</span><button class="secondary" data-action="to-map3">마을로 돌아가기</button><button class="primary" data-action="save-reflection">${proceedLabel}</button></div>`;
  }
  function saveReflectionAndProceed(){
    if(!state.chapter3Reflection.text.trim()){toast('소감을 적어 주세요.');return;}
    state.chapter3Reflection.savedAt=new Date().toISOString();persist();
    if(state.royal3bLine>0||state.chapter3Done){toast('소감이 저장되었습니다.');compare3();return;}
    toast('소감이 저장되었습니다.');setScreen('royal3b');
  }
  function royal3b(){
    const g=D.chapter3;
    if(state.chapter3Done){
      game.innerHTML=`<section class="scene royal-scene"><div class="scene-bg palace-bg"></div><span class="scene-location">3차시 · 궁궐</span><div class="study-card"><h2>${esc(g.completion.title)}</h2>${g.completion.body.map(p=>`<p>${esc(p)}</p>`).join('')}<div class="action-row"><button class="secondary" data-action="records">나의 기록 보기</button><button class="primary" data-action="home">메인으로</button></div></div></section>`;
      updateAdvanceHint();return;
    }
    const lines=[
      '그대가 다시 찾아간 백성들은 어떠하였느냐?',
      '새로운 글자가 백성들의 삶에 도움이 되고 있다는 소식을 들으니 참으로 기쁘구나.',
      '하지만 글자는 만들어졌다고 그 뜻이 저절로 이루어지는 것이 아니니라. 백성들이 쉽게 배우고 널리 사용할 수 있어야 하겠지.',
      '그대도 이제 우리 글자의 소중함을 알게 되었을 것이네.',
      '이제 그대가 발견한 훈민정음의 가치를 더 많은 사람에게 알려 보도록 하게.'
    ];
    const expressions=['basic','smile','serious','smile','basic'];
    game.innerHTML=`<section class="scene royal-scene"><div class="scene-bg palace-bg"></div><span class="scene-location">3차시 · 궁궐</span><img class="character sejong" src="assets/characters/sejong_${expressions[state.royal3bLine]}.png" alt="세종" data-expression="${expressions[state.royal3bLine]}">${dialogueMarkup('세종','조선의 임금','royal3b-next')}</section>`;
    type(lines[state.royal3bLine]);updateAdvanceHint();
  }
  function advanceRoyal3b(){
    if(!typingDone){finishTyping();return;}
    if(state.royal3bLine<4){state.royal3bLine++;persist();royal3b();}
    else{state.chapter3Done=true;persist();royal3b();updateHeader();}
  }
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
    state=defaults();storageOK=true;personIndex=0;selectedCard=null;npcFlow=null;scholarFlow=null;sanghyeongFlow=null;moeumFlow=null;gahoekFlow=null;composeFlow=null;npcFlow3=null;typingElement=null;typingDone=true;
    setScreen('home',false);nickname(true,1);
  }
  function requestChapter2Reset(){
    openModal(`<h2 id="modal-title">2차시 학습 기록 초기화</h2><p>2차시 학습 기록만 초기화할까요? 다른 차시의 기록은 유지됩니다.</p><p class="error">이 작업은 되돌릴 수 없습니다.</p><div class="settings-row"><button class="secondary" data-action="reset2-cancel">취소</button><button class="danger-button" data-action="reset2-confirm">초기화하기</button></div>`);
    modal.dataset.mode='reset2-confirmation';$('[data-action="reset2-cancel"]',modal).focus();
  }
  function confirmChapter2Reset(){
    if(modal.dataset.mode!=='reset2-confirmation')return;
    const base=defaults();
    state.checkpoint2=base.checkpoint2;
    state.royal2IntroDone=base.royal2IntroDone;
    state.royal2Line=base.royal2Line;
    state.scholarLine=base.scholarLine;
    state.shapeActivityIndex=base.shapeActivityIndex;
    state.shapeActivitySchema=base.shapeActivitySchema;
    state.vowelActivityIndex=base.vowelActivityIndex;
    state.vowelMatchDone=base.vowelMatchDone;
    state.shapePrincipleDone=base.shapePrincipleDone;
    state.gahoekSeriesIndex=base.gahoekSeriesIndex;
    state.gahoekStarted=base.gahoekStarted;
    state.gahoekSummary={...base.gahoekSummary};
    state.gahoekDone=base.gahoekDone;
    state.composeSeriesIndex=base.composeSeriesIndex;
    state.composeStarted=base.composeStarted;
    state.composeDone=base.composeDone;
    state.hapyeRecord={answers:['','',''],draft:['','',''],savedAt:null};
    persist();
    scholarFlow=null;sanghyeongFlow=null;moeumFlow=null;gahoekFlow=null;composeFlow=null;
    closeModal();toast('2차시 학습 기록을 초기화했습니다.');setScreen('home',false);
  }
  function requestChapter3Reset(){
    openModal(`<h2 id="modal-title">3차시 학습 기록 초기화</h2><p>3차시의 학습 기록을 초기화할까요? 1차시와 2차시의 기록은 유지됩니다.</p><p class="error">이 작업은 되돌릴 수 없습니다.</p><div class="settings-row"><button class="secondary" data-action="reset3-cancel">취소</button><button class="danger-button" data-action="reset3-confirm">초기화하기</button></div>`);
    modal.dataset.mode='reset3-confirmation';$('[data-action="reset3-cancel"]',modal).focus();
  }
  function confirmChapter3Reset(){
    if(modal.dataset.mode!=='reset3-confirmation')return;
    const base=defaults();
    state.checkpoint3=base.checkpoint3;
    state.royal3IntroDone=base.royal3IntroDone;
    state.royal3Line=base.royal3Line;
    state.changeCards=[];
    state.changeAsked={};
    state.chapter3Reflection={text:'',savedAt:null};
    state.royal3bLine=base.royal3bLine;
    state.chapter3Done=base.chapter3Done;
    persist();
    npcFlow3=null;
    closeModal();toast('3차시 학습 기록을 초기화했습니다.');setScreen('home',false);
  }
  function settings(){
    openModal(`<button class="close" data-action="close" aria-label="설정 닫기">×</button><h2 id="modal-title">게임 설정</h2><p>조사관 · ${esc(state.name||'아직 이름을 정하지 않았습니다')}</p><div class="settings-row"><button class="secondary" data-action="nickname">닉네임 수정</button><button class="secondary" data-action="fullscreen">${document.fullscreenElement?'전체 화면 나가기':'전체 화면으로 플레이'}</button></div><label for="type-speed">대사 표시 속도</label><select id="type-speed" data-setting="typeSpeed">${[[42,'천천히'],[28,'보통'],[18,'빠르게'],[0,'즉시 표시']].map(([v,label])=>`<option value="${v}" ${state.preferences.typeSpeed===v?'selected':''}>${label}</option>`).join('')}</select><label class="checkbox-label"><input type="checkbox" data-setting="reduceMotion" ${state.preferences.reduceMotion?'checked':''}> 움직임 줄이기</label><div class="settings-row"><button class="secondary" data-action="review-royal">세종 대화 다시 듣기</button><button class="secondary" data-action="replay">오프닝 다시 보기</button></div><details><summary>인물 이미지 준비 상태</summary><p>NPC 네 명의 투명 PNG 8장을 기본·고민 표정으로 연결했습니다. 대사에 따라 전환하며, 두 표정의 투명 여백을 보정해 같은 높이와 중심에 표시합니다.</p></details><p>기록은 이 브라우저에 저장됩니다. 효과음은 사용하지 않습니다.</p><div class="reset-section"><button class="danger-button" data-action="reset2-request">2차시 초기화</button><button class="danger-button" data-action="reset3-request">3차시 초기화</button><button class="danger-button" data-action="reset-request">모든 진행 기록 초기화</button></div>`);
  }
  function nickname(start=false, chapter=1) {
    openModal(`<button class="close" data-action="close" aria-label="닫기">×</button><div class="eyebrow">새로운 조사관을 맞이하며</div><h2 id="modal-title">그대의 이름은 무엇인가요?</h2><p>실명 대신 게임에서 사용할 닉네임을 적어 주세요.<br>이름과 기록은 현재 브라우저에만 저장됩니다.</p><form id="nickname-form" data-start="${start}" data-chapter="${chapter}"><label for="nickname">조사관 닉네임</label><input id="nickname" name="nickname" maxlength="12" autocomplete="off" placeholder="예: 윤하" value="${esc(state.name)}" required><p class="error" id="name-error"></p><button class="primary" type="submit">${start?'어명을 받으러 가기':'이름 저장하기'} →</button></form>`);
    $('#nickname').focus();
  }
  function records(tab='cards') {
    const body=tab==='cards'
      ?`<div class="evidence-list">${state.cards.length?state.cards.slice().sort((a,b)=>a-b).map(c=>evidence(c,false)).join(''):'<p class="empty-state">아직 기록한 증언이 없습니다.<br>마을에서 백성들의 이야기를 들어 보세요.</p>'}</div>`
      :tab==='report'
      ?(state.report.savedAt?`${reportMarkup(false)}<div class="action-row"><button class="secondary" data-action="view-report">보고서 전체 보기</button><button class="primary" data-action="edit-report">보고서 수정하기 →</button></div>`:'<p class="empty-state">저장된 보고서가 없습니다.<br>조사를 마친 뒤 보고서를 작성하고 저장해 주세요.</p>')
      :tab==='hapye'
      ?(state.hapyeRecord.savedAt?`${hapyeMarkup(false)}<div class="action-row"><button class="secondary" data-action="view-hapye">해례 기록 전체 보기</button><button class="primary" data-action="edit-hapye">해례 기록 수정하기 →</button></div>`:'<p class="empty-state">저장된 해례 기록이 없습니다.<br>2차시의 가획 또는 합성 원리 탐구를 마친 뒤 작성해 주세요.</p>')
      :(state.changeCards.length>=4?`${renderChangeCompare(false)}<div class="action-row"><button class="primary" data-action="edit-compare3">변화 기록 수정하기 →</button></div>`:'<p class="empty-state">아직 수집한 변화 기록이 4개가 되지 않았습니다.<br>3차시 마을에서 백성들을 모두 다시 만나 보세요.</p>');
    openModal(`<button class="close" data-action="close" aria-label="나의 기록 닫기">×</button><span class="eyebrow">${esc(state.name||'나의')} 조사 기록</span><h2 id="modal-title">나의 기록</h2><div class="record-tabs"><button data-tab="cards" aria-pressed="${tab==='cards'}">증언 기록 수첩 · ${state.cards.length}/8</button><button data-tab="report" aria-pressed="${tab==='report'}">조사 보고서</button><button data-tab="hapye" aria-pressed="${tab==='hapye'}">나의 해례 기록</button><button data-tab="change3" aria-pressed="${tab==='change3'}">백성들의 변화 기록</button></div>${body}`, 'records');
  }
  function resume(){const next=state.checkpoint;if(['classify','spirit','report'].includes(next)&&state.cards.length<8)setScreen('map');else setScreen(next);}
  document.addEventListener('click',event=>{
    const button=event.target.closest('button');
    if(!button){
      if(modal.open)return;
      if(openingFlow){advanceOpening();return;}
      if(screen==='royal'&&event.target.closest('.royal-scene'))advanceRoyal();
      else if(screen==='royal2'&&event.target.closest('.royal-scene'))advanceRoyal2();
      else if(screen==='npc'&&event.target.closest('.npc-scene'))advanceNPC();
      else if(screen==='scholar'&&scholarFlow?.phase==='talking'&&event.target.closest('.scholar-scene'))advanceScholar();
      else if(screen==='sanghyeong'&&['guide','reveal'].includes(sanghyeongFlow?.phase)&&event.target.closest('.sanghyeong-scene'))advanceSanghyeong();
      else if(screen==='moeum'&&['bridge1','bridgeReaction','bridge3','guessReaction','matchSuccess'].includes(moeumFlow?.phase)&&event.target.closest('.sanghyeong-scene'))advanceMoeum();
      else if(screen==='gahoek'&&['bridge1','bridgeReaction','bridge3','completion'].includes(gahoekFlow?.phase)&&event.target.closest('.sanghyeong-scene'))advanceGahoek();
      else if(screen==='compose'&&['bridge1','bridgeReaction','bridge3','completion'].includes(composeFlow?.phase)&&event.target.closest('.sanghyeong-scene'))advanceCompose();
      else if(screen==='royal3'&&event.target.closest('.royal-scene'))advanceRoyal3();
      else if(screen==='royal3b'&&!state.chapter3Done&&event.target.closest('.royal-scene'))advanceRoyal3b();
      else if(screen==='npc3'&&npcFlow3?.phase!=='choices'&&event.target.closest('.npc3-scene'))advanceNPC3();
      return;
    }
    if(button.disabled)return;
    if(button.dataset.person!==undefined){enterNPC(Number(button.dataset.person));return;}
    if(button.dataset.npc3Person!==undefined){enterNPC3(Number(button.dataset.npc3Person));return;}
    if(button.dataset.npc3Question!==undefined){askNPC3Question(Number(button.dataset.npc3Question));return;}
    if(button.dataset.question!==undefined){askQuestion(Number(button.dataset.question));return;}
    if(button.dataset.card!==undefined){selectedCard=Number(button.dataset.card);classify();$(`[data-card="${selectedCard}"]`)?.focus({preventScroll:true});return;}
    if(button.dataset.add!==undefined){addClass(Number(button.dataset.add),selectedCard);return;}
    if(button.dataset.remove){const [cat,c]=button.dataset.remove.split(':').map(Number);state.classes[cat]=state.classes[cat].filter(x=>x!==c);persist();classify();return;}
    if(button.dataset.tab){records(button.dataset.tab);$(`[data-tab="${button.dataset.tab}"]`)?.focus();return;}
    if(button.dataset.quizChoice!==undefined){screen==='moeum'?selectMoeumQuizChoice(button.dataset.quizChoice):selectSanghyeongChoice(button.dataset.quizChoice);return;}
    if(button.dataset.moeumChoice!==undefined){selectMoeumBridgeChoice(Number(button.dataset.moeumChoice));return;}
    if(button.dataset.moeumGuess!==undefined){selectMoeumGuess(Number(button.dataset.moeumGuess));return;}
    if(button.dataset.matchImage!==undefined){selectMatchImage(button.dataset.matchImage);return;}
    if(button.dataset.matchLetter!==undefined){selectMatchLetter(button.dataset.matchLetter);return;}
    if(button.dataset.gahoekChoice!==undefined){selectGahoekBridgeChoice(Number(button.dataset.gahoekChoice));return;}
    if(button.dataset.strokePiece!==undefined){toggleStrokePlacing();return;}
    if(button.dataset.strokeTarget!==undefined){attemptStrokeTarget(button.dataset.strokeTarget);return;}
    if(button.dataset.composeChoice!==undefined){selectComposeBridgeChoice(Number(button.dataset.composeChoice));return;}
    if(button.dataset.composePiece!==undefined){toggleComposePlacing();return;}
    if(button.dataset.composeTarget!==undefined){attemptComposeTarget(button.dataset.composeTarget);return;}
    if(button.dataset.composeBasicCheck!==undefined){selectComposeBasicCheck(button.dataset.composeBasicCheck);return;}
    if(button.dataset.orderCard!==undefined){selectOrderCard(button.dataset.orderCard);return;}
    if(button.dataset.orderSlot!==undefined){placeOrderCard(Number(button.dataset.orderSlot));return;}
    if(button.dataset.orderBasic!==undefined){selectOrderBasic(button.dataset.orderBasic);return;}
    if(button.dataset.orderPrinciple!==undefined){selectOrderPrinciple(button.dataset.orderPrinciple);return;}
    const action=button.dataset.action;
    if(action==='home'){if(modal.open)closeModal();setScreen('home',false);}
    if(action==='replay'){if(modal.open)closeModal();opening();}
    if(action==='skip')finishOpening();
    if(action==='guide')openModal(`<button class="close" data-action="close" aria-label="닫기">×</button><h2 id="modal-title">이야기에 들어가며</h2><p>${D.disclaimer}</p><p>1차시는 어명 → 마을 조사 → 증언 분류 → 창제 정신 → 보고서 순서로 진행됩니다. 2·3차시는 준비 중입니다.</p><p>화면 위 「나의 기록」에서 수집한 증언과 저장한 보고서를 확인하세요. 애니메이션은 운영체제의 동작 줄이기 설정을 따릅니다.</p>`);
    if(action==='start'){if(!state.name)nickname(true,1);else resume();}
    if(action==='start2'){if(!state.name)nickname(true,2);else resume2();}
    if(action==='start3'){if(!state.name)nickname(true,3);else resume3();}
    if(action==='nickname')nickname();
    if(action==='settings')settings();
    if(action==='reset-request')requestReset();
    if(action==='reset-cancel')settings();
    if(action==='reset-confirm')confirmReset();
    if(action==='reset2-request')requestChapter2Reset();
    if(action==='reset2-cancel')settings();
    if(action==='reset2-confirm')confirmChapter2Reset();
    if(action==='reset3-request')requestChapter3Reset();
    if(action==='reset3-cancel')settings();
    if(action==='reset3-confirm')confirmChapter3Reset();
    if(action==='fullscreen'){
      const operation=document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.();
      if(operation)operation.then(()=>{if(modal.open)settings();}).catch(()=>toast('전체 화면 전환을 사용할 수 없습니다. 브라우저의 전체 화면 기능을 이용해 주세요.'));
      else toast('이 브라우저는 전체 화면 전환을 지원하지 않습니다.');
    }
    if(action==='review-royal'){closeModal();state.royalLine=0;setScreen('royal');}
    if(action==='close')closeModal();
    if(action==='records')records();
    if(action==='royal-next')advanceRoyal();
    if(action==='royal2-next')advanceRoyal2();
    if(action==='npc-next')advanceNPC();
    if(action==='npc-leave'){npcFlow.phase='farewell';npc();}
    if(action==='npc-more'){npcFlow.phase='choices';npc();}
    if(action==='scholar-next')advanceScholar();
    if(action==='to-sanghyeong')enterSanghyeong();
    if(action==='to-workshop')enterWorkshop();
    if(action==='finish-royal2-intro')finishRoyal2Intro();
    if(action==='enter-shape'){exploreNavOpen=false;enterSanghyeong();}
    if(action==='enter-gahoek'){exploreNavOpen=false;enterGahoek();}
    if(action==='enter-compose'){exploreNavOpen=false;enterCompose();}
    if(action==='toggle-explore-nav'){exploreNavOpen=!exploreNavOpen;render();}
    if(action==='review-royal2'){state.royal2Line=0;state.scholarLine=0;persist();setScreen('royal2');}
    if(action==='sanghyeong-next')advanceSanghyeong();
    if(action==='sanghyeong-observed'){sanghyeongFlow.phase='reveal';sanghyeong();}
    if(action==='sanghyeong-complete')completeSanghyeong();
    if(action==='moeum-next')advanceMoeum();
    if(action==='moeum-start')startMoeumActivities();
    if(action==='moeum-observed')moeumObserved();
    if(action==='moeum-complete')completeMoeumActivity();
    if(action==='moeum-reset-match')resetMoeumMatches();
    if(action==='moeum-match-continue'){moeumFlow={phase:'matchSuccess',line:0};moeum();}
    if(action==='moeum-finish')finishShapePrinciple();
    if(action==='to-gahoek')enterGahoek();
    if(action==='gahoek-next')advanceGahoek();
    if(action==='gahoek-start')startGahoekActivities();
    if(action==='gahoek-stroke-next')advanceGahoekStroke();
    if(action==='gahoek-stroke-retry')retryStrokeStep();
    if(action==='gahoek-order-confirm')confirmOrderActivity();
    if(action==='gahoek-order-next')finishOrderActivity();
    if(action==='gahoek-reveal')revealGahoekPrinciple();
    if(action==='gahoek-finish')finishGahoekSummary();
    if(action==='compose-next')advanceCompose();
    if(action==='compose-start')startComposeActivities();
    if(action==='compose-basiccheck-next')proceedToComposeBuild();
    if(action==='compose-build-next')advanceComposeBuild();
    if(action==='compose-build-retry')retryComposeStep();
    if(action==='compose-finish')finishComposePrinciple();
    if(action==='scholar-return'){state.scholarLine=0;persist();enterScholar();}
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
    if(action==='to-hapye')setScreen('hapye');
    if(action==='save-hapye'){
      if(state.hapyeRecord.draft.some(x=>!x.trim())){toast('세 가지 항목에 모두 내용을 적어 주세요.');return;}
      state.hapyeRecord.answers=[...state.hapyeRecord.draft];state.hapyeRecord.savedAt=new Date().toISOString();
      if(persist()){toast('나의 해례 기록이 저장되었습니다.');records('hapye');}
    }
    if(action==='edit-hapye'){closeModal();setScreen('hapye');}
    if(action==='view-hapye'){closeModal();setScreen('hapye-view',false);}
    if(action==='royal3-next')advanceRoyal3();
    if(action==='to-map3')setScreen('map3');
    if(action==='npc3-next')advanceNPC3();
    if(action==='npc3-leave')setScreen('map3');
    if(action==='to-compare3')setScreen('compare3');
    if(action==='save-reflection')saveReflectionAndProceed();
    if(action==='edit-compare3'){closeModal();setScreen('compare3');}
    if(action==='royal3b-next')advanceRoyal3b();
  });
  document.addEventListener('submit',event=>{
    if(event.target.id!=='nickname-form')return;event.preventDefault();const value=$('#nickname').value.trim();
    if(!value){$('#name-error').textContent='한 글자 이상의 닉네임을 적어 주세요.';return;}
    state.name=value;persist();const start=event.target.dataset.start==='true';const chapter=event.target.dataset.chapter;closeModal();updateHeader();
    if(start){if(chapter==='2')resume2();else if(chapter==='3')resume3();else resume();}
    else {if(['royal','royal2','npc','scholar','moeum','gahoek','report','report-view','royal3','npc3','compare3','royal3b'].includes(screen))render();toast('조사관 이름을 저장했습니다.');}
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
    if(event.target.dataset.gahoekAnswer!==undefined){state.gahoekSummary[event.target.dataset.gahoekAnswer==='0'?'q1':'q2']=event.target.value;persist();}
    if(event.target.dataset.hapyeAnswer!==undefined){state.hapyeRecord.draft[Number(event.target.dataset.hapyeAnswer)]=event.target.value;persist();}
    if(event.target.dataset.reflectionAnswer!==undefined){state.chapter3Reflection.text=event.target.value.slice(0,300);persist();}
  });
  document.addEventListener('dragstart',event=>{const card=event.target.closest('[data-card]');if(card){event.dataTransfer.setData('text/plain',card.dataset.card);event.dataTransfer.effectAllowed='copy';}});
  document.addEventListener('dragover',event=>{const cat=event.target.closest('[data-category]');if(cat){event.preventDefault();event.dataTransfer.dropEffect='copy';cat.classList.add('dragover');}});
  document.addEventListener('dragleave',event=>event.target.closest('[data-category]')?.classList.remove('dragover'));
  document.addEventListener('drop',event=>{const cat=event.target.closest('[data-category]');if(cat){event.preventDefault();const text=event.dataTransfer.getData('text/plain');if(/^\d$/.test(text))addClass(Number(cat.dataset.category),Number(text));}});
  document.addEventListener('dragstart',event=>{const tile=event.target.closest('[data-match-image]');if(tile&&!tile.classList.contains('matched'))event.dataTransfer.setData('text/plain','vowel-image:'+tile.dataset.matchImage);});
  document.addEventListener('dragover',event=>{const target=event.target.closest('[data-match-letter]');if(target&&!target.classList.contains('matched'))event.preventDefault();});
  document.addEventListener('drop',event=>{
    const letterBtn=event.target.closest('[data-match-letter]');
    if(!letterBtn||letterBtn.classList.contains('matched'))return;
    const text=event.dataTransfer.getData('text/plain');
    if(text.startsWith('vowel-image:')){event.preventDefault();selectMatchImage(text.slice(12));selectMatchLetter(letterBtn.dataset.matchLetter);}
  });
  window.addEventListener('resize',()=>{if(screen==='moeum'&&moeumFlow?.phase==='match')drawMoeumMatchLines();});
  document.addEventListener('dragstart',event=>{if(event.target.closest('[data-stroke-piece]')){event.dataTransfer.setData('text/plain','stroke-piece');document.body.classList.add('stroke-dragging');}});
  document.addEventListener('dragend',()=>document.body.classList.remove('stroke-dragging'));
  document.addEventListener('dragover',event=>{const zone=event.target.closest('[data-stroke-target]');if(zone){event.preventDefault();zone.classList.add('hover');}});
  document.addEventListener('dragleave',event=>{event.target.closest('[data-stroke-target]')?.classList.remove('hover');});
  document.addEventListener('drop',event=>{
    const target=event.target.closest('[data-stroke-target]');
    if(!target)return;
    if(event.dataTransfer.getData('text/plain')==='stroke-piece'){event.preventDefault();attemptStrokeTarget(target.dataset.strokeTarget);}
  });
  document.addEventListener('dragstart',event=>{if(event.target.closest('[data-compose-piece]')){event.dataTransfer.setData('text/plain','compose-piece');document.body.classList.add('stroke-dragging');}});
  document.addEventListener('dragover',event=>{const zone=event.target.closest('[data-compose-target]');if(zone){event.preventDefault();zone.classList.add('hover');}});
  document.addEventListener('dragleave',event=>{event.target.closest('[data-compose-target]')?.classList.remove('hover');});
  document.addEventListener('drop',event=>{
    const target=event.target.closest('[data-compose-target]');
    if(!target)return;
    if(event.dataTransfer.getData('text/plain')==='compose-piece'){event.preventDefault();attemptComposeTarget(target.dataset.composeTarget);}
  });
  document.addEventListener('dragstart',event=>{const card=event.target.closest('[data-order-card]');if(card)event.dataTransfer.setData('text/plain','order-card:'+card.dataset.orderCard);});
  document.addEventListener('dragover',event=>{if(event.target.closest('[data-order-slot]'))event.preventDefault();});
  document.addEventListener('drop',event=>{
    const slotBtn=event.target.closest('[data-order-slot]');
    if(!slotBtn)return;
    const text=event.dataTransfer.getData('text/plain');
    if(text.startsWith('order-card:')){event.preventDefault();gahoekFlow.selectedCard=text.slice(11);placeOrderCard(Number(slotBtn.dataset.orderSlot));}
  });
  modal.addEventListener('cancel',event=>{if(modal.dataset.mode==='reset-confirmation'||modal.dataset.mode==='reset2-confirmation'||modal.dataset.mode==='reset3-confirmation'){event.preventDefault();settings();return;}lastFocus?.focus({preventScroll:true});});
  modal.addEventListener('close',updateAdvanceHint);
  document.addEventListener('keydown',event=>{
    if(event.code!=='Space'||event.repeat||modal.open)return;
    if(event.target.closest('button,input,select,textarea,a'))return;
    if(openingFlow){event.preventDefault();advanceOpening();return;}
    if(screen==='royal'){event.preventDefault();advanceRoyal();return;}
    if(screen==='royal2'){event.preventDefault();advanceRoyal2();return;}
    if(screen==='npc'){event.preventDefault();advanceNPC();return;}
    if(screen==='scholar'&&scholarFlow?.phase==='talking'){event.preventDefault();advanceScholar();return;}
    if(screen==='sanghyeong'&&['guide','reveal'].includes(sanghyeongFlow?.phase)){event.preventDefault();advanceSanghyeong();}
    if(screen==='moeum'&&['bridge1','bridgeReaction','bridge3','guessReaction','matchSuccess'].includes(moeumFlow?.phase)){event.preventDefault();advanceMoeum();}
    if(screen==='gahoek'&&['bridge1','bridgeReaction','bridge3','completion'].includes(gahoekFlow?.phase)){event.preventDefault();advanceGahoek();}
    if(screen==='compose'&&['bridge1','bridgeReaction','bridge3','completion'].includes(composeFlow?.phase)){event.preventDefault();advanceCompose();}
    if(screen==='royal3'){event.preventDefault();advanceRoyal3();return;}
    if(screen==='royal3b'&&!state.chapter3Done){event.preventDefault();advanceRoyal3b();return;}
    if(screen==='npc3'&&npcFlow3?.phase!=='choices'){event.preventDefault();advanceNPC3();}
  });
  // 로고는 메인 화면을 다시 그려도 교체하지 않습니다. 중앙 등장부터 HUD 정착까지 같은 노드입니다.
  $('#game-logo .title-large').innerHTML=titleGlyphs();
  updateHeader();opening();
  if(!storageOK)toast('이 브라우저에서는 저장 기능을 사용할 수 없습니다.');
})();


