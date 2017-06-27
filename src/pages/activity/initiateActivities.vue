<template>
  <div>
    <mt-header title="发起活动" class="dinglian-initiateActivities-head">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div>
      <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-table-view-cell mui-collapse"><a class="mui-navigate-right" href="#">活动类型</a>
          <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell"><a class="mui-navigate-right" href="#">iOS</a>
            </li>
            <li class="mui-table-view-cell"><a class="mui-navigate-right" href="#">Android</a>
            </li>
            <li class="mui-table-view-cell"><a class="mui-navigate-right" href="#">HTML5</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="dinglian-initiateActivities-addTag">
      <h4>添加标签</h4>
      <span class="mui-badge mui-badge-success">123</span>
      <span class="mui-badge mui-badge-success">123</span>
      <span class="mui-badge mui-badge-success">123</span>
      <span class="mui-badge mui-badge-success">123</span>
      <span class="mui-badge mui-badge-success">123</span>
    </div>

    <router-link to="editActivities"><mt-button type="default" size="large" class="dinglian-initiateActivities-btn dinglian-initiateActivities-head">继续</mt-button></router-link>

  </div>

</template>
<script>

</script>
<style>
  div{
    width: 100%;
  }

  .dinglian-initiateActivities-head {
    background-color: #ffd200 ;
    color: #333333;
    margin:0 auto;
    height: 45px;
  }
  .dinglian-initiateActivities-addTag{
    height: 100px;
    margin-top: 20px;
    background-color: #ffffff;
  }
  .dinglian-initiateActivities-btn{
    width: 92%;
    margin-top: 22px;
  }

</style>
