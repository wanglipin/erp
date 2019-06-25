<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>固定表头, 按照表头顺序排序</span>
      </div>
      <div>
        <el-checkbox-group v-model="tableHeader" style="padding-bottom: 15px;">
          <!-- <el-checkbox label="姓名"></el-checkbox> -->
          <el-checkbox label="年龄"></el-checkbox>
          <el-checkbox label="性别"></el-checkbox>
        </el-checkbox-group>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column label="姓名" prop="name" align="center">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            >
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            v-show="tableHeader.indexOf('年龄') > -1">
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeader: ['姓名','年龄', '性别'],
      tableData: [{
          age: '16',
          name: '张三',
          sex: '男'
        }, {
          age: '17',
          name: '李四',
          sex: '女'
        }]
    }
  },
}
</script>

<style lang="less" scoped>

</style>
