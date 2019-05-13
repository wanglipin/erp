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
    SETTING_LOGO (state, data) {
      state.logo = data
    },
  }
}
