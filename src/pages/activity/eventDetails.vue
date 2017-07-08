<template>
  <div>
    <!--<h2>发起详情</h2>-->

    <mt-header title="发起详情" class="dinglian-eventDetails-head">
      <router-link to="/editActivities" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
  <div class="dinglian-eventDetails-list">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media clearfix">
        <a href="javascript:;" class="clearfix">
          <div class="dinglian-eventDetails-topImg">
            <img src="../../assets/images/details.png">
          </div>
          <div class="mui-media-body dinglian-eventDetails-bottomInfo">
            <h4>{{activityInfo.name}}</h4>
            <p class="dinglian-eventDetails-status clearfix"><span>个人组织 {{activityInfo.releaseTime | data}}</span><em>{{activityInfo.status}}</em></p>
            <p class='mui-ellipsis'>
            <div class="dinglian-eventDetails-tag">
              <i>{{activityInfo.tags.tagName}}街舞</i>
              <strong>{{activityInfo.numbers.num}}／{{activityInfo.numbers.enteringNum}}</strong>
              <em>{{activityInfo.charge}}</em>
            </div>
            <i>{{activityInfo.startTime | data}}</i><br>
            </p>
            <div class="dinglian-eventDetails-next clearfix">
            <em>{{activityInfo.address}}</em>
             <!-- <button type="button" class="mui-btn mui-btn-link">
              确认人员
              <span class="mui-icon mui-icon-forward"></span>
            </button>-->
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
    <button type="button" class="mui-btn mui-btn-success mui-btn-block dinglian-eventDetails-btn" @click="createChat">创建聊天</button>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import * as types from '../../store/mutation-types'
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn')
  export default{
    data () {
      return {
      }
    },
    filters: {
      data (val) {
        return moment(val).format('YYYY-MM-DD HH:mm')
      }
    },
    computed: mapGetters({
      activityInfo: types.GETINFO
    }),
    mouted () {
    },
    created () {
      console.log(this.activityInfo.name)
      console.log(this.$store.state.user.username)
      console.log(this.activityInfo)
    },
    methods: {
//      创建聊天
      createChat () {
        this.$router.push({'path': '/eventsList'})
      }
    }
  }
</script>
<style lang="scss" scoped type="text/css">
  @import '../../assets/css/global.css';
  .dinglian-eventDetails-head {
    background-color: #ffd200 ;
    color: #333333;
    margin:0 auto;
    height: 44px;
    font-size: 17px;
  }
  .dinglian-eventDetails-list{
    border-radius: 10px;
    width: 94%;
    margin-left: 3%;
    margin-top: 3%;
  }
  .dinglian-eventDetails-list .dinglian-eventDetails-topImg{
    width: 100%;
  }
  .dinglian-eventDetails-topImg > img {
    width: 100%;
    min-height: 200px;
  }

  .mui-table-view-cell>a:not(.mui-btn) {
    padding: 0;
  }
  /*下面信息部分*/
  .dinglian-eventDetails-bottomInfo {
    padding-bottom: 10px;
  }
  .dinglian-eventDetails-bottomInfo h4{
    font-weight: 400;
    font-size: 15px;
    color: #333333;
    margin-left: 10px;
  }
  .dinglian-eventDetails-status span{
    float: left;
    font-size: 12px;
    color: #999999;
    margin-left: 10px;
  }
  .dinglian-eventDetails-status em{
    float: right;
    font-size: 11px;
    color: #999999;
    font-style: normal;
    margin-right: 10px;
  }
  .dinglian-eventDetails-tag{
    margin-top: 9px;
    margin-left: 10px;
  }
  .dinglian-eventDetails-tag i {
    background-color: #999999;
    color: #ffffff;
    border: 1px solid #999999;
    border-radius: 5px;
    font-style: normal;
    padding: 1px;
    font-size: 11px;
  }
  .dinglian-eventDetails-tag strong {
    border: 1px solid red;
    border-radius: 5px;
    color: red;
    padding: 1px;
    font-weight: 100;
    font-size: 11px;
    margin: 0 1px;
  }
  .dinglian-eventDetails-tag em{
    color: red;
    font-weight: 100;
    font-size: 11px;
    font-style: normal;
  }
  .dinglian-eventDetails-bottomInfo > i{
    font-weight: 100;
    font-style: normal;
    color: #333333;
    font-size: 14px;
    margin-left: 10px;
  }
  .dinglian-eventDetails-next > em{
    font-weight: 100;
    font-style: normal;
    color: #999999;
    font-size: 12px;
    display: block;
    margin-left: 10px;
  }
  .dinglian-eventDetails-next button{
    float: right;
    color: red;
  }
  .dinglian-eventDetails-btn{
    margin:0;
    background-color: #ffd200;
    border:0;
    color: #333333;
    position: fixed;
    bottom: 0;
    z-index: 8;
    font-size: 17px;
  }

</style>
