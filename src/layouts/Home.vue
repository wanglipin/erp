<template>
  <div>
    <el-container class="app-wrapper">
      <side-bar :theme="theme" :matchPath="matchPath" :isCollapsed="isCollapsed" :logo="logo" @select="selectItem"></side-bar>
    </el-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getToken } from '@/utils/auth'
import sideBar from '@/layouts/components/Sidebar.vue'
export default {
  data() {
    return {
      tableData: '',
      matchPath: ''
    }
  },
  components: {
    sideBar
  },
  created() {
  },
  computed: {
    ...mapState({
      theme: state => state.app.theme,
      isCollapsed: state => state.app.isCollapsed,
      menuData: state => state.app.sideMenuData,
      basePath: state => state.app.basePath,
      logo: state => state.app.logo,
      name: state => state.app.name
    })
  },
  mounted() {
    console.log(this.theme)
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
