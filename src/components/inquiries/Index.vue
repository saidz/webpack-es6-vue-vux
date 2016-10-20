<template>
<article class="index-box">
  <swiper :list="outerLink" auto></swiper>
  <ul class="tab-row-list">
    <li id="inq"><router-link to="/inq_inq"><em class="icon icon1"></em></router-link>
      <p>续保询价</p></li>
    <li id="pre"><router-link to="/inq_inq"><em class="icon icon2"></em></router-link>
      <p>预存保费</p></li>
  </ul>
  <div class="renewal-four-s mt10">
    <h1 class="title"><em class="icon">4s店续保有优势</em></h1>
    <div class="select-list-img">
      <ul>
        <li>
          <a>
            <div class="select-img"><img src="../../assets/images/renewal1.png" alt="" class="imgauto"></div>
            <div class="select-detail">
              <div>
                <div>更多优惠</div>
                <div class="con-b">续保价格折上折，享优惠还可获得最高价值1000元的服务</div>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a>
            <div class="select-img"><img src="../../assets/images/renewal2.png" alt="" class="imgauto"></div>
            <div class="select-detail">
              <div>
                <div>专业服务</div>
                <div class="con-b">定损、报价、维修、理赔一条龙服务，让您省时、省事、省心</div>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a>
            <div class="select-img"><img src="../../assets/images/renewal3.png" alt="" class="imgauto"></div>
            <div class="select-detail">
              <div>
                <div>原厂配件</div>
                <div class="con-b">纯正原厂配件、原厂油漆，质量保证了，您的爱车才不会贬值</div>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a>
            <div class="select-img"><img src="../../assets/images/renewal4.png" alt="" class="imgauto"></div>
            <div class="select-detail">
              <div>
                <div>专属车险顾问</div>
                <div class="con-b">一对一贴心服务，出险时第一时间为您指引，最快一天可赔付，无需垫款，全程
                  提供咨询
                </div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <section class="my-menu">
    <ul id="menu" :class="style.menu">
      <li id="quo"><router-link to="/quo_quo">报价单</router-link></li>
      <li id="order"><router-link to="/order">预存单</router-link></li>
      <li id="cou"><router-link to="/coupons">优惠券</router-link></li>
      <li id="out" :class="style.out" @click="onLogout()"><a>退出</a></li>
    </ul>
    <ul class="my-ul" @click=onMyUl()>
      <li><a>&nbsp;<em class="icon-mypeople"></em>&nbsp;</a></li>
    </ul>
  </section>
  <div class="tip-login" :class="style.tipLogin">
    <div class="bg-filter"></div>
    <div class="tip-filter-box">
      <h3 class="title">确定退出吗？</h3>
      <div class="btn-confirm">
        <a id="cancel" class="btn btn-cancel" @click=onCancel()>取消</a><a id="sure" class="btn" @click=onSure()>确定</a>
      </div>
    </div>
  </div>
</article>
</template>

<script>
import url from '../common/url'
import cache from '../common/cache'
import Swiper from 'vux/src/components/swiper'
import rest from '../../rest'

export default {
  components: {
    Swiper
  },
  data () {
    return {
      // 数据
      storeId: '10',
      sp: {
        '10': [{
          title: 'first',
          img: require('../../assets/images/banner1.jpg'),
          // img: '../../assets/images/banner1.jpg',
          url: 'http://mp.weixin.qq.com/s?__biz=MzIwMDYzNTQwMw==&mid=2247483666&idx=1&sn=debf3dd8427deb278747c6d793c2fb91#rd'
        }, {
          title: 'second',
          // img: '../../assets/images/banner2.jpg',
          img: require('../../assets/images/banner2.jpg'),
          url: 'http://mp.weixin.qq.com/s?__biz=MzIwMDYzNTQwMw==&mid=2247483665&idx=1&sn=efc42323b8d6e48f2251a8b353cc20e6#rd'
        }],
        '2': [{
          title: 'first',
          img: '../../assets/images/banner1.jpg',
          url: ''
        }, {
          title: 'second',
          img: '../../assets/images/banner2.jpg',
          url: ''
        }]
      },
      // 样式
      style: {
        menu: { // 用户信息列表
          'fn-hide': true
        },
        tipLogin: { // 登出提示框
          'fn-hide': true
        },
        out: { // 登出按钮
          'fn-hide': true
        }
      },
      outerLink: []
    }
  },
  created () {
    const _this = this
    this.storeId = url.getParams(window.location.search.substr(1)).store_id
    if (!this.storeId) {
      this.storeId = cache.getLocalStorageData(cache.keyMap.CACHE_STORE_ID)
    }
    // 登录态
    if (this.storeId) {
      // swiper
      this.outerLink = this.sp[this.storeId]
        // login status
      this.isLogin(null, this.storeId + '/is-login').then((res) => {
        if (res.code === 0) {
          _this.toggle(this.style.out, 'fn-hide')
          console.log('get login status succ', res)
        }
      })
    }
  },
  methods: {
    isLogin: rest.login.isLogin,
    logout: rest.login.out,
    toggle (obj, key) {
      obj[key] = !obj[key]
    },
    onLogout () {
      this.toggle(this.style.tipLogin, 'fn-hide')
    },
    onMyUl () {
      this.toggle(this.style.menu, 'fn-hide')
    },
    onCancel () {
      this.toggle(this.style.tipLogin, 'fn-hide')
      this.toggle(this.style.menu, 'fn-hide')
    },
    onSure () {
      let _this = this
      this.toggle(this.style.tipLogin, 'fn-hide')
      this.logout().then((res) => {
        if (res.code === 0) {
          _this.toggle(this.style.menu, 'fn-hide')
          _this.toggle(this.style.out, 'fn-hide')
        } else {
          // 提示信息
        }
      })
    }
  }
}
</script>

<style>
</style>