<template>
  <div class="channel-edit">
    <!-- 当前登陆用户已经订阅的频道 -->
    <div class="channel">
      <van-cell title="我的频道" :border="false">
        <van-button plain size="mini" type="danger" @click="isEdit = !isEdit">{{ isEdit ? '取消' : '编辑' }}</van-button>
      </van-cell>
      <van-grid>
        <van-grid-item v-for="(item,index) in channels" :key="index" :class="active === index ? 'current' : null" @click="changeActive(index)">
          <span>{{ item.name }}</span>
          <van-icon v-show="isEdit && index !== 0" name="cross" class="btn" @click.stop="delChannel(index)" />
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 当前登陆用户没有订阅的频道 -->
    <div class="channel">
      <van-cell title="可选频道" :border="false" />
      <van-grid>
        <van-grid-item v-for="(item,index) in optionalChannels" :key="index" @click.stop="addChannel(item)">
          <span>{{ item.name }}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { reqSetChannels } from '@/api/channels'
export default {
  name: 'ChannelEdit',
  props: {
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState('channels', ['channels']),
    ...mapGetters('channels', ['optionalChannels'])
  },
  methods: {
    ...mapMutations('channels', ['addMyChannels', 'removeChannels']),
    // 点击我的频道通知父组件 切换tab激活
    changeActive(i) {
      this.$emit('changeTab', i)
    },
    // 点击可选频道添加到我的频道
    addChannel(item) {
      this.addMyChannels(item)
      // console.log(this.channels)
      this.isEdit = false
      this.handlerChannles()
    },
    // 删除我的频道添加到可选频道
    delChannel(index) {
      // console.log(index)
      if (this.channels.length === 2) {
        this.isEdit = false
        return this.$toast('再删就没了哦 !')
      }
      if (index < this.active) {
        this.$emit('changeActive', this.active - 1)
      }
      this.removeChannels(index)
      this.handlerChannles()
    },
    // 处理发送请求数据格式
    handlerChannles() {
      const arr = this.channels.map((item, index) => {
        return { id: item.id, seq: index }
      })
      // console.log(arr)
      arr.splice(0, 1)
      reqSetChannels(arr)
    }
  }
}
</script>

<style lang="scss" scoped>
.channel{
  padding:15px;
  font-size:14px;
  ::v-deep .van-button--mini {
    height: 22px;
    min-width: 50px;
  }
  .btn {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 14px;
  }
	.current {
		color: red;
	}
}
</style>
