// 封装文章相关的接口
import http from '@/utils/request'

// 获取文章新闻推荐 (新地址)
// export const reqGetArticles = (channel_id, timestamp) => {
//   return http({
//     method: 'GET',
//     url: '/v1_0/articles',
//     params: {
//       channel_id,
//       timestamp
//     }
//   })
// }

// 获取文章新闻推荐 (旧地址)
export const reqGetArticles = (channel_id, timestamp) => {
  return http({
    method: 'GET',
    url: '/v1_1/articles',
    params: {
      channel_id,
      timestamp,
      with_top: 1
    }
  })
}

// 对文章不喜欢
export const reqDisLikeArticle = (target) => {
  return http({
    method: 'POST',
    url: '/v1_0/article/dislikes',
    data: {
      target
    }
  })
}
