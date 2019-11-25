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
      <div class="image-list">
        llll
      </div>
    </div>
  </el-dialog>
</template>

<script>
import $bus from '@client/eventBus'
export default {
  data() {
    return {
      showDialog: false
    }
  },
  mounted() {
    $bus.$on('show-select-image-libs', () => {
      this.showDialog = true
    })
  },
  methods: {
    beforeUpload(file) {
      console.log('beforeUpload')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
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
    .image-list {
      min-height: 300px;
    }
  }
</style>