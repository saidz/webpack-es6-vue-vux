<template>
  <article>
    <h2 class="title-bar">
      确认险种
    </h2>
    <div class="select-list-ins">
      <ul class="gap-left">
        <li id="likeBefore">
          与去年一致
          <em class="icon-blue-hook">
          </em>
        </li>
      </ul>
    </div>
    <div class="select-list-ins mt10">
      <ul class="gap-left">
        <li id="refresh">
          重新勾选险种
          <em class="icon-triangle-up">
          </em>
        </li>
        <li class="list-ins-li fn-hide" id="list-ins-li">
          <ul>
            <li v-for="item in list.companys" data-id="{{item.id}}">
              {{item.name}}
              <em v-if="item.is_force" class="icon-blue-hook">
              </em>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="select-list-arrow mt10 fn-hide">
      <ul class="gap-left">
        <li id="select_company">
          <div class="vh">
            选择保险公司
          </div>
          <span class="arrow-right" id="company">
            选择
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
            <input class="in-text" id="customer-name" name="customer-name" placeholder="请输入您的姓名" type="text" value="">
            </input>
          </div>
        </div>
        <div class="form-line">
          <label class="form-label" for="">
            手机号
          </label>
          <div class="form-element">
            <input class="in-text" id="customer-mobile" maxlength="11" name="customer-mobile" placeholder="请输入您的手机号" type="tel" value="{{list.mobile}}">
            </input>
          </div>
        </div>
        <div class="form-line">
          <label class="form-label" for="">
            车牌号
          </label>
          <div class="form-element">
            <input class="in-text" id="car-plate-no" name="car-plate-no" placeholder="请输入您的车牌号" type="text" value="">
            </input>
          </div>
        </div>
      </div>
    </section>
    <section class="btn-bottom">
      <div class="btn-fix">
        <a class="btn">
          提交询价
        </a>
      </div>
    </section>
    <div class="tip-ins-box fn-hide" id="tip-ins-box">
      <div class="bg-filter">
      </div>
      <div class="tip-filter-box select-list-ins">
        <div class="list-ins-li">
          <ul class="gap-left-right">
            <!-- <li>保险公司 a</li>
           <li>保险公司 b<em class="icon-blue-hook"></em></li>-->
            <li v-for="item in list.companys" data-id="{{item.id}}">
              {{item.name}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
// import ajax from '../../ajax'
import rest from '../../rest'

export default {
  data () {
    return {
      list: {
        companys: []
      },
      SAME_WITH_LAST_YEAR: true
    }
  },
  created () {
    this.getInsuresList().then((res) => {
      console.log('succ', res)
      if (res.code === 0) {
        this.list = res.data
      }
    }, (res) => {
      console.log('faild', res)
    })
  },
  methods: {
    getInsuresList: rest.inq.getInsuresList
  }
}
</script>
<style>
</style>