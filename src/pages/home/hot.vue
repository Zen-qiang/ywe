<template>
  <div>
    <!-- 轮播图开始 -->
    <div class="dinglian-home-carousel">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item, index) in carouselList" :key="index" @click="">
          <img :src="item.imageUrl"></img>
        </mt-swipe-item>
      </mt-swipe>
    </div>
      <!-- 轮播图结束 -->
      <!-- 我的兴趣开始 -->
    <div class="mui-content dinglian-home-grid">
      <mt-cell title="我的兴趣" to="//github.com" is-link value="更多"></mt-cell>
      <div class="mui-row">
       <div class="mui-col-sm-3 mui-col-xs-3 h-xs-2" v-for="(item, index) in intersetList" :key="index">
          <div class="gird-content">
            <div class="grid-image">
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
    <mt-cell title="活动马上开始啦！" style="margin-top: 8px;">
      <span style="height:5px; width:5px;border-radius:50%;background-color:red;"></span>
      <img slot="icon" src="../../static/images/circle.png" width="25px" height="25px"></img>
    </mt-cell>
    <!-- 好友动态开始-->
    <div class="mui-content">
      <mt-cell title="好友动态" to="//github.com"></mt-cell>
      <div class="mui-row">
       <div class="mui-col-sm-6 mui-col-xs-6 h-xs-6" v-for="(item, index) in friendstList" :key="index">
          <div class="gird-content">
            <div class="grid-image friend-grid-image">
              <img :src="item.imageUrl"></img>
            </div>
            <div class="grid-tip">
              {{item.tip}}
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
export default {
  data () {
    return {
      carouselList: []
    }
  },
  created () {
    this.carouselList = homeData.carouselList
    this.intersetList = homeData.intersetList
    this.friendstList = homeData.friendstList
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
@import '../../static/hgrid.scss';
.dinglian-home-carousel {
  width: 100%;
  height: 150px;
}
.dinglian-home-carousel > .mint-swipe >.mint-swipe-items-wrap > .mint-swipe-item{
  width: 100%;
  height: 150px;
}
.dinglian-home-carousel > .mint-swipe >.mint-swipe-items-wrap > .mint-swipe-item > img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.dinglian-home-grid {
  background-color: #ffffff;
  padding-bottom: 8px;
}
.gird-content {
  position:absolute;
  width: 100%;
  height: 100%;
}
.gird-content > .grid-image{
  position:relative;
  width: 100%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.grid-image > img{
  width: 100%;
  height: 60%;
  object-fit: contain;
}
.gird-content > .grid-tip{
  position:relative;
  width: 100%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.friend-grid-image > img{
  object-fit: cover;
}
</style>
