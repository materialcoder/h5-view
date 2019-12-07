<template>
  <div class="image-select-wrapper">
    <div class="image-select-l">
      <div class="image-select-inner" @click="handleClick">
        <img :src="url" v-if="url"/>
        <div class="image-select-box" v-else>
          <p><i class="el-icon-plus"></i></p>
          <p>选择图片</p>
        </div>
      </div>
    </div>
    <div class="image-select-r">
      <el-input type="textarea" :rows="4" placeholder="请输入图片URL地址" v-model="tempValue"></el-input>
    </div>
  </div>
</template>

<script>
import $bus from '@client/eventBus'
export default {
  props: {
    url: String
  },
  data() {
    return {
      tempValue: ''
    }
  },
  mounted() {
    this.tempValue = this.url
  },
  watch: {
    tempValue(val) {
      this.changeImage(val)
    }
  },
  methods: {
    handleClick() {
      // 弹出图片选择窗
      $bus.$emit('show-select-image-libs')
    },
    changeImage(val) {
      this.$emit('update:url', val)
    }
  }
}
</script>

<style lang="scss">
  .image-select-wrapper {
    display: flex;
    .image-select-l {
      margin-right: 10px;
      .image-select-inner {
        width: 95px;
        height: 95px;
        border: 1px dashed #ccc;
        background-color: #eee;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          border: 1px dashed #1989fa;
          color: #1989fa;
        }
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
    .image-select-r {
      width: 120px;
    }
  }
  .image-select-box {
    width: 100%;
    height: 100%;
    // border: 1px dashed #ccc;
    background-color: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    user-select: none;
  }
</style>