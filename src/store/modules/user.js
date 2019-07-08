import { login, logout, getInfo } from '@/axios/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/routers'

const users = {
  state: {
    token: getToken(),
    isCollapsed: false,
    sideMenuData: [],
    theme: {
      name: 'theme-black',
      sidebarColor: '#2d303e'
    },
    logo: '',
    name: '',
    userData: {},
    operateTime: '',
    basePath: '',
    $webSocket: '',
    that: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SETTING_LOGO(state, logo) { //设置login
      state.logo = logo
    },
    SETTING_SIDE_MENU(state, sideMenuData) { //设置侧边栏
      state.sideMenuData = sideMenuData
    },
    SETTING_BASE_PATH(state, basePath) { //设置基本路径
      state.basePath = basePath
    },
    SETTING_NAME(state, name) { //设置姓名
      state.name = name
    },
    SETTING_VUE(state, that) {
      state.that = that
    },
    // SETTING_THEME(state, data) { //设置主题
    //   state.theme = data
    // },
    TOGGLE_SIDEBAR(state) { //切换栏
      state.isCollapsed = !state.isCollapsed
    },
  },
  actions: {
    // user login
    // login({commit}, userInfoObj) {
    //   const { loginForm, that } = userInfoObj
    //   commit('SETTING_VUE', that)
    //   that.$http({
    //     method: 'post',
    //     url: '/login',
    //     data: loginForm
    //   })
    //   .then(response => {
    //     if (response.success) {
    //       const {
    //         admin,
    //         editor
    //       } = response
    //       commit('SET_TOKEN', admin.token)
    //       setToken(admin.token)
    //       setTimeout(() => {
    //         commit('SETTING_SIDE_MENU', admin.menuData)
    //         localStorage.menuData = JSON.stringify(admin.menuData);
    //       });
    //       that.$router.push({ path: 'home' })
    //     }
    //     }).catch(error => {
    //       console.log(error)
    //   })
    // },
    // get user info
    // getInfo({commit,state}) {
    //   let token = getToken()
    //   that.$http({
    //       method: 'post',
    //       url: '/getInfo',
    //       data: token
    //     })
    //     .then(response => {
    //       if (response.success) {
    //         const {
    //           data
    //         } = response
    //         const {
    //           roles,
    //           avatar,
    //           logo,
    //           name,
    //           basePath,
    //           introduction
    //         } = data
    //         // roles must be a non-empty array
    //         if (!roles || roles.length <= 0) {
    //           reject('getInfo: roles must be a non-null array!')
    //         }
    //         commit('SET_ROLES', roles)
    //         commit('SETTING_NAME', name)
    //         commit('SET_AVATAR', avatar)
    //         commit('SETTING_LOGO', logo)
    //         commit('SETTING_BASE_PATH', basePath)
    //         commit('SET_INTRODUCTION', introduction)
    //         localStorage.info = JSON.stringify(data);
    //       }
    //     }).catch(error => {
    //       console.log(error)
    //     })
    // },
    // user logout
    logout({commit,state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resetRouter()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // remove token
    resetToken({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },
    // Dynamically modify permissions
    changeRoles({commit,ispatch, role}) {
      return new Promise(async resolve => {
        const token = role + '-token'
        commit('SET_TOKEN', token)
        setToken(token)
        const {
          roles
        } = await dispatch('getInfo')
        resetRouter()
        // generate accessible routes map based on roles
        console.log(roles)
        const accessRoutes = await dispatch('permission/generateRoutes', roles, {
          root: true
        })

        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        resolve()
      })
    }
  }
}
export default users

