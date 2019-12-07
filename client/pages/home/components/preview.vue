<template>
  <preview-wrapper :pageId="pageId" @closePreview="closePreview">
    <p class="page-title">页面预览</p>
    <div class="preview-info-wrapper">
      <div class="info-form-wrapper mt40">
        <div class="info-form-l">页面二维码：</div>
        <div class="info-form-r">
          <QrcodeVue :value="pageLink" :size="120" level="H"></QrcodeVue>
        </div>
      </div>
      <div class="info-form-wrapper mt20">
        <div class="info-form-l">页面链接：</div>
        <div class="info-form-r">
          <el-button type="primary" @click="doCopy">复制链接</el-button>
        </div>
      </div>
      <div class="info-form-wrapper mt20">
        <div class="info-form-l"></div>
        <div class="info-form-r bg">
          <span class="plain-text">{{pageLink}}</span>
        </div>
      </div>
      <div class="info-form-wrapper mt20">
        <div class="info-form-l">页面状态：</div>
        <div class="info-form-r">
          <span class="plain-text" :class="[pageData.isPublish ? 'primary' : 'orange']">{{pageData.isPublish ? '已发布' : '未发布'}}</span>
        </div>
      </div>
      <div class="page-info bg mt20">
        <div class="page-cover"></div>
        <div class="page-desc">
          <div class="info-form-wrapper">
            <span class="plain-text">{{pageData.title}}</span>
          </div>
          <div class="info-form-wrapper">
            <span class="plain-text">{{pageData.description}}</span>
          </div>
        </div>
      </div>
      <div class="mt40 text-center">
        <a :href="pageLink" target="_blank">
          <el-button type="primary">新标签打开链接</el-button>
        </a>
      </div>
    </div>
  </preview-wrapper>
</template>

<script>
import previewWrapper from '@/components/preview-wrapper'
import QrcodeVue from 'qrcode.vue'
export default {
  props: {
    pageId: String
  },
  data() {
    return {
      loading: false,
      pageData: {}
    }
  },
  components: {
    previewWrapper,
    QrcodeVue
  },
  created() {
    this.getData()
  },
  computed: {
    pageLink() {
      return this.$config.baseURL + '/page/view/' + this.pageId
    }
  },
  methods: {
    closePreview() {
      this.$emit('closePreview')
    },
    getData() {
      this.loading = true
      this.$axios.get('/page/detail/' + this.pageId).then((res) => {
        this.loading= false
        this.pageData = res.body
      }).catch(() => {
        this.loading = false
      })
    },
    // 复制链接
    doCopy() {
      this.$copyText(this.pageLink).then(() => {
        this.$message.success('已复制')
      })
    }
  }
}
</script>

<style lang="scss">
  .page-title {
    height: 48px;
    line-height: 48px;
    font-size: 18px;
    font-weight: bold;
  }
  .page-info {
    display: flex;
    .page-cover {
      width: 120px;
      height: 120px;
      background-color: #ccc;
      margin-right: 20px;
    }
    .page-desc {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  .info-form-wrapper {
    display: flex;
    align-items: center;
    .info-form-l {
      width: 120px;
      text-align: center;
    }
    .info-form-r {
      flex: 1;
    }
  }
  .primary {
    color: #409EFF;
  }
  .orange {
    color: orange;
  }
  .bg {
    background-color: #409eff26
  }
  .plain-text {
    height: 48px;
    line-height: 48px;
  }
</style>