import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import Home from './components/HelloFromVux'
import Index from './components/inquiries/Index'
import Inq from './components/inquiries/Inq'
import Login from './components/login/Login'
import ajax from './components/common/ajax'
import cache from './components/common/cache'
/* replacing_mock */  // 保留用来dev模式加载mock数据
import './assets/stylesheets/global.css' // 使用require导入css文件

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter).use(VueResource)
cache.init()

const router = new VueRouter()
ajax.init(Vue, router)
router.map({
  '/': {
    component: Home
  },
  '/inq_index': { // 首页
    component: Index
  },
  '/inq_inq': {  // 续保
    component: Inq
  },
  '/login': { // 登录
    component: Login
  }
})

router.start(App, '#app')
