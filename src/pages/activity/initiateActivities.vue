<template>
  <div>
    <mt-header title="发起活动" class="dinglian-initiateActivities-head">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="dinglian-initiateActivities-searchTag">
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
      <ul class="clearfix">
        <li v-for="myItem in tagList" >
          <span :class="[myItem.show ? 'dinglian-initiateActivities-tags' : 'dinglian-initiateActivities-changetags']" @click="getMyTag(myItem)">{{myItem.tagName}}</span>
        </li>
      </ul>
    </div>


    <mt-button type="default" size="large" class="dinglian-initiateActivities-btn dinglian-initiateActivities-head" @click="initCarry">继续</mt-button>


  </div>

</template>
<script>
  import { Toast } from 'mint-ui'
  import * as types from '../../store/mutation-types'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        tagList: [],
        activityType: [],
        myTags: [],
        styles: 'dinglian-initiateActivities-tags',
        changestyles: 'dinglian-initiateActivities-changetags'
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
//      获取选中tags的id
      getMyTag (tag) {
        tag.show = !tag.show
        let myTagsList = this.myTags
        let i = myTagsList.length
        if (i === 0) {
          myTagsList.push(tag.tagId)
        } else {
          while (i--) {
            if (myTagsList[i] === tag.tagId) {
              return
            }
          }
          myTagsList.push(tag.tagId)
        }
        console.log(this.myTags)
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
              for (var i = 0; i < this.tagList.length; i++) {
                this.tagList[i].show = true
              }
              console.log(this.tagList)
            }
        ).catch(
            err => {
              console.log(err)
            }
        )
      },
      initCarry () {
        this.$store.commit(types.SETTAGS, this.myTags)
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
    height: 44px;
  }
  .dinglian-initiateActivities-searchTag {
    position: fixed;
    top: 44px;
    z-index: 8;
    height: 45px;
  }
  .mui-table-view-cell>a:not(.mui-btn) {
    font-size: 15px;
  }
  .dinglian-initiateActivities-addTag{
    margin-top: 55px;
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
    font-size: 12px;
    padding: 5px;
    border-radius: 8px;
  }
  .dinglian-initiateActivities-addTag h4 {
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
    margin-top: 22px;
  }

</style>
