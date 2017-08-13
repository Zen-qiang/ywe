import * as types from '../mutation-types'
import initNimSdk from './initNimSdk'
const actions = {
  [types.SETINFO]: (state, eventInfo) => {
    console.log('获取', state.eventInfo)
    this.$store.commit(types.SETINFO, eventInfo)
  },
  [types.SETTAGS]: (state, tags) => {
    console.log('获取', state.tags)
    this.$store.commit(types.SETINFO, tags)
  },
  [types.GETUSERINFO]: ({ state, commit, dispatch }, userInfo) => {
    state.userInfo = userInfo
  },
  [types.INITNIMSDK]: initNimSdk[types.INITNIMSDK],
  [types.UPDATECURSESSIONS]: (state, session) => {
    state.commit(types.UPDATECURSESSIONS, session)
  },
  [types.UPDATECURSESSIONID]: (state, sessionId) => {
    state.commit(types.UPDATECURSESSIONID, sessionId)
  }
}
export default actions
