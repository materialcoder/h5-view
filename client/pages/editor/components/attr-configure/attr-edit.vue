<template>
  <el-scrollbar class="attr-edit-wrapper">
    <div class="attr-edit-inner" v-if="activeElementUUID">
      <div class="props-attr-style">
        <props-attr></props-attr>
      </div>
      <div class="common-attr-style">
        <base-attr></base-attr>
      </div>
    </div>
    <div v-else>请在画板中选中要编辑的元素</div>
  </el-scrollbar>
</template>

<script>
import propsAttr from './attr-props-components/props-attr/index.vue'
import baseAttr from './attr-props-components/base-attr'
import {mapState, mapGetters} from 'vuex'
export default {
  name: 'attrEdit',
  components: {
    propsAttr,
    baseAttr
  },
  computed: {
    ...mapState({
      activeElementUUID: state => state.editor.activeElementUUID
    }),
    ...mapGetters([
      'activeElement'
    ])
  }
}
</script>

<style lang="scss">
  .attr-edit-wrapper {
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: auto;
    }
    .attr-edit-inner {
      padding: 0 20px;
    }
  }
</style>