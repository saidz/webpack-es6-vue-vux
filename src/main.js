import Vue from 'vue'
import App from './App'
import Home from './components/HelloFromVux'
import StoreList from './components/Store/StoreList'
import Index from './components/inquiries/Index'
import Inq from './components/inquiries/Inq'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// import './assets/stylesheets/app.css' // 使用require导入css文件
import './assets/stylesheets/global.css' // 使用require导入css文件
// import './assets/stylesheets/swiper.css' // 使用require导入css文件

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter).use(VueResource)
// vue-resource global configure
// Vue.http.options.root = '/root'
Vue.http.headers.common['channelType'] = 'wx'
// Vue.http.headers.common['cookie'] = 'csrf-token=1474862642##9c58b768169f9b17df4ca721e9786387f1929fe5;session=e5488bb6-aa99-45d5-9193-2f0e48f7aaef'
const router = new VueRouter()
router.map({
  '/': {
    component: Home
  },
  '/store_list': {
    component: StoreList
  },
  '/index': {
    component: Index
  },
  '/inq_inq': {  // 续保
    component: Inq
  }
})
router.start(App, '#app')
