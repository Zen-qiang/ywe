/**
 * Created by Candice.
 * http配置
 */

import axios from 'axios'
import qs from 'qs'
import store from './store/index'
import * as types from './store/mutation-types'
import router from './router/index'
import { Toast } from 'mint-ui'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://106.14.2.158/dinglian/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // if (store.state.token) {
    //   config.headers.Authorization = `token ${store.state.token}`
    // }
    // 修改了axios的post调用方法，将post参数转化成键值对
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    console.log(response)
    if (response.data) {
      if (response.data.code === 300) {
        Toast('连接已经失效，请重新登陆')
        store.commit(types.LOGOUT)
        router.replace({
          path: 'login',
          query: {redirect: router.currentRoute.fullPath ? router.currentRoute.fullPath : ''}
        })
      }
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT)
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath ? router.currentRoute.fullPath : ''}
          })
          break
        case 302:
          store.commit(types.LOGOUT)
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath ? router.currentRoute.fullPath : ''}
          })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  })

export default axios
