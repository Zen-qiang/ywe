<template>
  <div>
    <div class="mui-input-row mui-search dinglian-searchTopic-search clearfix">
      <input type="search" class="mui-input-clear dinglian-searchTopic-write" placeholder="请输入圈子或者话题">
      <button class="dinglian-searchTopic-button" @click="gotoback">取消</button>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        search: ''
      }
    },
    methods: {
      gotoback () {
        this.$router.go(-1)
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

</style>
