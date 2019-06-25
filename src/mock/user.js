const tokens = {
  admin: {
    token: 'admin-token',
    menuData: [
      {
        category: "menu",
        children: [
          {
            category: "menu",
            children: [
              {
                category: "menu",
                children: null,
                component: "error401",
                id: 8,
                icon: "",
                meta: "[]",
                name: "401",
                params: "[]",
                parentId: 0,
                path: "401",
                priority: 2,
                redirect: null,
                router: "error401",
              },
              {
                category: "menu",
                children: null,
                component: "error404",
                id: 8,
                icon: "",
                meta: "[]",
                name: "404",
                params: "[]",
                parentId: 3,
                path: "404",
                priority: 2,
                redirect: null,
                router: "error404",
              }
            ],
            component: "App",
            icon: "404",
            id: 7,
            meta: "[]",
            name: "错误页面",
            params: "[]",
            parentId: 0,
            path: "error",
            priority: 2,
            redirect: null,
            router: 'error',
          },
          {
            category: "menu",
            children: [{
                category: "menu",
                children: null,
                component: "dynamicTable",
                id: 11,
                icon: "",
                meta: "[]",
                name: "动态 Table",
                params: "[]",
                parentId: 0,
                path: "dynamicTable",
                priority: 4,
                redirect: null,
                router: "error401",
              },
              {
                category: "menu",
                children: null,
                component: "EditableTable",
                id: 12,
                icon: "",
                meta: "[]",
                name: "Table内编辑",
                params: "[]",
                parentId: 5,
                path: "EditableTable",
                priority: 2,
                redirect: null,
                router: "EditableTable",
              }
            ],
            component: "App",
            icon: "table",
            id: 10,
            meta: "[]",
            name: "Table",
            params: "[]",
            parentId: 0,
            path: "table",
            priority: 2,
            redirect: null,
            router: 'table',
          }
        ],
        component: "Home",
        icon: "e",
        id: 6,
        meta: "[]",
        name: "Element-UI",
        params: "[]",
        parentId: 0,
        path: "home",
        priority: 2
      }
    ]
  },
  editor: {
    token: 'editor-token'
  }
}
const users = {
  'admin-token': {
    roles: [
      {
        checked: false,
        createrId: 1,
        deleted: false,
        id: 1,
        menderId: 1,
        name: "超级管理员",
        ownerId: null,
        props: "无",
        remark: "超级管理员",
        status: "NORMAL",
        tenantId: 0,
      }
    ],
    introduction: 'I am a super administrator',
    logo: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Vue2.0组件',
    isCollapsed: true,
    avatar: '',
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
      const abort = true

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
    // type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]
      // mock error
      if (!info) {
        return {
          success: false,
          message: '获取用户信息失败'
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