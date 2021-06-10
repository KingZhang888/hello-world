import Vue from 'vue'
import Vuex from 'vuex'
// 导入user模块
import user from '@/store/modules/user'
// 导入频道管理模块
import channels from './modules/channels'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    channels
  }
})
