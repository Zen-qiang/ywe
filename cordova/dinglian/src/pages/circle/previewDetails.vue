<template>
  <div class="dinglian-previewDetails-all">
    <mt-header title="预览详情">
      <router-link v-bind='{to:"/topicDetails/"+detailsId}' slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right">
        <img src="#" height="20" width="20" slot="icon">
        自定义图标
      </mt-button>
    </mt-header>
    <topic-info :info="topicComments"></topic-info>


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
        topicComments: []
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
            this.topicComments = res.data.result.info
            console.log('qwqeqweqw')
            console.log(this.topicComments)
          }
        }).catch()
      }
    }
  }
</script>
<style scoped>

</style>
