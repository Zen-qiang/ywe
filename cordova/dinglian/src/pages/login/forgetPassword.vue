<template>
  <!--注册-->
  <div class="dinglian-forgetPassword-all">
    <mt-header title="找回密码" class="dinglian-forgetPassword-head">
      <router-link to="/login" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="mui-input-row dinglian-forgetPassword-tel">
      <input type="tel" placeholder="请输入手机号" v-model="phoneno" @blur="judgmentTel(phoneno)" />
    </div>


    <div class="dinglian-forgetPassword-num">
      <input type="text" placeholder="请输入验证码" v-model="verifyno">
      <mt-button type="primary" size="small" class="dinglian-forgetPassword-send" @click="sendForgot">{{btn}}</mt-button>
    </div>

    <div class="mui-input-row mui-password dinglian-forgetPassword-psw">
      <input type="password" class="mui-input-password" @blur="judgmentpsw(newPassword)" placeholder="请输入密码 ( 6-12位密码，字母，符号 )" v-model="newPassword">
    </div>

    <mt-button type="primary" size="large" class="dinglian-forgetPassword-btn dinglian-forgetPassword-head" @click="isRresetPassword">更改密码</mt-button>


  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import {judgmentTel, judgmentpsw} from '../../assets/js/tool'
  export default {
    data () {
      return {
        phoneno: '',
        verifyno: '',
        newPassword: '',
        btn: '发送验证码'
      }
    },
    methods: {
      sendForgot () {
        if (judgmentTel(this.phoneno)) {
          let num = 60
          let timer = null
          this.axios({
            method: 'get',
            url: '/user/sendCode',
            params: {
              phoneno: this.phoneno,
              dataType: 'forgot'
            }
          }).then(res => {
            clearInterval(timer)
            let instance = Toast('验证码发送成功，请及时输入！')
            setTimeout(() => {
              instance.close()
            }, 2000)
            /* 验证码倒计时 */
            this.isDisabled = true
            timer = setInterval(() => {
              num--
              this.btn = num + '秒后发送'
              if (num === 0 || this.phoneno === '') {
                clearInterval(timer)
                this.isDisabled = false
                num = 60
                this.btn = '发送验证码'
              }
            }, 1000)
          }).catch(error => {
            console.log(error)
          })
        }
      },
      isRresetPassword () {
        if (judgmentTel(this.phoneno) && judgmentpsw(this.newPassword)) {
          this.axios({
            method: 'post',
            url: '/user/resetPassword',
            data: {
              phoneno: this.phoneno,
              newPassword: this.newPassword,
              verifyno: this.verifyno
            }}).then(res => {
              if (res.data.status === 'ERROR') {
                Toast(res.data.message)
                Object.assign(this.$data, this.$options.data())
                console.log(res)
              } else {
                Toast('修改密码成功！')
                console.log(res)
                Object.assign(this.$data, this.$options.data())
                this.$router.push({'path': '/index'})
              }
            }
          ).catch(error => {
            console.log(error)
          })
        }
      }
    }}
</script>
<style scoped>
  .dinglian-forgetPassword-all {
    width: 100%;
    position: fixed;
    z-index: 8;
  }
  .dinglian-forgetPassword-head {
    background-color: #ffd200 ;
    color: #333333;
    margin:0 auto;
    height: 44px;
    font-size: 17px;
  }
  .dinglian-forgetPassword-tel{
    margin-top: 15px;
    border-top:1px solid #f3f5f6;
    border-bottom:1px solid #f3f5f6;
    background-color: #ffffff;
  }
  .dinglian-forgetPassword-tel input {
    background: url(../../assets/images/people.svg) no-repeat 10px center;
    background-size: 20px 20px;
  }
  .dinglian-forgetPassword-psw input {
    background: url(../../assets/images/key.svg) no-repeat 10px center;
    background-size: 20px 20px;
  }
  .dinglian-forgetPassword-num{
    background-color: #ffffff;
    position: relative;
    height: 44px;
  }
  .dinglian-forgetPassword-num input{
    background: url(../../assets/images/people.svg) no-repeat 10px center;
    background-size: 20px 20px;
    width: 20rem;
    position: absolute;
    left: 0;
  }
  .dinglian-forgetPassword-send{
    width: 88px;
    height: 32px;
    background-color: #ffd200;
    color: #333333;
    font-size: 13px;
    position: absolute;
    z-index: 9;
    top: 0.5rem;
    right: 0.5rem;
  }
  .dinglian-forgetPassword-psw{
    border-top:1px solid #f3f5f6;
    border-bottom:1px solid #f3f5f6;
    background-color: #ffffff;
  }
  .dinglian-forgetPassword-tel input,.dinglian-forgetPassword-psw input,.dinglian-forgetPassword-num input{
    border:0;
    height: 44px;
    line-height: 44px;
    margin-bottom: 0;
    font-size: 14px;
    padding-left: 10%;
  }
  .dinglian-forgetPassword-btn{
    width: 92%;
    margin-top: 20px;
    font-size: 16px;
    color: #333333;
  }
</style>
