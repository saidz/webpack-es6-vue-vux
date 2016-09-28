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
  login: {
    // 1.发送验证码
    sendCaptcha: ajax.create(''),
    // 2.登录
    toLogin: ajax.create(''),
    // 3.登出
    out: ajax.create('/logout'),
    // 4.是否登录
    isLogin: ajax.query('')
  }
}
