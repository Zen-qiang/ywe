<template>
  <!--活动报名-->
  <div class="dinglian-signActivities-body">
    <mt-header title="活动报名" class="dinglian-signActivities-head">
      <router-link v-bind='{to:"/activityDetails/"+eventId}' slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="dinglian-signActivities-list">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media clearfix">
          <a href="javascript:;" class="clearfix">
            <img class="mui-media-object mui-pull-left dinglian-signActivities-leftImg" src="../../assets/images/list.png">
            <div class="mui-media-body dinglian-signActivities-rightInfo">
              <h4>{{signInfo.name}}</h4>
              <p class="dinglian-signActivities-status clearfix"><span>个人组织 {{signInfo.startTime | data}}</span><em>{{signInfo.status}}</em></p>
              <p class='mui-ellipsis'>
              <div class="dinglian-signActivities-tag">
                <i><!--{{signInfo.tags}}-->街舞</i>
                <strong>报名中<!--{{signInfo.numbers.num}}／{{signInfo.numbers.enteringNum}}-->人</strong>
                <em>{{signInfo.charge}}</em>
              </div>
              <i>{{signInfo.rstime}}</i>
              <em>{{signInfo.gps}}</em>
              </p>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <p class="dinglian-signActivities-signUser">本活动还有3个名额可报名</p>

    <div class="dinglian-signActivities-signInfo">
      <div class="mui-input-row">
        <label class="dinglian-signActivities-addUserInfo">报名信息</label>
        <button type="button" class="mui-btn mui-btn-success mui-icon mui-icon-plus dinglian-signActivities-addUser">添加好友</button>
      </div>
      <div class="mui-input-row">
        <label>姓名</label>
        <input type="text" placeholder="请输入姓名">
      </div>
      <div class="mui-input-row">
        <label>手机</label>
        <input type="text" placeholder="请输入手机号">
      </div>
      <div class="mui-table-view-cell">
        <a class="mui-navigate-right">
          <span class="mui-badge mui-badge-danger">女</span>
          性别
        </a>
      </div>
    </div>

    <div class="dinglian-signActivities-signbfo">
      <div class="mui-input-row">
        <label>订单金额</label>
        <span class="dinglian-signActivities-signbfoTot">{{signInfo.charge}}</span>
      </div>
      <div class="mui-input-row">
        <label class="dinglian-signActivities-payment">支付方式</label>
        <input type="text" disabled="disabled">
      </div>
      <ul class="mui-table-view mui-table-view-radio">
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            微信支付
          </a>
        </li>
      </ul>
    </div>
    <p class="dinglian-signActivities-agree">我已同意协议</p>
    <div class="mui-input-row dinglian-signActivities-checkout">
      <div><span>¥{{signInfo.charge}}</span><em>请在10分钟内完成操作</em></div>
      <button type="button" class="mui-btn mui-btn-primary" @click="settlement">去结算<span class="mui-badge mui-badge-primary">1</span></button>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn')
  import { Toast } from 'mint-ui'
  export default{
    data () {
      return {
        signInfo: [],
        eventId: ''
      }
    },
    filters: {
      data (val) {
        return moment(val).format('YYYY-MM-DD HH:mm')
      }
    },
    created () {
      this.eventId = this.$route.params.id
      this.getActivitySignInfo()
    },
    methods: {
      getActivitySignInfo () {
        let data = {
          eventId: this.eventId
        }
        this.axios({
          method: 'post',
          url: '/user/getActivityInfo',
          data: data
        }).then(
          res => {
            if (res.data.status === 'ERROR') {
              Toast(res.data.message)
            } else {
              this.signInfo = res.data.result
            }
          }
        ).catch(
          err => {
            console.log(err)
          }
        )
      },
      settlement () {
        Toast('成功报名')
        this.$router.push({'path': '/index/eventsList'})
      }
    }
  }
