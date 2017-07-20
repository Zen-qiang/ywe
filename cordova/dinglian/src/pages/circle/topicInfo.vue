<template>
    <ul class="dinglian-topicInfo-ul">
      {{info}}
      <li v-for="item in info">
        <router-link v-bind='{to:"/previewDetails/"+circleId+"/"+item.topics.topicId}'>
        <div class="dinglian-topicInfo-user clearfix">
          <img src="../../assets/images/header.png" class="dinglian-topicInfo-img">
          <div class="dinglian-topicInfo-name"><h4>{{item.user.nickname}}</h4><em>地址</em></div>
          <span>{{item.topics.releaseTime}}ssss</span>
        </div>
        <p class="dinglian-topicInfo-description">
          {{item.topics.description}}
        </p>
        <div class="dinglian-topicInfo-video">
          tupian以及视频
        </div>
        <div class="dinglian-topicInfo-count">
          <span>{{item.topics.commentsCount}}</span>
          <em>{{item.topics.praisesCount}}</em>
        </div>
        </router-link>
      </li>
    </ul>
</template>
<script>
  export default {
    name: 'TopicInfo',
    props: ['info', 'circleId'],
    data () {
      return {
      }
    },
    created () {
      console.log('sssss')
      console.log(this.info)
    },
    methods: {
    }
  }
</script>
<style scoped>
  .dinglian-topicInfo-ul {
    background-color: #ffffff;
    padding-left: 18px;
    text-align: left;
    padding-right: 18px;
  }
  .dinglian-topicInfo-ul > li {
    list-style: none;
  }
  .dinglian-topicInfo-img {
    width: 45px;
    height: 45px;
    float: left;
  }
  .dinglian-topicInfo-name {
    float: left;
  }
  .dinglian-topicInfo-name > h4 {
    font-size: 16px;
    color: #333333;
  }
  .dinglian-topicInfo-name > em {
    font-style: normal;
    color: #999999;
    font-size: 14px;
  }
  .dinglian-topicInfo-user > span {
    float: right;
    color: #999999;
  }
  .dinglian-topicInfo-description {
    font-size: 14px;
    color: #333333;
  }
  .dinglian-topicInfo-video {
    height: 85px;
  }
  .dinglian-topicInfo-count {
    padding-bottom: 10px;
  }
  .dinglian-topicInfo-count > span {
    display: inline-block;
    background: url(../../assets/images/single.svg) no-repeat center left;
    padding-left: 25px;
  }
  .dinglian-topicInfo-count > em {
    margin-left: 20%;
    font-style: normal;
    background: url(../../assets/images/like.svg) no-repeat center left;
    display: inline-block;
    padding-left: 25px;
  }
</style>
