<template>
  <div>
    <transition name="router-fade" mode="out-in">
      		<router-view></router-view>
    </transition>
  </div>
</template>
<script>
import * as types from './store/mutation-types'
import {mapState} from 'vuex'
export default {
  name: 'app',
  computed: mapState({
    token: state => state.token
  }),
  methods: {
    logout () {
      this.$store.commit(types.LOGOUT)
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
