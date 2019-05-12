import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from '@/routers'
import store from './store'
import './icons' // icon
import './registerServiceWorker'
import ElementUI from 'element-ui'
import './theme/index.css'
import './assets/css/base.css'
import axios from './axios/request'
import * as filters from './filters'
Vue.use(ElementUI,  { size: 'small' })
Vue.use(VueRouter)
Vue.prototype.$http = axios

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  // i18n,
  render: h => h(App)
}).$mount('#app')
