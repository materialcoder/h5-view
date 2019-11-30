// 路由权限管理 判断登录状态，如无登录则跳转到登录页
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@client/store'

router.beforeEach((to, from, next) => {
  // 开始进度条
  NProgress.start()
  let userData = store.state.user
  let token = userData.token || sessionStorage.getItem('token')
  if (!token && !to.meta.noNeedLogin) {
    console.log('redirect')
    next({
      path: '/login',
      query: to.query
    })
    // 不知道为什么不进入afterEach，直接在这里结束进度
    NProgress.done()
    return false
  } else if (token) {
    // 如果已登录的话，不允许跳转到登录界面
    if (to.fullPath === '/login') {
      next({
        path: from.fullPath,
        query: from.query
      })
      NProgress.done()
      return false
    }
  }
  next()
})

router.afterEach(() => {
  console.log('done')
  // 结束显示进度条
  NProgress.done() 
})