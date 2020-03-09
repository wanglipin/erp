<template>
<div>
  <h1>可编辑的表格二次封装</h1>
  <el-table
    v-bind="$attrs"
    v-on="$listeners">
    <el-table-column
      v-for="(item, index) in columns" 
      :key="index"
      :prop="item['key']"
      :label="item['title']"
      >
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    columns: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  created() {
  },
}
</script>

<style lang="less">
  
</style>