<template>
  <div class="dinglian-previewDetails-all">
    <mt-header title="预览详情" fixed>
      <router-link v-bind='{to:"/topicDetails/"+detailsId}' slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right">
        <img src="../../assets/images/shareBlack.svg" height="20" width="20" slot="icon">
      </mt-button>
    </mt-header>
    <div class="dinglian-previewDetails-topicInfo">
     <topic-info :info="topicComments"></topic-info>
    </div>
    <div class="dinglian-previewDetails-pointArea">
      <span class="dinglian-previewDetails-pointAreaLeft">共有{{praisesCount}}人点赞过</span>
      <em>more</em>
    </div>
    <p class="dinglian-previewDetails-commentAllInfo">全部评论</p>
    <ul class="mui-table-view dinglian-previewDetails-commentUl">
      <li class="mui-table-view-cell mui-media" v-for="item in commentsList">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left dinglian-previewDetails-commentAreaImg" src="../../assets/images/header.png">
          <div class="mui-media-body dinglian-previewDetails-commentAreaInfo">
            <div class="dinglian-previewDetails-commentAreaUserInfo clearfix">
              <p>{{item.user.nickName}}sss</p>
              <span>{{item.commentTime}}</span>
            </div>
            <p class='mui-ellipsis'>{{item.comment}}</p>
          </div>
        </a>
      </li>
    </ul>
    <div class="dinglian-previewDetails-writeInfo">
      <input type="text" v-model="writeInfo">
      <mt-button type="danger" @click="sendWriteInfo">发送</mt-button>
    </div>
  </div>
</template>
<script>
  import TopicInfo from './topicInfo.vue'
  import { Toast } from 'mint-ui'
  export default {
    components: {TopicInfo},
    data () {
      return {
        detailsId: this.$route.params.id,
        topicId: this.$route.params.uid,
        topicComments: [],
        commentsList: [],
        praisesCount: 0,
        writeInfo: ''
      }
    },
    created () {
      console.log('11111')
      this.getTopicComments()
    },
    methods: {
//        获取话题评论
      getTopicComments () {
        let data = {
          topicId: this.topicId
        }
        this.axios({
          method: 'post',
          url: '/discover/getTopicComments',
          data: data
        }).then(res => {
          if (res.data.status === 'ERROR') {
            Toast(res.data.message)
          } else {
//            this.topicComments = res.data.result.info
            this.topicComments = []
            this.topicComments.push(res.data.result.info)
            this.commentsList = res.data.result.comments
            this.praisesCount = res.data.result.info.topics.praisesCount
          }
        }).catch()
      },
//      评论话题
      sendWriteInfo () {
        console.log('wowowo')
        let data = {
          topicId: this.topicId,
          comment: this.writeInfo
        }
        this.axios({
          method: 'post',
          url: '/discover/commentTopic',
          data: data
        }).then(res => {
          if (res.data.status === 'ERROR') {
            Toast(res.data.message)
          } else {
            this.writeInfo = ''
            this.getTopicComments()
            Toast('评论成功!')
          }
        }).catch()
      }
    }
  }
</script>
<style scoped>
  .mint-header {
    background-color: #ffd200;
    color: #333333;
    font-size: 16px;
    height: 44px;
  }
  .dinglian-previewDetails-commentAllInfo {
    background-color: #ffffff;
    margin-top: 5px;
    height: 40px;
    line-height: 40px;
    margin-bottom: 0;
    text-align: left;
    color: #333333;font-size: 16px;
    padding-left: 10px;
  }
  .dinglian-previewDetails-pointArea {
    background-color: #ffffff;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
  }
  .dinglian-previewDetails-pointAreaLeft {
    float: left;
    margin-left: 10px;
  }
  .dinglian-previewDetails-pointArea > em {
    float: right;
    margin-right: 15px;
  }
  .dinglian-previewDetails-commentAreaUserInfo > p {
    float: left;
    color: #999999;
    font-size: 16px;
  }
  .dinglian-previewDetails-commentAreaUserInfo > span {
    float: right;
    color: #999999;
    font-size: 12px;
  }
  .dinglian-previewDetails-commentAreaInfo > p {
    text-align: left;
    color: #333333;
    font-size: 14px;
  }
  .dinglian-previewDetails-writeInfo {
    width: 100%;
    background-color: #ffffff;
    text-align: left;
    position: fixed;
    z-index: 8;
    bottom: 0;
    padding-left: 5rem;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-previewDetails-writeInfo > input {
    width: 70%;
    height: 38px;
    margin: 5px 0;
    margin-right: 1rem;
  }
  .mint-button--danger {
    color: #333333;
    background-color: #ffd200;
  }
  .mint-button {
    border-radius: 4px;
    font-size: 16px;
    height: 38px;
    margin: 5px 0;
  }
  .dinglian-previewDetails-commentUl {
    margin-bottom: 60px;
  }
  .dinglian-previewDetails-topicInfo {
    margin-top: 50px;
  }
</style>
