// 封装与频道相关的请求
import http from '@/utils/request'

// 获取用户的频道接口
export const reqGetChannels = () => {
  return	http({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

// 换取所有频道列表接口
export const reqGetAllChannels = () => {
  return http({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 设置用户的频道（重置式）
export const reqSetChannels = (channels) => {
  return http({
    method: 'PUT',
    url: '/v1_0/user/channels',
    data: {
      channels
    }
  })
}
