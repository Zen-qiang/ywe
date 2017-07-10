<template>
  <div>
    <!--报名失败-->
    <mt-header title="报名失败" class="dinglian-registrationFailed-head">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div>

    </div>
    <!--底部按钮start-->
    <div class="dinglian-registrationFailed-bottom">
      <mt-button type="danger" class="dinglian-registrationFailed-bottom-left" @click="returnBfo">返回订单</mt-button>
      <mt-button type="danger" class="dinglian-registrationFailed-bottom-right">重新支付</mt-button>

    </div>
    <!--底部按钮end-->
  </div>
</template>
<script>
  export default{
    data () {
      return {}
    },
    methods: {
      returnBfo () {
        history.back()
      }
    }
  }
</script>
<style scoped>
  .dinglian-registrationFailed-head {
    background-color: #ffd200 ;
    color: #333333;
    margin:0 auto;
    height: 45px;
  }
  .dinglian-registrationFailed-bottom {
    position: fixed;
    bottom: 0px;

    width: 100%;

  }
  .dinglian-registrationFailed-bottom-left {
    width: 48%;
  }
  .dinglian-registrationFailed-bottom-right {
    width: 48%;
  }

</style>
