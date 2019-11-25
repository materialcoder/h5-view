<template>
  <div class="edit-panel" @click="handleClickCanvas">
    <div class="edit-main" :style="{width: projectData.width + 'px', height: projectData.height + 'px'}">
      <div class="preview-page-wrapper" :style="getCommonStyle(activePage.commonStyle)">
        <!-- 页面组件列表展示 -->
        <edit-shape
          v-for="item in activePage.elements"
          :key="item.uuid"
          :defaultStyle="item.commonStyle"
          :style="getCommonStyle(item.commonStyle)"
          :active="item.uuid === activeElementUUID"
          @handleElementClick="handleElementClick(item.uuid)"
          @resize="handleElementResize"
        >
          <component :is="item.elName" class="element-on-edit-panel" v-bind="{...item.propsValue, value: item.value}"></component>
        </edit-shape>
      </div>
      <div class="page-wrapper-operation-menu">
        <el-tooltips v-for="(item, index) in menuOperations" :key="index" effect="dark" :content="item.title">
          <i :class="item.icon"></i>
        </el-tooltips>
      </div>
      <div class="page-wrapper-mask"></div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import editorProjectConfig from '@client/pages/editor/DataModel'
import editShape from '@client/components/edit-shape'
import {regist_components_obj} from '@client/plugins/index'
export default {
  data() {
    return {
      getCommonStyle: editorProjectConfig.getCommonStyle,
      menuOperations: [
        {
          title: '复制',
          icon: '',
          value: 'copy'
        },
        {
          title: '删除',
          icon: '',
          value: 'delete'
        },
        {
          title: '字体放大',
          icon: '',
          value: 'fontA+'
        },
        {
          title: '字体缩小',
          icon: '',
          value: 'fontA-'
        },
        {
          title: '字体加粗',
          icon: '',
          value: 'fontB'
        },
        {
          title: '图层上移',
          icon: '',
          value: 'layerUp'
        },
        {
          title: '图层下移',
          icon: '',
          value: 'layerDown'
        },
        {
          title: '图层置顶',
          icon: '',
          value: 'layerTop'
        },
        {
          title: '图层置底',
          icon: '',
          value: 'layerBottom'
        }
      ]
    }
  },
  components: {
    ...regist_components_obj,
    editShape
  },
  mounted() {
    console.log(this.projectData)
    console.log(this.activePage)
  },
  computed: {
    ...mapState({
      projectData: state => state.editor.projectData,
      activeElementUUID: state => state.editor.activeElementUUID
    }),
    ...mapGetters([
      'activePage',
      'currentPageIndex',
      'currentElementIndex'
    ])
  },
  methods: {
    handleElementClick(uuid) {
      this.$store.dispatch('setActiveElementUUID', uuid)
    },
    /**
     * 监听元素位置、大小变化事件，同步更新projectData数据
     * 当一次移动结束后，pos为undefined，记录一次历史操作
     */
    handleElementResize(pos) {
      if (!pos) {
        // todo
        // 记录一次历史操作
        return
      }
      // 下面这句其实没什么左右，已经自动更新了
      this.projectData.pages[this.currentPageIndex].elements[this.currentElementIndex].commonStyle = {...pos}
    },
    // 点击画布
    handleClickCanvas(e) {
      if (!e.target.classList.contains('element-on-edit-panel')) {
        this.$store.dispatch('setActiveElementUUID', '')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit-panel {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    .edit-main {
      background-color: #fff;
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==");
      margin: 30px auto;
      position: relative;
      .preview-page-wrapper {
        height: 100%;
        position: relative;
        .element-on-edit-panel {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
      .page-wrapper-mask {
        height: 100%;
        width: 100%;
        z-index: 1000;
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: none;
        outline: rgba(236, 238, 240, 0.77) solid 10000px;
      }
    }
  }
</style>