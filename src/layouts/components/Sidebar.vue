<template>
  <el-aside class="sidebar-container">
    <div class="logo">
      <img :src="logo" alt="平台logo" v-if="logo">
      <h1>{{name}}</h1>
    </div>
    <el-menu  :default-active="matchPath" class="el-menu-vertical-demo sidebar-menu"
              :background-color="theme.sidebarColor"
              text-color="#ccccc"
              active-text-color="#ffffff"
              unique-opened
              @select="selectItem"
              :collapse="isCollapsed">
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    },
    logo: {
      type: String
    },
    name: {
      type: String
    },
    matchPath: {
      type: String,
      default: ''
    },
    theme: {
      type: Object
    }
  },
  data() {
    return {
      
    }
  },
  created () {
    
  },
  mounted () {
    
  },
  methods: {
    selectItem (index) {
      this.$emit('select', index)
    }
  },
}
</script>

<style lang="less" scoped>
.sidebar-container {
  .logo {
    height: 50px;
    position: relative;
    line-height: 50px;
    transition: all 0.3s;
    background: #21242e;
    overflow: hidden;
    text-align: center;
    img {
      display: inline-block;
      vertical-align: middle;
      height: 32px;
    }
    h1 {
      color: #fff;
      display: inline-block;
      vertical-align: middle;
      font-size: 18px;
      margin: 0 0 0 8px;
      font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica,
      sans-serif;
      font-weight: 600;
    }
  }
}
</style>

