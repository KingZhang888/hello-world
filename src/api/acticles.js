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

// 举报文章
export const reqReportsArticle = (target, type, remark = '') => {
  return http({
    method: 'POST',
    url: '/v1_0/article/reports',
    data: {
      target, // 举报的文章id
      type, // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
      remark // 举报文章说明
    }
  })
}
