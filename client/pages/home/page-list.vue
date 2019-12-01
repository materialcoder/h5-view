<template>
  <div class="page-list-wrapper">
    <div class="page-list-tab">
      <el-tabs v-model="searchParams.pageMode" @tab-click="handlePageModeClick">
        <el-tab-pane v-for="item in pageModeList"
          :key="item.value"
          :label="item.label"
          :name="item.value"
          :disabled="item.disabled"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="page-list-content">
      <div class="page-list-nav">
        <div class="nav-item" @click="toggleSearch('my')" :class="{active: searchParams.type === 'my'}">我的作品</div>
        <div class="nav-item" @click="toggleSearch('share')" :class="{active: searchParams.type === 'share'}">参与作品</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'h5',
      pageModeList: [
        {
          value: 'h5',
          label: 'H5',
          disabled: false
        },
        {
          value: 'longh5',
          label: '长页H5',
          disabled: false
        },
        {
          value: 'pc',
          label: 'PC页面',
          disabled: true
        }
      ],
      searchParams: {
        pageMode: 'h5',
        type: 'my'
      }
    }
  },
  methods: {
    toggleSearch(type) {
      console.log(type)
    },
    handlePageModeClick() {
      console.log(this.searchParams)
    }
  }
}
</script>

<style lang="scss">
  .page-list-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    .el-tabs__nav-wrap {
      padding: 0 20px;
      .el-tabs__item {
        height: 48px;
        line-height: 48px;
        font-size: 16px;
      }
    }
    .el-tabs__header {
      margin-bottom: 0px;
    }
    .page-list-content {
      flex: 1;
      padding-left: 20px;
      padding-right: 20px;
      background-color: #eee;
      .page-list-nav {
        display: flex;
        .nav-item {
          height: 60px;
          line-height: 60px;
          margin: 0 20px;
          cursor: pointer;
          &.active {
            color: #409EFF;
          }
        }
      }
    }
  }
</style>