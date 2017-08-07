import * as types from './mutation-types'

const getters = {
  [types.GETTAGS]: (state) => {
    console.log('获取', state.tags)
    return state.tags
  }
}
export default getters
