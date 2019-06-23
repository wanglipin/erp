<template>
  <div class="level-bar-container">
    <el-breadcrumb class="app-levelbar" separator="/">
      <el-breadcrumb-item v-for="(item,key) in matchedRoute" :key="item.path">
        <span v-if='key==0' class="first-level">{{item.meta.title}}</span>
        <span v-else>{{item.meta.title}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cacheRoute: {}
    };
  },
  computed: {
    matchedRoute () {
      // 判断是否为重定向路由，是重定向取之前的路由数据
      let isRedirect = this.$route.matched.some(item => {
        return item.name === 'Redirect';
      });
      let route = {};
      if (isRedirect) {
        route = Object.assign({}, this.cacheRoute);
      } else {
        route = this.$route;
        console.log(route,'routerouterouterouterouterouterouterouterouterouterouteroute')
        this.cacheRoute = Object.assign({}, this.$route);
      }
      return route.matched.filter(item => {
        return !item.meta.hiddenLevel;
      });
    }
  }
};
</script>
<style>
  .app-levelbar {
    display: inline-block;
    font-size: 12px;
  }

  .level-icon {
    font-size: 15px;
    margin-right: 5px;
    color: #b5b5b5;
  }

  .level-bar-container {
    height: 48px;
    line-height: 48px;
  }

  .first-level {
    color: #b5b5b5 !important;
  }
</style>
