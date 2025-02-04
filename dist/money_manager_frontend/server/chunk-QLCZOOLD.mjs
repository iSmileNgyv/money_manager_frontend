import './polyfills.server.mjs';
import{a as I,b as w}from"./chunk-EB3RPTH7.mjs";import{a as k}from"./chunk-SHOBK3IN.mjs";import{c as E}from"./chunk-GLXHYCFK.mjs";import"./chunk-3GZKHRXR.mjs";import"./chunk-JBAEL3N5.mjs";import"./chunk-HC2XCEIW.mjs";import"./chunk-S4G7RNWR.mjs";import{a as u,b}from"./chunk-C73OLEQC.mjs";import{m as M}from"./chunk-R5HLY2NA.mjs";import{$b as d,Ab as l,Bb as s,Cb as A,Mb as v,Ua as n,Va as o,Vb as c,Wb as p,_b as m,db as y,jb as S,ub as f}from"./chunk-7CSA3W3F.mjs";import{g as r}from"./chunk-X2SEQXRR.mjs";var C=class{paymentMethodId;stockId;categoryId;percentage};var g=class{id;paymentMethodId;stockId;categoryId;percentage};var h=class{paymentMethodId;categoryId;stockId};function B(a,i){if(a&1&&(l(0,"section",10),A(1,"app-dynamic-card-list",11),s()),a&2){let t=v();n(),f("createDto",t.createCashback)("editDto",t.editCashback)("filterDto",t.filterCashback)("createModalConfig",t.createModalConfig)("editModalConfig",t.editModalConfig)("filterSteps",t.filterSteps)("columns",t.columns)}}var x=class a{constructor(i,t,e,T){this.translate=i;this.categoryService=t;this.paymentMethodService=e;this.stockService=T}createCashback=new C;editCashback=new g;filterCashback=new h;columns;createModalConfig;editModalConfig;filterSteps=[];isLoaded=!1;ngOnInit(){this.initialize().then(()=>this.isLoaded=!0)}initialize(){return r(this,null,function*(){this.createModalConfig={steps:[{step:1,element_type:"select",params:{name:"categoryId",options:yield this.getCategories(),label:this.translate.instant("CASHBACK.CATEGORY")},wait:!1},{step:2,element_type:"select",params:{name:"paymentMethodId",options:yield this.getPaymentMethods(),label:this.translate.instant("CASHBACK.PAYMENT_METHOD")},wait:!1},{step:3,element_type:"select",params:{name:"stockId",options:yield this.getStocks(),label:this.translate.instant("CASHBACK.OBJECT")},wait:!1},{step:4,element_type:"input",params:{name:"percentage",type:"number",label:this.translate.instant("CASHBACK.PERCENTAGE")},wait:!1}],title:this.translate.instant("CASHBACK.ADD_CASHBACK")},this.editModalConfig={steps:[{step:1,element_type:"select",params:{name:"categoryId",options:yield this.getCategories(),label:this.translate.instant("CASHBACK.CATEGORY")},wait:!1},{step:2,element_type:"select",params:{name:"paymentMethodId",options:yield this.getPaymentMethods(),label:this.translate.instant("CASHBACK.PAYMENT_METHOD")},wait:!1},{step:3,element_type:"select",params:{name:"stockId",options:yield this.getStocks(),label:this.translate.instant("CASHBACK.OBJECT")},wait:!1},{step:4,element_type:"input",params:{name:"percentage",type:"number",label:this.translate.instant("CASHBACK.PERCENTAGE")},wait:!1},{step:5,element_type:"input",params:{type:"hidden",name:"id",label:""},wait:!1}],title:this.translate.instant("CASHBACK.EDIT_CASHBACK")},this.columns={cardTitle:[{title:"categoryName",style:"padding-right: 150px;"},{title:"paymentMethodName",style:"padding-right: 150px;"},{title:"percentage",implode:" %",style:"padding-right: 150px;",class:"text-success"}],cardBody:[{label:this.translate.instant("COMMON.NAME"),field:"paymentMethodName"},{label:this.translate.instant("CASHBACK.OBJECT"),field:"stockName"},{label:this.translate.instant("CASHBACK.CATEGORY"),field:"categoryName"},{label:this.translate.instant("CASHBACK.PERCENTAGE"),field:"percentage"}]},this.filterSteps=[{step:1,element_type:"select",params:{name:"categoryId",options:yield this.getCategories(),label:this.translate.instant("CASHBACK.CATEGORY")},wait:!1},{step:2,element_type:"select",params:{name:"stockId",options:yield this.getStocks(),label:this.translate.instant("CASHBACK.OBJECT")},wait:!1},{step:3,element_type:"select",params:{name:"paymentMethodId",options:yield this.getPaymentMethods(),label:this.translate.instant("CASHBACK.PAYMENT_METHOD")},wait:!1}]})}getCategories(){return r(this,null,function*(){let t=(yield this.categoryService.getAll())?.map(e=>({value:e.id,text:e.name}))||[];return[{value:"",text:this.translate.instant("COMMON.SELECT")},...t]})}getPaymentMethods(){return r(this,null,function*(){let t=(yield this.paymentMethodService.getAll())?.map(e=>({value:e.id,text:e.name}))||[];return[{value:"",text:this.translate.instant("COMMON.SELECT")},...t]})}getStocks(){return r(this,null,function*(){let t=(yield this.stockService.getAll())?.map(e=>({value:e.id,text:e.name}))||[];return[{value:"",text:this.translate.instant("COMMON.SELECT")},...t]})}static \u0275fac=function(t){return new(t||a)(o(u),o(k),o(I),o(w))};static \u0275cmp=y({type:a,selectors:[["app-cashback"]],decls:18,vars:10,consts:[[1,"content-wrapper"],[1,"content-header"],[1,"container-fluid"],[1,"row","mb-2"],[1,"col-sm-6"],[1,"breadcrumb","float-sm-right"],[1,"breadcrumb-item"],["href",""],[1,"breadcrumb-item","active"],["class","content",4,"ngIf"],[1,"content"],["controller","cashbacks",3,"createDto","editDto","filterDto","createModalConfig","editModalConfig","filterSteps","columns"]],template:function(t,e){t&1&&(l(0,"div",0)(1,"section",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h1"),c(6),m(7,"translate"),s()(),l(8,"div",4)(9,"ol",5)(10,"li",6)(11,"a",7),c(12),m(13,"translate"),s()(),l(14,"li",8),c(15),m(16,"translate"),s()()()()()(),S(17,B,2,7,"section",9),s()),t&2&&(n(6),p(d(7,4,"CASHBACK.CASHBACK")),n(6),p(d(13,6,"COMMON.HOMEPAGE")),n(3),p(d(16,8,"CASHBACK.CASHBACK")),n(2),f("ngIf",e.isLoaded))},dependencies:[b,E,M],encapsulation:2})};export{x as CashbackComponent};
