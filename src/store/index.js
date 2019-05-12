import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/user'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    users
  },
  getters
})
export default store
