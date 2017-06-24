<template>
  <div style="width: 100%;">
    <div class="mui-content">
      <!-- 首页header bar -->
      <div class="mui-row dinglian-header-bar">
        <div class="mui-col-sm-2 mui-col-xs-2">
          <div class="mui-row dinglian-select-addr">
            <div class="mui-col-sm-10 mui-col-xs-10">
              上海
            </div>
            <div class="mui-col-sm-2 mui-col-xs-2">
              <span class="mui-icon mui-icon-arrowdown"></span>
            </div>
          </div>
        </div>
        <div class="mui-col-sm-8 mui-col-xs-8 dinglian-header-tab">
          <mt-button :class="{ 'dinglian-header-tab-active':  activeTab === '/home/hot'}" size = "small" @click.native="changeTab('/home/hot')">热门</mt-button>
          <mt-button :class="{ 'dinglian-header-tab-active':  activeTab === '/home/interest'}" size = "small" @click.native="changeTab('/home/interest')">兴趣</mt-button>
        </div>
        <div class="mui-col-sm-2 mui-col-xs-2 dinglian-header-search">
          <div class="mui-icon mui-icon-search"></div>
        </div>
      </div>
      <div class="dinglian-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeTab: ''
    }
  },
  created () {
    let currentRouter = this.$route.path
    console.log(currentRouter)
    // 默认切换成热门页面
    if (currentRouter === '/home') {
      currentRouter = '/home/hot'
    }
    this.activeTab = currentRouter
    this.$router.push({'path': currentRouter})
  },
  methods: {
    // 切换headerBar的标签
    changeTab (tab) {
      this.activeTab = tab
      this.$router.push({'path': tab})
    }
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
@import '../../static/home.scss'
</style>
