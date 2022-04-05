var K=Object.defineProperty,Q=Object.defineProperties;var Y=Object.getOwnPropertyDescriptors;var q=Object.getOwnPropertySymbols;var ee=Object.prototype.hasOwnProperty,te=Object.prototype.propertyIsEnumerable;var j=(e,i,n)=>i in e?K(e,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[i]=n,b=(e,i)=>{for(var n in i||(i={}))ee.call(i,n)&&j(e,n,i[n]);if(q)for(var n of q(i))te.call(i,n)&&j(e,n,i[n]);return e},B=(e,i)=>Q(e,Y(i));import{r as M,w as $,c as k,m as ie,n as _,a as ne,g as H,o as P,H as ae,b as f,d as v,e as c,f as A,F as C,t as T,h as N,p as F,i as V,j as I,k as oe,l as U,q as Z,s as O,u as z,v as le,x as G,y as se,z as de}from"./vendor.f74cb97f.js";const re=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const d of s)if(d.type==="childList")for(const m of d.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&r(m)}).observe(document,{childList:!0,subtree:!0});function n(s){const d={};return s.integrity&&(d.integrity=s.integrity),s.referrerpolicy&&(d.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?d.credentials="include":s.crossorigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function r(s){if(s.ep)return;s.ep=!0;const d=n(s);fetch(s.href,d)}};re();function ue(e){var S;const i=ie(),n=M(((S=e.slideData)==null?void 0:S.length)>0?0:null),r=M(!1);$(n,()=>{typeof n.value=="number"?n.value<0?console.warn(`currentSlideIndex ("${n.value}") less than 0`):n.value>o.value&&console.warn(`currentSlideIndex ("${n.value}") appears to be neither greater than the number of slides`):n.value!==null&&console.warn(`currentSlideIndex ("${n.value}") appears to be neither a number of a null`)});const s=M(!1);function d(h){s.value=!0,i.off("playRequested",d),_(()=>{i.emit("playRequested",h)})}i.on("playRequested",d);const m=k(()=>new WeakMap(Array.from(e.slideData.entries()).map(([h,w])=>[w,h]))),p=new WeakMap;function t(h){const w=e.slideData[h];if(!w)return null;if(!p.has(w)){const E=(w==null?void 0:w.type)||"image";p.set(w,{data:w,type:E,mediaLoadingStatus:E==="video"||E==="image"?"not loaded":null,mediaHeight:void 0,mediaWidth:void 0,biggerThanContainer:void 0,scale:void 0,id:m.value.get(w)+Math.random(),positioning:ne({scaleMode:void 0}),elmStyleRef:M(null),elmRef:M(null),get elm(){return this.elmRef.value},mediaElmRef:M(null),get mediaElm(){return this.mediaElmRef.value},get index(){return m.value.get(w)}})}return p.get(w)}const l=k(()=>t(n.value)),o=k(()=>{var h;return((h=e.slideData)==null?void 0:h.length)||0});function y(h){return h>=0?h%o.value:(h%o.value+o.value)%o.value}return{showLoadingIndicator:r,currentSlideIndex:n,currentSlide:l,getSlide:t,numOfSlides:o,wrapIndex:y,userInteractHasOccurred:s,emitter:i}}function ce(){return["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"ontouchend"in document}const X=2,me=3;function fe(e,{emitter:i,currentSlideIndex:n,currentSlide:r,getSlide:s,numOfSlides:d,showLoadingIndicator:m,userInteractHasOccurred:p,wrapIndex:t}){const l=H().proxy;P(()=>{y()}),i.on("slideMediaFailedToLoad",a=>{a.slide.mediaLoadingStatus="failed"}),i.on("newSlideLoaded",a=>{a.mediaLoadingStatus==="loading"&&E(a)});const o=k(function(){const a=Math.min(d.value,X+1+me),u=[];for(let L=0;L<a;L+=1){const g=t(L+n.value-X),x=s(g);u.push(x)}return u});$(o,()=>_(y));function y(){for(const a of o.value){if(!a.elm){console.warn(`Slide ${a.index} is in loadedSlides but does not have an elm ref`,a,a.elm);continue}if(a.mediaLoadingStatus)if(a.type==="video"&&!p.value&&ce())a.mediaLoadingStatus="delayed till play";else{if(!a.mediaElm){console.error(`Slide ${a.index} is a media slide but does not have a media elm ref`);continue}a.mediaLoadingStatus==="not loaded"&&(a.mediaLoadingStatus="loading",S(a))}}}function S(a){w(a),a.mediaElm.addEventListener("click",()=>{l.toggleScaleMode(r.value)}),a.mediaElm.addEventListener("play",()=>{var u;(u=a.elm)==null||u.querySelector(".play-button").classList.remove("show")}),a.mediaElm.addEventListener("pause",()=>{var u;(u=a.elm)==null||u.querySelector(".play-button").classList.add("show")}),a.mediaElm.addEventListener("transitionend",()=>{a.elmClasses&&(a.elmClasses=a.elmClasses.filter(u=>u!=="animate-zoom"),l.$forceUpdate())})}const h=k(()=>{var a;return(a=r.value)==null?void 0:a.id});$(h,()=>{_(()=>{i.emit("newSlideLoaded",r.value)})});function w(a){const u=L=>{!a.elm||!document.body.contains(a.elm)||(L?(L.slide=a,i.emit("slideMediaFailedToLoad",L)):i.emit("slideMediaLoaded",a))};a.mediaElm.naturalHeight||a.mediaElm.readyState>=1?u():(a.mediaElm.addEventListener("load",()=>u()),a.mediaElm.addEventListener("loadedmetadata",()=>u()),a.mediaElm.addEventListener("error",L=>u(L)))}$(d,()=>{d.value>0&&n.value===null?n.value=0:d.value>0&&n.value>=d.value?n.value=d.value-1:d.value===0&&n.value!==null&&(n.value=null)}),$(()=>e.slideData,(a,u)=>{const L=u==null?void 0:u[n.value],g=a.indexOf(L);g>=0&&g!==n.value&&(n.value=g)}),$(p,()=>{for(const a of o.value)a.mediaLoadingStatus==="delayed till play"&&(a.mediaLoadingStatus="not loaded");_(()=>{y(),E(r.value),i.emit("playRequested",r.value)})}),$(o,(a,u)=>{const L=u.filter(g=>!a.includes(g));for(const g of L){if(g.mediaElm){g.mediaElm.src&&(g.mediaElm.src="");const x=Array.from(g.mediaElm.children).filter(R=>R.tagName==="SOURCE");x.length&&x.forEach(R=>g.mediaElm.removeChild(R))}g.elmRef&&(g.elmRef.value=null,g.mediaElmRef.value=null,g.elmStyleRef.value=null),g.elmClasses=null,g.mediaLoadingStatus="not loaded"}});function E(a){m.value&&(m.value=!1),a.mediaLoadingStatus&&setTimeout(()=>{n.value===a.index&&a.mediaLoadingStatus!=="loaded"&&(i.on("slideMediaMetadataLoaded",u),i.on("slideMediaFailedToLoad",u),console.warn("new slide hasnt loaded or failed yet so setting loading indicator"),m.value=!0);function u(L){n.value===a.index&&L.id===a.id&&(m.value=!1,i.off("slideMediaMetadataLoaded",u),i.off("slideMediaFailedToLoad",u))}},300)}return{currentSlideIndex:n,loadedSlides:o,numOfSlides:d}}function he(e,{currentSlideIndex:i,emitter:n,showLoadingIndicator:r,numOfSlides:s,wrapIndex:d}){P(()=>{const S=H().proxy.$el.querySelector(".loop-indicator");S.addEventListener("transitionend",h=>{h.propertyName==="opacity"&&S.classList.remove("animate")})});function m(){return this.changeCurrentSlideBy(1)}function p(){return this.changeCurrentSlideBy(-1)}async function t(y){var E;let S=i.value+y;const h=this.loadedSlides,w=setTimeout(()=>{r.value||(r.value=!0)},300);if(await((E=e.beforeSlideChangeHook)==null?void 0:E.call(e,{currentIndex:i.value,newIndex:d(S),delta:y,length:s.value})),clearTimeout(w),r.value&&(r.value=!1),S=i.value+y,S<0||S>s.value-1){const a=this.$el.querySelector(".loop-indicator");a.classList.contains("animate")?(a.classList.remove("animate"),setTimeout(()=>a.classList.add("animate"),50)):a.classList.add("animate")}return h===this.loadedSlides?this.changeCurrentSlideTo(this.wrapIndex(S),y):new Promise(a=>this.$nextTick(()=>a(this.changeCurrentSlideTo(this.wrapIndex(S),y))))}function l(y,S){this.$emit("slideChanged",{newIndex:y,oldIndex:i.value,delta:S||y-i.value}),n.emit("unloadSlide",this.currentSlide),i.value=y}function o(){window.location.hash="",this.$emit("exited")}return{nextSlide:m,previousSlide:p,changeCurrentSlideBy:t,changeCurrentSlideTo:l,closeSlideShow:o}}function ge(e,{emitter:i}){function n(t){try{d(t)}catch{return}const l=s(t);t.elmStyleRef.value=B(b({},t.elmStyleRef.value),{transform:l.join(" ")})}function r(){for(const t of this.loadedSlides)t!==this.currentSlide&&(t.positioning.scaleMode=this.getInitialScale(t)),t.mediaLoadingStatus==="loaded"&&n(t)}function s(t){const{container:l,media:o}=d(t),y=l.height/2-o.height/2,S=l.width/2-o.width/2,h=l.width/o.width,w=l.height/o.height,E=Math.min(h,w),a=[];return a.push(`translate(${S}px, ${y}px)`),t.positioning.scaleMode==="contain"&&a.push(`scale(${E})`),a}function d(t){const l={container:{height:t.elm.parentElement.clientHeight,width:t.elm.parentElement.clientWidth},media:{height:t.data.height||t.mediaHeight,width:t.data.width||t.mediaWidth}};if(!l.container.height)throw new Error("Could not get container height");if(!l.container.width)throw new Error("Could not get container width");if(!l.media.height)throw new Error("Could not get media height");if(!l.media.width)throw new Error("Could not get media width");return l}function m(t){const{container:l,media:o}=d(t);return!(o.height<l.height&&o.width<l.width)}i.on("slideMediaMetadataLoaded",t=>n(t)),i.on("slideMediaLoaded",p);function p(t){if(t.mediaHeight=t.mediaElm.naturalHeight||t.mediaElm.videoHeight,t.mediaWidth=t.mediaElm.naturalWidth||t.mediaElm.videoWidth,!t.mediaHeight||!t.mediaWidth){console.error("Could not get media dimensions",t,t.mediaElm);return}t.biggerThanContainer=m(t),i.emit("slideMediaPositioningMetadataLoaded",t)}return{positionLoadedSlide:n,positionAllLoadedSlides:r,getSlideDimensions:d,naturalSlideSizeBiggerThanContainer:m}}function ve(e,{emitter:i}){const n=M(void 0);function r(t){const l=t.positioning.scaleMode,o=this.nextToggledScaleMode(t);l!==o&&(t.positioning.scaleMode=o,t===this.currentSlide?(t.elmClasses=[...t.elmClasses||[],"animate-zoom"],this.$forceUpdate(),this.positionLoadedSlide(t),n.value=o,this.positionAllLoadedSlides()):this.positionLoadedSlide(t))}function s(t){return t.biggerThanContainer||e.rememberScale==="contain"?t.positioning.scaleMode==="contain"?"natural":"contain":"natural"}function d(t){const l=t.positioning.scaleMode;if(l===this.nextToggledScaleMode(t))return null;if(l==="contain"&&this.nextToggledScaleMode(t)==="natural")return t.biggerThanContainer?"in":"out";if(l==="natural"&&this.nextToggledScaleMode(t)==="contain")return t.biggerThanContainer?"out":"in";console.warn("Unknown scale mode",t,l,this.nextToggledScaleMode(t))}function m(t,l){return e.rememberScale&&!l&&(e.rememberScale===n.value||e.rememberScale===!0)?n.value:t.biggerThanContainer?"contain":"natural"}i.on("slideMediaPositioningMetadataLoaded",p);function p(t){t.positioning.scaleMode=m(t),i.emit("slideMediaScalingMetadataLoaded",t),t.mediaLoadingStatus="loaded",i.emit("slideMediaMetadataLoaded",t)}return{toggleScaleMode:r,nextToggledScaleMode:s,nextToggledScaleModeZoomDirection:d,getInitialScale:m}}function pe(){P(()=>{const e=H();new ae(e.proxy.$el,{}).on("swipe",n=>{n.deltaX<0?e.proxy.nextSlide():e.proxy.previousSlide()})})}function ye(){const e=M(!1),i=M(null);function n(){i.value=setTimeout(()=>{e.value=!0},2*1e3)}function r(){i.value&&clearTimeout(i.value),e.value&&(e.value=!1)}function s(){r(),n()}return document.addEventListener("pointermove",s),n(),{controlsHidden:e}}function Se(e,{emitter:i,currentSlide:n,showLoadingIndicator:r,userInteractHasOccurred:s}){function d(t){var l;if(!(t.type!=="video"||t.mediaLoadingStatus==="delayed till play")){if(!s.value){t.elm.querySelector(".play-button").classList.add("show");return}if(!((l=t.mediaElm)==null?void 0:l.play)){console.warn("Attempted to play but slide has no media elm",t);return}try{t.mediaElm.play()}catch{t.elm.querySelector(".play-button").classList.add("show")}setTimeout(()=>{t.mediaElm.paused&&t.elm.querySelector(".play-button").classList.add("show")},50)}}function m(t){var l,o;(o=(l=t.mediaElm)==null?void 0:l.pause)==null||o.call(l)}function p(t){if(t.type!=="video"||!s.value)return;let l=!1;t.mediaElm.addEventListener("playing",()=>{var o;l=!1,t.id===((o=n.value)==null?void 0:o.id)&&r.value&&(r.value=!1)}),t.mediaElm.addEventListener("pause",()=>{var o;l=!1,t.id===((o=n.value)==null?void 0:o.id)&&r.value&&(r.value=!1)}),t.mediaElm.addEventListener("waiting",()=>{l=!0,setTimeout(()=>{var o;l&&t.id===((o=n.value)==null?void 0:o.id)&&(r.value=!0)},1e3)})}return i.on("newSlideLoaded",t=>{d(t),p(t)}),i.on("unloadSlide",m),i.on("playRequested",d),{}}const we={xmlns:"http://www.w3.org/2000/svg",width:"310",height:"270",viewBox:"0 0 82.021 71.438"},Le=c("path",{style:{fill:"none",stroke:"#000","stroke-width":".264583px","stroke-linecap":"butt","stroke-linejoin":"miter","stroke-opacity":"1"},d:"M-136.94-67.294c18.018 45.581-1.094 25.217 4.344 22.858 5.438-2.36 17.599 67.312 17.599 67.312"},null,-1),Ee=c("path",{style:{fill:"#000","fill-opacity":"1",stroke:"none","stroke-width":".264583px","stroke-linecap":"butt","stroke-linejoin":"miter","stroke-opacity":"1"},d:"M10.583 44.98V10.582h60.854V44.98H58.208V29.104L31.75 50.271l26.458 21.166V55.563h23.813V0H0v55.563h23.812V44.978Z"},null,-1),be=[Le,Ee];function Me(e,i){return f(),v("svg",we,be)}var $e={render:Me};const ke={viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg",stroke:"#fff"},xe=c("g",{transform:"translate(1 1)","stroke-width":"2",fill:"none","fill-rule":"evenodd"},[c("circle",{"stroke-opacity":".5",cx:"18",cy:"18",r:"18"}),c("path",{d:"M36 18c0-9.94-8.06-18-18-18"},[c("animateTransform",{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"1s",repeatCount:"indefinite"})])],-1),_e=[xe];function Ce(e,i){return f(),v("svg",ke,_e)}var J={render:Ce};var D=(e,i)=>{for(const[n,r]of i)e[n]=r;return e};const W=e=>(F("data-v-277f7e7e"),e=e(),V(),e),Te=["data-slide-index"],Ie={key:0,class:"media media-status"},Re=W(()=>c("span",null,"Failed to load media",-1)),Be=[Re],He=["src"],Pe=W(()=>c("span",null,"\u25B6",-1)),ze=[Pe],De=["preload"],We=["src","type"],qe=W(()=>c("span",null,"\u25B6",-1)),je=[qe],Ae={key:4,class:"media media-status"},Ne={props:{slide:{type:Object,default:()=>({})},currentSlideIndex:{type:Number,default:()=>0},toggledScaleModeZoomDirection:{type:String,default:()=>""},userInteractHasOccurred:{type:Boolean,default:()=>!1},emitter:{type:Object,default:()=>({})}},setup(e){return(i,n)=>(f(),v("div",{ref:e.slide.elmRef,class:N(["slide",{current:e.slide.index===e.currentSlideIndex,"has-media":e.slide.mediaLoadingStatus&&e.slide.mediaLoadingStatus!=="failed"&&e.slide.mediaLoadingStatus!=="delayed till play",positioned:e.slide.elmStyleRef.value&&e.slide.elmStyleRef.value.transform},e.toggledScaleModeZoomDirection&&`zoom-${e.toggledScaleModeZoomDirection}`,e.slide.elmClasses]),"data-slide-index":e.slide.index},[e.slide.mediaLoadingStatus==="failed"?(f(),v("div",Ie,Be)):e.slide.type==="image"?(f(),v("img",{key:1,ref:e.slide.mediaElmRef,src:e.slide.data.src,class:"media",style:A(e.slide.elmStyleRef.value),loading:"eager"},null,12,He)):e.slide.type==="video"&&e.slide.mediaLoadingStatus==="delayed till play"?(f(),v("button",{key:2,class:"play-button show",onClick:n[0]||(n[0]=r=>e.emitter.emit("playRequested",e.slide))},ze)):e.slide.type==="video"?(f(),v(C,{key:3},[c("video",{ref:e.slide.mediaElmRef,class:"media",style:A(e.slide.elmStyleRef.value),playsinline:"",preload:e.slide.index>=e.currentSlideIndex?"auto":"metadata"},[c("source",{src:e.slide.data.src,type:e.slide.data.mimeType},null,8,We)],12,De),c("button",{class:"play-button",onClick:n[1]||(n[1]=r=>e.emitter.emit("playRequested",e.slide))},je)],64)):(f(),v("div",Ae,[c("span",null,"Can't load media type "+T(e.slide.type),1)]))],10,Te))}};var Fe=D(Ne,[["__scopeId","data-v-277f7e7e"]]);const Ve={name:"BigShot",components:{RepeatIcon:$e,SpinnerIcon:J,SlideItem:Fe},props:{slideData:{type:Array,default:()=>[]},rememberScale:{type:String,default:""},beforeSlideChangeHook:{type:Function,default:()=>()=>{}},plugins:{type:Array,default:()=>[]}},setup(e){pe();const i=ue(e);return B(b(b(b(b(b(b(b({SpinnerIcon:J},i),fe(e,i)),he(e,i)),ge(e,i)),ve(e,i)),Se(e,i)),ye()),{log:console.log})},created(){window.addEventListener("keydown",this.keyDownListener),window.addEventListener("resize",this.resizeWindowListener),window.addEventListener("orientationchange",this.resizeWindowListener)},methods:{keyDownListener(e){e.key==="ArrowLeft"?this.previousSlide():e.key==="ArrowRight"?this.nextSlide():e.key==="Escape"&&this.closeSlideShow()},resizeWindowListener(){for(const e of this.loadedSlides){try{this.naturalSlideSizeBiggerThanContainer(e)}catch{continue}const i=this.naturalSlideSizeBiggerThanContainer(e);e.biggerThanContainer!==i&&(e.biggerThanContainer=i,e.positioning.scaleMode=this.getInitialScale(e,!0))}this.positionLoadedSlide(this.currentSlide),this.positionAllLoadedSlides()}}},Ue=e=>(F("data-v-5104f05e"),e=e(),V(),e),Ze={class:"topbar"},Oe={class:"left-side"},Ge={key:0},Xe={key:1},Je={class:"center"},Ke={class:"content"},Qe={class:"right-side"},Ye=["src"],et={class:"slide-status-indicator"},tt={class:"container loop-indicator"},it={key:0,class:"container loading-indicator"},nt=Ue(()=>c("div",{class:"bottom-bar"},null,-1));function at(e,i,n,r,s,d){var l;const m=I("slide-item"),p=I("RepeatIcon"),t=I("SpinnerIcon");return f(),v("div",{ref:"container",class:N(["container",{"controls-hidden":e.controlsHidden}])},[c("div",Ze,[c("div",Oe,[e.currentSlideIndex!==null?(f(),v("div",Ge,T(e.currentSlideIndex+1)+" / "+T(e.numOfSlides),1)):(f(),v("div",Xe," No slides "))]),c("div",Je,[c("div",Ke,[oe(e.$slots,"center-header",{currentSlide:e.currentSlide},void 0,!0)])]),c("div",Qe,[c("button",{class:"close-button",onClick:i[0]||(i[0]=(...o)=>e.closeSlideShow&&e.closeSlideShow(...o))}," X "),(f(!0),v(C,null,U((l=n.plugins)==null?void 0:l.filter(o=>o.topbarIcon),o=>(f(),v("div",{key:o.name,class:"plugin"},[o.topbarIcon&&typeof o.topbarIcon=="string"?(f(),v("img",{key:0,src:o.topbarIcon,class:"icon"},null,8,Ye)):(f(),z(le(o.topbarIcon),{key:1,class:"icon"}))]))),128))])]),(f(!0),v(C,null,U(e.loadedSlides,o=>(f(),z(m,{key:o.id,slide:o,"current-slide-index":e.currentSlideIndex,"toggled-scale-mode-zoom-direction":o.positioning.scaleMode&&e.nextToggledScaleModeZoomDirection(o),"user-interact-has-occurred":e.userInteractHasOccurred,emitter:e.emitter},null,8,["slide","current-slide-index","toggled-scale-mode-zoom-direction","user-interact-has-occurred","emitter"]))),128)),c("div",et,[c("div",tt,[Z(p,{class:"icon"})]),e.showLoadingIndicator?(f(),v("div",it,[Z(t,{class:"icon"})])):O("",!0)]),nt],2)}var ot=D(Ve,[["render",at],["__scopeId","data-v-5104f05e"]]);const lt={viewBox:"0 0 1000 1000",xmlns:"http://www.w3.org/2000/svg","xml:space":"preserve",style:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"}},st=c("path",{d:"m482.262 2.217 107.776 329.432h348.773l-282.163 203.6L764.425 864.68 482.262 661.081 200.099 864.68l107.776-329.431-282.163-203.6h348.773L482.262 2.217Z",style:{fill:"#fff"},transform:"matrix(1.04157 0 0 1.04875 -2.31 -2.325)"},null,-1),dt=[st];function rt(e,i){return f(),v("svg",lt,dt)}var ut={render:rt},ct={name:"Test Plugin",topbarIcon:G(ut)};const mt={viewBox:"0 0 1000 1000",xmlns:"http://www.w3.org/2000/svg","xml:space":"preserve",style:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"}},ft=c("ellipse",{cx:"486",cy:"620.5",rx:"486",ry:"620.5",style:{fill:"#fff"},transform:"scale(1.02881 .8058)"},null,-1),ht=[ft];function gt(e,i){return f(),v("svg",mt,ht)}var vt={render:gt},pt={name:"Test Plugin - Circle",topbarIcon:G(vt)};const yt={name:"BigShotExampleUsage",components:{BigShot:ot},props:{loadPlugins:Boolean},data({loadPlugins:e}){return{slideData:[{src:"media/factory.jpg"},{src:"media/sunset.jpg"},{src:"media/santa.mp4",type:"video"},{src:"media/tree.jpg"},{src:"media/tunnels.jpg"}],showSlideShow:!0,plugins:e?[ct,pt]:[]}},methods:{async beforeSlideChangeHook({currentIndex:e,newIndex:i,delta:n}){n>0&&i<e&&(await new Promise(r=>setTimeout(r,1e3)),this.slideData.push(b({},this.slideData[e-4])))}}};function St(e,i,n,r,s,d){const m=I("BigShot");return f(),v(C,null,[s.showSlideShow?(f(),z(m,{key:0,"slide-data":s.slideData,"before-slide-change-hook":d.beforeSlideChangeHook,plugins:s.plugins,onExited:i[0]||(i[0]=()=>s.showSlideShow=!1)},{"center-header":se(({currentSlide:p})=>[c("h1",null,T(p.data.src),1)]),_:1},8,["slide-data","before-slide-change-hook","plugins"])):O("",!0),c("button",{onClick:i[1]||(i[1]=()=>s.showSlideShow=!0)}," Open Slide Show ")],64)}var wt=D(yt,[["render",St]]);const Lt=de(wt);Lt.mount("#app");
(function(){ try {var elementStyle = document.createElement('style'); elementStyle.innerText = `.slide[data-v-277f7e7e]{height:100%;width:100%;overflow:hidden}.slide .play-button[data-v-277f7e7e]{left:0;right:0;margin:auto;padding:0;top:0;bottom:0;height:80px;width:80px;position:absolute;background-color:#fff;border:none;font-size:40px;color:#000;border-radius:40px;visibility:hidden;transform:scale(.5);opacity:0%;box-sizing:unset}.slide .play-button span[data-v-277f7e7e]{transform:translateY(-3px) translate(3px);display:inline-block;transition:transform .3s}.slide .play-button:hover span[data-v-277f7e7e]{transform:translateY(-3px) translate(10px)}.slide .play-button.show[data-v-277f7e7e]{visibility:visible;transform:scale(1);opacity:100%;transition:transform .2s,opacity .2s}.slide .media[data-v-277f7e7e]{will-change:transform}.slide .media-status[data-v-277f7e7e]{height:100%;display:flex;justify-content:center;align-items:center;font-size:3em;font-weight:bold;color:#d7a039}.slide.animate-zoom .media[data-v-277f7e7e]{transition:transform .2s}.slide.zoom-in .media[data-v-277f7e7e]{cursor:zoom-in}.slide.zoom-out .media[data-v-277f7e7e]{cursor:zoom-out}.slide[data-v-277f7e7e]:not(.current),.slide.has-media[data-v-277f7e7e]:not(.positioned){display:none}.container[data-v-5104f05e]{position:absolute;top:0;bottom:0;left:0;right:0;background:black;color:#fff;overflow:hidden;text-align:initial;font-family:sans-serif;z-index:10}.container .topbar[data-v-5104f05e]{background-color:#0000004d;position:absolute;left:0;top:0;height:44px;width:100%;opacity:75%;font-size:13px;display:flex;justify-content:space-between;align-items:baseline;z-index:1;padding:2px 20px;box-sizing:border-box;flex-wrap:wrap;gap:1em}.container .topbar>*[data-v-5104f05e]{flex:0 0 auto;flex-direction:row-reverse}.container .topbar button[data-v-5104f05e]{color:#fff;background:none;border:none}.container .topbar .plugin .icon[data-v-5104f05e]{height:100%;max-width:3em;padding:10px;box-sizing:border-box}.container .topbar .center[data-v-5104f05e]{align-self:flex-start;flex:1 2 auto;display:flex;flex-direction:column;align-items:center}@media (max-width: 600px){.container .topbar .center[data-v-5104f05e]{width:100%;order:3}}.container .topbar .right-side[data-v-5104f05e]{display:flex;height:100%}.container .topbar .right-side>*[data-v-5104f05e]{flex:0 1 auto}.container .topbar .right-side>* svg[data-v-5104f05e]{width:fit-content}.container .slide-status-indicator .container[data-v-5104f05e]{left:0;right:0;margin:auto;top:0;bottom:0;height:100px;width:100px;position:absolute;background-color:#0009;border:none;font-size:70px;color:#fff;line-height:100px;text-align:center;visibility:hidden;transform:scale(.3);pointer-events:none;opacity:80%}.container .slide-status-indicator .container .icon[data-v-5104f05e]{display:inline-block;height:1em;width:1em}.container .slide-status-indicator .container.loading-indicator[data-v-5104f05e]{display:flex;justify-content:center;align-items:center;visibility:unset;transform:unset;border-radius:50%;animation:entrance-animation-5104f05e 1s linear}.container .slide-status-indicator .container.loading-indicator .icon[data-v-5104f05e]{width:70%;height:70%}@keyframes entrance-animation-5104f05e{0%{transform:scale(.3);opacity:0%}50%{opacity:80%}to{transform:scale(1)}}.container .slide-status-indicator .container.loop-indicator .icon[data-v-5104f05e]{vertical-align:-.2em}.container .slide-status-indicator .container.loop-indicator .icon[data-v-5104f05e] path{fill:#fff!important}.container .slide-status-indicator .container.loop-indicator.animate[data-v-5104f05e]{visibility:visible;transform:scale(1);opacity:0%;transition:transform 1s,opacity 4s 1s,visibility 0s .2s}.container.controls-hidden .topbar[data-v-5104f05e]{opacity:0%;transition:opacity 1s}body{margin:0}#app{display:flex;justify-content:center;align-items:center;height:100vh}
`; document.head.appendChild(elementStyle);} catch(e) {console.error(e, 'vite-plugin-css-injected-by-js: can\'t add the style.');} })();