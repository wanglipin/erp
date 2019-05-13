<template>
  <div class='menu-wrapper' v-if="!menuItem.hidden">
    <template  v-if="menuItem.children">
      <MenuItem :path="singleChild.path" :meta="singleChild.meta"></MenuItem>
    </template>
    <MenuItem v-else :path="currPath" :meta="menuItem.meta"></MenuItem>
  </div>
</template>

<script>
import MenuItem from './MenuTtem.vue'
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
    }
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
  methods: {
    resolvePath(basePath, routePath) {
      return resolvePath(basePath, routePath);
    },
  hasOneChild (children, parent) {
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
  height: 100%;
} 
</style>

