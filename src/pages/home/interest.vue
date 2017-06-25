<template>
  <div>
    <!-- 我的兴趣开始 -->
  <div class="mui-content dinglian-home-grid">
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
      <div class="mui-col-sm-3 mui-col-xs-3 h-xs-2">
         <div class="gird-content" style="display: flex;align-items: center;justify-content: center;">
            <div style="display: flex;align-items: center;justify-content: center;">
              <img src="../../static/images/activity.png" style="width: 50%;height: 80%;"></img>
            </div>
         </div>
       </div>
    </div>
  </div>
  <!-- 推荐活动 开始 -->
  <div class="dinglian-home-recommend">
    <mt-cell title="推荐活动"></mt-cell>
    <ul>
      <li v-for="(item,index) in recommendList" :key="index">
        <img v-lazy="item.imageUrl">
        <div class="dinglian-home-recommend-tip">
          <div class="dinglian-home-recommend-tip-title">{{item.title}}</div>
          <div class="dinglian-home-recommend-tip-desc">{{item.desc}}</div>
        </div>
      </li>
    </ul>
  </div>
  <!-- 推荐活动 结束 -->
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
    this.intersetList = homeData.intersetList1
    this.recommendList = homeData.recommendList
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
@import '../../static/hgrid.scss';
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
.dinglian-home-recommend {
  background-color: #ffffff;
  margin-top: 8px;
}
.dinglian-home-recommend-tip {
  color: #ffffff;
  position: absolute;
  z-index: 0.9;
  text-align: center;
}
.dinglian-home-recommend-tip-title {
  font-size: 18px;
}
.dinglian-home-recommend-tip-desc {
  font-size: 14px;
}
ul {
  padding-left: 8px;
  padding-right: 8px;
  margin: 0;
}
ul li{
list-style-type:none;
margin: 0;
position: relative;
display: flex;
align-items: center;
justify-content: center;
}
img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
image[lazy=loading] {
  width: 100%;
  height: 150px;
  margin: auto;
}
</style>
