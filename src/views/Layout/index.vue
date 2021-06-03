<template>
  <div class="layout-container">
    <van-nav-bar fixed>  <!-- Layout头部 -->
      <template #left>
        <div class="logo" />
      </template>
      <template #right>
        <van-button
          round
          type="info"
          class="search-btn"
          icon="search"
          size="small"
          @click="$router.push('/search')"
        >
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <router-view />
    <van-tabbar v-model="active">  <!-- Layout底部 -->
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      active: 0 // 底部高亮
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  padding: 46px 0 50px 0;
  // logo区域
  .logo {
    background: url("~@/assets/logo.png") no-repeat;
    background-size: cover;
    width: 100px;
    height: 30px;
  }
  // 搜索区域
  .search-btn {
    background-color: #5babfb;
    width: 100px;
    font-size: 14px;
    .van-icon {
      color: #fff;
    }
  }
}
</style>
