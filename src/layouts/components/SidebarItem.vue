<template>
  <div class='menu-wrapper' v-if="!menuItem.hidden">
    <template  v-if="menuItem.children">
      <Menu-Item v-if="hasOneChild(menuItem.children, menuItem)" :path="singleChild.path" :meta="singleChild"></Menu-Item>
    </template>
    <Menu-Item v-else :path="currPath" :meta="menuItem.meta"></Menu-Item>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue'
import { resolvePath } from '@/utils/resolvePath'
export default {
  name: 'SidebarItem',
  components: { MenuItem },
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
    
  },
  methods: {
    resolvePath(basePath, routePath) {
      return resolvePath(basePath, routePath);
    },
    hasOneChild (children, parent) {
      console.log(children)
      console.log(parent)
      if (children.length === 1 && !parent.meta.alwaysShow) {
        this.singleChild = children[0];
        console.log(this.singleChild,'this.singleChild')
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
  height: 100%;
} 
</style>

