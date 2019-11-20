<template>
  <div class="page-editor editor-wrapper">
    <!-- 左侧导航 -->
    <div class="editor-sidebar">
      <el-tabs tab-position="left" v-model="activeSidebar">
        <el-tab-pane v-for="(item, index) in sidebarMenus" :key="index" :name="item.value" :label="item.label">
          <span slot="label"><i :class="item.icon"></i></span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 组件&页面&模板库 -->
    <div class="page-editor-components-wrapper">
      <componentLists v-if="activeSidebar === 'componentLists'"></componentLists>
      <pageManage v-if="activeSidebar === 'pageManage'"></pageManage>
      <templateLibs v-if="activeSidebar === 'templateLibs'"></templateLibs>
    </div>
    <!-- 编辑区 -->
    <div class="page-editor-main">
      <editPanel></editPanel>
    </div>
    <!-- 属性编辑区 -->
    <div class="page-editor-attr-wrapper">attr</div>
  </div>
</template>

<script>
import componentLists from './components/componentLists/Index.vue'
import pageManage from './components/pageManage/Index.vue'
import templateLibs from './components/templateLibs/Index.vue'
import editPanel from './components/editPanel/Index'
export default {
  components: {
    componentLists,
    pageManage,
    templateLibs,
    editPanel
  },
  data() {
    return {
      activeSidebar: 'componentLists',
      sidebarMenus: [
        {
          label: '组件列表',
          value: 'componentLists',
          icon: 'el-icon-s-operation'
        },
        {
          label: '页面管理',
          value: 'pageManage',
          icon: 'el-icon-document'
        },
        {
          label: '模板库',
          value: 'templateLibs',
          icon: 'el-icon-files'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
// .page-editor, .editor-sidebar, .el-tabs {
//   height: 100%;
// }
.editor-wrapper {
  display: flex;
  height: 100%;
  position: relative;
  .editor-sidebar {
    width: 60px;
    height: 100%;
    .el-tabs {
      height: 100%;
    }
  }
  .page-editor-components-wrapper {
    width: 255px;
  }
  .page-editor-attr-wrapper {
    width: 300px;
  }
  .page-editor-main {
    background-color: #ddd;
    flex: 1;
  }
}
</style>