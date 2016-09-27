<template>
<article class="index-box">
  <swiper :list="outerLink" auto></swiper>
  <!--div class="swiper-container swiper-container-horizontal">
    <div class="swiper-wrapper">
      <figure class="swiper-slide" v-for="link in outerLink">
        <a href="{{link.url}}">
          <img height="" src="{{link.img}}" alt="{{link.title}}">
        </a>
      </figure>
    </div>
    <div class="swiper-pagecount swiper-pagination-clickable">
      <span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>
      <span class="swiper-pagination-bullet"></span>
      <span class="swiper-pagination-bullet"></span>
    </div>
  </div-->

  <ul class="tab-row-list">
    <li id="inq"><em class="icon icon1" @click=inq()></em>
      <p>续保询价</p></li>
    <li id="pre"><em class="icon icon2" @click=pre()></em>
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
      <li id="quo" @click="onMenu('quo')"><a>报价单</a></li>
      <li id="order" @click="onMenu('order')"><a>预存单</a></li>
      <li id="cou" @click="onMenu('cou')"><a>优惠券</a></li>
      <li id="out" :class="style.out" @click="onMenu('out')"><a>退出</a></li>
    </ul>
    <ul class="my-ul" @click=onMyUl()>
      <li><a>&nbsp;<em class="icon-mypeople"></em>&nbsp;</a></li>
    </ul>
  </section>
  <div class="tip-login fn-hide">
    <div class="bg-filter"></div>
    <div class="tip-filter-box">
      <h3 class="title">确定退出吗？</h3>
      <div class="btn-confirm">
        <a id="cancel" class="btn btn-cancel">取消</a><a id="sure" class="btn">确定</a>
      </div>
    </div>
  </div>
</article>
</template>

<script>
import url from '../common/url'
import cache from '../common/cache'
import Swiper from 'vux/src/components/swiper'

export default {
  components: {
    Swiper
  },
  data () {
    return {
      // 数据
      storeId: '10',
      sp: {
        '10': [
          {
            title: 'first',
            img: require('../../assets/images/banner1.jpg'),
            // img: '../../assets/images/banner1.jpg',
            url: 'http://mp.weixin.qq.com/s?__biz=MzIwMDYzNTQwMw==&mid=2247483666&idx=1&sn=debf3dd8427deb278747c6d793c2fb91#rd'
          },
          {
            title: 'second',
            // img: '../../assets/images/banner2.jpg',
            img: require('../../assets/images/banner2.jpg'),
            url: 'http://mp.weixin.qq.com/s?__biz=MzIwMDYzNTQwMw==&mid=2247483665&idx=1&sn=efc42323b8d6e48f2251a8b353cc20e6#rd'
          }
        ],
        '2': [
          {
            title: 'first',
            img: '../../assets/images/banner1.jpg',
            url: ''
          },
          {
            title: 'second',
            img: '../../assets/images/banner2.jpg',
            url: ''
          }
        ]
      },
      is_login: false,
      // 样式
      style: {
        menu: {
          'fn-hide': true
        },
        tipLogin: {
          'fn-hide': true
        },
        out: {
          'fn-hide': true
        }
      },
      outerLink: null
    }
  },
  created () {
    let _this = this
    this.storeId = url.getParams(window.location.search.substr(1)).store_id
    if (!this.storeId) {
      this.storeId = cache.getLocalStorageData(cache.keyMap.CACHE_STORE_ID)
    }
    // 登录态
    if (this.storeId) {
      // swiper
      this.outerLink = this.sp[this.storeId]
      // login status
      this.$http.get('/api/v1/10/is-login').then((res) => {
        if (res.code === 0) {
          _this.is_login = res.data.is_login
          console.log('get login status succ', res)
        }
      }, (res) => {
        console.log('get login status faild', res)
      })
    }
  },
  methods: {
    toggle (obj, key) {
      obj[key] = !obj[key]
    },
    inq () {
      console.log('inq')
    },
    pre () {
      console.log('pre')
    },
    onMenu (id) {
      console.log('onMenu', id)
      switch (id) {
        // case 'quo':
        //   window.page.initPage('quo_quo', {}, 1)
        //   break
        // case 'order':
        //   window.page.initPage('order', {}, 1);
        //   break;
        // case 'cou':
        //   window.page.initPage('coupons', {}, 1);
        //   break;
        case 'out':
          this.toggle(this.style.tipLogin, 'fn-hide')
          break
      }
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
      this.$http.get().then((res) => {
        if (res.code === 0) {
          _this.toggle(this.style.menu, 'fn-hide')
          _this.toggle(this.style.out, 'fn-hide')
        } else {
          // 提示信息
        }
      }, (res) => {

      })
    }
  }
}
</script>

<style>
</style>