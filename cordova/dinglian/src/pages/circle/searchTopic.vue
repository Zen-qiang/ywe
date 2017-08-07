<template>
  <div>
    <div class="mui-input-row mui-search dinglian-searchTopic-search clearfix">
      <input type="search" class="mui-input-clear dinglian-searchTopic-write" placeholder="请输入圈子或者话题" v-model="search" @oninput="searchActivityOrTopic">
      <button class="dinglian-searchTopic-button" @click="gotoback">取消</button>
    </div>
    <ul class="dinglian-searchTopic-topicsLists">
        <!--话题-->
        <li v-for="item in topicsLists">
          <router-link v-bind='{to:"/previewDetails/"+item.coterieId+"/"+item.id}'>
            <p>{{item.description}}</p>
          </router-link>
        </li>
    </ul>
    <ul class="dinglian-searchTopic-coteriesLists">
      <!--圈子-->
      <li v-for="coter in coteriesLists">
        <router-link v-bind='{to:"/topicDetails/"+coter.id}'>
          <p>{{coter.name}}</p>
        </router-link>
      </li>
    </ul>
    <div v-show="emptyInfo" class="dinglian-searchTopic-emptyHistory" @click="emptyHistory">清空历史记录</div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  export default {
    data () {
      return {
        search: '',
        topicsLists: [],
        coteriesLists: [],
        emptyInfo: false
      }
    },
    created () {
    },
    watch: {
      search: function (e) {
        if (e === '') {
          this.emptyInfo = false
        }
      }
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
            this.emptyInfo = false
            this.topicsLists = res.data.result.topics
            this.coteriesLists = res.data.result.coteries
            let len = this.topicsLists.length + this.coteriesLists.length
            if (len > 0) {
              this.emptyInfo = true
            }
          }
        }).catch()
      },
      // 清空历史记录
      emptyHistory () {
        this.topicsLists = []
        this.coteriesLists = []
        this.emptyInfo = false
      }
    }
  }
</script>
<style scoped>
  .dinglian-searchTopic-search {
    background-color: #ffd200;
    height: 64px;
    padding-top: 20px;
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
    margin: 0;
    padding-left: 0;
  }
  .dinglian-searchTopic-topicsLists > li {
    list-style: none;
    height: 44px;
    line-height: 44px;
    text-align: left;
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-searchTopic-topicsLists li p {
    padding-left: 40px;
  }
  .dinglian-searchTopic-coteriesLists {
    background-color: #ffffff;
    margin: 0;
    padding-left: 0;
  }
  .dinglian-searchTopic-coteriesLists > li {
    list-style: none;
    height: 44px;
    line-height: 44px;
    text-align: left;
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-searchTopic-coteriesLists li p {
    margin-bottom: 0;
    padding-left: 40px;
  }
  .dinglian-searchTopic-emptyHistory {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #dddddd;
  }
</style>
