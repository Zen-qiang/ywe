<template>
  <div>
    <div class="mui-input-row mui-search dinglian-searchTopic-search clearfix">
      <input type="search" class="mui-input-clear dinglian-searchTopic-write" placeholder="请输入圈子或者话题" v-model="search" @keyup="searchActivityOrTopic">
      <button class="dinglian-searchTopic-button" @click="gotoback">取消</button>
    </div>
    <ul class="dinglian-searchTopic-topicsLists">
        <!--话题-->
      <li>ssss</li>
        <li v-for="item in topicsLists">
          <router-link v-bind='{to:"/previewDetails/"+item.coterieId+"/"+item.id}'>
            <p>{{item.description}}</p>
          </router-link>
        </li>
    </ul>
    <ul class="dinglian-searchTopic-coteriesLists">
      <!--圈子-->
      <li>eeee</li>
      <li v-for="coter in coteriesLists">
        <router-link v-bind='{to:"/topicDetails/"+coter.id}'>
          <p>{{coter.name}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  export default {
    data () {
      return {
        search: '',
        topicsLists: [],
        coteriesLists: []
      }
    },
    created () {
    },
    methods: {
      gotoback () {
        this.$router.go(-1)
      },
      searchActivityOrTopic () {
        let data = {
          keyword: this.search
        }
        this.axios({
          method: 'post',
          url: '/discover/searchActivityOrTopic',
          data: data
        }).then(res => {
          if (res.data.status === 'ERROR') {
            Toast(res.data.message)
          } else {
            this.topicsLists = res.data.result.topics
            this.coteriesLists = res.data.result.coteries
            console.log(this.topicsLists)
          }
        }).catch()
      }
    }
  }
</script>
<style scoped>
@import '../../assets/css/searchTopic.css';
  .dinglian-searchTopic-search {
    background-color: #ffd200;
    height: 44px;
  }
  .dinglian-searchTopic-write {
    float: left;
    width: 75%;
    margin-bottom: 0;
    background-color: #ffffff;
    margin: 10px 15px;
    padding: 0;
    font-size: 14px;
  }
input[type=search] {
  height: 24px;
  border-radius: 16px;
}
.dinglian-searchTopic-button {
    float: left;
    background-color: #ffd200;
    border: 0;
    height: 44px;
  }
  .dinglian-searchTopic-topicsLists {
    background-color: #ffffff;
  }
  .dinglian-searchTopic-topicsLists > li {
    list-style: none;
    height: 44px;
    line-height: 44px;
    text-align: left;
  }
  .dinglian-searchTopic-coteriesLists {
    background-color: #ffffff;
  }
  .dinglian-searchTopic-coteriesLists > li {
    list-style: none;
    height: 44px;
    line-height: 44px;
    text-align: left;
  }

</style>
