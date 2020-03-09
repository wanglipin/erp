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
      </div>
      <br><br>
      <compileTable 
        :data="tableDatas"
        :columns="compileTableData"
        border
        >
        </compileTable>
    </el-card>
    <!-- style="position:absolute;top:80px;left: 120px;" -->
    <!-- <iframe src="http://192.168.1.103:8088" id="mobsf" scrolling="auto" frameborder="0"></iframe> -->
  </div>
</template>

<script>
import compileTable from './compoentens/compileTable.vue'
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
      key: 1,
      tableDatas: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
          }
      ],
      compileTableData: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ]
    }
  },
  components: {compileTable},
  created () {
  },
  computed: {},
  methods: {
    // 做iframe标签用的
    // changeMobsfIframe () {
    //   const mobsf = document.getElementById('mobsf');
    //   const deviceWidth = document.body.clientWidth;
    //   const deviceHeight = document.body.clientHeight;
    //   mobsf.style.width = (Number(deviceWidth)-120) + 'px'; //数字是页面布局宽度差值
    //   mobsf.style.height = (Number(deviceHeight)-80) + 'px'; //数字是页面布局高度差
    // }
  },
  watch: {
    tableHeader (Val) {
      this.formThead = this.formTheadOptions.filter(item => Val.indexOf(item) >= 0)
      this.key = this.key + 1// 为了保证table 每次都会重渲 
    }
  },
  mounted() {
      // 做iframe标签用的
    // this.changeMobsfIframe()
    // window.onresize = function(){
    //   this.changeMobsfIframe()
    // }
  },
}
</script>

<style lang="less" scoped>

</style>
