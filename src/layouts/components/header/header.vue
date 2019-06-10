<template>
  <el-header class="common-header">
    <div class="toggle-class" @click.prevent="toggleSideBar">
      <i v-if="isCollapsed" class="el-icon-s-unfold"></i>
      <i v-else class="el-icon-s-fold"></i>
    </div>
    <slot></slot>
  </el-header>
</template>
<script>
//     import theme from './theme';
export default {
  props: {
    isCollapsed: {
      type: Boolean,
    },
  },
  components: {
      // theme,
  },
  data() {
    return {};
  },
  created() {
  },
  methods: {
    toggleSideBar() {
      this.$emit('toggleSidebar');
    }
  }
};
</script>
<style lang="less">
  .common-header {
    -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    box-sizing: border-box;
    background: #fff;
    color: #666;
    border-bottom: 1px solid #ebebeb;
    width: 100%;
    height: 50px !important;
    font-size: 22px;
    line-height: 50px;
    padding: 0 0 0 10px;
    .toggle-class {
      float: left;
      height: 50px;
      line-height: 52px;
      cursor: pointer;
      font-size: 17px;
    }
  }
</style>
