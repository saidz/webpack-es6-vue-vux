import Vue from 'vue'
import App from './App'
import Home from './components/HelloFromVux'
import StoreList from './components/Store/StoreList'
import Index from './components/inquiries/Index'
import Inq from './components/inquiries/Inq'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import cookie from './components/common/cookie'
import cache from './components/common/cache'
// import './assets/stylesheets/app.css' // 使用require导入css文件
import './assets/stylesheets/global.css' // 使用require导入css文件

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter).use(VueResource)
// vue-resource global configure
Vue.http.headers.common['channelType'] = 'wx'
// TODO: nedd check
Vue.http.interceptors.push((req, next) => {
  let csrftoken = cookie.getCookie('csrf-token')
  if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(req.method) && !Vue.http.credentials) {
    Vue.http.headers.common['X-CSRF-Token'] = csrftoken
  }
  next()
})
// ajax 全局错误处理
Vue.http.interceptors.push((req, next) => {
  // continue to next interceptor
  next((res) => {
    if (!res.ok) {
      // 处理状态码错误
      if (res.status === 404) {
        console.log('请求发生404错误!')
      } else if (res.status === 500) {
        console.log('请求发生500错误!')
      } else if (res.status === 401) {
        console.log('get store id 401 ')
        let next = ''
        let storeId = cache.getLocalStorageData(cache.keyMap.CACHE_STORE_ID)
        if (storeId) {
          if (window.location.hash === '') {
            next = encodeURIComponent('#inq_index')
          } else {
            next = encodeURIComponent(window.location.hash)
          }
          window.location.href = '/auth/weixin/' + storeId + '?next=' + next + '&binding_mobile=' + encodeURIComponent('#login?backUrl=' + next)
        } else {
          console.log('get store id fail >>>>')
        }
      }
    }
  }, (res) => {
    // console.log(res, 'error')
  })
})

const router = new VueRouter()
router.map({
  '/': {
    component: Home
  },
  '/store_list': {
    component: StoreList
  },
  '/index': { // 首页
    component: Index
  },
  '/inq_inq': {  // 续保
    component: Inq
  }
})
router.start(App, '#app')
