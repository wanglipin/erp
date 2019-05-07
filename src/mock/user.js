const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  {
    url: '/user/login',
    type: 'post',
    respoense: config => {
      const { username } = config.body
      const token = tokens[username]
      if (!token) {
        return {
          success: false,
          message: '用户名账号或密码错误'
        }
      }
      return {
        success: true,
        data: token
      }
    }
  },
  {
    url: '/user/info\.*',
    type: 'get',
    respoense: config => {
      const { token } = config.query
      const info = users[token]

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