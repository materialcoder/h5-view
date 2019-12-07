<template>
  <preview-wrapper :pageId="pageId" @closePreview="closePreview">
    <p class="page-title">页面基础设置</p>
    <div class="preview-info-wrapper">
      <div class="page-info">
        <div class="page-cover"></div>
        <div class="page-desc">
          <div class="info-form-wrapper">
            <div class="info-form-l">标题：</div>
            <div class="info-form-r">
              <el-input v-model="pageData.title"></el-input>
            </div>
          </div>
          <div class="info-form-wrapper">
            <div class="info-form-l">描述：</div>
            <div class="info-form-r">
              <el-input type="textarea" :rows="2" v-model="pageData.description"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="info-form-wrapper mt40">
        <el-checkbox>设置微信分享样式</el-checkbox>
      </div>
      <div class="info-form-wrapper mt40">
        <div class="info-form-l">翻页方式：</div>
        <div class="info-form-r">
          <el-select v-model="pageData.flipType">
            <el-option :value="0" label="上下翻页"></el-option>
            <el-option :value="1" label="左右翻页"></el-option>
            <el-option :value="2" label="翻书效果"></el-option>
          </el-select>
        </div>
      </div>
      <div class="info-form-wrapper mt20">
        <div class="info-form-l"></div>
        <div class="info-form-r">
          <el-checkbox v-model="pageData.slideNumber">显示页码</el-checkbox>
        </div>
      </div>
      <div class="info-form-wrapper mt40">
        <div class="info-form-l">作品访问状态：</div>
        <div class="info-form-r">
          <el-select v-model="pageData.status">
            <el-option :value="1" label="允许访问"></el-option>
            <el-option :value="0" label="不允许访问"></el-option>
          </el-select>
        </div>
      </div>
      <div class="footer-btn-wrapper">
        <el-button type="primary" @click="publish">发布</el-button>
        <el-button @click="save">保存</el-button>
        <el-button @click="closePreview">取消</el-button>
      </div>
    </div>
  </preview-wrapper>
</template>

<script>
import previewWrapper from '@/components/preview-wrapper'
export default {
  props: {
    pageId: String,
    pageData: {
      type: Object,
      required: true
    }
  },
  components: {
    previewWrapper
  },
  methods: {
    closePreview() {
      this.$emit('closePreview')
    },
    publish() {
      this.$emit('publish')
    },
    save() {
      this.$emit('save')
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
      justify-content: space-between;
    }
  }
  .info-form-wrapper {
    display: flex;
    align-items: center;
    // justify-content: center;
    .info-form-l {
      width: 120px;
      text-align: center;
    }
    .info-form-r {
      flex: 1;
    }
  }
  .footer-btn-wrapper {
    position: absolute;
    bottom: 50px;
  }
</style>