<template>
  <div>
    <!-- 我的兴趣开始 -->
    <circle-lists :circleLists="myIntersetList"></circle-lists>
  <!-- 推荐活动 开始 -->
  <!--<div class="dinglian-home-recommend">
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
  </div>-->
  <!-- 推荐活动 结束 -->
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
// import homeData from '../../mock/home-mock.js'
import CircleLists from '../../components/common/circleLists.vue'
export default {
  components: { CircleLists },
  data () {
    return {
      myIntersetList: []
    }
  },
  created () {
//    this.intersetList = homeData.intersetList1
//    this.recommendList = homeData.recommendList
    this.getMyIntersetList()
  },
  methods: {
    getMyIntersetList () {
      let data = {
        dataType: ''
      }
      this.axios({
        method: 'post',
        url: '/discover/getMyCoteries',
        data: data
      }).then(res => {
        if (res.data.status === 'ERROR') {
          Toast(res.data.message)
        } else {
          this.myIntersetList = res.data.result
        }
      }).catch()
    }
  }

}
</script>
<style lang="scss" scoped type="text/css">

</style>
