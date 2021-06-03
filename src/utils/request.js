// 这个js模块是关于axios的模块文件,关于axios的配置都会在这个js文件书写
import axios from 'axios'
import store from '@/store/index'
// 接口大数据处理包
import JSONbig from 'json-bigint'

// 创建axios实例,对axios进行配置
const http = axios.create({
  // baseURL: 'http://toutiao.cn.utools.club', // 基地址
  baseURL: 'http://toutiao-app.itheima.net', // 现基地址
  timeout: 3000, // 请求服务3s没有响应，终止服务
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function(data) {
    // 对 data 进行任意转换处理
    try {
      return JSONbig.parse(data)
    } catch (err) {
      return data
    }
  }]

})

// 添加请求拦截器
http.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  const token = store.state.user.tokenInfo.token
  // console.log(config)
  // console.log('经过了请求拦截器')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 导出http实例
export default http
