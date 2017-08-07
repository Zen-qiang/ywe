import * as types from './mutation-types'
const actions = {
  [types.SETTAGS]: (state, tags) => {
    console.log('获取', state.tags)
    this.$store.commit(types.SETINFO, tags)
  }
}
export default actions
