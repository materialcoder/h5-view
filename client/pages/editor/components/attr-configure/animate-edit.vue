<template>
  <div class="attr-component-wrapper">
    <el-scrollbar class="attr-component-wrapper">
      <div class="attr-edit-inner" v-if="activeElementUUID">
        <div class="animate-edit-btn-wrapper">
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addAnimate">添加动画</el-button>
          <el-button size="small" icon="el-icon-caret-right">预览动画</el-button>
        </div>
        <div class="animate-list-wrapper mt20" v-show="activeElement.animations.length > 0">
          <el-collapse accordion>
            <el-collapse-item v-for="(item, index) in activeElement.animations" :key="index">
              <template slot="title">
                <span class="animate-item-title">动画 {{index + 1}}</span>
                <div class="animate-item-type-wrapper">
                  <span class="animate-item-type">
                    {{item.type}}
                    <i class="el-icon-caret-right size-mini"></i>
                  </span>
                </div>
                <span class="animate-item-btn">
                  <i class="el-icon-caret-"></i>
                </span>
                <span class="animate-item-btn">
                  <i class="el-icon-delete"></i>
                </span>
              </template>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div v-else>请在画板中选中要编辑的元素</div>
    </el-scrollbar>
    <div class="attr-component-wrapper animate-choose-list-wrapper"
      :class="{fadeInUp: showAnimatePane, fadeInDown: !showAnimatePane, animate: showAnimatePane}"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="item in animateCssDatas" :key="item.label" :label="item.label" :name="item.label">
          <el-scrollbar class="animate-choose-item">
            <div class="animate-choose-item-inner"
              v-for="(animate, index) in item.children"
              :key="index"
              @mouseover="hoverPreviewAnimate = animate.value"
              @mouseleave="hoverPreviewAnimate = ''"
              @click="handleChooseAnimate(animate)"
            >
              <span class="animate-choose-image" :class="[hoverPreviewAnimate === animate.value && animate.value + ' animated']"></span>
              <p>{{animate.label}}</p>
            </div>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import animateCssData from '@/common/animateCssData'
import {mapState, mapGetters} from 'vuex'
export default {
  data() {
    return {
      activeName: '进入',
      animateCssDatas: animateCssData,
      showAnimatePane: false,
      hoverPreviewAnimate: '',
      reSelectAnimateIndex: undefined  // 重新设置动画
    }
  },
  watch: {
    activeElementUUID() {
      this.addAnimate(false)
    }
  },
  computed: {
    ...mapState({
      activeElementUUID: state => state.editor.activeElementUUID
    }),
    ...mapGetters([
      'activeElement'
    ])
  },
  methods: {
    addAnimate(showAnimatePane = true) {
      this.showAnimatePane = showAnimatePane

    },
    handleChooseAnimate(item) {
      this.showAnimatePane = false
      if (this.reSelectAnimateIndex === undefined) {
        this.$store.dispatch('addElementAnimate', item.value)
      } else {
        this.activeElement.animations[this.reSelectAnimateIndex].type = item.value
      }
    }
  }
}
</script>

<style lang="scss">
  .attr-component-wrapper {
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  .animate-choose-list-wrapper {
    position: fixed;
    top: 0px;
    right: 0;
    width: 400px;
    padding: 10px;
    background: #fff;
    z-index: 100;
    transition: all 0.28s;
    // display: none;
    &.fadeInUp {
      top: 50px;
      opacity: 1;
    }
    &.fadeInDown {
      top: 110%;
      opacity: 0;
    }
  }
  .animate-choose-item {
    height: 100%;
    .animate-choose-item-inner {
      display: inline-block;
      width: 25%;
      height: 72px;
      text-align: center;
      font-size: 12px;
      cursor: pointer;
      & > .animate-choose-image {
        display: inline-block;
        width: 40px;
        height: 40px;
        margin-bottom: 6px;
        background-image: url(../../../../common/images/use-beb469.png)
      }
    }
  }
</style>