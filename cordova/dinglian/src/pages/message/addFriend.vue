<template>
  <div style="width: 100%;">
    <div class="mui-content dinglian-addFriend">
      <dianlian-header-bar :title="headerTitle"></dianlian-header-bar>
        <div class="mui-row" style="margin-top: 67px;">
            <div class="mui-col-sm-10">
              <div class="mui-input-row mui-search">
                  <input type="search" class="mui-input-clear" placeholder="输入需要查找的账号" v-model="searchfriend">
              </div>
            </div>
            <div class="mui-col-sm-2">
              <button type="button" class="mui-btn mui-btn-outlined" @click="searchFriend()">搜索账号</button>
            </div>
        </div>
        <mt-popup
          v-model="showPopup"
          popup-transition="popup-fade"
          closeOnClickModal = false
          position = "right"
          >
          <slot style="width: 100%;height:100%;">
            <mt-header title="添加好友" class="dinglian-header-bar">
              <router-link to = "" slot="left">
                <mt-button icon="back" @click="closePopup()"></mt-button>
              </router-link>
            </mt-header>
            <div class="mui-row" style="width: 100%;height: 40px;margin-top: 45px;">
              <span style>{{friendInfo.accid?friendInfo.accid:'该用户不存在'}}</span>
            </div>
            <mt-button type="default" size="large" class="dianlian-logout-button" @click="addFriend">加为好友</mt-button>
          </slot>
        </mt-popup>
    </div>
  </div>
</template>
<script>
import * as types from '../../store/mutation-types'
import DianlianHeaderBar from '../../components/common/dianlianHeaderBar'
import { Toast } from 'mint-ui'
export default {
  components: { DianlianHeaderBar },
  data () {
    return {
      headerTitle: '查找好友',
      searchfriend: '',
      friendInfo: {},
      friendsList: [],
      showPopup: false
    }
  },
  created () {
    let friendslist = this.$store.state.friendslist
    if (friendslist.length === 0) {
      this.getFriendsList()
    }
  },
  methods: {
    getFriendsList () {
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
            nim.getFriends({
              done: (error, friends) => {
                console.log('获取好友列表' + (!error ? '成功' : '失败'), error, friends)
                if (!error) {
                  this.friendsList = friends
                  this.$store.state.friendslist = friends
                  console.log(this.friendsList)
                  //  onFriends(friends)
                }
              }
            })
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        nim.getFriends({
          done: (error, friends) => {
            console.log('获取好友列表' + (!error ? '成功' : '失败'), error, friends)
            if (!error) {
              this.friendsList = friends
              this.$store.state.friendslist = friends
              console.log(this.friendsList)
              //  onFriends(friends)
            }
          }
        })
      }
    },
    filterFriends () {
    },
    searchFriend () {
      this.showPopup = true
      if (this.searchfriend === '') {
        Toast('请输入对方账号！')
        return
      }
      this.axios({
        method: 'get',
        url: '/user/getUserInfo?accid=' + this.searchfriend,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      }).then(res => {
        if (res.data.status === 'ERROR') {
          Toast(res.data.message)
        } else {
          this.friendInfo = res.data.result
        }
      }).catch(error => {
        console.log(error)
      })
    },
    addFriend () {
      if (!this.friendInfo.accid) {
        Toast('请输入正确的对方账号！')
        return
      }
      let data = {
        faccid: this.searchfriend,
        type: 1,
        msg: ''
      }
      this.axios({
        method: 'post',
        url: '/chat/addFriend',
        data: data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      }).then(res => {
        if (res.data.status === 'ERROR') {
          Toast(res.data.message)
        } else {
          Toast('添加好友成功！')
          this.$store.state.friendslist.push(res.data.result)
          this.showPopup = false
        }
      }).catch(error => {
        console.log(error)
      })
    },
    closePopup () {
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
