"use strict";(self["webpackChunkblog_frontend"]=self["webpackChunkblog_frontend"]||[]).push([[279],{10279:function(t,e,s){s.r(e),s.d(e,{default:function(){return o}});var i=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"friend-wrap"},[e("div",{staticClass:"friend-main"},[e("hr"),e("card",{attrs:{activityList:t.list}})],1)])])},n=[];const r=()=>s.e(872).then(s.bind(s,34872));var a={components:{card:r},data(){return{list:[]}},computed:{},watch:{},created(){this.getList()},mounted(){},methods:{getList(){this.$request.get("/activity/selectAll").then((t=>{"200"===t.code?this.list=t.data||[]:this.$message.error(t.msg)}))}}},c=a,d=s(81656),l=(0,d.A)(c,i,n,!1,null,"5424481a",null),o=l.exports}}]);
//# sourceMappingURL=279.739a5cd2.js.map