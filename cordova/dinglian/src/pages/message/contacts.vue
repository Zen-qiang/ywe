<template>
  <div style="width: 100%;" class="dinglian-contacts">
    <div class = "mui-content">
      <div class="mui-row dinglian-header-bar">
        <div class="mui-col-sm-2 mui-col-xs-2 dinglian-message-header-contacts">
          <router-link to = "" slot="left">
            <mt-button icon="back" @click="historyBack"></mt-button>
          </router-link>
        </div>
        <div class="mui-col-sm-8 mui-col-xs-8 dinglian-header-main">
          联系人
        </div>
        <div class="mui-col-sm-2 mui-col-xs-2 dinglian-header-add" @click="addFriend">
          <div class="mui-icon mui-icon-plusempty"></div>
        </div>
      </div>
      <mt-cell class="dinglian-cell-left" title="新朋友" is-link to="newFriends" style="margin-top: 45px"></mt-cell>
      <mt-cell class="dinglian-cell-left" title="我关注的" is-link to="followFriends"></mt-cell>
      <mt-cell class="dinglian-cell-left" title="我的粉丝" is-link to="myFans"></mt-cell>
      <div class="mui-row" style="height: 20px;">我的好友</div>
      <div   v-for="(item, index) in friendslist" :key="index">
        <mt-cell-swipe
        :icon="item.icon"
        :title="item.accid"
        :to="'friendCard/' + item.accid "
        :right="[
        {
          content: '删除',
          style: { background: 'red', color: '#fff' },
          handler: () => this.$messagebox('delete')
        }
        ]" class="dinglian-cell-left"></mt-cell-swipe>
      </div>
    </div>
  </div>
</template>
<script>
import * as types from '../../store/mutation-types'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
    }
  },
  computed: {
    friendslist () {
      return this.$store.state.friendslist
    }
  },
  created () {
    let friendslist = this.$store.state.friendslist
    if (friendslist.length === 0) {
      this.getFriendsList()
    }
  },
  methods: {
    historyBack () {
      this.$router.go(-1)
    },
    addFriend () {
      this.$router.push({ path: 'addFriend' })
    },
    getFriendsList () {
      this.axios({
        method: 'get',
        url: '/user/getContacts',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        if (res.data.status === 'ERROR') {
          Toast(res.data.message)
        } else {
          this.friendsList = res.data.result
          this.$store.commit(types.UPDATEFRIENDSLIST, res.data.result)
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
.dinglian-header-bar{
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
.dinglian-message-header-contacts button{
  background-color: $backgroundColor;
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
.dinglian-cell-left {
  text-align: left;
}
</style>
