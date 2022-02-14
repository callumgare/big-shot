var U=Object.defineProperty,Z=Object.defineProperties;var G=Object.getOwnPropertyDescriptors;var k=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable;var D=(e,n,a)=>n in e?U(e,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[n]=a,y=(e,n)=>{for(var a in n||(n={}))P.call(n,a)&&D(e,a,n[a]);if(k)for(var a of k(n))H.call(n,a)&&D(e,a,n[a]);return e},z=(e,n)=>Z(e,G(n));var W=(e,n)=>{var a={};for(var o in e)P.call(e,o)&&n.indexOf(o)<0&&(a[o]=e[o]);if(e!=null&&k)for(var o of k(e))n.indexOf(o)<0&&H.call(e,o)&&(a[o]=e[o]);return a};import{g as b,o as C,c as L,r as E,n as X,H as J,a as m,b as p,d as c,e as I,t as O,f as M,F as x,h as $,i as F,m as K,p as Q,j as Y,k as T,l as ee,q as V,s as te,u as j,v as q,w as ne}from"./vendor.d8d220e6.js";const ie=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function a(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerpolicy&&(l.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?l.credentials="include":r.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(r){if(r.ep)return;r.ep=!0;const l=a(r);fetch(r.href,l)}};ie();const A=2,oe=3;function ae(e,n,a){var g;const o=b().proxy;C(()=>{u()}),n.on("slideMediaFailedToLoad",s=>{s.slide.mediaLoadingFailed=!0});const r=L(()=>{var s;return((s=e.slideData)==null?void 0:s.length)||0}),l=new WeakMap;function u(){for(const s of o.loadedSlides){if(!s.elm){if(s.elm=o.$refs[`slide-${s.id}`],!s.elm)throw new Error("Something went wrong. Can't access slide element.");if(s.mediaElm=s.elm?s.elm.querySelector(".media"):null,!s.mediaElm)throw new Error("Something went wrong. Can't access media element.");w(s),s.mediaElm.addEventListener("click",()=>{o.toggleScaleMode(o.currentSlide)}),s.mediaElm.addEventListener("play",()=>{s.elm.querySelector(".play-button").classList.remove("show")}),s.mediaElm.addEventListener("pause",()=>{s.elm.querySelector(".play-button").classList.add("show")}),s.mediaElm.addEventListener("transitionend",()=>{s.elmClasses&&(s.elmClasses=s.elmClasses.filter(f=>f!=="animate-zoom"),o.$forceUpdate())})}s.index===o.currentSlideIndex&&n.emit("newSlideLoaded",s)}}function w(s){const f=h=>{!s.elm||!document.body.contains(s.elm)||(h?(h.slide=s,n.emit("slideMediaFailedToLoad",h)):n.emit("slideMediaLoaded",s))};s.mediaElm.naturalHeight||s.mediaElm.readyState>=1?f():(s.mediaElm.addEventListener("load",()=>f()),s.mediaElm.addEventListener("loadedmetadata",()=>f()),s.mediaElm.addEventListener("error",h=>f(h)))}const t=L(()=>{const s=[];for(const[f,h]of e.slideData.entries()){l.has(h)||l.set(h,{data:h,type:(h==null?void 0:h.type)||"image",mediaHeight:void 0,mediaWidth:void 0,biggerThanContainer:void 0,scale:void 0,id:f+Math.random()});const S=l.get(h);S.index=f,s.push(S)}return s}),d=L(function(){if(a.value=!a.value&&!1,o.currentSlideIndex===null)if(t.value.length>0)o.currentSlideIndex=0;else return[];else t.value.length>0?o.currentSlideIndex<0?o.currentSlideIndex=0:o.currentSlideIndex>=t.value.length&&(o.currentSlideIndex=t.value.length-1):o.currentSlideIndex=null;const s=o.currentSlideIndex,f=Math.min(r.value,A+1+oe),h=[];for(let S=0;S<f;S+=1){const v=o.wrapIndex(S+s-A);h.push(t.value[v])}return X(()=>u()),h}),i=L(()=>t.value.filter(s=>!d.value.some(f=>f===s)));return{currentSlideIndex:E(((g=e.slideData)==null?void 0:g.length)>0?0:null),slides:t,loadedSlides:d,notLoadedSlides:i,numOfSlides:r}}function se(e,n,a,o){C(()=>{const g=b().proxy.$el.querySelector(".loop-indicator");g.addEventListener("transitionend",s=>{s.propertyName==="opacity"&&g.classList.remove("animate")})});function r(){return this.changeCurrentSlideBy(1)}function l(){return this.changeCurrentSlideBy(-1)}async function u(i){var v;let g=a.value+i;const s=this.loadedSlides;let f=!1;const h=this.$el.querySelector(".loading-indicator"),S=setTimeout(()=>{h.classList.add("animate"),f=!0},300);if(await((v=e.beforeSlideChangeHook)==null?void 0:v.call(e,{currentIndex:a.value,newIndex:this.wrapIndex(g),delta:i,length:this.numOfSlides})),clearTimeout(S),f&&h.classList.remove("animate"),g=a.value+i,g<0||g>this.numOfSlides-1){const _=this.$el.querySelector(".loop-indicator");_.classList.contains("animate")?(_.classList.remove("animate"),setTimeout(()=>_.classList.add("animate"),50)):_.classList.add("animate")}return s===this.loadedSlides?this.changeCurrentSlideTo(this.wrapIndex(g),i):new Promise(_=>this.$nextTick(()=>_(this.changeCurrentSlideTo(this.wrapIndex(g),i))))}function w(i,g){this.$emit("slideChanged",{newIndex:i,oldIndex:a.value,delta:g||i-a.value}),o.emit("unloadSlide",this.currentSlide),a.value=i}function t(){window.location.hash="",this.$emit("exited")}const d=L(()=>n.value[a.value]);return{nextSlide:r,previousSlide:l,changeCurrentSlideBy:u,changeCurrentSlideTo:w,closeSlideShow:t,currentSlide:d}}function re(e,n){function a(t){const d=r(t);t.elmStyle=z(y({},t.elmStyle),{transform:d.join(" ")}),n.value=!0}function o(){for(const t of this.loadedSlides)t!==this.currentSlide&&(t.scale=this.getInitialScale(t)),t.mediaMetadataLoaded&&a(t)}function r(t){const{container:d,media:i}=l(t),g=d.height/2-i.height/2,s=d.width/2-i.width/2,f=d.width/i.width,h=d.height/i.height,S=Math.min(f,h),v=[];return v.push(`translate(${s}px, ${g}px)`),t.scale==="contain"&&v.push(`scale(${S})`),v}function l(t){const d={container:{height:t.elm.parentElement.clientHeight,width:t.elm.parentElement.clientWidth},media:{height:t.data.height||t.mediaHeight,width:t.data.width||t.mediaWidth}};if(!d.container.height)throw new Error("Could not get container height");if(!d.container.width)throw new Error("Could not get container width");if(!d.media.height)throw console.warn(t),new Error("Could not get media height");if(!d.media.width)throw new Error("Could not get media width");return d}function u(t){const{container:d,media:i}=l(t);return!(i.height<d.height&&i.width<d.width)}e.on("slideMediaMetadataLoaded",t=>a(t)),e.on("slideMediaLoaded",w);function w(t){t.mediaHeight=t.mediaElm.naturalHeight||t.mediaElm.videoHeight,t.mediaWidth=t.mediaElm.naturalWidth||t.mediaElm.videoWidth,t.biggerThanContainer=u(t),e.emit("slideMediaPositioningMetadataLoaded",t)}return{positionLoadedSlide:a,positionAllLoadedSlides:o,getPositionForLoadedSlide:r,getSlideDimensions:l,naturalSlideSizeBiggerThanContainer:u}}function le(e,n){const a=E(void 0);function o(t){const d=this.nextToggledScaleMode(t);t.scale!==d&&(t.scale=d,t===this.currentSlide?(t.elmClasses=[...t.elmClasses||[],"animate-zoom"],this.$forceUpdate(),this.positionLoadedSlide(t),a.value=d,this.positionAllLoadedSlides()):this.positionLoadedSlide(t))}function r(t){return t.biggerThanContainer||e.rememberScale==="contain"?t.scale==="contain"?"natural":"contain":"natural"}function l(t){if(t.scale===this.nextToggledScaleMode(t))return null;if(t.scale==="contain"&&this.nextToggledScaleMode(t)==="natural")return t.biggerThanContainer?"in":"out";if(t.scale==="natural"&&this.nextToggledScaleMode(t)==="contain")return t.biggerThanContainer?"out":"in"}function u(t,d){return e.rememberScale&&!d&&(e.rememberScale===a.value||e.rememberScale===!0)?a.value:t.biggerThanContainer?"contain":"natural"}n.on("slideMediaPositioningMetadataLoaded",w);function w(t){t.scale=u(t),n.emit("slideMediaScalingMetadataLoaded",t),t.mediaMetadataLoaded=!0,n.emit("slideMediaMetadataLoaded",t)}return{toggleScaleMode:o,nextToggledScaleMode:r,nextToggledScaleModeZoomDirection:l,getInitialScale:u}}function de(){C(()=>{const e=b();new J(e.proxy.$el,{}).on("swipe",a=>{a.deltaX<0?e.proxy.nextSlide():e.proxy.previousSlide()})})}function ce(e){function n(o){var r;((r=o.mediaElm)==null?void 0:r.play)&&(o.mediaElm.play(),setTimeout(()=>{o.mediaElm.paused&&o.elm.querySelector(".play-button").classList.add("show")},50))}function a(o){var r,l;(l=(r=o.mediaElm)==null?void 0:r.pause)==null||l.call(r)}return e.on("newSlideLoaded",n),e.on("unloadSlide",a),{playVideo:n}}const ue={xmlns:"http://www.w3.org/2000/svg",width:"310",height:"270",viewBox:"0 0 82.021 71.438"},he=c("path",{style:{fill:"none",stroke:"#000","stroke-width":".264583px","stroke-linecap":"butt","stroke-linejoin":"miter","stroke-opacity":"1"},d:"M-136.94-67.294c18.018 45.581-1.094 25.217 4.344 22.858 5.438-2.36 17.599 67.312 17.599 67.312"},null,-1),me=c("path",{style:{fill:"#000","fill-opacity":"1",stroke:"none","stroke-width":".264583px","stroke-linecap":"butt","stroke-linejoin":"miter","stroke-opacity":"1"},d:"M10.583 44.98V10.582h60.854V44.98H58.208V29.104L31.75 50.271l26.458 21.166V55.563h23.813V0H0v55.563h23.812V44.978Z"},null,-1),fe=[he,me];function ge(e,n){return m(),p("svg",ue,fe)}var pe={render:ge};const Se={viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg",stroke:"#fff"},we=c("g",{transform:"translate(1 1)","stroke-width":"2",fill:"none","fill-rule":"evenodd"},[c("circle",{"stroke-opacity":".5",cx:"18",cy:"18",r:"18"}),c("path",{d:"M36 18c0-9.94-8.06-18-18-18"},[c("animateTransform",{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"1s",repeatCount:"indefinite"})])],-1),ve=[we];function ye(e,n){return m(),p("svg",Se,ve)}var N={render:ye};var R=(e,n)=>{for(const[a,o]of n)e[a]=o;return e};const _e={name:"BigShot",components:{RepeatIcon:pe,SpinnerIcon:N},props:{slideData:{type:Array,default:()=>[]},rememberScale:{type:String,default:""},beforeSlideChangeHook:{type:Function,default:()=>()=>{}},plugins:{type:Array,default:()=>[]}},setup(e){const n=K();de();const a=E(!1),u=ae(e,n,a),{slides:o,currentSlideIndex:r}=u,l=W(u,["slides","currentSlideIndex"]);return y(y(y(y(y({SpinnerIcon:N,slides:o,currentSlideIndex:r},l),se(e,o,r,n)),re(n,a)),le(e,n)),ce(n))},watch:{notLoadedSlides:{handler(){for(const e of this.notLoadedSlides)e.elm=null,e.mediaElm=null,e.elmStyle=null,e.elmClasses=null},deep:!0}},created(){window.addEventListener("keydown",this.keyDownListener),window.addEventListener("resize",this.resizeWindowListener),window.addEventListener("orientationchange",this.resizeWindowListener)},methods:{wrapIndex(e){return e>=0?e%this.numOfSlides:(e%this.numOfSlides+this.numOfSlides)%this.numOfSlides},keyDownListener(e){e.key==="ArrowLeft"?this.previousSlide():e.key==="ArrowRight"?this.nextSlide():e.key==="Escape"&&this.closeSlideShow()},resizeWindowListener(){for(const e of this.loadedSlides){const n=this.naturalSlideSizeBiggerThanContainer(e);e.biggerThanContainer!==n&&(e.biggerThanContainer=n,e.scale=this.getInitialScale(e,!0))}this.positionLoadedSlide(this.currentSlide),this.positionAllLoadedSlides()}}},B=e=>(Q("data-v-36c5d978"),e=e(),Y(),e),Le={ref:"container",class:"container"},xe={class:"topbar"},ke={class:"left-side"},be={key:0},Ce={class:"center"},Ee={class:"right-side"},Ie=["src"],Me=["data-slide-index"],$e={key:0,class:"media media-status"},Te=B(()=>c("span",null,"Failed to load media",-1)),Be=[Te],Pe=["src"],He=["src"],De=["onClick"],ze=B(()=>c("span",null,"\u25B6",-1)),We=[ze],Oe={class:"slide-status-indicator"},Fe={class:"container loop-indicator"},Ve={class:"container loading-indicator"},je=B(()=>c("div",{class:"bottom-bar"},null,-1));function qe(e,n,a,o,r,l){var t,d;const u=I("RepeatIcon"),w=I("SpinnerIcon");return m(),p("div",Le,[c("div",xe,[c("div",ke,[o.currentSlideIndex!==null?(m(),p("div",be,O(o.currentSlideIndex+1)+" / "+O(e.numOfSlides),1)):M("",!0)]),c("div",Ce,[(m(!0),p(x,null,$((t=a.plugins)==null?void 0:t.filter(i=>i.topbarIcon),i=>(m(),T(V(i.topbarCenterContent),ee({key:i.name},i.topbarCenterContentProps,{"current-slide":e.currentSlide}),null,16,["current-slide"]))),128))]),c("div",Ee,[c("button",{class:"close-button",onClick:n[0]||(n[0]=(...i)=>e.closeSlideShow&&e.closeSlideShow(...i))}," X "),(m(!0),p(x,null,$((d=a.plugins)==null?void 0:d.filter(i=>i.topbarIcon),i=>(m(),p("div",{key:i.name,class:"plugin"},[i.topbarIcon&&typeof i.topbarIcon=="string"?(m(),p("img",{key:0,src:i.topbarIcon,class:"icon"},null,8,Ie)):(m(),T(V(i.topbarIcon),{key:1,class:"icon"}))]))),128))])]),(m(!0),p(x,null,$(e.loadedSlides,i=>(m(),p("div",{key:i.id,ref:`slide-${i.id}`,class:te(["slide",{current:i.index===o.currentSlideIndex,positioned:i.elmStyle&&i.elmStyle.transform||i.mediaLoadingFailed},e.nextToggledScaleModeZoomDirection(i)&&`zoom-${e.nextToggledScaleModeZoomDirection(i)}`,i.elmClasses]),"data-slide-index":i.index},[i.mediaLoadingFailed?(m(),p("div",$e,Be)):i.type==="image"?(m(),p("img",{key:1,src:i.data.src,class:"media",style:j(i.elmStyle)},null,12,Pe)):i.type==="video"?(m(),p(x,{key:2},[c("video",{class:"media",style:j(i.elmStyle),playsinline:""},[c("source",{src:i.data.src},null,8,He)],4),c("button",{class:"play-button",onClick:()=>e.playVideo(i)},We,8,De)],64)):M("",!0)],10,Me))),128)),c("div",Oe,[c("div",Fe,[F(u,{class:"icon"})]),c("div",Ve,[F(w,{class:"icon"})])]),je],512)}var Ae=R(_e,[["render",qe],["__scopeId","data-v-36c5d978"]]);const Ne={viewBox:"0 0 1000 1000",xmlns:"http://www.w3.org/2000/svg","xml:space":"preserve",style:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"}},Re=c("path",{d:"m482.262 2.217 107.776 329.432h348.773l-282.163 203.6L764.425 864.68 482.262 661.081 200.099 864.68l107.776-329.431-282.163-203.6h348.773L482.262 2.217Z",style:{fill:"#fff"},transform:"matrix(1.04157 0 0 1.04875 -2.31 -2.325)"},null,-1),Ue=[Re];function Ze(e,n){return m(),p("svg",Ne,Ue)}var Ge={render:Ze},Xe={name:"Test Plugin",topbarIcon:q(Ge)};const Je={viewBox:"0 0 1000 1000",xmlns:"http://www.w3.org/2000/svg","xml:space":"preserve",style:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"}},Ke=c("ellipse",{cx:"486",cy:"620.5",rx:"486",ry:"620.5",style:{fill:"#fff"},transform:"scale(1.02881 .8058)"},null,-1),Qe=[Ke];function Ye(e,n){return m(),p("svg",Je,Qe)}var et={render:Ye},tt={name:"Test Plugin - Circle",topbarIcon:q(et)};const nt={name:"BigShotExampleUsage",components:{BigShot:Ae},props:{loadPlugins:Boolean},data({loadPlugins:e}){return{slideData:[{src:"media/factory.jpg"},{src:"media/sunset.jpg"},{src:"media/santa.mp4",type:"video"},{src:"media/tree.jpg"},{src:"media/tunnels.jpg"}],showSlideShow:!0,plugins:e?[Xe,tt]:[]}},methods:{async beforeSlideChangeHook({currentIndex:e,newIndex:n,delta:a}){a>0&&n<e&&(await new Promise(o=>setTimeout(o,1e3)),this.slideData.push(y({},this.slideData[e-4])))}}};function it(e,n,a,o,r,l){const u=I("BigShot");return m(),p(x,null,[r.showSlideShow?(m(),T(u,{key:0,"slide-data":r.slideData,"before-slide-change-hook":l.beforeSlideChangeHook,plugins:r.plugins,onExited:n[0]||(n[0]=()=>r.showSlideShow=!1)},null,8,["slide-data","before-slide-change-hook","plugins"])):M("",!0),c("button",{onClick:n[1]||(n[1]=()=>r.showSlideShow=!0)}," Open Slide Show ")],64)}var ot=R(nt,[["render",it]]);const at=ne(ot);at.mount("#app");
(function(){ try {var elementStyle = document.createElement('style'); elementStyle.innerText = `.container[data-v-36c5d978]{position:absolute;top:0;bottom:0;left:0;right:0;background:black;color:#fff;overflow:hidden;text-align:initial;font-family:sans-serif;z-index:10}.container .topbar[data-v-36c5d978]{background-color:#0000004d;position:absolute;left:0;top:0;height:44px;width:100%;opacity:75%;font-size:13px;display:flex;justify-content:space-between;align-items:center;z-index:1;padding:2px 20px;box-sizing:border-box}.container .topbar>*[data-v-36c5d978]{flex:0 1 auto;flex-direction:row-reverse}.container .topbar button[data-v-36c5d978]{color:#fff;background:none;border:none}.container .topbar .plugin .icon[data-v-36c5d978]{height:100%;max-width:3em;padding:10px;box-sizing:border-box}.container .topbar .center[data-v-36c5d978]{align-self:flex-start}.container .topbar .right-side[data-v-36c5d978]{display:flex;height:100%}.container .topbar .right-side>*[data-v-36c5d978]{flex:0 1 auto}.container .topbar .right-side>* svg[data-v-36c5d978]{width:fit-content}.container .slide[data-v-36c5d978]{height:100%;width:100%;overflow:hidden}.container .slide .play-button[data-v-36c5d978]{left:0;right:0;margin:auto;top:0;bottom:0;height:80px;width:80px;position:absolute;background-color:#fff;border:none;font-size:40px;color:#000;border-radius:40px;visibility:hidden;transform:scale(.5);opacity:0%}.container .slide .play-button span[data-v-36c5d978]{transform:translateY(-3px) translate(3px);display:inline-block;transition:transform .3s}.container .slide .play-button:hover span[data-v-36c5d978]{transform:translateY(-3px) translate(10px)}.container .slide .play-button.show[data-v-36c5d978]{visibility:visible;transform:scale(1);opacity:100%;transition:transform .2s,opacity .2s}.container .slide .media-status[data-v-36c5d978]{height:100%;display:flex;justify-content:center;align-items:center;font-size:3em;font-weight:bold;color:#d7a039}.container .slide.animate-zoom .media[data-v-36c5d978]{transition:transform .2s}.container .slide.zoom-in .media[data-v-36c5d978]{cursor:zoom-in}.container .slide.zoom-out .media[data-v-36c5d978]{cursor:zoom-out}.container .slide[data-v-36c5d978]:not(.current),.container .slide[data-v-36c5d978]:not(.positioned){display:none}.container .slide-status-indicator .container[data-v-36c5d978]{left:0;right:0;margin:auto;top:0;bottom:0;height:100px;width:100px;position:absolute;background-color:#0009;border:none;font-size:70px;color:#fff;line-height:100px;text-align:center;visibility:hidden;transform:scale(.3);pointer-events:none;opacity:80%}.container .slide-status-indicator .container .icon[data-v-36c5d978]{display:inline-block;height:1em;width:1em}.container .slide-status-indicator .container.loading-indicator[data-v-36c5d978]{display:flex;justify-content:center;align-items:center}.container .slide-status-indicator .container.loading-indicator .icon[data-v-36c5d978]{width:70%;height:70%}.container .slide-status-indicator .container.loading-indicator.animate[data-v-36c5d978]{visibility:visible;transform:scale(1);transition:transform 1s,opacity 4s 1s,visibility 0s .2s}.container .slide-status-indicator .container.loop-indicator .icon[data-v-36c5d978]{vertical-align:-.2em}.container .slide-status-indicator .container.loop-indicator .icon[data-v-36c5d978] path{fill:#fff!important}.container .slide-status-indicator .container.loop-indicator.animate[data-v-36c5d978]{visibility:visible;transform:scale(1);opacity:0%;transition:transform 1s,opacity 4s 1s,visibility 0s .2s}body{margin:0}#app{display:flex;justify-content:center;align-items:center;height:100vh}
`; document.head.appendChild(elementStyle);} catch(e) {console.error(e, 'vite-plugin-css-injected-by-js: can\'t add the style.');} })();