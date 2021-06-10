// 封装关于搜索的接口
import http from '@/utils/request'

// 获取联想建议（自动补全）
export const reqGetSuggestion = (keyword) => {
  return http({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q: keyword // 请求的前缀语句，关键词
    }
  })
}

// 获取搜索结果
export const reqGetSearch = (q, page) => {
  return http({
    url: '/v1_0/search',
    method: 'GET',
    params: {
      q,
      page
    }
  })
}
