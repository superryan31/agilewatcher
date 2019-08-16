export const state = () => ({
  status: '',
  token: localStorage.getItem('token') || '',
  user: {},

  github_token: localStorage.getItem('github_token') || '',
  github_repository: localStorage.getItem('github_repository') || ''
})

export const mutations = {
  auth_request(state) {
    state.status = 'loading'
  },
  auth_success(state, token, user) {
    state.status = 'success'
    state.token = token
    state.user = user
  },
  auth_error(state) {
    state.status = 'error'
  },
  logout(state) {
    state.status = ''
    state.token = ''
  },

  setting_success(state, setting) {
    console.log(setting)
    state.github_token = setting.github_token
    state.github_repository = setting.github_repository
  },
  setting_clear(state) {
    state.github_token = ''
    state.github_repository = ''
  }
}

export const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      console.log('here')
      commit('auth_request')
      this.$axios({ url: 'users/sign_in', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.headers.authorization
          const user = resp.data
          localStorage.setItem('token', token)
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      localStorage.removeItem('github_token')
      localStorage.removeItem('github_repository')
      resolve()
    })
  },

  saveSetting({ commit }, setting) {
    return new Promise((resolve, reject) => {
      let url = 'project_setting'
      let defaultMethod = 'POST'
      if (setting.id) {
        url += '/' + setting.id
        defaultMethod = 'PUT'
      }
      this.$axios({ url: url, data: setting, method: defaultMethod })
        .then(resp => {
          localStorage.setItem('github_token', setting.github_token)
          localStorage.setItem('github_repository', setting.github_repository)
          commit('setting_success', setting)
          resolve(resp)
        })
        .catch(err => {
          localStorage.removeItem('github_token')
          localStorage.removeItem('github_repository')
          reject(err)
        })
    })
  },
  saveGitHubInfo({ commit }, setting) {
    return new Promise((resolve, reject) => {
      console.log('store');
      localStorage.setItem('github_token', setting.github_token)
      localStorage.setItem('github_repository', setting.github_repository)
      commit('setting_success', setting)
      resolve()
    })
  },
  clearSetting({ commit }) {
    return new Promise((resolve, reject) => {
      commit('setting_clear')
      localStorage.removeItem('github_token')
      localStorage.removeItem('github_repository')
      resolve()
    })
  }
}

export const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,

  isExistGitHubToken: state => !!state.github_token,
  github_token: state => state.github_token,
  github_repository: state => state.github_repository
}
