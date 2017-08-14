<template>
  <!--注册-->
  <div>
      <!--<mt-header title="手机注册" class="dinglian-register-head">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>-->
      <dianlian-header-bar :title="headerTitle" :rollUrl="rollUrl"></dianlian-header-bar>
      <div class="mui-input-row dinglian-register-tel">
        <input v-model="phoneno" id="phoneno" type="tel" placeholder="请输入手机号">
      </div>


      <div class="dinglian-register-num">
        <input type="text" placeholder="请输入验证码" v-model="verifyno">
        <mt-button type="primary" size="small" class="dinglian-register-send" @click="sendVerifyno" :disabled="isDisabled" v-model="btn">{{btn}}</mt-button>

      </div>
      <div class="mui-input-row mui-password dinglian-register-psw">
        <input id="passw1" type="password" class="mui-input-password" placeholder="请输入密码" v-model="password">
      </div>

      <div class="mui-input-row mui-password dinglian-register-psw">
        <input type="password" class="mui-input-password" placeholder="请再输入一次密码" v-model="morePassword">
      </div>

      <mt-button type="primary" size="large" class="dinglian-register-btn" @click="isRegister">立即注册</mt-button>
      <p class="dinglian-register-term">注册即同意<router-link to="#">《出趣浪服务条款》</router-link></p>
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
        verifyno: '',
        password: '',
        morePassword: '',
        btn: '发送验证码',
        isDisabled: false,
        headerTitle: '手机注册',
        rollUrl: ''
      }
    },
    methods: {
//        发送验证码
      sendVerifyno () {
        if (!this.phoneno) {
          Toast('手机号不能为空')
        } else {
          if (judgmentTel(this.phoneno)) {
            let data = {
              phoneno: this.phoneno,
              dataType: 'register'
            }
            let num = 60
            let timer = null
            this.axios({
              method: 'get',
              url: '/user/sendCode',
              params: data
            }).then(res => {
              console.log(res)
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
        }
      },
//      注册
      isRegister () {
        if (judgmentTel(this.phoneno) && judgmentpsw(this.password)) {
          if (this.password !== this.morePassword) {
            Toast({
              message: '两次输入的密码不一致！',
              duration: 500
            })
            return
          }
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
                    Toast({
                      message: '登录成功！',
                      duration: 500
                    })
                    this.$store.commit(types.LOGIN, JSON.stringify(data))
                    this.$router.push({'path': '/index'})
                  }
                }
                ).catch(error => {
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
    }}
</script>
<style scoped>
  .dinglian-register-tel{
    margin-top: 70px;
    border-top:1px solid #f3f5f6;
    border-bottom:1px solid #f3f5f6;
    background-color: #ffffff;
  }
  .dinglian-register-num{
    background-color: #ffffff;
    position: relative;
    height: 44px;
  }
  .dinglian-register-tel input {
    background: url(../../assets/images/people.svg) no-repeat 10px center;
    background-size: 20px 20px;
  }
  .dinglian-register-psw input {
    background: url(../../assets/images/key.svg) no-repeat 10px center;
    background-size: 20px 20px;
  }
  .dinglian-register-num input{
    background: url(../../assets/images/people.svg) no-repeat 10px center;
    background-size: 20px 20px;
    width: 20rem;
    position: absolute;
    left: 0;
  }
  .dinglian-register-send{
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
  .dinglian-register-psw{
    border-top:1px solid #f3f5f6;
    border-bottom:1px solid #f3f5f6;
    background-color: #ffffff;
  }
  .dinglian-register-tel input,.dinglian-register-psw input,.dinglian-register-num input{
    border:0;
    height: 44px;
    line-height: 44px;
    margin-bottom: 0;
    font-size: 14px;
    padding-left: 10%;
  }
  .dinglian-register-btn{
    width: 92%;
    margin-top: 20px;
    font-size: 16px;
    color: #333333;
    background-color: #ffd200 ;
    margin-left: 4%;
  }
  .dinglian-register-term{
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
  }
</style>
