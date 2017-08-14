<template>
  <div style="width: 100%;" class="dinglian-message-chatlist">
    <div class="mui-content" id="dinglian-scroll-content" style="margin-top: 45px;margin-bottom: 50px;">
      <div style="background-color: #ffd300; color: #333333;margin: 0 auto; height: 45px; position: fixed; width: 100%; z-index: 1000; top: 0;">
          <dianlian-header-bar :title="headerTitle"></dianlian-header-bar>
      </div>
      <chat-list
        type="session"
        :msglist="msglist"
        :userInfos="userInfos"
        :robotInfos="robotInfos"
        :myInfo="myInfo"
        :isRobot="isRobot"
        @msgs-loaded="msgsLoaded"
      ></chat-list>
      <chat-editor
        type="session"
        :scene="scene"
        :to="to"
        :isRobot="isRobot"
        @msgs-loaded="msgsLoaded"
      ></chat-editor>
      </div>
    </div>
</template>
<script>
// import * as types from '../../store/mutation-types'
import ChatList from '../../components/common/ChatList'
import ChatEditor from '../../components/common/ChatEditor'
import { Toast } from 'mint-ui'
import pageUtil from '../../utils/page'
// import util from '../../utils'
import DianlianHeaderBar from '../../components/common/dianlianHeaderBar'
import * as types from '../../store/mutation-types'
export default {
  components: {
    ChatList,
    ChatEditor,
    DianlianHeaderBar
  },
  mounted () {
    pageUtil.scrollChatListDown()
  },
  updated () {
    pageUtil.scrollChatListDown()
  },
  data () {
    return {
      isRobot: false,
      leftBtnOptions: {
        backText: ' ',
        preventGoBack: true
      },
      msglist: [],
      currPagePos: 0
    }
  },
  computed: {
    headerTitle () {
      return this.$route.params.account
    },
    to () {
      return this.$route.params.account
    },
    myInfo () {
      return this.$store.state.userInfo
    },
    userInfos () {
      return this.$store.state.userInfos
    },
    robotInfos () {
      return this.$store.state.robotInfos
    },
    scene () {
      return 'p2p'
    }
  },
  created () {
    this.updateCurSessionId()
    this.getMsglist()
  },
  methods: {
    enterNameCard () {
      this.$router.push({name: 'FriendCard', params: {account: this.$route.params.account}})
    },
    msgsLoaded () {
      pageUtil.scrollChatListDown()
    },
    onClickBack () {
      this.$router.go(-1)
    },
    updateCurSessionId () {
      this.$store.dispatch(types.UPDATECURSESSIONID, this.$route.params.account)
    },
    getMsglist () {
      let account = this.$route.params.account
      let currSessionMsgs = this.$store.state.currSessionMsgs
      let nim = this.$store.state.nim
      if (currSessionMsgs.length !== 0) {
        this.msglist = currSessionMsgs
      } else {
        if (!nim || nim === null) {
          this.axios({
            method: 'get',
            url: '/user/getUser',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          }).then(res => {
            if (res.data.status === 'ERROR') {
              Toast(res.data.message)
            } else {
              this.$store.dispatch(types.GETUSERINFO, res.data.result)
              this.$store.dispatch(types.INITNIMSDK, res.data.result)
              nim = this.$store.state.nim
              nim.getHistoryMsgs({
                scene: 'p2p',
                to: account,
                limit: 100,
                asc: true,
                done: (error, obj) => {
                  console.log('获取本地消息' + (!error ? '成功' : '失败'), error, obj)
                  if (obj) {
                    obj.msgs.map(item => {
                      this.$store.dispatch(types.UPDATECURSESSIONS, item)
                    })
                  }
                  this.msglist = obj.msgs
                }
              })
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          nim.getHistoryMsgs({
            scene: 'p2p',
            to: account,
            limit: 100,
            asc: true,
            done: (error, obj) => {
              console.log('获取本地消息' + (!error ? '成功' : '失败'), error, obj)
              if (obj) {
                obj.msgs.map(item => {
                  this.$store.dispatch(types.UPDATECURSESSIONS, item)
                })
              }
              this.msglist = obj.msgs
            }
          })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
$backgroundColor: #ffd200;
$fontColor: #333333;
.dinglian-message-chatList {
  margin-top: 45px;
  margin-bottom: 4rem;
}
.dinglian-message-chatList-bottombar {
  position: fixed;
  bottom: 0;
  z-index: 1000;
  background-color: #ffffff;
  min-height: 50px;
  width: 100%;
}
.dinglian-messgae-chatList-bottom {
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 0px;
  background-color: #ffffff;
}
</style>
