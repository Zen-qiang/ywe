<template>
  <!--注册-->
  <div>
    <mt-header title="找回密码" class="dinglian-forgetPassword-head">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="mui-input-row dinglian-forgetPassword-tel">
      <input type="text" placeholder="请输入手机号">
    </div>


    <div class="dinglian-forgetPassword-num">
      <input type="text" placeholder="请输入验证码">
      <mt-button type="primary" size="small" class="dinglian-forgetPassword-send">发送验证码</mt-button>
    </div>

    <div class="mui-input-row mui-password dinglian-forgetPassword-psw">
      <input type="password" class="mui-input-password" placeholder="请输入密码 ( 6-12位密码，字母，符号 )">
    </div>

    <mt-button type="primary" size="large" class="dinglian-forgetPassword-btn dinglian-forgetPassword-head">更改密码</mt-button>


  </div>
</template>
<script>
  export default {
  }
</script>
<style scoped>
  .dinglian-forgetPassword-head {
    background-color: #ffd200 ;
    color: #333333;
    margin:0 auto;
    height: 45px;
  }
  .dinglian-forgetPassword-tel{
    margin-top: 18px;
    border-top:1px solid #f3f5f6;
    border-bottom:1px solid #f3f5f6;
  }
  .dinglian-forgetPassword-num{
    background-color: #ffffff;
  }
  .dinglian-forgetPassword-num input{
    width: 70%;
  }
  .dinglian-forgetPassword-send{
    width: 88px;
    height: 32px;
    background-color: #ffd202;
    color: #947f26;
    margin:8px auto;
  }
  .dinglian-forgetPassword-psw{
    border-top:1px solid #f3f5f6;
    border-bottom:1px solid #f3f5f6;
  }
  .dinglian-forgetPassword-tel input,.dinglian-forgetPassword-psw input,.dinglian-forgetPassword-num input{
    border:0;
    height: 45px;
    line-height: 45px;
    margin-bottom: 0;
  }
  .dinglian-forgetPassword-btn{
    width: 92%;
    margin-top: 22px;
  }
</style>
