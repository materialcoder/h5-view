<template>
  <div class="page-list-wrapper">
    <div class="page-list-tab">
      <el-tabs v-model="searchParams.pageMode" @tab-click="handlePageModeClick">
        <el-tab-pane
          v-for="item in pageModeList"
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
        <div
          class="nav-item"
          @click="toggleSearch('my')"
          :class="{ active: searchParams.type === 'my' }"
        >
          我的作品({{ myCount }})
        </div>
        <div
          class="nav-item"
          @click="toggleSearch('share')"
          :class="{ active: searchParams.type === 'share' }"
        >
          参与作品({{ shareCount }})
        </div>
      </div>
      <div class="page-list-item" v-loading="loading">
        <div class="add-page-wrapper page-create" @click="createNewPage">
          <div class="add-page-inner">
            <div><i class="el-icon-plus"></i></div>
            <div class="add-page-title">创建{{ getLabelText() }}</div>
          </div>
        </div>
        <div
          class="add-page-wrapper"
          v-for="(item, index) in pageList"
          :key="item._id"
        >
          <span class="unpublish" v-if="!item.isPublish">未发布</span>
          <div class="cover">
            <img
              :src="
                item.coverImage ||
                  require('@client/common/images/default-cover.jpg')
              "
              alt=""
            />
          </div>
          <div class="header-mask">
            <div class="preview-btn" @click="previewPage(item._id)">预览</div>
          </div>
          <div class="item-title">
            <span>{{ item.title }}</span>
          </div>
          <div class="item-btns">
            <div class="control-btn">
              <el-button type="text" size="mini" @click="editPage(item._id)"
                >编辑</el-button
              >
            </div>
            <div class="control-btn">
              <el-button type="text" size="mini">复制</el-button>
            </div>
            <div class="control-btn">
              <el-dropdown placement="top-start">
                <span>
                  <el-button type="text" size="mini"
                    >更多 <i class="el-icon-more-outline"></i
                  ></el-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <div>发布</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div>复制为模板</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div>页面数据</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div>添加成员</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="deletePage(item._id, index)">删除</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div>移除我的参与</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
    <preview-page
      v-if="showPreview"
      :pageId="previewId"
      @closePreview="showPreview = false"
    ></preview-page>
  </div>
</template>

<script>
import editorConfig from '@/pages/editor/DataModel'
import previewPage from './components/preview'
export default {
  data() {
    return {
      loading: false,
      showPreview: false,
      previewId: '',
      myCount: 0,
      shareCount: 0,
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
  components: {
    previewPage
  },
  created() {
    this.getPageList()
    this.getPagesCount()
  },
  methods: {
    toggleSearch(type) {
      console.log(type)
      this.searchParams.type = type
      this.getPageList()
    },
    handlePageModeClick() {
      console.log(this.searchParams)
      this.getPageList()
      this.getPagesCount()
    },
    // 创建页面
    createNewPage() {
      let newPageData = editorConfig.getProjectConfig()
      this.$axios.post('/page/add', { ...newPageData }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$router.push({ path: '/editor', query: { id: res.body._id } })
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
      this.$axios.get('/page/myPages', this.searchParams).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.pageList = res.body
        }
      })
    },
    // 获取页面数量
    getPagesCount() {
      this.$axios.get('/page/myPages/count', this.searchParams).then(res => {
        console.log(res)
        this.myCount = res.body.my
        this.shareCount = res.body.share
      })
    },
    // 编辑
    editPage(id) {
      this.$router.push({ path: '/editor', query: { id: id } })
    },
    // 预览
    previewPage(id) {
      this.previewId = id
      this.showPreview = true
    },
    /**
     * 删除页面
     */
    deletePage(id, index) {
      this.$confirm('此操作将永久删除该页面，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$axios
          .delete('/page/delete/' + id)
          .then(res => {
            this.loading = false
            if (res.code === 200) {
              this.$message.success('删除成功')
              // 从页面删除
              this.pageList.splice(index, 1)
              this.getPagesCount()
            } else {
              this.$message.error('删除失败')
            }
          })
          .catch(() => {
            this.loading = false
          })
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
          color: #409eff;
        }
      }
    }
    .page-list-item {
      .add-page-wrapper {
        position: relative;
        width: 240px;
        height: 300px;
        background: #fff;
        border-radius: 4px;
        transition: all 0.28s;
        float: left;
        margin-right: 50px;
        margin-bottom: 30px;
        &:hover {
          box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.16);
          transform: translate3d(0, -2px, 0);
          .header-mask {
            background-color: rgba(0, 0, 0, 0.6);
          }
          .preview-btn {
            opacity: 1;
          }
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
            border-color: #409eff;
            color: #409eff;
          }
        }
      }
      .page-create {
        padding: 26px;
      }
      .unpublish {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        width: 60px;
        height: 32px;
        line-height: 32px;
        color: #fff;
        text-align: center;
        background: #aaa;
        border-radius: 4px 0 10px;
      }
      .header-mask {
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 236px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #ccc;
        border-radius: 4px 4px 0 0;
        background-color: transparent;
        .preview-btn {
          opacity: 0;
          width: 120px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 20px;
          color: #fff;
          border: 2px solid #fff;
          border-radius: 24px;
          cursor: pointer;
        }
      }
      .cover {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 240px;
        height: 235px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .item-title {
        margin-top: 236px;
        height: 32px;
        line-height: 32px;
        padding: 0 10px;
        border-bottom: 1px solid #ccc;
      }
      .item-btns {
        height: 32px;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
}
</style>
