<template>
  <div class="page-manage-wrapper">
    <p class="page-title text-center">页面管理</p>
    <el-scrollbar style="height:100%">
      <div class="page-item"
        v-for="(item, index) in projectData.pages"
        :key="index"
        @click="changeActivePage(item)"
        :class="{active: activePageUUID === item.uuid}"
      >
        <div class="page-item-text">
          <span class="page-item-index">{{index + 1}}</span>
          第{{index + 1}}页
        </div>
        <div class="page-item-btns">
          <el-dropdown>
            <span class="el-dropdown-link"><i class="el-icon-more-outline"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div class="btn-item" @click="copyPage(item)"><i class="el-icon-document-copy"></i> 复制页面</div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div class="btn-item" @click="addPage(item)"><i class="el-icon-document-add"></i> 新增页面</div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div class="btn-item" @click="deletePage(item)"><i class="el-icon-delete"></i> 删除页面</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-scrollbar>
    <div class="button-bottom">
      <el-button type="primary" size="small" @click="addPage">新增空白页面</el-button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'page-manage',
  computed: {
    ...mapState({
      projectData: state => state.editor.projectData,
      activePageUUID: state => state.editor.activePageUUID
    })
  },
  methods: {
    changeActivePage(item) {
      this.$store.dispatch('setActivePageUUID', item.uuid)
    },
    copyPage(item) {
      this.$store.dispatch('copyPage', item.uuid)
    },
    addPage(item) {
      this.$store.dispatch('addPage', item ? item.uuid : '')
    },
    deletePage(item) {
      this.$store.dispatch('deletePage', item.uuid)
    }
  }
}
</script>

<style lang="scss">
  .page-manage-wrapper {
    .page-item {
      display: flex;
      align-items: center;
      height: 60px;
      justify-content: space-between;
      cursor: pointer;
      .page-item-text {
        font-size: 18px;
        .page-item-index {
          width: 30px;
          height: 30px;
          background: #ddd;
          display: inline-block;
          border-radius: 50%;
          color: #fff;
          text-align: center;
          line-height: 30px;
          margin: 10px;
        }
      }
      &.active {
        background: #ddd;
        .page-item-index {
          background: #409fee;
        }
      }
      .page-item-btns {
        margin-right: 30px;
      }
    }
    .button-bottom {
      text-align: center;
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>