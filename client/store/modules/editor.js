import editorProjectConfig from '@client/pages/editor/DataModel'
import {merge} from 'lodash'
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
  // 属性编辑中展开的页签
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
  },
  /**
   * 操作命令
   * @param commit
   * @param {String} type 操作类型
   */
  elementCommand({commit, dispatch, state}, type) {
    let elData = getters.activeElement(state)
    switch (type) {
      case 'copy':
        dispatch('copyElement', elData)
        break
      case 'delete':
        dispatch('deleteElement', elData.uuid)
        break
      case 'fontA+':
        commit('resetElementCommonStyle', {fontSize: elData.commonStyle.fontSize + 1})
        break
      case 'fontA-':
        commit('resetElementCommonStyle', {fontSize: elData.commonStyle.fontSize - 1})
        break
      case 'fontB':
        commit('resetElementCommonStyle', {fontWeight: elData.commonStyle.fontWeight === 'bold' ? 'normal' : 'bold'})
        break
      case 'layerUp':
        commit('resetElementLayerIndex', {uuid: elData.uuid, type: 'layerUp'})
        break
      case 'layerDown':
        commit('resetElementLayerIndex', {uuid: elData.uuid, type: 'layerDown'})
        break
      case 'layerTop':
        commit('resetElementLayerIndex', {uuid: elData.uuid, type: 'layerTop'})
        break
      case 'layerBottom':
        commit('resetElementLayerIndex', {uuid: elData.uuid, type: 'layerBottom'})
        break
    }
  },
  /**
   * 复制元素
   * @param commit 
   * @param {Object} elData 元素数据 
   */
  copyElement({commit}, elData) {
    let copyOriginData = elData ? elData : getters.activeElement(state)
    let activePage = getters.activePage(state)
    let data = editorProjectConfig.copyElement(copyOriginData, {zIndex: activePage.elements.length + 1})
    commit('addElement', data)
    commit('setActiveElementUUID', data.uuid)
  },
  /**
   * 删除元素
   * @param commit
   * @param {String} uuid 
   */
  deleteElement({commit}, uuid) {
    // 1. 取消选中状态
    commit('setActiveElementUUID', '')

    // 2. 重置图层 在该图层之上的都减1(置顶)
    commit('resetElementLayerIndex', {uuid: uuid, type: 'layerTop'})

    // 3. 删除元素
    commit('deleteElement', uuid)
  },
  /**
   * 添加页面
   * @param param0
   * @param uuid 
   */
  addPage({commit, state}, uuid) {
    let data = editorProjectConfig.getPageConfig()
    let index = -1
    if (uuid) {
      index = state.projectData.pages.findIndex(v => v.uuid === uuid)
    } else {
      index = state.projectData.pages.length - 1
    }
    commit('insertPage', {data, index})
    commit('setActivePageUUID', state.projectData.pages[index + 1].uuid)
  },
  /**
   * 复制页面
   * @param param0
   * @param uuid 
   */
  copyPage({commit, state}, uuid) {
    let pageData = state.projectData.pages.find(v => v.uuid === uuid)
    let data = editorProjectConfig.copyPage(pageData)
    commit('insertPage', {data})
    commit('setActivePageUUID', state.projectData.pages[state.projectData.pages.length - 1].uuid)
  },
  /**
   * 删除页面
   * @param param0
   * @param uuid 
   */
  deletePage({commit, dispatch}, uuid) {
    // 如果删除的是最后一个页面 则需要先新增一个页面并设置为选中状态，然后在删除页面
    // 因为删空后什么也没有是不合逻辑的
    if (state.projectData.pages.length === 1 && state.activePageUUID === uuid) {
      dispatch('addPage')
      commit('setActivePageUUID', state.projectData.pages[1].uuid)
      commit('deletePage', 0)
      return
    }
    let index = state.projectData.pages.findIndex(v => v.uuid === uuid)
    // 如果删除的是选中的页面
    // 如果选中的是最后一页，需要先将uuid设置为上一页再删除
    // 否则，需要先将uuid设置为下一页再删除
    if (state.activePageUUID === uuid) {
      if (index === state.projectData.pages.length - 1) {
        commit('setActivePageUUID', state.projectData.pages[index - 1].uuid)
      } else {
        commit('setActivePageUUID', state.projectData.pages[index + 1].uuid)
      }
    }
    commit('deletePage', index)
  },
  /**
   * 添加动画
   * @param {String} animationName 动画名称
   */
  addElementAnimate({commit}, animationName) {
    // 初始化数据
    let animateDefaultData = {
      type: animationName,
      duration: 1,  // 持续时间
      infinite: '',  // 循环播放
      iterationCount: 1,  // 循环次数
      delay: 0  // 延迟时间
    }
    commit('addElementAnimate', animateDefaultData)
  },
  // 删除动画
  deleteElementAnimate({commit}, index) {
    commit('deleteElementAnimate', index)
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
  },
  /**
   * 删除选中元素
   * @param {*} state 
   * @param {String} uuid 选中元素唯一ID
   */
  deleteElement(state, uuid) {
    uuid = uuid || state.activeElementUUID
    let activePage = getters.activePage(state)
    let index = activePage.elements.findIndex(item => uuid === item.uuid)
    activePage.elements.splice(index, 1)
  },
  /**
   * 设置选中元素样式
   * @param {*} state 
   * @param {*} style 
   */
  resetElementCommonStyle(state, style) {
    let activeElement = getters.activeElement(state)
    activeElement.commonStyle = merge(activeElement.commonStyle, style)
  },
  /**
   * 重置选中元素图层
   * @param {*} state 
   * @param {Object} uuid 选中元素UUID type 操作类型
   */
  resetElementLayerIndex(state, {uuid, type}) {
    uuid = uuid || state.activeElementUUID
    let activePage = getters.activePage(state)
    let currentElement = activePage.elements.find(item => uuid === item.uuid)
    let itemZIndex = currentElement.commonStyle.zIndex
    let maxIndex = activePage.elements.length
    let minIndex = 1
    let zIndexOperate = {
      layerUp: Math.min(itemZIndex + 1, maxIndex),
      layerDown: Math.max(itemZIndex - 1, minIndex),
      layerTop: maxIndex,
      layerBottom: minIndex
    }
    let currentZIndex = zIndexOperate[type]
    currentElement.commonStyle.zIndex = currentZIndex
    activePage.elements.forEach(item => {
      if (item.uuid === uuid) return
      if (type === 'layerUp' && item.commonStyle.zIndex === currentZIndex) {
        item.commonStyle.zIndex--
      }
      if (type === 'layerDown' && item.commonStyle.zIndex === currentZIndex) {
        item.commonStyle.zIndex++
      }
      if (type === 'layerTop' && item.commonStyle.zIndex > itemZIndex) {
        item.commonStyle.zIndex--
      }
      if (type === 'layerBottom' && item.commonStyle.zIndex < itemZIndex) {
        item.commonStyle.zIndex++
      }
    })
  },
  /**
   * 新增页面
   */
  insertPage(state, {data, index}) {
    if (index !== undefined) {
      state.projectData.pages.splice(index + 1, 0, data)
    } else {
      state.projectData.pages.push(data)
    }
  },
  // 删除页面
  deletePage(state, index) {
    state.projectData.pages.splice(index, 1)
  },
  // 添加动画
  addElementAnimate(state, data) {
    let activeElement = getters.activeElement(state)
    activeElement.animations.push(data)
  },
  // 删除动画
  deleteElementAnimate(state, index) {
    let activeElement = getters.activeElement(state)
    activeElement.animations.splice(index, 1)
  },
  /**
   * 保存展开的页签状态
   * @param state 
   * @param data 
   */
  updateAttrEditCollapse(state, data) {
    state.activeAttrEditorCollapse = data
  }
}

const getters = {
  /**
   * 当前选中的页面
   */
  activePage() {
    // 如果不存在页面返回空
    if (!state.projectData.pages || !state.activePageUUID) {
      return {commonStyle: {}, config: {}}
    }
    return state.projectData.pages.find(v => {return v.uuid === state.activePageUUID})
  },
  /**
   * 当前选中元素
   */
  activeElement() {
    // 如果不存在页面返回空
    if (!state.projectData.pages) {
      return {commonStyle: {}, propsValue: {}}
    }
    let currentPageIndex = state.projectData.pages.findIndex(v => v.uuid === state.activePageUUID)
    if (currentPageIndex === -1) {
      return {commonStyle: {}, propsValue: {}}
    }
    return state.projectData.pages[currentPageIndex].elements.find(v => v.uuid === state.activeElementUUID)
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