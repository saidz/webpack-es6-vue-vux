/**
 * 服务接口
 */
import ajax from './components/common/ajax'
export default {
  // 续保询价
  inq: {
    // 1. 获取所有险种和保险公司信息
    getInsuresList: ajax.query('/insures'),
    // 2. 提交询价
    commitInq: ajax.create('')
  },
  // 预存保费
  pre: {
    // 1.预存保费赠券规则
    getPrestoreRuler: ajax.query(''),
    // 2.预交保费
    preCommit: ajax.create(''),
    // 3.查询赠送的优惠券
    getGivenCoupons: ajax.query('')
  },
  login: {
    // 1.发送验证码
    sendCaptcha: ajax.create(''),
    // 2.登录
    toLogin: ajax.create(''),
    // 3.登出
    out: ajax.create('/logout'),
    // 4.是否登录
    isLogin: ajax.query('')
  },
  my: {
    // 1.获取报价单列表
    getQuoList: ajax.query(''),
    // 2.详情-待报价
    getNoQuoInfo: ajax.query('/ins-inquiry'),
    // 3.详情-待支付
    getNoPaidInfo: ajax.query('/ins-offer'),
    // 4.详情-待支付
    getPaidInfo: ajax.query('/ins-offer'),
    // 5.创建续保订单
    createInquiryOrder: ajax.create(''),
    // 6.预存单
    getOrderList: ajax.query(''),
    // 7.我的优惠券
    getMyCoupons: ajax.query(''),
    // 8.优惠券详情
    getCouponDetail: ajax.query('')
  },
  local: {
    // 1.获取员工生成的预存保费订单
    getEmployerOrder: ajax.query('/prepay-order-by-staff'),
    // 2.获取员工生成的预交保费单的微信支付信息
    createOrderByEmployer: ajax.create('')
  },
  // 微信相关
  wx: {
    getWeChatConfigResource: ajax.query('')
  }
}
