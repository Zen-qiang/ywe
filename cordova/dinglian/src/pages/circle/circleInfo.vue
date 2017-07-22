<template>
  <ul class="dinglian-circle-topic">
    <li v-for="item in lists">
      <router-link v-bind='{to:"/topicDetails/"+item.coterieId}' class="clearfix">
        <img src="../../assets/images/list.png" class="dinglian-circle-topicImg" />
        <div class="dinglian-circle-topicDiv">
          <h4>{{item.name}}</h4>
          <em>成员&nbsp;{{item.fllowers}}</em><em>话题</em><em>活动</em>
          <p>{{item.description}}</p>
        </div>
      </router-link>
    </li>
  </ul>
</template>
<script>
  export default {
    props: ['lists'],
    data () {
      return {}
    },
    created () {
    }
  }
</script>
<style scoped>
  .dinglian-circle-topic {
    text-align: left;
    padding-left: 0;
    background-color: #ffffff;
    margin-bottom: 60px;
  }
  .dinglian-circle-topic > li {
    list-style: none;
    border-bottom: 1px solid #dddddd;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .dinglian-circle-topicImg {
    float: left;
    width: 100px;
    height: 100px;
  }
  .dinglian-circle-topicDiv {
    float: left;
    margin-left: 1.2rem;
    width: 60%;
  }
  .dinglian-circle-topicDiv > h4 {
    font-size: 14px;
    color: #333333;
  }
  .dinglian-circle-topicDiv > em {
    font-size: 11px;
    color: #999999;
    font-style: normal;
    padding-right: 10px;
  }
  .dinglian-circle-topicDiv > p {
    /*height: 50px;*/
    width: 220px;
    font-size: 14px;
    color: #333333;
    overflow:hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
</style>
