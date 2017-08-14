<template>
  <div>
    <!--<h2>活动列表</h2>-->
    <div class="mui-input-row mui-search dinglian-eventsList-search">
      <input type="search" class="mui-input-clear" placeholder="请输入附近关键字" v-model="keyword" @input="searchKeyWord">
    </div>
    <!--筛选条件 start-->
    <div class="dinglian-eventsList-filter clearfix">
      <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-table-view-cell dinglian-eventsList-searchOrder"><a @click="changeAllSorting" class="mui-navigate-right">智能排序</a>
          <ul class="mui-table-view mui-table-view-chevron dinglian-eventsList-filterUl" v-show="sorting">
            <li class="mui-table-view-cell" v-for="order in orderBy"><a class="mui-navigate-right" @click="changeSorting(order.value)">{{order.name}}</a>
            </li>
          </ul>
        </li>
        <li class="mui-table-view-cell dinglian-eventsList-searchOrder"><a @click="changeAllCate" class="mui-navigate-right" >全部分类</a>
          <ul class="mui-table-view mui-table-view-chevron dinglian-eventsList-filterUl" v-show="cate">
            <li class="mui-table-view-cell" v-for="item in category" ><a class="mui-navigate-right" @click="changeCate(item.typeNameId)" >{{item.typeName}}</a>
            </li>
          </ul>
        </li>
        <li class="mui-table-view-cell dinglian-eventsList-searchOrder"><a @click="changeAllEventStatus" class="mui-navigate-right" >活动状态</a>
          <ul class="mui-table-view mui-table-view-chevron dinglian-eventsList-filterUl" v-show="eventStatus">
            <li class="mui-table-view-cell" v-for="status in activityStatus"><a class="mui-navigate-right" @click="changeEventStatus(status.value)" >{{status.name}}</a>
            </li>
          </ul>
        </li>
      </ul>
      <span></span>
    </div>
    <!--筛选条件 end-->

    <!--list start-->
    <!--<div class="dinglian-eventsList-list">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="mui-table-view dinglian-eventsList-list-ul">
          <li class="mui-table-view-cell mui-media clearfix dinglian-eventsList-list-li" v-for="item in eventsList">
            <router-link v-bind='{to:"/activityDetails/"+item.eventId}' class="clearfix">
              <img class="mui-media-object mui-pull-left dinglian-eventsList-leftImg" src="../../assets/images/list.png">
              &lt;!&ndash;<img class="mui-media-object mui-pull-left dinglian-eventsList-leftImg" :src="item.picture">&ndash;&gt;
              <div class="mui-media-body dinglian-eventsList-rightInfo">
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
          </li>
        </ul>
      </mt-loadmore>
    </div>-->
    <div class="dinglian-eventsList-main">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :topDistance="topDistance" :bottomDistance="bottomDistance">
      <activity-info :eventsList="eventsList"></activity-info>
    </mt-loadmore>
    </div>
    <!--list end-->
    <router-link to="/initiateActivities"><mt-button type="danger" size="small" class="dinglian-eventsList-releaseActivity">发布活动</mt-button></router-link>
  </div>
