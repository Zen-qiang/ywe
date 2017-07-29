<template>
  <div>
    <!--活动详情-->
    <mt-header title="活动详情" class="dinglian-activityDetails-head">
      <router-link to="/index/eventsList" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!--轮播图start-->
    <!--<div class="dinglian-activityDetails-carousel">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item, index) in detailslList" :key="index">
          <img :src="item.imageUrl" />
        </mt-swipe-item>
      </mt-swipe>
    </div>-->
    <carousel :carouselList="detailslList" class="dinglian-activityDetails-carousel"></carousel>
    <!--轮播图end-->

    <div class="dinglian-activityDetails-theme">
      <input type="text" v-model="shortname" disabled="disabled">
    </div>
    <div class="dinglian-activityDetails-topInfo">
      <div class="mui-input-row">
        <label>状态</label>
        <input type="text" class="mui-input-clear" v-model="status" disabled="disabled">
      </div>
      <div class="mui-input-row">
        <label>组织者</label>
        <input type="text" class="mui-input-clear" v-model="organizer" disabled="disabled">
      </div>
      <div class="mui-input-row">
        <label>时间</label>
        <input type="text" class="mui-input-clear" v-model="rstime" disabled="disabled">
      </div>
      <div class="mui-input-row">
        <label>地址</label>
        <input type="text" class="mui-input-clear" v-model="gps" disabled="disabled">
      </div>
    </div>
    <div class="dinglian-activityDetails-signInfo">
      <div class="mui-input-row">
        <label class="dinglian-activityDetails-peoples">报名信息</label>
        <input type="text" class="mui-input-clear" disabled="disabled">
      </div>
      <div class="mui-input-row">
        <label>类型</label>
        <input type="text" class="mui-input-clear" disabled="disabled" v-model="typename">
      </div>
      <div class="mui-input-row">
        <label>费用</label>
        <input type="text" class="mui-input-clear" v-model="charge" disabled="disabled">
      </div>
      <div class="mui-input-row">
        <label>报名权限</label>
        <input type="text" class="mui-input-clear" disabled="disabled" v-model="isOpen">
      </div>
    </div>
    <mt-field placeholder="无活动备注" type="textarea" rows="4" v-model="description" disabled="disabled" ></mt-field>
    <!--<router-link v-bind='{to:"/signActivities/"+eventId}'>-->
    <mt-button type="default" size="large" class="dinglian-activityDetails-btn" @click="signUp">报名参加</mt-button>
    <!--</router-link>-->

  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import homeData from '../../mock/home-mock.js'
  import carousel from '../../components/common/carousel.vue'
  export default{
    components: {carousel},
    data () {
      return {
        detailslList: [],
        shortname: '',
        status: '',
        organizer: '',
        rstime: '',
        gps: '',
        charge: '',
        isOpen: '',
        description: '',
        typename: '',
        eventId: ''
      }
    },
    created () {
      this.detailslList = homeData.carouselList
      this.eventId = this.$route.params.id
      this.getActivityInfo()
    },
    methods: {
      getActivityInfo () {
        let data = {
          eventId: this.$route.params.id
        }
        this.axios({
          method: 'post',
          url: '/activity/getActivityInfo',
          data: data
        }).then(
          res => {
            this.shortname = res.data.result.name
            this.status = res.data.result.status
            this.organizer = res.data.result.organizer.organizerId
            this.rstime = res.data.result.startTime
            this.gps = res.data.result.gps
            this.typename = res.data.result.typename
            this.charge = res.data.result.charge
            this.isOpen = res.data.result.isOpen
            this.description = res.data.result.description
          }
        ).catch(
          err => {
            console.log(err)
          }
        )
      },
      signUp () {
        let data = {
          eventId: this.$route.params.id
        }
        if (this.charge === 'dutch') {
          this.$router.push({'path': '/signActivities/' + this.eventId})
        } else {
          this.axios({
            method: 'post',
            url: '/activity/signUp',
            data: data
          }).then(res => {
            if (res.data.status === 'ERROR') {
              Toast({
                message: res.data.message,
                duration: 1000
              })
            } else {
              this.$router.push({'path': '/index/eventsList/'})
            }
          }
          ).catch(
              error => {
                console.log(error)
              }
          )
        }
      }
    }
  }
</script>
<style scoped>
  .mui-input-row label[data-v-79221592] {
    text-align: left;
  }
  .dinglian-activityDetails-head {
    width: 100%;
    background-color: #ffd200;
    color: #333333;
    height: 44px;
    position: fixed;
    font-size: 17px;
    z-index: 8;
    top: 0;
  }
  .dinglian-activityDetails-carousel {
    margin-top: 44px;
    /*height: 280px;*/
    /*background: url(../../assets/images/carousel0.jpg);*/
  }

  .dinglian-activityDetails-theme{
    background-color: #ffffff;
    text-align: left;
  }
  .dinglian-activityDetails-theme input {
    height: 50px;
    margin: 0;
    border: 0;
    font-size: 15px;
    color: #333333;
  }
  .dinglian-activityDetails-topInfo{
    background-color: #ffffff;
  }
  .mui-input-row label {
    line-height: 2;
    color: #999999;
    font-size: 14px;
  }
  .mui-input-row input {
    height: 100%;
    font-size: 14px;
    color: #333333;
  }
  .dinglian-activityDetails-topInfo>div{
    height: 50px;
    border-top: 1px solid #dddddd;
  }
  .mui-input-row  .dinglian-activityDetails-peoples {
    color: #333333;
  }
  .dinglian-activityDetails-signInfo {
    background-color: #ffffff;
    margin:10px auto;
  }
  .dinglian-activityDetails-signInfo>div{
    height: 50px;
    border-top: 1px solid #dddddd;
  }

  .dinglian-activityDetails-btn{
    width: 92%;
    background-color: #ffd200 ;
    color: #333333;
    margin: 22px auto;
    height: 45px;
    margin-bottom: 86px;

  }

</style>
