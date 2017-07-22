<template>
  <div>
    <mt-header fixed title="我的活动">
      <router-link to="/index/account" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="dinglian-myActivityList-filter">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">全部活动</mt-tab-item>
        <mt-tab-item id="2">我发起的</mt-tab-item>
        <mt-tab-item id="3">我参与的</mt-tab-item>
        <mt-tab-item id="4">历史活动</mt-tab-item>
      </mt-navbar>
    </div>
    <div class="dinglian-myActivityList-mainBody">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <activityInfo :isOwnList="false"></activityInfo>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-button class="dinglian-myActivityList-button" @click="createNewActivity">
      <img src="#" height="20" width="20" slot="icon">
      创建新活动
    </mt-button>
  </div>
</template>
<script>
  import activityInfo from './activityInfo.vue'
  export default {
    components: {activityInfo},
    data () {
      return {
        selected: '1'
      }
    },
    methods: {
      createNewActivity () {
        this.$router.push({'path': '/initiateActivities'})
      }
    }
  }
</script>
<style scoped>
  .mint-header {
    background-color: #ffd200;
    color: #333333;
    font-size: 16px;
    height: 44px;
  }
  .dinglian-myActivityList-mainBody {
    margin-top: 90px;
  }
  .dinglian-myActivityList-filter {
    width: 100%;
    position: fixed;
    z-index: 8;
    top: 44px;
  }
  .dinglian-myActivityList-button {
    width: 100%;
    background-color: #ffd200;
    position: fixed;
    z-index: 8;
    bottom: 0;
    left: 0;
  }

</style>
