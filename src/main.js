import Vue from 'vue'
import App from './App'
import Home from './components/HelloFromVux'
import Index from './components/inquiries/Index'
import Inq from './components/inquiries/Inq'
import Login from './components/login/Login'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import cookie from './components/common/cookie'
import cache from './components/common/cache'
import url from './components/common/url'
import './assets/stylesheets/global.css' // 使用require导入css文件

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter).use(VueResource)

const router = new VueRouter()
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

// 判断localStorage是否可用，不可用则设置为无痕模式
{
  if (!window.localStorage || !window.sessionStorage) {
    cache.buffer.nonMark = true
  } else {
    try {
      window.localStorage.setItem('test', {})
      window.sessionStorage.setItem('test', {})
    } catch (e) {
      cache.buffer.nonMark = true
    }
  }
  let hashParams = url.parseHash(window.location.hash).params
  let storeId = hashParams && hashParams.store_id ? hashParams.store_id : url.getParams(window.location.search.substr(1)).store_id
  if (storeId) {
    cache.setLocalStorageData(cache.keyMap.CACHE_STORE_ID, storeId)
  }
}

// vue-resource global configure
Vue.http.headers.common['channelType'] = 'wx'
// TODO: nedd check 'credentials' 是否是跨域属性
// vue-resource 拦截器，一些跨域的请求添加csrftoken
Vue.http.interceptors.push((req, next) => {
  let csrftoken = cookie.getCookie('csrf-token')
  if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(req.method) && !Vue.http.credentials) {
    Vue.http.headers.common['X-CSRF-Token'] = csrftoken
  }
  next()
})
// ajax 全局错误处理(vue-resource 拦截器)
Vue.http.interceptors.push((req, next) => {
  // continue to next interceptor
  next((res) => {
    if (!res.ok) {
      // 处理状态码错误
      if (res.status === 404) {
        console.log('请求发生404错误!')
      } else if (res.status === 500) {
        console.log('请求发生500错误!')
      } else if (res.status === 504) {
        console.log('请求超时')
      } else if (res.status === 401) {
        let next = ''
        let storeId = cache.getLocalStorageData(cache.keyMap.CACHE_STORE_ID)
        if (storeId) {
          if (window.location.hash === '') {
            next = encodeURIComponent('#!/inq_index')
          } else {
            next = encodeURIComponent(window.location.hash)
          }
          router.go('/login')
          if (next) {}
          // window.location.href = '/auth/weixin/' + storeId + '?next=' + next + '&binding_mobile=' + encodeURIComponent('#!/login?backUrl=' + next)
        } else {
          console.log('get store id fail')
        }
      }
    }
  })
})

router.start(App, '#app')
