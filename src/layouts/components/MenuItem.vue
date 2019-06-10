<template>
<div >
  <!-- <links :to="path"> -->
    <el-menu-item :index="path">
      <svg-icon :icon-class="meta.icon"></svg-icon>
      <span slot="title" class="name-title">{{meta.name}}</span>
    </el-menu-item>
  <!-- </links> -->
</div>
</template>

<script>
import SvgIcon from '../../components/SvgIcon'
import Links from './Link.vue'
import { isArray } from 'util';
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
    console.log(this.meta,'11111222222222')
  },
  data() {
    return {
      
    }
  },
}
</script>

<style lang="less" scoped>
.name-title {
  padding-left: 15px;
  color: rgb(255, 255, 255);
}
</style>

