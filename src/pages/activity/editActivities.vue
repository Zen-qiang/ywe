<template>
  <div>
    <mt-header title="编辑内容" class="dinglian-editActivities-head">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="mui-input-row dinglian-editActivities-theme">
      <label><img src="../../assets/images/header.png" alt=""></label>
      <input type="text" placeholder="赵丽颖邀请你嘿嘿嘿" v-model="shortname">
    </div>

    <div class="dinglian-editActivities-bodyInfo">

      <p class="dinglian-editActivities-upload" @click="openUpload">
          <img src="../../assets/images/upload.png" alt="" >
          <mt-actionsheet :actions="actions" v-model="pictures"></mt-actionsheet>
      </p>


      <div class="mui-input-row">
        <label @click="openPicker">时间</label>
        <!--<input type="text" class="mui-input-clear" @click="openPicker" placeholder="请输入时间" v-model="time">-->
        <time @click="openPicker">{{retime | data}}</time>
        <mt-datetime-picker ref="picker" type="datetime" v-model="retime" @confirm="handleConfirm"></mt-datetime-picker>
      </div>

      <div class="mui-table-view-cell" v-model="gps">
        <a class="mui-navigate-right">
          地址
        </a>
      </div>


      <div class="mui-input-row">
        <label>人数</label>
        <input type="text" class="mui-input-clear" placeholder="请输入参加人数" v-model="number">
      </div>

      <!--<div class="mui-card" v-model="charge">
        <label>费用</label>
        <form class="mui-input-group dinglian-editActivities-costForm">
          <div class="mui-input-row mui-radio mui-left dinglian-editActivities-cost">
            <input name="radio1" type="radio">
            <label>我请客</label>
          </div>
          <div class="mui-input-row mui-radio mui-left dinglian-editActivities-costA">

            <input name="radio1" type="radio" checked>
            <label>AA制</label>
          </div>
        </form>
      </div>-->
      <div class="dinglian-editActivities-costForm">
        <mt-radio
          title="费用"
          v-model="charge"
          :options="options">
        </mt-radio>
      </div>


      <div class="mui-input-row">
        <label>联系方式</label>
        <input type="text" class="mui-input-clear" placeholder="请输入手机号码" v-model="phoneNo">
      </div>
      <div class="mui-table-view-cell">
        <a class="mui-navigate-right">
          邀请好友
        </a>
      </div>
      <div class="mui-input-row">
        <label>公开</label>
        <mt-switch class="dinglian-editActivities-switch" v-model="isOpen"></mt-switch>
      </div>


      <div class="dinglian-editActivities-limiter">
        <mt-radio
          title="限定条件"
          v-model="limiter"
          :options="['仅圈内可见', '仅好友可见']">
        </mt-radio>
      </div>
    </div>
    <mt-field placeholder="活动备注" type="textarea" rows="4" v-model="description"></mt-field>


    <router-link to="/activity"><mt-button type="default" size="large" class="dinglian-editActivities-btn" @click="editActivities">发布</mt-button></router-link>
  </div>
</template>
<script>
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn')
  import { Toast } from 'mint-ui'
  export default {
    filters: {
      data (val) {
        return moment(val).calendar()
      }
    },
    data () {
      return {
        birthday: '',
        shortname: '',
        pictures: false,
        actions: [{name: '拍照'}],
        retime: '',
        gps: '',
        number: '',
        charge: '',
        isOpen: true,
        limiter: '',
        description: '',
        phoneNo: '',
        friends: [],
        options: [{label: '我请客', value: 'free'}, {label: 'AA制', value: 'dutch'}]
      }
    },
    methods: {
      openUpload () {
        this.pictures = true
      },
      openPicker () {
        this.$refs.picker.open()
      },
      handleConfirm () {
        console.log(this.retime)
        console.log(this.retime instanceof Date)
        this.$refs.picker.close()
      },
        // 发布活动
      editActivities () {
        let data = {
          typename: '街舞活动',
          isOpen: this.isOpen,
          tags: [1, 2],
          shortname: this.shortname,
          retime: 2017 - 10 - 15,
          number: this.number,
          charge: this.charge,
          cost: 0,
          gps: '上海市',
          description: this.description,
          limiter: this.limiter, // 限定条件
          pictures: '../../assets/images/upload.png',
          friends: [2, 3],
          phoneNo: this.phoneNo
        }
        console.log(data)
        // 请求start
        this.axios({
          method: 'post',
          url: '/activity/launchActivity',
          data: data
        }).then(res => {
//          console.log(res.data)
          if (res.data.status === 'ERROR') {
//            Toast(res.data.message)
          } else {
            Toast('发布活动成功！')
//            this.$router.push({'path': '/eventDetails'})
          }
        }).catch(
        )
        // 请求end
      }
    }
  }

