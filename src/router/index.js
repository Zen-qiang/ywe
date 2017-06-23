import App from '../App'
const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')// 首页
const login = r => require.ensure([], () => r(require('../pages/login/login')), 'login')// 登录
const register = r => require.ensure([], () => r(require('../pages/register/register')), 'register')// 注册
const eventsList = r => require.ensure([], () => r(require('../pages/activity/eventsList')), 'eventsList')// 活动列表
const initiateActivities = r => require.ensure([], () => r(require('../pages/activity/initiateActivities')), 'initiateActivities')// 发布活动
const editActivities = r => require.ensure([], () => r(require('../pages/activity/editActivities')), 'editActivities')// 编辑活动
const eventDetails = r => require.ensure([], () => r(require('../pages/activity/eventDetails')), 'eventDetails')// 活动详情
const signActivities = r => require.ensure([], () => r(require('../pages/activity/signActivities')), 'signActivities')// 活动报名
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
      path: '/eventsList',
      component: eventsList
    },
    {
      path: '/initiateActivities',
      component: initiateActivities
    },
    {
      path: '/editActivities',
      component: editActivities
    },
    {
      path: '/eventDetails',
      component: eventDetails
    },
    {
      path: '/signActivities',
      component: signActivities
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
