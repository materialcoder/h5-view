import editorProjectConfig from '@client/pages/editor/DataModel'
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
  /**
   * 初始化编辑项目数据
   * @param state
   * @param data 
   */
  initProjectData({commit, state, dispatch}, data) {
    console.log(state)
    let projectData = data
    if (!projectData) {
      projectData = editorProjectConfig.getProjectConfig()
    }
    console.log(projectData)
    commit('initProjectData', projectData)
    // 如果有页面则选中第一个，否则新建一个页面再选中第一个
    if (!state.projectData.pages || !state.projectData.pages.length) {
      dispatch('addPage')
    }
    dispatch('setActivePageUUID', state.projectData.pages[0].uuid)
  },
  /**
   * 设置当前选中页面uuid
   * @param commit
   * @param uuid 
   */
  setActivePageUUID({commit}, uuid) {
    commit('setActivePageUUID', uuid),
    // 当前选中页面切换后清空元素选中的uuid
    commit('setActiveElementUUID', '')
  },
  /**
   * 设置当前选中元素uuid
   * @param commit
   * @param uuid 
   */
  setActiveElementUUID({commit}, uuid) {
    commit('setActiveElementUUID', uuid)
  },
  /**
   * 添加元素
   * @param commit
   * @param elData 
   */
  addElement({commit}, elData) {
    console.log(elData)
    let activePage = getters.activePage(state)
    console.log(activePage)
    let data = editorProjectConfig.getElementConfig(elData, {zIndex: activePage.elements.length + 1})
    console.log(data)
    commit('addElement', data)
    commit('setActiveElementUUID', data.uuid)
  }
}

const mutations = {
  /**
   * 初始化编辑项目数据
   * @param state 
   * @param projectData 
   */
  initProjectData(state, projectData) {
    state.projectData = projectData
  },
  /**
   * 设置当前选中页面UUID
   * @param state 
   * @param data 
   */
  setActivePageUUID(state, uuid) {
    state.activePageUUID = uuid
  },
  /**
   * 设置当前元素UUID
   * @param state 
   * @param data 
   */
  setActiveElementUUID(state, data) {
    state.activeElementUUID = data
  },
  /**
   * 往画板添加元素
   * @param state 
   * @param elData 
   */
  addElement(state, elData) {
    console.log(state, elData)
    let index = state.projectData.pages.findIndex(v => {return v.uuid === state.activePageUUID})
    state.projectData.pages[index].elements.push(elData)
  }
}

const getters = {
  /**
   * 当前选中的页面
   */
  activePage() {
    // 如果不存在页面返回-1
    if (!state.projectData.pages || !state.activePageUUID) {
      return {commonStyle: {}, config: {}}
    }
    return state.projectData.pages.find(v => {return v.uuid === state.activePageUUID})
  },
  /**
   * 当前选中页面的index索引
   */
  currentPageIndex() {
    if (!state.projectData.pages) {
      return -1
    }
    return state.projectData.pages.findIndex(v => v.uuid === state.activePageUUID)
  },
  /**
   * 当前页面选中element索引index
   */
  currentElementIndex() {
    if (!state.projectData.pages) {
      return -1
    }
    let currentPageIndex = state.projectData.pages.findIndex(v => v.uuid === state.activePageUUID)
    if (currentPageIndex === -1) {
      return -1
    }
    return state.projectData.pages[currentPageIndex].elements.findIndex(v => v.uuid === state.activeElementUUID)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}