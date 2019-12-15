import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import "@/common/style/index.scss"
import '@/permission'
import httpServer from '@client/service/httpServer'  // axios 拦截器设置
import config from '@/config'
import VueClipboard from 'vue-clipboard2'
import 'animate.css'

// import Text from '@/plugins/index'

// Vue.use(Text)
Vue.use(ElementUI)
Vue.use(VueClipboard)

// 引入全局公共方法
Vue.prototype.$axios = httpServer

// 全局公共配置
Vue.prototype.$config = config

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
