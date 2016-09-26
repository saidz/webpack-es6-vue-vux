import Vue from 'vue'
import App from './App'
import Home from './components/HelloFromVux'
import StoreList from './components/Store/StoreList'
import Index from './components/inquiries/Index'
import VueRouter from 'vue-router'
// import './assets/stylesheets/app.css' // 使用require导入css文件
import './assets/stylesheets/global.css' // 使用require导入css文件
import './assets/stylesheets/swiper.css' // 使用require导入css文件

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter)
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
  }
})
router.start(App, '#app')
