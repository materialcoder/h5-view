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
        margin: 4px 15px 4px 4px;
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