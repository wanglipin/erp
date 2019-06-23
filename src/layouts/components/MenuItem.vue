<template>
<div >
  <Links :to="path">
    <el-menu-item :index="path">
      <svg-icon :icon-class="meta.icon || 'dian'"></svg-icon>
      <span class="name-title">{{ meta.title }}</span>
    </el-menu-item>
  </Links>
</div>
</template>

<script>
import SvgIcon from '../../components/SvgIcon'
import Links from './Link.vue'
import { isArray } from 'util';
export default {
  props: {
    path: {
      type: String
    },
    meta: {
      type: Object
    }
  },
  created () {
    console.log(this.meta,'你好王立品1111')
  },
  data() {
    return {
      
    }
  },
  components: { Links }
}
</script>

<style lang="less" scoped>
.name-title {
  padding-left: 15px;
  color: rgb(255, 255, 255);
}
</style>

