<template>
<div>
<!-- <h1>21313131111111</h1> -->
<Links :to="path">
      <el-menu-item :index="path">
        <svg-icon :class="meta.icon || 'icon-dian'"></svg-icon>
        <span slot="title">{{meta.name}}</span>
        <span slot="title">{{meta.title}}</span>
      </el-menu-item>
  </Links>
</div>
  
</template>

<script>
import Links from './Link.vue'
export default {
  components: { Links },
  props: {
    path: {
      type: String
    },
    meta: {
      type: Object
    }
  },
  created () {
    console.log(this.path)
  },
  data() {
    return {
      
    }
  },
}
</script>

<style lang="less" scoped>

</style>

