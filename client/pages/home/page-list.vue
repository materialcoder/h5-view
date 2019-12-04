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
      <div class="page-list-item">
        <div class="add-page-wrapper page-create" @click="createNewPage">
          <div class="add-page-inner">
            <div><i class="el-icon-plus"></i></div>
            <div class="add-page-title">创建{{getLabelText()}}</div>
          </div>
        </div>
        <div class="add-page-wrapper" v-for="item in pageList" :key="item._id">
          <div>
            <span v-if="!item.isPublish">未发布</span>
            <div>预览</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import editorConfig from '@/pages/editor/DataModel'
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
      },
      pageList: []
    }
  },
  created() {
    this.getPageList()
  },
  methods: {
    toggleSearch(type) {
      console.log(type)
      this.searchParams.type = type
    },
    handlePageModeClick() {
      console.log(this.searchParams)
    },
    createNewPage() {
      let newPageData = editorConfig.getProjectConfig()
      this.$axios.post('/page/add', {...newPageData}).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$router.push({path: '/editor', query: {id: res.body._id}})
        }
      })
      
    },
    getLabelText() {
      let pageMode = this.searchParams.pageMode
      let index = this.pageModeList.findIndex(item => item.value === pageMode)
      return this.pageModeList[index].label
    },
    // 获取当前用户所有页面
    getPageList() {
      this.$axios.get('/page/myPages', {type: this.searchParams.type}).then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.pageList = res.body
        }
      })
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
      .page-list-item {
        .add-page-wrapper {
          width: 240px;
          height: 300px;
          background: #fff;
          border-radius: 4px;
          transition: all .28s;
          float: left;
          margin-right: 50px;
          margin-bottom: 30px;
          &:hover {
            box-shadow: 0 0 16px 0 rgba(0,0,0,.16);
            transform: translate3d(0,-2px,0);
          }
          .add-page-inner {
            border: 1px solid #ddd;
            height: 100%;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            cursor: pointer;
            &:hover {
              border-color: #409EFF;
              color: #409EFF;
            }
          }
        }
        .page-create {
          padding: 26px;
        }
      }
    }
  }
</style>