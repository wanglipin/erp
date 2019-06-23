import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/user'
import app from './modules/app'
import permission from './modules/permission'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    users,
    permission,
    app
  },
  getters
})
export default store
