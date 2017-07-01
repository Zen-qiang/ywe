import App from '../App'
const index = r => require.ensure([], () => r(require('../pages/index')), 'index')// 主页面
const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')// 首页
const hot = r => require.ensure([], () => r(require('../pages/home/hot')), 'hot')// 首页热门
const interest = r => require.ensure([], () => r(require('../pages/home/interest')), 'interest')// 首页兴趣
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
const forgetPassword = r => require.ensure([], () => r(require('../pages/login/forgetPassword')), 'forgetPassword')// 忘记密码
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
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: home,
          children: [
            {
              path: '/home/hot',
              name: 'hot',
              component: hot
            },
            {
              path: '/home/interest',
              name: 'interest',
              component: interest
            }
          ]
        },
        {
          path: '/circle',
          name: 'circle',
          component: circle
        },
        {
          path: '/activity',
          name: 'activity',
          component: activity
        },
        {
          path: '/message',
          name: 'message',
          component: message
        },
        {
          path: '/account',
          name: 'account',
          component: account
        },
        {
          path: '/eventsList',
          name: 'eventsList',
          component: eventsList
        }
      ]
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/forgetPassword',
      component: forgetPassword
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/initiateActivities',
      component: initiateActivities,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/editActivities',
      component: editActivities,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/eventDetails',
      component: eventDetails,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/signActivities',
      component: signActivities,
      meta: {
        requireAuth: true
      }
    }
  ]
},
{
  path: '*',
  name: '404',
  component: nopage
}]
