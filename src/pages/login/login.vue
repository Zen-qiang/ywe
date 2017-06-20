<template>
<div>
  <div class="dinglian-login-logo"></div>
  <mt-field class="dinglian-login-tel" label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>

  <mt-field class="dinglian-login-code" label="验证码" v-model="captcha">

  </mt-field><mt-button type="primary" size="large">确认</mt-button>
  <div class="dinglian-login-third">
    <ul class="clearfix">
    <li><router-link to="#">QQ</router-link></li>
    <li><router-link to="#">微信</router-link></li>
    <li><router-link to="#">支付宝</router-link></li>
    <li><router-link to="#">微博</router-link></li>
    </ul>
  </div>
  <mt-footer>
    <router-link to="#">忘记密码</router-link>
    <router-link to="#">新用户</router-link>
  </mt-footer>

</div>

</template>
<script>
export default {

}
</script>
<style>
  .clearfix:after {
    content: " ";
    border:0;
    display: block;
    clear: both;
    visibility: hidden;
  }
  .dinglian-login-logo {
    width: 100px;
    height: 100px;
    background: #ffffff;
    margin:0 auto;
  }
  .dinglian-login-tel{
    background: #ffffff;
  }
  .dinglian-login-code {
    background: #ffffff;
  }
  .dinglian-login-third li {
    float: left;
    list-style: none;
    margin-left: 10px;
  }
</style>

