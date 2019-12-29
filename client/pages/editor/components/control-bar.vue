<template>
  <div class="component-contorl-bar">
    <div class="button-item" :class="{disabled: !canUndo}" @click="editorUndo">
      <i class="iconfont iconundo"></i>
      <p>撤销</p>
    </div>
    <div class="button-item" :class="{disabled: !canRedo}" @click="editorRedo">
      <i class="iconfont iconredo"></i>
      <p>重做</p>
    </div>
    <div class="button-item" @click="preview">
      <i class="iconfont iconplus-preview"></i>
      <p>预览</p>
    </div>
    <div class="button-item" @click="save">
      <i class="iconfont iconbaocun"></i>
      <p>保存</p>
    </div>
    <div class="button-item">
      <i class="iconfont iconfabu"></i>
      <p>发布</p>
    </div>
    <div class="button-item" @click="cancel">
      <i class="iconfont iconlog-out"></i>
      <p>退出</p>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'canUndo',
      'canRedo'
    ])
  },
  methods: {
    ...mapActions([
      'editorUndo',
      'editorRedo'
    ]),
    save() {
      this.$emit('save')
    },
    cancel() {
      this.$emit('cancel')
    },
    preview() {
      this.$emit('preview')
    }
  }
}
</script>

<style lang="scss">
  .button-item {
    display: inline-block;
    // width: 80px;
    margin: 0 10px;
    height: 44px;
    cursor: pointer;
    &:hover {
      color: #409EFF;
    }
    &.disabled {
      cursor: not-allowed;
      color: #ccc;
    }
  }
</style>