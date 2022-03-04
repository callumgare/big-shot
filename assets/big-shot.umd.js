var xn=Object.defineProperty,kn=Object.defineProperties;var Dn=Object.getOwnPropertyDescriptors;var Ie=Object.getOwnPropertySymbols;var ct=Object.prototype.hasOwnProperty,ht=Object.prototype.propertyIsEnumerable;var dt=(r,E,L)=>E in r?xn(r,E,{enumerable:!0,configurable:!0,writable:!0,value:L}):r[E]=L,j=(r,E)=>{for(var L in E||(E={}))ct.call(E,L)&&dt(r,L,E[L]);if(Ie)for(var L of Ie(E))ht.call(E,L)&&dt(r,L,E[L]);return r},ut=(r,E)=>kn(r,Dn(E));var ft=(r,E)=>{var L={};for(var V in r)ct.call(r,V)&&E.indexOf(V)<0&&(L[V]=r[V]);if(r!=null&&Ie)for(var V of Ie(r))E.indexOf(V)<0&&ht.call(r,V)&&(L[V]=r[V]);return L};(function(r,E){typeof exports=="object"&&typeof module!="undefined"?module.exports=E(require("vue")):typeof define=="function"&&define.amd?define(["vue"],E):(r=typeof globalThis!="undefined"?globalThis:r||self,r.BigShot=E(r.Vue))})(this,function(r){"use strict";function E(a){return{all:a=a||new Map,on:function(c,m){var u=a.get(c);u?u.push(m):a.set(c,[m])},off:function(c,m){var u=a.get(c);u&&(m?u.splice(u.indexOf(m)>>>0,1):a.set(c,[]))},emit:function(c,m){var u=a.get(c);u&&u.slice().map(function(f){f(m)}),(u=a.get("*"))&&u.slice().map(function(f){f(c,m)})}}}const L=2,V=3;function mt(a,c,m){var M;const u=r.getCurrentInstance().proxy;r.onMounted(()=>{D()});const f=r.ref(((M=a.slideData)==null?void 0:M.length)>0?0:null);c.on("slideMediaFailedToLoad",d=>{d.slide.mediaLoadingFailed=!0});const y=r.computed(()=>{var d;return((d=a.slideData)==null?void 0:d.length)||0}),C=new WeakMap;function D(){for(const d of u.loadedSlides){if(!d.elm){if(d.elm=u.$refs[`slide-${d.id}`],!d.elm)throw new Error("Something went wrong. Can't access slide element.");if(d.mediaElm=d.elm?d.elm.querySelector(".media"):null,!d.mediaElm)throw new Error("Something went wrong. Can't access media element.");s(d),d.mediaElm.addEventListener("click",()=>{u.toggleScaleMode(u.currentSlide)}),d.mediaElm.addEventListener("play",()=>{d.elm.querySelector(".play-button").classList.remove("show")}),d.mediaElm.addEventListener("pause",()=>{d.elm.querySelector(".play-button").classList.add("show")}),d.mediaElm.addEventListener("transitionend",()=>{d.elmClasses&&(d.elmClasses=d.elmClasses.filter(T=>T!=="animate-zoom"),u.$forceUpdate())})}if(d.index===u.currentSlideIndex){c.emit("newSlideLoaded",d);const T=u.$el.querySelector(".loading-indicator");T.classList.remove("animate"),setTimeout(()=>{f.value===d.index&&!d.mediaMetadataLoaded&&!d.mediaLoadingFailed&&(c.on("slideMediaMetadataLoaded",g),c.on("slideMediaFailedToLoad",g),T.classList.add("animate"));function g(N){f.value===d.index&&N.id===d.id&&(T.classList.remove("animate"),c.off("slideMediaMetadataLoaded",g),c.off("slideMediaFailedToLoad",g))}},300)}}}function s(d){const T=g=>{!d.elm||!document.body.contains(d.elm)||(g?(g.slide=d,c.emit("slideMediaFailedToLoad",g)):setTimeout(()=>c.emit("slideMediaLoaded",d),3e3))};d.mediaElm.naturalHeight||d.mediaElm.readyState>=1?T():(d.mediaElm.addEventListener("load",()=>T()),d.mediaElm.addEventListener("loadedmetadata",()=>T()),d.mediaElm.addEventListener("error",g=>T(g)))}const p=r.computed(()=>{var N;const d=(N=u.slides)==null?void 0:N[f.value],T=[];for(const[k,S]of a.slideData.entries()){C.has(S)||C.set(S,{data:S,type:(S==null?void 0:S.type)||"image",mediaHeight:void 0,mediaWidth:void 0,biggerThanContainer:void 0,scale:void 0,id:k+Math.random()});const J=C.get(S);J.index=k,T.push(J)}const g=T.indexOf(d);return g>=0&&g!==f.value&&(f.value=g,console.log(g,"currentSlideNewIndex")),T}),h=r.computed(function(){if(m.value=!m.value&&!1,u.currentSlideIndex===null)if(p.value.length>0)u.currentSlideIndex=0;else return[];else p.value.length>0?u.currentSlideIndex<0?u.currentSlideIndex=0:u.currentSlideIndex>=p.value.length&&(u.currentSlideIndex=p.value.length-1):u.currentSlideIndex=null;const d=u.currentSlideIndex,T=Math.min(y.value,L+1+V),g=[];for(let N=0;N<T;N+=1){const k=u.wrapIndex(N+d-L);g.push(p.value[k])}return r.nextTick(()=>D()),g}),I=r.computed(()=>p.value.filter(d=>!h.value.some(T=>T===d)));return{currentSlideIndex:f,slides:p,loadedSlides:h,notLoadedSlides:I,numOfSlides:y}}function pt(a,c,m,u){r.onMounted(()=>{const I=r.getCurrentInstance().proxy.$el.querySelector(".loop-indicator");I.addEventListener("transitionend",M=>{M.propertyName==="opacity"&&I.classList.remove("animate")})});function f(){return this.changeCurrentSlideBy(1)}function y(){return this.changeCurrentSlideBy(-1)}async function C(h){var N;let I=m.value+h;const M=this.loadedSlides;let d=!1;const T=this.$el.querySelector(".loading-indicator"),g=setTimeout(()=>{T.classList.add("animate"),d=!0},300);if(await((N=a.beforeSlideChangeHook)==null?void 0:N.call(a,{currentIndex:m.value,newIndex:this.wrapIndex(I),delta:h,length:this.numOfSlides})),clearTimeout(g),d&&T.classList.remove("animate"),I=m.value+h,I<0||I>this.numOfSlides-1){const k=this.$el.querySelector(".loop-indicator");k.classList.contains("animate")?(k.classList.remove("animate"),setTimeout(()=>k.classList.add("animate"),50)):k.classList.add("animate")}return M===this.loadedSlides?this.changeCurrentSlideTo(this.wrapIndex(I),h):new Promise(k=>this.$nextTick(()=>k(this.changeCurrentSlideTo(this.wrapIndex(I),h))))}function D(h,I){this.$emit("slideChanged",{newIndex:h,oldIndex:m.value,delta:I||h-m.value}),u.emit("unloadSlide",this.currentSlide),m.value=h}function s(){window.location.hash="",this.$emit("exited")}const p=r.computed(()=>c.value[m.value]);return{nextSlide:f,previousSlide:y,changeCurrentSlideBy:C,changeCurrentSlideTo:D,closeSlideShow:s,currentSlide:p}}function vt(a,c){function m(s){try{y(s)}catch{return}const p=f(s);s.elmStyle=ut(j({},s.elmStyle),{transform:p.join(" ")}),c.value=!0}function u(){for(const s of this.loadedSlides)s!==this.currentSlide&&(s.scale=this.getInitialScale(s)),s.mediaMetadataLoaded&&m(s)}function f(s){const{container:p,media:h}=y(s),I=p.height/2-h.height/2,M=p.width/2-h.width/2,d=p.width/h.width,T=p.height/h.height,g=Math.min(d,T),N=[];return N.push(`translate(${M}px, ${I}px)`),s.scale==="contain"&&N.push(`scale(${g})`),N}function y(s){const p={container:{height:s.elm.parentElement.clientHeight,width:s.elm.parentElement.clientWidth},media:{height:s.data.height||s.mediaHeight,width:s.data.width||s.mediaWidth}};if(!p.container.height)throw new Error("Could not get container height");if(!p.container.width)throw new Error("Could not get container width");if(!p.media.height)throw new Error("Could not get media height");if(!p.media.width)throw new Error("Could not get media width");return p}function C(s){const{container:p,media:h}=y(s);return!(h.height<p.height&&h.width<p.width)}a.on("slideMediaMetadataLoaded",s=>m(s)),a.on("slideMediaLoaded",D);function D(s){s.mediaHeight=s.mediaElm.naturalHeight||s.mediaElm.videoHeight,s.mediaWidth=s.mediaElm.naturalWidth||s.mediaElm.videoWidth,s.biggerThanContainer=C(s),a.emit("slideMediaPositioningMetadataLoaded",s)}return{positionLoadedSlide:m,positionAllLoadedSlides:u,getSlideDimensions:y,naturalSlideSizeBiggerThanContainer:C}}function gt(a,c){const m=r.ref(void 0);function u(s){const p=this.nextToggledScaleMode(s);s.scale!==p&&(s.scale=p,s===this.currentSlide?(s.elmClasses=[...s.elmClasses||[],"animate-zoom"],this.$forceUpdate(),this.positionLoadedSlide(s),m.value=p,this.positionAllLoadedSlides()):this.positionLoadedSlide(s))}function f(s){return s.biggerThanContainer||a.rememberScale==="contain"?s.scale==="contain"?"natural":"contain":"natural"}function y(s){if(s.scale===this.nextToggledScaleMode(s))return null;if(s.scale==="contain"&&this.nextToggledScaleMode(s)==="natural")return s.biggerThanContainer?"in":"out";if(s.scale==="natural"&&this.nextToggledScaleMode(s)==="contain")return s.biggerThanContainer?"out":"in"}function C(s,p){return a.rememberScale&&!p&&(a.rememberScale===m.value||a.rememberScale===!0)?m.value:s.biggerThanContainer?"contain":"natural"}c.on("slideMediaPositioningMetadataLoaded",D);function D(s){s.scale=C(s),c.emit("slideMediaScalingMetadataLoaded",s),s.mediaMetadataLoaded=!0,c.emit("slideMediaMetadataLoaded",s)}return{toggleScaleMode:u,nextToggledScaleMode:f,nextToggledScaleModeZoomDirection:y,getInitialScale:C}}var Ve={exports:{}};/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */(function(a){(function(c,m,u,f){var y=["","webkit","Moz","MS","ms","o"],C=m.createElement("div"),D="function",s=Math.round,p=Math.abs,h=Date.now;function I(e,t,n){return setTimeout(J(e,n),t)}function M(e,t,n){return Array.isArray(e)?(d(e,n[t],n),!0):!1}function d(e,t,n){var i;if(!!e)if(e.forEach)e.forEach(t,n);else if(e.length!==f)for(i=0;i<e.length;)t.call(n,e[i],i,e),i++;else for(i in e)e.hasOwnProperty(i)&&t.call(n,e[i],i,e)}function T(e,t,n){var i="DEPRECATED METHOD: "+t+`
`+n+` AT 
`;return function(){var o=new Error("get-stack-trace"),l=o&&o.stack?o.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",v=c.console&&(c.console.warn||c.console.log);return v&&v.call(c.console,i,l),e.apply(this,arguments)}}var g;typeof Object.assign!="function"?g=function(t){if(t===f||t===null)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(t),i=1;i<arguments.length;i++){var o=arguments[i];if(o!==f&&o!==null)for(var l in o)o.hasOwnProperty(l)&&(n[l]=o[l])}return n}:g=Object.assign;var N=T(function(t,n,i){for(var o=Object.keys(n),l=0;l<o.length;)(!i||i&&t[o[l]]===f)&&(t[o[l]]=n[o[l]]),l++;return t},"extend","Use `assign`."),k=T(function(t,n){return N(t,n,!0)},"merge","Use `assign`.");function S(e,t,n){var i=t.prototype,o;o=e.prototype=Object.create(i),o.constructor=e,o._super=i,n&&g(o,n)}function J(e,t){return function(){return e.apply(t,arguments)}}function Ne(e,t){return typeof e==D?e.apply(t&&t[0]||f,t):e}function Fe(e,t){return e===f?t:e}function le(e,t,n){d(he(t),function(i){e.addEventListener(i,n,!1)})}function ce(e,t,n){d(he(t),function(i){e.removeEventListener(i,n,!1)})}function He(e,t){for(;e;){if(e==t)return!0;e=e.parentNode}return!1}function z(e,t){return e.indexOf(t)>-1}function he(e){return e.trim().split(/\s+/g)}function Q(e,t,n){if(e.indexOf&&!n)return e.indexOf(t);for(var i=0;i<e.length;){if(n&&e[i][n]==t||!n&&e[i]===t)return i;i++}return-1}function de(e){return Array.prototype.slice.call(e,0)}function Be(e,t,n){for(var i=[],o=[],l=0;l<e.length;){var v=t?e[l][t]:e[l];Q(o,v)<0&&i.push(e[l]),o[l]=v,l++}return n&&(t?i=i.sort(function(O,A){return O[t]>A[t]}):i=i.sort()),i}function ue(e,t){for(var n,i,o=t[0].toUpperCase()+t.slice(1),l=0;l<y.length;){if(n=y[l],i=n?n+o:t,i in e)return i;l++}return f}var jt=1;function Jt(){return jt++}function We(e){var t=e.ownerDocument||e;return t.defaultView||t.parentWindow||c}var Qt=/mobile|tablet|ip(ad|hone|od)|android/i,Ye="ontouchstart"in c,Kt=ue(c,"PointerEvent")!==f,en=Ye&&Qt.test(navigator.userAgent),ee="touch",tn="pen",Pe="mouse",nn="kinect",rn=25,w=1,G=2,_=4,x=8,fe=1,te=2,ne=4,ie=8,re=16,F=te|ne,$=ie|re,Xe=F|$,qe=["x","y"],me=["clientX","clientY"];function b(e,t){var n=this;this.manager=e,this.callback=t,this.element=e.element,this.target=e.options.inputTarget,this.domHandler=function(i){Ne(e.options.enable,[e])&&n.handler(i)},this.init()}b.prototype={handler:function(){},init:function(){this.evEl&&le(this.element,this.evEl,this.domHandler),this.evTarget&&le(this.target,this.evTarget,this.domHandler),this.evWin&&le(We(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&ce(this.element,this.evEl,this.domHandler),this.evTarget&&ce(this.target,this.evTarget,this.domHandler),this.evWin&&ce(We(this.element),this.evWin,this.domHandler)}};function on(e){var t,n=e.options.inputClass;return n?t=n:Kt?t=Oe:en?t=ge:Ye?t=Me:t=ve,new t(e,sn)}function sn(e,t,n){var i=n.pointers.length,o=n.changedPointers.length,l=t&w&&i-o==0,v=t&(_|x)&&i-o==0;n.isFirst=!!l,n.isFinal=!!v,l&&(e.session={}),n.eventType=t,an(e,n),e.emit("hammer.input",n),e.recognize(n),e.session.prevInput=n}function an(e,t){var n=e.session,i=t.pointers,o=i.length;n.firstInput||(n.firstInput=ze(t)),o>1&&!n.firstMultiple?n.firstMultiple=ze(t):o===1&&(n.firstMultiple=!1);var l=n.firstInput,v=n.firstMultiple,P=v?v.center:l.center,O=t.center=Ge(i);t.timeStamp=h(),t.deltaTime=t.timeStamp-l.timeStamp,t.angle=Le(P,O),t.distance=pe(P,O),ln(n,t),t.offsetDirection=Ze(t.deltaX,t.deltaY);var A=$e(t.deltaTime,t.deltaX,t.deltaY);t.overallVelocityX=A.x,t.overallVelocityY=A.y,t.overallVelocity=p(A.x)>p(A.y)?A.x:A.y,t.scale=v?dn(v.pointers,i):1,t.rotation=v?hn(v.pointers,i):0,t.maxPointers=n.prevInput?t.pointers.length>n.prevInput.maxPointers?t.pointers.length:n.prevInput.maxPointers:t.pointers.length,cn(n,t);var B=e.element;He(t.srcEvent.target,B)&&(B=t.srcEvent.target),t.target=B}function ln(e,t){var n=t.center,i=e.offsetDelta||{},o=e.prevDelta||{},l=e.prevInput||{};(t.eventType===w||l.eventType===_)&&(o=e.prevDelta={x:l.deltaX||0,y:l.deltaY||0},i=e.offsetDelta={x:n.x,y:n.y}),t.deltaX=o.x+(n.x-i.x),t.deltaY=o.y+(n.y-i.y)}function cn(e,t){var n=e.lastInterval||t,i=t.timeStamp-n.timeStamp,o,l,v,P;if(t.eventType!=x&&(i>rn||n.velocity===f)){var O=t.deltaX-n.deltaX,A=t.deltaY-n.deltaY,B=$e(i,O,A);l=B.x,v=B.y,o=p(B.x)>p(B.y)?B.x:B.y,P=Ze(O,A),e.lastInterval=t}else o=n.velocity,l=n.velocityX,v=n.velocityY,P=n.direction;t.velocity=o,t.velocityX=l,t.velocityY=v,t.direction=P}function ze(e){for(var t=[],n=0;n<e.pointers.length;)t[n]={clientX:s(e.pointers[n].clientX),clientY:s(e.pointers[n].clientY)},n++;return{timeStamp:h(),pointers:t,center:Ge(t),deltaX:e.deltaX,deltaY:e.deltaY}}function Ge(e){var t=e.length;if(t===1)return{x:s(e[0].clientX),y:s(e[0].clientY)};for(var n=0,i=0,o=0;o<t;)n+=e[o].clientX,i+=e[o].clientY,o++;return{x:s(n/t),y:s(i/t)}}function $e(e,t,n){return{x:t/e||0,y:n/e||0}}function Ze(e,t){return e===t?fe:p(e)>=p(t)?e<0?te:ne:t<0?ie:re}function pe(e,t,n){n||(n=qe);var i=t[n[0]]-e[n[0]],o=t[n[1]]-e[n[1]];return Math.sqrt(i*i+o*o)}function Le(e,t,n){n||(n=qe);var i=t[n[0]]-e[n[0]],o=t[n[1]]-e[n[1]];return Math.atan2(o,i)*180/Math.PI}function hn(e,t){return Le(t[1],t[0],me)+Le(e[1],e[0],me)}function dn(e,t){return pe(t[0],t[1],me)/pe(e[0],e[1],me)}var un={mousedown:w,mousemove:G,mouseup:_},fn="mousedown",mn="mousemove mouseup";function ve(){this.evEl=fn,this.evWin=mn,this.pressed=!1,b.apply(this,arguments)}S(ve,b,{handler:function(t){var n=un[t.type];n&w&&t.button===0&&(this.pressed=!0),n&G&&t.which!==1&&(n=_),!!this.pressed&&(n&_&&(this.pressed=!1),this.callback(this.manager,n,{pointers:[t],changedPointers:[t],pointerType:Pe,srcEvent:t}))}});var pn={pointerdown:w,pointermove:G,pointerup:_,pointercancel:x,pointerout:x},vn={2:ee,3:tn,4:Pe,5:nn},je="pointerdown",Je="pointermove pointerup pointercancel";c.MSPointerEvent&&!c.PointerEvent&&(je="MSPointerDown",Je="MSPointerMove MSPointerUp MSPointerCancel");function Oe(){this.evEl=je,this.evWin=Je,b.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}S(Oe,b,{handler:function(t){var n=this.store,i=!1,o=t.type.toLowerCase().replace("ms",""),l=pn[o],v=vn[t.pointerType]||t.pointerType,P=v==ee,O=Q(n,t.pointerId,"pointerId");l&w&&(t.button===0||P)?O<0&&(n.push(t),O=n.length-1):l&(_|x)&&(i=!0),!(O<0)&&(n[O]=t,this.callback(this.manager,l,{pointers:n,changedPointers:[t],pointerType:v,srcEvent:t}),i&&n.splice(O,1))}});var gn={touchstart:w,touchmove:G,touchend:_,touchcancel:x},Tn="touchstart",En="touchstart touchmove touchend touchcancel";function Qe(){this.evTarget=Tn,this.evWin=En,this.started=!1,b.apply(this,arguments)}S(Qe,b,{handler:function(t){var n=gn[t.type];if(n===w&&(this.started=!0),!!this.started){var i=Sn.call(this,t,n);n&(_|x)&&i[0].length-i[1].length==0&&(this.started=!1),this.callback(this.manager,n,{pointers:i[0],changedPointers:i[1],pointerType:ee,srcEvent:t})}}});function Sn(e,t){var n=de(e.touches),i=de(e.changedTouches);return t&(_|x)&&(n=Be(n.concat(i),"identifier",!0)),[n,i]}var yn={touchstart:w,touchmove:G,touchend:_,touchcancel:x},_n="touchstart touchmove touchend touchcancel";function ge(){this.evTarget=_n,this.targetIds={},b.apply(this,arguments)}S(ge,b,{handler:function(t){var n=yn[t.type],i=In.call(this,t,n);!i||this.callback(this.manager,n,{pointers:i[0],changedPointers:i[1],pointerType:ee,srcEvent:t})}});function In(e,t){var n=de(e.touches),i=this.targetIds;if(t&(w|G)&&n.length===1)return i[n[0].identifier]=!0,[n,n];var o,l,v=de(e.changedTouches),P=[],O=this.target;if(l=n.filter(function(A){return He(A.target,O)}),t===w)for(o=0;o<l.length;)i[l[o].identifier]=!0,o++;for(o=0;o<v.length;)i[v[o].identifier]&&P.push(v[o]),t&(_|x)&&delete i[v[o].identifier],o++;if(!!P.length)return[Be(l.concat(P),"identifier",!0),P]}var Cn=2500,Ke=25;function Me(){b.apply(this,arguments);var e=J(this.handler,this);this.touch=new ge(this.manager,e),this.mouse=new ve(this.manager,e),this.primaryTouch=null,this.lastTouches=[]}S(Me,b,{handler:function(t,n,i){var o=i.pointerType==ee,l=i.pointerType==Pe;if(!(l&&i.sourceCapabilities&&i.sourceCapabilities.firesTouchEvents)){if(o)Nn.call(this,n,i);else if(l&&Pn.call(this,i))return;this.callback(t,n,i)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});function Nn(e,t){e&w?(this.primaryTouch=t.changedPointers[0].identifier,et.call(this,t)):e&(_|x)&&et.call(this,t)}function et(e){var t=e.changedPointers[0];if(t.identifier===this.primaryTouch){var n={x:t.clientX,y:t.clientY};this.lastTouches.push(n);var i=this.lastTouches,o=function(){var l=i.indexOf(n);l>-1&&i.splice(l,1)};setTimeout(o,Cn)}}function Pn(e){for(var t=e.srcEvent.clientX,n=e.srcEvent.clientY,i=0;i<this.lastTouches.length;i++){var o=this.lastTouches[i],l=Math.abs(t-o.x),v=Math.abs(n-o.y);if(l<=Ke&&v<=Ke)return!0}return!1}var tt=ue(C.style,"touchAction"),nt=tt!==f,it="compute",rt="auto",we="manipulation",Z="none",oe="pan-x",se="pan-y",Te=On();function Ae(e,t){this.manager=e,this.set(t)}Ae.prototype={set:function(e){e==it&&(e=this.compute()),nt&&this.manager.element.style&&Te[e]&&(this.manager.element.style[tt]=e),this.actions=e.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var e=[];return d(this.manager.recognizers,function(t){Ne(t.options.enable,[t])&&(e=e.concat(t.getTouchAction()))}),Ln(e.join(" "))},preventDefaults:function(e){var t=e.srcEvent,n=e.offsetDirection;if(this.manager.session.prevented){t.preventDefault();return}var i=this.actions,o=z(i,Z)&&!Te[Z],l=z(i,se)&&!Te[se],v=z(i,oe)&&!Te[oe];if(o){var P=e.pointers.length===1,O=e.distance<2,A=e.deltaTime<250;if(P&&O&&A)return}if(!(v&&l)&&(o||l&&n&F||v&&n&$))return this.preventSrc(t)},preventSrc:function(e){this.manager.session.prevented=!0,e.preventDefault()}};function Ln(e){if(z(e,Z))return Z;var t=z(e,oe),n=z(e,se);return t&&n?Z:t||n?t?oe:se:z(e,we)?we:rt}function On(){if(!nt)return!1;var e={},t=c.CSS&&c.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(n){e[n]=t?c.CSS.supports("touch-action",n):!0}),e}var Ee=1,U=2,K=4,q=8,W=q,ae=16,H=32;function Y(e){this.options=g({},this.defaults,e||{}),this.id=Jt(),this.manager=null,this.options.enable=Fe(this.options.enable,!0),this.state=Ee,this.simultaneous={},this.requireFail=[]}Y.prototype={defaults:{},set:function(e){return g(this.options,e),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(e){if(M(e,"recognizeWith",this))return this;var t=this.simultaneous;return e=Se(e,this),t[e.id]||(t[e.id]=e,e.recognizeWith(this)),this},dropRecognizeWith:function(e){return M(e,"dropRecognizeWith",this)?this:(e=Se(e,this),delete this.simultaneous[e.id],this)},requireFailure:function(e){if(M(e,"requireFailure",this))return this;var t=this.requireFail;return e=Se(e,this),Q(t,e)===-1&&(t.push(e),e.requireFailure(this)),this},dropRequireFailure:function(e){if(M(e,"dropRequireFailure",this))return this;e=Se(e,this);var t=Q(this.requireFail,e);return t>-1&&this.requireFail.splice(t,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(e){return!!this.simultaneous[e.id]},emit:function(e){var t=this,n=this.state;function i(o){t.manager.emit(o,e)}n<q&&i(t.options.event+ot(n)),i(t.options.event),e.additionalEvent&&i(e.additionalEvent),n>=q&&i(t.options.event+ot(n))},tryEmit:function(e){if(this.canEmit())return this.emit(e);this.state=H},canEmit:function(){for(var e=0;e<this.requireFail.length;){if(!(this.requireFail[e].state&(H|Ee)))return!1;e++}return!0},recognize:function(e){var t=g({},e);if(!Ne(this.options.enable,[this,t])){this.reset(),this.state=H;return}this.state&(W|ae|H)&&(this.state=Ee),this.state=this.process(t),this.state&(U|K|q|ae)&&this.tryEmit(t)},process:function(e){},getTouchAction:function(){},reset:function(){}};function ot(e){return e&ae?"cancel":e&q?"end":e&K?"move":e&U?"start":""}function st(e){return e==re?"down":e==ie?"up":e==te?"left":e==ne?"right":""}function Se(e,t){var n=t.manager;return n?n.get(e):e}function R(){Y.apply(this,arguments)}S(R,Y,{defaults:{pointers:1},attrTest:function(e){var t=this.options.pointers;return t===0||e.pointers.length===t},process:function(e){var t=this.state,n=e.eventType,i=t&(U|K),o=this.attrTest(e);return i&&(n&x||!o)?t|ae:i||o?n&_?t|q:t&U?t|K:U:H}});function ye(){R.apply(this,arguments),this.pX=null,this.pY=null}S(ye,R,{defaults:{event:"pan",threshold:10,pointers:1,direction:Xe},getTouchAction:function(){var e=this.options.direction,t=[];return e&F&&t.push(se),e&$&&t.push(oe),t},directionTest:function(e){var t=this.options,n=!0,i=e.distance,o=e.direction,l=e.deltaX,v=e.deltaY;return o&t.direction||(t.direction&F?(o=l===0?fe:l<0?te:ne,n=l!=this.pX,i=Math.abs(e.deltaX)):(o=v===0?fe:v<0?ie:re,n=v!=this.pY,i=Math.abs(e.deltaY))),e.direction=o,n&&i>t.threshold&&o&t.direction},attrTest:function(e){return R.prototype.attrTest.call(this,e)&&(this.state&U||!(this.state&U)&&this.directionTest(e))},emit:function(e){this.pX=e.deltaX,this.pY=e.deltaY;var t=st(e.direction);t&&(e.additionalEvent=this.options.event+t),this._super.emit.call(this,e)}});function xe(){R.apply(this,arguments)}S(xe,R,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Z]},attrTest:function(e){return this._super.attrTest.call(this,e)&&(Math.abs(e.scale-1)>this.options.threshold||this.state&U)},emit:function(e){if(e.scale!==1){var t=e.scale<1?"in":"out";e.additionalEvent=this.options.event+t}this._super.emit.call(this,e)}});function ke(){Y.apply(this,arguments),this._timer=null,this._input=null}S(ke,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[rt]},process:function(e){var t=this.options,n=e.pointers.length===t.pointers,i=e.distance<t.threshold,o=e.deltaTime>t.time;if(this._input=e,!i||!n||e.eventType&(_|x)&&!o)this.reset();else if(e.eventType&w)this.reset(),this._timer=I(function(){this.state=W,this.tryEmit()},t.time,this);else if(e.eventType&_)return W;return H},reset:function(){clearTimeout(this._timer)},emit:function(e){this.state===W&&(e&&e.eventType&_?this.manager.emit(this.options.event+"up",e):(this._input.timeStamp=h(),this.manager.emit(this.options.event,this._input)))}});function De(){R.apply(this,arguments)}S(De,R,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Z]},attrTest:function(e){return this._super.attrTest.call(this,e)&&(Math.abs(e.rotation)>this.options.threshold||this.state&U)}});function be(){R.apply(this,arguments)}S(be,R,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:F|$,pointers:1},getTouchAction:function(){return ye.prototype.getTouchAction.call(this)},attrTest:function(e){var t=this.options.direction,n;return t&(F|$)?n=e.overallVelocity:t&F?n=e.overallVelocityX:t&$&&(n=e.overallVelocityY),this._super.attrTest.call(this,e)&&t&e.offsetDirection&&e.distance>this.options.threshold&&e.maxPointers==this.options.pointers&&p(n)>this.options.velocity&&e.eventType&_},emit:function(e){var t=st(e.offsetDirection);t&&this.manager.emit(this.options.event+t,e),this.manager.emit(this.options.event,e)}});function _e(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}S(_e,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[we]},process:function(e){var t=this.options,n=e.pointers.length===t.pointers,i=e.distance<t.threshold,o=e.deltaTime<t.time;if(this.reset(),e.eventType&w&&this.count===0)return this.failTimeout();if(i&&o&&n){if(e.eventType!=_)return this.failTimeout();var l=this.pTime?e.timeStamp-this.pTime<t.interval:!0,v=!this.pCenter||pe(this.pCenter,e.center)<t.posThreshold;this.pTime=e.timeStamp,this.pCenter=e.center,!v||!l?this.count=1:this.count+=1,this._input=e;var P=this.count%t.taps;if(P===0)return this.hasRequireFailures()?(this._timer=I(function(){this.state=W,this.tryEmit()},t.interval,this),U):W}return H},failTimeout:function(){return this._timer=I(function(){this.state=H},this.options.interval,this),H},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==W&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}});function X(e,t){return t=t||{},t.recognizers=Fe(t.recognizers,X.defaults.preset),new Ue(e,t)}X.VERSION="2.0.7",X.defaults={domEvents:!1,touchAction:it,enable:!0,inputTarget:null,inputClass:null,preset:[[De,{enable:!1}],[xe,{enable:!1},["rotate"]],[be,{direction:F}],[ye,{direction:F},["swipe"]],[_e],[_e,{event:"doubletap",taps:2},["tap"]],[ke]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var Mn=1,at=2;function Ue(e,t){this.options=g({},X.defaults,t||{}),this.options.inputTarget=this.options.inputTarget||e,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=e,this.input=on(this),this.touchAction=new Ae(this,this.options.touchAction),lt(this,!0),d(this.options.recognizers,function(n){var i=this.add(new n[0](n[1]));n[2]&&i.recognizeWith(n[2]),n[3]&&i.requireFailure(n[3])},this)}Ue.prototype={set:function(e){return g(this.options,e),e.touchAction&&this.touchAction.update(),e.inputTarget&&(this.input.destroy(),this.input.target=e.inputTarget,this.input.init()),this},stop:function(e){this.session.stopped=e?at:Mn},recognize:function(e){var t=this.session;if(!t.stopped){this.touchAction.preventDefaults(e);var n,i=this.recognizers,o=t.curRecognizer;(!o||o&&o.state&W)&&(o=t.curRecognizer=null);for(var l=0;l<i.length;)n=i[l],t.stopped!==at&&(!o||n==o||n.canRecognizeWith(o))?n.recognize(e):n.reset(),!o&&n.state&(U|K|q)&&(o=t.curRecognizer=n),l++}},get:function(e){if(e instanceof Y)return e;for(var t=this.recognizers,n=0;n<t.length;n++)if(t[n].options.event==e)return t[n];return null},add:function(e){if(M(e,"add",this))return this;var t=this.get(e.options.event);return t&&this.remove(t),this.recognizers.push(e),e.manager=this,this.touchAction.update(),e},remove:function(e){if(M(e,"remove",this))return this;if(e=this.get(e),e){var t=this.recognizers,n=Q(t,e);n!==-1&&(t.splice(n,1),this.touchAction.update())}return this},on:function(e,t){if(e!==f&&t!==f){var n=this.handlers;return d(he(e),function(i){n[i]=n[i]||[],n[i].push(t)}),this}},off:function(e,t){if(e!==f){var n=this.handlers;return d(he(e),function(i){t?n[i]&&n[i].splice(Q(n[i],t),1):delete n[i]}),this}},emit:function(e,t){this.options.domEvents&&wn(e,t);var n=this.handlers[e]&&this.handlers[e].slice();if(!(!n||!n.length)){t.type=e,t.preventDefault=function(){t.srcEvent.preventDefault()};for(var i=0;i<n.length;)n[i](t),i++}},destroy:function(){this.element&&lt(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}};function lt(e,t){var n=e.element;if(!!n.style){var i;d(e.options.cssProps,function(o,l){i=ue(n.style,l),t?(e.oldCssProps[i]=n.style[i],n.style[i]=o):n.style[i]=e.oldCssProps[i]||""}),t||(e.oldCssProps={})}}function wn(e,t){var n=m.createEvent("Event");n.initEvent(e,!0,!0),n.gesture=t,t.target.dispatchEvent(n)}g(X,{INPUT_START:w,INPUT_MOVE:G,INPUT_END:_,INPUT_CANCEL:x,STATE_POSSIBLE:Ee,STATE_BEGAN:U,STATE_CHANGED:K,STATE_ENDED:q,STATE_RECOGNIZED:W,STATE_CANCELLED:ae,STATE_FAILED:H,DIRECTION_NONE:fe,DIRECTION_LEFT:te,DIRECTION_RIGHT:ne,DIRECTION_UP:ie,DIRECTION_DOWN:re,DIRECTION_HORIZONTAL:F,DIRECTION_VERTICAL:$,DIRECTION_ALL:Xe,Manager:Ue,Input:b,TouchAction:Ae,TouchInput:ge,MouseInput:ve,PointerEventInput:Oe,TouchMouseInput:Me,SingleTouchInput:Qe,Recognizer:Y,AttrRecognizer:R,Tap:_e,Pan:ye,Swipe:be,Pinch:xe,Rotate:De,Press:ke,on:le,off:ce,each:d,merge:k,extend:N,assign:g,inherit:S,bindFn:J,prefixed:ue});var An=typeof c!="undefined"?c:typeof self!="undefined"?self:{};An.Hammer=X,typeof f=="function"&&f.amd?f(function(){return X}):a.exports?a.exports=X:c[u]=X})(window,document,"Hammer")})(Ve);var Tt=Ve.exports;function Et(){r.onMounted(()=>{const a=r.getCurrentInstance();new Tt(a.proxy.$el,{}).on("swipe",m=>{m.deltaX<0?a.proxy.nextSlide():a.proxy.previousSlide()})})}function St(a){function c(u){var f;((f=u.mediaElm)==null?void 0:f.play)&&(u.mediaElm.play(),setTimeout(()=>{u.mediaElm.paused&&u.elm.querySelector(".play-button").classList.add("show")},50))}function m(u){var f,y;(y=(f=u.mediaElm)==null?void 0:f.pause)==null||y.call(f)}return a.on("newSlideLoaded",c),a.on("unloadSlide",m),{playVideo:c}}const yt={xmlns:"http://www.w3.org/2000/svg",width:"310",height:"270",viewBox:"0 0 82.021 71.438"},_t=[r.createElementVNode("path",{style:{fill:"none",stroke:"#000","stroke-width":".264583px","stroke-linecap":"butt","stroke-linejoin":"miter","stroke-opacity":"1"},d:"M-136.94-67.294c18.018 45.581-1.094 25.217 4.344 22.858 5.438-2.36 17.599 67.312 17.599 67.312"},null,-1),r.createElementVNode("path",{style:{fill:"#000","fill-opacity":"1",stroke:"none","stroke-width":".264583px","stroke-linecap":"butt","stroke-linejoin":"miter","stroke-opacity":"1"},d:"M10.583 44.98V10.582h60.854V44.98H58.208V29.104L31.75 50.271l26.458 21.166V55.563h23.813V0H0v55.563h23.812V44.978Z"},null,-1)];function It(a,c){return r.openBlock(),r.createElementBlock("svg",yt,_t)}var Ct={render:It};const Nt={viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg",stroke:"#fff"},Pt=[r.createElementVNode("g",{transform:"translate(1 1)","stroke-width":"2",fill:"none","fill-rule":"evenodd"},[r.createElementVNode("circle",{"stroke-opacity":".5",cx:"18",cy:"18",r:"18"}),r.createElementVNode("path",{d:"M36 18c0-9.94-8.06-18-18-18"},[r.createElementVNode("animateTransform",{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"1s",repeatCount:"indefinite"})])],-1)];function Lt(a,c){return r.openBlock(),r.createElementBlock("svg",Nt,Pt)}var Re={render:Lt},Rn="",Ot=(a,c)=>{for(const[m,u]of c)a[m]=u;return a};const Mt={name:"BigShot",components:{RepeatIcon:Ct,SpinnerIcon:Re},props:{slideData:{type:Array,default:()=>[]},rememberScale:{type:String,default:""},beforeSlideChangeHook:{type:Function,default:()=>()=>{}},plugins:{type:Array,default:()=>[]}},setup(a){const c=E();Et();const m=r.ref(!1),C=mt(a,c,m),{slides:u,currentSlideIndex:f}=C,y=ft(C,["slides","currentSlideIndex"]);return j(j(j(j(j({SpinnerIcon:Re,slides:u,currentSlideIndex:f},y),pt(a,u,f,c)),vt(c,m)),gt(a,c)),St(c))},watch:{notLoadedSlides:{handler(){for(const a of this.notLoadedSlides)a.elm=null,a.mediaElm=null,a.elmStyle=null,a.elmClasses=null},deep:!0}},created(){window.addEventListener("keydown",this.keyDownListener),window.addEventListener("resize",this.resizeWindowListener),window.addEventListener("orientationchange",this.resizeWindowListener)},methods:{wrapIndex(a){return a>=0?a%this.numOfSlides:(a%this.numOfSlides+this.numOfSlides)%this.numOfSlides},keyDownListener(a){a.key==="ArrowLeft"?this.previousSlide():a.key==="ArrowRight"?this.nextSlide():a.key==="Escape"&&this.closeSlideShow()},resizeWindowListener(){for(const a of this.loadedSlides){const c=this.naturalSlideSizeBiggerThanContainer(a);a.biggerThanContainer!==c&&(a.biggerThanContainer=c,a.scale=this.getInitialScale(a,!0))}this.positionLoadedSlide(this.currentSlide),this.positionAllLoadedSlides()}}},Ce=a=>(r.pushScopeId("data-v-36c5d978"),a=a(),r.popScopeId(),a),wt={ref:"container",class:"container"},At={class:"topbar"},xt={class:"left-side"},kt={key:0},Dt={class:"center"},bt={class:"right-side"},Ut=["src"],Vt=["data-slide-index"],Rt={key:0,class:"media media-status"},Ft=[Ce(()=>r.createElementVNode("span",null,"Failed to load media",-1))],Ht=["src"],Bt=["src"],Wt=["onClick"],Yt=[Ce(()=>r.createElementVNode("span",null,"\u25B6",-1))],Xt={class:"slide-status-indicator"},qt={class:"container loop-indicator"},zt={class:"container loading-indicator"},Gt=Ce(()=>r.createElementVNode("div",{class:"bottom-bar"},null,-1));function $t(a,c,m,u,f,y){var s,p;const C=r.resolveComponent("RepeatIcon"),D=r.resolveComponent("SpinnerIcon");return r.openBlock(),r.createElementBlock("div",wt,[r.createElementVNode("div",At,[r.createElementVNode("div",xt,[u.currentSlideIndex!==null?(r.openBlock(),r.createElementBlock("div",kt,r.toDisplayString(u.currentSlideIndex+1)+" / "+r.toDisplayString(a.numOfSlides),1)):r.createCommentVNode("",!0)]),r.createElementVNode("div",Dt,[(r.openBlock(!0),r.createElementBlock(r.Fragment,null,r.renderList((s=m.plugins)==null?void 0:s.filter(h=>h.topbarIcon),h=>(r.openBlock(),r.createBlock(r.resolveDynamicComponent(h.topbarCenterContent),r.mergeProps({key:h.name},h.topbarCenterContentProps,{"current-slide":a.currentSlide}),null,16,["current-slide"]))),128))]),r.createElementVNode("div",bt,[r.createElementVNode("button",{class:"close-button",onClick:c[0]||(c[0]=(...h)=>a.closeSlideShow&&a.closeSlideShow(...h))}," X "),(r.openBlock(!0),r.createElementBlock(r.Fragment,null,r.renderList((p=m.plugins)==null?void 0:p.filter(h=>h.topbarIcon),h=>(r.openBlock(),r.createElementBlock("div",{key:h.name,class:"plugin"},[h.topbarIcon&&typeof h.topbarIcon=="string"?(r.openBlock(),r.createElementBlock("img",{key:0,src:h.topbarIcon,class:"icon"},null,8,Ut)):(r.openBlock(),r.createBlock(r.resolveDynamicComponent(h.topbarIcon),{key:1,class:"icon"}))]))),128))])]),(r.openBlock(!0),r.createElementBlock(r.Fragment,null,r.renderList(a.loadedSlides,h=>(r.openBlock(),r.createElementBlock("div",{key:h.id,ref:`slide-${h.id}`,class:r.normalizeClass(["slide",{current:h.index===u.currentSlideIndex,positioned:h.elmStyle&&h.elmStyle.transform||h.mediaLoadingFailed},a.nextToggledScaleModeZoomDirection(h)&&`zoom-${a.nextToggledScaleModeZoomDirection(h)}`,h.elmClasses]),"data-slide-index":h.index},[h.mediaLoadingFailed?(r.openBlock(),r.createElementBlock("div",Rt,Ft)):h.type==="image"?(r.openBlock(),r.createElementBlock("img",{key:1,src:h.data.src,class:"media",style:r.normalizeStyle(h.elmStyle)},null,12,Ht)):h.type==="video"?(r.openBlock(),r.createElementBlock(r.Fragment,{key:2},[r.createElementVNode("video",{class:"media",style:r.normalizeStyle(h.elmStyle),playsinline:""},[r.createElementVNode("source",{src:h.data.src},null,8,Bt)],4),r.createElementVNode("button",{class:"play-button",onClick:()=>a.playVideo(h)},Yt,8,Wt)],64)):r.createCommentVNode("",!0)],10,Vt))),128)),r.createElementVNode("div",Xt,[r.createElementVNode("div",qt,[r.createVNode(C,{class:"icon"})]),r.createElementVNode("div",zt,[r.createVNode(D,{class:"icon"})])]),Gt],512)}var Zt=Ot(Mt,[["render",$t],["__scopeId","data-v-36c5d978"]]);return Zt});
(function(){ try {var elementStyle = document.createElement('style'); elementStyle.innerText = `.container[data-v-36c5d978]{position:absolute;top:0;bottom:0;left:0;right:0;background:black;color:#fff;overflow:hidden;text-align:initial;font-family:sans-serif;z-index:10}.container .topbar[data-v-36c5d978]{background-color:#0000004d;position:absolute;left:0;top:0;height:44px;width:100%;opacity:75%;font-size:13px;display:flex;justify-content:space-between;align-items:center;z-index:1;padding:2px 20px;box-sizing:border-box}.container .topbar>*[data-v-36c5d978]{flex:0 1 auto;flex-direction:row-reverse}.container .topbar button[data-v-36c5d978]{color:#fff;background:none;border:none}.container .topbar .plugin .icon[data-v-36c5d978]{height:100%;max-width:3em;padding:10px;box-sizing:border-box}.container .topbar .center[data-v-36c5d978]{align-self:flex-start}.container .topbar .right-side[data-v-36c5d978]{display:flex;height:100%}.container .topbar .right-side>*[data-v-36c5d978]{flex:0 1 auto}.container .topbar .right-side>* svg[data-v-36c5d978]{width:fit-content}.container .slide[data-v-36c5d978]{height:100%;width:100%;overflow:hidden}.container .slide .play-button[data-v-36c5d978]{left:0;right:0;margin:auto;top:0;bottom:0;height:80px;width:80px;position:absolute;background-color:#fff;border:none;font-size:40px;color:#000;border-radius:40px;visibility:hidden;transform:scale(.5);opacity:0%}.container .slide .play-button span[data-v-36c5d978]{transform:translateY(-3px) translate(3px);display:inline-block;transition:transform .3s}.container .slide .play-button:hover span[data-v-36c5d978]{transform:translateY(-3px) translate(10px)}.container .slide .play-button.show[data-v-36c5d978]{visibility:visible;transform:scale(1);opacity:100%;transition:transform .2s,opacity .2s}.container .slide .media-status[data-v-36c5d978]{height:100%;display:flex;justify-content:center;align-items:center;font-size:3em;font-weight:bold;color:#d7a039}.container .slide.animate-zoom .media[data-v-36c5d978]{transition:transform .2s}.container .slide.zoom-in .media[data-v-36c5d978]{cursor:zoom-in}.container .slide.zoom-out .media[data-v-36c5d978]{cursor:zoom-out}.container .slide[data-v-36c5d978]:not(.current),.container .slide[data-v-36c5d978]:not(.positioned){display:none}.container .slide-status-indicator .container[data-v-36c5d978]{left:0;right:0;margin:auto;top:0;bottom:0;height:100px;width:100px;position:absolute;background-color:#0009;border:none;font-size:70px;color:#fff;line-height:100px;text-align:center;visibility:hidden;transform:scale(.3);pointer-events:none;opacity:80%}.container .slide-status-indicator .container .icon[data-v-36c5d978]{display:inline-block;height:1em;width:1em}.container .slide-status-indicator .container.loading-indicator[data-v-36c5d978]{display:flex;justify-content:center;align-items:center}.container .slide-status-indicator .container.loading-indicator .icon[data-v-36c5d978]{width:70%;height:70%}.container .slide-status-indicator .container.loading-indicator.animate[data-v-36c5d978]{visibility:visible;transform:scale(1);transition:transform 1s,opacity 4s 1s,visibility 0s .2s}.container .slide-status-indicator .container.loop-indicator .icon[data-v-36c5d978]{vertical-align:-.2em}.container .slide-status-indicator .container.loop-indicator .icon[data-v-36c5d978] path{fill:#fff!important}.container .slide-status-indicator .container.loop-indicator.animate[data-v-36c5d978]{visibility:visible;transform:scale(1);opacity:0%;transition:transform 1s,opacity 4s 1s,visibility 0s .2s}
`; document.head.appendChild(elementStyle);} catch(e) {console.error(e, 'vite-plugin-css-injected-by-js: can\'t add the style.');} })();