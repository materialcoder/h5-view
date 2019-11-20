import Vue from "vue";
import Vuex from "vuex";

// 各个模板
import editor from './modules/editor'

// 全局状态管理
const state = {

}

const actions = {

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
    editor
  }
});
