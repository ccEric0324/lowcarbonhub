(()=>{"use strict";var e={};function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function i(e,i,n){return(i=function(e){var i=function(e,i){if("object"!==t(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==t(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===t(i)?i:String(i)}(i))in e?Object.defineProperty(e,i,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[i]=n,e}e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();const n=window.wp.url,{ampPairedBrowsingAppData:r,history:s}=window,{noampQueryVar:o,noampMobile:a,ampPairedBrowsingQueryVar:m,documentTitlePrefix:c}=r;window.pairedBrowsingApp=new class{constructor(){i(this,"disconnectedClient",void 0),i(this,"ampIframe",void 0),i(this,"ampHeartbeatTimestamp",Date.now()),i(this,"nonAmpIframe",void 0),i(this,"nonAmpHeartbeatTimestamp",Date.now()),i(this,"currentAmpUrl",void 0),i(this,"initialAmpUrlObject",void 0),i(this,"navigateAmpUrl",void 0),i(this,"currentNonAmpUrl",void 0),i(this,"initialNonAmpUrlObject",void 0),i(this,"navigateNonAmpUrl",void 0),i(this,"nonAmpLink",void 0),i(this,"ampLink",void 0),i(this,"activeIframe",void 0),this.nonAmpIframe=document.querySelector("#non-amp iframe"),this.ampIframe=document.querySelector("#amp iframe"),this.currentNonAmpUrl=this.nonAmpIframe.src,this.initialNonAmpUrlObject=new URL(this.currentNonAmpUrl),this.currentAmpUrl=this.ampIframe.src,this.initialAmpUrlObject=new URL(this.currentNonAmpUrl),this.nonAmpLink=document.getElementById("non-amp-link"),this.ampLink=document.getElementById("amp-link"),this.disconnectOverlay=document.querySelector(".disconnect-overlay"),this.disconnectButtons={exit:document.querySelector(".disconnect-overlay .button.exit"),goBack:document.querySelector(".disconnect-overlay .button.go-back")},this.addDisconnectButtonListeners(),e.g.addEventListener("message",(e=>{this.receiveMessage(e)})),document.getElementById("non-amp").addEventListener("mouseenter",(()=>{this.activeIframe=this.nonAmpIframe})),document.getElementById("amp").addEventListener("mouseenter",(()=>{this.activeIframe=this.ampIframe})),Promise.all(this.getIframeLoadedPromises()).then((()=>{setInterval((()=>{this.checkConnectedClients()}),100)}))}isAmpWindow(e){return e===this.ampIframe.contentWindow}isNonAmpWindow(e){return e===this.nonAmpIframe.contentWindow}sendMessage(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};e.postMessage({type:t,...i,ampPairedBrowsing:!0},this.isAmpWindow(e)?this.currentAmpUrl:this.currentNonAmpUrl)}receiveMessage(e){if(e.data&&e.data.type&&e.data.ampPairedBrowsing&&e.source&&[this.initialNonAmpUrlObject.origin,this.initialAmpUrlObject.origin].includes(e.origin)&&(this.isAmpWindow(e.source)||this.isNonAmpWindow(e.source)))switch(e.data.type){case"loaded":this.receiveLoaded(e.data,e.source);break;case"scroll":this.receiveScroll(e.data,e.source);break;case"heartbeat":this.receiveHeartbeat(e.source);break;case"navigate":this.receiveNavigate(e.data,e.source)}}getIframeLoadedPromises(){return[new Promise((e=>{this.nonAmpIframe.addEventListener("load",e)})),new Promise((e=>{this.ampIframe.addEventListener("load",e)}))]}receiveHeartbeat(e){this.isAmpWindow(e)?this.ampHeartbeatTimestamp=Date.now():this.nonAmpHeartbeatTimestamp=Date.now()}receiveNavigate(e,t){let{href:i}=e;this.isAmpWindow(t)?this.navigateAmpUrl=i:this.navigateNonAmpUrl=i}checkConnectedClients(){this.sendMessage(this.ampIframe.contentWindow,"init"),this.sendMessage(this.nonAmpIframe.contentWindow,"init"),this.isClientConnected(this.ampIframe)?this.isClientConnected(this.nonAmpIframe)?this.disconnectOverlay.classList.remove("disconnected"):this.showDisconnectOverlay(this.nonAmpIframe):this.showDisconnectOverlay(this.ampIframe)}addDisconnectButtonListeners(){this.disconnectButtons.goBack.addEventListener("click",(()=>{window.history.back()}))}showDisconnectOverlay(e){const t=this.ampIframe===e?this.navigateAmpUrl:this.navigateNonAmpUrl;t?(this.disconnectButtons.exit.hidden=!1,this.disconnectButtons.exit.href=t):this.disconnectButtons.exit.hidden=!0,this.disconnectButtons.goBack.hidden=0>=window.history.length,this.disconnectOverlay.classList.toggle("amp",this.ampIframe===e),this.disconnectOverlay.classList.add("disconnected")}isClientConnected(e){return e===this.ampIframe?Date.now()-this.ampHeartbeatTimestamp<2e3:Date.now()-this.nonAmpHeartbeatTimestamp<2e3}purgeRemovableQueryVars(e){return(0,n.removeQueryArgs)(e,o,m)}addPairedBrowsingQueryVar(e){return(0,n.addQueryArgs)(e,{[m]:"1"})}removeUrlHash(e){const t=new URL(e);return t.hash="",t.href}replaceLocation(e,t){this.sendMessage(e.contentWindow,"replaceLocation",{href:t})}receiveScroll(e,t){let{x:i,y:n}=e;if(this.activeIframe||(this.activeIframe=this.isAmpWindow(t)?this.ampIframe:this.nonAmpIframe),!this.activeIframe||t!==this.activeIframe.contentWindow)return;const r=this.isAmpWindow(t)?this.nonAmpIframe.contentWindow:this.ampIframe.contentWindow;this.sendMessage(r,"scroll",{x:i,y:n})}receiveLoaded(e,t){let{isAmpDocument:i,ampUrl:r,nonAmpUrl:m,documentTitle:h}=e;const d=this.isAmpWindow(t),p=d?this.ampIframe:this.nonAmpIframe;if(d){if(!i)return void this.replaceLocation(p,r);this.currentAmpUrl=r,this.ampLink.href=(0,n.removeQueryArgs)(r,o)}else{if(i)return void this.replaceLocation(p,m);this.currentNonAmpUrl=m,this.nonAmpLink.href=(0,n.addQueryArgs)(m,{[o]:a})}const l=d?m:r,u=d?this.currentNonAmpUrl:this.currentAmpUrl;if(this.purgeRemovableQueryVars(this.removeUrlHash(l))===this.purgeRemovableQueryVars(this.removeUrlHash(u)))document.title=c+" "+h,s.replaceState({},"",this.addPairedBrowsingQueryVar(this.purgeRemovableQueryVars(m)));else{const e=d?m:r;this.replaceLocation(d?this.nonAmpIframe:this.ampIframe,this.purgeRemovableQueryVars(e))}}}})();