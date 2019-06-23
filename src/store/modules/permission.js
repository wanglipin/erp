import { resolvePath } from '../../utils/resolvePath';
import { asyncRouterMap } from '@/routers'

// 对异步路由数据进行处理生成路由表
const handleAsyncRouter = (routes, basePath = '/') => {
  const res = []
  routes.forEach(route => {
    const { router, component, name, redirect, icon, id, category, meta, params } = route
    // 生成meta对象
    const metaCache = {}
    JSON.parse(meta).forEach(item => {
      metaCache[item.key] = item.value
    })
    // 生成params对象
    const paramsCache = {}
    JSON.parse(params).forEach(item => {
      paramsCache[item.key] = item.value
    })
    const tmp = {
      id,
      path: resolvePath(basePath, route.path),
      component: asyncRouterMap[component],
      name: router,
      redirect,
      hidden: category === 'view',
      meta: {
        ...metaCache,
        title: name,
        icon
      },
      params: paramsCache
    }
    if (route.children) {
      tmp.children = handleAsyncRouter(route.children, tmp.path)
    }
    res.push(tmp)
  })
  return res
}
const permission = {
  state: {
    addRoutes: [],
    buttons: []
  },
  mutations: {
    SET_ROUTES: (state, routers) => {
      state.addRoutes = routers
    },
    SET_BUTTONS: (state) => {
      state.buttons = JSON.parse(localStorage.getItem('buttonData'))
    }
  },
  actions: {
    GenerateRoutes ({ commit }) {
      const asyncRouter = handleAsyncRouter(JSON.parse(localStorage.getItem('menuData')))
      commit('SET_ROUTES', [...asyncRouter, { path: '*', redirect: '/404', hidden: true }])
    }
  }
}
export default permission
