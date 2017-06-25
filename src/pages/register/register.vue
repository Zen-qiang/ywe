<template>
  <!--注册-->
  <div>
    <mt-header title="手机注册" class="dinglian-register-head">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="mui-input-row dinglian-register-tel">
      <input type="text" placeholder="请输入手机号">
    </div>


    <div class="dinglian-register-num">
      <input type="text" placeholder="请输入验证码">
      <mt-button type="primary" size="small" class="dinglian-register-send">发送验证码</mt-button>
    </div>

    <div class="mui-input-row mui-password dinglian-register-psw">
      <input type="password" class="mui-input-password" placeholder="请输入密码">
    </div>

    <mt-button type="primary" size="large" class="dinglian-register-btn dinglian-register-head">立即注册</mt-button>
    <p class="dinglian-register-term">注册即同意<router-link to="#">《出趣浪服务条款》</router-link></p>

  </div>
</template>
<script>
  export default {
  }
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
