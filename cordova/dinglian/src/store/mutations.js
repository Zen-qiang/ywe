import * as types from './mutation-types'

const mutations = {
  [types.LOGIN]: (state, data) => {
    localStorage.token = data
    state.token = data
  },
  [types.LOGOUT]: (state) => {
    localStorage.removeItem('token')
    state.token = null
  },
  [types.SETINFO]: (state, eventInfo) => {
    state.eventInfo = eventInfo
    console.log('保存', state.eventInfo)
  },
  [types.SETTAGS]: (state, tags) => {
    state.tags = tags
    console.log('保存', state.tags)
  },
  [types.SETINTERESTINFO]: (state, interestInfo) => {
    state.interestInfo = interestInfo
    console.log('保存', state.interestInfo)
  },
  [types.SETCIRCLENAME]: (state, circleName) => {
    state.circleName = circleName
    console.log('保存', state.circleName)
  },
  [types.SETCIRCLETAGS]: (state, circleTags) => {
    state.circleTags = circleTags
    console.log('保存', state.circleTags)
  },
  [types.INITNIMSDK]: (state, options) => {
    state.nim = options.nim
  },
  [types.UPDATEUSERINFO]: (state, UserInfo) => {
    state.userInfo = UserInfo
  },
  [types.GETUSERINFO]: (state, UserInfo) => {
    state.userInfo = UserInfo
  },
  [types.UPDATECURSESSIONS]: (state, session) => {
    state.currSessionMsgs.push(session)
  },
  [types.UPDATECURSESSIONID]: (state, sessionId) => {
    state.currSessionId = sessionId
  },
  [types.UPDATEFRIENDSLIST]: (state, friendslist) => {
    state.friendslist = friendslist
  },
  [types.UPDATESESSIONLIST]: (state, sessionList) => {
    state.sessionList = sessionList
  }
}
export default mutations
