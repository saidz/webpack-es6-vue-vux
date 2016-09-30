/**
 * cache help methods
 */
import url from './url'
export default {
  buffer: {
    nonMark: false, // 无痕浏览：用户数据不存本地，刷新即丢失
    zsData: {
      localData: {}, // 本地数据
      sessionData: {} // 动态数据
    }
  },
  keyMap: {
    'CACHE_STORE_ID': 'cache_store_id',
    'CACHE_STORE_STATUS': 'cache_store_status'
  },
  init () { // 判断localStorage是否可用，不可用则设置为无痕模式
    if (!window.localStorage || !window.sessionStorage) {
      this.buffer.nonMark = true
    } else {
      try {
        window.localStorage.setItem('test', {})
        window.sessionStorage.setItem('test', {})
      } catch (e) {
        this.buffer.nonMark = true
      }
    }
    let hashParams = url.parseHash(window.location.hash).params
    let storeId = hashParams && hashParams.store_id ? hashParams.store_id : url.getParams(window.location.search.substr(1)).store_id
    if (storeId) {
      this.setLocalStorageData(this.keyMap.CACHE_STORE_ID, storeId)
    }
  },
  /**
   * 设置会话数据，临时数据存储使用
   * @param key
   * @param val
   * @return {*}
   */
  setSessionData (key, val) {
    if (!this.buffer.nonMark && window.sessionStorage.setItem) {
      try {
        window.sessionStorage.setItem(key, JSON.stringify(val))
      } catch (e) {
        this.buffer.nonMark = true
        this.buffer.zsData.sessionData[key] = val
      }
    } else {
      this.buffer.zsData.sessionData[key] = val
    }
  },
  /**
   * 获取会话数据，临时数据存储使用
   * @param key
   * @return {*}
   */
  getSessionData (key) {
    if (!this.buffer.nonMark && window.sessionStorage.getItem) {
      var val = window.sessionStorage.getItem(key)
      return (val === null || val === '') ? val : JSON.parse(val)
    } else {
      return this.buffer.zsData.sessionData[key]
    }
  },
  setLocalStorageData (key, val) {
    if (!this.buffer.nonMark && window.localStorage.setItem) {
      try {
        window.localStorage.setItem(key, JSON.stringify(val))
      } catch (e) {
        this.buffer.nonMark = true
        this.buffer.zsData.localData[key] = val
      }
    } else {
      this.buffer.zsData.localData[key] = val
    }
  },
  getLocalStorageData (key) {
    if (!this.buffer.nonMark && window.localStorage.getItem) {
      var val = window.localStorage.getItem(key)
      return (val === null || val === '') ? val : JSON.parse(val)
    } else {
      return this.buffer.zsData.localData[key]
    }
  },
  clearSessionData (key) {
    if (window.sessionStorage.removeItem && !this.buffer.nonMark) {
      window.sessionStorage.removeItem(key)
    } else {
      this.buffer.zsData.sessionData[key] = []
    }
  },
  clearLocalStorageData (key) {
    if (window.localStorage.removeItem && !this.buffer.nonMark) {
      window.localStorage.removeItem(key)
    } else {
      this.buffer.zsData.localData[key] = []
    }
  }
}
