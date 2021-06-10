// 频道的store模块
const state = {
  // vuex中提供我的频道数据
  channels: [],
  allChannels: []
}
const mutations = {
  // 设置我的频道的数据
  setChannels(state, channels) {
    state.channels = channels
  },
  // 设置所有频道
  allSetChannels(state, allChannels) {
    state.allChannels = allChannels
  },
  // 点击可选频道追加我的频道数据
  addMyChannels(state, channel) {
    state.channels.push(channel)
  },
  // 移除我的频道的mutation
  removeChannels(state, i) {
    state.channels.splice(i, 1)
  }
}
const getters = {
  // getters中定义可选频道
  optionalChannels(state) {
    // 方法一
    /* return state.allChannels.filter(item => {
      let flag = true
      state.channels.forEach(channel => {
        if (item.id === channel.id) {
          flag = false
        }
      })
      return flag
    }) */
    // 方法二
    // return state.allChannels.filter(item => {
    //   const i = state.channels.findIndex(channel => {
    //     return item.id === channel.id
    //   })
    //   // console.log(i)
    //   if (i === -1) {
    //     return true
    //   } else {
    //     return false
    //   }
    // })
    return state.allChannels.filter(item => state.channels.findIndex(channel => item.id === channel.id) === -1)
  }
}
const actions = {}

export default {
  state,
  mutations,
  getters,
  actions,
  // 开启命名空间
  namespaced: true
}
