/*
 * 聊天室SDK，依赖于nim sdk
 */
 import SDK from '../../../static/NIM/NIM_Web_SDK_v4.1.0.js'
 import * as types from '../mutation-types'
 // import util from '../../utils'
 import router from '../../router/index'
 import { Toast } from 'mint-ui'
 import config from '../../configs'

 const initChatroomSDK = {
   [types.INITCHATROOMSDK]: ({ state, commit, dispatch }, obj) => {
     let {chatroomId, address} = obj
     if (chatroomId && address) {
       if (state.chatroom) {
         state.chatroom.disconnect()
       }
       // 初始化SDK
       window.chatroom = state.chatroom = SDK.Chatroom.getInstance({
         appKey: config.appkey,
         account: state.userInfo.accid,
         token: state.userInfo.token,
         chatroomId,
         chatroomAddresses: address,
         onconnect: function onConnect (event) {
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
           if (error) {
             switch (error.code) {
               // 账号或者密码错误, 请跳转到登录页面并提示错误
               case 302:
                 // 此逻辑与nim sdk错误逻辑相同，复用nim sdk的
                 // 如果单用聊天室功能需要在此做处理
                 break
               case 13003:
                 alert('抱歉，你已被主播拉入了黑名单')
                 router.replace({
                   path: '/message',
                   query: {redirect: router.currentRoute.fullPath ? router.currentRoute.fullPath : ''}
                 })
                 break
                 // 被踢, 请提示错误后跳转到登录页面
               case 'kicked':
                 if (error.reason === 'managerKick') {
                   alert('你已被管理员移出聊天室')
                   router.replace({
                     path: '/message',
                     query: {redirect: router.currentRoute.fullPath ? router.currentRoute.fullPath : ''}
                   })
                 } else if (error.reason === 'blacked') {
                   alert('你已被管理员拉入黑名单，不能再进入')
                   router.replace({
                     path: '/message',
                     query: {redirect: router.currentRoute.fullPath ? router.currentRoute.fullPath : ''}
                   })
                 }
                 break
               default:
                 console.log(error.message)
                 break
             }
           }
         },
         onmsgs: function (res) {
           // 更新聊天室的聊天列表
           commit(types.SETCURRCHATROOMMSGS, res)
         }
       })
     } else {
       Toast('没有聊天室地址！')
     }
   }
 }
 export default initChatroomSDK
