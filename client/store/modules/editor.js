/**
 * 编辑器数据状态存储
 */
const state = {
  // 当前编辑器编辑工程项目数据
  projectData: {

  },
  // 当前正在编辑页面的UUID
  activePageUUID: '',
  // 画板中选中元素的UUID
  activeElementUUID: '',
  // 历史操作数据 用于undo redo
  historyCache: [],
  // redo undo 指针
  currentHistoryIndex: -1,
  activeAttrEditorCollapse: ['1']
}

const actions = {
  addElement({commit}, elData) {
    console.log(elData)
    commit('addElement', elData)
  }
}

const mutations = {
  addElement(state, elData) {
    console.log(state, elData)
  }
}

const getters = {

}

export default {
  state,
  getters,
  mutations,
  actions
}