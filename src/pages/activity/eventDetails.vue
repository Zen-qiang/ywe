<template>
  <div>
    <!--<h2>发起详情</h2>-->

    <mt-header title="发起详情" class="dinglian-eventDetails-head">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
  <div class="dinglian-eventDetails-list">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media clearfix">
        <a href="javascript:;" class="clearfix">
          <img class="mui-media-object  dinglian-eventDetails-topImg" src="../../assets/images/details.png">
          <div class="mui-media-body dinglian-eventDetails-bottomInfo">
            <h4>{{activityInfo.shortname}}</h4>
            <p class="dinglian-eventDetails-status clearfix"><span>个人组织 {{activityInfo.publishtime}}</span><em>{{activityInfo.status}}</em></p>
            <p class='mui-ellipsis'>
            <div class="dinglian-eventDetails-tag">
              <i>{{activityInfo.status.tag.tagname}}</i>
              <strong>{{activityInfo.numbers.num}}／{{activityInfo.numbers.enteringNum}}</strong>
              <em>{{activityInfo.charge}}</em>
            </div>
            <i>{{activityInfo.rstime}}</i><br>
            </p>
            <div class="dinglian-eventDetails-next clearfix">
            <em>{{gps}}</em>
              <button type="button" class="mui-btn mui-btn-link">
              确认人员
              <span class="mui-icon mui-icon-forward"></span>
            </button>
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
  export default{
    data () {
      return {
        activityInfo: []
      }
    },
    created () {
      let eventId = this.$route.params.id
      console.log(eventId)
      this.getActivityInfo(eventId)
    },
    methods: {
//      创建聊天
      createChat () {
      },
//      获取活动信息
      getActivityInfo (eventId) {
        this.axios({
          method: 'post',
          url: '/user/getActivityList',
          data: {
            eventId: eventId
          }
        }).then(res => {
          this.activityInfo = res.data.result
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../assets/css/global.css';
  .dinglian-eventDetails-head {
    background-color: #ffd200 ;
    color: #333333;
    margin:0 auto;
    height: 45px;
  }
  .dinglian-eventDetails-list{
    margin: 15px;
    /*border: 1px solid #999999;*/
    border-radius: 10px;
  }
  .dinglian-eventDetails-topImg{
    max-width: 354px;

  }
  .dinglian-eventDetails-bottomInfo h4{
    font-weight: 400;
  }
  .dinglian-eventDetails-status span{
    float: left;
  }
  .dinglian-eventDetails-status em{
    float: right;
  }
  .dinglian-eventDetails-tag{
    margin:5px;
  }
  .dinglian-eventDetails-tag i {
    background-color: #999999;
    color: #ffffff;
    border: 1px solid #999999;
    border-radius: 5px;
    font-style: normal;
    padding: 1px;
  }
  .dinglian-eventDetails-tag strong {
    border: 1px solid red;
    border-radius: 5px;
    color: red;
    padding: 1px;
    font-weight: 100;
  }
  .dinglian-eventDetails-tag em{
    color: red;
    font-weight: 100;
  }
  .dinglian-eventDetails-bottomInfo > i{
    font-weight: 100;
    font-style: normal;
    color: #333333;
  }
  .dinglian-eventDetails-next > em{
    font-weight: 100;
    font-style: normal;
    color: #b0b0b0;
    float: left;
    line-height: 33px;
  }
  .dinglian-eventDetails-next button{
    float: right;
    color: red;
  }
  .dinglian-eventDetails-btn{
    margin:0;
    background-color: #ffd200;
    border:0;
    color: #323433;
    position: fixed;
    bottom: 0;
    z-index: 8;
  }

</style>
