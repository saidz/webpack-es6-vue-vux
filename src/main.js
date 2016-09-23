import Vue from 'vue'
import App from './App'
import Home from './components/HelloFromVux'
import StoreList from './components/Store/StoreList'
import VueRouter from 'vue-router'
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
  }
})
router.start(App, '#app')
