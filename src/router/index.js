import App from '../App'
const index = r => require.ensure([], () => r(require('../pages/index')), 'index')// 主页面
const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')// 首页
const circle = r => require.ensure([], () => r(require('../pages/circle/circle')), 'circle')// 圈子
const activity = r => require.ensure([], () => r(require('../pages/activity/eventsList')), 'activity')// 活动
const message = r => require.ensure([], () => r(require('../pages/message/message')), 'message')// 消息
const account = r => require.ensure([], () => r(require('../pages/account/account')), 'account')// 我的
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
      redirect: '/index'
    },
    {
      path: '/index',
      component: index,
      children: [
        {
          path: '/home',
          component: home
        },
        {
          path: '/circle',
          component: circle
        },
        {
          path: '/activity',
          component: activity
        },
        {
          path: '/message',
          component: message
        },
        {
          path: '/account',
          component: account
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
        }
      ]
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
