<template>
  <div class="h5-button">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'hButton',
  props: {
    text: {
      type: String,
      default: '按钮'
    }
  }
}
</script>

<style lang="scss">
.h5-button {
  width: 100%;
  height: 100%;
  display: inline-block;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
