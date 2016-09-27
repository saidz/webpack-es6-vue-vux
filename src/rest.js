/**
 * 服务接口
 */
import ajax from './components/common/ajax'
export default {
  // 续保询价
  inq: {
    // 1. 获取所有险种和保险公司信息
    getInsuresList: ajax.query('/insures')
    // 2. 提交询价
    // commitInq: ajax.create('',component)
  }
}
