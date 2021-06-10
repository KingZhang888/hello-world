<template>
  <div class="articleList">
    <!-- <p>文章列表组件 {{ Math.random() }}</p> -->
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" success-text="刷新成功" error-text="刷新失败" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item.art_id.toString()" :title="item.title" @click="$router.push('/article')">
          <template #label>
            <van-grid :border="false" :column-num="item.cover.images.length">
              <van-grid-item v-for="(Img,index) in item.cover.images" :key="index">
                <van-image lazy-load :src="Img" />
              </van-grid-item>
            </van-grid>
            <div class="meta">
              <span>{{ item.aut_name }}</span>
              <span>{{ item.comm_count }}评论</span>
              <span>{{ item.pubdate | relativeTime }}</span>
              <!-- 只有登录的用户才可以看到 -->
              <span v-if="$store.state.user.tokenInfo.token" class="close" @click="showMoreAction(item)">
                <van-icon name="cross" />
              </span>
            </div>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { reqGetArticles, reqDisLikeArticle, reqReportsArticle } from '@/api/acticles'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: '',
      refreshing: false,
      disLikeId: '' // 不感兴趣文章所在的频道id
    }
  },
  methods: {
    async onLoad() {
      // console.log('下拉了')
      if (this.timestamp === '') this.timestamp = +new Date()
      const res = await reqGetArticles(this.channel.id, this.timestamp)
      // console.log(res)
      // this.list.push(...res.data.data.results)
      this.list = [...this.list, ...res.data.data.results]
      this.timestamp = res.data.data.pre_timestamp
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (res.data.data.results.length === 0) {
        this.finished = true
      }
    },
    async onRefresh() {
      // 清空列表数据
      const { data: { data: { results, pre_timestamp }}} = await reqGetArticles(this.channel.id, +new Date())
      this.list = results
      this.timestamp = pre_timestamp
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true
      // this.onLoad()
      this.refreshing = false
    },
    // 点击删除显示弹出层
    showMoreAction(item) {
      // 子传父
      this.$emit('showMore', true, this.channel.id)
      // console.log(item)
      this.disLikeId = item.art_id.toString()
    },
    async spliceList() {
      // console.log('文章列表删除了用户的不感兴趣')
      this.list = this.list.filter(item => item.art_id.toString() !== this.disLikeId)
      await reqDisLikeArticle(this.disLikeId)
      this.$emit('closePoP')
    },
    async reportList(value) {
      // console.log('文章列表收到了举报事件')
      this.list = this.list.filter(item => item.art_id.toString() !== this.disLikeId)
      await reqReportsArticle(this.disLikeId, value)
      // console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.articleList {
  .meta {
    width: 100%;
    span{
      margin-right: 10px;
    }
    .close{
      float: right;
      margin-top: 4px;
    }
  }
}
</style>
