import './polyfills.server.mjs';
import{a as s}from"./chunk-S4G7RNWR.mjs";import{V as n,_ as c}from"./chunk-7CSA3W3F.mjs";import{g as i}from"./chunk-X2SEQXRR.mjs";var p=class e{constructor(r){this.httpClientService=r}getAll(){return i(this,null,function*(){return new Promise((r,o)=>{this.httpClientService.get({controller:"paymentMethods",action:"all"}).subscribe({next:t=>{r(t)},error:t=>{console.error(t.message),o(t)}})})})}static \u0275fac=function(o){return new(o||e)(c(s))};static \u0275prov=n({token:e,factory:e.\u0275fac,providedIn:"root"})};var a=class e{constructor(r){this.httpClientService=r}getAll(){return i(this,null,function*(){return new Promise((r,o)=>{this.httpClientService.get({controller:"stocks",action:"all"}).subscribe({next:t=>{r(t)},error:t=>{console.error(t.message),o(t)}})})})}static \u0275fac=function(o){return new(o||e)(c(s))};static \u0275prov=n({token:e,factory:e.\u0275fac,providedIn:"root"})};export{p as a,a as b};
