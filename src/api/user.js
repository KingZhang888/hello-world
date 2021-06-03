// userjs模块 封装关于用户方面的api接口 并且提供接口
import http from '@/utils/request'
// import store from '@/store/index'
// 登录注册接口
export const reqLogin = (mobile, code) => {
  return http({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

// 获取用户个人信息资料
export const reqGetProfile = () => {
  // const token = store.state.user.tokenInfo.token
  return http({
    url: '/v1_0/user/profile',
    method: 'GET'
    // headers: { Authorization: `Bearer ${token}` }
  })
}
