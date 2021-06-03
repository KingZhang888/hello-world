// vuex 用户模板
// 导入封装的本地存储
import { setToken, getToken } from '@/utils/storage'
const state = {
  // token数据
  // tokenInfo: JSON.parse(localStorage.getItem('tokenInfo')) || {}
  tokenInfo: getToken() || {}
}
// 存放操作数据的方法
const mutations = {
  setTokenInfo(state, tokenObj) {
    state.tokenInfo = tokenObj
    // localStorage.setItem('tokenInfo', JSON.stringify(tokenObj))
    setToken(tokenObj)
  }
}
const getters = {}
const actions = {}

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true // 开启命名空间
}

