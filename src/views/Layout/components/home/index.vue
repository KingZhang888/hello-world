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
        <!-- 频道列表开关 通过定位 -->
        <div class="bar-btn" @click="showChannelEdit">
          <van-icon name="wap-nav" />
        </div>
      </van-tab>
    </van-tabs>
    <van-popup v-model="show" :style="{ width: '80%' }">
      <more-action ref="moreAction" @dislike="dislike" />
    </van-popup>
    <!-- 频道管理的弹出层 actionsheet-->
    <van-action-sheet v-model="showChannel" title="频道管理">
      <channel-edit ref="channel" :active="active" @changeTab="changeTab" @changeActive="changeActive" />
    </van-action-sheet>
  </div>
</template>

<script>
import { reqGetChannels, reqGetAllChannels } from '@/api/channels'
import articleList from './components/articleList.vue'
import MoreAction from './components/moreAction.vue'
import ChannelEdit from './components/channelEdit.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'Home',
  components: { articleList, MoreAction, ChannelEdit },
  data() {
    return {
      active: 0, // 通过 v-model 绑定当前激活标签对应的索引
      // channels: [], // 用户频道数据
      // list: [],
      // loading: false,
      // finished: false
      show: false, // 控制Popup显示隐藏
      channelId: '', // 不感兴趣文章所在的id
      showChannel: false // 控制弹出层显示
    }
  },
  computed: {
    ...mapState('channels', ['channels'])
  },
  async created() {
    // 调用用户频道方法
    this.loadChannels()
    // 获取所有频道数据
    const { data: { data: { channels }}} = await reqGetAllChannels()
    // console.log(channels)
    this.allSetChannels(channels)
    // 订阅moreActin举报事件
    this.bus.$on('reportArt', (value) => {
      // console.log('父组件订阅到举报事件')
      // console.log(this.$refs.articleList)
      // console.log(this.channelId)
      const index = this.$refs.articleList.findIndex(item => item.channel.id === this.channelId)
      this.$refs.articleList[index].reportList(value)
      this.show = false
      // this.$refs.moreAction.isReport = false
    })
  },
  methods: {
    ...mapMutations('channels', ['setChannels', 'allSetChannels']),
    // 封装用户频道方法 初始化后created钩子函数自执行
    async loadChannels() {
      const res = await reqGetChannels()
      // console.log(res)
      // this.channels = res.data.data.channels
      this.setChannels(res.data.data.channels)
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
      // vue的dom更新是异步的,点击删除显示弹出层是还没创建出moreAction组件
      this.$nextTick(() => {
        this.$refs.moreAction.isReport = false
      })
      this.channelId = channelId
    },
    // 不敢兴趣
    dislike() {
      // console.log('父组件收到不感兴趣通知')
      // console.log(this.$refs.articleList)
      const index = this.$refs.articleList.findIndex(item => item.channel.id === this.channelId)
      this.$refs.articleList[index].spliceList()
    },
    // reportArt() {
    //   console.log('父组件收到了举报')
    // }
    // 控制频道列表显示
    async showChannelEdit() {
      this.showChannel = true
      await this.$nextTick()
      this.$refs.channel.isEdit = false
    },
    // 点击我的频道对应切换头部active的高亮
    changeTab(i) {
      // 1. 控制弹出层隐藏
      this.showChannel = false
      // 2. 修改active激活
      this.active = i
    },
    changeActive(active) {
      this.active = active
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
     width: calc(100% - 35px);
    }
     .van-tabs__line {
       background-color: #3196fa;
    }
   .van-tabs__content {
     height: 100%;
     overflow: auto;
    }
  }
  // 频道管理的开关按钮
    .bar-btn {
      position: fixed;
      top: 55px;
      right: 5px;
      display: flex;
      align-items: center;
      background-color: #fff;
      opacity: 0.8;
      z-index: 1;
      .van-icon-wap-nav{
      font-size: 20px;
    }
    }

}
</style>
