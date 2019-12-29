<template>
  <div class="attr-component-wrapper">
    <el-scrollbar class="attr-component-wrapper">
      <div class="attr-edit-inner" v-if="activeElementUUID">
        <div class="animate-edit-btn-wrapper">
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addAnimate">添加动画</el-button>
          <el-button size="small" icon="el-icon-caret-right" @click="runAnimate(undefined)">预览动画</el-button>
        </div>
        <div class="animate-list-wrapper mt20" v-show="activeElement.animations.length > 0">
          <el-collapse accordion>
            <el-collapse-item v-for="(item, index) in activeElement.animations" :key="index">
              <template slot="title">
                <span class="animate-item-title">动画 {{index + 1}}</span>
                <div class="animate-item-type-wrapper">
                  <span class="animate-item-type" @click.stop.prevent="handleShowChooseAnimatePane(index)">
                    {{item.type}}
                    <i class="el-icon-caret-right size-mini"></i>
                  </span>
                </div>
                <span class="animate-item-btn">
                  <i class="el-icon-caret-right" @click.stop.prevent="runAnimate(index)"></i>
                </span>
                <span class="animate-item-btn">
                  <i class="el-icon-delete" @click.stop.prevent="handleDeleteAnimate(index)"></i>
                </span>
              </template>
              <div class="animate-item-options">
                <div class="attr-edit-item-wrapper">
                  <p class="label">动画时长：</p>
                  <div class="attr-edit-input-wrapper">
                   <div class="attr-edit-input">
                      <el-input-number size="mini" v-model="item.duration" controls-position="right" :min="0" :step="0.1"></el-input-number>
                   </div>
                  </div>
                </div>
                <div class="attr-edit-item-wrapper">
                  <p class="label">动画延时：</p>
                  <div class="attr-edit-input-wrapper">
                    <div class="attr-edit-input">
                      <el-input-number size="mini" v-model="item.delay" controls-position="right" :min="0" :step="0.1"></el-input-number>
                    </div>
                  </div>
                </div>
                <div class="attr-edit-item-wrapper">
                  <p class="label">循环次数：</p>
                  <div class="attr-edit-input-wrapper">
                    <div class="attr-edit-input">
                      <el-input-number size="mini" v-model="item.iterationCount" controls-position="right"></el-input-number>
                      <div class="attr-edit-input-des">次数</div>
                    </div>
                    <div class="attr-edit-input">
                      <el-checkbox size="small" v-model="item.infinite" label="infinite" border>循环播放</el-checkbox>
                    </div>
                  </div>
                </div>
              </div>
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
import BUS from '@/eventBus'
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
    // 添加动画
    addAnimate(showAnimatePane = true) {
      this.showAnimatePane = showAnimatePane
      this.reSelectAnimateIndex = undefined
    },
    // 重新设置动画
    handleShowChooseAnimatePane(index) {
      this.showAnimatePane = true
      this.reSelectAnimateIndex = index
    },
    // 选择动画
    handleChooseAnimate(item) {
      this.showAnimatePane = false
      if (this.reSelectAnimateIndex === undefined) {
        this.$store.dispatch('addElementAnimate', item.value)
      } else {
        this.activeElement.animations[this.reSelectAnimateIndex].type = item.value
      }
    },
    // 删除动画
    handleDeleteAnimate(index) {
      console.log(index)
      this.$store.dispatch('deleteElementAnimate', index)
    },
    // 预览动画
    runAnimate(index) {
      console.log(index)
      let animations = index === undefined ? this.activeElement.animations : [this.activeElement.animations[index]]
      BUS.$emit('RUN_ANIMATIONS', this.activeElement.uuid, animations)
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
  .animate-list-wrapper {
    .animate-item-title {
      font-size: 16px;
      font-weight: bold;
    }
    .animate-item-type-wrapper {
      width: 200px;
      text-align: center;
      .animate-item-type {
        padding: 0 12px;
        height: 24px;
        line-height: 24px;
        display: inline-block;
        border-radius: 12px;
        &:hover {
          background: #409fee;
          color: #fff;
        }
      }
    }
    .animate-item-btn i {
      width: 24px;
      height: 24px;
      line-height: 24px;
      background: #ddd;
      text-align: center;
      margin: 0 10px;
      &:hover {
        background: #ccc;
      }
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
  .attr-edit-item-wrapper {
    display: flex;
    &.mb15 {
      margin-bottom: 15px;
    }
    .label {
      width: 82px;
      text-align: right;
      height: 38px;
      line-height: 38px;
    }
    .attr-edit-input-wrapper {
      display: flex;
      .attr-edit-input {
        margin: 4px 8px 4px 4px;
        .attr-edit-input-des {
          color: #999;
        }
      }
      .el-select .el-input .el-input__inner {
        width: 90px;
      }
      .attr-edit-input .is-controls-right {
        width: 89px;
      }
      .el-input-number.is-controls-right .el-input__inner {
        width: 90px;
        padding-left: 10px;
        padding-right: 35px;
      }
      .el-checkbox--small {
        height: 28px;
      }
      .el-slider__button {
        width: 12px;
        height: 12px;
      }
      .el-slider__input {
        width: 95px;
      }
      .el-slider__runway.show-input {
        margin-right: 100px;
        width: 120px;
      }
    }
  }
</style>