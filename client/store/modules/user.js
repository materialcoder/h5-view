const state = {
  token: '',
  userData: {
    avatar: ''
  }
}

const actions = {
  /**
   * 更新token
   * @param  param0 
   * @param  token 
   */
  updateUserToken({commit}, token) {
    commit('updateUserToken', token)
    sessionStorage.setItem('token', token)
  },
  /**
   * 更新用户信息
   * @param  param0 
   * @param  data 
   */
  updateUserInfo({commit}, data) {
    commit('updateUserInfo', data)
    sessionStorage.setItem('userData', JSON.stringify(data))
  }
}

const mutations = {
  /**
   * 更新token
   * @param  state 
   * @param  token 
   */
  updateUserToken(state, token) {
    state.token = token || ''
  },
  /**
   * 更新用户信息
   * @param  param0 
   * @param  data 
   */
  updateUserInfo(state, data) {
    state.userData = {...data}
  }
}

const getters = {
  userData(state) {
    return state.userData
  },
  authorization(state) {
    return state.token ? 'Bearer ' + state.token : ''
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}