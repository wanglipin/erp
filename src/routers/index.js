import Router from 'vue-router'

const constantRoutes = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: '首页',
  //   children: [{ path: 'dashboard', component: dashboard }]
  // },
  {
    path: '',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    name: 'login',
    hidden: true
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/Home'),
    name: 'Home',
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
]

const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: constantRoutes
})

export default router;
