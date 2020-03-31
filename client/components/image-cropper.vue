<template>
  <div class="component-image-cropper">
    <div class="page-cover-img">
      <img :src="url || defaultCoverImage" alt="" />
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :before-upload="beforeUpload"
        accept="image/gif, image/jpeg, image/png, image/bmp"
        :show-file-list="false"
      >
        <p>更换主题</p>
      </el-upload>
    </div>
    <el-dialog
      title="图片裁剪"
      :visible.sync="dialogVisible"
      append-to-body
      center
      width="400px"
    >
      <div class="cropper-wrapper">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputType="option.outputType"
          :autoCrop="option.autoCrop"
          :full="option.full"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixedBox="option.fixedBox"
          :centerBox="option.centerBox"
          :info="option.info"
        ></vueCropper>
      </div>
      <div class="dialog-footer" slot="footer">
        <el-button size="small" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" size="small" @click="uploadImage"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  props: {
    url: String
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      defaultCoverImage: require('@client/common/images/default-cover.jpg'),
      option: {
        img: '', // 裁剪图片的地址
        outputType: 'png', // 裁剪生成图片的格式
        outputSize: '1', // 剪切后的图片质量（0.1-1）
        full: false, // 输出原图比例截图
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // 自由开启自动截图 高度宽度才生效
        autoCropWidth: 120,
        autoCropHeight: 120,
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [7, 5], // 截图框的宽高比例
        fixedBox: false, // 固定截图框大小 不允许改变
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        info: false // 裁剪框的大小信息
      }
    }
  },
  methods: {
    uploadImage() {
      this.loading = true
      this.$refs.cropper.getCropBlob(data => {
        let file = this.blobToFile(data)
        let params = new FormData()
        params.append('file', file)
        this.$axios
          .post('/common/uploadFile', params)
          .then(res => {
            console.log(res)
            this.loading = false
            this.dialogVisible = false
            this.$emit('update:url', res.body)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    beforeUpload(file) {
      if (file.size > 4 * 1024 * 1024) {
        this.$message.error('上传图片不能超过4M!')
        return false
      }
      var reader = new FileReader()
      let _this = this
      reader.onload = e => {
        let data
        if (typeof e.target.result === 'object') {
          // 把array buffer 转为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        _this.option.img = data
      }
      // 转化为base64
      reader.readAsDataURL(file)
      this.dialogVisible = true
      console.log(this.option)
      return false
    },
    blobToFile(blob, filename) {
      blob.lastModifiedDate = new Date()
      blob.name = filename || new Date().getTime()
      return blob
    }
  }
}
</script>

<style lang="scss">
.component-image-cropper {
  width: 120px;
  height: 121px;
  border: 1px dashed #409fee;
  .page-cover-img {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
    }
    > div {
      position: absolute;
      bottom: 25px;
      height: 28px;
      width: 80px;
      line-height: 28px;
      text-align: center;
      background: rgba(0, 0, 0, 0.7);
      color: #fff;
      border-radius: 4px;
    }
  }
}
.cropper-wrapper {
  height: 400px;
}
</style>
