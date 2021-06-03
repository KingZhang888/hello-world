// // 对dayjs，进行封装
// import dayjs from 'dayjs'
// import Vue from 'vue'

// // 1. 导入相对时间包
// import relativeTime from 'dayjs/plugin/relativeTime'
// // 2. 给dayjs添加扩展包
// dayjs.extend(relativeTime)
// // 3. 导入汉化包
// import 'dayjs/locale/zh-cn'
// // 4. 全局使用
// dayjs.locale('zh-cn')
// // 格式化时间的过滤器 测试
// Vue.filter('fmItem', (val) => {
//   return dayjs(val).format('YYYY-MM-DD')
// })

// Vue.filter('relativeTime', (val) => {
//   // .from .to .fromNow .toNow
//   return dayjs(val).from()
// })

// 对dayjs，进行封装
import dayjs from 'dayjs'

// 1. 导入相对时间包
import relativetime from 'dayjs/plugin/relativeTime'
// 2. 给dayjs添加扩展包
dayjs.extend(relativetime)
// 3. 导入汉化包
import 'dayjs/locale/zh-cn'
// 4. 全局使用
dayjs.locale('zh-cn')
// 格式化时间的过滤器 测试
export const fmItem = (val) => {
  return dayjs(val).format('YYYY-MM-DD')
}

export const relativeTime = (val) => {
  // .from .to .fromNow .toNow
  return dayjs(val).from()
}
