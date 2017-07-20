<template>
  <div>
      <span class="dinglian-topicDetails-leftArrow" @click="goCircle"></span>
      <span class="dinglian-topicDetails-share"></span>

    <div class="dinglian-topicDetails-carousel">
      <mt-swipe :auto="5000" :show-indicators="false">
        <mt-swipe-item v-for="(item, index) in detailsCarousel" :key="index">
          <img :src="item.imageUrl" />
        </mt-swipe-item>
      </mt-swipe>
      <div class="dinglian-topicDetails-join">
        <h4>{{topicName}}</h4>
        <p>已有{{peopleNum}}人参与</p>
        <mt-button size="normal" @click="joinTopic" v-show="joinButton">加入</mt-button>
      </div>
    </div>
    <p>{{description}}</p>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">视频</mt-tab-item>
      <mt-tab-item id="3">活动</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <topic-info :info="topicInfoLists" :circleId="articleId"></topic-info>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        dddd
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
       xxxx
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="dinglian-topicDetails-participate" @click="editArticle">参与话题</div>
  </div>
</template>
<script>
  import homeData from '../../mock/home-mock.js'
  import TopicInfo from './topicInfo.vue'
  import { Toast } from 'mint-ui'
  export default {
    components: {TopicInfo},
    data () {
      return {
        detailsCarousel: '',
        selected: '1',
        topicInfoLists: [],
        topicsLists: [],
        topicName: '',
        peopleNum: 0,
        description: '',
        joinButton: true,
        articleId: this.$route.params.id
      }
    },
    created () {
      this.detailsCarousel = homeData.carouselList
      this.getTopicInfo()
    },
    methods: {
//      加入圈子
      joinTopic () {
        let data = {
          coterieId: this.articleId
        }
        this.axios({
          method: 'post',
          url: '/discover/joinCoterie',
          data: data
        }).then(res => {
          Toast('成功加入圈子！')
          this.joinButton = false
        }).catch(error => {
          console.log(error)
        })
      },
      goCircle () {
        this.$router.push({'path': '/index/circle'})
      },
      editArticle () {
        this.$router.push({'path': '/editTopic/' + this.articleId})
      },
      getTopicInfo () {
        let data = {
          coterieId: 1,
          pagesize: '',
          orderby: '',
          start: ''
        }
        this.axios({
          method: 'post',
          url: '/discover/getTopicList',
          data: data
        }).then(res => {
          if (res.data.status === 'ERROR') {
            Toast(res.data.message)
          } else {
            this.topicsLists = res.data.result
            this.topicInfoLists = res.data.result.lists
            this.topicName = res.data.result.coterieName
//            this.peopleNum = res.data.result.flowers
            this.description = res.data.result.description
            console.log('212131')
            console.log(this.topicInfoLists)
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }

</script>
<style>
  .dinglian-topicDetails-leftArrow {
    background: url(../../assets/images/leftArrow.svg) no-repeat center left;
    width: 30px;
    height: 30px;
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 8;
  }
  .dinglian-topicDetails-share {
    background: url(../../assets/images/share.svg) no-repeat center left;
    width: 30px;
    height: 30px;
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 8;
  }
  .dinglian-topicDetails-carousel {
    width: 100%;
    height: 170px;
  }
  .dinglian-topicDetails-participate {
    width: 100%;
    color: #333333;
    background-color: #ffd200;
    height: 50px;
    text-align: center;
    line-height: 50px;
    position: fixed;
    z-index: 8;
    bottom: 0;
  }
  .dinglian-topicDetails-carousel {
    position: relative;
  }
  .dinglian-topicDetails-join {
    position: absolute;
    top: 35%;
    left: 35%;
    z-index: 8;
  }
  .dinglian-topicDetails-join > h4 {
    color: #ffffff;
    font-size: 16px;
  }
  .dinglian-topicDetails-join > p {
    color: #ffffff;
    font-size: 14px;
  }
  .mint-button--normal {
    background: #ffd200;
    border-radius: 3rem;
    height: 3rem;
    width: 5rem;
    font-size: 14px;
  }
</style>
