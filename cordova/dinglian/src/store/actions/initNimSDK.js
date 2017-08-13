import SDK from '../../../static/NIM/NIM_Web_SDK_v4.1.0.js'
import * as types from '../mutation-types'
import util from '../../utils'
import router from '../../router/index'
import { Toast } from 'mint-ui'
import config from '../../configs'
const actions = {
  [types.INITNIMSDK]: ({ state, commit, dispatch }, userInfo) => {
    if (state.nim) {
      state.nim.disconnect()
    }
    // 初始化SDK
    window.nim = state.nim = SDK.NIM.getInstance({
      appKey: config.appkey,
      account: userInfo.accid,
      token: userInfo.token,
      db: true,
      syncSessionUnread: true,
      onconnect: function onConnect (event) {
        if (userInfo) {
          // 连接上以后更新uid
          commit(types.UPDATEUSERINFO, userInfo)
        }
      },
      onerror: function onError (event) {
        // alert(JSON.stringify(event))
        Toast('网络连接状态异常')
        router.replace({
          path: '/login',
          query: {redirect: router.currentRoute.fullPath ? router.currentRoute.fullPath : ''}
        })
      },
      onwillreconnect: function onWillReconnect () {
        console.log(event)
      },
      ondisconnect: function onDisconnect (error) {
        switch (error.code) {
          // 账号或者密码错误, 请跳转到登录页面并提示错误
          case 302:
            Toast('帐号或密码错误')
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath ? router.currentRoute.fullPath : ''}
            })
            break
          // 被踢, 请提示错误后跳转到登录页面
          case 'kicked':
            let map = {
              PC: '电脑版',
              Web: '网页版',
              Android: '手机版',
              iOS: '手机版',
              WindowsPhone: '手机版'
            }
            let str = error.from
            let errorMsg = `你的帐号于${util.formatDate(new Date())}被${(map[str] || '其他端')}踢出下线，请确定帐号信息安全!`
            Toast(errorMsg)
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath ? router.currentRoute.fullPath : ''}
            })
            break
          default:
            break
        }
      },
      onsessions: function (res) {
        // 更新聊天列表
        commit(types.UPDATESESSIONLIST, res)
      },
      onupdatesession: function () {

      },
      onmsg: function () {

      },
      onsysmsg: function () {

      }
    })
  }
}
export default actions
