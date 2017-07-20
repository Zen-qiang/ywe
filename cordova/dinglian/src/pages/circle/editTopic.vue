<template>
  <div class="dinglian-editTopic-all">
    <mt-header title="编辑话题">
      <router-link v-bind='{to:"/topicDetails/"+detailsId}' slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" @click="editDiscover">发布</mt-button>
    </mt-header>
    <div class="dinglian-editTopic-upload">
      从相册中选取照片
    </div>
    <mt-field placeholder="自我介绍" type="textarea" rows="4" class="dinglian-editTopic-introduction" v-model="description"></mt-field>
    <div class="mui-input-row dinglian-editTopic-position">
      <label>地址</label>
      <input type="text" class="mui-input-clear" placeholder="请输入活动地址" >
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  export default{
    data () {
      return {
        description: '',
        detailsId: this.$route.params.id
      }
    },
    created () {
      console.log(this.detailsId)
    },
    methods: {
      editDiscover () {
        let data = {
          coterieId: this.detailsId,
          img: '',
          description: this.description
        }
        this.axios({
          method: 'post',
          url: '/discover/editDiscover',
          data: data
        }).then(res => {
          if (res.data.status === 'ERROR') {
            Toast({
              message: res.data.message,
              duration: 500
            })
          } else {
            Toast({
              message: '发布成功！',
              duration: 500
            })
            this.$router.push({'path': '/topicDetails/' + this.detailsId})
          }
        }).catch()
      }
    }
  }
</script>
<style scoped>
  .dinglian-editTopic-all {
    width: 100%;
    height: 100%;
  }
  .mint-header {
    background-color: #ffd200;
    color: #333333;
    font-size: 16px;
  }
  .dinglian-editTopic-upload {
    background-color: #ffffff;
    height: 110px;
  }
  .dinglian-editTopic-all .dinglian-editTopic-introduction {
    height: 21%;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-editTopic-position {
    background-color: #ffffff;
    margin-top: 10px;
  }

</style>
