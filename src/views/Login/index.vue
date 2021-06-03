<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-model.trim="mobile"
        required
        label="用户名"
        placeholder="请输入用户名"
        :error-message="mobile_errmsg"
      />
      <van-field
        v-model.trim="code"
        required
        label="手机号"
        placeholder="请输入手机号"
        :error-message="code_errmsg"
      />
    </van-cell-group>
    <div class="btn-wrap">
      <van-button type="info" @click="login">登录按钮</van-button>
    </div>
    <div class="btn-wrap">
      <van-button type="danger" @click="getUserInfo">获取个人信息</van-button>
    </div>
  </div>
</template>

<script>
import { reqLogin, reqGetProfile } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '18666666666',
      code: '246810',
      mobile_errmsg: '',
      code_errmsg: ''
    }
  },
  methods: {
    validata() {
      if (!this.mobile.length) {
        this.mobile_errmsg = '请输入手机号'
        return false
      }
      if (!/^1\d{10}$/.test(this.mobile)) {
        this.mobile_errmsg = '请输入正确的手机号'
        return false
      }
      this.mobile_errmsg = ''
      if (!this.code.length) {
        this.code_errmsg = '请输入验证码'
        return false
      }
      if (!/^\d{6}$/.test(this.code)) {
        this.code_errmsg = '请输入正确的验证码'
        return false
      }
      this.code_errmsg = ''
      return true
    },
    async login() {
      if (!this.validata()) return
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        overlay: true,
        duration: 0
      })
      // const res = await this.$http({
      //   url: '/v1_0/authorizations',
      //   method: 'POST',
      //   data: {
      //     mobile: this.mobile,
      //     code: this.code
      //   }
      // })
      const res = await reqLogin(this.mobile, this.code)
      console.log(res)
      this.$store.commit('user/setTokenInfo', res.data.data)
      this.$toast.success('登录成功')
      this.$router.push('/')
    },
    async getUserInfo() {
      await reqGetProfile()
      // console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  .btn-wrap {
    padding: 20px;
    .van-button {
      width: 100%;
      color: #fff;
      border-radius: 5px;
    }
  }
}
</style>
