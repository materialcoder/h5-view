// 路由权限管理 判断登录状态，如无登录则跳转到登录页
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
  // 开始进度条
  NProgress.start()
  
})

router.endEach(() => {
  // 结束显示进度条
  NProgress.done()
})