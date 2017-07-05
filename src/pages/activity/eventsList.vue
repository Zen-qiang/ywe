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
    <div class="dinglian-eventsList-list">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media clearfix" v-for="item in eventsList">
            <router-link v-bind='{to:"/activityDetails/"+item.eventId}' class="clearfix">
            <img class="mui-media-object mui-pull-left dinglian-eventsList-leftImg" src="../../assets/images/list.png">
            <!--<img class="mui-media-object mui-pull-left dinglian-eventsList-leftImg" :src="item.picture">-->
            <div class="mui-media-body dinglian-eventsList-rightInfo">
              <h4>{{item.name}}</h4>
              <p class="dinglian-eventsList-status clearfix"><span>个人组织 {{item.releaseTime |data}}</span><em>{{item.status}}</em></p>
              <p class='mui-ellipsis'>
                <div class="dinglian-eventsList-tag">
                  <i>{{item.tags.tagname}}</i>
                  <strong>{{item.numbers.num}}／{{item.numbers.enteringNum}}人</strong>
                  <em>{{item.charge}}</em>
                </div>
                <i>{{item.startTime | data}}</i><br>
                <em>{{item.address}}</em>
              </p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <!--list end-->
    <router-link to="/initiateActivities"><mt-button type="default" size="large">发布活动</mt-button></router-link>
  </div>
</template>
<script>
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn')
  import store from '../../store/'
  export default {
    data () {
      return {
        eventsList: []
      }
    },
    filters: {
      data (val) {
        return moment(val).format('YYYY-MM-DD HH:mm')
      }
    },
    created: function () {
      this.getEventsList()
    },
    methods: {
      getEventsList () {
        console.log(store.state.username)
        this.axios({
          method: 'post',
          url: '/activity/getAllActivity'
        }).then(res => {
          if (res.data.status === 'ERROR') {
            console.log(res.data.message)
          } else {
            this.eventsList = res.data.result
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style lang="scss" scoped type="text/css">
  @import '../../assets/css/global.css';
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
    background-color: #ffffff;
  }
  .mui-collapse {
    font-size: small;
    width: 130px;
    float: left;
  }
  .mui-navigate-right{
    width: 10px;
  }
  .dinglian-eventsList-list{
    margin: 20px auto;

  }
  .dinglian-eventsList-list a{
    height: 140px;
  }
  .dinglian-eventsList-leftImg{
    height: 120px;
    min-width: 120px;

  }
  .dinglian-eventsList-rightInfo{
    width: 220px;
  }
  .dinglian-eventsList-rightInfo h4{
    font-weight: 400;
  }
  .dinglian-eventsList-status span{
    float: left;
  }
  .dinglian-eventsList-status em{
    float: right;
  }
  .dinglian-eventsList-tag{
    margin:5px;
  }
  .dinglian-eventsList-tag i {
    background-color: #999999;
    color: #ffffff;
    border: 1px solid #999999;
    border-radius: 5px;
    font-style: normal;
    padding: 1px;
  }
  .dinglian-eventsList-tag strong {
    border: 1px solid red;
    border-radius: 5px;
    color: red;
    padding: 1px;
    font-weight: 100;
  }
  .dinglian-eventsList-tag em{
    color: red;
    font-weight: 100;
  }
  .dinglian-eventsList-rightInfo > i{
    font-weight: 100;
    font-style: normal;
    color: #333333;
  }
  .dinglian-eventsList-rightInfo > em{
    font-weight: 100;
    font-style: normal;
    color: #b0b0b0;
  }
</style>
