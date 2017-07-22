<template>
  <div style="width: 100%;">
    <div class="mui-content dinglian-account">
      <!-- account页面 header bar -->
      <div class="mui-row dinglian-account-header-bar">
        <div class="mui-col-sm-2 mui-col-xs-2 dinglian-account-header-scan">
          <img src="../../assets/images/scan.png" class="dinglian-account-header-scan-image"/>
        </div>
        <div class="mui-col-sm-10 mui-col-xs-10 dinglian-account-header-title">
          <span>我的</span>
        </div>
      </div>
      <div class="dinglian-account-content">
        <div class="mui-row" style="height:12px;width:100%;background-color:transparent"></div>
        <!-- 我的信息 开始 -->
        <ul class="mui-table-view">
          <li class="mui-table-view-cell dinglian-user-info-cell">
              <a class="mui-navigate-right dinglian-user-info">
                  <img class="mui-media-object mui-pull-left" :src="userInfo.picture" />
                  <div class="mui-media-body">
                      <span v-if="userInfo.nickname && userInfo.nickname !== null">{{userInfo.nickname}}</span>
                      <span v-else>{{userInfo.phoneno}}</span>
                      <p class='mui-ellipsis'>{{userInfo.signLog}}</p>
                  </div>
              </a>
          </li>
        </ul>
      </div>
      <!-- 我的信息 结束 -->
      <div class="mui-row" style="height:12px;width:100%;background-color:transparent"></div>
      <!-- 我的活动信息 开始 -->
      <div class="mui-row" style="background-color:#fff;height: 40px;dispaly:center; align-items: center;">
        <div class="mui-col-sm-6 mui-col-xs-6 dianlian-account-activity" @click="goMyActivity">
            <img src="../../assets/images/account-address.png" width="25px" height="25px"/>
            <span>我发起的活动</span>
        </div>
        <div class="mui-col-sm-6 mui-col-xs-6 dianlian-account-activity">
          <img src="../../assets/images/redFlag.png" width="25px" height="25px"/>
          <span>我参与的活动</span>
        </div>
      </div>
      <!-- 我的活动信息 结束 -->
      <!-- 我的列表栏 开始 -->
      <div class="mui-row dianlian-account-list-row">
        <div class="mui-col-sm-3 mui-col-xs-3 dianlian-account-list">
            附近活动
        </div>
        <div class="mui-col-sm-3 mui-col-xs-3 dianlian-account-list">
            发现动态
        </div>
        <div class="mui-col-sm-3 mui-col-xs-3 dianlian-account-list">
            消息管理
        </div>
        <div class="mui-col-sm-3 mui-col-xs-3 dianlian-account-list">
          我的相册
        </div>
      </div>
      <!-- 我的列表栏 结束 -->
      <div class="mui-row" style="height:12px;width:100%;background-color:transparent"></div>
        <!-- 我的签名开始 -->
        <mt-cell title="我的签名" is-link to="changeSignlog"></mt-cell>
        <!-- 我的签名结束 -->
        <!-- 收藏 开始 -->
        <mt-cell title="收藏" is-link></mt-cell>
        <!-- 收藏 结束 -->
        <!-- 设置 开始 -->
        <mt-cell title="设置" is-link to="setting"></mt-cell>
        <!-- 设置 结束 -->
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      userInfo: {},
      defaultAvter: 'this.src="' + require('../../assets/images/tx.jpg') + '"'
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.axios({
        method: 'get',
        url: '/user/getUser',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        if (res.data.status === 'ERROR') {
          Toast(res.data.message)
        } else {
          this.userInfo = res.data.result
          console.log(this.userInfo.picture)
          if (this.userInfo.picture || this.userInfo.picture === null) {
            this.userInfo.picture = '../../assets/images/tx.jpg'
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    goMyActivity () {
      console.log('sss')
      this.$router.push({'path': '/myActivityList'})
    }
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
@import '../../assets/css/account.scss'
</style>
