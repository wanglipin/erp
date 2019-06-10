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
                    component: "App3",
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
                  },
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
                component: "App4",
                icon: "dashboard",
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
            component: "Homey",
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
        icon: "dashboard",
        id: 6,
        meta: "[]",
        name: "ELEMENT-UI",
        params: "[]",
        parentId: 0,
        path: "/Hpppp",
        priority: 2,
      },
      {
        category: "menu",
        children: [{
          children: [{
            category: "menu",
            component: "App5",
            icon: "dashboard",
            meta: "[]",
            name: "平台管理",
            params: "[]",
            parentId: 5,
            path: "platform1",
            priority: 2,
            redirect: "nanotubes/platform/platform_overview",
            router: null,
          },
          {
            category: "menu",
            component: "Apps",
            icon: "dashboard",
            meta: "[]",
            name: "平台概览",
            params: "[]",
            parentId: 21,
            path: "platform",
            priority: 2,
            redirect: "nanotubes/platform/platform_overview",
            router: null,
          }],
          component: "Homeo",
          icon: "icon-ziyuannaguan",
          id: 5,
          meta: "[]",
          name: "资源纳管",
          params: "[]",
          parentId: 0,
          path: "/nanotubes",
          priority: 2
        }],
        component: "HISE",
        icon: "dashboard",
        id: 19,
        meta: "[]",
        name: "HOHHO",
        params: "[]",
        parentId: 0,
        path: "/ooooo",
        priority: 9,
      },
      {
        category: "menu",
        children: [{
          children: [{
              category: "menu",
              component: "App5",
              icon: "dashboard",
              meta: "[]",
              name: "平台管理",
              params: "[]",
              parentId: 5,
              path: "platform",
              priority: 2,
              redirect: "nanotubes/platform/platform_overview",
              router: null,
            },
            {
              category: "menu",
              component: "Apps",
              icon: "dashboard",
              meta: "[]",
              name: "平台概览",
              params: "[]",
              parentId: 21,
              path: "platform",
              priority: 2,
              redirect: "nanotubes/platform/platform_overview",
              router: null,
            }
          ],
          component: "Homeo",
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
        }],
        component: "HISE2",
        icon: "dashboard",
        id: 20,
        meta: "[]",
        name: "QQQ",
        params: "[]",
        parentId: 0,
        path: "/ooooo",
        priority: 92,
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