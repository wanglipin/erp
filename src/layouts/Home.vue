<template>
  <div>
    <el-container class="app-wrapper">
      <side-bar :theme="theme" :matchPath="matchPath" :isCollapsed="isCollapsed" :login="login" @select="selectItem"></side-bar>
    </el-container>
  </div>
</template>
<script>
import sideBar from '@/layouts/components/Sidebar.vue'
export default {
  data() {
    return {
      tableData: ''
    }
  },
  components: {
    sideBar
  },
  methods: {
    selectItem () {
      console.log('MMMMMMMM')
    }
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
