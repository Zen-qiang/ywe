<template>
<div class="dinglian-login-height">
  <dianlian-header-bar :title="headerTitle" :rollUrl="headRollUrl"></dianlian-header-bar>
    <div class="dinglian-login-logo">
      <img src="../../assets/images/logo.png" alt="出趣浪">
    </div>
    <p class="dinglian-login-title">欢迎加入出趣浪</p>
  <div class="mui-input-row dinglian-login-tel">
    <input type="tel" placeholder="请输入手机号" v-model="phoneno" autofocus />
  </div>
    <div class="mui-input-row mui-password dinglian-login-psw">
      <input type="password" class="mui-input-password" placeholder="请输入密码" v-model="password" />
    </div>
  <mt-button type="primary" size="large" class="dinglian-login-btn" @click="isLogin">登录</mt-button>

  <div class="clearfix dinglian-login-bottom">
    <router-link to="/forgetPassword" class="dinglian-login-bottom-left">忘记密码</router-link>
    <router-link to="/register" class="dinglian-login-bottom-right">新用户</router-link>
  </div>
  <div>
      <ul class="dinglian-login-line clearfix">
        <li class="dinglian-login-line-left"></li>
        <li class="dinglian-login-line-middle">其他登录方式</li>
        <li class="dinglian-login-line-right"></li>
      </ul>
    <div class="dinglian-login-loginWay clearfix">
      <router-link to="#" class="dinglian-login-loginWay-left"><img src="../../assets/images/weixin.svg" alt="微信" /></router-link>
      <router-link to="#" class="dinglian-login-loginWay-right"><img src="../../assets/images/qq.svg" alt="QQ"></router-link>
    </div>
  </div>
</div>
</template>
<script>
import { Toast } from 'mint-ui'
import * as types from '../../store/mutation-types'
import {judgmentTel, judgmentpsw} from '../../assets/js/tool'
import DianlianHeaderBar from '../../components/common/dianlianHeaderBar.vue'
export default {
  components: {
    DianlianHeaderBar
  },
  data () {
    return {
      phoneno: '',
      password: '',
      headerTitle: '登录',
      headRollUrl: '/index'
    }
  },
  methods: {
    isLogin () {
      let data = {
        phoneno: this.phoneno,
        password: this.password,
        type: 'username'
      }
      if (judgmentTel(this.phoneno) && judgmentpsw(this.password)) {
        this.axios({
          method: 'post',
          url: '/user/login',
          data: data,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true
        }).then(res => {
          if (res.data.status === 'ERROR') {
            Toast(res.data.message)
//          this.$store.commit(types.LOGIN, JSON.stringify(data))
//          this.$router.push({'path': '/index'})
          } else {
            Toast({
              message: '登录成功！',
              duration: 500
            })
            // data = Object.assign(data, res.data.result)
            this.$store.commit(types.LOGIN, JSON.stringify(data))
            // init nim SDK
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
              }
            }).catch(error => {
              console.log(error)
            })
            this.$router.push({'path': '/index'})
          }
        }
        ).catch(error => {
          console.log(error)
        })
      }
    }
  }
}
</script>
<style scoped>
  div {
    margin-top: 0;
  }
  .dinglian-login-height {
    background-color: #ffffff;
    width: 100%;
    height: 6.67rem;
    box-sizing: border-box;
    padding-top: 0.64rem;
  }
  .dinglian-login-logo {
    width: 100%;
    text-align: center;
    padding-top: 0.29rem;
    padding-bottom: 0.1rem;
  }
  .dinglian-login-logo > img {
    width: 0.69rem;
    height: 0.69rem;
  }
  .dinglian-login-title {
    text-align: center;
    padding-bottom: 0.3rem;
    font-size: 0.14rem;
    color: #333333;
    margin-bottom: 0;
  }
  .dinglian-login-tel{
    border-top:1px solid #f3f5f6;
    border-bottom:1px solid #f3f5f6;

  }
  .dinglian-login-tel input,.dinglian-login-psw input{
    border:0;
    height: 0.44rem;
    line-height: 0.44rem;
    margin-bottom: 0;
    font-size: 0.14rem;
    padding-left: 0.45rem;
  }
  .dinglian-login-tel input {
    background: url(../../assets/images/people.svg) no-repeat 0.1rem center;
    background-size: 0.2rem 0.2rem;
  }
  .dinglian-login-psw input {
    background: url(../../assets/images/key.svg) no-repeat 0.1rem center;
    background-size: 0.2rem 0.2rem;
  }
  .dinglian-login-psw {
    border-bottom:1px solid #f3f5f6;
  }
  .dinglian-login-btn{
    width: 92%;
    margin-top: 0.2rem;
    margin-left: 4%;
    background-color: #ffd200;
    color: #333333;
  }
  .dinglian-login-bottom{
    font-size: 0.13rem;
    padding-top: 0.15rem;
  }
  .dinglian-login-bottom-left {
    float: left;
    padding-left: 4%;
    color: #999999;
  }
  .dinglian-login-bottom-right {
    float: right;
    padding-right: 4%;
    color: #999999;
  }
  .dinglian-login-line{
    width: 100%;
    padding-left: 15%;
    text-align: center;

  }
  .dinglian-login-line li{
    list-style: none;
    float: left;
  }
   .dinglian-login-line-left{
     padding-top: 0.9rem;
     width: 20%;
     border-bottom: 1px solid #f9f9f9;
  }
  .dinglian-login-line-middle{
    color: #999999;
    font-size: 0.14rem;
    padding-top: 0.8rem;
    margin:0 0.2rem;
    width: 30%;
    min-width: 0.7rem;
  }
  .dinglian-login-line-right{
    padding-top: 0.9rem;
    width: 20%;
    border-bottom: 1px solid #f9f9f9;
  }
  .dinglian-login-loginWay{
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    padding-bottom: 0.2rem;
  }
  .dinglian-login-loginWay-left{
    float: left;
    margin-left: 0.3rem;
    padding-top: 0.1rem;

  }
  .dinglian-login-loginWay-left > img {
    width: 0.55rem;
    height: 0.44rem;
  }
  .dinglian-login-loginWay-right{
    float: right;
    margin-right: 0.3rem;
    padding-top: 0.1rem;
  }
  .dinglian-login-loginWay-right > img {
    width: 0.44rem;
    height: 0.41rem;
    margin-bottom: 0.4rem;
  }


</style>
