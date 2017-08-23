<template>
  <div style="width: 100%;">
    <div class="mui-content">
      <!-- 首页header bar -->
      <div class="mui-row dinglian-header-bar">
        <div class="mui-col-sm-2 mui-col-xs-2 dinglian-home-address">
          <div class="mui-row dinglian-select-addr">
            <div class="mui-col-sm-10 mui-col-xs-10 dinglian-home-address-left">
              {{address}}
            </div>
            <div class="mui-col-sm-2 mui-col-xs-2">
              <span class="mui-icon mui-icon-arrowdown"></span>
            </div>
          </div>
        </div>
        <div class="mui-col-sm-8 mui-col-xs-8 dinglian-header-tab">
          <mt-button :class="{ 'dinglian-header-tab-active':  activeTab === '/index', 'dinglian-header-leftButton': leftButton}" size = "small" @click.native="changeTab('/index')">热门</mt-button>
          <mt-button :class="{ 'dinglian-header-tab-active':  activeTab === '/index/home/interest', 'dinglian-header-rightButton': rightButton}" size = "small" @click.native="changeTab('/index/home/interest')">关注</mt-button>
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
      activeTab: '/index',
      leftButton: true,
      rightButton: true,
      positionCoords: '',
      address: ''
    }
  },
  created () {
    let currentRouter = this.$route.path
    this.activeTab = currentRouter
    this.getAddress()
  },
  methods: {
    // 获取地址
    getAddress () {
//      navigator.geolocation.getCurrentPosition(function (position) {
//        console.log('经度：' + position.coords.longitude)
//        console.log('纬度：' + position.coords.latitude)
//        this.positionCoords = position.coords.longitude + ',' + position.coords.latitude
//      })
      this.positionCoords = 10 + ',' + 10
      console.log(this.positionCoords)
      this.axios({
        method: 'get',
        url: 'http://api.map.baidu.com/geocoder/v2/',
        params: {
          location: this.positionCoords,
          output: 'json',
          ak: '1u8uE2G1H8edBF6pDU1FKYR5ICNtAxwf'
        }
      }).then(res => {
        console.log(res.data.result.addressComponent.country)
        this.address = res.data.result.addressComponent.country
      }).catch()
    },
    // 切换headerBar的标签
    changeTab (tab) {
      this.activeTab = tab
      this.$router.push({'path': tab})
    }
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
@import '../../assets/css/home.scss';
.dinglian-home-address {
  width: 33.3333333%;
}
.dinglian-header-tab {
  width: 33.33333%;
}
.dinglian-header-search {
  float: right;
  margin-left: 60px;
}
  .dinglian-home-address-left {
    width: 50%;
    padding-left: 15px;
  }

</style>
