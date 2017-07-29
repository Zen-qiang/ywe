import * as types from './mutation-types'

const getters = {
  [types.GETINFO]: (state) => {
    console.log('获取', state.eventInfo)
    return state.eventInfo
  },
  [types.GETTAGS]: (state) => {
    console.log('获取', state.tags)
    return state.tags
  },
  [types.GETCIRCLEINFO]: (state) => {
    console.log('获取', state.circleInfo)
    return state.circleInfo
  }
}
export default getters
