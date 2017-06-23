<template>
  <div>
    <mt-header title="编辑内容">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="mui-input-row">
      <label><img src="#" alt=""></label>
      <input type="text" placeholder="普通输入框">
    </div>

    <img id="my_img_id" class="dinglian-editActivities-img" />


    <button id='demo3' data-options='{"value":"2015-10-10 10:10","beginYear":2010,"endYear":2020}' class="btn mui-btn mui-btn-block">时间</button>

    <li class="mui-table-view-cell">
      <a class="mui-navigate-right">
        地址
      </a>
      自定义位置
    </li>


    <mt-field label="人数" placeholder="请输入参加人数" type="number" v-model="number"></mt-field>

    <div class="mui-card">
      <form class="mui-input-group">
        <div class="mui-input-row mui-radio mui-left">
          <label>我请客</label>
          <input name="radio1" type="radio">
        </div>
        <div class="mui-input-row mui-radio mui-left">
          <label>AA制</label>
          <input name="radio1" type="radio" checked>
        </div>
      </form>
    </div>

    <mt-field label="联系方式" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>

    <li class="mui-table-view-cell">
      <a class="mui-navigate-right">
        邀请好友
      </a>
    </li>


    <li class="mui-table-view-cell">
      <span>公开</span>
      <div class="mui-switch">
        <div class="mui-switch-handle"></div>
      </div>
    </li>

    <li class="mui-table-view-cell">
      <a class="mui-navigate-right">
        限定条件
      </a>
    </li>

    <mt-field placeholder="活动备注" type="textarea" rows="4" v-modal="introduction"></mt-field>


    <router-link to="/eventsList"><mt-button type="default" size="large">发布</mt-button></router-link>
  </div>
</template>
<script>

</script>
<style>
  .dinglian-editActivities-img {
    width: 300px;
    height: 100px;
    border:1px solid red;
  }

</style>
