// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'
import Vue from 'vue'
import App from './index.vue'
import router from './router'
import axios from 'axios'
import store from 'store'
import "resource/styles/index.less";

import "api/webAPI";
import "api/layer";

import dsjCommon from 'api/dsjCommon.js' //地图机交互方法
Vue.prototype.$DsjCommon = dsjCommon;

import global_ from '@/Global' //引用文件

import dsj_GlobalComponents from 'api/utils/dsjGlobalComponent'
Vue.use(dsj_GlobalComponents); //注册全局组件

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// import highcharts from 'highcharts'
// import highcharts3d from 'highcharts/highcharts-3d'
// highcharts3d(highcharts)


Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面
Vue.prototype.$axios = axios

Vue.config.productionTip = false

import base from './base' //引用
Vue.use(base); //将全局函数当做插件来进行注册


/* eslint-disable no-new */
new Vue({
    el: '#app',
    axios,
    store,
    router,
    render: h => h(App),
    data: {
        eventHub: new Vue()
    }
})