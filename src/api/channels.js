// 封装与频道相关的请求
import http from '@/utils/request'

// 获取用户的频道接口
export const reqGetChannels = () => {
  return	http({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
