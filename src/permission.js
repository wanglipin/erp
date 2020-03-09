import store from './store'
import router from './routers'
import { getToken } from '@/utils/auth'

let init = false;
const whiteList = ['/login', '/404', '/401', '/lockme']

router.beforeEach((to, form , next) => {
  if (getToken()) {
    if (!init) {
      init = true
      store.dispatch('GenerateRoutes')
      // store.dispatch('getInfo')
      router.addRoutes(store.state.permission.addRoutes)
      next({ ...to, replace: true })
    } else next()
  } else if (whiteList.includes(to.path)) {
    next()
  } else {
    // 没有Token的时候重定向到登陆界面
    next('/login')
  }
})
