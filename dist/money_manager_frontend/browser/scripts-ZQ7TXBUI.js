/*! alertifyjs - v1.14.0 - Mohammad Younes <Mohammad@alertifyjs.com> (http://alertifyjs.com) */(function(N){"use strict";function g(i,m){i.className+=" "+m}function k(i,m){for(var a=i.className.split(" "),r=m.split(" "),o=0;o<r.length;o+=1){var u=a.indexOf(r[o]);u>-1&&a.splice(u,1)}i.className=a.join(" ")}function Ee(){return N.getComputedStyle(document.body).direction==="rtl"}function pe(){return document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop}function ve(){return document.documentElement&&document.documentElement.scrollLeft||document.body.scrollLeft}function U(i){for(;i.lastChild;)i.removeChild(i.lastChild)}function Q(i){return Object.prototype.toString.call(i)==="[object String]"}function te(i){if(i===null)return i;var m;if(Array.isArray(i)){m=[];for(var a=0;a<i.length;a+=1)m.push(te(i[a]));return m}if(i instanceof Date)return new Date(i.getTime());if(i instanceof RegExp)return m=new RegExp(i.source),m.global=i.global,m.ignoreCase=i.ignoreCase,m.multiline=i.multiline,m.lastIndex=i.lastIndex,m;if(typeof i=="object"){m={};for(var r in i)i.hasOwnProperty(r)&&(m[r]=te(i[r]));return m}return i}function Me(i,m){if(i.elements){var a=i.elements.root;a.parentNode.removeChild(a),delete i.elements,i.settings=te(i.__settings),i.__init=m,delete i.__internal}}function I(i,m){return function(){if(arguments.length>0){for(var a=[],r=0;r<arguments.length;r+=1)a.push(arguments[r]);return a.push(i),m.apply(i,a)}return m.apply(i,[null,i])}}function je(i,m){return{index:i,button:m,cancel:!1}}function E(i,m){if(typeof m.get(i)=="function")return m.get(i).call(m)}function $e(){function i(o,u){for(var d in u)u.hasOwnProperty(d)&&(o[d]=u[d]);return o}function m(o){var u=r[o].dialog;return u&&typeof u.__init=="function"&&u.__init(u),u}function a(o,u,d,w){var h={dialog:null,factory:u};return w!==void 0&&(h.factory=function(){return i(new r[w].factory,new u)}),d||(h.dialog=i(new h.factory,Le)),r[o]=h}var r={};return{defaults:K,dialog:function(o,u,d,w){if(typeof u!="function")return m(o);if(this.hasOwnProperty(o))throw new Error("alertify.dialog: name already exists");var h=a(o,u,d,w);this[o]=d?function(){if(arguments.length===0)return h.dialog;var H=i(new h.factory,Le);return H&&typeof H.__init=="function"&&H.__init(H),H.main.apply(H,arguments),H.show.apply(H)}:function(){if(h.dialog&&typeof h.dialog.__init=="function"&&h.dialog.__init(h.dialog),arguments.length===0)return h.dialog;var H=h.dialog;return H.main.apply(h.dialog,arguments),H.show.apply(h.dialog)}},closeAll:function(o){for(var u=O.slice(0),d=0;d<u.length;d+=1){var w=u[d];o!==void 0&&o===w||w.close()}},setting:function(o,u,d){if(o==="notifier")return P.setting(u,d);var w=m(o);return w?w.setting(u,d):void 0},set:function(o,u,d){return this.setting(o,u,d)},get:function(o,u){return this.setting(o,u)},notify:function(o,u,d,w){return P.create(u,w).push(o,d)},message:function(o,u,d){return P.create(null,d).push(o,u)},success:function(o,u,d){return P.create("success",d).push(o,u)},error:function(o,u,d){return P.create("error",d).push(o,u)},warning:function(o,u,d){return P.create("warning",d).push(o,u)},dismissAll:function(){P.dismissAll()}}}var Ne=":not(:disabled):not(.ajs-reset)",A={ENTER:13,ESC:27,F1:112,F12:123,LEFT:37,RIGHT:39,TAB:9},K={autoReset:!0,basic:!1,closable:!0,closableByDimmer:!0,invokeOnCloseOff:!1,frameless:!1,defaultFocusOff:!1,maintainFocus:!0,maximizable:!0,modal:!0,movable:!0,moveBounded:!1,overflow:!0,padding:!0,pinnable:!0,pinned:!0,preventBodyShift:!1,resizable:!0,startMaximized:!1,transition:"pulse",transitionOff:!1,tabbable:["button","[href]","input","select","textarea",'[tabindex]:not([tabindex^="-"])'+Ne].join(Ne+","),notifier:{delay:5,position:"bottom-right",closeButton:!1,classes:{base:"alertify-notifier",prefix:"ajs-",message:"ajs-message",top:"ajs-top",right:"ajs-right",bottom:"ajs-bottom",left:"ajs-left",center:"ajs-center",visible:"ajs-visible",hidden:"ajs-hidden",close:"ajs-close"}},glossary:{title:"AlertifyJS",ok:"OK",cancel:"Cancel",acccpt:"Accept",deny:"Deny",confirm:"Confirm",decline:"Decline",close:"Close",maximize:"Maximize",restore:"Restore"},theme:{input:"ajs-input",ok:"ajs-ok",cancel:"ajs-cancel"},hooks:{preinit:function(){},postinit:function(){}}},O=[],ge=!1;try{var ne=Object.defineProperty({},"passive",{get:function(){ge=!0}});N.addEventListener("test",ne,ne),N.removeEventListener("test",ne,ne)}catch{}var T=function(i,m,a,r,o){i.addEventListener(m,a,ge?{capture:r,passive:o}:r===!0)},z=function(i,m,a,r,o){i.removeEventListener(m,a,ge?{capture:r,passive:o}:r===!0)},X=function(){var i,m,a=!1,r={animation:"animationend",OAnimation:"oAnimationEnd oanimationend",msAnimation:"MSAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"};for(i in r)if(document.documentElement.style[i]!==void 0){m=r[i],a=!0;break}return{type:m,supported:a}}(),Le=function(){function i(e){if(!e.__internal){x.defaults.hooks.preinit(e),delete e.__init,e.__settings||(e.__settings=te(e.settings));var t;typeof e.setup=="function"?(t=e.setup(),t.options=t.options||{},t.focus=t.focus||{}):t={buttons:[],focus:{element:null,select:!1},options:{}},typeof e.hooks!="object"&&(e.hooks={});var s=[];if(Array.isArray(t.buttons))for(var n=0;n<t.buttons.length;n+=1){var f=t.buttons[n],p={};for(var b in f)f.hasOwnProperty(b)&&(p[b]=f[b]);s.push(p)}var _=e.__internal={isOpen:!1,activeElement:document.body,timerIn:void 0,timerOut:void 0,buttons:s,focus:t.focus,options:{title:void 0,modal:void 0,basic:void 0,frameless:void 0,defaultFocusOff:void 0,pinned:void 0,movable:void 0,moveBounded:void 0,resizable:void 0,autoReset:void 0,closable:void 0,closableByDimmer:void 0,invokeOnCloseOff:void 0,maximizable:void 0,startMaximized:void 0,pinnable:void 0,transition:void 0,transitionOff:void 0,padding:void 0,overflow:void 0,onshow:void 0,onclosing:void 0,onclose:void 0,onfocus:void 0,onmove:void 0,onmoved:void 0,onresize:void 0,onresized:void 0,onmaximize:void 0,onmaximized:void 0,onrestore:void 0,onrestored:void 0},resetHandler:void 0,beginMoveHandler:void 0,beginResizeHandler:void 0,bringToFrontHandler:void 0,modalClickHandler:void 0,buttonsClickHandler:void 0,commandsClickHandler:void 0,transitionInHandler:void 0,transitionOutHandler:void 0,destroy:void 0},l={};l.root=document.createElement("div"),l.root.style.display="none",l.root.className=c.base+" "+c.hidden+" ",l.root.innerHTML=L.dimmer+L.modal,l.dimmer=l.root.firstChild,l.modal=l.root.lastChild,l.modal.innerHTML=L.dialog,l.dialog=l.modal.firstChild,l.dialog.innerHTML=L.reset+L.commands+L.header+L.body+L.footer+L.resizeHandle+L.reset,l.reset=[],l.reset.push(l.dialog.firstChild),l.reset.push(l.dialog.lastChild),l.commands={},l.commands.container=l.reset[0].nextSibling,l.commands.pin=l.commands.container.firstChild,l.commands.maximize=l.commands.pin.nextSibling,l.commands.close=l.commands.maximize.nextSibling,l.header=l.commands.container.nextSibling,l.body=l.header.nextSibling,l.body.innerHTML=L.content,l.content=l.body.firstChild,l.footer=l.body.nextSibling,l.footer.innerHTML=L.buttons.auxiliary+L.buttons.primary,l.resizeHandle=l.footer.nextSibling,l.buttons={},l.buttons.auxiliary=l.footer.firstChild,l.buttons.primary=l.buttons.auxiliary.nextSibling,l.buttons.primary.innerHTML=L.button,l.buttonTemplate=l.buttons.primary.firstChild,l.buttons.primary.removeChild(l.buttonTemplate);for(var B=0;B<e.__internal.buttons.length;B+=1){var j=e.__internal.buttons[B];le.indexOf(j.key)<0&&le.push(j.key),j.element=l.buttonTemplate.cloneNode(),j.element.innerHTML=j.text,typeof j.className=="string"&&j.className!==""&&g(j.element,j.className);for(var he in j.attrs)he!=="className"&&j.attrs.hasOwnProperty(he)&&j.element.setAttribute(he,j.attrs[he]);j.scope==="auxiliary"?l.buttons.auxiliary.appendChild(j.element):l.buttons.primary.appendChild(j.element)}e.elements=l,_.resetHandler=I(e,xe),_.beginMoveHandler=I(e,ut),_.beginResizeHandler=I(e,dt),_.bringToFrontHandler=I(e,v),_.modalClickHandler=I(e,it),_.buttonsClickHandler=I(e,st),_.commandsClickHandler=I(e,ye),_.transitionInHandler=I(e,ot),_.transitionOutHandler=I(e,lt);for(var D in _.options)t.options[D]!==void 0?e.set(D,t.options[D]):x.defaults.hasOwnProperty(D)?e.set(D,x.defaults[D]):D==="title"&&e.set(D,x.defaults.glossary[D]);typeof e.build=="function"&&e.build(),x.defaults.hooks.postinit(e)}document.body.appendChild(e.elements.root)}function m(){Ge=ve(),Z=pe()}function a(){N.scrollTo(Ge,Z)}function r(){for(var e=0,t=0;t<O.length;t+=1){var s=O[t];(s.isModal()||s.isMaximized())&&(e+=1)}e===0&&document.body.className.indexOf(c.noOverflow)>=0?(k(document.body,c.noOverflow),o(!1)):e>0&&document.body.className.indexOf(c.noOverflow)<0&&(o(!0),g(document.body,c.noOverflow))}function o(e){x.defaults.preventBodyShift&&(e&&document.documentElement.scrollHeight>document.documentElement.clientHeight?(Ve=Z,Je=N.getComputedStyle(document.body).top,g(document.body,c.fixed),document.body.style.top=-Z+"px"):e||(Z=Ve,document.body.style.top=Je,k(document.body,c.fixed),a()))}function u(e,t,s){Q(s)&&k(e.elements.root,c.prefix+s),g(e.elements.root,c.prefix+t),we=e.elements.root.offsetWidth}function d(e){e.get("transitionOff")?g(e.elements.root,c.noTransition):k(e.elements.root,c.noTransition)}function w(e){e.get("modal")?(k(e.elements.root,c.modeless),e.isOpen()&&(De(e),_e(e),r())):(g(e.elements.root,c.modeless),e.isOpen()&&(Be(e),_e(e),r()))}function h(e){e.get("basic")?g(e.elements.root,c.basic):k(e.elements.root,c.basic)}function H(e){e.get("frameless")?g(e.elements.root,c.frameless):k(e.elements.root,c.frameless)}function v(e,t){for(var s=O.indexOf(t),n=s+1;n<O.length;n+=1)if(O[n].isModal())return;return document.body.lastChild!==t.elements.root&&(document.body.appendChild(t.elements.root),O.splice(O.indexOf(t),1),O.push(t),be(t)),!1}function C(e,t,s,n){switch(t){case"title":e.setHeader(n);break;case"modal":w(e);break;case"basic":h(e);break;case"frameless":H(e);break;case"pinned":et(e);break;case"closable":nt(e);break;case"maximizable":tt(e);break;case"pinnable":q(e);break;case"movable":mt(e);break;case"resizable":ft(e);break;case"padding":n?k(e.elements.root,c.noPadding):e.elements.root.className.indexOf(c.noPadding)<0&&g(e.elements.root,c.noPadding);break;case"overflow":n?k(e.elements.root,c.noOverflow):e.elements.root.className.indexOf(c.noOverflow)<0&&g(e.elements.root,c.noOverflow);break;case"transition":u(e,n,s);break;case"transitionOff":d(e)}typeof e.hooks.onupdate=="function"&&e.hooks.onupdate.call(e,t,s,n)}function S(e,t,s,n,f){var p={op:void 0,items:[]};if(f===void 0&&typeof n=="string")p.op="get",t.hasOwnProperty(n)?(p.found=!0,p.value=t[n]):(p.found=!1,p.value=void 0);else{var b;if(p.op="set",typeof n=="object"){var _=n;for(var l in _)t.hasOwnProperty(l)?(t[l]!==_[l]&&(b=t[l],t[l]=_[l],s.call(e,l,b,_[l])),p.items.push({key:l,value:_[l],found:!0})):p.items.push({key:l,value:_[l],found:!1})}else{if(typeof n!="string")throw new Error("args must be a string or object");t.hasOwnProperty(n)?(t[n]!==f&&(b=t[n],t[n]=f,s.call(e,n,b,f)),p.items.push({key:n,value:f,found:!0})):p.items.push({key:n,value:f,found:!1})}}return p}function F(e){var t;ie(e,function(s){return t=e.get("invokeOnCloseOff")!==!0&&s.invokeOnClose===!0}),!t&&e.isOpen()&&e.close()}function ye(e,t){switch(e.srcElement||e.target){case t.elements.commands.pin:t.isPinned()?y(t):J(t);break;case t.elements.commands.maximize:t.isMaximized()?R(t):M(t);break;case t.elements.commands.close:F(t)}return!1}function J(e){e.set("pinned",!0)}function y(e){e.set("pinned",!1)}function M(e){E("onmaximize",e),g(e.elements.root,c.maximized),e.isOpen()&&r(),E("onmaximized",e)}function R(e){E("onrestore",e),k(e.elements.root,c.maximized),e.isOpen()&&r(),E("onrestored",e)}function q(e){e.get("pinnable")?g(e.elements.root,c.pinnable):k(e.elements.root,c.pinnable)}function Ae(e){var t=ve();e.elements.modal.style.marginTop=pe()+"px",e.elements.modal.style.marginLeft=t+"px",e.elements.modal.style.marginRight=-t+"px"}function Ie(e){var t=parseInt(e.elements.modal.style.marginTop,10),s=parseInt(e.elements.modal.style.marginLeft,10);if(e.elements.modal.style.marginTop="",e.elements.modal.style.marginLeft="",e.elements.modal.style.marginRight="",e.isOpen()){var n=0,f=0;e.elements.dialog.style.top!==""&&(n=parseInt(e.elements.dialog.style.top,10)),e.elements.dialog.style.top=n+(t-pe())+"px",e.elements.dialog.style.left!==""&&(f=parseInt(e.elements.dialog.style.left,10)),e.elements.dialog.style.left=f+(s-ve())+"px"}}function _e(e){e.get("modal")||e.get("pinned")?Ie(e):Ae(e)}function et(e){e.get("pinned")?(k(e.elements.root,c.unpinned),e.isOpen()&&Ie(e)):(g(e.elements.root,c.unpinned),e.isOpen()&&!e.isModal()&&Ae(e))}function tt(e){e.get("maximizable")?g(e.elements.root,c.maximizable):k(e.elements.root,c.maximizable)}function nt(e){e.get("closable")?(g(e.elements.root,c.closable),vt(e)):(k(e.elements.root,c.closable),gt(e))}function it(e,t){if(e.timeStamp-Qe>200&&(Qe=e.timeStamp)&&!ze){var s=e.srcElement||e.target;t.get("closableByDimmer")===!0&&s===t.elements.modal&&F(t)}ze=!1}function ie(e,t){if(Date.now()-Ze>200&&(Ze=Date.now()))for(var s=0;s<e.__internal.buttons.length;s+=1){var n=e.__internal.buttons[s];if(!n.element.disabled&&t(n)){var f=je(s,n);typeof e.callback=="function"&&e.callback.apply(e,[f]),f.cancel===!1&&e.close();break}}}function st(e,t){var s=e.srcElement||e.target;ie(t,function(n){return n.element.contains(s)&&($=!0)})}function Se(e){if($)return void($=!1);var t=O[O.length-1],s=e.keyCode;return t.__internal.buttons.length===0&&s===A.ESC&&t.get("closable")===!0?(F(t),!1):le.indexOf(s)>-1?(ie(t,function(n){return n.key===s}),!1):void 0}function Pe(e){var t=O[O.length-1],s=e.keyCode;if(s===A.LEFT||s===A.RIGHT){for(var n=t.__internal.buttons,f=0;f<n.length;f+=1)if(document.activeElement===n[f].element)switch(s){case A.LEFT:return void n[(f||n.length)-1].element.focus();case A.RIGHT:return void n[(f+1)%n.length].element.focus()}}else if(s<A.F12+1&&s>A.F1-1&&le.indexOf(s)>-1)return e.preventDefault(),e.stopPropagation(),ie(t,function(p){return p.key===s}),!1}function be(e,t){if(t)t.focus();else{var s=e.__internal.focus,n=s.element;switch(typeof s.element){case"number":e.__internal.buttons.length>s.element&&(n=e.get("basic")===!0?e.elements.reset[0]:e.__internal.buttons[s.element].element);break;case"string":n=e.elements.body.querySelector(s.element);break;case"function":n=s.element.call(e)}e.get("defaultFocusOff")!==!0&&(n!=null||e.__internal.buttons.length!==0)||(n=e.elements.reset[0]),n&&n.focus&&(n.focus(),s.select&&n.select&&n.select())}}function xe(e,t){if(!t){for(var s=O.length-1;s>-1;s-=1)if(O[s].isModal()){t=O[s];break}}if(t&&t.isModal()){var n,f=t.elements.reset[0],p=t.elements.reset[1],b=e.relatedTarget,_=t.elements.root.contains(b),l=e.srcElement||e.target;if(l===f&&!_||l===p&&b===f)return;l===p||l===document.body?n=f:l===f&&b===p?n=We(t):l===f&&_&&(n=We(t,!0)),be(t,n)}}function We(e,t){var s=[].slice.call(e.elements.dialog.querySelectorAll(K.tabbable));t&&s.reverse();for(var n=0;n<s.length;n+=1){var f=s[n];if(f.offsetParent||f.offsetWidth||f.offsetHeight||f.getClientRects().length)return f}}function Fe(e){var t=O[O.length-1];t&&e.shiftKey&&e.keyCode===A.TAB&&t.elements.reset[1].focus()}function ot(e,t){clearTimeout(t.__internal.timerIn),be(t),$=!1,E("onfocus",t),z(t.elements.dialog,X.type,t.__internal.transitionInHandler),k(t.elements.root,c.animationIn)}function lt(e,t){clearTimeout(t.__internal.timerOut),z(t.elements.dialog,X.type,t.__internal.transitionOutHandler),se(t),oe(t),t.isMaximized()&&!t.get("startMaximized")&&R(t),typeof t.__internal.destroy=="function"&&t.__internal.destroy.apply(t)}function rt(e,t){var s=e[re]-Ce,n=e[ae]-ee;ue&&(n-=document.body.scrollTop),t.style.left=s+"px",t.style.top=n+"px"}function at(e,t){var s=e[re]-Ce,n=e[ae]-ee;ue&&(n-=document.body.scrollTop),t.style.left=Math.min(Y.maxLeft,Math.max(Y.minLeft,s))+"px",t.style.top=ue?Math.min(Y.maxTop,Math.max(Y.minTop,n))+"px":Math.max(Y.minTop,n)+"px"}function ut(e,t){if(W===null&&!t.isMaximized()&&t.get("movable")){var s,n=0,f=0;if(e.type==="touchstart"?(e.preventDefault(),s=e.targetTouches[0],re="clientX",ae="clientY"):e.button===0&&(s=e),s){var p=t.elements.dialog;if(g(p,c.capture),p.style.left&&(n=parseInt(p.style.left,10)),p.style.top&&(f=parseInt(p.style.top,10)),Ce=s[re]-n,ee=s[ae]-f,t.isModal()?ee+=t.elements.modal.scrollTop:t.isPinned()&&(ee-=document.body.scrollTop),t.get("moveBounded")){var b=p,_=-n,l=-f;do _+=b.offsetLeft,l+=b.offsetTop;while(b=b.offsetParent);Y={maxLeft:_,minLeft:-_,maxTop:document.documentElement.clientHeight-p.clientHeight-l,minTop:-l},me=at}else Y=null,me=rt;return E("onmove",t),ue=!t.isModal()&&t.isPinned(),G=t,me(s,p),g(document.body,c.noSelection),!1}}}function ke(e){if(G){var t;e.type==="touchmove"?(e.preventDefault(),t=e.targetTouches[0]):e.button===0&&(t=e),t&&me(t,G.elements.dialog)}}function He(){if(G){var e=G;G=Y=null,k(document.body,c.noSelection),k(e.elements.dialog,c.capture),E("onmoved",e)}}function se(e){G=null;var t=e.elements.dialog;t.style.left=t.style.top=""}function mt(e){e.get("movable")?(g(e.elements.root,c.movable),e.isOpen()&&Ue(e)):(se(e),k(e.elements.root,c.movable),e.isOpen()&&Xe(e))}function ct(e,t,s){var n=t,f=0,p=0;do f+=n.offsetLeft,p+=n.offsetTop;while(n=n.offsetParent);var b,_;s===!0?(b=e.pageX,_=e.pageY):(b=e.clientX,_=e.clientY);var l=Ee();if(l&&(b=document.body.offsetWidth-b,isNaN(V)||(f=document.body.offsetWidth-f-t.offsetWidth)),t.style.height=_-p+fe+"px",t.style.width=b-f+fe+"px",!isNaN(V)){var B=.5*Math.abs(t.offsetWidth-ce);l&&(B*=-1),t.offsetWidth>ce?t.style.left=V+B+"px":t.offsetWidth>=de&&(t.style.left=V-B+"px")}}function dt(e,t){if(!t.isMaximized()){var s;if(e.type==="touchstart"?(e.preventDefault(),s=e.targetTouches[0]):e.button===0&&(s=e),s){E("onresize",t),W=t,fe=t.elements.resizeHandle.offsetHeight/2;var n=t.elements.dialog;return g(n,c.capture),V=parseInt(n.style.left,10),n.style.height=n.offsetHeight+"px",n.style.minHeight=t.elements.header.offsetHeight+t.elements.footer.offsetHeight+"px",n.style.width=(ce=n.offsetWidth)+"px",n.style.maxWidth!=="none"&&(n.style.minWidth=(de=n.offsetWidth)+"px"),n.style.maxWidth="none",g(document.body,c.noSelection),!1}}}function Oe(e){if(W){var t;e.type==="touchmove"?(e.preventDefault(),t=e.targetTouches[0]):e.button===0&&(t=e),t&&ct(t,W.elements.dialog,!W.get("modal")&&!W.get("pinned"))}}function Te(){if(W){var e=W;W=null,k(document.body,c.noSelection),k(e.elements.dialog,c.capture),ze=!0,E("onresized",e)}}function oe(e){W=null;var t=e.elements.dialog;t.style.maxWidth==="none"&&(t.style.maxWidth=t.style.minWidth=t.style.width=t.style.height=t.style.minHeight=t.style.left="",V=Number.Nan,ce=de=fe=0)}function ft(e){e.get("resizable")?(g(e.elements.root,c.resizable),e.isOpen()&&Ye(e)):(oe(e),k(e.elements.root,c.resizable),e.isOpen()&&qe(e))}function Re(){for(var e=0;e<O.length;e+=1){var t=O[e];t.get("autoReset")&&(se(t),oe(t))}}function ht(e){O.length===1&&(T(N,"resize",Re),T(document.body,"keyup",Se),T(document.body,"keydown",Pe),T(document.body,"focus",xe),T(document.documentElement,"mousemove",ke),T(document.documentElement,"touchmove",ke,!1,!1),T(document.documentElement,"mouseup",He),T(document.documentElement,"touchend",He),T(document.documentElement,"mousemove",Oe),T(document.documentElement,"touchmove",Oe,!1,!1),T(document.documentElement,"mouseup",Te),T(document.documentElement,"touchend",Te)),T(e.elements.commands.container,"click",e.__internal.commandsClickHandler),T(e.elements.footer,"click",e.__internal.buttonsClickHandler),T(e.elements.reset[0],"focusin",e.__internal.resetHandler),T(e.elements.reset[0],"keydown",Fe),T(e.elements.reset[1],"focusin",e.__internal.resetHandler),$=!0,T(e.elements.dialog,X.type,e.__internal.transitionInHandler),e.get("modal")||Be(e),e.get("resizable")&&Ye(e),e.get("movable")&&Ue(e)}function pt(e){O.length===1&&(z(N,"resize",Re),z(document.body,"keyup",Se),z(document.body,"keydown",Pe),z(document.body,"focus",xe),z(document.documentElement,"mousemove",ke),z(document.documentElement,"mouseup",He),z(document.documentElement,"mousemove",Oe),z(document.documentElement,"mouseup",Te)),z(e.elements.commands.container,"click",e.__internal.commandsClickHandler),z(e.elements.footer,"click",e.__internal.buttonsClickHandler),z(e.elements.reset[0],"focusin",e.__internal.resetHandler),z(e.elements.reset[0],"keydown",Fe),z(e.elements.reset[1],"focusin",e.__internal.resetHandler),T(e.elements.dialog,X.type,e.__internal.transitionOutHandler),e.get("modal")||De(e),e.get("movable")&&Xe(e),e.get("resizable")&&qe(e)}function Be(e){T(e.elements.dialog,"focus",e.__internal.bringToFrontHandler,!0)}function De(e){z(e.elements.dialog,"focus",e.__internal.bringToFrontHandler,!0)}function Ue(e){T(e.elements.header,"mousedown",e.__internal.beginMoveHandler),T(e.elements.header,"touchstart",e.__internal.beginMoveHandler,!1,!1)}function Xe(e){z(e.elements.header,"mousedown",e.__internal.beginMoveHandler),z(e.elements.header,"touchstart",e.__internal.beginMoveHandler,!1,!1)}function Ye(e){T(e.elements.resizeHandle,"mousedown",e.__internal.beginResizeHandler),T(e.elements.resizeHandle,"touchstart",e.__internal.beginResizeHandler,!1,!1)}function qe(e){z(e.elements.resizeHandle,"mousedown",e.__internal.beginResizeHandler),z(e.elements.resizeHandle,"touchstart",e.__internal.beginResizeHandler,!1,!1)}function vt(e){T(e.elements.modal,"click",e.__internal.modalClickHandler)}function gt(e){z(e.elements.modal,"click",e.__internal.modalClickHandler)}var Ge,Z,le=[],we=null,Ke=!1,yt=N.navigator.userAgent.indexOf("Safari")>-1&&N.navigator.userAgent.indexOf("Chrome")<0,L={dimmer:'<div class="ajs-dimmer"></div>',modal:'<div class="ajs-modal" tabindex="0"></div>',dialog:'<div class="ajs-dialog" tabindex="0"></div>',reset:'<button class="ajs-reset"></button>',commands:'<div class="ajs-commands"><button class="ajs-pin"></button><button class="ajs-maximize"></button><button class="ajs-close"></button></div>',header:'<div class="ajs-header"></div>',body:'<div class="ajs-body"></div>',content:'<div class="ajs-content"></div>',footer:'<div class="ajs-footer"></div>',buttons:{primary:'<div class="ajs-primary ajs-buttons"></div>',auxiliary:'<div class="ajs-auxiliary ajs-buttons"></div>'},button:'<button class="ajs-button"></button>',resizeHandle:'<div class="ajs-handle"></div>'},c={animationIn:"ajs-in",animationOut:"ajs-out",base:"alertify",basic:"ajs-basic",capture:"ajs-capture",closable:"ajs-closable",fixed:"ajs-fixed",frameless:"ajs-frameless",hidden:"ajs-hidden",maximize:"ajs-maximize",maximized:"ajs-maximized",maximizable:"ajs-maximizable",modeless:"ajs-modeless",movable:"ajs-movable",noSelection:"ajs-no-selection",noOverflow:"ajs-no-overflow",noPadding:"ajs-no-padding",pin:"ajs-pin",pinnable:"ajs-pinnable",prefix:"ajs-",resizable:"ajs-resizable",restore:"ajs-restore",shake:"ajs-shake",unpinned:"ajs-unpinned",noTransition:"ajs-no-transition"},Je="",Ve=0,ze=!1,Qe=0,Ze=0,$=!1,G=null,Ce=0,ee=0,re="pageX",ae="pageY",Y=null,ue=!1,me=null,W=null,V=Number.Nan,ce=0,de=0,fe=0;return{__init:i,isOpen:function(){return this.__internal.isOpen},isModal:function(){return this.elements.root.className.indexOf(c.modeless)<0},isMaximized:function(){return this.elements.root.className.indexOf(c.maximized)>-1},isPinned:function(){return this.elements.root.className.indexOf(c.unpinned)<0},maximize:function(){return this.isMaximized()||M(this),this},restore:function(){return this.isMaximized()&&R(this),this},pin:function(){return this.isPinned()||J(this),this},unpin:function(){return this.isPinned()&&y(this),this},bringToFront:function(){return v(null,this),this},moveTo:function(e,t){if(!isNaN(e)&&!isNaN(t)){E("onmove",this);var s=this.elements.dialog,n=s,f=0,p=0;s.style.left&&(f-=parseInt(s.style.left,10)),s.style.top&&(p-=parseInt(s.style.top,10));do f+=n.offsetLeft,p+=n.offsetTop;while(n=n.offsetParent);var b=e-f,_=t-p;Ee()&&(b*=-1),s.style.left=b+"px",s.style.top=_+"px",E("onmoved",this)}return this},resizeTo:function(e,t){var s=parseFloat(e),n=parseFloat(t),f=/(\d*\.\d+|\d+)%/;if(!isNaN(s)&&!isNaN(n)&&this.get("resizable")===!0){E("onresize",this),(""+e).match(f)&&(s=s/100*document.documentElement.clientWidth),(""+t).match(f)&&(n=n/100*document.documentElement.clientHeight);var p=this.elements.dialog;p.style.maxWidth!=="none"&&(p.style.minWidth=(de=p.offsetWidth)+"px"),p.style.maxWidth="none",p.style.minHeight=this.elements.header.offsetHeight+this.elements.footer.offsetHeight+"px",p.style.width=s+"px",p.style.height=n+"px",E("onresized",this)}return this},setting:function(e,t){var s=this,n=S(this,this.__internal.options,function(_,l,B){C(s,_,l,B)},e,t);if(n.op==="get")return n.found?n.value:this.settings!==void 0?S(this,this.settings,this.settingUpdated||function(){},e,t).value:void 0;if(n.op==="set"){if(n.items.length>0)for(var f=this.settingUpdated||function(){},p=0;p<n.items.length;p+=1){var b=n.items[p];b.found||this.settings===void 0||S(this,this.settings,f,b.key,b.value)}return this}},set:function(e,t){return this.setting(e,t),this},get:function(e){return this.setting(e)},setHeader:function(e){return Q(e)?(U(this.elements.header),this.elements.header.innerHTML=e):e instanceof N.HTMLElement&&this.elements.header.firstChild!==e&&(U(this.elements.header),this.elements.header.appendChild(e)),this},setContent:function(e){return Q(e)?(U(this.elements.content),this.elements.content.innerHTML=e):e instanceof N.HTMLElement&&this.elements.content.firstChild!==e&&(U(this.elements.content),this.elements.content.appendChild(e)),this},showModal:function(e){return this.show(!0,e)},show:function(e,t){if(i(this),this.__internal.isOpen){se(this),oe(this),g(this.elements.dialog,c.shake);var s=this;setTimeout(function(){k(s.elements.dialog,c.shake)},200)}else{if(this.__internal.isOpen=!0,O.push(this),x.defaults.maintainFocus&&(this.__internal.activeElement=document.activeElement),document.body.hasAttribute("tabindex")||document.body.setAttribute("tabindex",Ke="0"),typeof this.prepare=="function"&&this.prepare(),ht(this),e!==void 0&&this.set("modal",e),m(),r(),typeof t=="string"&&t!==""&&(this.__internal.className=t,g(this.elements.root,t)),this.get("startMaximized")?this.maximize():this.isMaximized()&&R(this),_e(this),this.elements.root.removeAttribute("style"),k(this.elements.root,c.animationOut),g(this.elements.root,c.animationIn),clearTimeout(this.__internal.timerIn),this.__internal.timerIn=setTimeout(this.__internal.transitionInHandler,X.supported?1e3:100),yt){var n=this.elements.root;n.style.display="none",setTimeout(function(){n.style.display="block"},0)}we=this.elements.root.offsetWidth,k(this.elements.root,c.hidden),a(),typeof this.hooks.onshow=="function"&&this.hooks.onshow.call(this),E("onshow",this)}return this},close:function(){return this.__internal.isOpen&&E("onclosing",this)!==!1&&(pt(this),k(this.elements.root,c.animationIn),g(this.elements.root,c.animationOut),clearTimeout(this.__internal.timerOut),this.__internal.timerOut=setTimeout(this.__internal.transitionOutHandler,X.supported?1e3:100),g(this.elements.root,c.hidden),we=this.elements.modal.offsetWidth,x.defaults.maintainFocus&&this.__internal.activeElement&&(this.__internal.activeElement.focus(),this.__internal.activeElement=null),this.__internal.className!==void 0&&this.__internal.className!==""&&k(this.elements.root,this.__internal.className),typeof this.hooks.onclose=="function"&&this.hooks.onclose.call(this),E("onclose",this),O.splice(O.indexOf(this),1),this.__internal.isOpen=!1,r()),O.length||Ke!=="0"||document.body.removeAttribute("tabindex"),this},closeOthers:function(){return x.closeAll(this),this},destroy:function(){return this.__internal&&(this.__internal.isOpen?(this.__internal.destroy=function(){Me(this,i)},this.close()):this.__internal.destroy||Me(this,i)),this}}}(),P=function(){function i(v){v.__internal||(v.__internal={position:x.defaults.notifier.position,delay:x.defaults.notifier.delay},d=document.createElement("DIV"),("transitionOff"in K.notifier?K.notifier.transitionOff:K.transitionOff)&&(H=h.base+" ajs-no-transition"),r(v)),d.parentNode!==document.body&&document.body.appendChild(d)}function m(v){v.__internal.pushed=!0,w.push(v)}function a(v){w.splice(w.indexOf(v),1),v.__internal.pushed=!1}function r(v){switch(d.className=H,v.__internal.position){case"top-right":g(d,h.top+" "+h.right);break;case"top-left":g(d,h.top+" "+h.left);break;case"top-center":g(d,h.top+" "+h.center);break;case"bottom-left":g(d,h.bottom+" "+h.left);break;case"bottom-center":g(d,h.bottom+" "+h.center);break;default:case"bottom-right":g(d,h.bottom+" "+h.right)}}function o(v,C){function S(y,M){M.__internal.closeButton&&y.target.getAttribute("data-close")!=="true"||M.dismiss(!0)}function F(y,M){z(M.element,X.type,F),d.removeChild(M.element)}function ye(y){return y.__internal||(y.__internal={pushed:!1,delay:void 0,timer:void 0,clickHandler:void 0,transitionEndHandler:void 0,transitionTimeout:void 0},y.__internal.clickHandler=I(y,S),y.__internal.transitionEndHandler=I(y,F)),y}function J(y){clearTimeout(y.__internal.timer),clearTimeout(y.__internal.transitionTimeout)}return ye({element:v,push:function(y,M){if(!this.__internal.pushed){m(this),J(this);var R,q;switch(arguments.length){case 0:q=this.__internal.delay;break;case 1:typeof y=="number"?q=y:(R=y,q=this.__internal.delay);break;case 2:R=y,q=M}return this.__internal.closeButton=x.defaults.notifier.closeButton,R!==void 0&&this.setContent(R),P.__internal.position.indexOf("top")<0?d.appendChild(this.element):d.insertBefore(this.element,d.firstChild),u=this.element.offsetWidth,g(this.element,h.visible),T(this.element,"click",this.__internal.clickHandler),this.delay(q)}return this},ondismiss:function(){},callback:C,dismiss:function(y){return this.__internal.pushed&&(J(this),typeof this.ondismiss=="function"&&this.ondismiss.call(this)===!1||(z(this.element,"click",this.__internal.clickHandler),this.element!==void 0&&this.element.parentNode===d&&(this.__internal.transitionTimeout=setTimeout(this.__internal.transitionEndHandler,X.supported?1e3:100),k(this.element,h.visible),typeof this.callback=="function"&&this.callback.call(this,y)),a(this))),this},delay:function(y){if(J(this),this.__internal.delay=y===void 0||isNaN(+y)?P.__internal.delay:+y,this.__internal.delay>0){var M=this;this.__internal.timer=setTimeout(function(){M.dismiss()},1e3*this.__internal.delay)}return this},setContent:function(y){if(Q(y)?(U(this.element),this.element.innerHTML=y):y instanceof N.HTMLElement&&this.element.firstChild!==y&&(U(this.element),this.element.appendChild(y)),this.__internal.closeButton){var M=document.createElement("span");g(M,h.close),M.setAttribute("data-close",!0),this.element.appendChild(M)}return this},dismissOthers:function(){return P.dismissAll(this),this}})}var u,d,w=[],h=K.notifier.classes,H=h.base;return{setting:function(v,C){if(i(this),C===void 0)return this.__internal[v];switch(v){case"position":this.__internal.position=C,r(this);break;case"delay":this.__internal.delay=C}return this},set:function(v,C){return this.setting(v,C),this},get:function(v){return this.setting(v)},create:function(v,C){i(this);var S=document.createElement("div");return S.className=h.message+(typeof v=="string"&&v!==""?" "+h.prefix+v:""),o(S,C)},dismissAll:function(v){for(var C=w.slice(0),S=0;S<C.length;S+=1){var F=C[S];v!==void 0&&v===F||F.dismiss()}}}}(),x=new $e;x.dialog("alert",function(){return{main:function(i,m,a){var r,o,u;switch(arguments.length){case 1:o=i;break;case 2:typeof m=="function"?(o=i,u=m):(r=i,o=m);break;case 3:r=i,o=m,u=a}return this.set("title",r),this.set("message",o),this.set("onok",u),this},setup:function(){return{buttons:[{text:x.defaults.glossary.ok,key:A.ESC,invokeOnClose:!0,className:x.defaults.theme.ok}],focus:{element:0,select:!1},options:{maximizable:!1,resizable:!1}}},build:function(){},prepare:function(){},setMessage:function(i){this.setContent(i)},settings:{message:void 0,onok:void 0,label:void 0},settingUpdated:function(i,m,a){switch(i){case"message":this.setMessage(a);break;case"label":this.__internal.buttons[0].element&&(this.__internal.buttons[0].element.innerHTML=a)}},callback:function(i){if(typeof this.get("onok")=="function"){var m=this.get("onok").call(this,i);m!==void 0&&(i.cancel=!m)}}}}),x.dialog("confirm",function(){function i(r){a.timer!==null&&(clearInterval(a.timer),a.timer=null,r.__internal.buttons[a.index].element.innerHTML=a.text)}function m(r,o,u){i(r),a.duration=u,a.index=o,a.text=r.__internal.buttons[o].element.innerHTML,a.timer=setInterval(I(r,a.task),1e3),a.task(null,r)}var a={timer:null,index:null,text:null,duration:null,task:function(r,o){if(o.isOpen()){if(o.__internal.buttons[a.index].element.innerHTML=a.text+" (&#8207;"+a.duration+"&#8207;) ",a.duration-=1,a.duration===-1){i(o);var u=o.__internal.buttons[a.index],d=je(a.index,u);typeof o.callback=="function"&&o.callback.apply(o,[d]),d.close!==!1&&o.close()}}else i(o)}};return{main:function(r,o,u,d){var w,h,H,v;switch(arguments.length){case 1:h=r;break;case 2:h=r,H=o;break;case 3:h=r,H=o,v=u;break;case 4:w=r,h=o,H=u,v=d}return this.set("title",w),this.set("message",h),this.set("onok",H),this.set("oncancel",v),this},setup:function(){return{buttons:[{text:x.defaults.glossary.ok,key:A.ENTER,className:x.defaults.theme.ok},{text:x.defaults.glossary.cancel,key:A.ESC,invokeOnClose:!0,className:x.defaults.theme.cancel}],focus:{element:0,select:!1},options:{maximizable:!1,resizable:!1}}},build:function(){},prepare:function(){},setMessage:function(r){this.setContent(r)},settings:{message:null,labels:null,onok:null,oncancel:null,defaultFocus:null,reverseButtons:null},settingUpdated:function(r,o,u){switch(r){case"message":this.setMessage(u);break;case"labels":"ok"in u&&this.__internal.buttons[0].element&&(this.__internal.buttons[0].text=u.ok,this.__internal.buttons[0].element.innerHTML=u.ok),"cancel"in u&&this.__internal.buttons[1].element&&(this.__internal.buttons[1].text=u.cancel,this.__internal.buttons[1].element.innerHTML=u.cancel);break;case"reverseButtons":u===!0?this.elements.buttons.primary.appendChild(this.__internal.buttons[0].element):this.elements.buttons.primary.appendChild(this.__internal.buttons[1].element);break;case"defaultFocus":this.__internal.focus.element=u==="ok"?0:1}},callback:function(r){i(this);var o;switch(r.index){case 0:typeof this.get("onok")=="function"&&(o=this.get("onok").call(this,r))!==void 0&&(r.cancel=!o);break;case 1:typeof this.get("oncancel")=="function"&&(o=this.get("oncancel").call(this,r))!==void 0&&(r.cancel=!o)}},autoOk:function(r){return m(this,0,r),this},autoCancel:function(r){return m(this,1,r),this}}}),x.dialog("prompt",function(){var i=document.createElement("INPUT"),m=document.createElement("P");return{main:function(a,r,o,u,d){var w,h,H,v,C;switch(arguments.length){case 1:h=a;break;case 2:h=a,H=r;break;case 3:h=a,H=r,v=o;break;case 4:h=a,H=r,v=o,C=u;break;case 5:w=a,h=r,H=o,v=u,C=d}return this.set("title",w),this.set("message",h),this.set("value",H),this.set("onok",v),this.set("oncancel",C),this},setup:function(){return{buttons:[{text:x.defaults.glossary.ok,key:A.ENTER,className:x.defaults.theme.ok},{text:x.defaults.glossary.cancel,key:A.ESC,invokeOnClose:!0,className:x.defaults.theme.cancel}],focus:{element:i,select:!0},options:{maximizable:!1,resizable:!1}}},build:function(){i.className=x.defaults.theme.input,i.setAttribute("type","text"),i.value=this.get("value"),this.elements.content.appendChild(m),this.elements.content.appendChild(i)},prepare:function(){},setMessage:function(a){Q(a)?(U(m),m.innerHTML=a):a instanceof N.HTMLElement&&m.firstChild!==a&&(U(m),m.appendChild(a))},settings:{message:void 0,labels:void 0,onok:void 0,oncancel:void 0,value:"",type:"text",reverseButtons:void 0},settingUpdated:function(a,r,o){switch(a){case"message":this.setMessage(o);break;case"value":i.value=o;break;case"type":switch(o){case"text":case"color":case"date":case"datetime-local":case"email":case"month":case"number":case"password":case"search":case"tel":case"time":case"week":i.type=o;break;default:i.type="text"}break;case"labels":o.ok&&this.__internal.buttons[0].element&&(this.__internal.buttons[0].element.innerHTML=o.ok),o.cancel&&this.__internal.buttons[1].element&&(this.__internal.buttons[1].element.innerHTML=o.cancel);break;case"reverseButtons":o===!0?this.elements.buttons.primary.appendChild(this.__internal.buttons[0].element):this.elements.buttons.primary.appendChild(this.__internal.buttons[1].element)}},callback:function(a){var r;switch(a.index){case 0:this.settings.value=i.value,typeof this.get("onok")=="function"&&(r=this.get("onok").call(this,a,this.settings.value))!==void 0&&(a.cancel=!r);break;case 1:typeof this.get("oncancel")=="function"&&(r=this.get("oncancel").call(this,a))!==void 0&&(a.cancel=!r),a.cancel||(i.value=this.settings.value)}}}}),typeof module=="object"&&typeof module.exports=="object"?module.exports=x:typeof define=="function"&&define.amd?define([],function(){return x}):N.alertify||(N.alertify=x)})(typeof window<"u"?window:this);
