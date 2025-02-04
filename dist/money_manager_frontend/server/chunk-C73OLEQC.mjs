import './polyfills.server.mjs';
import{w as te}from"./chunk-R5HLY2NA.mjs";import{C as X,E as L,L as M,N as O,V as l,Va as x,W as Z,Y as v,_ as o,eb as Q,g as z,gb as Y,hc as ee,k as p,la as S,m as c,o as J,p as F,pa as j,t as V,u as P,v as W}from"./chunk-7CSA3W3F.mjs";import{a as R,g as q}from"./chunk-X2SEQXRR.mjs";var f=class{},ne=(()=>{class n extends f{getTranslation(e){return p({})}static \u0275fac=(()=>{let e;return function(s){return(e||(e=S(n)))(s||n)}})();static \u0275prov=l({token:n,factory:n.\u0275fac})}return n})(),C=class{},se=(()=>{class n{handle(e){return e.key}static \u0275fac=function(t){return new(t||n)};static \u0275prov=l({token:n,factory:n.\u0275fac})}return n})();function I(n,r){if(n===r)return!0;if(n===null||r===null)return!1;if(n!==n&&r!==r)return!0;let e=typeof n,t=typeof r,s,i,a;if(e==t&&e=="object")if(Array.isArray(n)){if(!Array.isArray(r))return!1;if((s=n.length)==r.length){for(i=0;i<s;i++)if(!I(n[i],r[i]))return!1;return!0}}else{if(Array.isArray(r))return!1;a=Object.create(null);for(i in n){if(!I(n[i],r[i]))return!1;a[i]=!0}for(i in r)if(!(i in a)&&typeof r[i]<"u")return!1;return!0}return!1}function h(n){return typeof n<"u"&&n!==null}function T(n){return E(n)&&!$(n)&&n!==null}function E(n){return typeof n=="object"}function $(n){return Array.isArray(n)}function G(n){return typeof n=="string"}function he(n){return typeof n=="function"}function K(n,r){let e=Object.assign({},n);return E(n)?(E(n)&&E(r)&&Object.keys(r).forEach(t=>{T(r[t])?t in n?e[t]=K(n[t],r[t]):Object.assign(e,{[t]:r[t]}):Object.assign(e,{[t]:r[t]})}),e):K({},r)}function N(n,r){let e=r.split(".");r="";do r+=e.shift(),h(n)&&h(n[r])&&(T(n[r])||$(n[r])||!e.length)?(n=n[r],r=""):e.length?r+=".":n=void 0;while(e.length);return n}function ce(n,r,e){let t=r.split("."),s=n;for(let i=0;i<t.length;i++){let a=t[i];i===t.length-1?s[a]=e:((!s[a]||!T(s[a]))&&(s[a]={}),s=s[a])}}var d=class{},ie=(()=>{class n extends d{templateMatcher=/{{\s?([^{}\s]*)\s?}}/g;interpolate(e,t){if(G(e))return this.interpolateString(e,t);if(he(e))return this.interpolateFunction(e,t)}interpolateFunction(e,t){return e(t)}interpolateString(e,t){return t?e.replace(this.templateMatcher,(s,i)=>{let a=N(t,i);return h(a)?a:s}):e}static \u0275fac=(()=>{let e;return function(s){return(e||(e=S(n)))(s||n)}})();static \u0275prov=l({token:n,factory:n.\u0275fac})}return n})(),g=class{},re=(()=>{class n extends g{compile(e,t){return e}compileTranslations(e,t){return e}static \u0275fac=(()=>{let e;return function(s){return(e||(e=S(n)))(s||n)}})();static \u0275prov=l({token:n,factory:n.\u0275fac})}return n})(),b=class{defaultLang;currentLang=this.defaultLang;translations={};langs=[];onTranslationChange=new j;onLangChange=new j;onDefaultLangChange=new j},B=new v("ISOLATE_TRANSLATE_SERVICE"),U=new v("USE_DEFAULT_LANG"),H=new v("DEFAULT_LANGUAGE"),_=new v("USE_EXTEND"),m=n=>c(n)?n:p(n),y=(()=>{class n{store;currentLoader;compiler;parser;missingTranslationHandler;useDefaultLang;extend;loadingTranslations;pending=!1;_translationRequests={};lastUseLanguage=null;get onTranslationChange(){return this.store.onTranslationChange}get onLangChange(){return this.store.onLangChange}get onDefaultLangChange(){return this.store.onDefaultLangChange}get defaultLang(){return this.store.defaultLang}set defaultLang(e){this.store.defaultLang=e}get currentLang(){return this.store.currentLang}set currentLang(e){this.store.currentLang=e}get langs(){return this.store.langs}set langs(e){this.store.langs=e}get translations(){return this.store.translations}set translations(e){this.store.translations=e}constructor(e,t,s,i,a,A=!0,u=!1,w=!1,D){this.store=e,this.currentLoader=t,this.compiler=s,this.parser=i,this.missingTranslationHandler=a,this.useDefaultLang=A,this.extend=w,u&&(this.store=new b),D&&this.setDefaultLang(D)}setDefaultLang(e){if(e===this.defaultLang)return;let t=this.retrieveTranslations(e);typeof t<"u"?(this.defaultLang==null&&(this.defaultLang=e),t.pipe(L(1)).subscribe(()=>{this.changeDefaultLang(e)})):this.changeDefaultLang(e)}getDefaultLang(){return this.defaultLang}use(e){if(this.lastUseLanguage=e,e===this.currentLang)return p(this.translations[e]);this.currentLang||(this.currentLang=e);let t=this.retrieveTranslations(e);return c(t)?(t.pipe(L(1)).subscribe(()=>{this.changeLang(e)}),t):(this.changeLang(e),p(this.translations[e]))}changeLang(e){e===this.lastUseLanguage&&(this.currentLang=e,this.onLangChange.emit({lang:e,translations:this.translations[e]}),this.defaultLang==null&&this.changeDefaultLang(e))}retrieveTranslations(e){if(typeof this.translations[e]>"u"||this.extend)return this._translationRequests[e]=this._translationRequests[e]||this.loadAndCompileTranslations(e),this._translationRequests[e]}getTranslation(e){return this.loadAndCompileTranslations(e)}loadAndCompileTranslations(e){this.pending=!0;let t=this.currentLoader.getTranslation(e).pipe(M(1),L(1));return this.loadingTranslations=t.pipe(F(s=>this.compiler.compileTranslations(s,e)),M(1),L(1)),this.loadingTranslations.subscribe({next:s=>{this.translations[e]=this.extend&&this.translations[e]?R(R({},s),this.translations[e]):s,this.updateLangs(),this.pending=!1},error:s=>{this.pending=!1}}),t}setTranslation(e,t,s=!1){let i=this.compiler.compileTranslations(t,e);(s||this.extend)&&this.translations[e]?this.translations[e]=K(this.translations[e],i):this.translations[e]=i,this.updateLangs(),this.onTranslationChange.emit({lang:e,translations:this.translations[e]})}getLangs(){return this.langs}addLangs(e){let t=e.filter(s=>!this.langs.includes(s));t.length>0&&(this.langs=[...this.langs,...t])}updateLangs(){this.addLangs(Object.keys(this.translations))}getParsedResultForKey(e,t,s){let i;if(e&&(i=this.runInterpolation(N(e,t),s)),i===void 0&&this.defaultLang!=null&&this.defaultLang!==this.currentLang&&this.useDefaultLang&&(i=this.runInterpolation(N(this.translations[this.defaultLang],t),s)),i===void 0){let a={key:t,translateService:this};typeof s<"u"&&(a.interpolateParams=s),i=this.missingTranslationHandler.handle(a)}return i!==void 0?i:t}runInterpolation(e,t){if($(e))return e.map(s=>this.runInterpolation(s,t));if(T(e)){let s={};for(let i in e){let a=this.runInterpolation(e[i],t);a!==void 0&&(s[i]=a)}return s}else return this.parser.interpolate(e,t)}getParsedResult(e,t,s){if(t instanceof Array){let i={},a=!1;for(let u of t)i[u]=this.getParsedResultForKey(e,u,s),a=a||c(i[u]);if(!a)return i;let A=t.map(u=>m(i[u]));return W(A).pipe(F(u=>{let w={};return u.forEach((D,ue)=>{w[t[ue]]=D}),w}))}return this.getParsedResultForKey(e,t,s)}get(e,t){if(!h(e)||!e.length)throw new Error('Parameter "key" is required and cannot be empty');return this.pending?this.loadingTranslations.pipe(X(s=>m(this.getParsedResult(s,e,t)))):m(this.getParsedResult(this.translations[this.currentLang],e,t))}getStreamOnTranslationChange(e,t){if(!h(e)||!e.length)throw new Error('Parameter "key" is required and cannot be empty');return V(P(()=>this.get(e,t)),this.onTranslationChange.pipe(O(s=>{let i=this.getParsedResult(s.translations,e,t);return m(i)})))}stream(e,t){if(!h(e)||!e.length)throw new Error('Parameter "key" required');return V(P(()=>this.get(e,t)),this.onLangChange.pipe(O(s=>{let i=this.getParsedResult(s.translations,e,t);return m(i)})))}instant(e,t){if(!h(e)||e.length===0)throw new Error('Parameter "key" is required and cannot be empty');let s=this.getParsedResult(this.translations[this.currentLang],e,t);return c(s)?Array.isArray(e)?e.reduce((i,a)=>(i[a]=a,i),{}):e:s}set(e,t,s=this.currentLang){ce(this.translations[s],e,G(t)?this.compiler.compile(t,s):this.compiler.compileTranslations(t,s)),this.updateLangs(),this.onTranslationChange.emit({lang:s,translations:this.translations[s]})}changeDefaultLang(e){this.defaultLang=e,this.onDefaultLangChange.emit({lang:e,translations:this.translations[e]})}reloadLang(e){return this.resetLang(e),this.loadAndCompileTranslations(e)}resetLang(e){delete this._translationRequests[e],delete this.translations[e]}getBrowserLang(){if(typeof window>"u"||!window.navigator)return;let e=this.getBrowserCultureLang();return e?e.split(/[-_]/)[0]:void 0}getBrowserCultureLang(){if(!(typeof window>"u"||typeof window.navigator>"u"))return window.navigator.languages?window.navigator.languages[0]:window.navigator.language||window.navigator.browserLanguage||window.navigator.userLanguage}static \u0275fac=function(t){return new(t||n)(o(b),o(f),o(g),o(d),o(C),o(U),o(B),o(_),o(H))};static \u0275prov=l({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Se=(()=>{class n{translate;_ref;value="";lastKey=null;lastParams=[];onTranslationChange;onLangChange;onDefaultLangChange;constructor(e,t){this.translate=e,this._ref=t}updateValue(e,t,s){let i=a=>{this.value=a!==void 0?a:e,this.lastKey=e,this._ref.markForCheck()};if(s){let a=this.translate.getParsedResult(s,e,t);c(a)?a.subscribe(i):i(a)}this.translate.get(e,t).subscribe(i)}transform(e,...t){if(!e||!e.length)return e;if(I(e,this.lastKey)&&I(t,this.lastParams))return this.value;let s;if(h(t[0])&&t.length)if(G(t[0])&&t[0].length){let i=t[0].replace(/(')?([a-zA-Z0-9_]+)(')?(\s)?:/g,'"$2":').replace(/:(\s)?(')(.*?)(')/g,':"$3"');try{s=JSON.parse(i)}catch(a){throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${t[0]}`)}}else T(t[0])&&(s=t[0]);return this.lastKey=e,this.lastParams=t,this.updateValue(e,s),this._dispose(),this.onTranslationChange||(this.onTranslationChange=this.translate.onTranslationChange.subscribe(i=>{this.lastKey&&i.lang===this.translate.currentLang&&(this.lastKey=null,this.updateValue(e,s,i.translations))})),this.onLangChange||(this.onLangChange=this.translate.onLangChange.subscribe(i=>{this.lastKey&&(this.lastKey=null,this.updateValue(e,s,i.translations))})),this.onDefaultLangChange||(this.onDefaultLangChange=this.translate.onDefaultLangChange.subscribe(()=>{this.lastKey&&(this.lastKey=null,this.updateValue(e,s))})),this.value}_dispose(){typeof this.onTranslationChange<"u"&&(this.onTranslationChange.unsubscribe(),this.onTranslationChange=void 0),typeof this.onLangChange<"u"&&(this.onLangChange.unsubscribe(),this.onLangChange=void 0),typeof this.onDefaultLangChange<"u"&&(this.onDefaultLangChange.unsubscribe(),this.onDefaultLangChange=void 0)}ngOnDestroy(){this._dispose()}static \u0275fac=function(t){return new(t||n)(x(y,16),x(ee,16))};static \u0275pipe=Y({name:"translate",type:n,pure:!1});static \u0275prov=l({token:n,factory:n.\u0275fac})}return n})();var je=(()=>{class n{static forRoot(e={}){return{ngModule:n,providers:[e.loader||{provide:f,useClass:ne},e.compiler||{provide:g,useClass:re},e.parser||{provide:d,useClass:ie},e.missingTranslationHandler||{provide:C,useClass:se},b,{provide:B,useValue:e.isolate},{provide:U,useValue:e.useDefaultLang},{provide:_,useValue:e.extend},{provide:H,useValue:e.defaultLanguage},y]}}static forChild(e={}){return{ngModule:n,providers:[e.loader||{provide:f,useClass:ne},e.compiler||{provide:g,useClass:re},e.parser||{provide:d,useClass:ie},e.missingTranslationHandler||{provide:C,useClass:se},{provide:B,useValue:e.isolate},{provide:U,useValue:e.useDefaultLang},{provide:_,useValue:e.extend},{provide:H,useValue:e.defaultLanguage},y]}}static \u0275fac=function(t){return new(t||n)};static \u0275mod=Q({type:n});static \u0275inj=Z({})}return n})();var oe=class n{constructor(r,e){this.translate=r;this.http=e;let t=this.isBrowser()?localStorage.getItem(this.storageKey)||this.defaultLang:this.defaultLang;this.setLanguage(t)}storageKey="language";defaultLang="az";currentLangSubject=new z(this.defaultLang);setLanguage(r){this.isBrowser()&&localStorage.setItem(this.storageKey,r),this.translate.use(r),this.currentLangSubject.next(r)}getCurrentLanguage(){return this.currentLangSubject.value}onLanguageChange(){return this.currentLangSubject.asObservable()}isBrowser(){return typeof window<"u"&&typeof localStorage<"u"}loadCustomTranslations(r,e){return q(this,null,function*(){let t=e?`i18n/${e}/${r}.json`:`i18n/${r}.json`;try{let s=yield J(this.http.get(t));r==null&&(r=this.getCurrentLanguage()),this.translate.setTranslation(r,s,!0),console.log(`\xC7eviriler y\xFCklendi: ${t}`)}catch(s){console.error(`\xC7eviriler y\xFCklenirken hata olu\u015Ftu: ${t}`,s)}})}static \u0275fac=function(e){return new(e||n)(o(y),o(te))};static \u0275prov=l({token:n,factory:n.\u0275fac,providedIn:"root"})};var le=class n{constructor(){}message(r,e){if(e=e||new k,e.messageType===void 0)throw new Error("messageType is required");alertify.set("notifier","position",e.position),alertify.set("notifier","delay",e.delay);let t=alertify[e.messageType](r);e.dismissOthers&&t.dismissOthers()}confirm(r,e,t,s){alertify.confirm(e).set("title",r).set("onok",t||function(){}).set("oncancel",s||function(){})}static \u0275fac=function(e){return new(e||n)};static \u0275prov=l({token:n,factory:n.\u0275fac,providedIn:"root"})},k=class{messageType="message";position="bottom-right";delay=3;dismissOthers=!1;constructor(r="message",e="bottom-right",t=3,s=!1){this.messageType=r,this.position=e,this.delay=t,this.dismissOthers=s}};export{y as a,Se as b,je as c,oe as d,le as e};
