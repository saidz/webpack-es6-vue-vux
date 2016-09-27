/**
 * ajax request help
 */
export default {
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
      return this.$http.get(newPath || url)
    }
  }
}
