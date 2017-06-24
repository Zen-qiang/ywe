<template>
<div>
  <div class="dinglian-login-logo"></div>
  <div class="mui-input-row">
    <label>手机号</label>
    <input type="text" placeholder="请输入手机号">
  </div>
  <div class="mui-input-row">
    <label>验证码</label>
    <input type="text" placeholder="请输入验证码">
  </div>
    <div class="mui-input-row mui-password">
      <label>密码</label>
      <input type="password" class="mui-input-password">
    </div>
  </mt-field><mt-button type="primary" size="large">确认</mt-button>
  <div class="dinglian-login-third">
    <ul class="clearfix">
    <li><router-link to="#">QQ</router-link></li>
    <li><router-link to="#">微信</router-link></li>
    <li><router-link to="#">支付宝</router-link></li>
    <li><router-link to="#">微博</router-link></li>
    </ul>
  </div>
  <div>
    <router-link to="#">忘记密码</router-link>
    <router-link to="#">新用户</router-link>
  </div>

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

