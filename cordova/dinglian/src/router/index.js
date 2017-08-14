import Vue from 'vue'
import Router from 'vue-router'
const Index = r => require.ensure([], () => r(require('@/pages/index')), 'index')// 主页面
const Home = r => require.ensure([], () => r(require('@/pages/home/home')), 'home')// 首页
const Hot = r => require.ensure([], () => r(require('@/pages/home/hot')), 'hot')// 首页热门
const Interest = r => require.ensure([], () => r(require('@/pages/home/interest')), 'interest')// 首页兴趣
const Circle = r => require.ensure([], () => r(require('@/pages/circle/circle')), 'circle')// 圈子
const Contacts = r => require.ensure([], () => r(require('@/pages/message/contacts')), 'contacts')// 联系人
const FollowFriends = r => require.ensure([], () => r(require('@/pages/message/followFriends')), 'followFriends')// 我关注的
const MyFans = r => require.ensure([], () => r(require('@/pages/message/myFans')), 'myFans')// 我的粉丝
const newFriends = r => require.ensure([], () => r(require('@/pages/message/newFriends')), 'newFriends')// 新朋友
const AddFriend = r => require.ensure([], () => r(require('@/pages/message/addFriend')), 'addFriend')// 添加好友
const AddChatroom = r => require.ensure([], () => r(require('@/pages/message/addChatroom')), 'addChatroom')// 获取聊天室地址
const ChatroomList = r => require.ensure([], () => r(require('@/pages/message/chatroomList')), 'chatroomList')// 聊天室信息
const FriendCard = r => require.ensure([], () => r(require('@/pages/message/friendCard')), 'friendCard')// 好友卡片
const ChatList = r => require.ensure([], () => r(require('@/pages/message/chatList')), 'chatList')// 消息
const Message = r => require.ensure([], () => r(require('@/pages/message/message')), 'message')// 消息
const Account = r => require.ensure([], () => r(require('@/pages/account/account')), 'account')// 我的
const EventsList = r => require.ensure([], () => r(require('@/pages/activity/eventsList')), 'eventsList')// 活动列表
const ChangeSignlog = r => require.ensure([], () => r(require('@/pages/account/changeSignlog')), 'changeSignlog')// 修改我的签名
const ForgetPassword = r => require.ensure([], () => r(require('@/pages/login/forgetPassword')), 'forgetPassword')// 忘记密码
const ChangePassword = r => require.ensure([], () => r(require('@/pages/account/changePassword')), 'changePassword')// 修改密码
const ChangePicture = r => require.ensure([], () => r(require('@/pages/account/changePicture')), 'changePicture')// 修改头像
const Setting = r => require.ensure([], () => r(require('@/pages/account/setting')), 'setting')// 设置
const Login = r => require.ensure([], () => r(require('@/pages/login/login')), 'login')// 登录
const Register = r => require.ensure([], () => r(require('@/pages/register/register')), 'register')// 注册
const InitiateActivities = r => require.ensure([], () => r(require('@/pages/activity/initiateActivities')), 'initiateActivities')// 发布活动
const EditActivities = r => require.ensure([], () => r(require('@/pages/activity/editActivities')), 'editActivities')// 编辑活动
const EventDetails = r => require.ensure([], () => r(require('@/pages/activity/eventDetails')), 'eventDetails')// 发布活动详情
const ActivityDetails = r => require.ensure([], () => r(require('@/pages/activity/activityDetails')), 'activityDetails')// 活动详情
const SignActivities = r => require.ensure([], () => r(require('@/pages/activity/signActivities')), 'signActivities')// 活动报名
const MyActivityList = r => require.ensure([], () => r(require('@/pages/activity/myActivityList')), 'myActivityList')// 我的活动列表
const ActivityInfo = r => require.ensure([], () => r(require('@/pages/activity/activityInfo')), 'activityInfo')// 活动info
const EditTopic = r => require.ensure([], () => r(require('@/pages/circle/editTopic')), 'editTopic')// 编辑话题
const SearchTopic = r => require.ensure([], () => r(require('@/pages/circle/searchTopic')), 'searchTopic')// search话题
const TopicDetails = r => require.ensure([], () => r(require('@/pages/circle/topicDetails')), 'topicDetails')// 话题详情
const PreviewDetails = r => require.ensure([], () => r(require('@/pages/circle/previewDetails')), 'previewDetails')// 预览详情
// const UserInfo = r => require.ensure([], () => r(require('@/pages/account/userInfo')), 'userInfo')// 我的详细信息
// const MyCircle = r => require.ensure([], () => r(require('@/pages/circle/myCircle')), 'myCircle')// 我的圈子
// const CreateCircleName = r => require.ensure([], () => r(require('@/pages/circle/createCircleName')), 'createCircleName')// 创建圈子名称
// const CreateCircleClassification = r => require.ensure([], () => r(require('@/pages/circle/createCircleClassification')), 'createCircleClassification')// 创建圈子分类
// const CreateCirclePhoto = r => require.ensure([], () => r(require('@/pages/circle/createCirclePhoto')), 'createCirclePhoto')// 创建圈子照片
const nopage = r => require.ensure([], () => r(require('@/pages/nopage')), 'nopage')
// import Hello from '@/components/Hello'
// import Home from '@/components/Home'
// import List from '@/components/List'
// import Hot from '@/pages/Hot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      // meta: {
      //   requireAuth: true
      // },
      children: [
        {
          path: '',
          component: Home,
          children: [
            {
              path: '',
              name: 'Hot',
              component: Hot
            },
            {
              path: 'home/interest',
              name: 'Interest',
              component: Interest
            }
          ]
        },
        {
          path: 'circle',
          name: 'Circle',
          component: Circle
        },
        {
          path: 'eventsList',
          name: 'EventsList',
          component: EventsList
        },
        {
          path: 'message',
          name: 'Message',
          component: Message
        },
        {
          path: 'account',
          name: 'Account',
          component: Account
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/forgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/changeSignlog',
      name: 'ChangeSignlog',
      component: ChangeSignlog,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/changePassword',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/changePicture',
      name: 'ChangePicture',
      component: ChangePicture,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/initiateActivities',
      name: 'InitiateActivities',
      component: InitiateActivities,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/editActivities',
      name: 'EditActivities',
      component: EditActivities,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/eventDetails',
      name: 'EventDetails',
      component: EventDetails,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/activityDetails/:id',
      name: 'ActivityDetails',
      component: ActivityDetails,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/signActivities/:id',
      name: 'SignActivities',
      component: SignActivities,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/activityInfo/',
      name: 'ActivityInfo',
      component: ActivityInfo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/editTopic/:id',
      name: 'EditTopic',
      component: EditTopic,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/searchTopic',
      name: 'SearchTopic',
      component: SearchTopic,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/topicDetails/:id',
      name: 'TopicDetails',
      component: TopicDetails,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/previewDetails/:id/:uid',
      name: 'PreviewDetails',
      component: PreviewDetails,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/myActivityList',
      name: 'MyActivityList',
      component: MyActivityList,
      meta: {
        requireAuth: true
      }
    },
    // {
    //   path: '/userInfo',
    //   name: 'UserInfo',
    //   component: UserInfo,
    //   meta: {
    //     requireAuth: true
    //   }
    // },
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts,
      meta: {
        requireAuth: true
      }
    },
    // {
    //   path: '/myCircle',
    //   name: 'MyCircle',
    //   component: MyCircle,
    //   meta: {
    //     requireAuth: true
    //   }
    // },
    {
      path: '/addFriend',
      name: 'AddFriend',
      component: AddFriend,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/addChatroom',
      name: 'AddChatroom',
      component: AddChatroom,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/chatroomList/:roomid',
      name: 'ChatroomList',
      component: ChatroomList,
      meta: {
        requireAuth: true
      }
    },
    // {
    //   path: '/createCircleName',
    //   name: 'CreateCircleName',
    //   component: CreateCircleName,
    //   meta: {
    //     requireAuth: true
    //   }
    // },
    {
      path: '/followFriends',
      name: 'FollowFriends',
      component: FollowFriends,
      meta: {
        requireAuth: true
      }
    },
    // {
    //   path: '/createCircleClassification',
    //   name: 'CreateCircleClassification',
    //   component: CreateCircleClassification,
    //   meta: {
    //     requireAuth: true
    //   }
    // },
    {
      path: '/myFans',
      name: 'MyFans',
      component: MyFans,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/newFriends',
      name: 'newFriends',
      component: newFriends,
      meta: {
        requireAuth: true
      }
    },
    // {
    //   path: '/createCirclePhoto',
    //   name: 'CreateCirclePhoto',
    //   component: CreateCirclePhoto,
    //   meta: {
    //     requireAuth: true
    //   }
    // },
    {
      path: '/friendCard/:account',
      name: 'FriendCard',
      component: FriendCard,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/chatList/:account',
      name: 'ChatList',
      component: ChatList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '*',
      name: '404',
      component: nopage
    }
  ]
})
