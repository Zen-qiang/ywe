// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import axios from './http'
import store from './store/'
import * as types from './store/mutation-types'
// import {routerMode} from './configs/env'

Vue.config.productionTip = false

import VueCordova from 'vue-cordova'
Vue.use(VueCordova)
// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

// 引入mint-ui 和 css
import mint from 'mint-ui'
import 'mint-ui/lib/style.css'

// 引入mui 和 css
import '../static/mui/css/mui.min.css'
import '../static/mui/js/mui.min.js'

// 引入自己编写的全局样式，用于覆盖mint-ui和mui中的样式
import './assets/css/global.css'

Vue.use(VueRouter)
Vue.use(mint)
// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios
// const router = new VueRouter({
//   routes // （缩写）相当于 routes: routes
// })

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  // console.log(window.localStorage.getItem('token'))
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  template: '<App/>',
  components: { App }
})
