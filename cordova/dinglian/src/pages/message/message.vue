<template>
  <div style="width: 100%;" class="dinglian-message">
    <div class = "mui-content">
      <div class="mui-row dinglian-header-bar">
        <div class="mui-col-sm-2 mui-col-xs-2 dinglian-message-header-contacts" @click="enterContacts">
          联系人
        </div>
        <div class="mui-col-sm-8 mui-col-xs-8 dinglian-header-main">
          消息
        </div>
        <div class="mui-col-sm-2 mui-col-xs-2 dinglian-header-add" @click="addChat">
          <div class="mui-icon mui-icon-plusempty"></div>
        </div>
      </div>
      <mt-navbar v-model="selectedTab" class="dinglian-message-navbar" style="margin-top: 66px;margin-bottom: 5px;">
        <mt-tab-item id="all" @click="getChatList('all')">全部消息</mt-tab-item>
        <mt-tab-item id="activity" @click="getChatList('activity')">群聊</mt-tab-item>
        <mt-tab-item id="system" @click="getChatList('system')">系统消息</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selectedTab">
        <mt-tab-container-item id="all">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(item, index) in allMessage" :key="index" style="text-align: left;" @click="enterChatList(item.to)">
                <a href="javascript:;">
                    <img class="mui-media-object mui-pull-left" src="../../assets/images/tx.jpg">
                    <div class="mui-media-body">
                        {{item.to}}
                        <p class='mui-ellipsis'>{{item.lastMsg.text}}</p>
                    </div>
                </a>
                <span class="mui-badge" style="background-color: #ffd200; color: #ffffff;" v-if="item.unread !== 0">{{item.unread}}</span>
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="activity">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(item, index) in chatRoomList" :key="index" style="text-align: left;" @click="enterChatRoom(item.roomid)">
                <a href="javascript:;">
                    <img class="mui-media-object mui-pull-left" :src="item.broadcasturl">
                    <div class="mui-media-body">
                        {{item.name}}
                        <p class='mui-ellipsis'>{{item.announcement}}</p>
                    </div>
                </a>
                <span class="mui-badge" style="background-color: #ffd200; color: #ffffff;" v-if="item.unread !== 0">{{item.unread}}</span>
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="system">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(item, index) in systemMessage" :key="index" style="text-align: left;">
                <a href="javascript:;">
                    <div class="mui-media-body">
                        {{item.to}}
                        <p class='mui-ellipsis'>{{item.lastMsg.text}}</p>
                    </div>
                </a>
                <span class="mui-badge" style="background-color: #ffd200; color: #ffffff;" v-if="item.unread !== 0">{{item.unread}}</span>
            </li>
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

  </div>
</template>
<script>
import * as types from '../../store/mutation-types'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      searchFriendValue: '',
      selectedTab: 'all',
      allMessage: [],
      chatRoomList: [],
      systemMessage: []
    }
  },
  created () {
    this.getLocalSessions()
    this.getChatRooms()
  },
  methods: {
    getLocalSessions () {
      let nim = this.$store.state.nim
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
            this.allMessage = this.$store.state.sessionList
            this.systemMessage = this.$store.state.sysMsgs
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.allMessage = this.$store.state.sessionList
        this.systemMessage = this.$store.state.sysMsgs
      }
    },
    enterContacts () {
      this.$router.push({name: 'Contacts'})
    },
    addChat () {
      this.$router.push({name: 'AddChatroom'})
    },
    enterChatList (account) {
      this.$router.push({name: 'ChatList', params: {account: account}})
    },
    getChatRooms () {
      this.axios({
        method: 'get',
        url: '/chat/getChatRooms',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        if (res.data.status === 'ERROR') {
          Toast(res.data.message)
        } else {
          this.chatRoomList = res.data.result
        }
      }).catch(error => {
        console.log(error)
      })
    },
    enterChatRoom (roomid) {
      this.$router.push({name: 'ChatroomList', params: {roomid: roomid}})
    }
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
$backgroundColor: #ffd200;
$fontColor: #333333;
.dinglian-header-bar {
  background-color: $backgroundColor;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 8;
  text-align: center;
  color: $fontColor;
  padding-top: 20px;
}
.dinglian-message-header-contacts {
  font-size: 16px;
}
.dinglian-header-main {
  font-size: 20px;
}
.dinglian-header-add  > .mui-icon {
  font-size: 32px;
}
.dinglian-message-navbar > .mint-tab-item {
  color: $fontColor;
}
.dinglian-message-navbar > .is-selected {
  border-bottom: 2px solid $backgroundColor;
}
</style>
