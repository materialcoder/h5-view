// 组件库入口

import Text from './text'
import Image from './image'

// 所有组件列表
const components = [
  Text,
  Image
]

// 定义install方法，接收Vue作为参数
const install = function (Vue) {
  // 判断是否安装，安装过就不继续往下执行
  if (install.installed) return
  install.installed = true
  // 遍历注册所有组件
  components.map(component => Vue.component(component.name, component))
}

// 检测到Vue才执行
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

let regist_components_obj = {}
components.forEach(item => {
  regist_components_obj[item.name] = item
})

export {
  regist_components_obj
}

export default {
  install,
  // 所有组件，必须具有install，才能使用Vue.use()
}