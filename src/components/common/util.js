/**
 * util helper methods
 */
export default {
  regexpMap: {
    regexp_mobile: /^1[3|4|5|7|8]\d{9}$/,              // 手机校验
    regexp_name_cn: /^([\u4e00-\u9fa5]{2,8})$/,        // 中文姓名校验
    regexp_name_en: /^([A-Z]+\s?[A-Z]*\s?[A-Z]*)$/i,   // 英文姓名校验
    regexp_captcha: /^\d{6}$/,                         // 验证码校验
    car_plate_number: /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9\u4e00-\u9fa5]{1}$/i, // 车牌号校验
    regexp_vin: /^[A-HJ-NPR-Z\d]{8}[\dX][A-HJ-NPR-Z\d]{2}\d{6}$/i, // 车架号
    regexp_car_mileage: /\d+/ // 里程
  },
  sendCaptcha (timer) {
    if (timer.seconds-- > 0) {
      timer.text = '剩余: ' + timer.seconds + ' 秒'
      clearTimeout(timer.secondsTimer)
      timer.secondsTimer = setTimeout(() => {
        this.sendCaptcha(timer)
      }, 1000)
    } else {
      clearTimeout(timer.secondsTimer)
      timer.secondsTimer = null
      timer.text = '获取验证码'
    }
  }
}
