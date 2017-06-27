<template>
  <div>
    <mt-header title="编辑内容" class="dinglian-editActivities-head">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="mui-input-row dinglian-editActivities-theme">
      <label><img src="../../assets/images/header.png" alt=""></label>
      <input type="text" placeholder="赵丽颖邀请你嘿嘿嘿">
    </div>

    <div class="dinglian-editActivities-bodyInfo">

        <p class="dinglian-editActivities-upload">
          <img src="../../assets/images/upload.png" alt="" >
        </p>




      <button id='demo3' data-options='{"value":"2015-10-10 10:10","beginYear":2010,"endYear":2020}' class="btn mui-btn mui-btn-block">时间</button>

      <div class="mui-table-view-cell">
        <a class="mui-navigate-right">
          地址
        </a>
      </div>


      <div class="mui-input-row">
        <label>人数</label>
        <input type="text" class="mui-input-clear" placeholder="请输入参加人数">
      </div>

      <div class="mui-card">
        <label>费用</label>
        <form class="mui-input-group">
          <div class="mui-input-row mui-radio mui-left dinglian-editActivities-cost">
            <label>我请客</label>
            <input name="radio1" type="radio">
          </div>
          <div class="mui-input-row mui-radio mui-left dinglian-editActivities-costA">
            <label>AA制</label>
            <input name="radio1" type="radio" checked>
          </div>
        </form>
      </div>

      <div class="mui-input-row">
        <label>联系方式</label>
        <input type="text" class="mui-input-clear" placeholder="请输入手机号码">
      </div>



      <div class="mui-table-view-cell">
        <a class="mui-navigate-right">
          邀请好友
        </a>
      </div>

      <div class="mui-input-row">
        <label>公开</label>
        <mt-switch class="dinglian-editActivities-switch"></mt-switch>
      </div>


      <div class="mui-table-view-cell">
        <a class="mui-navigate-right">
          限定条件
        </a>
      </div>
    </div>
    <mt-field placeholder="活动备注" type="textarea" rows="4"></mt-field>


    <router-link to="/activity"><mt-button type="default" size="large" class="dinglian-editActivities-btn">发布</mt-button></router-link>
  </div>
</template>
<script>

</script>
<style>
  .dinglian-editActivities-head {
    background-color: #ffd200 ;
    color: #333333;
    margin:0 auto;
    width: 100%;
    height: 45px;
    position: fixed;
    top: 0;
    z-index: 8
  }
  .dinglian-editActivities-theme{
    margin-top: 45px;
    background-color: #ffffff;
    text-align: left;
    height: 80px;

  }
  .dinglian-editActivities-theme label{
    width: 100px;
  }
  .dinglian-editActivities-theme label img{
    width: 60px;
    height: 60px;
  }
  .dinglian-editActivities-theme input{
    height: 60px;
    margin:10px auto;
  }
  .dinglian-editActivities-bodyInfo{
    /*border:1px solid red;*/
    background-color: #ffffff;
    margin:20px auto;
  }
  .dinglian-editActivities-upload{
    width: 100%;
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-editActivities-upload img {
    height: 110px;
  }
  .dinglian-editActivities-bodyInfo > div{
    height: 56px;

  }
  /*更改底边框颜色*/
  .mui-btn-block,.mui-input-row,.mui-table-view-cell{
    width: 100%;
    margin-bottom: 0;
    border: 0;
    border-bottom: 1px solid #dddddd;
  }
  .mui-table-view-cell a {
    line-height: 34px;
    height: 56px;
  }
  .mui-input-row label,  .mui-card label{
    height: 56px;
    line-height: 34px;
  }
  .mui-input-row input{
    /*人数、手机号码*/
    height: 56px;
  }
  .mui-card{
    height: 200px;
    width: 100%;
    margin: 0;

  }
  .mui-card label{
    width: 35%;
    float: left;
    padding: 11px 15px;
    font-family: 'Helvetica Neue',Helvetica,sans-serif;
    font-size: 18px;
  }
  .mui-input-group{
    border:1px solid red;
    height: 56px;
    float: left;
    width: 200px;
  }
  .mui-input-group .dinglian-editActivities-cost {
    float: left;
    width: 80px;
    border:1px solid red;
  }
  .dinglian-editActivities-cost label{
    padding: 0;
  }
  .mui-input-group .dinglian-editActivities-costA {
    float: right;
    width: 80px;
    border:1px solid red;
  }
  .mui-input-row .dinglian-editActivities-switch{
    margin-left: 120px;
    padding-left: 76px;
}
  .dinglian-editActivities-btn{
    width: 92%;
    background-color: #ffd200 ;
    color: #333333;
    margin: 22px auto;
    height: 45px;
    margin-bottom: 86px;
  }


</style>
