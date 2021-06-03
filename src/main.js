import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入axios实例
import http from '@/utils/request'
// 它会根据手机尺寸来调整rem的基准值: html标签上的font-size
import 'amfe-flexible'
// 直接导入vant-ui.js
import '@/utils/vant-ui.js'
// 导入全局样式
import './styles/index.scss'
// 导入封装的dayjs
import { relativeTime } from '@/utils/date-item'
Vue.filter('relativeTime', relativeTime)
// 导入dayjs 时间处理包
// import dayjs from 'dayjs'
// Vue.filter('fmItem', (val) => {
//   return dayjs(val).format('YYYY-MM-DD')
// })

Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
