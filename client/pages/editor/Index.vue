<template>
  <div class="page-editor editor-wrapper" v-loading="loading">
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
      <div class="control-bar-wrapper">
        <control-bar
          @save="saveFn"
          @cancel="cancelFn"
        ></control-bar>
      </div>
      <editPanel></editPanel>
    </div>
    <!-- 属性编辑区 -->
    <div class="page-editor-attr-wrapper">
      <el-tabs v-model="activeAttrTab" stretch>
        <el-tab-pane name="属性" label="属性">
          <attr-edit></attr-edit>
        </el-tab-pane>
        <el-tab-pane name="事件" label="事件">
          <event-edit></event-edit>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 选择图片弹窗 -->
    <image-libs/>
  </div>
</template>

<script>
import componentLists from './components/componentLists/Index.vue'
import pageManage from './components/page-manage'
import templateLibs from './components/template-libs'
import editPanel from './components/editPanel/Index'
// 顶部操作栏
import controlBar from './components/control-bar'
// 属性编辑相关组件
import attrEdit from './components/attr-configure/attr-edit'
import eventEdit from './components/attr-configure/event-edit'

import imageLibs from '@client/components/image-libs'

import {mapState} from 'vuex'
export default {
  components: {
    componentLists,
    pageManage,
    templateLibs,
    editPanel,
    controlBar,
    attrEdit,
    eventEdit,
    imageLibs
  },
  data() {
    return {
      id: '', //当前页面id
      loading: false,
      activeSidebar: 'componentLists',
      activeAttrTab: '属性',
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
  },
  created() {
    this.$store.dispatch('initProjectData')
    this.id = this.$route.query.id
    this.initPageData()
  },
  computed: {
    ...mapState({
      projectData: state => state.editor.projectData
    })
  },
  methods: {
    initPageData() {
      this.loading = true
      this.$axios.get(`/page/detail/${this.id}`).then(res => {
        console.log(res)
        this.loading = false
        if (res.code === 200) {
          this.$store.dispatch('initProjectData', {
            ...res.body
          })
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 保存
    saveFn() {
      this.$axios.post('page/update/' + this.id, this.projectData).then((res) => {
        if (res.code === 200) {
          this.$message.success('保存成功！')
        }
      })
    },
    // 退出
    cancelFn() {
      this.$confirm('确认退出编辑吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/page-list')
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss">
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
    width: 400px;
    min-width: 400px;
    padding: 10px;
    .el-tabs {
      height: 100%;
      padding: 0 10px;
      .el-tabs__content {
        height: calc(100% - 55px);
      }
    }
    .el-tab-pane {
      // padding: 0 20px;
      height: 100%;
    }
  }
  .page-editor-main {
    background-color: #ddd;
    flex: 1;
    min-width: 500px;
    position: relative;
    .control-bar-wrapper {
      position: absolute;
      top: -44px;
      left: 0;
      z-index: 1000;
      width: 100%;
      height: 44px;
      text-align: center;
    }
  }
}
</style>