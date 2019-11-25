<template>
  <div class="component-lib-wrapper">
    <p class="p-title">组件库</p>
    <el-scrollbar>
      <ul>
        <li v-for="(item, index) in componentLists" :key="index">
          <div class="component-lib-title">
            <p>{{item.title}}</p>
          </div>
          <div v-if="item.components && item.components.length" class="component-lib-group">
            <div class="component-lib-item" v-for="(ele, i) in item.components" :key="i" @click="handleClick(ele)">
              <div class="lib-item-img"><i class="iconfont iconwenzi"></i></div>
              <p>{{ele.title}}</p>
            </div>
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
import {camelCase} from 'lodash'
import eleConfig from '../../ele-config'
import {regist_components_obj} from '@client/plugins/index'
export default {
  name: 'component-lists',
  data() {
    return {
      componentLists: eleConfig
    }
  },
  methods: {
    handleClick(ele) {
      console.log(ele)
      let props = this.getComponentProps(ele.elName)
      console.log(props)
      this.$store.dispatch('addElement', {...ele, needProps: props})
    },
    /**
     * 根据elName获取组件默认props数据
     */
    getComponentProps(elName) {
      console.log(elName)
      console.log(regist_components_obj)
      let elComponentData
      for (let key in regist_components_obj) {
        if (key.toLowerCase() === camelCase(elName).toLowerCase()) {
          elComponentData = regist_components_obj[key]
          break
        }
      }
      if (!elComponentData) return

      let props = {}
      for (let key in elComponentData.props) {
        props[key] = [Object, Array].includes(elComponentData.props[key].type) ? elComponentData.props[key].default() : elComponentData.props[key].default
      }
      return props
    }
  }
}
</script>

<style lang="scss" scoped>
  .component-lib-wrapper {
    box-sizing: border-box;
    padding: 0 10px;
  }
  .p-title {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    font-weight: bold;
  }
  
  .component-lib-title {
    height: 38px;
    line-height: 38px;
    text-align: left;
  }

  .component-lib-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .component-lib-item {
      width: 96px;
      padding: 10px;
      margin: 10px 15px 10px 5px;
      font-size: 14px;
      text-align: center;
      background-color: #eee;
      border: 1px solid #ddd;
      cursor: pointer;
    }
    .component-lib-item:hover {
      background-color: #fff;
      color: #1989fa;
    }
  }
</style>