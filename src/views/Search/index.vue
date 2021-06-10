<template>
  <div class="search">
    <!-- 搜索组件一级路由   $router.back()返回上一个页面-->
    <van-nav-bar
      left-arrow
      title="搜索中心"
      @click-left="$router.back()"
    />

    <!-- https://youzan.github.io/vant/#/zh-CN/search -->
    <van-search
      v-model.trim="keyword"
      show-action
      placeholder="请输入搜索关键词"
      shape="round"
      @input="getSuggestion"
    >
      <template #action>
        <div @click="clickSearch">搜索</div>
      </template>
    </van-search>

    <!-- 联想建议 -->
    <van-cell-group v-if="keyword">
      <van-cell v-for="(item,index) in showSuggestion" :key="index" icon="search" @click="clickLenovo(index)">
        <div v-html="item" />
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon name="delete-o" color="red" @click="delAllHistory" />
      </van-cell>
      <van-cell v-for="(item,index) in history" :key="index" :title="item" @click="clickHistory(item)">
        <van-icon name="close" @click.stop="delHistoty(index)" />
      </van-cell>
    </van-cell-group>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import { reqGetSuggestion } from '@/api/search'
import { setHistory, getHistory, removeHistory } from '@/utils/storage'
export default {
  name: 'Search',
  data() {
    return {
      keyword: '', // 搜索关键字
      suggestion: [],
      history: getHistory() || [],
      timeId: null
    }
  },
  computed: {
    // 基于返回的suggestion，动态计算出用于渲染的高亮的showSuggestion
    showSuggestion() {
      // RegExp 对象表示正则表达式 它是对字符串执行模式匹配的强大工具
      const regExp = new RegExp(this.keyword, 'gi')
      return this.suggestion.map(item => {
        return item.replace(regExp, (match) => {
          return `<span style="color: red;">${match}</span>`
        })
      })
    }
  },
  methods: {
    // 搜索框触发关键字请求
    getSuggestion() {
      // 防抖优化： 延迟执行  在执行一件事情之前会等一段时间，在这段时间内如果再次触发，则重新等待直到时间结束，执行一次
      clearTimeout(this.timeId)
      this.timeId = setTimeout(async() => {
        // 判断关键字是否为空  如果为空给suggestion空值 返回出去
        if (!this.keyword) {
          this.suggestion = []
          return
        }
        const { data: { data: { options }}} = await reqGetSuggestion(this.keyword)
        // console.log(options)
        this.suggestion = options
      }, 500)
    },
    // 点击搜索添加历史记录
    clickSearch() {
      if (!this.keyword) return
      this.addHistory(this.keyword)
      this.$router.push('/searchResult?keyword=' + this.keyword)
    },
    // 点击联想添加历史记录
    clickLenovo(index) {
      this.addHistory(this.suggestion[index])
      this.$router.push('/searchResult?keyword=' + this.suggestion[index])
    },
    // 点击历史跳转
    clickHistory(item) {
      this.$router.push('/searchResult?keyword=' + item)
    },
    // 添加历史
    addHistory(str) {
      // this.history.unshift(str)
      // 使用new Set方法 把重复历史去重
      // this.history = [...new Set(this.history)]
      const index = this.history.findIndex(item => item === str)
      if (index !== -1) {
        // 说明历史记录中有这一项数据，应该删除
        this.history.splice(index, 1)
      }
      this.history.unshift(str)
      setHistory(this.history)
    },
    // 删除历史
    delHistoty(index) {
      this.history.splice(index, 1)
      setHistory(this.history)
    },
    // 一键清空所有历史
    delAllHistory() {
      this.$dialog.confirm({
        title: '删除所有记录',
        message: '所有的历史记录都会清空的哦！'
      })
        .then(() => {
          // on confirm  移出所有历史记录
          this.history = []
          removeHistory()
        })
        .catch(() => {
          // on cancel
          this.$toast('删除失败')
        })
    }
  }
}
</script>

<style lang="" scoped>

</style>
