<template>
  <ul class="pull-left header-menu">
    <li @click="selectMenu(item, 1)" v-for="item in menuData" :key="item.id" :class="{selected: item.selected}">
      <!-- <Icon :type="item.icon"></Icon> -->
      <span>{{item.name}}</span>
      <div></div>
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      menuData: []
    };
  },
  watch: {
    firstPath () {
      this.initMenu();
    }
  },
  computed: {
    firstPath: function () {
      return `/${this.$route.path.split('/')[1]}`;
    }
  },
  created () {
    this.menuData = JSON.parse(localStorage.getItem('menuData'));
    this.initMenu();
  },
  methods: {
    getJumpRoute (data) {
      const route = data[0];
      if (route.children) {
        return this.getJumpRoute(route.children);
      }
      return route.actionUrl;
    },
    selectMenu (item, flag) {
      if (item.selected) return;
      this.menuData.forEach((row) => {
        this.$set(row, 'selected', false);
        if (item.id === row.id) {
          row.selected = true;
          this.$store.commit('SETTING_SIDE_MENU', row.children);
          // 点击一级菜单时跳转界面，刷新界面是保持不动
          if (flag) this.$router.push({path: this.getJumpRoute(row.children)});
        }
      });
    },
    initMenu () {
      let selectMenu;
      this.menuData.forEach((item) => {
        if (item.actionUrl === this.firstPath) selectMenu = item;
      });
      this.selectMenu(selectMenu || this.menuData[0], this.$route.name === 'Home');
    }
  }
};
</script>
<style lang="less">
  ul.header-menu{
    margin: 0;
    list-style: none;
    li{
      font-size: 14px;
      position: relative;
      height: 48px;
      cursor: pointer;
      white-space: nowrap;
      padding: 0 20px;
      float: left;
      .iconfont{
        font-size: 14px;
      }
      &.selected{
        color: #2d8cf0;
        border-bottom: 2px solid #2d8cf0;
      }
      div{
        display: none;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.15);
      }
    }
  }
</style>
