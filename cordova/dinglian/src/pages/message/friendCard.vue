<template>
  <div style="width: 100%;">
    <div class="mui-content dinglian-message-friendCard">
      <dianlian-header-bar :title="headerTitle"></dianlian-header-bar>
      <div class="mui-row" style="margin-top: 45px;display: flex;align-items: center;justify-content: center;">
        <div style="width: 80px;height: 80px;border: 1px solid #e0e0e0;">
          <img src="../../assets/images/circle.png" style="width: 100%;height: 100%;border-radius: 10px;"></img>
        </div>
      </div>
      <div class="mui-row dinglian-message-friendCard-row">
        <div class="mui-col-sm-4 mui-col-xs-4">账号:</div>
        <div class="mui-col-sm-8 mui-col-xs-8">{{friendInfo.accid}}</div>
      </div>
      <div class="mui-row dinglian-message-friendCard-row" v-if="friendInfo.nickname && friendInfo.nickname != ''">
        <div class="mui-col-sm-4 mui-col-xs-4">昵称:</div>
        <div class="mui-col-sm-8 mui-col-xs-8">{{friendInfo.nickname}}</div>
      </div>
      <div class="mui-row dinglian-message-friendCard-row" v-if="friendInfo.phoneno">
        <div class="mui-col-sm-4 mui-col-xs-4">手机:</div>
        <div class="mui-col-sm-8 mui-col-xs-8">{{friendInfo.phoneno}}</div>
      </div>
      <div class="mui-row dinglian-message-friendCard-row" v-if="friendInfo.signLog">
        <div class="mui-col-sm-4 mui-col-xs-4">签名:</div>
        <div class="mui-col-sm-8 mui-col-xs-8">{{friendInfo.signLog}}</div>
      </div>
      <mt-button type="default" size="large" class="dianlian-message-friendCard-button" @click="enterChatList()">发信息</mt-button>
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
      headerTitle: '好友详情',
      friendInfo: {}
    }
  },
  created () {
    this.getFriendCard()
  },
  methods: {
    getFriendCard () {
      this.axios({
        method: 'get',
        url: '/user/getUserInfo?accid=' + this.$route.params.account,
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
    enterChatList () {
      this.$router.push({name: 'ChatList', params: {account: this.$route.params.account}})
    }
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
$backgroundColor: #ffd200;
$fontColor: #333333;
.dinglian-message-friendCard-row {
  background-color: #ffffff;
  margin-top: 10px;
  height: 50px;
  display: flex;
  align-items: center;
}
.dianlian-message-friendCard-button {
  background-color: $backgroundColor;
  color: #ffffff;
}
</style>
