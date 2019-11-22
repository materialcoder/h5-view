<template>
  <div>
    <div class="attr-title">组件属性</div>
    <el-form>
      <component 
        v-for="item in currentElementProps"
        :key="item"
        :is="'h5-' + item"
        v-bind.sync="activeElement.propsValue"
      ></component>
    </el-form>
  </div>
</template>

<script>
import attrComponents from './index'
import {mapState, mapGetters} from 'vuex'
export default {
  components: {
    ...attrComponents
  },
  computed: {
    ...mapState({
      projectData: state => state.editor.projectData,
      activePageUUID: state => state.editor.activePageUUID,
      activeElementUUID: state => state.editor.activeElementUUID
    }),
    ...mapGetters([
      'currentPageIndex',
      'currentElementIndex',
      'activeElement',
      'activePage'
    ]),
    // 当前选中元素需要编辑的props列表
    currentElementProps() {
      console.log(this.activeElement)
      if (!this.activeElement.propsValue) {
        return []
      }
      let keyList = Object.keys(this.activeElement.propsValue)
      let editPropsComponentNameList = Object.keys(attrComponents)
      // 过滤掉找不到对应 attr props编辑组件的key
      keyList = keyList.filter(v => {
        return editPropsComponentNameList.includes('h5-' + v)
      })
      return keyList
    }
  }
}
</script>

<style lang="scss" scoped>
  .attr-title {
    margin-bottom: 10px;
    text-align: left;
    font-weight: bold;
  }
</style>