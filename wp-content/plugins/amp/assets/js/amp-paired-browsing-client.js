(()=>{"use strict";var e={n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})}};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),e.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);const t=window.wp.domReady;var n=e.n(t);const{parent:o,ampPairedBrowsingClientData:a}=window,{ampUrl:r,nonAmpUrl:i,isAmpDocument:c}=a,s=new URL(i);function d(){if(document.documentElement.style.setProperty("scroll-behavior","auto","important"),c){const e=document.getElementById("wp-admin-bar-amp-paired-browsing");e&&e.remove();const t=document.getElementById("wp-admin-bar-amp-view");t&&t.remove()}else document.getElementById("wp-admin-bar-amp").remove()}function l(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};e.postMessage({type:t,...n,ampPairedBrowsing:!0},s.origin)}let m=!1;function p(){l(o,"scroll",{x:window.scrollX,y:window.scrollY})}function u(e){const t=e.target,n=t.matches("[href]")?t:t.closest("[href]");n&&l(o,"navigate",{href:n.href})}function w(){l(o,"heartbeat")}e.g.addEventListener("message",(function(t){if(t.data&&t.data.ampPairedBrowsing&&t.data.type&&t.source&&s.origin===t.origin)switch(t.data.type){case"init":m||(m=!0,w(),setInterval(w,500),e.g.document.addEventListener("click",u,{passive:!0}),e.g.addEventListener("scroll",p,{passive:!0}),n()(d),l(o,"loaded",{isAmpDocument:c,ampUrl:r,nonAmpUrl:i,documentTitle:document.title}));break;case"scroll":!function(e){let{x:t,y:n}=e;window.scrollTo(t,n)}(t.data);break;case"replaceLocation":!function(e){let{href:t}=e;window.location.replace(t)}(t.data)}}))})();