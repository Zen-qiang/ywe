<template>
  <div class="dinglian-eventsList-list">
    <ul class="mui-table-view dinglian-eventsList-list-ul">
      <li class="mui-table-view-cell mui-media clearfix dinglian-eventsList-list-li" v-for="item in eventsList">
        <router-link v-bind='{to:"/activityDetails/"+item.eventId}' class="clearfix">
          <img class="mui-media-object mui-pull-left dinglian-eventsList-leftImg" src="../../assets/images/list.png">
          <!--<img class="mui-media-object mui-pull-left dinglian-eventsList-leftImg" :src="item.picture">-->
          <div class="mui-media-body dinglian-eventsList-rightInfo clearfix">
            <h4>{{item.name}}</h4>
            <p class="dinglian-eventsList-status clearfix"><span>个人组织 {{item.releaseTime |data}}</span><em>{{item.status}}</em></p>
            <p class='mui-ellipsis'>
            <div class="dinglian-eventsList-tag">
              <i v-for="key in item.tags">{{key.tagName}}</i>
              <strong>{{item.numbers.enteringNum}}／{{item.numbers.num}}人</strong>
              <em>{{item.charge}}</em>
            </div>
            <i>{{item.startTime | data}}</i>
            <em>{{item.address}}</em>
            </p>
          </div>
        </router-link>
        <div class="dinglian-activityInfo-copy clearfix">
          <span>已报名</span>
          <mt-button plain class="dinglian-activityInfo-copyButton">重新下单</mt-button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn')
  export default{
    props: ['isOwnList'],
    filters: {
      data (val) {
        return moment(val).format('YYYY-MM-DD HH:mm')
      }
    },
    data () {
      return {
        eventsList: []
      }
    },
    created () {
      this.getEventsList()
    },
    methods: {
      getEventsList () {
        console.log(this.isOwnList)
        let data = {
          isOwnList: this.isOwnList
        }
        this.axios({
          method: 'post',
          url: '/activity/getActivityList',
          data: data
        }).then(res => {
          if (res.data.status === 'ERROR') {
            console.log(res.data.message)
          } else {
            let lists = res.data.result.lists
            for (var item in lists) {
              if (lists[item].status === '1') {
                lists[item].status = '进行中'
              } else if (lists[item].status === '2') {
                lists[item].status = '正在报名'
              } else if (lists[item].status === '3') {
                lists[item].status = '好友参与'
              } else if (lists[item].status === '0') {
                lists[item].status = '已关闭'
              }
              this.eventsList.push(lists[item])
            }
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style lang="scss" scoped type="text/css">
  div {
    text-align: left;
  }
  .mui-table-view-cell.mui-collapse .mui-table-view .mui-table-view-cell {
    padding-left: 15px;
  }
  .mui-table-view-cell:after {
    height: 0;
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
  .dinglian-eventsList-list-ul {
    background-color: #f2f2f2;
    margin-bottom: 18%;
    /*height: 280px;*/
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
  .dinglian-activityInfo-copy {
    position: relative;
    width: 100%;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    height: 40px;
    line-height: 40px;
  }
  .dinglian-activityInfo-copy > span {
    font-size: 14px;
    color: #333333;
  }
  .mint-button {
    border-radius: 6px;
    color: red;
    font-size: 14px;
    height: 20px;
    padding: 0 5px;
  }
  .mint-button--default.is-plain {
    border: 1px solid red;
  }
  .dinglian-activityInfo-copyButton {
    float: right;
    margin-top: 10px;
  }
</style>
