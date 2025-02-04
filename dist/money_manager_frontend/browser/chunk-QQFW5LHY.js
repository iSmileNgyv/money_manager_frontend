import{a as _,b as A}from"./chunk-26WNPGLR.js";import{a as O}from"./chunk-7G6CC4DL.js";import{a as y,c as P}from"./chunk-YX44WXWE.js";import"./chunk-FYVENUAJ.js";import"./chunk-B4MZGBAQ.js";import"./chunk-PCL73WY7.js";import{a as x}from"./chunk-V7BYYPEQ.js";import{a as T,b as L}from"./chunk-MGDPBCMH.js";import{i as D}from"./chunk-IJ63IUIN.js";import{$b as M,Bb as c,Cb as r,Db as S,Nb as k,Va as m,Wa as o,Wb as l,Xb as I,Z as v,ac as w,ca as h,d as n,eb as C,kb as b,vb as g}from"./chunk-ZIJ2ZRAW.js";var d=class{paymentMethodId;categoryId;stockId;amount;cashbackAmount;eventDate};var p=class{id;paymentMethodId;categoryId;stockId;amount;cashbackAmount;eventDate};var u=class{categoryId;stockId};var f=class i{constructor(e){this.httpClientService=e}filter(e){return n(this,null,function*(){return new Promise((t,a)=>{this.httpClientService.get({controller:"cashbacks",action:"filter",queryString:this.toQueryString(e)}).subscribe({next:s=>{t(s)},error:s=>{console.error(s.message),a(s)}})})})}toQueryString(e){return Object.keys(e).map(t=>{let a=e[t]==null?"":e[t];return encodeURIComponent(t)+"="+encodeURIComponent(a)}).join("&")}static \u0275fac=function(t){return new(t||i)(h(x))};static \u0275prov=v({token:i,factory:i.\u0275fac,providedIn:"root"})};function B(i,e){if(i&1&&(c(0,"section",10),S(1,"app-dynamic-card-list",11),r()),i&2){let t=k();m(),g("createDto",t.createTransaction)("editDto",t.editTransaction)("filterDto",t.filterTransaction)("columns",t.columns)("createModalConfig",t.createModalConfig)("editModalConfig",t.editModalConfig)("filterSteps",t.filterSteps)("customButtons",t.customButtons)}}var E=class i{constructor(e,t,a,s,j){this.categoryService=e;this.paymentMethodService=t;this.stockService=a;this.cashbackService=s;this.translate=j}createTransaction=new d;editTransaction=new p;filterTransaction=new u;columns;createModalConfig;editModalConfig;filterSteps=[];isLoaded=!1;customButtons;ngOnInit(){this.initialize().then(()=>{this.isLoaded=!0})}initialize(){return n(this,null,function*(){this.createModalConfig={steps:[{step:1,element_type:"select",params:{name:"paymentMethodId",options:yield this.getPaymentMethods(),label:"Payment method"},wait:!1},{step:2,element_type:"select",params:{name:"categoryId",options:yield this.getCategories(),label:"Category"},wait:!1},{step:3,element_type:"select",params:{name:"stockId",options:yield this.getStocks(),label:"Stock"},wait:!0,waitParams:{dependsOn:"categoryId"}},{step:4,element_type:"input",params:{name:"amount",label:"Amount",validators:[y.required],validationMessages:{required:"Amount is required"}},wait:!0,waitParams:{dependsOn:"categoryId"},onChange:e=>{this.getFilteredCashback(e)}},{step:5,element_type:"input",params:{name:"cashbackAmount",label:"Cashback amount",value:"0",validators:[],validationMessages:{}},wait:!0,waitParams:{dependsOn:"amount"}},{step:6,element_type:"input",params:{type:"date",label:"Date",name:"eventDate",value:new Date().toISOString().split("T")[0],validators:[y.required],validationMessages:{required:"Date is required"}},wait:!1}],title:"Create Transaction"},this.editModalConfig={steps:[{step:1,element_type:"select",params:{name:"paymentMethodId",options:yield this.getPaymentMethods(),label:"Payment method"},wait:!1},{step:2,element_type:"select",params:{name:"categoryId",options:yield this.getCategories(),label:"Category"},wait:!1},{step:3,element_type:"select",params:{name:"stockId",options:yield this.getStocks(),label:"Stock"},wait:!1},{step:4,element_type:"input",params:{name:"amount",label:"Amount"},wait:!1},{step:5,element_type:"input",params:{name:"cashbackAmount",label:"Cashback amount"},wait:!1},{step:6,element_type:"input",params:{type:"date",label:"Date",name:"eventDate"},wait:!1},{step:7,element_type:"input",params:{name:"id",label:"",type:"hidden"},wait:!1}],title:"Edit transaction"},this.filterSteps=[{step:1,element_type:"select",params:{name:"categoryId",options:yield this.getCategories(),label:"Category"},wait:!1},{step:2,element_type:"select",params:{name:"stockId",options:yield this.getStocks(),label:"Stock"},wait:!1}],this.columns={cardTitle:[{title:"categoryName",image:"categoryImage"},{title:"amount",style:"padding-left: 30px; font-weight: bold;",class:"transactionAmountSpan",transform:e=>($(".transactionAmountSpan span").addClass("text-danger"),"\u20BC "+e)}],cardBody:[{field:"categoryName",label:"Category",image:"categoryImage"},{field:"paymentMethodName",label:"Payment method",image:"paymentMethodImage"},{field:"stockName",label:"Stock",image:"stockImage"},{field:"eventDate",label:"Date"},{field:"amount",label:"Amount",transform:e=>"\u20BC "+e,style:"font-weight: bold;"},{field:"cashbackAmount",label:"Cashback amount",class:"text-success font-weight-bold",transform:e=>"\u20BC "+e}]},this.customButtons=[{icon:"fas fa-shopping-basket",clickHandler:e=>{console.log(e)}}]})}getPaymentMethods(){return n(this,null,function*(){return(yield this.paymentMethodService.getAll())?.map(t=>({value:t.id,text:t.name}))||[]})}getStocks(){return n(this,null,function*(){let t=(yield this.stockService.getAll())?.map(a=>({value:a.id,text:a.name}))||[];return[{value:"",text:this.translate.instant("COMMON.SELECT")},...t]})}getCategories(){return n(this,null,function*(){let t=(yield this.categoryService.getAll())?.map(a=>({value:a.id,text:a.name}))||[];return[{value:"",text:this.translate.instant("COMMON.SELECT")},...t]})}getFilteredCashback(e){return n(this,null,function*(){let t={categoryId:$("#categoryId").val(),stockId:$("#stockId").val(),paymentMethodId:$("#paymentMethodId").val()},a=yield this.cashbackService.filter(t);a&&a.length>0&&$("#cashbackAmount").val(Number((e*a[0].percentage/100).toFixed(2)))})}static \u0275fac=function(t){return new(t||i)(o(O),o(_),o(A),o(f),o(T))};static \u0275cmp=C({type:i,selectors:[["app-transaction"]],decls:16,vars:4,consts:[[1,"content-wrapper"],[1,"content-header"],[1,"container-fluid"],[1,"row","mb-2"],[1,"col-sm-6"],[1,"breadcrumb","float-sm-right"],[1,"breadcrumb-item"],["href",""],[1,"breadcrumb-item","active"],["class","content",4,"ngIf"],[1,"content"],["controller","transactions",3,"createDto","editDto","filterDto","columns","createModalConfig","editModalConfig","filterSteps","customButtons"]],template:function(t,a){t&1&&(c(0,"div",0)(1,"section",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h1"),l(6,"Operations"),r()(),c(7,"div",4)(8,"ol",5)(9,"li",6)(10,"a",7),l(11),M(12,"translate"),r()(),c(13,"li",8),l(14,"Operations"),r()()()()()(),b(15,B,2,8,"section",9),r()),t&2&&(m(11),I(w(12,2,"COMMON.HOMEPAGE")),m(4),g("ngIf",a.isLoaded))},dependencies:[L,P,D],encapsulation:2})};export{E as TransactionComponent};
