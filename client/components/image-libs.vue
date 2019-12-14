<template>
  <el-dialog class="dialog-image-select" :visible.sync="showDialog" title="选择图片">
    <div class="image-libs-wrapper">
      <el-upload
        class="select-image-upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        accept="jpg,png,gif"
        :show-file-list="false"
        :before-upload="beforeUpload">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg,png,gif文件，且不超过2Mb</div>
      </el-upload>
      <!-- <el-button @click="deleteAll">删除</el-button> -->
      <div class="image-list-wrapper" v-if="imageList.length">
        <div class="img-item" v-for="item in imageList" :key="item._id" @click="handleImageClick(item.url)">
          <img :src="item.url" alt="">
        </div>
      </div>
      <div class="image-list-wrapper text-center" v-else>暂无数据</div>
    </div>
  </el-dialog>
</template>

<script>
import $bus from '@client/eventBus'
export default {
  data() {
    return {
      showDialog: false,
      imageList: [],
      selectId: ''
    }
  },
  mounted() {
    $bus.$on('show-select-image-libs', selectId => {
      this.showDialog = true
      this.selectId = selectId
    })
  },
  watch: {
    showDialog(val) {
      if (val) {
        this.getMyImages()
      }
    }
  },
  methods: {
    beforeUpload(file) {
      console.log('beforeUpload')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return
      }
      let temp1 = file.name.split('.')
      let temp = temp1[temp1.length - 1]
      if (!['jpg', 'png', 'gif'].includes(temp)) {
        this.$message.error('请上传jpg/png/gif文件')
        return
      }
      this.uploadImg(file)
      return false
    },
    // 上传图片
    uploadImg(file) {
      console.log(file)
      let params = new FormData()
      params.append('file', file)
      console.log(params)
      this.$axios.post('/common/uploadImage', params).then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.imageList.unshift(res.body)
        }
      }).catch(() => {})
    },
    // 获取我的所有图片
    getMyImages() {
      this.$axios.get('/user/images').then((res) => {
        console.log(res)
        this.imageList = res.body
      })
    },
    handleImageClick(url) {
      $bus.$emit('select-image', this.selectId, url)
      this.showDialog = false
    },
    deleteAll() {
      this.$axios.delete('/user/delteimages').then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss">
  .dialog-image-select {
    .el-dialog__body {
      padding: 0 10px 20px;
    }
    .select-image-upload {
      display: flex;
      .el-upload.el-upload--text {
        margin-right: 20px;
      }
      .el-upload__tip {
        margin-top: 0;
        line-height: 32px;
      }
    }
    .image-list-wrapper {
      min-height: 300px;
      max-height: 500px;
      overflow: auto;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .img-item {
        width: 140px;
        height: 140px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        margin: 10px;
        background: #eee;
        cursor: pointer;
        img {
          width: 100%;
        }
        &:hover {
          box-shadow: 0 0 16px 0 rgba(0, 0, 0, .16);
          transform: translate3d(0, -2px, 0)
        }
      }
    }
    .text-center {
      align-items: center;
      justify-content: center;
    }
  }
</style>