<template>
  <el-aside width="160px" class="third-menu-container" :class="{collapsed: isCollapsed}">
    <div class="menu-title">{{menuData.meta.title}}</div>
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        router
        @select="selectItem"
        class="el-menu-vertical-demo third-menu">
        <el-menu-item :index="item.path" v-for="item in menuData.children" :key="item.id">
          <span slot="title" v-if="!item.hidden">{{item.meta.title}}</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
    <a href="javascript:;" class="subMenuToggle" @click="toggle"></a>
  </el-aside>
</template>
<script>

export default {
  props: {
    menuData: {
      type: Object
    }
  },
  data () {
    return {
      isCollapsed: false
    }
  },
  computed: {},
  created () {
  },
  methods: {
    toggle () {
      this.isCollapsed = !this.isCollapsed
    },
    selectItem (path) {
      if (this.$route.path.indexOf(path) > -1) {
        setTimeout(() => {
          this.$router.push({ name: 'Redirect', query: { path: this.$route.path } });
        });
      }
    }
  }
}
</script>
<style lang="less">
  .third-menu-container.collapsed {
    margin-left: -160px;
    .subMenuToggle {
      background: url(/static/img/slideIcon-new.png) no-repeat right -110px;
      left: 0;
    }
  }

  .third-menu-container {
    transition: margin 0.28s;
    background: #fff;
    width: 160px;
    border-right: 1px solid #ebebeb;
    .scrollbar-wrapper {
      height: calc(100vh - 110px);
      .el-scrollbar__wrap {
        overflow-x: hidden !important;
      }
    }
    .third-menu {
      height: 100%;
      border: 0;
      .el-menu-item.is-active {
        background: #e7f4ff !important;
        border-right: 2px solid #2d8cf0;
      }
    }
  }

  .subMenuToggle {
    display: block;
    position: absolute;
    z-index: 2;
    left: 147px;
    top: 50%;
    width: 13px;
    height: 0;
    margin: -25px 0 0;
    padding: 50px 0 0;
    background: url(/static/img/slideIcon-new.png) no-repeat 0 -60px;
    overflow: hidden;
    transition: width 0.1s, right 0.1s;
    -webkit-animation: width 0.1s, right 0.1s;
    -moz-animation: width 0.1s, right 0.1s;
    -o-animation: width 0.1s, right 0.1s;
  }

  .subMenuToggle:hover {
    left: 140px;
    width: 20px;
    z-index: 3;
  }

  .menu-title {
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    border-bottom: 1px solid #ebebeb;
    color: #666;
    padding-left: 20px;
  }
</style>
