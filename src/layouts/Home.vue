<template>
  <div>
    <el-container class="app-wrapper">
      <side-bar :theme="theme" :matchPath="matchPath" :isCollapsed="isCollapsed" :login="login" @select="selectItem"></side-bar>
    </el-container>
  </div>
</template>
<script>
import sideBar from '@/layouts/components/Sidebar.vue'
import { mapState } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      tableData: ''
    }
  },
  components: {
    sideBar
  },
  created() {},
  computed: {
    ...mapState({
      menuData: state => state.app.menuData,
      login: state => state.app.login,
      theme: state => state.app.theme,
      name: state => state.app.name,
      isCollapsed: state => state.app.isCollapsed,
      basePath: state => state.app.basePath
    })
  },
  methods: {
    selectItem () {
      console.log('MMMMMMMM')
    },
    // getInfo () {
    //   this.$store.dispatch('getInfo', getToken())
    // },
    toggleSidebar () {
      this.$store.commit('TOGGLE_SIDEBAR')
    },
  },
};
</script>

<style>
  .app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
