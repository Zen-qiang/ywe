<template>
  <div>
    <mt-header title="发起活动" class="dinglian-initiateActivities-head">
      <router-link to="index/eventsList" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="dinglian-initiateActivities-searchTag">
      <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-table-view-cell"><a class="mui-navigate-right" @click="getActivityShow">{{eventType}}</a>
            <ul class="mui-table-view mui-table-view-chevron dinglian-initiateActivities-activityShow" v-show="activityShow">
              <li class="mui-table-view-cell">
                <a class="mui-navigate-right" @click="getAllActivity">全部</a>
              </li>
              <li class="mui-table-view-cell" v-for="item in activityType">
                <a class="mui-navigate-right" @click="getTypeNameId(item)">{{item.typeName}}</a>
              </li>
            </ul>
        </li>
      </ul>
    </div>
    <div class="dinglian-initiateActivities-addTag">
      <h4>添加标签</h4>
      <ul class="clearfix">
        <li v-for="(myItem,id) in tagList" :class="{'dinglian-initiateActivities-tags':!myItem.show,'dinglian-initiateActivities-changetags':myItem.show}" @click="getMyTag(myItem,id)" >
          <span>{{myItem.tagName}}</span>
        </li>
      </ul>
    </div>
    <mt-button type="default" size="large" class="dinglian-initiateActivities-btn" @click="initCarry">继续</mt-button>
  </div>

</template>
<script>
  import { Toast } from 'mint-ui'
  import * as types from '../../store/mutation-types'
  import {mapState} from 'vuex'
  import Vue from 'vue'
  import DianlianHeaderBar from '../../components/common/dianlianHeaderBar.vue'
  export default {
    components: { DianlianHeaderBar },
    data () {
      return {
        tagList: [],
        activityType: [],
        myTags: [],
        activityShow: false,
        eventType: '活动类型',
        image: ''
      }
    },
    created () {
      this.getActivityType()
      this.getTagList()
    },
    computed: mapState({
      tags: state => state.tags
    }),
    methods: {
//        控制下拉框
      getActivityShow () {
        if (this.activityShow === true) {
          this.activityShow = false
        } else {
          this.activityShow = true
        }
      },
      getAllActivity () {
        this.getTagList()
        this.activityShow = false
        this.eventType = '全部活动类型'
      },
      // 获取活动类型
      getTypeNameId (e) {
        this.getTagList(e.typeNameId)
        this.activityShow = false
        this.eventType = e.typeName
      },
//      获取活动类型
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
//      获取选中tags的id
      getMyTag (myItem, id) {
        for (var item in this.tagList) {
          Vue.set(this.tagList[item], 'show', false)
        }
        if (myItem.show === true) {
          Vue.set(myItem, 'show', false)
        } else {
          Vue.set(myItem, 'show', true)
        }
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
      // 继续按钮的点击事件
      initCarry () {
        let tagList = this.tagList
        for (var i = 0; i < tagList.length; i++) {
          if (tagList[i].show === true) {
            this.myTags.push(tagList[i].tagId)
          }
        }
        console.log(this.myTags)
        if (this.myTags.length === 0) {
          Toast({
            message: '活动类型不能空！',
            duration: 500
          })
        } else {
          this.$store.commit(types.SETTAGS, this.myTags)
          this.$router.push('/editActivities')
        }
      }
    }
  }
</script>
<style scoped>
  div{
    width: 100%;
  }
  .dinglian-initiateActivities-head {
    width: 100%;
    background-color: #ffd200 ;
    color: #333333;
    height: 64px;
    position: fixed;
    top: 0;
    z-index: 8;
    padding-top: 20px;
  }
  .dinglian-initiateActivities-searchTag .dinglian-initiateActivities-activityShow {
    margin-top: 11px;
    width: 100%;
  }
  .dinglian-initiateActivities-searchTag {
    position: fixed;
    top: 64px;
    z-index: 8;
    height: 45px;
  }
  .mui-table-view-cell>a:not(.mui-btn) {
    font-size: 15px;
  }
  .dinglian-initiateActivities-addTag{
    margin-top: 8rem;
    background-color: #ffffff;
    padding-bottom: 5px;
  }
  .dinglian-initiateActivities-tags {
    color: #999999;
    border: 1px solid #999999;
    font-size: 12px;
    padding: 5px;
    border-radius: 8px;
  }
  .dinglian-initiateActivities-changetags {
    background-color: #333333;
    color: #ffffff;
    border: 1px solid #333333;
    font-size: 12px;
    padding: 5px;
    border-radius: 8px;
  }
  .dinglian-initiateActivities-addTag h4 {
    text-align: left;
    font-size: 12px;
    padding-top: 15px;
    padding-left: 15px;
    font-weight: 400;
  }
  .dinglian-initiateActivities-addTag ul {
    padding-left: 15px;
    width: 100%;
    margin-bottom: 10px;
  }
  .dinglian-initiateActivities-addTag li {
    list-style: none;
    float: left;
    margin-left: 0;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .dinglian-initiateActivities-btn{
    width: 92%;
    background-color: #ffd200 ;
    color: #333333;
    margin-top: 22px;
    margin-left: 4%;
  }
</style>
