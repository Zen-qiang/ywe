<template>
  <div style="width: 100%;" class="dinglian-message-chatlist">
    <div class="mui-content" id="dinglian-scroll-content" style="margin-top: 45px;margin-bottom: 50px;">
      <div style="background-color: #ffd300; color: #333333;margin: 0 auto; height: 45px; position: fixed; width: 100%; z-index: 1000; top: 0;">
          <dianlian-header-bar :title="headerTitle"></dianlian-header-bar>
      </div>
      <chat-list
        type="chatroom"
        :msglist="msglist"
        :userInfos="userInfos"
        :robotInfos="robotInfos"
        :myInfo="myInfo"
        :isRobot="isRobot"
        @msgs-loaded="msgsLoaded"
      ></chat-list>
      <chat-editor
        type="chatroom"
        :scene="scene"
        :to="to"
        :isRobot="isRobot"
        @msgs-loaded="msgsLoaded"
      ></chat-editor>
      </div>
    </div>
</template>
<script>
import * as types from '../../store/mutation-types'
import ChatList from '../../components/common/ChatList'
import ChatEditor from '../../components/common/ChatEditor'
import { Toast } from 'mint-ui'
import pageUtil from '../../utils/page'
// import util from '../../utils'
import DianlianHeaderBar from '../../components/common/dianlianHeaderBar'
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
      return this.$route.params.roomid
    },
    to () {
      return this.$route.params.roomid
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
    this.getChatroomInfo()
    this.getMsglist()
  },
  methods: {
    enterNameCard () {
      this.$router.push({name: 'FriendCard', params: {account: this.$route.params.account}})
    },
    msgsLoaded () {
      pageUtil.scrollChatListDown()
    },
    getChatroomInfo () {
      let data = {
        roomid: this.$route.params.roomid
      }
      this.axios({
        method: 'post',
        url: '/chat/requestChatRoomAddr',
        data: data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      }).then(res => {
        if (res.data.status === 'ERROR') {
          Toast(res.data.message)
        } else {
          let chatRoomAddr = res.data.result.addr
          let obj = {
            chatroomId: this.$route.params.roomid,
            address: chatRoomAddr
          }
          this.$store.dispatch(types.INITCHATROOMSDK, obj)
          this.msglist = this.$store.state.currChatroomMsgs
        }
      }).catch(error => {
        console.log(error)
      })
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
