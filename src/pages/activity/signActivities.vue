<template>
<!--活动报名-->
  <div class="dinglian-signActivities-body">
    <mt-header title="活动报名" class="dinglian-signActivities-head">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <!--<div class="dinglian-signActivities-list">-->
      <!--<ul class="mui-table-view">-->
        <!--<li class="mui-table-view-cell mui-media clearfix">-->
          <!--<a href="javascript:;" class="clearfix">-->
            <!--<img class="mui-media-object mui-pull-left dinglian-signActivities-leftImg" src="../../assets/images/list.png">-->
            <!--<div class="mui-media-body dinglian-signActivities-rightInfo">-->
              <!--<h4>{{signInfo.name}}</h4>-->
              <!--<p class="dinglian-signActivities-status clearfix"><span>个人组织 {{signInfo.publishtime}}发布</span><em>{{signInfo.status}}</em></p>-->
              <!--<p class='mui-ellipsis'>-->
              <!--<div class="dinglian-signActivities-tag">-->
                <!--<i>{{signInfo.tags.tagname}}</i>-->
                <!--<strong>报名中{{signInfo.numbers.num}}／{{signInfo.numbers.enteringNum}}人</strong>-->
                <!--<em>{{signInfo.charge}}</em>-->
              <!--</div>-->
              <!--<i>{{signInfo.rstime}}</i><br>-->
              <!--<em>{{signInfo.gps}}</em>-->
              <!--</p>-->
            <!--</div>-->
          <!--</a>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->

    <p class="dinglian-signActivities-signUser">本活动还有3个名额可报名</p>

    <div class="dinglian-signActivities-signInfo">
      <div class="mui-input-row">
        <label>报名信息</label>
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
        <label>{{signInfo.charge}}</label>
        <input type="text" disabled="disabled" value="¥10">
      </div>
      <div class="mui-input-row">
        <label>支付方式</label>
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
      <p class="dinglian-signActivities-signUser">我已同意协议</p>
    <div class="mui-input-row dinglian-signActivities-checkout">
      <div>¥10 请在10分钟内完成操作</div>
      <button type="button" class="mui-btn mui-btn-primary">去结算<span class="mui-badge mui-badge-primary">2</span></button>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  export default{
    data () {
      return {
        signInfo: []
      }
    },
    created () {
      this.getActivitySignInfo()
    },
    methods: {
      getActivitySignInfo () {
        let data = {}
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
      settlement () {}
    }
  }
</script>
<style>
  .dinglian-signActivities-head {
    background-color: #ffd200 ;
    color: #333333;
    margin:0 auto;
    width: 100%;
    height: 45px;
    position: fixed;
    top: 0;
    z-index: 8
  }
  .dinglian-signActivities-list{
    margin-top: 45px;

  }
  .dinglian-signActivities-list a{
    height: 140px;
  }
  .dinglian-signActivities-leftImg{
    min-height: 120px;
    min-width: 120px;

  }
  .dinglian-signActivities-rightInfo{
    width: 220px;
  }
  .dinglian-signActivities-rightInfo h4{
    font-weight: 400;
  }
  .dinglian-signActivities-status span{
    float: left;
  }
  .dinglian-signActivities-status em{
    float: right;
  }
  .dinglian-signActivities-tag{
    margin:5px;
  }
  .dinglian-signActivities-tag i {
    background-color: #999999;
    color: #ffffff;
    border: 1px solid #999999;
    border-radius: 5px;
    font-style: normal;
    padding: 1px;
  }
  .dinglian-signActivities-tag strong {
    border: 1px solid red;
    border-radius: 5px;
    color: red;
    padding: 1px;
    font-weight: 100;
  }
  .dinglian-signActivities-tag em{
    color: red;
    font-weight: 100;
  }
  .dinglian-signActivities-rightInfo > i{
    font-weight: 100;
    font-style: normal;
    color: #333333;
  }
  .dinglian-signActivities-rightInfo > em{
    font-weight: 100;
    font-style: normal;
    color: #b0b0b0;
  }
  .dinglian-signActivities-signUser{
    height: 30px;
    line-height: 30px;
  }
  .dinglian-signActivities-signInfo{
    background-color: #ffffff;
  }
  .dinglian-signActivities-signInfo div,.dinglian-signActivities-signbfo div{
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-signActivities-signInfo .dinglian-signActivities-addUser{
    width: 24%;
  }
  .dinglian-signActivities-signbfo{
    background-color: #ffffff;
    margin-top: 20px;
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
  }

</style>
