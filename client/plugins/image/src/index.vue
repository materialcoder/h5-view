<template>
  <div class="h5-image">
    <img :src="imgSrc"
         alt="">
  </div>
</template>

<script>
export default {
  name: 'HImage',
  props: {
    imgSrc: {
      type: String,
      default: require('@/common/images/default.jpeg')
    }
  }
}
</script>

<style lang="scss" scoped>
.h5-image {
  width: 100%;
  height: 100%;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