</script>
<style>
  .dinglian-signActivities-head {
    background-color: #ffd200 ;
    color: #333333;
    margin:0 auto;
    width: 100%;
    height: 44px;
    position: fixed;
    top: 0;
    z-index: 8
  }
  .dinglian-signActivities-list{
    margin-top: 44px;

  }
  .dinglian-signActivities-list a{
    height: 140px;
  }
  .dinglian-signActivities-leftImg{
    min-height: 100px;
    min-width: 100px;
    width: 30%;

  }
  .dinglian-signActivities-rightInfo{
    width: 60%;
  }
  .dinglian-signActivities-rightInfo h4{
    font-weight: 400;
    font-size: 15px;
    color: #333333;
    margin-top: 0;
  }
  .dinglian-signActivities-status span{
    float: left;
    font-size: 12px;
    color: #999999;
  }
  .dinglian-signActivities-status em{
    float: right;
    font-size: 11px;
    color: #999999;
    font-style: normal;
  }
  .dinglian-signActivities-tag{
    margin-top: 9px;
  }
  .dinglian-signActivities-tag i {
    background-color: #999999;
    color: #ffffff;
    border: 1px solid #999999;
    border-radius: 5px;
    font-style: normal;
    padding: 1px;
    font-size: 11px;
  }
  .dinglian-signActivities-tag strong {
    border: 1px solid red;
    border-radius: 5px;
    color: red;
    padding: 1px;
    font-weight: 100;
    font-size: 11px;
    margin: 0 1px;
  }
  .dinglian-signActivities-tag em{
    color: red;
    font-weight: 100;
    font-size: 11px;
    font-style: normal;
  }
  .dinglian-signActivities-rightInfo > i{
    font-weight: 100;
    font-style: normal;
    color: #333333;
    font-size: 14px;
  }
  .dinglian-signActivities-rightInfo > em{
    font-weight: 100;
    font-style: normal;
    color: #999999;
    font-size: 12px;
    display: block;
    margin-top: 5px;
  }
  /*报名信息*/
  .dinglian-signActivities-signUser{
    height: 25px;
    line-height: 25px;
    font-size: 11px;
    margin: 5px auto;
  }
  .dinglian-signActivities-signInfo{
    background-color: #ffffff;
  }
  .dinglian-signActivities-signInfo div,.dinglian-signActivities-signbfo div{
    border-bottom: 1px solid #dddddd;
    height: 50px;
  }
  .mui-input-row label, .mui-input-row input{
    line-height: 2;
    height: 50px;
    font-size: 15px;
    color: #333333;
  }
  .mui-table-view-cell>a:not(.mui-btn) {
    font-size: 15px;
    color: #333333;
  }
  .dinglian-signActivities-signInfo .dinglian-signActivities-addUserInfo {
    color: #999999;
  }
  .dinglian-signActivities-signInfo .dinglian-signActivities-addUser{
    width: 24%;
    margin-top: 5px;
    margin-right: 5px;
  }
  .dinglian-signActivities-signbfo{
    background-color: #ffffff;
    margin-top: 10px;
  }
  .dinglian-signActivities-signbfoTot {
    float: right;
    margin-right: 5%;
    margin-top: 3%;
    color: #e63832;
  }
  .dinglian-signActivities-signbfo .dinglian-signActivities-payment {
    color: #999999;
  }
  .dinglian-signActivities-agree {
    height: 25px;
    line-height: 25px;
    font-size: 11px;
    margin: 5px auto;
    text-align: center;
  }
  .dinglian-signActivities-body .dinglian-signActivities-checkout{
    background-color: #ffffff ;
    color: red;
    width: 100%;
    height: 45px;
    line-height: 45px;
    position: fixed;
    bottom: 0;
    z-index: 8
  }
  .dinglian-signActivities-checkout>div{
    float: left;
    width: 50px;
    margin-left: 10px;
  }
  .dinglian-signActivities-checkout button {
    margin-top: 5px;
    margin-right: 5px;
  }
  .mui-input-row .mui-btn {
    width: 24%;
  }

</style>
