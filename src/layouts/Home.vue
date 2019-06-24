<template>
  <div>
    <el-container class="app-wrapper" :class="[{hideSidebar:isCollapsed}, theme.name]">
      <side-bar :theme="theme" :name="name" :menuData="menuData" :matchPath="matchPath" :isCollapsed="isCollapsed" :logo="logo" @select="selectItem"></side-bar>
      <el-container class="right-container">
        <Headers @toggleSidebar="toggleSidebar" :isCollapsed="isCollapsed">
          <Header-Menu></Header-Menu>
        </Headers>
        <el-container class="main-container">
          <ThirdMenu :menuData="thirdMenuData" v-if="thirdMenuData.children"></ThirdMenu>
          <el-main style="padding: 0 10px 10px 10px">
            <level-bar></level-bar>
            <el-scrollbar class="custom-scrollbar" style="height: calc(100% - 60px)">
              <transition enter-active-class="fadeInUp" mode="out-in">
                <!-- <router-view></router-view> -->
              </transition>
            </el-scrollbar>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getToken } from '@/utils/auth'
import sideBar from '@/layouts/components/Sidebar.vue'
import Headers from './components/header/header.vue'
import HeaderMenu from '@/layouts/components/HeaderMenu.vue'
import ThirdMenu from './components/ThirdMenu.vue'
import levelBar from './components/LevelBar.vue'
export default {
  data() {
    return {
      tableData: '',
      matchPath: '',
      thirdMenuData: {}
    }
  },
  components: {
    sideBar, HeaderMenu, Headers, ThirdMenu, levelBar
  },
  created() {
    this.handlePath();
    // this.$store.commit('SET_BUTTONS')
  },
  computed: {
    ...mapState({
      isCollapsed: state => state.users.isCollapsed,
      menuData: state => state.users.sideMenuData,
      basePath: state => state.users.basePath,
      logo: state => state.users.logo,
      name: state => state.users.name,
      theme: state => state.users.theme,
    })
  },
  mounted () {
  },
  watch: {
    $route () {
      this.handlePath()
    }
  },
  methods: {
    selectItem () {
    },
    toggleSidebar () {
      this.$store.commit('TOGGLE_SIDEBAR')
    },
    getThirdMenu (item) {
      for (let items of item.children) {
        if (items.path === this.matchPath) {
          const thirdMenuData = this._.cloneDeep(items)
          // 对三级菜单隐藏的数据做剔除
          const children = []
          items.children.forEach(_ => {
            if (!_.hidden) children.push(_)
          })
          this.thirdMenuData = Object.assign(thirdMenuData, { children: children.length ? children : null })
          break
        }
      }
    },
    getLevelPath (level) {
      return `/${this._.trimStart(this.$route.path, '/').split('/', level).join('/')}`
    },
    handlePath () {
      this.matchPath = this.getLevelPath(3)
      // 确保刷新先更新menuData再去获取三级菜单数据
      setTimeout(() => {
        if (this.$route.path.split('/').length >= 5) {
          const levelPath = this.getLevelPath(2)
          for (let item of this.menuData) {
            if (item.path === levelPath) {
              this.getThirdMenu(item)
              break
            } else this.thirdMenuData = {}
          }
        } else this.thirdMenuData = {}
      })
    }
  },
};
</script>

<style lang="less">
  .app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .right-container {
    flex-direction: column;
    width: calc(100% - 180px) \0;
  }
</style>
