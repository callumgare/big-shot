var G=Object.defineProperty,X=Object.defineProperties;var J=Object.getOwnPropertyDescriptors;var k=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,D=Object.prototype.propertyIsEnumerable;var F=(e,n,a)=>n in e?G(e,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[n]=a,_=(e,n)=>{for(var a in n||(n={}))z.call(n,a)&&F(e,a,n[a]);if(k)for(var a of k(n))D.call(n,a)&&F(e,a,n[a]);return e},O=(e,n)=>X(e,J(n));var W=(e,n)=>{var a={};for(var o in e)z.call(e,o)&&n.indexOf(o)<0&&(a[o]=e[o]);if(e!=null&&k)for(var o of k(e))n.indexOf(o)<0&&D.call(e,o)&&(a[o]=e[o]);return a};import{g as I,o as C,r as E,c as x,n as K,H as Q,a as f,b as g,d as u,e as M,t as V,f as T,F as b,h as $,i as j,m as Y,p as ee,j as te,k as B,l as ne,q,s as ie,u as N,v as A,w as oe}from"./vendor.d8d220e6.js";const ae=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const h of l.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&o(h)}).observe(document,{childList:!0,subtree:!0});function a(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerpolicy&&(l.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?l.credentials="include":r.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(r){if(r.ep)return;r.ep=!0;const l=a(r);fetch(r.href,l)}};ae();const R=2,se=3;function re(e,n,a){var y;const o=I().proxy;C(()=>{w()});const r=E(((y=e.slideData)==null?void 0:y.length)>0?0:null);n.on("slideMediaFailedToLoad",s=>{s.slide.mediaLoadingFailed=!0});const l=x(()=>{var s;return((s=e.slideData)==null?void 0:s.length)||0}),h=new WeakMap;function w(){for(const s of o.loadedSlides){if(!s.elm){if(s.elm=o.$refs[`slide-${s.id}`],!s.elm)throw new Error("Something went wrong. Can't access slide element.");if(s.mediaElm=s.elm?s.elm.querySelector(".media"):null,!s.mediaElm)throw new Error("Something went wrong. Can't access media element.");t(s),s.mediaElm.addEventListener("click",()=>{o.toggleScaleMode(o.currentSlide)}),s.mediaElm.addEventListener("play",()=>{s.elm.querySelector(".play-button").classList.remove("show")}),s.mediaElm.addEventListener("pause",()=>{s.elm.querySelector(".play-button").classList.add("show")}),s.mediaElm.addEventListener("transitionend",()=>{s.elmClasses&&(s.elmClasses=s.elmClasses.filter(c=>c!=="animate-zoom"),o.$forceUpdate())})}if(s.index===o.currentSlideIndex){n.emit("newSlideLoaded",s);const c=o.$el.querySelector(".loading-indicator");c.classList.remove("animate"),setTimeout(()=>{r.value===s.index&&!s.mediaMetadataLoaded&&!s.mediaLoadingFailed&&(n.on("slideMediaMetadataLoaded",m),n.on("slideMediaFailedToLoad",m),c.classList.add("animate"));function m(S){r.value===s.index&&S.id===s.id&&(c.classList.remove("animate"),n.off("slideMediaMetadataLoaded",m),n.off("slideMediaFailedToLoad",m))}},300)}}}function t(s){const c=m=>{!s.elm||!document.body.contains(s.elm)||(m?(m.slide=s,n.emit("slideMediaFailedToLoad",m)):setTimeout(()=>n.emit("slideMediaLoaded",s),3e3))};s.mediaElm.naturalHeight||s.mediaElm.readyState>=1?c():(s.mediaElm.addEventListener("load",()=>c()),s.mediaElm.addEventListener("loadedmetadata",()=>c()),s.mediaElm.addEventListener("error",m=>c(m)))}const d=x(()=>{var S;const s=(S=o.slides)==null?void 0:S[r.value],c=[];for(const[v,L]of e.slideData.entries()){h.has(L)||h.set(L,{data:L,type:(L==null?void 0:L.type)||"image",mediaHeight:void 0,mediaWidth:void 0,biggerThanContainer:void 0,scale:void 0,id:v+Math.random()});const H=h.get(L);H.index=v,c.push(H)}const m=c.indexOf(s);return m>=0&&m!==r.value&&(r.value=m,console.log(m,"currentSlideNewIndex")),c}),i=x(function(){if(a.value=!a.value&&!1,o.currentSlideIndex===null)if(d.value.length>0)o.currentSlideIndex=0;else return[];else d.value.length>0?o.currentSlideIndex<0?o.currentSlideIndex=0:o.currentSlideIndex>=d.value.length&&(o.currentSlideIndex=d.value.length-1):o.currentSlideIndex=null;const s=o.currentSlideIndex,c=Math.min(l.value,R+1+se),m=[];for(let S=0;S<c;S+=1){const v=o.wrapIndex(S+s-R);m.push(d.value[v])}return K(()=>w()),m}),p=x(()=>d.value.filter(s=>!i.value.some(c=>c===s)));return{currentSlideIndex:r,slides:d,loadedSlides:i,notLoadedSlides:p,numOfSlides:l}}function de(e,n,a,o){C(()=>{const p=I().proxy.$el.querySelector(".loop-indicator");p.addEventListener("transitionend",y=>{y.propertyName==="opacity"&&p.classList.remove("animate")})});function r(){return this.changeCurrentSlideBy(1)}function l(){return this.changeCurrentSlideBy(-1)}async function h(i){var S;let p=a.value+i;const y=this.loadedSlides;let s=!1;const c=this.$el.querySelector(".loading-indicator"),m=setTimeout(()=>{c.classList.add("animate"),s=!0},300);if(await((S=e.beforeSlideChangeHook)==null?void 0:S.call(e,{currentIndex:a.value,newIndex:this.wrapIndex(p),delta:i,length:this.numOfSlides})),clearTimeout(m),s&&c.classList.remove("animate"),p=a.value+i,p<0||p>this.numOfSlides-1){const v=this.$el.querySelector(".loop-indicator");v.classList.contains("animate")?(v.classList.remove("animate"),setTimeout(()=>v.classList.add("animate"),50)):v.classList.add("animate")}return y===this.loadedSlides?this.changeCurrentSlideTo(this.wrapIndex(p),i):new Promise(v=>this.$nextTick(()=>v(this.changeCurrentSlideTo(this.wrapIndex(p),i))))}function w(i,p){this.$emit("slideChanged",{newIndex:i,oldIndex:a.value,delta:p||i-a.value}),o.emit("unloadSlide",this.currentSlide),a.value=i}function t(){window.location.hash="",this.$emit("exited")}const d=x(()=>n.value[a.value]);return{nextSlide:r,previousSlide:l,changeCurrentSlideBy:h,changeCurrentSlideTo:w,closeSlideShow:t,currentSlide:d}}function le(e,n){function a(t){try{l(t)}catch{return}const d=r(t);t.elmStyle=O(_({},t.elmStyle),{transform:d.join(" ")}),n.value=!0}function o(){for(const t of this.loadedSlides)t!==this.currentSlide&&(t.scale=this.getInitialScale(t)),t.mediaMetadataLoaded&&a(t)}function r(t){const{container:d,media:i}=l(t),p=d.height/2-i.height/2,y=d.width/2-i.width/2,s=d.width/i.width,c=d.height/i.height,m=Math.min(s,c),S=[];return S.push(`translate(${y}px, ${p}px)`),t.scale==="contain"&&S.push(`scale(${m})`),S}function l(t){const d={container:{height:t.elm.parentElement.clientHeight,width:t.elm.parentElement.clientWidth},media:{height:t.data.height||t.mediaHeight,width:t.data.width||t.mediaWidth}};if(!d.container.height)throw new Error("Could not get container height");if(!d.container.width)throw new Error("Could not get container width");if(!d.media.height)throw new Error("Could not get media height");if(!d.media.width)throw new Error("Could not get media width");return d}function h(t){const{container:d,media:i}=l(t);return!(i.height<d.height&&i.width<d.width)}e.on("slideMediaMetadataLoaded",t=>a(t)),e.on("slideMediaLoaded",w);function w(t){t.mediaHeight=t.mediaElm.naturalHeight||t.mediaElm.videoHeight,t.mediaWidth=t.mediaElm.naturalWidth||t.mediaElm.videoWidth,t.biggerThanContainer=h(t),e.emit("slideMediaPositioningMetadataLoaded",t)}return{positionLoadedSlide:a,positionAllLoadedSlides:o,getSlideDimensions:l,naturalSlideSizeBiggerThanContainer:h}}function ce(e,n){const a=E(void 0);function o(t){const d=this.nextToggledScaleMode(t);t.scale!==d&&(t.scale=d,t===this.currentSlide?(t.elmClasses=[...t.elmClasses||[],"animate-zoom"],this.$forceUpdate(),this.positionLoadedSlide(t),a.value=d,this.positionAllLoadedSlides()):this.positionLoadedSlide(t))}function r(t){return t.biggerThanContainer||e.rememberScale==="contain"?t.scale==="contain"?"natural":"contain":"natural"}function l(t){if(t.scale===this.nextToggledScaleMode(t))return null;if(t.scale==="contain"&&this.nextToggledScaleMode(t)==="natural")return t.biggerThanContainer?"in":"out";if(t.scale==="natural"&&this.nextToggledScaleMode(t)==="contain")return t.biggerThanContainer?"out":"in"}function h(t,d){return e.rememberScale&&!d&&(e.rememberScale===a.value||e.rememberScale===!0)?a.value:t.biggerThanContainer?"contain":"natural"}n.on("slideMediaPositioningMetadataLoaded",w);function w(t){t.scale=h(t),n.emit("slideMediaScalingMetadataLoaded",t),t.mediaMetadataLoaded=!0,n.emit("slideMediaMetadataLoaded",t)}return{toggleScaleMode:o,nextToggledScaleMode:r,nextToggledScaleModeZoomDirection:l,getInitialScale:h}}function ue(){C(()=>{const e=I();new Q(e.proxy.$el,{}).on("swipe",a=>{a.deltaX<0?e.proxy.nextSlide():e.proxy.previousSlide()})})}function he(e){function n(o){var r;if((r=o.mediaElm)==null?void 0:r.play){try{o.mediaElm.play()}catch{o.elm.querySelector(".play-button").classList.add("show")}setTimeout(()=>{o.mediaElm.paused&&o.elm.querySelector(".play-button").classList.add("show")},50)}}function a(o){var r,l;(l=(r=o.mediaElm)==null?void 0:r.pause)==null||l.call(r)}return e.on("newSlideLoaded",n),e.on("unloadSlide",a),{playVideo:n}}const me={xmlns:"http://www.w3.org/2000/svg",width:"310",height:"270",viewBox:"0 0 82.021 71.438"},fe=u("path",{style:{fill:"none",stroke:"#000","stroke-width":".264583px","stroke-linecap":"butt","stroke-linejoin":"miter","stroke-opacity":"1"},d:"M-136.94-67.294c18.018 45.581-1.094 25.217 4.344 22.858 5.438-2.36 17.599 67.312 17.599 67.312"},null,-1),ge=u("path",{style:{fill:"#000","fill-opacity":"1",stroke:"none","stroke-width":".264583px","stroke-linecap":"butt","stroke-linejoin":"miter","stroke-opacity":"1"},d:"M10.583 44.98V10.582h60.854V44.98H58.208V29.104L31.75 50.271l26.458 21.166V55.563h23.813V0H0v55.563h23.812V44.978Z"},null,-1),pe=[fe,ge];function Se(e,n){return f(),g("svg",me,pe)}var ve={render:Se};const we={viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg",stroke:"#fff"},ye=u("g",{transform:"translate(1 1)","stroke-width":"2",fill:"none","fill-rule":"evenodd"},[u("circle",{"stroke-opacity":".5",cx:"18",cy:"18",r:"18"}),u("path",{d:"M36 18c0-9.94-8.06-18-18-18"},[u("animateTransform",{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"1s",repeatCount:"indefinite"})])],-1),_e=[ye];function Le(e,n){return f(),g("svg",we,_e)}var U={render:Le};var Z=(e,n)=>{for(const[a,o]of n)e[a]=o;return e};const xe={name:"BigShot",components:{RepeatIcon:ve,SpinnerIcon:U},props:{slideData:{type:Array,default:()=>[]},rememberScale:{type:String,default:""},beforeSlideChangeHook:{type:Function,default:()=>()=>{}},plugins:{type:Array,default:()=>[]}},setup(e){const n=Y();ue();const a=E(!1),h=re(e,n,a),{slides:o,currentSlideIndex:r}=h,l=W(h,["slides","currentSlideIndex"]);return _(_(_(_(_({SpinnerIcon:U,slides:o,currentSlideIndex:r},l),de(e,o,r,n)),le(n,a)),ce(e,n)),he(n))},watch:{notLoadedSlides:{handler(){for(const e of this.notLoadedSlides)e.elm=null,e.mediaElm=null,e.elmStyle=null,e.elmClasses=null},deep:!0}},created(){window.addEventListener("keydown",this.keyDownListener),window.addEventListener("resize",this.resizeWindowListener),window.addEventListener("orientationchange",this.resizeWindowListener)},methods:{wrapIndex(e){return e>=0?e%this.numOfSlides:(e%this.numOfSlides+this.numOfSlides)%this.numOfSlides},keyDownListener(e){e.key==="ArrowLeft"?this.previousSlide():e.key==="ArrowRight"?this.nextSlide():e.key==="Escape"&&this.closeSlideShow()},resizeWindowListener(){for(const e of this.loadedSlides){try{this.naturalSlideSizeBiggerThanContainer(e)}catch{return}const n=this.naturalSlideSizeBiggerThanContainer(e);e.biggerThanContainer!==n&&(e.biggerThanContainer=n,e.scale=this.getInitialScale(e,!0))}this.positionLoadedSlide(this.currentSlide),this.positionAllLoadedSlides()}}},P=e=>(ee("data-v-5bb06afb"),e=e(),te(),e),be={ref:"container",class:"container"},ke={class:"topbar"},Ie={class:"left-side"},Ce={key:0},Ee={class:"center"},Me={class:"right-side"},Te=["src"],$e=["data-slide-index"],Be={key:0,class:"media media-status"},Pe=P(()=>u("span",null,"Failed to load media",-1)),He=[Pe],ze=["src"],De=["src"],Fe=["onClick"],Oe=P(()=>u("span",null,"\u25B6",-1)),We=[Oe],Ve={class:"slide-status-indicator"},je={class:"container loop-indicator"},qe={class:"container loading-indicator"},Ne=P(()=>u("div",{class:"bottom-bar"},null,-1));function Ae(e,n,a,o,r,l){var t,d;const h=M("RepeatIcon"),w=M("SpinnerIcon");return f(),g("div",be,[u("div",ke,[u("div",Ie,[o.currentSlideIndex!==null?(f(),g("div",Ce,V(o.currentSlideIndex+1)+" / "+V(e.numOfSlides),1)):T("",!0)]),u("div",Ee,[(f(!0),g(b,null,$((t=a.plugins)==null?void 0:t.filter(i=>i.topbarIcon),i=>(f(),B(q(i.topbarCenterContent),ne({key:i.name},i.topbarCenterContentProps,{"current-slide":e.currentSlide}),null,16,["current-slide"]))),128))]),u("div",Me,[u("button",{class:"close-button",onClick:n[0]||(n[0]=(...i)=>e.closeSlideShow&&e.closeSlideShow(...i))}," X "),(f(!0),g(b,null,$((d=a.plugins)==null?void 0:d.filter(i=>i.topbarIcon),i=>(f(),g("div",{key:i.name,class:"plugin"},[i.topbarIcon&&typeof i.topbarIcon=="string"?(f(),g("img",{key:0,src:i.topbarIcon,class:"icon"},null,8,Te)):(f(),B(q(i.topbarIcon),{key:1,class:"icon"}))]))),128))])]),(f(!0),g(b,null,$(e.loadedSlides,i=>(f(),g("div",{key:i.id,ref:`slide-${i.id}`,class:ie(["slide",{current:i.index===o.currentSlideIndex,positioned:i.elmStyle&&i.elmStyle.transform||i.mediaLoadingFailed},e.nextToggledScaleModeZoomDirection(i)&&`zoom-${e.nextToggledScaleModeZoomDirection(i)}`,i.elmClasses]),"data-slide-index":i.index},[i.mediaLoadingFailed?(f(),g("div",Be,He)):i.type==="image"?(f(),g("img",{key:1,src:i.data.src,class:"media",style:N(i.elmStyle)},null,12,ze)):i.type==="video"?(f(),g(b,{key:2},[u("video",{class:"media",style:N(i.elmStyle),playsinline:""},[u("source",{src:i.data.src},null,8,De)],4),u("button",{class:"play-button",onClick:()=>e.playVideo(i)},We,8,Fe)],64)):T("",!0)],10,$e))),128)),u("div",Ve,[u("div",je,[j(h,{class:"icon"})]),u("div",qe,[j(w,{class:"icon"})])]),Ne],512)}var Re=Z(xe,[["render",Ae],["__scopeId","data-v-5bb06afb"]]);const Ue={viewBox:"0 0 1000 1000",xmlns:"http://www.w3.org/2000/svg","xml:space":"preserve",style:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"}},Ze=u("path",{d:"m482.262 2.217 107.776 329.432h348.773l-282.163 203.6L764.425 864.68 482.262 661.081 200.099 864.68l107.776-329.431-282.163-203.6h348.773L482.262 2.217Z",style:{fill:"#fff"},transform:"matrix(1.04157 0 0 1.04875 -2.31 -2.325)"},null,-1),Ge=[Ze];function Xe(e,n){return f(),g("svg",Ue,Ge)}var Je={render:Xe},Ke={name:"Test Plugin",topbarIcon:A(Je)};const Qe={viewBox:"0 0 1000 1000",xmlns:"http://www.w3.org/2000/svg","xml:space":"preserve",style:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"}},Ye=u("ellipse",{cx:"486",cy:"620.5",rx:"486",ry:"620.5",style:{fill:"#fff"},transform:"scale(1.02881 .8058)"},null,-1),et=[Ye];function tt(e,n){return f(),g("svg",Qe,et)}var nt={render:tt},it={name:"Test Plugin - Circle",topbarIcon:A(nt)};const ot={name:"BigShotExampleUsage",components:{BigShot:Re},props:{loadPlugins:Boolean},data({loadPlugins:e}){return{slideData:[{src:"media/factory.jpg"},{src:"media/sunset.jpg"},{src:"media/santa.mp4",type:"video"},{src:"media/tree.jpg"},{src:"media/tunnels.jpg"}],showSlideShow:!0,plugins:e?[Ke,it]:[]}},methods:{async beforeSlideChangeHook({currentIndex:e,newIndex:n,delta:a}){a>0&&n<e&&(await new Promise(o=>setTimeout(o,1e3)),this.slideData.push(_({},this.slideData[e-4])))}}};function at(e,n,a,o,r,l){const h=M("BigShot");return f(),g(b,null,[r.showSlideShow?(f(),B(h,{key:0,"slide-data":r.slideData,"before-slide-change-hook":l.beforeSlideChangeHook,plugins:r.plugins,onExited:n[0]||(n[0]=()=>r.showSlideShow=!1)},null,8,["slide-data","before-slide-change-hook","plugins"])):T("",!0),u("button",{onClick:n[1]||(n[1]=()=>r.showSlideShow=!0)}," Open Slide Show ")],64)}var st=Z(ot,[["render",at]]);const rt=oe(st);rt.mount("#app");
(function(){ try {var elementStyle = document.createElement('style'); elementStyle.innerText = `.container[data-v-5bb06afb]{position:absolute;top:0;bottom:0;left:0;right:0;background:black;color:#fff;overflow:hidden;text-align:initial;font-family:sans-serif;z-index:10}.container .topbar[data-v-5bb06afb]{background-color:#0000004d;position:absolute;left:0;top:0;height:44px;width:100%;opacity:75%;font-size:13px;display:flex;justify-content:space-between;align-items:center;z-index:1;padding:2px 20px;box-sizing:border-box}.container .topbar>*[data-v-5bb06afb]{flex:0 1 auto;flex-direction:row-reverse}.container .topbar button[data-v-5bb06afb]{color:#fff;background:none;border:none}.container .topbar .plugin .icon[data-v-5bb06afb]{height:100%;max-width:3em;padding:10px;box-sizing:border-box}.container .topbar .center[data-v-5bb06afb]{align-self:flex-start}.container .topbar .right-side[data-v-5bb06afb]{display:flex;height:100%}.container .topbar .right-side>*[data-v-5bb06afb]{flex:0 1 auto}.container .topbar .right-side>* svg[data-v-5bb06afb]{width:fit-content}.container .slide[data-v-5bb06afb]{height:100%;width:100%;overflow:hidden}.container .slide .play-button[data-v-5bb06afb]{left:0;right:0;margin:auto;top:0;bottom:0;height:80px;width:80px;position:absolute;background-color:#fff;border:none;font-size:40px;color:#000;border-radius:40px;visibility:hidden;transform:scale(.5);opacity:0%}.container .slide .play-button span[data-v-5bb06afb]{transform:translateY(-3px) translate(3px);display:inline-block;transition:transform .3s}.container .slide .play-button:hover span[data-v-5bb06afb]{transform:translateY(-3px) translate(10px)}.container .slide .play-button.show[data-v-5bb06afb]{visibility:visible;transform:scale(1);opacity:100%;transition:transform .2s,opacity .2s}.container .slide .media-status[data-v-5bb06afb]{height:100%;display:flex;justify-content:center;align-items:center;font-size:3em;font-weight:bold;color:#d7a039}.container .slide.animate-zoom .media[data-v-5bb06afb]{transition:transform .2s}.container .slide.zoom-in .media[data-v-5bb06afb]{cursor:zoom-in}.container .slide.zoom-out .media[data-v-5bb06afb]{cursor:zoom-out}.container .slide[data-v-5bb06afb]:not(.current),.container .slide[data-v-5bb06afb]:not(.positioned){display:none}.container .slide-status-indicator .container[data-v-5bb06afb]{left:0;right:0;margin:auto;top:0;bottom:0;height:100px;width:100px;position:absolute;background-color:#0009;border:none;font-size:70px;color:#fff;line-height:100px;text-align:center;visibility:hidden;transform:scale(.3);pointer-events:none;opacity:80%}.container .slide-status-indicator .container .icon[data-v-5bb06afb]{display:inline-block;height:1em;width:1em}.container .slide-status-indicator .container.loading-indicator[data-v-5bb06afb]{display:flex;justify-content:center;align-items:center}.container .slide-status-indicator .container.loading-indicator .icon[data-v-5bb06afb]{width:70%;height:70%}.container .slide-status-indicator .container.loading-indicator.animate[data-v-5bb06afb]{visibility:visible;transform:scale(1);transition:transform 1s,opacity 4s 1s,visibility 0s .2s}.container .slide-status-indicator .container.loop-indicator .icon[data-v-5bb06afb]{vertical-align:-.2em}.container .slide-status-indicator .container.loop-indicator .icon[data-v-5bb06afb] path{fill:#fff!important}.container .slide-status-indicator .container.loop-indicator.animate[data-v-5bb06afb]{visibility:visible;transform:scale(1);opacity:0%;transition:transform 1s,opacity 4s 1s,visibility 0s .2s}body{margin:0}#app{display:flex;justify-content:center;align-items:center;height:100vh}
`; document.head.appendChild(elementStyle);} catch(e) {console.error(e, 'vite-plugin-css-injected-by-js: can\'t add the style.');} })();