"use strict";(self["webpackChunkblog_frontend"]=self["webpackChunkblog_frontend"]||[]).push([[359],{4359:function(e,r,s){s.r(r),s.d(r,{default:function(){return c}});var t=function(){var e=this,r=e._self._c;return r("div",{staticClass:"container"},[r("div",{staticStyle:{width:"380px",padding:"50px 30px","background-color":"white","border-radius":"5px",opacity:"0.9"}},[r("div",{staticStyle:{"text-align":"center","font-size":"20px","margin-bottom":"20px",color:"#333"}},[e._v("欢迎注册")]),r("el-form",{ref:"formRef",attrs:{model:e.form,rules:e.rules}},[r("el-form-item",{attrs:{prop:"username"}},[r("el-input",{attrs:{size:"medium","prefix-icon":"el-icon-user",placeholder:"请输入账号"},model:{value:e.form.username,callback:function(r){e.$set(e.form,"username",r)},expression:"form.username"}})],1),r("el-form-item",{attrs:{prop:"password"}},[r("el-input",{attrs:{size:"medium","prefix-icon":"el-icon-lock",placeholder:"请输入密码","show-password":""},model:{value:e.form.password,callback:function(r){e.$set(e.form,"password",r)},expression:"form.password"}})],1),r("el-form-item",{attrs:{prop:"confirmPass"}},[r("el-input",{attrs:{size:"medium","prefix-icon":"el-icon-lock",placeholder:"请确认密码","show-password":""},model:{value:e.form.confirmPass,callback:function(r){e.$set(e.form,"confirmPass",r)},expression:"form.confirmPass"}})],1),r("el-form-item",[r("el-button",{staticStyle:{width:"100%","background-color":"#2a60c9","border-color":"#2a60c9",color:"white"},attrs:{size:"medium"},on:{click:e.register}},[e._v("注 册")])],1),r("div",{staticStyle:{display:"flex","align-items":"center"}},[r("div",{staticStyle:{flex:"1","text-align":"right"}},[e._v(" 已有账号？请 "),r("a",{attrs:{href:"/login"}},[e._v("登录")])])])],1)],1)])},o=[],i=(s(44114),{name:"Register",data(){const e=(e,r,s)=>{""===r?s(new Error("请确认密码")):r!==this.form.password?s(new Error("两次输入的密码不一致")):s()};return{form:{role:"USER"},rules:{username:[{required:!0,message:"请输入账号",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}],confirmPass:[{validator:e,trigger:"blur"}]}}},created(){},methods:{register(){this.$refs["formRef"].validate((e=>{e&&this.$request.post("/register",this.form).then((e=>{"200"===e.code?(this.$router.push("/"),this.$message.success("注册成功")):this.$message.error(e.msg)}))}))}}}),a=i,l=s(81656),n=(0,l.A)(a,t,o,!1,null,"54d28ccc",null),c=n.exports}}]);
//# sourceMappingURL=359.ffb94887.js.map