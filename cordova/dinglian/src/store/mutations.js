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
  }
}
export default mutations
