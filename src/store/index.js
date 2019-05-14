import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/user'
// import app from './modules/user'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    users,
    // app
  },
  getters
})
export default store
