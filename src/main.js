// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store/'
import {routerMode} from './config/env'
import App from './App'
// 引入mint-ui 和 css
import mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

// 引入mui 和 css
import '../static/mui/css/mui.min.css'
import '../static/mui/js/mui.min.js'

// 引入自己编写的全局样式，用于覆盖mint-ui和mui中的样式

Vue.use(VueRouter)
Vue.use(mint)

const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production'
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
