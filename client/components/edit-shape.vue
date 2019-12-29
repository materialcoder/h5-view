<template>
  <div class="components-edit-shape"
    :class="{active: this.active}"
    @mousedown="handleMouseDownOnElement"
    @click="handleTopWrapperClick"
  >
    <div class="components-resize-point"
      v-for="item in (active ? pointList : [])"
      :key="item"
      :style="getPointStyle(item)"
      @mousedown="handleMouseDownOnPoint(item)"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
import BUS from '@/eventBus'
import runAnimations from '@/common/js/runAnimations'
export default {
  name: 'EditShape',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    uuid: String,
    defaultStyle: {
      require: true,
      type: Object
    }
  },
  data() {
    return {
      // l-left t-top r-right b-bottom
      pointList: ['lt', 'rt', 'lb', 'rb', 'l', 'r', 't', 'b'],
      // 上下左右 对应 东南西北
      directionKey: {
        't': 'n',
        'b': 's',
        'l': 'w',
        'r': 'e'
      },
      animatePlaying: false
    }
  },
  mounted() {
    this.animatePlaying = false
    BUS.$on('RUN_ANIMATIONS', (uuid, animations) => {
      if (uuid !== this.uuid) return
      if (this.animatePlaying) return
      this.animatePlaying = true
      let cssText = this.$el.style.cssText
      runAnimations(this.$el, animations, false, () => {
        this.animatePlaying = false
        // 将样式重置回去
        this.$el.style.cssText = cssText
      })
    })
  },
  methods: {
    /**
     * 获取point计算后的样式
     * @param point 点位置
     */
    getPointStyle(point) {
      const pos = this.defaultStyle
      const height = pos.height
      const width = pos.width
      let hasT = /t/.test(point)
      let hasB = /b/.test(point)
      let hasL = /l/.test(point)
      let hasR = /r/.test(point)
      let newLeft = 0
      let newTop = 0
      if (point.length === 2) {
        // 四个角的点
        newLeft = hasL ? 0 : width
        newTop = hasT ? 0 : height
      } else {
        // 上下点固定在宽度中间
        if (hasT || hasB) {
          newLeft = width / 2
          newTop = hasT ? 0 : height
        }
        // 左右点固定在高度中间
        if (hasL || hasR) {
          newLeft = hasL ? 0 : width
          newTop = height / 2
        }
      }
      const style = {
        marginLeft: '-5px',
        marginTop: '-5px',
        left: `${newLeft > 0 ? newLeft : 0}px`,
        top: `${newTop > 0 ? newTop : 0}px`,
        cursor: point.split('').reverse().map(m => this.directionKey[m]).join('') + '-resize'
      }
      return style
    },
    handleTopWrapperClick(e) {
      e.stopPropagation()
      e.preventDefault()
    },
    /**
     * 鼠标选中拖拽元素
     */
    handleMouseDownOnElement(e) {
      // 抛出事件通知父组件更改选中元素组件
      this.$emit('handleElementClick')
      const pos = this.defaultStyle
      let startX = e.clientX
      let startY = e.clientY
      let startLeft = pos.left
      let startTop = pos.top
      let firstTime = '', lastTime = ''
      firstTime = new Date().getTime()
      let move = (moveEvent) => {
        moveEvent.stopPropagation()
        moveEvent.preventDefault()
        let curX = moveEvent.clientX
        let curY = moveEvent.clientY
        pos.top = curY - startY + startTop
        pos.left = curX - startX + startLeft
        this.$emit('resize', pos)
      }
      let up = () => {
        lastTime = new Date().getTime()
        if (lastTime - firstTime > 200) {
          this.$emit('resize')
        }
        document.removeEventListener('mousemove', move, true)
        document.removeEventListener('mouseup', up, true)
      }
      document.addEventListener('mousemove', move, true)
      document.addEventListener('mouseup', up, true)
      return true
    },
    /**
     * 鼠标选中缩放元素
     */
    handleMouseDownOnPoint(point) {
      this.$emit('handleElementClick')
      event.stopPropagation()
      event.preventDefault()
      const pos = this.defaultStyle
      // 初始位置
      let height = pos.height
      let width = pos.width
      let top = pos.top
      let left = pos.left
      // 鼠标点击位置
      let startX = event.clientX
      let startY = event.clientY

      let move = (moveEvent) => {
        // 移动到的位置
        let curX = moveEvent.clientX
        let curY = moveEvent.clientY
        // 移动距离
        let disX = curX - startX
        let disY = curY - startY
        // 判断点击的是哪个点
        let hasT = /t/.test(point)
        let hasB = /b/.test(point)
        let hasL = /l/.test(point)
        let hasR = /r/.test(point)

        // 计算新的高度 向下移clientY增大
        let newHeight = +height + (hasT ? -disY : (hasB ? disY : 0))
        // 计算新宽度 向右移clientX增大
        let newWidth = +width + (hasL ? -disX : (hasR ? disX : 0))

        pos.width = newWidth > 0 ? newWidth : 0
        pos.height = newWidth > 0 ? newHeight : 0
        pos.left = +left + (hasL ? disX : 0)
        pos.top = +top + (hasT ? disY : 0)
        this.$emit('resize', pos)
      }

      let up = () => {
        // 发送事件，记录历史操作
        this.$emit('resize')
        document.removeEventListener('mousemove', move, true)
        document.removeEventListener('mouseup', up, true)
      }

      document.addEventListener('mousemove', move, true)
      document.addEventListener('mouseup', up, true)
    }
  }
}
</script>

<style lang="scss" scoped>
  .components-edit-shape {
    cursor: move;
    &.active {
      outline: 1px dashed #409EFF;
    }
    &:hover {
      outline: 1px dashed #409EFF;
    }
  }
  .components-resize-point {
    width: 10px;
    height: 10px;
    background-color: #fff;
    border: 1px solid #409EFF;
    border-radius: 10px;
    position: absolute;
    z-index: 1001;
  }
</style>