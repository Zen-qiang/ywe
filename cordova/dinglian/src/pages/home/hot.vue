<template>
  <div>
    <!-- 轮播图开始 -->
    <div class="dinglian-home-carousel">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item, index) in carouselList" :key="index" @click="">
          <img :src="item.imageUrl" >
        </mt-swipe-item>
      </mt-swipe>
    </div>
      <!-- 轮播图结束 -->
      <!-- 我的兴趣开始 -->
    <div class="mui-content dinglian-home-grid">
      <mt-cell title="热门圈子" to="/index/circle" is-link value="更多"></mt-cell>
      <div class="mui-row">
       <div class="mui-col-sm-3 mui-col-xs-3 h-xs-2" v-for="(item, index) in intersetList" :key="index">
          <div class="gird-content" @click="goToCircle(item.tip)">
            <div class="grid-image dinglian-hot-interest">
              <img :src="item.imageUrl"></img>
            </div>
            <div class="grid-tip">
              {{item.tip}}
            </div>
          </div>
       </div>
     </div>
    </div>
      <!-- 我的兴趣结束 -->
    <!--消息轮播 start-->
    <mt-cell :title="activityMessage" style="margin-top: 8px;" class="dinglian-hot-message">
      <span style="height:5px; width:5px;border-radius:50%;background-color:red;"></span>
      <img slot="icon" src="../../assets/images/circle.png" width="25px" height="25px"></img>
    </mt-cell>
    <!--消息轮播 end-->
    <!-- 附近动态开始-->
    <div class="mui-content">
      <mt-cell title="附近动态" to="/index/eventsList" class="dinglian-hot-nearDynamic"></mt-cell>
      <div class="mui-row dinglian-hot-row">
       <div class="mui-col-sm-6 mui-col-xs-6 h-xs-6 dinglian-hot-activityList" v-for="(item, index) in nearbyActivity" :key="index">
          <div class="gird-content" @click="goToNearbyActivity(item.eventId)">
            <div class="grid-image friend-grid-image">
              <img :src="baseImgUrl + item.pictures[0]"></img>
            </div>
            <div class="grid-tip">
              {{item.name}}
            </div>
          </div>
       </div>
     </div>
    </div>
    <!-- 好友动态结束-->
  </div>
</template>
<script>
import homeData from '../../mock/home-mock.js'
import * as types from '../../store/mutation-types'
export default {
  data () {
    return {
      carouselList: [],
      nearbyActivity: [],
      activityMessage: '街舞活动快开始了！！！',
      baseImgUrl: ''
    }
  },
  created () {
    this.carouselList = homeData.carouselList
    this.intersetList = homeData.intersetList
    this.friendstList = homeData.friendstList
    this.getNearbyActivity()
  },
  mounted () {
//    console.log('time')
//    let time = setInterval(function () {
//      this.activityMessage = this.activityMessage + '1'
//    }, 1000)
//    clearInterval(time)
  },
  methods: {
      // 跳转到圈子列表界面
    goToCircle (tip) {
      this.$store.commit(types.SETINTERESTINFO, tip)
      this.$router.push({'path': '/index/circle'})
    },
    // 获取到附近的4个活动
    getNearbyActivity () {
      let data = {
        pagesize: 4,
        start: 0,
//        status: '2',
        isOwnList: false
      }
      this.axios({
        method: 'post',
        url: '/activity/getActivityList',
        data: data
      }).then(res => {
        if (res.data.status === 'ERROR') {
          console.log(res.data.message)
        } else {
          this.baseImgUrl = this.globalUrl.imgUrl
          this.nearbyActivity = res.data.result.lists
        }
      }).catch()
    },
    // 跳转到活动详情界面
    goToNearbyActivity (id) {
      this.$router.push({'path': '/activityDetails/' + id})
    }
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
@import '../../assets/css/hgrid.scss';
 div {
   text-align: left;
 }
.dinglian-home-carousel {
  width: 100%;
  height: 1.7rem;
}
.dinglian-home-carousel > .mint-swipe >.mint-swipe-items-wrap > .mint-swipe-item{
  width: 100%;
  height: 1.7rem;
}
.dinglian-home-carousel > .mint-swipe >.mint-swipe-items-wrap > .mint-swipe-item > img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.dinglian-home-grid {
  background-color: #ffffff;
  padding-bottom: 0.08rem;
}
.gird-content {
  position:absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
.gird-content > .grid-image{
  position:relative;
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gird-content .dinglian-hot-interest > img {
  height: 70%;
}
.grid-image > img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.gird-content > .grid-tip{
  position:relative;
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.14rem;
}
.friend-grid-image > img{
  object-fit: cover;
}
/*消息轮播 start*/
  .dinglian-hot-message {
    min-height: 0.44rem;
  }
  /*附近动态 start */
  .dinglian-hot-nearDynamic {
    min-height: 0.44rem;
    background-color: #f2f2f2;
  }
  .mint-cell-text {
    font-size: 0.14rem;
  }
  .dinglian-hot-row {
    background-color: #f2f2f2;
  }
  .dinglian-hot-activityList {
    margin-left: 4%;
    margin-bottom: 4%;
  }
  .mui-col-xs-6 {
    width: 44%;
  }
</style>
