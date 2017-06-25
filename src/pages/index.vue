<template>
  <div>
    <mt-tab-container>
      <router-view></router-view>
      <mt-tabbar v-model="selected" fixed>

        <mt-tab-item id="/home" :class="{'tabbar-active': selected.includes('/home')}">
          <img slot="icon" src="../static/images/home.png" v-show="!selected.includes('/home')">
          <img slot="icon" src="../static/images/home-active.png" v-show="selected.includes('/home')">
          首页
        </mt-tab-item>

        <mt-tab-item id="/circle">
          <img slot="icon" src="../static/images/circle.png" v-show="!selected.includes('/circle')">
          <img slot="icon" src="../static/images/circle-active.png" v-show="selected.includes('/circle')">
          圈子
        </mt-tab-item>

        <mt-tab-item id="/activity">
          <img slot="icon" src="../static/images/activity.png" v-show="!selected.includes('/activity')">
          <img slot="icon" src="../static/images/activity-active.png" v-show="selected.includes('/activity')">
          活动
        </mt-tab-item>

        <mt-tab-item id="/message">
          <img slot="icon" src="../static/images/message.png" v-show="!selected.includes('/message')">
          <img slot="icon" src="../static/images/message-active.png" v-show="selected.includes('/message')">
          消息
        </mt-tab-item>
        <mt-tab-item id="/account">
          <img slot="icon" src="../static/images/account.png" v-show="!selected.includes('/account')">
          <img slot="icon" src="../static/images/account-active.png" v-show="selected.includes('/account')">
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
    if (currentRouter === '/index') {
      currentRouter = '/home'
    }
    this.selected = currentRouter
    this.$router.push({'path': currentRouter})
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
