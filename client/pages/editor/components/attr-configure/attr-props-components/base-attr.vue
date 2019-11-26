<template>
  <div>
    <div class="attr-title">基础样式</div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="尺寸与位置：" name="1">
        <div class="attr-edit-item-wrapper mb15">
          <p class="label">快捷定位：</p>
          <div class="position-attr-wrapper">
            <div class="align-item" v-for="item in alignTypeList" :key="item.type"
              @click="changeAlignType(item.type)"
            >
              <el-tooltip :content="item.title">
                <i :class="item.icon"></i>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">尺寸：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="activeElement.commonStyle.width" controls-position="right" :min="0"></el-input-number>
              <div class="attr-edit-input-des">宽度</div>
            </div>
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="activeElement.commonStyle.height" controls-position="right" :min="0"></el-input-number>
              <div class="attr-edit-input-des">高度</div>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper mb15">
          <p class="label">快捷resize：</p>
          <div class="position-attr-wrapper">
            <div class="align-item" v-for="item in resizeTypeList" :key="item.type"
              @click="changeResizeType(item.type)">
              <el-tooltip :content="item.title">
                <i :class="item.icon"></i>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">位置：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="activeElement.commonStyle.left" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">X</div>
            </div>
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="activeElement.commonStyle.top" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">Y</div>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">旋转：</p>
          <div class="attr-edit-input-wrapper">
            <el-slider v-model="activeElement.commonStyle.rotate" :max="180" :min="-180" :marks="{0: '', 90: '', '-90': ''}" show-input input-size="mini"></el-slider>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="边框边距：" name="2">
        <div class="attr-edit-item-wrapper">
          <p class="label">边框：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="activeElement.commonStyle.borderWidth" :min="0" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des mt7">尺寸</div>
            </div>
            <div class="attr-edit-input">
              <el-color-picker v-model="activeElement.commonStyle.borderColor" size="mini"></el-color-picker>
              <div class="attr-edit-input-des">颜色</div>
            </div>
            <div class="attr-edit-input mr0">
              <el-select v-model="activeElement.commonStyle.borderStyle" size="mini">
                <el-option v-for="item in borderStyleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <div class="attr-edit-input-des mt7">样式</div>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">边框圆弧：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="activeElement.commonStyle.borderRadius" :min="0" controls-position="right"></el-input-number>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">上下边距：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="activeElement.commonStyle.paddingTop" :min="0" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">上</div>
            </div>
          </div>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="activeElement.commonStyle.paddingBottom" :min="0" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">下</div>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">左右边距：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="activeElement.commonStyle.paddingLeft" :min="0" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">左</div>
            </div>
          </div>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="activeElement.commonStyle.paddingRight" :min="0" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">右</div>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="阴影样式：" name="3">
        <!-- box-shadow: offset-X offset-Y blur-radius spread-radius color -->
        <!-- offset-X 大于0 向左偏移 小于0 向右偏移  offset-Y 大于0向下偏移 小于0 向上偏移 -->
        <!-- blur-radius 模糊半径值越大，模糊面积越大，阴影就越大越淡。 不能为负值。默认为0，此时阴影边缘锐利。 -->
        <!-- spread-radius 扩展半径取正值时，阴影扩大；取负值时，阴影收缩。默认为0，此时阴影与元素同样大 -->
        <div class="attr-edit-item-wrapper">
          <p class="label">阴影位置：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="boxshadow.x" @change="changeBoxShadow" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">水平偏移量</div>
            </div>
          </div>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="boxshadow.y" @change="changeBoxShadow" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">垂直偏移量</div>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label"></p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="boxshadow.blur" @change="changeBoxShadow" :min="0" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">模糊半径</div>
            </div>
          </div>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="boxshadow.spread" @change="changeBoxShadow" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">扩展半径</div>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">颜色：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-color-picker v-model="boxshadow.color" @change="changeBoxShadow" size="mini"></el-color-picker>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="字体：" name="4">
        <div class="attr-edit-item-wrapper">
          <p class="label">字体大小：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="activeElement.commonStyle.fontSize" controls-position="right" :min="12"></el-input-number>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">字体粗细：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="activeElement.commonStyle.fontWeight" controls-position="right" :min="300"  :step="100"></el-input-number>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">行间距：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="activeElement.commonStyle.lineHeight" controls-position="right" :min="0" :step="0.1"></el-input-number>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">字间距：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="activeElement.commonStyle.letterSpacing" controls-position="right" :min="0" :step="0.1"></el-input-number>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper mb15">
          <p class="label">对齐方式：</p>
          <div class="position-attr-wrapper">
            <div class="align-item" v-for="item in textAlignTypeList" :key="item.type"
              @click="changeAlignType(item.type)"
            >
              <el-tooltip :content="item.title">
                <i :class="item.icon"></i>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">字体颜色：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-color-picker v-model="activeElement.commonStyle.color" size="mini"></el-color-picker>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="背景&&透明度：" name="5">
        <div class="attr-edit-item-wrapper">
          <p class="label">背景颜色：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-color-picker v-model="activeElement.commonStyle.backgroundColor" size="mini"></el-color-picker>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">背景图片：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <image-select :url.sync="activeElement.commonStyle.backgroundImage"></image-select>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">透明度：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="activeElement.commonStyle.opacity" controls-position="right" :min="0" :max="1" :step="0.1"></el-input-number>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import $config from '@client/config'
