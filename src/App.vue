<template>
  <div>
    <transition name="router-fade" mode="out-in">
      		<router-view></router-view>
    </transition>
    <mt-tab-container>
      <mt-tabbar v-model="selected" fixed>

        <mt-tab-item id="home" >
          <img slot="icon" src="">
          首页
        </mt-tab-item>

        <mt-tab-item id="circle">
          <img slot="icon" src="">
          圈子
        </mt-tab-item>

        <mt-tab-item id="activity">
          <img slot="icon" src="">
          活动
        </mt-tab-item>

        <mt-tab-item id="message">
          <img slot="icon" src="">
          消息
        </mt-tab-item>
        <mt-tab-item id="account">
          <img slot="icon" src="">
          我的
        </mt-tab-item>
      </mt-tabbar>
    </mt-tab-container>
  </div>
</template>
<script>
import * as types from './store/mutation-types'
import {mapState} from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      selected: 'home'
    }
  },
  computed: mapState({
    token: state => state.token
  }),
  watch: {
    selected: function (val, oldVal) {
      // 这里就可以通过 val 的值变更来确定当前选中的tab
      this.$router.push({'path': val})
    }
  },
  methods: {
    logout () {
      console.log('aa')
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
