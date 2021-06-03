import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录组件
import Login from '@/views/Login'
import Layout from '@/views/Layout'
// 导入二级路由
import Home from '@/views/Layout/components/home'
import Question from '@/views/Layout/components/question'
import Video from '@/views/Layout/components/video'
import User from '@/views/Layout/components/user'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/question', component: Question },
      { path: '/video', component: Video },
      { path: '/user', component: User }
    ] }
]

const router = new VueRouter({
  routes
})

export default router
