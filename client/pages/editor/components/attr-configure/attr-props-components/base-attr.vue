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
              <el-input-number size="mini" v-model="activeWidth" controls-position="right" :min="0"></el-input-number>
              <div class="attr-edit-input-des">宽度</div>
            </div>
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="activeHeight" controls-position="right" :min="0"></el-input-number>
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
              <el-input-number size="mini" v-model="activeLeft" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">X</div>
            </div>
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="activeTop" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">Y</div>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">旋转：</p>
          <div class="attr-edit-input-wrapper">
            <el-slider v-model="value" :max="180" :min="-180" :marks="{0: '', 90: '', '-90': ''}" show-input input-size="mini"></el-slider>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="边框边距：" name="2">
        <div class="attr-edit-item-wrapper">
          <p class="label">边框：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="borderWidth" :min="0" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des mt7">尺寸</div>
            </div>
            <div class="attr-edit-input">
              <el-color-picker v-model="borderColor" size="mini"></el-color-picker>
              <div class="attr-edit-input-des">颜色</div>
            </div>
            <div class="attr-edit-input mr0">
              <el-select v-model="borderStyle" size="mini">
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
              <el-input-number size="mini" v-model="borderWidth" :min="0" controls-position="right"></el-input-number>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">上下边距：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="borderWidth" :min="0" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">上</div>
            </div>
          </div>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="borderWidth" :min="0" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">下</div>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">左右边距：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="borderWidth" :min="0" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">左</div>
            </div>
          </div>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="borderWidth" :min="0" controls-position="right"></el-input-number>
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
              <el-input-number size="mini" v-model="borderWidth" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">水平偏移量</div>
            </div>
          </div>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="borderWidth" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">垂直偏移量</div>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label"></p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="borderWidth" :min="0" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">模糊半径</div>
            </div>
          </div>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="borderWidth" controls-position="right"></el-input-number>
              <div class="attr-edit-input-des">扩展半径</div>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">颜色：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-color-picker v-model="borderColor" size="mini"></el-color-picker>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="字体：" name="4">
        <div class="attr-edit-item-wrapper">
          <p class="label">字体大小：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="fontSize" controls-position="right" :min="0"></el-input-number>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">字体粗细：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="fontWeight" controls-position="right" :min="0"></el-input-number>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">行间距：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="lineHeight" controls-position="right" :min="0"></el-input-number>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">字间距：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="letterSpacing" controls-position="right" :min="0"></el-input-number>
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
              <el-color-picker v-model="textColor" size="mini"></el-color-picker>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="背景&&透明度：" name="5">
        <div class="attr-edit-item-wrapper">
          <p class="label">背景颜色：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-color-picker v-model="backgroundColor" size="mini"></el-color-picker>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">背景图片：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-color-picker v-model="backgroundImage" size="mini"></el-color-picker>
            </div>
          </div>
        </div>
        <div class="attr-edit-item-wrapper">
          <p class="label">透明度：</p>
          <div class="attr-edit-input-wrapper">
            <div class="attr-edit-input">
              <el-input-number size="mini" v-model="opacity" controls-position="right" :min="0" :max="1" :step="0.1"></el-input-number>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'baseAttr',
  data() {
    return {
      activeWidth: 0,
      activeHeight: 0,
      activeLeft: 0,
      activeTop: 200,
      borderWidth: 0,
      borderColor: '',
      borderStyle: '',
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: 0,
      textColor: '',
      backgroundColor: '',
      backgroundImage: '',
      opacity: 1,
      value: 0,
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
      ]
    }
  },
  methods: {
    changeAlignType(type) {
      console.log(type)
    },
    changeResizeType(type) {
      console.log(type)
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