/**
 * ajax request help
 */
export default {
  baseUrl: 'replacing_api',
  parse (path, id) {
    if (typeof id === 'string') {
      return path + '/' + 'id'
    }
    if (typeof id === 'object') {
      let search = '?'
      let counter = 0
      for (let key in id) {
        if (counter) search += '&'
        search += key + '=' + id[key]
        counter++
      }
      return path + search
    }
    return path
  },
  query (path) {
    let _this = this
    let url = ''
    return function (id, expand) {
      if (expand) {
        url = path + '/' + expand
      } else {
        url = path
      }
      let newPath = url
      if (id) {
        newPath = _this.parse(url, id)
      }
      return this.$http.get(_this.baseUrl + newPath)
    }
  },
  // 增
  create (path) {
    const _this = this
    let url = ''
    return function (data, expand) {
      if (expand) {
        url = path + '/' + expand
      } else {
        url = path
      }
      return this.$http.post(_this.baseUrl + url, data)
    }
  },
  // put 方法~
  put_way (path) {
    const _this = this
    let url = ''
    return function (data, expand) {
      if (expand) {
        url = path + '/' + expand
      } else {
        url = path
      }
      return this.$http.put(_this.baseUrl + url, data)
    }
  },
  // patch 方法~
  patch (path) {
    const _this = this
    let url = ''
    return function (data, expand) {
      if (expand) {
        url = path + '/' + expand
      } else {
        url = path
      }
      return this.$http.patch(_this.baseUrl + url, data)
    }
  }
}
