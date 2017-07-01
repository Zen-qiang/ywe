<template>
  <!--注册-->
  <div>
      <mt-header title="手机注册" class="dinglian-register-head">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="mui-input-row dinglian-register-tel">
        <input v-model="phoneno" id="phoneno" type="tel" placeholder="请输入手机号" >
      </div>


      <div class="dinglian-register-num">
        <input type="text" placeholder="请输入验证码" v-model="verifyno">
        <mt-button type="primary" size="small" class="dinglian-register-send" @click="sendVerifyno">发送验证码</mt-button>

      </div>
      <div class="mui-input-row mui-password dinglian-register-psw">
        <input id="passw1" type="password" class="mui-input-password" placeholder="请输入密码" v-model="password">
      </div>

      <mt-button type="primary" size="large" class="dinglian-register-btn dinglian-register-head" @click="isRegister">立即注册</mt-button>
      <p class="dinglian-register-term">注册即同意<router-link to="#">《出趣浪服务条款》</router-link></p>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  //  import {mapMutations} from 'vuex'
  export default {
    data () {
      return {
        phoneno: '',
        verifyno: '',
        password: ''
      }
    },
    methods: {
      sendVerifyno () {
        if (!this.phoneno) {
          Toast('手机号不能为空')
        } else {
          this.axios({
            method: 'get',
            url: '/user/sendCode',
            params: {
              phoneno: this.phoneno,
              dataType: 'register'
            }
          }).then(res => {
            console.log(res)
            let instance = Toast('验证码发送成功，请及时输入！')
            setTimeout(() => {
              instance.close()
            }, 2000)
          }).catch(error => {
            console.log(error)
          })
        }
      },
      isRegister () {
        if (!this.phoneno || !this.verifyno || !this.password) {
          Toast('验证码或者密码为空！')
        } else {
          this.axios({
            method: 'post',
            url: '/user/register',
            data: {
              phoneno: this.phoneno,
              password: this.password,
              verifyno: this.verifyno
            }}).then(res => {
              if (res.data.status === 'ERROR') {
                Toast(res.data.message)
                Object.assign(this.$data, this.$options.data())
                console.log(res)
              } else {
                Toast('注册成功！')
                console.log(res)
//                Object.assign(this.$data, this.$options.data())
                this.$router.push({'path': '/login'})
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
  .dinglian-register-head {
    background-color: #ffd200 ;
    color: #333333;
    margin:0 auto;
    height: 45px;
  }
  .dinglian-register-tel{
    margin-top: 18px;
    border-top:1px solid #f3f5f6;
    border-bottom:1px solid #f3f5f6;
  }
  .dinglian-register-num{
    background-color: #ffffff;
  }
  .dinglian-register-num input{
    width: 70%;
  }
  .dinglian-register-send{
    width: 88px;
    height: 32px;
    background-color: #ffd202;
    color: #947f26;
    margin:8px auto;
  }
  .dinglian-register-psw{
    border-top:1px solid #f3f5f6;
    border-bottom:1px solid #f3f5f6;
  }
  .dinglian-register-tel input,.dinglian-register-psw input,.dinglian-register-num input{
    border:0;
    height: 45px;
    line-height: 45px;
    margin-bottom: 0;
  }
  .dinglian-register-btn{
    width: 92%;
    margin-top: 22px;
  }
  .dinglian-register-term{
    margin-top: 20px;

  }
</style>
