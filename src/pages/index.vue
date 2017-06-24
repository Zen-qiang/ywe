<template>
  <div>
    <mt-tab-container>
      <router-view></router-view>
      <mt-tabbar v-model="selected" fixed>

        <mt-tab-item id="home" >
          <img slot="icon" src="">
          首页
        </mt-tab-item>

        <mt-tab-item id="circle">
          <img slot="icon" src="">
          圈子
        </mt-tab-item>

        <mt-tab-item id="activity">
          <img slot="icon" src="">
          活动
        </mt-tab-item>

        <mt-tab-item id="message">
          <img slot="icon" src="">
          消息
        </mt-tab-item>
        <mt-tab-item id="account">
          <img slot="icon" src="">
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
      selected: 'home'
    }
  },
  watch: {
    selected: function (val, oldVal) {
      console.log(val)
      // 这里就可以通过 val 的值变更来确定当前选中的tab
      this.$router.push({'path': val})
    }
  },
  created () {
    this.$router.push({'path': this.selected})
  }
}
</script>
