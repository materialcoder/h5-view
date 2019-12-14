<template>
  <el-scrollbar class="attr-edit-wrapper">
    <p class="page-title">当前页样式</p>
    <div class="attr-edit-inner">
      <div class="attr-edit-item-wrapper">
        <p>背景颜色：</p>
        <div class="attr-edit-item">
          <el-color-picker size="mini" :show-alpha="true" v-model="activePage.commonStyle.backgroundColor"></el-color-picker>
        </div>
      </div>
      <div class="attr-edit-item-wrapper">
        <p>背景图片：</p>
        <div class="attr-edit-item">
          <image-select :url.sync="activePage.commonStyle.backgroundImage"></image-select>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import imageSelect from '@/components/image-select'
import {mapState, mapGetters} from 'vuex'
export default {
  components: {
    imageSelect
  },
  computed: {
    ...mapState({
      projectData: state => state.editor.projectData
    }),
    ...mapGetters([
      'activePage'
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