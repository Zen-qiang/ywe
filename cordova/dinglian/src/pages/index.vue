<template>
  <div>
    <mt-tab-container>
      <router-view></router-view>
      <mt-tabbar v-model="selected" fixed>

        <mt-tab-item id="/index">
          <img slot="icon" src="../assets/images/home.png" v-show="selected !== '/index' && !selected.includes('/home')">
          <img slot="icon" src="../assets/images/home-active.png" v-show="selected === '/index' || selected.includes('/home')">
          首页
        </mt-tab-item>

        <mt-tab-item id="/index/circle">
          <img slot="icon" src="../assets/images/circle.png" v-show="!selected.includes('/index/circle')">
          <img slot="icon" src="../assets/images/circle-active.png" v-show="selected.includes('/index/circle')">
          圈子
        </mt-tab-item>

        <mt-tab-item id="/index/eventsList">
          <img slot="icon" src="../assets/images/activity.png" v-show="!selected.includes('/index/eventsList')">
          <img slot="icon" src="../assets/images/activity-active.png" v-show="selected.includes('/index/eventsList')">
          活动
        </mt-tab-item>

        <mt-tab-item id="/index/message">
          <img slot="icon" src="../assets/images/message.png" v-show="!selected.includes('/index/message')">
          <img slot="icon" src="../assets/images/message-active.png" v-show="selected.includes('/index/message')">
          消息
        </mt-tab-item>
        <mt-tab-item id="/index/account">
          <img slot="icon" src="../assets/images/account.png" v-show="!selected.includes('/index/account')">
          <img slot="icon" src="../assets/images/account-active.png" v-show="selected.includes('/index/account')">
          我的
        </mt-tab-item>
      </mt-tabbar>
    </mt-tab-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selected: ''
    }
  },
  watch: {
    selected: function (val, oldVal) {
      // 这里就可以通过 val 的值变更来确定当前选中的tab
      this.$router.push({'path': val})
    }
  },
  created () {
    let currentRouter = this.$route.path
    this.selected = currentRouter
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
$mainColor: #ffd300;
.mint-tab-item {
  color: #999999;
}
.mint-tab-item.is-selected{
  color: $mainColor;
}
.tabbar-active {
  color: $mainColor;
}
</style>
