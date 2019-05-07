import Router from 'vue-router'

const constantRoutes = [
  {
    path: '/',
    redirect: { name:'login'}
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: 'login',
    hidden: true
  },
]

const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: constantRoutes
})

export default router;
