<template>
  <div>
    <!--<h2>活动列表</h2>-->
      <div class="mui-input-row mui-search dinglian-eventsList-search">
        <input type="search" class="mui-input-clear" placeholder="请输入附近关键字">
      </div>
    <!--筛选条件 start-->
      <div class="dinglian-eventsList-filter clearfix">
        <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell mui-collapse"><a class="mui-navigate-right" href="#">智能排序</a>
            <ul class="mui-table-view mui-table-view-chevron">
              <li class="mui-table-view-cell"><a class="mui-navigate-right" href="#">iOS</a>
              </li>
              <li class="mui-table-view-cell"><a class="mui-navigate-right" href="#">Android</a>
              </li>
              <li class="mui-table-view-cell"><a class="mui-navigate-right" href="#">HTML5</a>
              </li>
            </ul>
          </li>
          <li class="mui-table-view-cell mui-collapse"><a class="mui-navigate-right" href="#">全部分类</a>
            <ul class="mui-table-view mui-table-view-chevron">
              <li class="mui-table-view-cell"><a class="mui-navigate-right" href="#">PC方案</a>
              </li>
              <li class="mui-table-view-cell"><a class="mui-navigate-right" href="#">手机方案</a>
              </li>
              <li class="mui-table-view-cell"><a class="mui-navigate-right" href="#">TV方案</a>
              </li>
            </ul>
          </li>
          <li class="mui-table-view-cell mui-collapse"><a class="mui-navigate-right" href="#">活动状态</a>
            <ul class="mui-table-view mui-table-view-chevron">
              <li class="mui-table-view-cell"><a class="mui-navigate-right" href="#">公司新闻</a>
              </li>
              <li class="mui-table-view-cell"><a class="mui-navigate-right" href="#">行业新闻</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    <!--筛选条件 end-->

    <!--list start-->
    <div>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media clearfix">
          <a href="javascript:;">
            <img class="mui-media-object mui-pull-left" src="#">
            <div class="mui-media-body">
              幸福<span>状态</span>
              <p>个人组织 2017／4／20发布</p>
              <p class='mui-ellipsis'>
                 <span>桌游icon</span>
                <i>报名人数</i>
                <em>money</em>
                <p>时间</p>
                <p>地址</p>
              </p>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <!--<ul class="mui-table-view">
      <li v-for="item in list" class="mui-table-view-cell mui-media clearfix">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" :src="item.picture">
          <div class="mui-media-body">
            {{item.shortname}}<span>状态</span>
            <p>个人组织 2017／4／20发布</p>
            <p class='mui-ellipsis'>
              <span>桌游icon</span>
              <i>报名人数</i>
              <em>money</em>
            <p>时间</p>
            <p>地址</p>
            </p>
          </div>
        </a>
      </li>
    </ul>-->

    <!--list end-->

  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
<style scoped>
  div {
    width:100%;
  }
  .dinglian-eventsList-search {

    background-color: #ffd300;
    width: 100%;
  }
  .dinglian-eventsList-search input{
    margin:20px 30px 20px 25px;
    width: 90%;
    background-color: #ffffff;
  }
  .dinglian-eventsList-filter{
    border:1px solid red;
    width: 100px;
  }
  .dinglian-eventsList-filter .mui-collapse {
    font-size: small;
    width: 30%;
    float: left;
  }

</style>
