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
            <li class="mui-table-view-cell" v-for="item in activityType">
              <a class="mui-navigate-right" href="#" @click="getTypeNameId(item.typeNameId)">{{item.typeName}}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="dinglian-initiateActivities-addTag">
      <h4>添加标签</h4>
      <ul>
        <li v-for="item in tagList">
          <span class="mui-badge mui-badge-success">{{item.tagName}}</span>
        </li>
      </ul>
    </div>


    <mt-button type="default" size="large" class="dinglian-initiateActivities-btn dinglian-initiateActivities-head" @click="initCarry">继续</mt-button>


  </div>

</template>
<script>
  import { Toast } from 'mint-ui'
  export default {
    data () {
      return {
        tagList: [],
        activityType: []
      }
    },
    created () {
      this.getActivityType()
      this.getTagList()
    },
    methods: {
      getTypeNameId (e) {
        console.log(e)
        this.getTagList(e)
      },
      getActivityType () {
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
              this.activityType = res.data.result
            }
          }
        ).catch(
          error => {
            console.log(error)
          }
        )
      },
      getTagList (e) {
        let data = {
          typeNameId: e
        }
        this.axios({
          method: 'post',
          url: '/activity/getTagList',
          data: data
        }).then(
            res => {
              this.tagList = res.data.result
            }
        ).catch(
            err => {
              console.log(err)
            }
        )
      },
      initCarry () {
        this.$router.push('/editActivities')
      }
    }
  }
</script>
<style scoped>
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
