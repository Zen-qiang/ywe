import * as types from './mutation-types'

const getters = {
  [types.GETINFO]: (state) => {
    console.log('获取', state.eventInfo)
    return state.eventInfo
  }
}
export default getters
