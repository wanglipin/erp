import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import { getToken } from '@/utils/auth'
Vue.use(Vuex)
const state = {
  // state 的所有状态都存在这里
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
