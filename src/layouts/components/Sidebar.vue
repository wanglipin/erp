<template>
  <el-aside class="sidebar-container">
    <div class="logo">
      <img :src="logo" alt="平台logo" v-if="logo">
      <h1>{{name}}</h1>
    </div>
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu  :default-active="matchPath" class="el-menu-vertical-demo sidebar-menu"
                :background-color="theme.sidebarColor"
                text-color="#ccccc"
                active-text-color="#ffffff"
                unique-opened
                @select="selectItem"
                :collapse="isCollapsed">
        <sidebar-item v-for="route in sideMenuData" 
                      :menuItem='route' 
                      :key="route.path" 
                      :isLimitLevel="isLimitLevel" 
                      :base-path="basePath">
        </sidebar-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import sidebarItem from './SidebarItem.vue'
export default {
  props: {
    isCollapsed: {
      type: Boolean
    },
    logo: {
      type: String
    },
    menuData: {
      type: Array
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
    },
    isLimitLevel : {
      type: Boolean,
      default: false
    },
    basePath : {
      type: String,
      default: '/'
    }
  },
  components: {
    sidebarItem
  },
  data() {
    return {
      
    }
  },
  created () {

  },
  mounted () {
    
  },
  computed: {
    sideMenuData () {
      return this.filterMenuData(this.menuData);
    }
  },
  methods: {
    // 对菜单数据做过滤，去掉隐藏菜单
    filterMenuData (data) {
        const menu = [];
        data.forEach(item => {
            if(!item.hidden){
                const cache = { ...item };
                menu.push(cache);
                if(item.children) {
                    cache.children = this.filterMenuData(item.children);
                }
            }
        });
        return menu.length ? menu : null;
    },
    selectItem (index) {
        this.$emit('select', index);
    }
  },
}
</script>
<style lang="less">
.sidebar-container {
  z-index: 3;
  width: 180px !important;
  transition: width 0.18s;
  .scrollbar-wrapper {
    height: calc(100vh - 50px);
    .el-scrollbar__wrap{
        overflow-x: hidden;
    }
  }
  .sidebar-menu {
    width: 180px;
    height: calc(100vh - 50px);
    border: 0;
  }
  .sidebar-menu::-webkit-scrollbar {
    display: none;
  }
  .el-submenu__title > i,
  .el-menu-item > i{
    margin-right: 6px;
  }
  .el-submenu.is-opened .el-submenu__title{
    color: #fff !important;
    & > i {
      color: #fff !important;
    }
  }
  .el-submenu .el-menu-item{
    min-width: 180px !important;
    background: #15171d !important;
    &.is-active{
      background: #1890ff !important;
    }
  }
  .menu-wrapper .el-menu-item{
    &.is-active{
      background: #1890ff !important;
    }
  }
  .el-menu--collapse {
    width: 64px;
    overflow: inherit;
  }
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

.hideSidebar {
    .sidebar-container {
        width: 64px !important;
        .el-menu--collapse {
            .el-submenu {
                overflow: hidden;
                &>.el-submenu__title {
                    &>span {
                        height: 0;
                        width: 0;
                        overflow: hidden;
                        visibility: hidden;
                        display: inline-block;
                    }
                    .el-submenu__icon-arrow{
                        display: none;
                    }
                }
            }
        }
    }
}

</style>

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

