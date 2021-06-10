<template>
  <div class="more-action">
    <!-- 状态一 -->
    <van-cell-group v-if="!isReport">
      <van-cell @click="dislike">不感兴趣</van-cell>
      <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>
    <!-- 状态二 反馈-->
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
      <van-cell v-for="item in reportList" :key="item.value" @click="report(item.value)">{{ item.label }}</van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import reportList from '@/components/report'
export default {
  name: 'MoreAction',
  data() {
    return {
      isReport: false, // 是否是处于状态二：反馈
      reportList
    }
  },
  methods: {
    dislike() {
      this.$emit('dislike')
    },
    report(value) {
      // this.$emit('reportArt')
      // 使用事件中心
      this.bus.$emit('reportArt', value)
    }
  }
}
</script>

<style lang='scss' scoped>
.more-action {
  border-radius: 4px;
}
</style>
