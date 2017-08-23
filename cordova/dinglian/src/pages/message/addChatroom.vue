<template>
  <div style="width: 100%;">
    <div class="mui-content dinglian-addFriend">
      <dianlian-header-bar :title="headerTitle" :rollUrl="none"></dianlian-header-bar>
        <div class="mui-row" style="margin-top: 67px;">
            <div class="mui-col-sm-10">
              <div class="mui-input-row mui-search">
                  <input type="search" class="mui-input-clear" placeholder="聊天室的账号" v-model="searchChatroomid">
              </div>
            </div>
            <div class="mui-col-sm-2">
              <button type="button" class="mui-btn mui-btn-outlined" @click="searchChatroom()">搜索账号</button>
            </div>
        </div>
        <mt-popup
          v-model="showPopup"
          popup-transition="popup-fade"
          closeOnClickModal = false
          position = "right"
          >
          <slot style="width: 100%;height:100%;">
            <mt-header title="获取聊天室地址" class="dinglian-header-bar">
              <router-link to = "" slot="left">
                <mt-button icon="back" @click="closePopup()"></mt-button>
              </router-link>
            </mt-header>
            <div class="mui-row" style="width: 100%;height: 40px;margin-top: 45px;" v-if="chatRoomAddr.length === 0">
              <span style>{{chatRoomInfo.roomid && chatRoomInfo.valid ? chatRoomInfo.roomid : '该聊天室不存在'}}</span>
            </div>
            <mt-button type="default" size="large" class="dianlian-logout-button" @click="addChatRoom"  v-if="chatRoomAddr.length === 0">获取聊天室令牌</mt-button>
            <ul class="mui-table-view" style="width: 100%;margin-top: 45px;" v-if="chatRoomAddr.length !== 0">
                <li class="mui-table-view-cell" v-for="(item, index) in chatRoomAddr" :key="index">{{item}}</li>
            </ul>
          </slot>
        </mt-popup>
    </div>
  </div>
</template>
<script>
// import * as types from '../../store/mutation-types'
import DianlianHeaderBar from '../../components/common/dianlianHeaderBar'
import { Toast } from 'mint-ui'
export default {
  components: { DianlianHeaderBar },
  data () {
    return {
      headerTitle: '获取聊天室地址',
      searchChatroomid: '',
      chatRoomInfo: {},
      chatRoomList: [],
      showPopup: false,
      chatRoomAddr: [],
      none: ''
    }
  },
  methods: {
    searchChatroom () {
      this.showPopup = true
      if (this.searchfriend === '') {
        Toast('请输入聊天室账号！')
        return
      }
      this.axios({
        method: 'get',
        url: '/chat/getChatRoom?roomid=' + this.searchChatroomid,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      }).then(res => {
        if (res.data.status === 'ERROR') {
          Toast(res.data.message)
        } else {
          this.chatRoomInfo = res.data.result
        }
      }).catch(error => {
        console.log(error)
      })
    },
    addChatRoom () {
      if (this.chatRoomInfo.roomid && this.chatRoomInfo.valid) {
        let data = {
          roomid: this.searchChatroomid
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
            this.chatRoomAddr = res.data.result.addr
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        Toast('请输入正确的房间号！')
      }
    },
    closePopup () {
      this.chatRoomAddr = []
      this.showPopup = false
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
  height: 45px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 8;
  text-align: center;
  color: $fontColor;
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
.dinglian-addFriend > .mint-popup {
  height: 100%;
  width: 100%;
}
</style>
