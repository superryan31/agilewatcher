export const state = () => ({
  status: '',
  token: localStorage.getItem('token') || '',
  user: {},

  used_free: localStorage.getItem('used_free') || true,
  show_plan_change_alert: false,
  github_token: localStorage.getItem('github_token') || '',
  github_repository: localStorage.getItem('github_repository') || ''
})

export const mutations = {
  auth_request(state) {
    state.status = 'loading'
  },
  auth_success(state, user) {
    state.status = 'success'
    state.token = user.token
    state.user = user
    state.used_free = user.used_free
  },
  auth_error(state) {
    state.status = 'error'
  },
  logout(state) {
    state.status = ''
    state.token = ''
  },
  change_plan_success(state, user) {
    console.log(user)
    state.used_free = user.used_free
    state.show_plan_change_alert = true
  },
  clear_plan_change_alert(state){
    state.show_plan_change_alert = false
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
          let user = resp.data
          user.token = token
          localStorage.setItem('token', token)
          localStorage.setItem('used_free', user.used_free)
          commit('auth_success', user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  clearPlanChangeAlert({ commit }) {
    return new Promise((resolve, reject) => {
      commit('clear_plan_change_alert')
      resolve()
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.clear()
      resolve()
    })
  },
  changePlan({ commit }){
    return new Promise((resolve, reject) => {

      this.$axios({ url: 'change_plan', method: 'POST' })
        .then(resp => {
          console.log(resp.data)
          localStorage.setItem('used_free', resp.data.used_free)
          commit('change_plan_success', resp.data)
          resolve(resp)
        })
        .catch(err => {
          localStorage.removeItem('used_free')
          reject(err)
        })
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
  used_free: state => !!state.used_free,
  show_plan_change_alert: state => state.show_plan_change_alert,

  isExistGitHubToken: state => !!state.github_token,
  github_token: state => state.github_token,
  github_repository: state => state.github_repository
}
