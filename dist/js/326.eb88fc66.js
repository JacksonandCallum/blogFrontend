"use strict";(self["webpackChunkblog_frontend"]=self["webpackChunkblog_frontend"]||[]).push([[326],{20326:function(t,e,s){s.r(e),s.d(e,{default:function(){return d}});var i=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"friend-wrap"},[e("div",{staticClass:"friend-main"},[e("span",{staticStyle:{color:"#797979"}},[t._v("我"+t._s(t.tip)+"的活动")]),e("hr"),e("myActivityCard",{attrs:{activityList:t.list}})],1)])])},a=[];const n=()=>s.e(43).then(s.bind(s,75281));var c={components:{myActivityCard:n},props:{type:null,tip:{type:String}},data(){return{list:[]}},computed:{},watch:{},created(){this.getList()},mounted(){},methods:{getList(){let t=this.$store.state.currentUser.id;"like"===this.type?this.$request.get("/activity/selectLikesByUserId/"+t).then((t=>{this.$common.isEmpty(t.data)||(this.list=t.data||[])})):"collect"===this.type?this.$request.get("/activity/selectCollectByUserId/"+t).then((t=>{this.$common.isEmpty(t.data)||(this.list=t.data||[])})):"comment"===this.type&&this.$request.get("/activity/selectCommentByUserId/"+t).then((t=>{this.$common.isEmpty(t.data)||(this.list=t.data||[])}))}}},r=c,l=s(81656),o=(0,l.A)(r,i,a,!1,null,"cecef916",null),d=o.exports}}]);
//# sourceMappingURL=326.eb88fc66.js.map