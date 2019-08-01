<template>
  <div class="login-container">
    <el-form :model="loginForm"  ref="loginForm" class="login-form" auto-complete="on" label-position="left">
      <div class="login-row">
        <div class="title-container">
          <h3>Vue组件系统</h3>
        </div>
        <el-form-item  prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
          v-model="loginForm.username" 
          autocomplete="off" 
          placeholder="账号"
          name="username"
          type="text"
          tabindex="1"
          clearable
          auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password" 
          :type="passwordType"
          autocomplete="off" 
          placeholder="密码"
          tabindex="2"
          auto-complete="on"
          @keyup.native="checkCapslock"
          @blur="capsTooltip = false"
          @keyup.enter.native="handleLogin"
          clearable
          ></el-input>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin" style="width:100%;margin-bottom:30px;">登陆</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getToken, setToken } from '@/utils/auth'
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created () {},
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$http({
            method: 'post',
            url: '/user/login',
            data: this.loginForm
          })
          .then(response => {
            if (response.success) {
              const {
                admin,
                editor
              } = response
              this.$store.commit('SET_TOKEN', admin.token)
              setToken(admin.token)
              this.$store.commit('SETTING_SIDE_MENU', admin.menuData)
              localStorage.menuData = JSON.stringify(admin.menuData);
              this.$router.push({ path: 'home' })
              this.$nextTick(() =>{
                this.getInfo(admin.token)
              })
            }
            }).catch(error => {
              console.log(error)
          })
        } 
      })
    },
    getInfo(token) {
      this.$http({
        method: 'post',
        url: '/getInfo',
        data: { token }
      })
      .then(response => {
        if (response.success) {
          const {
            data
          } = response
          const {
            roles,
            avatar,
            logo,
            name,
            basePath,
            introduction
          } = data
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }
          // this.$store.$commit('SET_ROLES', roles)
          // this.$store.commit('SETTING_NAME', name)
          // this.$store.commit('SET_AVATAR', avatar)
          // this.$store.commit('SETTING_LOGO', logo)
          // this.$store.commit('SETTING_BASE_PATH', basePath)
          // this.$store.commit('SET_INTRODUCTION', introduction)
          // localStorage.info = JSON.stringify(data);
          // console.log(data)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less">
  /* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

@bg:#283443;
@light_gray:#fff;
@cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .login-container .el-input input {
    color: @cursor;
  }
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: @light_gray;
      height: 47px;
      caret-color: @cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px @bg inset !important;
        -webkit-text-fill-color: @cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #a589878a;
    border-radius: 5px;
    color: #454545;
  }
  .el-button--primary {
    border-color: transparent;
    background-color: #854d9087;
  }
}
</style>

<style lang="less" scoped>
@bgColor: #077e78;
@fontColor:#7e1840a8;;
@dark_gray:#889aa4;
.login-container {
  width: 100%;
  height: 100vh;
  background-image: url('../../assets/img/bg/bg.jpeg');
  background-color: darkkhaki;
  background-size: cover;
  .login-form {
    position: relative;
    width: 480px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .login-row {
      padding: 40px;
      background-color: #dd63e64d;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: @dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .title-container {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      padding-bottom: 40px;
      color: @fontColor;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: @dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
  }
}
</style>

