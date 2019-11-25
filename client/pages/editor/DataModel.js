import $config from '@client/config'
import {cloneDeep, merge} from 'lodash'
import {createUUID, deepClone} from '../../../common/utils'


// 元素配置信息字段
let elementConfig = {
  elName: '', // 组件名
  animation: [], // 动画集合
  commonStyle: {
    position: 'absolute',
    width: $config.canvasH5Width,
    height: 30,
    top: 200,
    left: 0,
    rotate: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    borderWidth: 0,
    borderColor: '#000000',
    borderStyle: 'solid',
    borderRadius: 0,
    boxShadow: '',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#000000',
    backgroundColor: '',
    backgroundImage: '',
    backgroundSize: 'cover',
    opacity: 1,
    zIndex: 1
  }, // 公共样式
  events: [], // 公共事件
  propsValue: {}, // 属性参数
  value: '', // 绑定值
  valueType: 'String' // 值类型，默认字符串
}

// 页面配置信息
let pageConfig = {
  name: '',
  elements: [],
  commonStyle: {
    backgroundColor: '',
    backgroundImage: '',
    backgroundSize: 'cover'
  },
  config: {}
}

// 项目配置信息
let projectConfig = {
  name: '',
  title: '未命名',
  description: '请输入描述信息',
  coverImage: '',
  author: '',
  script: '',
  width: $config.canvasH5Width,
  height: $config.canvasH5Height,
  pages: []
}

/**
 * 获取组件元素配置
 * @param {传入的组件} element
 * @param {扩展样式} extendStyle 
 */
let getElementConfig = (element, extendStyle = {}) => {
  let elementData = cloneDeep(element)
  let type = elementData.type || 'String' // 默认String类型
  let dict = {
    'String': '',
    'Array': [],
    'Object': {},
    'Boolean': false,
    'Number': 0
  }
  let elementConfigData = cloneDeep(elementConfig)
  let config = {
    uuid: createUUID(),
    ...elementConfigData,
    elName: elementData.elName,
    propsValue: deepClone(elementData.needProps || {})
  }
  // 样式
  config.commonStyle = merge(config.commonStyle, elementData.defaultStyle)
  config.commonStyle = merge(config.commonStyle, extendStyle)

  config.value = element.defaultValue || dict[type]
  config.valueType = type
  config.isForm = !!Element.isForm // 是否是表单组件
  return config
}

/**
 * 获取页面配置信息
 */
let getPageConfig = () => {
  return {
    uuid: createUUID(),
    ...cloneDeep(pageConfig)
  }
}

/**
 * 获取项目初始配置
 */
let getProjectConfig = () => {
  let project = cloneDeep(projectConfig)
  let onePage = getPageConfig()
  project.pages.push({
    ...onePage
  })
  return { ...project }
}

/**
 * 获取元素样式
 * @param {Object} styleObj 
 * @param {Number} scalingRatio 缩放比例 
 */
let getCommonStyle = (styleObj, scalingRatio = 1) => {
  // 需要单位的属性
  let needUnitAttr = ['width', 'height', 'top', 'left', 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom', 'marginTop', 'marginLeft', 'marginRight', 'marginBottom', 'borderWidth', 'fontSize', 'borderRadius', 'letterSpacing']
  let style = {}
  for (let key in styleObj) {
    if (needUnitAttr.includes(key)) {
      style[key] = (styleObj[key] * scalingRatio) + 'px'
    } else {
      style[key] = styleObj[key]
    }
  }
  style.transform = `rotate(${style.rotate}deg)`
  style.backgroundImage = style.backgroundImage ? `url(${style.backgroundImage})` : ''
  return style
}

export default {
  elementConfig,
  pageConfig,
  getElementConfig,
  getProjectConfig,
  getCommonStyle
}