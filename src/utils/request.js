import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'

import {
  TOKEN_NAME,
  // prodUseMock
} from '@/config/index'

// let baseURL = prodUseMock ? '/api' : process.env.VUE_APP_API_BASE_URL
let baseURL = process.env.VUE_APP_API_BASE_URL

// 创建 axios 实例
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

const service = axios.create({
  baseURL, // api base_url
  timeout: 20000, // 请求超时时间
})


const err = (error) => {
  console.log('request', error)
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(TOKEN_NAME)
    if (error.response.status === 403) {
      notification.error({
        message: '被禁用的',
        description: data.message,
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLoginRequest)) {
      notification.error({
        message: '非法访问',
        description: '授权验证失败',
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
    if (error.response.status === 500) {
      notification.error({
        message: '请求500',
        description: '请联系管理员',
      })
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use((config) => {
  const token = Vue.ls.get(TOKEN_NAME)
  if (token) {
    config.headers['Authorization'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  const configData = config.method === 'post' ? config.data : config.params
  if (!configData.upload) {
    let formDataObj = new FormData()
    for (let item in configData) {
      const currentItem = configData[item]
      const value = Array.isArray(currentItem) ? JSON.stringify(currentItem) : currentItem
      formDataObj.append(item, value)
    }
    config.data = formDataObj
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  const token = Vue.ls.get(TOKEN_NAME)
  if (response.data.code === 401) {
    notification.error({
      message: '登录失效',
      description: '请重新登录',
    })
    if (token) {
      store.dispatch('Logout').then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      })
    }
  }
  return response.data
}, err)

export {
  service as axios
}