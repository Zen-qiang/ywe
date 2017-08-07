<template>
  <div>
   <!-- <mt-header fixed title="我的活动">
      <router-link to="/index/account" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>-->
    <dianlian-header-bar :title="headerTitle"></dianlian-header-bar>
    <div class="dinglian-myActivityList-filter">
      <mt-navbar v-model="selected">
        <mt-tab-item id="0">全部活动</mt-tab-item>
        <mt-tab-item id="1">我发起的</mt-tab-item>
        <mt-tab-item id="2">我参与的</mt-tab-item>
        <mt-tab-item id="3">历史活动</mt-tab-item>
      </mt-navbar>
    </div>
    <div class="dinglian-myActivityList-mainBody">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="0">
          <activityInfo :eventsList="userActivityList" :status="true"></activityInfo>
        </mt-tab-container-item>
        <mt-tab-container-item id="1">
          <activityInfo :eventsList="userActivityList" :status="true"></activityInfo>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <activityInfo :eventsList="userActivityList" :status="true"></activityInfo>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <activityInfo :eventsList="userActivityList" :status="true"></activityInfo>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-button class="dinglian-myActivityList-button" @click="createNewActivity">
      <img src="#" height="20" width="20" slot="icon">
      创建新活动
    </mt-button>
  </div>
</template>
<script>
  import activityInfo from './activityInfo.vue'
  import {Toast} from 'mint-ui'
  import DianlianHeaderBar from '../../components/common/dianlianHeaderBar.vue'
  export default {
    components: { activityInfo, DianlianHeaderBar },
    data () {
      return {
        selected: '1',
        userActivityList: [],
        headerTitle: '我的活动'
      }
    },
    created () {
      this.getUserActivityList()
    },
    watch: {
      selected: function (val, oldVal) {
        // 根据selected值来更新子组件中的数据
        this.userActivityList = []
        this.getUserActivityList(val)
      }
    },
    methods: {
      // 创建新活动
      createNewActivity () {
        this.$router.push({'path': '/initiateActivities'})
      },
      // 获取个人的活动列表
      getUserActivityList (dataType) {
        let data = {
          dataType: dataType
        }
        this.axios({
          method: 'post',
          url: '/activity/getUserActivityList',
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
              this.userActivityList.push(lists[item])
            }
          }
        })
      }
    }
  }
</script>
<style scoped>
  .dinglian-myActivityList-mainBody {
    margin-top: 110px;
  }
  .dinglian-myActivityList-filter {
    width: 100%;
    position: fixed;
    z-index: 8;
    top: 64px;
    height: 46px;
  }
  .dinglian-myActivityList-button {
    width: 100%;
    background-color: #ffd200;
    position: fixed;
    z-index: 8;
    bottom: 0;
    left: 0;
  }
  a {
    color: #333333;
  }
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #ffd200;
    color: #333333;
  }

</style>
