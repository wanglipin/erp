<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>固定表头, 按照表头顺序排序</span>
      </div>
      <div>
        <el-checkbox-group v-model="tableHeader" style="padding-bottom: 15px;">
          <el-checkbox label="性别">性别</el-checkbox>
          <el-checkbox label="年龄">年龄</el-checkbox>
        </el-checkbox-group>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column label="姓名" prop="name" align="center">
          </el-table-column>
          <el-table-column v-for="item in formThead" :key="item" :label="item">
            <template slot-scope="scope">
              {{ scope.row[item] }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="fenye()"
          small
          :current-page.sync="assessParams.page"
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
        <el-input v-model="input" placeholder="请输入内容" @change="fenye(1)"></el-input>
      </div>
    </el-card>
  </div>
</template>

<script>
const arr = ['性别','年龄']
export default {
  data() {
    return {
      assessParams: {
        page: 1,
        rows: 10
      },
      input: '',
      tableData: [{
        年龄: '16',
        name: '张三',
        性别: '男'
      }, {
        年龄: '17',
        name: '李四',
        性别: '女'
      }],
      formTheadOptions: ['性别', '年龄'],
      formThead: arr,
      tableHeader: arr,
      // key: 1
    }
  },
  created () {
  },
  computed: {},
  methods: {
    fenye (nub) {
      if (nub) {
        this.assessParams.page = 1;
      }
      // console.log('触发分页了')
      // console.log(nub,'111111111')
      console.log(this.assessParams.page,'assessParams.page')
    },
    handleCici (nub) {
      if (nub) {
        // console.log(nub,'111111111')
        console.log(this.assessParams.page,'assessParams.page')
      }
    }
  },
  watch: {
    tableHeader (Val) {
      console.log(Val)
      this.formThead = this.formTheadOptions.filter(item => Val.indexOf(item) >= 0)
      // this.key = this.key + 1// 为了保证table 每次都会重渲 
    }
  },
  mounted() {
  },
}
</script>

<style lang="less" scoped>

</style>