</template>
<script>
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn')
  import { Toast } from 'mint-ui'
  import activityInfo from './activityInfo.vue'
  export default {
    components: {activityInfo},
    data () {
      return {
        total: '',
        allLoaded: false,
        page: 1,
        eventsList: [],
        keyword: '',
        sorting: false,
        orderBySort: '',
        orderBy: [
          {name: '默认排序', value: '0'},
          {name: '距离最近', value: '1'},
          {name: '最新发布', value: '2'},
          {name: '价格倒序', value: '3'},
          {name: '价格升序', value: '4'}
        ],
        cate: false,
        orderByCate: '',
        category: [],
        eventStatus: false,
        orderByStatus: '',
        activityStatus: [
          {name: '进行中', value: '1'},
          {name: '正在报名', value: '2'},
          {name: '好友参与', value: '3'},
          {name: '已关闭', value: '0'}
        ],
        start: 0,
        pagesize: 5,
        topDistance: 50,
        bottomDistance: 70
      }
    },
    filters: {
      data (val) {
        return moment(val).format('YYYY-MM-DD HH:mm')
      }
    },
    created: function () {
      this.getEventsList()
      this.getCategory()
    },
    methods: {
      // 上拉刷新
      loadTop () {
        this.eventsList = []
        this.page = 1
        this.start = 0
        this.allLoaded = false
        this.getEventsList()
        this.$refs.loadmore.onTopLoaded()
      },
      // 下拉加载
      loadBottom () {
        this.page ++
        this.start = (this.page - 1) * this.pagesize
        if (this.start < this.total) {
          this.getEventsList('', this.start)
          if ((this.start + this.pagesize) === this.total) {
            this.allLoaded = true
          }
        }
        this.$refs.loadmore.onBottomLoaded()
      },
      // 智能排序
      changeAllSorting () {
        if (this.sorting === true) {
          this.sorting = false
        } else if (this.sorting === false) {
          this.eventStatus = false
          this.cate = false
          this.sorting = true
        }
      },
      // 智能排序内标签的搜索
      changeSorting (value) {
        if (this.sorting === true) {
          this.sorting = false
        } else if (this.sorting === false) {
          this.sorting = true
        }
        this.orderBySort = value
        this.getEventsList()
      },
      // 全部分类
      changeAllCate () {
        if (this.cate === true) {
          this.cate = false
        } else if (this.cate === false) {
          this.sorting = false
          this.eventStatus = false
          this.cate = true
        }
      },
      // 根据活动类型进行筛选
      changeCate (value) {
        if (this.cate === true) {
          this.cate = false
        } else if (this.cate === false) {
          this.cate = true
        }
        this.orderByCate = value
        this.eventsList = []
        this.getEventsList()
      },
      // 活动状态
      changeAllEventStatus () {
        if (this.eventStatus === true) {
          this.eventStatus = false
        } else if (this.eventStatus === false) {
          this.sorting = false
          this.cate = false
          this.eventStatus = true
        }
      },
      // 根据活动状态进行筛选
      changeEventStatus (value) {
        if (this.eventStatus === true) {
          this.eventStatus = false
        } else if (this.eventStatus === false) {
          this.eventStatus = true
        }
        this.orderByStatus = value
        this.eventsList = []
        this.getEventsList()
      },
      // 获取活动列表
      getEventsList (keyword, start) {
        let data = {
          orderby: this.orderBySort,
          keyword: keyword,
          category: this.orderByCate,
          status: this.orderByStatus,
          pagesize: this.pagesize,
          start: start,
          isOwnList: false
        }
        this.axios({
          method: 'post',
          url: '/activity/getActivityList',
          data: data
        }).then(res => {
          if (res.data.status === 'ERROR') {
            Toast(res.data.message)
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
            this.total = res.data.result.total
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 搜素框搜索
      searchKeyWord () {
        this.eventsList = []
        this.getEventsList(this.keyword)
      },
      // 获取活动类型
      getCategory () {
        this.axios({
          method: 'get',
          url: '/activity/getActivityType',
          params: {
            type: '活动类型'
          }
        }).then(
          res => {
            if (res.data.status === 'ERROR') {
              Toast(res.data.message)
            } else {
              this.category = res.data.result
            }
          }
        ).catch(
          error => {
            console.log(error)
          }
        )
      }
    }
  }
</script>
<style lang="scss" scoped type="text/css">
  div {
    width:100%;
    text-align: left;
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
    height: 64px;
    position: fixed;
    top: 0;
    z-index: 8;
    padding-top: 20px;
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
    margin-top: 64px;
    position: fixed;
    top: 0;
    z-index: 8;
    border: 0;
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-eventsList-searchOrder {
    font-size: small;
    width: 28%;
    float: left;
  }
  .dinglian-eventsList-filterUl {
    width: 8rem;
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
  .dinglian-eventsList-main {
    margin-top: 110px;
  }
  .dinglian-eventsList-releaseActivity {
    position: fixed;
    bottom: 70px;
    right: 10px;
  }
</style>
