/**
 * url help methods
 */
export default {
  /**
   * 将查询字符串解析成一个对象
   * @param str
   * @returns {{}}
   */
  getParams (str) {
    let rs = {}
    if (typeof str === 'string' && str.trim()) {
      let decode = decodeURIComponent
      let pairs = str.split('&')
      for (let i = 0, l = pairs.length; i < l; ++i) {
        let pair = pairs[i].split('=')
        let key = decode(pair[0]).replace('[]', '')
        let val = decode(pair[1])
        if (key in rs) {
          if (Array.isArray(rs[key])) {
            rs[key].push(val)
          } else {
            rs[key] = [rs[key], val]
          }
        } else {
          rs[key] = val
        }
      }
    }
    return rs
  }
}
