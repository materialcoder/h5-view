<template>
  <el-form-item label="文本内容：">
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入文本内容"
      v-model="tempText"
    ></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'h5-text',
  props: {
    text: String
  },
  data() {
    return {
      tempText: ''
    }
  },
  mounted() {
    this.tempText = this.text
  },
  watch: {
    text() {
      this.tempText = this.text
    },
    tempText() {
      // 以 update:myPropName 的模式触发事件,对props进行双向绑定，在父组件中通过v-bind:propName.sync=""来进行监听，有多个props的话，可以使用v-bind.sync="props"
      this.$emit('update:text', this.tempText)
    }
  }
}
</script>

<style>

</style>