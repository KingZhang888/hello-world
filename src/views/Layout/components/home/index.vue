<template>
  <div class="home-container">
    <van-tabs v-model="active">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- <div v-for="(a,index) in 30 " :key="index">{{ a }}内容{{ item.name }}</div> -->
        <!-- <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list> -->
        <!-- 封装内容列表 如果都往home组件放代码太混乱 -->
        <article-list ref="articleList" :channel="item" @showMore="showMore" @closePoP="show = false" />
      </van-tab>
    </van-tabs>
    <van-popup v-model="show" :style="{ width: '80%' }">
      <more-action @dislike="dislike" />
    </van-popup>
  </div>
</template>

<script>
import { reqGetChannels } from '@/api/channels'
import articleList from './components/articleList.vue'
import MoreAction from './components/moreAction.vue'
export default {
  name: 'Home',
  components: { articleList, MoreAction },
  data() {
    return {
      active: 0, // 通过 v-model 绑定当前激活标签对应的索引
      channels: [], // 用户频道数据
      // list: [],
      // loading: false,
      // finished: false
      show: false, // 控制Popup显示隐藏
      channelId: ''
    }
  },
  created() {
    // 调用用户频道方法
    this.loadChannels()
  },
  methods: {
    // 封装用户频道方法 初始化后created钩子函数自执行
    async loadChannels() {
      const res = await reqGetChannels()
      // console.log(res)
      this.channels = res.data.data.channels
    },
    /*  onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    } */
    showMore(boo, channelId) {
      // 展示弹出层
      this.show = boo
      // console.log(channelId)
      this.channelId = channelId
    },
    dislike() {
      // console.log('父组件收到不感兴趣通知')
      // console.log(this.$refs.articleList)
      const index = this.$refs.articleList.findIndex(item => item.channel.id === this.channelId)
      this.$refs.articleList[index].spliceList()
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  padding-top: 44px;
  height: calc(100vh - 46px - 50px);
  box-sizing: border-box;
  ::v-deep .van-tabs {
    height: 100%;
    .van-tabs__wrap {
     position: fixed;
     top: 46px;
     left: 0;
     width: 100%;
    }
     .van-tabs__line {
       background-color: #3196fa;
    }
   .van-tabs__content {
     height: 100%;
     overflow: auto;
    }
  }

}
</style>
