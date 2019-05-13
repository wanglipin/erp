<template>
  <Link :to="path">
      <el-menu-item :index="path">
        <svg-icon :class="meta.icon || 'icon-dian'"></svg-icon>
        <span slot="title">{{meta.title}}</span>
      </el-menu-item>
  </Link>
</template>

<script>
import Link from './Link'
export default {
  components: { Link },
  props: {
    path: {
      type: String
    },
    meta: {
      type: Object
    }
  },
  data() {
    return {
      
    }
  },
}
</script>

<style lang="less" scoped>

</style>

