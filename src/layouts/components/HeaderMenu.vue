<template>
  <ul class="pull-left header-menu">
    <li v-for="(item, index) in menuData" :key="index">
      <svg-icon :class="item.meta.icon"></svg-icon>
      <span>{{item.meta.name}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      
    }
  },
  computed: {
    menuData () {
      return this.$store.state.sideMenuData
    }
  },
}
</script>

<style lang="less" scoped>
 ul.header-menu {
    margin: 0;
    list-style: none;
    li {
      font-size: 14px;
      position: relative;
      height: 48px;
      cursor: pointer;
      white-space: nowrap;
      padding: 0 20px;
      float: left;
      .iconfont {
        font-size: 14px;
      }
      &.selected {
        color: #2d8cf0;
        border-bottom: 2px solid #2d8cf0;
      }
      div {
        display: none;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.15);
      }
    }
  }
</style>