</script>
<style>
  .dinglian-editActivities-head {
    background-color: #ffd200 ;
    color: #333333;
    margin:0 auto;
    width: 100%;
    height: 45px;
    position: fixed;
    top: 0;
    z-index: 8
  }
  .dinglian-editActivities-theme{
    margin-top: 45px;
    background-color: #ffffff;
    text-align: left;
    height: 80px;

  }
  .dinglian-editActivities-theme label{
    width: 100px;
  }
  .dinglian-editActivities-theme label img{
    width: 60px;
    height: 60px;
  }
  .dinglian-editActivities-theme input{
    height: 60px;
    margin:10px auto;
  }
  .dinglian-editActivities-bodyInfo{
    /*border:1px solid red;*/
    background-color: #ffffff;
    margin:20px auto;
  }
  .dinglian-editActivities-upload{
    width: 100%;
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-editActivities-upload img {
    height: 110px;
  }
  .dinglian-editActivities-bodyInfo > div{
    height: 56px;

  }
  /*更改底边框颜色*/
  .mui-btn-block,.mui-input-row,.mui-table-view-cell{
    width: 100%;
    margin-bottom: 0;
    border: 0;
    border-bottom: 1px solid #dddddd;
  }
  .mui-table-view-cell a {
    line-height: 34px;
    height: 56px;
  }
  .mui-input-row label,  .mui-card label{
    height: 56px;
    line-height: 34px;
  }
  .mui-input-row input{
    /*人数、手机号码*/
    height: 56px;
  }
  .mui-card{
    height: 200px;
    width: 100%;
    margin: 0;

  }
  .mui-card label{
    width: 35%;
    float: left;
    padding: 11px 15px;
    font-family: 'Helvetica Neue',Helvetica,sans-serif;
    font-size: 18px;
  }
  .mui-input-group{

    height: 56px;
    float: left;
    width: 260px;
  }
  /*费用*/
  .dinglian-editActivities-bodyInfo .dinglian-editActivities-costForm {
    height: 125px;

  }
  .dinglian-editActivities-costForm .dinglian-editActivities-cost {
    width: 180px;
    position: absolute;
  }
  .dinglian-editActivities-costForm .dinglian-editActivities-cost input, .dinglian-editActivities-costForm .dinglian-editActivities-costA input{
    top:12px;
  }
  .mui-radio.mui-left input[type=radio] {
    left: 0;
  }
  .dinglian-editActivities-costForm .dinglian-editActivities-cost label,.dinglian-editActivities-costForm .dinglian-editActivities-costA label{
    padding-right: 0px;
    padding-left: 30px;
    width: 90px;

  }
  .mui-input-group .dinglian-editActivities-costA {
    position: absolute;
    width: 150px;
    top:0;
    right: 0;
  }

  .mui-input-row .dinglian-editActivities-switch{
    margin-left: 120px;
    padding-left: 76px;
}
  .dinglian-editActivities-btn{
    width: 92%;
    background-color: #ffd200 ;
    color: #333333;
    margin: 22px auto;
    height: 45px;
    margin-bottom: 86px;
  }
  .dinglian-editActivities-bodyInfo .dinglian-editActivities-limiter {
    height: 124px;
    margin-bottom: 10px;
  }


</style>
