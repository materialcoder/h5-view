<template>
  <div class="components-preview">
    <div class="components-preview-mask"></div>
    <div class="preview-panel">
      <div class="iframe-wrapper" :style="{width: $config.canvasH5Width + 'px', height: $config.canvasH5Height + 'px'}">
        <iframe :src="$config.baseURL + '/page/view/' + pageId" frameborder="0" style="width: 100%;height: 100%;background-color:transparent;"></iframe>
      </div>
    </div>
    <div class="desc-panel">
      <slot></slot>
    </div>
    <div class="close-btn" @click="closePreviewWrapper">
      <i class="el-icon-close"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageId: String
  },
  methods: {
    closePreviewWrapper() {
      this.$emit('closePreview')
    }
  }
}
</script>

<style lang="scss">
  .components-preview-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.8);
    z-index: 1002;
  }
  .preview-panel {
    position: fixed;
    top: 0;
    left: 0;
    right: 640px;
    bottom: 0;
    z-index: 1004;
    overflow: hidden;
    .iframe-wrapper {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background: #fff;
    }
  }
  .desc-panel {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1006;
    width: 640px;
    height: 100%;
    padding: 20px;
    background: #fff;
  }
  .close-btn {
    position: fixed;
    right: 15px;
    top: 15px;
    z-index: 1008;
    font-size: 32px;
    cursor: pointer;
    &:hover {
      color: #409FEE;
    }
  }
</style>