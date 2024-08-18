import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/global.css'
import '@/assets/css/theme/index.css'
import './assets/css/font-awesome.min.css'
import request from "@/utils/request";
import common from '@/utils/common';
import constant from '@/utils/constant';

// 引用字体
import "@/assets/css/theme/fonts/font.css"

import "@/assets/css/color.css"

import * as echarts from 'echarts';

// 导入组件
import layEditor from "vue2-lay-editor";
import layRender from "vue2-lay-render";
// 注册全局组件
Vue.component("layEditor", layEditor)
Vue.component("layRender",layRender)

Vue.config.productionTip = false

Vue.prototype.$request = request
Vue.prototype.$common = common
Vue.prototype.$constant = constant
Vue.prototype.$baseUrl = process.env.VUE_APP_BASEURL
Vue.prototype.$echarts = echarts;

Vue.use(ElementUI, {size: "small"})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
