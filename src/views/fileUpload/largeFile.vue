<template>
  <el-card>
    <input type="file" @change="handleFileChange">
    <div>
      <div style="padding: 10px 0;">
        <el-button type="success" @click="handleUpload">上传</el-button>
        <el-button type="warning" @click="handleResume">恢复</el-button>
        <el-button type="danger" @click="handlePause">暂停</el-button>
      </div>
      <div>计算文件hash</div>
      <el-progress :percentage="hashPercentage"></el-progress>
      <div>总进度</div>
      <el-progress :percentage="fakeUploadPercentage"></el-progress>
      <!-- 多个切片 -->
      <el-table :data="fileData">
        <el-table-column prop="hash" label="切片hash" align="center"></el-table-column>
        <el-table-column label="大小(kb)" align="center" width="120">
          <template v-slot="{ row }">
            {{ row.size | tansformByte}}
          </template>
        </el-table-column>
        <el-table-column label="进度" align="center">
          <template v-slot="{ row }">
            <div>
              <el-progress :percentage="row.percentage">
              </el-progress>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
import http from '@/utils/http'
import { request } from '@/utils/request'
const STATUS = {
  wait: 'wait',
  pause: 'pause',
  uploading: 'uploading'
}
const SIZE = 2 * 1024 * 1024
export default {
  name: 'largeFile',
  data() {
    return {
      fakeUploadPercentage: 0,
      container: {
        file: null,
        hash: ''
      },
      status: STATUS.wait,
      hashPercentage: 0,
      fileData: [], // 上传的数据
      requestList: [] // 存储 每一个fetch请求（切片）Promise数组
    }
  },
  computed: {
    UploadPercentage () {
      if (!this.container.file || !this.fileData.length) return 0;
      const loaded =this.fileData.map(item => item.size * item.percentage)
      .reduce((acc, cur) => acc + cur)
      return parseInt((loaded / this.container.file.size).toFixed(2))
    }
  },
  watch: {
    UploadPercentage (newVal, oldVal) {
      if (newVal > this.fakeUploadPercentage) {
        this.fakeUploadPercentage = newVal
      }
    }
  },
  methods: {
    async handleResume () {
      this.status = STATUS.uploading;
      const data = await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      )
      const { data: { showldUpload, uploadedList }, message} = JSON.parse(data.data)
      await this.uploadChunks(uploadedList)
    },
    handlePause () {
      this.status = STATUS.pause; // 状态停
      this.resetData()
    },
    resetData () {
      this.requestList.forEach(xhr => xhr ? xhr.abort() : null)
      this.requestList = []
      if (this.container.worker) {
        // console.log(this.container, 'this.container')
        this.container.worker.onmessage = null; // 暂停计算hash
      }
    },
    async verifyUpload (fileName, fileHash) {
      const data = request({ 
          url: '/api/file/verify',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({ fileName, fileHash })
        })
      return data || ''
    },
    async calculateHash (fileChunkList) {
      return new Promise(resovle => {
        //  web workers
        //  js 单线程 UI 住线程
        // H5 web workes 单独开一个线程 独立于 worker
        // 回调 不回影响原来的UI
        // 用于计算功能
        this.container.worker = new Worker('/hash.js') // 开启新线程
        this.container.worker.postMessage({ fileChunkList });
        this.container.worker.onmessage = e => {
          const { percentage, hash } = e.data;
          this.hashPercentage = percentage; // 接收读取多少
          if (hash) {
            resovle(hash)
          }
        }
      })
    },
    async handleUpload (e) {
      if (!this.container.file) return;
      this.status = STATUS.uploading;
      const fileChunkList = this.createFileChunk(this.container.file); // 获取切割的多个切片块
      this.container.hash = await this.calculateHash(fileChunkList)
      // 上传验证，hash 上传过的文件，没必要再次上传
      const { data } = await this.verifyUpload( //上传  验证
        this.container.file.name,
        this.container.hash
      )
      const { data: { showldUpload, uploadedList }, message} = JSON.parse(data)
      if (!showldUpload) {
        this.$notify({
          message: '秒传：上传成功',
          type: 'success'
        });
        this.status = STATUS.wait
        return;
      }
      this.fileData = fileChunkList.map(({ file }, index) => ({
        fileName: this.container.hash,
        index,
        hash: this.container.hash + '_' + index, // 每个块都有自己的index，在内的hash，可排序，可追踪
        chunk: file,
        size: file.size,
        percentage: uploadedList.includes(index) ? 100 : 0 // 某一片是否上传
      }))
      await this.uploadChunks(uploadedList); // 上传所有切片
    },
    async uploadChunks (uploadedList = []) {
      // console.log(this.fileData)
      // 数据数组this.data=> 请求数组 => 并发
      const requestList = this.fileData
        .map(({ chunk, hash, index}) => {
          const formData = new FormData(); // js 构建表单
          formData.append('chunk', chunk) // 当前切片的hash
          formData.append('hash', hash)
          formData.append('filename', this.container.file.name)
          formData.append('fileHash', this.container.hash)
          // 文件hash
          return { formData, index }
        })
        .map(async ({ formData, index }) => {
          request({
            url: '/api/file/verify/chunk',
            data: formData,
            onProgress: this.createProgressHandler(this.fileData[index]),
            requestList: this.requestList
          })
        })
        await Promise.all(requestList)
        // 之前上传的切片属性+本次上传的切片数量=所有切片数量
        if (uploadedList.length + requestList.length === this.fileData.length) {
          await this.mergeRequest();
        }
        console.log('可以发送合并请求了')
    },
    async mergeRequest () {
       await request({
        url: '/api/file/verify/merge',
        headers: {
          'content-type': 'application/json'
        },
        data: JSON.stringify({
          size: SIZE, // 一个切片的大小
          fileHash: this.container.hash,
          filename: this.container.file.name
        })
      })
      this.$message.success('上传成功')
      this.status = STATUS.wait
    },
    createProgressHandler (item) { // item 某一个块
      return e => {
        item.percentage = parseInt(String((e.loaded / e.total) * 100))
      }
    },
    createFileChunk (file, size = SIZE) {
      const fileChunkList = [] // 存放切割的blob
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push({
          file: file.slice(cur, cur + size) // 第一个参数（开始切片的位置） 第二个参数（切片结束的位置）
        })
        cur += size
      }
      return fileChunkList
    },
    handleFileChange (e) {
      const [ file ] = e.target.files
      this.container.file = file;
    }
  },
}
</script>

<style lang="less">
  
</style>
