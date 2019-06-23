<template>
  <div class='menu-wrapper' v-if="!menuItem.hidden">
    <template  v-if="menuItem.children">
      <!-- 目前第一次登陆着这个 -->
      <Menu-Item v-if="hasOneChild(menuItem.children, menuItem)" :path="singleChild.path" :meta="singleChild.meta"></Menu-Item>
      <el-submenu v-else :index="currPath">
        <template slot="title">
            <svg-icon :icon-class="menuItem.meta.icon || 'dian'"></svg-icon>
            <span slot="title" class="name-title">{{menuItem.meta.title}}</span>
        </template>
        <template v-for="child in menuItem.children">
          <sidebar-item class="nest-menu" v-if="!child.hidden&&!isLimitLevel&&child.children" :menuItem="child"
                        :key="child.path" :base-path="currPath"></sidebar-item>
          <Menu-Item v-else-if="!child.hidden" :path="resolvePath(currPath, child.path)" :meta="child.meta" :key="child.path"></Menu-Item>
        </template>
      </el-submenu>
    </template>
    <Menu-Item v-else :path="currPath" :meta="menuItem.meta"></Menu-Item>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue'
import SvgIcon from '../../components/SvgIcon'
import { resolvePath } from '@/utils/resolvePath'
export default {
  name: 'SidebarItem',
  components: { MenuItem,SvgIcon },
  props: {
    menuItem: {
      type: Object
    },
    basePath: {
      type: String
    },
    isLimitLevel: {
      type: Boolean
    },
    
  },
  data() {  
    return {
      singleChild: {}
    }
  },
  computed: {
    currPath() {
      return this.resolvePath(this.basePath, this.menuItem.path);
    }
  },
  created () {
    console.log(this.menuItem,'menuItemmenuItemmenuItemmenuItemmenuItemmenuItemmenuItem')
  },
  methods: {
    resolvePath(basePath, routePath) {
      return resolvePath(basePath, routePath);
    },
    hasOneChild (children, parent) {
      // 如果子菜单只有一个就走这里
      if (children.length === 1 && !parent.meta.alwaysShow) {
        this.singleChild = children[0];
        return true;
      }
      return false;
    }
  }
}
</script>

<style lang="less" scoped>
.menu-wrapper {
  width: 100%;
}
.name-title {
  padding-left: 15px;
  color: rgb(255, 255, 255);
}
</style>

