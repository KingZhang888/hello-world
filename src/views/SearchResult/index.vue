<template>
  <div class="search-result">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="$route.query.keyword + '的搜索结果'"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 文章列表 -->
    <van-list
      v-model="loading"
      class="article-list"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.art_id.toString()"
        :title="item.title"
        @click="$router.push('/article')"
      />

    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { reqGetSearch } from '@/api/search'
export default {
  name: 'SearchResult',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    async onLoad() {
      // 获取搜索结果文章信息
      const keyword = this.$route.query.keyword
      const { data: { data: { results }}} = await reqGetSearch(keyword, this.page)
      // 把请求的数据追加到list数组上
      this.list.push(...results)
      // 页码自加，保证返回的数据不重复
      this.page++
      // 加载状态结束
      this.loading = false
      // 判断是否有数据 没有显示 ‘没有更多了’
      if (!results.length) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-result {
  .article-list {
    margin-top: 39px;
  }
}
</style>
