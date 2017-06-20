<template>
  <div>
    <h2>活动列表</h2>
    <div>
      <mt-search v-model="value" cancel-text="取s消" placeholder="搜s索"></mt-search>
    </div>

    <div class="mui-content">
      <div class="mui-card">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell mui-collapse">
            <a class="mui-navigate-right" href="#">表单</a>
            <div class="mui-collapse-content">
              <form class="mui-input-group">
                <div class="mui-input-row">
                  <label>Input</label>
                  <input type="text" placeholder="普通输入框">
                </div>
                <div class="mui-button-row">
                  <button class="mui-btn mui-btn-primary" type="button" onclick="return false;">确认</button>&nbsp;&nbsp;
                  <button class="mui-btn mui-btn-primary" type="button" onclick="return false;">取消</button>
                </div>
              </form>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 底部-->
    <mt-tab-container>
      <mt-tabbar v-model="selected" fixed>

        <mt-tab-item id="home">
          <img slot="icon" src="">
          首页
        </mt-tab-item>

        <mt-tab-item id="circle">
          <img slot="icon" src="">
          圈子
        </mt-tab-item>


        <router-link to="/initiateActivities">
          <mt-tab-item id="activity">
            <img slot="icon" src="">
            活动
          </mt-tab-item>
        </router-link>


        <mt-tab-item id="message">
          <img slot="icon" src="">
          消息
        </mt-tab-item>
        <mt-tab-item id="self">
          <img slot="icon" src="">
          我的
        </mt-tab-item>
      </mt-tabbar>
    </mt-tab-container>


  </div>
</template>
<script>

</script>
<style>

</style>
