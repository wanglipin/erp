<template>
  <div>
    <el-container class="app-wrapper">
      <side-bar :theme="theme" :name="name" :matchPath="matchPath" :isCollapsed="isCollapsed" :logo="logo" @select="selectItem"></side-bar>
      <el-container class="right-container">
        <Headers @toggleSidebar="toggleSidebar" :isCollapsed="isCollapsed">
          <Header-Menu></Header-Menu>
        </Headers>
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
export default {
  data() {
    return {
      tableData: '',
      matchPath: ''
    }
  },
  components: {
    sideBar, HeaderMenu,Headers
  },
  created() {
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
      console.log('MMMMMMMM')
    },
    toggleSidebar () {
      this.$store.commit('TOGGLE_SIDEBAR')
    },
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
