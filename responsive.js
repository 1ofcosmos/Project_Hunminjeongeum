/* Layout only: no game state, dialogue events, storage or desktop CSS changes. */
(() => {
  'use strict';
  const ua=navigator.userAgent;
  const touches=navigator.maxTouchPoints||0;
  const handheld=/Android|iPhone|iPad|iPod/i.test(ua)||
    (navigator.platform==='MacIntel'&&touches>1);
  const desktop=/Windows NT|X11|CrOS/i.test(ua);
  const coarse=matchMedia('(hover: none) and (pointer: coarse)').matches;
  // Windows touch laptops retain the existing PC layout. iPad desktop-mode UA is covered above.
  if(!handheld&&!(coarse&&touches>0&&!desktop))return;

  const root=document.documentElement;
  root.classList.add('touch-layout');
  const meta=document.querySelector('meta[name="viewport"]');
  if(meta&&!/viewport-fit\s*=/i.test(meta.content))meta.content+=', viewport-fit=cover';
  const WIDTH=1280,HEIGHT=720;

  function initialize(){
    const shell=document.getElementById('game-shell');
    if(!shell)return;
    const safe=document.createElement('div');
    safe.id='safe-area-probe';safe.setAttribute('aria-hidden','true');
    document.body.append(safe);
    let frame=0;

    function fit(){
      frame=0;
      const viewport=window.visualViewport;
      // Let intentional pinch zoom work; refitting during zoom would cancel the user's zoom.
      if(viewport&&viewport.scale>1.01)return;
      const width=viewport?.width||root.clientWidth||window.innerWidth;
      const height=viewport?.height||window.innerHeight||root.clientHeight;
      const offsetLeft=viewport?.offsetLeft||0,offsetTop=viewport?.offsetTop||0;
      const inset=getComputedStyle(safe);
      const top=parseFloat(inset.paddingTop)||0,bottom=parseFloat(inset.paddingBottom)||0;
      const left=parseFloat(inset.paddingLeft)||0,right=parseFloat(inset.paddingRight)||0;
      const availableWidth=Math.max(1,width-left-right);
      const availableHeight=Math.max(1,height-top-bottom);
      const scale=Math.min(availableWidth/WIDTH,availableHeight/HEIGHT);
      const renderedHeight=HEIGHT*scale;
      const css=root.style;
      const set=(name,value)=>css.setProperty(name,value);
      const px=value=>`${value.toFixed(4)}px`;
      const readable=(base,minimum)=>px(Math.max(base,minimum/scale));

      set('--fit-scale',String(scale));
      set('--fit-left',px(offsetLeft+left+(availableWidth-WIDTH*scale)/2));
      set('--fit-top',px(offsetTop+top+(availableHeight-HEIGHT*scale)/2));
      set('--fit-available-width',px(availableWidth));
      set('--fit-available-height',px(availableHeight));
      set('--fit-center-x',px(offsetLeft+left+availableWidth/2));
      set('--fit-center-y',px(offsetTop+top+availableHeight/2));
      set('--touch-body',readable(19.2,12));
      set('--touch-small',readable(12,10));
      set('--touch-ui',readable(14,11));
      set('--touch-speaker',readable(20,12));
      set('--touch-narration',readable(26.88,14));
      set('--touch-note',readable(18,12));
      set('--touch-next-height',readable(28,26));
      set('--touch-hit-height',readable(44,40));
      set('--touch-choice-height',readable(32,26));
      set('--touch-hud',readable(70,44));
      set('--touch-gap',readable(8,3));
      root.classList.toggle('touch-compact',renderedHeight<500);
      root.classList.add('touch-viewport-ready');
    }
    function schedule(){if(!frame)frame=requestAnimationFrame(fit);}
    fit();
    window.addEventListener('resize',schedule,{passive:true});
    window.addEventListener('orientationchange',schedule,{passive:true});
    window.visualViewport?.addEventListener('resize',schedule,{passive:true});
    window.visualViewport?.addEventListener('scroll',schedule,{passive:true});
    window.screen.orientation?.addEventListener('change',schedule);
    document.addEventListener('fullscreenchange',schedule);
    window.addEventListener('pageshow',schedule,{passive:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize,{once:true});
  else initialize();
})();
