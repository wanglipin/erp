import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import './icons' // icon
import './registerServiceWorker'
import Element from 'element-ui'
import './theme/index.css'
import './assets/css/base.css'
import axios from './axios/request'
import * as filters from './filters'
Vue.use(VueRouter)
Vue.use(Element, {
  // i18n: (key, value) => i18n.t(key, value)
})
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
