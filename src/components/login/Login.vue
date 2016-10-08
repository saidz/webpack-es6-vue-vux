<template>
  <article>
    <section class="form-wrap login-box">
      <div class="mod-form">

        <div class="form-line">
          <label for="" class="form-label">&nbsp;<em class="icon-iphone-login"></em></label>
          <div class="form-element">
            <input id="mobile" name="customer-mobile" v-model="mobile" type="tel" class="in-text" placeholder="请输入您的手机号" maxlength="20"
                   :value="gapMobile">
            <em class="icon-close" :class="style.iconClose" @click="onClear"></em>
          </div>

        </div>
        <div class="form-line">
          <label for="" class="form-label">&nbsp;<em class="icon-password"></em></label>
          <div class="form-element">
            <input id="verify_code" v-model="verifyCode" type="number" class="in-text" placeholder="请输入短信验证码" maxlength="6" :value="">
          </div>
          <a class="form-code" @click="onGetCode()">{{timer.txt}}</a>
        </div>

      </div>
      <div class="login-btn">
        <a class="btn" @click="onSubmit()">登录</a>
      </div>
    </section>
  </article>
  <toast :show.sync="toastShow" type="text" :time="toastTime">{{toastTxt}}</toast>
</template>

<script>
import url from '../common/url'
import cache from '../common/cache'
import util from '../common/util'
import rest from '../../rest'
import toast from '../common/toast.mixin'

export default {
  mixins: [toast],
  data () {
    return {
      mobile: '',
      verifyCode: '',
      storeId: '10',
      backUrl: '',
      timer: {
        secondsTimer: null,
        seconds: 60,
        txt: '获取验证码'
      },
      style: {
        iconClose: {
          'fn-hide': true
        }
      }
    }
  },
  computed: {
    gapMobile () {
      let mobile = this.mobile.replace(/\s/g, '')
      let isValid = util.regexpMap.regexp_mobile.test(mobile)
      if (isValid) {
        this.style.iconClose['fn-hide'] = false
      }
      return this.insertGap2Mobile(mobile)
    }
  },
  created () {
    let hashParams = url.parseHash(window.location.hash).params
    this.backUrl = hashParams && hashParams.next ? hashParams.next : ''
    this.storeId = cache.getLocalStorageData(cache.keyMap.CACHE_STORE_ID)

    if (!this.storeId) {
      this.storeId = cache.getLocalStorageData(cache.keyMap.CACHE_STORE_ID)
    }
  },
  methods: {
    // api login
    login: rest.login.toLogin,
    // api get check code
    sendCaptcha: rest.login.sendCaptcha,
    insertGap2Mobile (mobile) {
      // 在号码中插入空格
      let tmpStr = ''
      for (let i = 0; i < mobile.length; ++i) {
        if (i === 3 || i === 7) {
          tmpStr += ' ' + mobile[i]
        } else {
          tmpStr += mobile[i]
        }
      }
      return tmpStr
    },
    onGetCode () {
      if (!util.regexpMap.regexp_mobile.test(this.mobile)) {
        this.showToast('请输入正确的手机号码')
        return false
      }
      if (this.timer.secondsTimer !== null) {
        this.showToast('请您在 ' + '' + ' 秒后重试!')
      }
      this.sendCaptcha(null, this.storeId + '/verify_code/' + this.mobile).then((res) => {
        if (res.code === 0) {
          this.timer.seconds = 60
          util.sendCaptcha(this.timer)
        } else {
          this.showToast(res.message)
        }
      })
    },
    onClear () {
      this.mobile = ''
      this.style.iconClose['fn-hide'] = true
    },
    onSubmit () {
      if (!util.regexpMap.regexp_mobile.test()) {
        this.showToast('请输入正确的手机号码')
        return false
      }
      if (!util.regexpMap.regexp_captcha.test(this.verifyCode)) {
        this.showToast('请输入正确的短信验证码')
        return false
      }
      this.login({
        mobile: this.mobile.replace(/\s/g, ''),
        verify_code: this.verifyCode
      }).then((res) => {
        if (res.code === 0) {
          if (this.backUrl) {
            this.$router.go(this.backUrl)
          } else {
            this.$router.go('/inq_index')
          }
        }
      })
    }
  }
}
</script>

<style>
</style>