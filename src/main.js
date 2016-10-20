import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import Home from './components/HelloFromVux'
import Index from './components/inquiries/Index'
import Inq from './components/inquiries/Inq'
import Succ from './components/inquiries/Succ'
import Login from './components/login/Login'
import ajax from './components/common/ajax'
import cache from './components/common/cache'
/* replacing_mock */ // 保留用来dev模式加载mock数据
import './assets/stylesheets/global.css' // 使用require导入css文件

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter).use(VueResource)
cache.init()

const router = new VueRouter({
  routes: [{
    path: '/',
    component: Home
  }, { // 首页
    path: '/inq_index',
    component: Index
  }, { // 续保
    path: '/inq_inq',
    component: Inq
  }, { // 续保成功页面
    path: '/inq_succ',
    component: Succ
  }, { // 登录
    path: '/login',
    component: Login
  }]
})
ajax.init(Vue, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})
