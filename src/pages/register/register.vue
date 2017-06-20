<template>
  <!--注册-->
  <div>
    <mt-header fixed title="注册" class="dinglian-register-head"></mt-header>
    <mt-field class="dinglian-register-tel" label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    <mt-button type="primary" size="small">获取验证码</mt-button>
    <mt-field label="验证码" placeholder="请输入验证码" v-model="code"></mt-field>

    </mt-field><mt-button type="primary" size="large">注册</mt-button>
    <mt-footer></mt-footer>

  </div>
</template>
<script>
  export default {
  }
</script>
<style>
  .dinglian-register-tel {
    margin-top: 50px;
  }
</style>
