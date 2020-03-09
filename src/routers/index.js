import Router from 'vue-router'
import cmdbMap from './modules/cmdb'
import error from './modules/error'
import fileUpload from './modules/fileUpload'
const constantRoutes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    name: 'Login'
  },
  {
    path: '/home',
    component: () => import('@/layouts/Home.vue'),
    meta: {
      title: 'Home'
    },
    name: 'Home',
    children: [{
      name: '401',
      path: 'error',
      meta: {
        title: '401'
      },
      component: () => import('@/views/error-page/401')
    }, {
      name: 'Redirect',
      path: 'redirect',
      component: () => import('@/layouts/redirect.vue')
    }]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404')
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401')
  },
]

const router = new Router({
  // // mode: 'history',
  // base: process.env.BASE_URL,
  routes: constantRoutes
})
export const asyncRouterMap = {
  Home: () => import('../layouts/Home.vue'),
  App: () => import('../layouts/App.vue'),
  ...cmdbMap,
  ...error,
  ...fileUpload
}
export default router;
