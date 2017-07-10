import * as types from './mutation-types'
const actions = {
  [types.SETINFO]: (state, eventInfo) => {
    console.log('获取', state.eventInfo)
    this.$store.commit(types.SETINFO, eventInfo)
  },
  [types.SETTAGS]: (state, tags) => {
    console.log('获取', state.tags)
    this.$store.commit(types.SETINFO, tags)
  }
}
export default actions
