<template>
  <div class="h5-text">
    {{text}}
  </div>
</template>
<script>
export default {
  name: 'HText',
  props: {
    text: {
      type: String,
      default: '这是一段文字'
    }
  },
  data() {
    return {
      defaultStyle: {
        height: 40
      }
    }
  }
}
</script>