import Vue from 'vue'
import {
  TOKEN_NAME
} from '@/config/index'
import {
  welcome,
  requestAxios
} from '@/utils/util'

const user = {
  state: {
    token: '',
    name: localStorage.getItem('user_name') || '',
    welcome: '',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    roles: [],
    info: {},
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, {
      name,
      welcome
    }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      return new Promise(async (resolve, reject) => {
        // await requestAxios({
        //     url: '/back/login',
        //     data: userInfo
        const data = {
          token: '651351313',
          account: 'admin'
        }
        Vue.ls.set(TOKEN_NAME, data.token, 7 * 24 * 60 * 60 * 1000)
        localStorage.setItem('user_name', data.account)
        // commit('SET_INFO',data)
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', {
          name: data.account,
        })
        resolve()

      })
    },
    // 登出
    Logout({
      commit,
      state
    }) {
      return new Promise((resolve) => {
        //   logout(state.token)
        //     .then(() => {
        //       resolve()
        //     })
        //     .catch(() => {
        //       resolve()
        //     })
        //     .finally(() => {
        //       commit('SET_TOKEN', '')
        //       commit('SET_ROLES', [])
        //       Vue.ls.remove(TOKEN_NAME)
        //     })
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.ls.remove(TOKEN_NAME)
        resolve()
      })
    },
  },
}

export default user