import imageSelect from '@client/components/image-select'
export default {
  name: 'baseAttr',
  components: {
    imageSelect
  },
  data() {
    return {
      activeNames: ['1'],
      alignTypeList: [
        {
          title: '左对齐',
          icon: 'iconfont iconzuoduiqi',
          type: 'l'
        },
        {
          title: '右对齐',
          icon: 'iconfont iconyouduiqi',
          type: 'r'
        },
        {
          title: '上对齐',
          icon: 'iconfont iconshangduiqi',
          type: 't'
        },
        {
          title: '下对齐',
          icon: 'iconfont iconxiaduiqi',
          type: 'b'
        },
        {
          title: '垂直居中对齐',
          icon: 'iconfont iconchuizhijuzhongduiqi',
          type: 'tb'
        },
        {
          title: '水平居中对齐',
          icon: 'iconfont iconshuipingjuzhongduiqi',
          type: 'lr'
        }
      ],
      resizeTypeList: [
        {
          title: '满屏',
          icon: 'iconfont iconquanping',
          type: 'mp'
        },
        {
          title: '宽100%',
          icon: 'iconfont iconwidth',
          type: 'w'
        },
        {
          title: '高100%',
          icon: 'iconfont iconheight',
          type: 'h'
        }
      ],
      borderStyleList: [
        {
          label: '实线',
          value:'solid'
        },
        {
          label: '虚线',
          value:'dashed'
        },
        {
          label: '点状',
          value:'dotted'
        },
        {
          label: '双线',
          value:'double'
        }
      ],
      textAlignTypeList: [
        {
          title: '左对齐',
          icon: 'iconfont iconzuoduiqi1',
          type: 'left'
        },
        {
          title: '居中对齐',
          icon: 'iconfont iconjuzhongduiqi',
          type: 'center'
        },
        {
          title: '右对齐',
          icon: 'iconfont iconyouduiqi1',
          type: 'right'
        }
      ],
      boxshadow: {
        x: 0,
        y: 0,
        blur: 0,
        spread: 0,
        color: '#000000'
      }
    }
  },
  mounted() {
    this.initElmentBoxShaow()
    this.activeNames = this.activeAttrEditorCollapse
  },
  watch: {
    activeElementUUID() {
      this.$nextTick(() => {
        this.initElmentBoxShaow()
      })
    },
    activeNames() {
      // 保存展开的页签状态
      this.$store.commit('updateAttrEditCollapse', this.activeNames)
    }
  },
  computed: {
    ...mapState({
      activeElementUUID: state => state.editor.activeElementUUID,
      activeAttrEditorCollapse: state => state.editor.activeAttrEditorCollapse
    }),
    ...mapGetters([
      'activeElement'
    ])
  },
  methods: {
    initElmentBoxShaow() {
      let boxshadow = this.activeElement.commonStyle.boxShadow
      let boxshadowConfig = {
        x: 0,
        y: 0,
        blur: 0,
        spread: 0,
        color: '#000000'
      }
      if (!boxshadow) {
        this.boxshadow = boxshadowConfig
        return
      }
      let str = boxshadow.split(' ')
      boxshadowConfig = {
        x: parseInt(str[0].replace('px', '')),
        y: parseInt(str[1].replace('px', '')),
        blur: parseInt(str[2].replace('px', '')),
        spread: parseInt(str[3].replace('px', '')),
        color: str[4]
      }
      this.boxshadow = boxshadowConfig
    },
    changeBoxShadow() {
      let style = `${this.boxshadow.x}px ${this.boxshadow.y}px ${this.boxshadow.blur}px ${this.boxshadow.spread}px ${this.boxshadow.color}`
      this.activeElement.commonStyle.boxShadow = style
    },
    changeAlignType(type) {
      let width = $config.canvasH5Width
      let height = $config.canvasH5Height
      let eleWidth = this.activeElement.commonStyle.width
      let eleHeight = this.activeElement.commonStyle.height
      switch(type) {
        case 'l':
          this.activeElement.commonStyle.left = 0
          break
        case 't':
          this.activeElement.commonStyle.top = 0
          break
        case 'r':
          this.activeElement.commonStyle.left = width - eleWidth
          break
        case 'b':
          this.activeElement.commonStyle.top = height - eleHeight
          break
        case 'tb':
          this.activeElement.commonStyle.left = (width - eleWidth) / 2
          break
        case 'lr':
          this.activeElement.commonStyle.top = (height - eleHeight) / 2
          break
        default:
          this.activeElement.commonStyle.textAlign = type
      }
    },
    changeResizeType(type) {
      let width = $config.canvasH5Width
      let height = $config.canvasH5Height
      switch(type) {
        case 'mp':
          this.activeElement.commonStyle.top = 0
          this.activeElement.commonStyle.left = 0
          this.activeElement.commonStyle.width = width
          this.activeElement.commonStyle.height = height
          break
        case 'w':
          this.activeElement.commonStyle.left = 0
          this.activeElement.commonStyle.width = width
          break
        case 'h':
          this.activeElement.commonStyle.top = 0
          this.activeElement.commonStyle.height = height
          break
      }
    }
  }
}
</script>

<style lang="scss">
  .attr-title {
    margin-bottom: 10px;
    text-align: left;
    font-weight: bold;
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
    .position-attr-wrapper {
      display: flex;
      .align-item {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 4px;
        background-color: #ccc;
        cursor: pointer;
        &:hover {
          background-color: #aaa;
        }
        .iconfont {
          font-size: 16px;
        }
      }
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
        width: 90px;
      }
      .el-input-number.is-controls-right .el-input__inner {
        width: 90px;
        padding-left: 10px;
        padding-right: 35px;
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