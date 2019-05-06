import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
Vue.use(Vuex)
const state = {
  // state 的所有状态都存在这里
}
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
