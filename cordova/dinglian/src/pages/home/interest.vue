<template>
  <div class="dinglian-interest-all">
    <!--关注页面-->
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">我的圈子</mt-tab-item>
      <mt-tab-item id="2">关注的人</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        ssss
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        sss
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
// import homeData from '../../mock/home-mock.js'
// import CircleLists from '../../components/common/circleLists.vue'
export default {
  // components: { CircleLists },
  data () {
    return {
      myIntersetList: [],
      selected: '1'
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
  @import "../../assets/css/interest.scss";
  /*切换栏*/
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #ffd200;
    color: #ffd200;
    margin-bottom: -3px;
  }
  a {
    color: #333333;
    padding: 0 20px;
  }

</style>
