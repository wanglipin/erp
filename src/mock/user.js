const tokens = {
  admin: {
    token: 'admin-token',
    menuData: [
      {
        category: "menu",
        children: [
          {
            children: [
              {
                category: "menu",
                children: [
                  {
                    category: "menu",
                    children: [
                      {
                        category: "menu",
                        children: null,
                        component: "PlatformOverview",
                        icon: null,
                        id: 74,
                        meta: "[]",
                        name: "平台概览",
                        params: "[]",
                        parentId: 8,
                        path: "platform_overview",
                        priority: 1,
                        redirect: "",
                        router: null
                      }
                    ],
                    component: "App",
                    icon: "icon-pingtai",
                    id: 8,
                    meta: "[]",
                    name: "平台管理",
                    params: "[]",
                    parentId: 5,
                    path: "platform",
                    priority: 2,
                    redirect: "nanotubes/platform/platform_overview",
                    router: null,
                  }
                ],
                component: "App",
                icon: "icon-pingtai",
                meta: "[]",
                name: "平台管理",
                params: "[]",
                parentId: 5,
                path: "platform",
                priority: 2,
                redirect: "nanotubes/platform/platform_overview",
                router: null,
              }
            ],
            component: "Home",
            icon: "icon-ziyuannaguan",
            id: 5,
            meta: "[]",
            name: "资源纳管",
            params: "[]",
            parentId: 0,
            path: "/nanotubes",
            priority: 2,
            redirect: null,
            router: null,
          }
        ],
        component: "Home",
        icon: "lock",
        id: 5,
        meta: "[]",
        name: "资源纳管",
        params: "[]",
        parentId: 0,
        path: "/dashboard",
        priority: 2,
        redirect: null,
        router: null,
      }
    ]
  },
  editor: {
    token: 'editor-token'
  }
}
const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    login: 'login',
    isCollapsed: false,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '超级管理员',
    basePath: '/'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}
export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const {
        username
      } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          success: false,
          message: '账号或密码错误'
        }
      }
      return {
        success: true,
        data: token
      }
    }
  },
  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          success: false,
          message: 'Login failed, unable to get user details.'
        }
      }
      return {
        success: true,
        data: info
      }
    }
  },
  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        success: true,
        data: 'success'
      }
    }
  }
]