const app = {
  state: {
    isCollapsed: false,
    sideMenuData: [],
    theme: {
      name: '',
      sidebarColor: ''
    },
    logo: '',
    name: '',
    userData: {},
    operateTime: '',
    basePath: '',
    $webSocket: ''
  },
  mutations : {
    SETTING_LOGO (state, data) {  //设置login
      state.logo = data
    },
    SETTING_SIDE_MENU(state, data) { //设置侧边栏
      state.sideMenuData = data
    },
    SETTING_BASE_PATH(state, data) { //设置基本路径
      state.basePath = data
    },
    SETTING_NAME(state, data) { //设置姓名
      state.name = data
    }, 
    SETTING_THEME(state, data) { //设置主题
      state.theme = data
    },
    TOGGLE_SIDEBAR(state) { //切换栏
      state.isCollapsed = !state.isCollapsed
    },
  }
}
