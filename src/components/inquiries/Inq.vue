<template>
  <article>
    <h2 class="title-bar">
      确认险种
    </h2>
    <div class="select-list-ins">
      <ul class="gap-left">
        <li id="likeBefore" @click="onLikeBefore">
          与去年一致
          <em class="icon-blue-hook" :class="style.likeBefore">
          </em>
        </li>
      </ul>
    </div>
    <div class="select-list-ins mt10">
      <ul class="gap-left">
        <li id="refresh" @click="onRefresh">
          重新勾选险种
          <em class="icon-triangle-up" :class="style.triangle">
          </em>
        </li>
        <li class="list-ins-li" id="list-ins-li" :class="style.insList">
          <ul>
            <li v-for="(item, index) in list.insures" :data-id="item.id" @click="onChoiceInsItem(index)">
              {{item.name}}
              <em class="icon-blue-hook" :class="style['insItem_'+index]">
              </em>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="select-list-arrow mt10 fn-hide" :class="style.selectListArrow">
      <ul class="gap-left">
        <li id="select_company" @click="onOpenCompanyBox">
          <div class="vh">
            选择保险公司
          </div>
          <span class="arrow-right" id="company">
            选择{{company}}
          </span>
        </li>
      </ul>
    </div>
    <section class="form-wrap">
      <h2 class="title-bar">
        联系人
      </h2>
      <div class="mod-form">
        <div class="form-line">
          <label class="form-label" for="">
            姓名
          </label>
          <div class="form-element">
            <input class="in-text" id="customer-name" v-model="form.userName" name="customer-name" placeholder="请输入您的姓名" type="text" value="">
            </input>
          </div>
        </div>
        <div class="form-line">
          <label class="form-label" for="">
            手机号
          </label>
          <div class="form-element">
            <input class="in-text" v-model="form.mobile" id="customer-mobile" maxlength="11" name="customer-mobile" placeholder="请输入您的手机号" type="tel" :value="list.mobile">
            </input>
          </div>
        </div>
        <div class="form-line">
          <label class="form-label" for="">
            车牌号
          </label>
          <div class="form-element">
            <input class="in-text" id="car-plate-no" v-model="form.plateNumber" name="car-plate-no" placeholder="请输入您的车牌号" type="text" value="">
            </input>
          </div>
        </div>
      </div>
    </section>
    <section class="btn-bottom">
      <div class="btn-fix">
        <a class="btn" @click="onSubmit">
          提交询价
        </a>
      </div>
    </section>
    <div class="tip-ins-box fn-hide" id="tip-ins-box" :class="style.tipInsBox">
      <div class="bg-filter">
      </div>
      <div class="tip-filter-box select-list-ins">
        <div class="list-ins-li">
          <ul class="gap-left-right">
            <!-- <li>保险公司 a</li>
           <li>保险公司 b<em class="icon-blue-hook"></em></li>-->
            <li v-for="(item, index) in list.companys" :data-id="item.id" @click="onSelectInsCompany(index)">
              {{item.name}}
              <em class="icon-blue-hook" :class="style['insCompany_'+index]"></em>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <toast :show.sync="toastShow" type="text" width="10em" :time="toastTime">{{toastTxt}}</toast>
  </article>
</template>

<script>
import Vue from 'vue'
import rest from '../../rest'
import util from '../common/util'
import cache from '../common/cache'
import toast from '../common/toast.mixin'

