<template>
  <div>
    <el-card>
      <!-- image限制上传文件类型 -->
      <input type="file" accept="image/*" @change="handleChange">
      <img :src="imge" alt="">
      <el-button type="success" @click="handleUpload">上传(fromData格式)</el-button>
      <br><br>
      <input type="file" accept="image/*" @change="handleChange">
      <img src="" alt="">
      <el-button type="success" @click="handleUploadBass64">上传(base64格式)</el-button>
    </el-card>
  </div>
</template>

<script>
import { $ajax, $formatFileName} from '@/utils/ajax'
const LIMITMAX = 100 * 1024
const LIMITTYPE = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
export default {
  data() {
    return {
      LIMITMAX,
      LIMITTYPE,
      file: null,
      imge: null
    }
  },
  created() {
  },
  methods: {
    handleChange (files) {
      let file = files.target.files[0] 
      if (!file) return
      if (file.size > LIMITMAX) {
        this.$message.error('文件最大上传100kb')
        file.value = ''
        return
      }
      // 限制上传文件类型
      if (!LIMITTYPE.includes(file.type)) {
        let type = file.type.slice(file.type.lastIndexOf('/') + 1, file.type.length)
        this.$message.error(`不支持上传${ type }类型`)
        file.value = ''
        return
      }
      this.file = file
    },
    async handleUpload () {
      let formData = new FormData();
      formData.append('chunk', this.file)
      formData.append('filename', $formatFileName(this.file.name).filename)
      let data = await $ajax({
        url: 'api/file/verify/single',
        data: formData
      })
      if (data.success) {
        this.$notify({
          message: data.message,
          type: 'success'
        });
        this.imge =data.data.url
      }
    },
    convertBase64 (file) {
      return new Promise((resolve, reject) => {
        let fileReader = new FileReader()
        fileReader.readAsDataURL(file) // 用Base64方法读取file和blob类型， 其中这个方法有三种
        fileReader.onload = e => {// 读取完，e.target.result
          resolve(e.target.result)
        }
      }) 
    },
    async handleUploadBass64 () {
      let base64 = await this.convertBase64(this.file)
      let data = await $ajax({
        url: 'api/file/verify/single1',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
          // 'Content-Type': 'application/form-data'
        },
        // data: JSON.stringify({ filename: $formatFileName(this.file.name).filename , chunk: encodeURIComponent(base64) })
        data: `chunk=${encodeURIComponent(base64)}&filename=${ $formatFileName(this.file.name).filename }`
      })
      if (data.success) {
        this.$notify({
          message: data.message,
          type: 'success'
        });
        this.imge =data.data.url
      }
    }
  },
}
</script>

<style lang="less">

</style>
