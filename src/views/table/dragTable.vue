<template>
   <el-card class="box-card">
    <el-table ref="dragTable" :data="tableData" border fit highlight-current-row style="width: 100%">
    <el-table-column prop="id" label="ID" align="center" width="65"></el-table-column>
    <el-table-column prop="data" label="时间" width="180px" align="center"></el-table-column>
    <el-table-column prop="title" min-width="300px" label="台词"></el-table-column>
    <el-table-column prop="author" width="110px" align="center" label="作者"></el-table-column>
    <el-table-column width="100px" label="操作难度性">
      <template slot-scope="scope">
        <svg-icon v-for="n in +scope.row.mportancer" :key="n" icon-class="star" class="icon-star" />
      </template>
    </el-table-column>
    <el-table-column prop="readings" width="95" label="阅读数"></el-table-column>
    <el-table-column width="100px" label="状态">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="拖拽" width="80" align="center">
      <template slot-scope="{}">
        <svg-icon class="drag-handler" icon-class="drag" />
      </template>
    </el-table-column>
  </el-table>
    <div class="drag-table">
      <p id="cc" draggable="true">请拖拽我吧</p>
    </div>
    <div class="drag-table"></div>
   </el-card>
</template>

<script>
import { statusFilter } from 'filters'
import { fetchList } from '@/mock/article'
import Sortable from 'sortablejs'
 document.ondragover = function (e) {
    e.preventDefault();
  }
  document.ondragstart = function (e) {
    e.dataTransfer.setData("Text", e.target.id);// id为cc
    console.log(e.dataTransfer)
  }
  document.ondrop = function (e) {
    e.preventDefault();
    let data = e.dataTransfer.getData('Text');
    e.target.appendChild(document.getElementById(data));
  }
  const arr = [
    {id: 1, data: '2019-05-29', title: '燃烧的剑 燃烧的心', author: '露娜', mportancer: 5, readings: 6666, 'status': 'draft'},
    {id: 2, data: '2019-05-29', title: '可以赶尽 无法杀绝', author: '李白', mportancer: 4, readings: 7777, 'status': 'draft'},
    {id: 3, data: '2019-05-29', title: '重申 我既不吃大蒜 也没有口臭', author: '韩信', mportancer: 4, readings: 8888, status: 'draft'},
    {id: 4, data: '2019-05-29', title: '不要爱上妾身呦', author: '貂蝉', mportancer: 4, readings: 1321, 'status': 'draft'},
    {id: 5, data: '2019-05-29', title: '如果世上还有什么我不懂的学问 那就是女孩子', author: '张良', mportancer: 3, readings: 1111, 'status': 'draft'},
    {id: 6, data: '2019-05-29', title: '大小姐驾到 统统闪开', author: '孙尚香', mportancer: 1, readings: 2345, 'status': 'draft'},
    {id: 7, data: '2019-05-29', title: '不是你记忆中的荆轲 但致命的程度 没两样', author: '阿珂', mportancer: 3, readings: 4321, 'status': 'draft'},
    {id: 8, data: '2019-05-29', title: '来,听离歌 替对面奏响离歌', author: '高渐离', mportancer: 2, readings: 222, 'status': 'draft'},
    {id: 9, data: '2019-05-29', title: '无法让步的有两件事 胜利和小乔', author: '周瑜', mportancer: 1, readings: 3333, 'status': 'draft'},
    {id: 11, data: '2019-05-29', title: '恋爱和战斗 都要勇往直前', author: '小乔', mportancer: 2, readings: 5555, 'status': 'draft'},
    {id: 10, data: '2019-05-29', title: '天上天下 唯朕独尊', author: '嬴政', mportancer: 1, readings: 4567, status: 'draft'},
    {id: 12, data: '2019-05-29', title: '执长缨 此生同 争霸皇城划封侯', author: '花木兰', mportancer: 4, readings: 33333, 'status': 'draft'}
  ]
  export default {
    name: 'dragTable',
    data() {
      return {
        tableData: arr,
        sortable: null,
        oldList: [],
        newList: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      async getList() {
        // this.listLoading = true
        // const { data } = await fetchList(this.listQuery)
        // this.list = data.items
        // this.total = data.total
        // this.listLoading = false
        // this.oldList = this.tableData.map(v => v.id)
        // this.newList = this.oldList.slice()
        this.$nextTick(() => {
          this.setSort()
        })
      },
      setSort () {
        const e = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
        this.sortable = Sortable.create(e, {
          ghostClass: 'sortable-ghost',
          animation: 150,
          setData: (dataTransfer) => {
            dataTransfer.setData('Text', '')
          },
          // 拖拽结束时候的回调
          // onEnd: (evt) => {
          //   const targetRow = this.tableData.splice(evt.oldIndex, 1)[0]
          //   this.tableData.splice(evt.newIndex, 0, targetRow)

          //   // for show the changes, you can delete in you code
          //   const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          //   this.newList.splice(evt.newIndex, 0, tempIndex)
          // },
        })
      }
    },
    mounted () {
      this.setSort();
    }
  }
</script>
<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #1890ff!important;
}
</style>
<style lang="postcss">
.drag-table {
  width: 200px;
  height: 200px;
  border: 1px solid black;
  margin-bottom: 10px;
}
</style>