export default {
  mixins: [toast],
  data () {
    return {
      company: '',
      list: {
        companys: [],
        insures: [],
        mobile: ''
      },
      form: { // 表单提交的数据
        storeId: '',
        userName: '',
        plateNumber: '',
        mobile: '',
        companyId: '',
        SAME_WITH_LAST_YEAR: true,
        insures: []
      },
      style: {
        likeBefore: {
          'icon-blue-hook': true
        },
        triangle: {
          'icon-triangle-up': true,
          'icon-triangle-down': false
        },
        insList: {
          'fn-hide': true
        },
        selectListArrow: {
          'fn-hide': true
        },
        tipInsBox: {
          'fn-hide': true
        }
      }
    }
  },
  created () {
    let _this = this
    this.getInsuresList().then((res) => {
      if (res.code === 0) {
        console.log(res)
        _this.list = res.data
        _this.form.mobile = _this.list.mobile
         // 保险条目样式初始化
        _this.list.insures.forEach((v, i) => {
          Vue.set(_this.style, 'insItem_' + i, {'fn-hide': !v.is_force})
        })
        // 保险公司样式初始化
        _this.list.companys.forEach((v, i) => {
          Vue.set(_this.style, 'insCompany_' + i, {'fn-hide': true})
        })
      }
    }, (res) => {
      console.log('faild', res)
    })
  },
  methods: {
    getInsuresList: rest.inq.getInsuresList, // 获取保险列表
    commitInq: rest.inq.commitInq, // 提交保单
    toggle (obj, key) {
      obj[key] = !obj[key]
    },
    onLikeBefore () {
      this.toggle(this.style.triangle, 'icon-triangle-up')
      this.toggle(this.style.triangle, 'icon-triangle-down')
      this.toggle(this.style.insList, 'fn-hide')
      this.toggle(this.style.selectListArrow, 'fn-hide')
      this.toggle(this.form, 'SAME_WITH_LAST_YEAR')
    },
    onRefresh () {
      this.toggle(this.style.likeBefore, 'icon-blue-hook')
      this.toggle(this.style.triangle, 'icon-triangle-up')
      this.toggle(this.style.triangle, 'icon-triangle-down')
      this.toggle(this.style.insList, 'fn-hide')
      this.toggle(this.style.selectListArrow, 'fn-hide')
      this.toggle(this.form, 'SAME_WITH_LAST_YEAR')
    },
    onOpenCompanyBox () {
      this.toggle(this.style.tipInsBox, 'fn-hide')
    },
    onSelectInsCompany (index) {
      this.toggle(this.style['insCompany_' + index], 'fn-hide')
      this.company = this.list.companys[index].name
      this.form.companyId = this.list.companys[index].id
      setTimeout(() => {
        this.toggle(this.style.tipInsBox, 'fn-hide')
      }, 300)
    },
    onChoiceInsItem (index) {
      if (this.list.insures[index]['is_force']) {
        this.style['insItem_' + index]['fn-hide'] = false
      } else {
        this.toggle(this.style['insItem_' + index], 'fn-hide')
      }
    },
    onSubmit () {
      if (!this.form.companyId && !this.form.SAME_WITH_LAST_YEAR) {
        this.showToast('请选择保险公司')
        return false
      }
      if (!util.regexpMap.regexp_mobile.test(this.form.mobile)) {
        this.showToast('请输入正确的手机号')
        return false
      }
      if (!util.regexpMap.regexp_name_cn.test(this.form.userName) && !util.regexpMap.regexp_name_en.test(this.form.userName)) {
        this.showToast('请输入您的姓名')
        return false
      } else if (util.regexpMap.regexp_name_en.test(this.form.userName) && this.form.userName.length > 30) {
        this.showToast('联系人英文姓名需小于30个字符')
        return false
      }
      if (this.form.SAME_WITH_LAST_YEAR) {
        // 将选中的保险条目推入表单中
        this.list.insures.forEach((v, i) => {
          if (!this.style['insItem_' + i]['fn-hide']) {
            this.form.insures.push(v.id)
          }
        })
      }
      this.form.storeId = cache.getLocalStorageData(cache.keyMap.CACHE_STORE_ID)
      if (this.form.storeId) {
        this.commitInq({
          'company_id': this.form.companyId,
          'mobile': this.form.mobile,
          'user_name': this.form.userName,
          'plate_number': this.form.plateNumber,
          'same_with_last_year': this.form.SAME_WITH_LAST_YEAR,
          'insures': this.form.insures.join(',') || ''
        }, this.form.storeId + '/inquiry-insure').then((res) => {
          if (res.code === 0) {
            this.$router.go('/inq_succ')
          }
        })
      }
    }
  }
}
</script>
<style>
</style>