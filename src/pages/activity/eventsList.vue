<template>
  <div>
    <!--<h2>活动列表</h2>-->
      <div class="mui-input-row mui-search dinglian-eventsList-search">
        <input type="search" class="mui-input-clear" placeholder="请输入附近关键字" v-model="keyword" @keyup="searchKeyWord">
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
        <span></span>
      </div>
    <!--筛选条件 end-->

    <!--list start-->
    <div class="dinglian-eventsList-list">
      <ul class="mui-table-view dinglian-eventsList-list-ul">
        <li class="mui-table-view-cell mui-media clearfix dinglian-eventsList-list-li" v-for="item in eventsList">
            <router-link v-bind='{to:"/activityDetails/"+item.eventId}' class="clearfix">
            <img class="mui-media-object mui-pull-left dinglian-eventsList-leftImg" src="../../assets/images/list.png">
            <!--<img class="mui-media-object mui-pull-left dinglian-eventsList-leftImg" :src="item.picture">-->
            <div class="mui-media-body dinglian-eventsList-rightInfo">
              <h4>{{item.name}}</h4>
              <p class="dinglian-eventsList-status clearfix"><span>个人组织 {{item.releaseTime |data}}</span><em>{{item.status}}</em></p>
              <p class='mui-ellipsis'>
                <div class="dinglian-eventsList-tag">
                  <i>{{item.tags.tagname}}街舞</i>
                  <strong>{{item.numbers.enteringNum}}／{{item.numbers.num}}人</strong>
                  <em>{{item.charge}}</em>
                </div>
                <i>{{item.startTime | data}}</i>
                <em>{{item.address}}</em>
              </p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <!--list end-->
    <router-link to="/initiateActivities"><mt-button type="danger" size="small" class="dinglian-eventsList-releaseActivity">发布活动</mt-button></router-link>
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
        eventsList: [],
        keyword: ''
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
      getEventsList (keyname) {
        console.log(store.state.username)
        let data = {
          keyword: keyname
        }
        this.axios({
          method: 'post',
          url: '/activity/getAllActivity',
          data: data
        }).then(res => {
          if (res.data.status === 'ERROR') {
            console.log(res.data.message)
          } else {
            this.eventsList = res.data.result
          }
        }).catch(err => {
          console.log(err)
        })
      },
      searchKeyWord () {
        this.getEventsList(this.keyword)
      }
    }
  }
</script>
<style lang="scss" scoped type="text/css">
  div {
    width:100%;
  }
  .mui-table-view-cell.mui-collapse .mui-table-view .mui-table-view-cell {
     padding-left: 15px;
  }
  .mui-table-view-cell:after {
     height: 0;
  }
  .dinglian-eventsList-search {
    background-color: #ffd200;
    width: 100%;
    height: 44px;
    position: fixed;
    top: 0;
    z-index: 8;
  }
  .dinglian-eventsList-search input{
    margin:10px 5%;
    width: 90%;
    height: 24px;
    background-color: #ffffff;
    border-radius: 40px;
    font-size: 12px;
  }
  /*筛选*/
  .dinglian-eventsList-filter{
    background-color: #ffffff;
    height: 45px;
    margin-top: 44px;
    position: fixed;
    top: 0;
    z-index: 8;
    border: 0;
  }
  .mui-collapse {
    font-size: small;
    width: 25%;
    float: left;
  }
  .mui-navigate-right:after, .mui-push-right:after {
     right: -3px;
  }
  .mui-navigate-right{
    width: 10px;
  }
  .dinglian-eventsList-filter span {
    background: url(../../assets/images/map.svg) no-repeat center center;
    width: 30px;
    height: 30px;
    float: right;
    margin-top: 2.2%;
    margin-right: 3%;

  }
  /*活动*/
  .dinglian-eventsList-list{
      margin-top: 99px;
  }
  .dinglian-eventsList-list-ul {
    background-color: #f2f2f2;
    margin-bottom: 18%;
  }
  .dinglian-eventsList-list-ul > li {
    margin: 10px 0;
    background-color: #ffffff;
  }
  .dinglian-eventsList-list .dinglian-eventsList-leftImg{
    width: 30%;
    max-width: none;
    height:  38%;
  }
  .dinglian-eventsList-list .dinglian-eventsList-rightInfo{
    width: 66%;
  }
  .dinglian-eventsList-rightInfo h4{
    font-weight: 400;
    font-size: 15px;
    color: #333333;
    margin-top: 0;
  }
  .dinglian-eventsList-status span{
    float: left;
    font-size: 12px;
    color: #999999;
  }
  .dinglian-eventsList-status em{
    float: right;
    font-size: 11px;
    color: #999999;
    font-style: normal;
  }
  .dinglian-eventsList-tag{
    margin-top: 9px;
  }
  .dinglian-eventsList-tag i {
    background-color: #999999;
    color: #ffffff;
    border: 1px solid #999999;
    border-radius: 5px;
    font-style: normal;
    padding: 1px;
    font-size: 11px;
  }
  .dinglian-eventsList-tag strong {
    border: 1px solid red;
    border-radius: 5px;
    color: red;
    padding: 1px;
    font-weight: 100;
    font-size: 11px;
    margin: 0 1px;
  }
  .dinglian-eventsList-tag em{
    color: red;
    font-weight: 100;
    font-size: 11px;
    font-style: normal;
  }
  .dinglian-eventsList-rightInfo > i{
    font-weight: 100;
    font-style: normal;
    color: #333333;
    font-size: 14px;
  }
  .dinglian-eventsList-rightInfo > em{
    font-weight: 100;
    font-style: normal;
    color: #999999;
    font-size: 12px;
    display: block;
  }
  .dinglian-eventsList-releaseActivity {
    position: fixed;
    z-index: 8;
    bottom: 55px;
    right: 0;
  }
</style>
