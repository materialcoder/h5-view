<template>
  <div class="edit-panel">
    <div class="edit-main" :style="{width: projectData.width + 'px', height: projectData.height + 'px'}">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectData: {
        width: 400,
        height: 650
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit-panel {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    .edit-main {
      background-color: #fff;
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==");
      margin: 30px auto;
    }
  }
</style>