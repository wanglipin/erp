<template>
  <div>
    <el-container class="app-wrapper">
      <side-bar :theme="theme" :name="name" :matchPath="matchPath" :isCollapsed="isCollapsed" :logo="logo" @select="selectItem"></side-bar>
    </el-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
console.log(mapState({theme: state => state.app.them}), 'mapState')
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

<style>
  .app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
