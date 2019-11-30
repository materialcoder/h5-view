import Vue from "vue";
import Vuex from "vuex";

// 各个模板
import editor from './modules/editor'
import user from './modules/user'
import { Message } from "element-ui"

// 全局状态管理
const state = {

}

const actions = {
  showMessage(store, msg) {
    Message({
      type: msg.type,
      message: msg.message || msg.data
    })
  }
}

const mutations = {

}

const getters = {

}

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    editor,
    user
  }
});
