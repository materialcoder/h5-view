import Component from './src/index.vue'

Component.install = Vue => {
  Vue.component(Component.name, Component)
}

export default Component
