import App from '../App'
const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')
const login = r => require.ensure([], () => r(require('../pages/login/login')), 'login')
const register = r => require.ensure([], () => r(require('../pages/register/register')), 'register')
const nopage = r => require.ensure([], () => r(require('../pages/nopage')), 'nopage')
export default [{
  path: '/',
  component: App, // 顶层路由，对应index.html
  children: [// 二级路由，对应App.vue
    // 地址为空时跳转home页面
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: register
    }
  ]
},
{
  path: '*',
  name: '404',
  component: nopage
}]
