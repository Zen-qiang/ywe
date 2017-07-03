<template>
<div class="dinglian-login-height">
  <mt-header title="登录" class="dinglian-login-head">
    <router-link to="/" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header>
    <div class="dinglian-login-logo"></div>
    <p class="dinglian-login-title">欢迎加入出趣浪</p>
  <div class="mui-input-row dinglian-login-tel">
    <input type="text" placeholder="请输入手机号" v-model="phoneno">
  </div>
    <div class="mui-input-row mui-password dinglian-login-psw">
      <input type="password" class="mui-input-password" placeholder="请输入密码" v-model="password">
    </div>
  <mt-button type="primary" size="large" class="dinglian-login-btn dinglian-login-head" @click="isLogin">登录</mt-button>

  <div class="clearfix dinglian-login-bottom">
    <router-link to="/forgetPassword" class="dinglian-login-bottom-left">忘记密码</router-link>
    <router-link to="/register" class="dinglian-login-bottom-right">新用户</router-link>
  </div>
    <ul class="dinglian-login-line clearfix">
      <li class="dinglian-login-line-left"></li>
      <li class="dinglian-login-line-middle">其他登录方式</li>
      <li class="dinglian-login-line-right"></li>
    </ul>

  <div class="dinglian-login-loginWay clearfix">
    <router-link to="#" class="dinglian-login-loginWay-left"><img src="../../assets/images/weixin.png" alt="微信" /></router-link>
    <router-link to="#" class="dinglian-login-loginWay-right"><img src="../../assets/images/qq.png" alt="QQ"></router-link>
  </div>
</div>

</template>
<script>
import { Toast } from 'mint-ui'
import * as types from '../../store/mutation-types'
export default {
  data () {
    return {
      phoneno: '',
      password: ''
    }
  },
  methods: {
    isLogin () {
      if (!this.phoneno || !this.password) {
        Toast('请检查账号和密码是否正确！')
      }
      let data = {
        phoneno: this.phoneno,
        password: this.password,
        type: 'username'
      }
      this.axios({
        method: 'post',
        url: '/user/login',
        data: data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      }).then(res => {
        if (res.data.status === 'ERROR') {
          Toast(res.data.message)
        } else {
          Toast('登录成功！')
          data = Object.assign(data, res.data.result)
          this.$store.commit(types.LOGIN, JSON.stringify(data))
          this.$router.push({'path': '/index'})
        }
      }
      ).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped=''>
  .dinglian-login-height {
    background-color: #ffffff;
    height: 735px;
  }
  .dinglian-login-head {
    background-color: #ffd200 ;
    color: #333333;
    margin:0 auto;
    height: 45px;
  }
  .dinglian-login-logo {
    background: url("../../assets/images/logo.png") no-repeat center center;
    width: 70px;
    height: 70px;
    margin: 30px auto 10px;
  }
  .dinglian-login-tel{
    margin-top: 30px;
    border-top:1px solid #f3f5f6;
    border-bottom:1px solid #f3f5f6;
  }
  .dinglian-login-tel input,.dinglian-login-psw input{
    border:0;
    height: 45px;
    line-height: 45px;
    margin-bottom: 0;
  }
  .dinglian-login-psw {
    border-bottom:1px solid #f3f5f6;
  }
  .dinglian-login-btn{
    width: 92%;
    margin-top: 22px;
  }
  .dinglian-login-bottom{
    font-size: 16px;
    padding-top: 16px;

  }
  .dinglian-login-bottom-left {
    float: left;
    padding-left: 4%;
    color: #d4d8dc;
  }
  .dinglian-login-bottom-right {
    float: right;
    padding-right: 4%;
    color: #d4d8dc;
  }
  .dinglian-login-line{

  }
  .dinglian-login-line li{
    list-style: none;
    float: left;
  }
   .dinglian-login-line-left{
    padding-top: 140px;
     width: 95px;
     border-bottom: 1px solid #f9f9f9;
  }
  .dinglian-login-line-middle{
    color: #838383;
    font-size: 16px;
    padding-top: 130px;
    margin:0 20px;
  }
  .dinglian-login-line-right{
    padding-top: 140px;
    width: 95px;
    border-bottom: 1px solid #f9f9f9;
  }
  .dinglian-login-loginWay{
    height: 100px;
    line-height: 100px;
  }
  .dinglian-login-loginWay-left{
    float: left;
    margin-left: 35px;
    padding-top: 20px;
  }
  .dinglian-login-loginWay-right{
    float: right;
    margin-right: 35px;
    padding-top: 20px;
  }

</style>
