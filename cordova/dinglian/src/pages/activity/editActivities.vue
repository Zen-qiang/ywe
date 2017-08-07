<template>
  <div>
    <mt-header title="编辑内容" class="dinglian-editActivities-head">
      <router-link to="/initiateActivities" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="mui-input-row dinglian-editActivities-theme">
      <label><img src="../../assets/images/header.png" alt=""></label>
      <input type="text" placeholder="填写活动标题" v-model="shortname">
    </div>
    <div class="dinglian-editActivities-bodyInfo">
      <!--<p class="dinglian-editActivities-upload" @click="openUpload">
        <img src="../../assets/images/upload.png" >
        <mt-actionsheet :actions="actions" v-model="pictures"></mt-actionsheet>
      </p>-->
      <upload v-on:files="getFromData"></upload>
      <div class="mui-input-row dinglian-editActivities-time">
        <label @click="openPicker">时间</label>
        <time @click="openPicker">{{retime | data}}</time>
        <mt-datetime-picker ref="picker" type="datetime" v-model="retime" @confirm="handleConfirm"></mt-datetime-picker>
      </div>
      <div class="mui-input-row">
        <label>地址</label>
        <input type="text" class="mui-input-clear" placeholder="请输入活动地址" v-model="address">
      </div>
      <div class="mui-input-row">
        <label>人数</label>
        <input type="number" class="mui-input-clear" min="0" placeholder="请输入参加人数" v-model="userCount">
      </div>
      <div class="dinglian-editActivities-costForm clearfix">
        <span class="dinglian-editActivities-costFormTitle">费用</span>
        <mt-radio v-model="charge" :options="options" class="dinglian-editActivities-costFormRadio">
        </mt-radio>
      </div>
      <div class="mui-input-row">
        <label>联系方式</label>
        <input type="number" class="mui-input-clear" placeholder="请输入手机号码" v-model="phoneNo">
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
      <div class="dinglian-editActivities-limiter clearfix">
        <mt-radio
          title="限定条件"
          v-model="limiter"
          :options="['仅圈内可见', '仅好友可见']">
        </mt-radio>
      </div>
    </div>
    <mt-field placeholder="活动备注" type="textarea" rows="4" v-model="description"></mt-field>
    <mt-button type="default" size="large" class="dinglian-editActivities-btn" @click="editActivities">发布</mt-button>
  </div>
</template>
<script>
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn')
  import Upload from '../../components/common/upload.vue'
  import { Toast } from 'mint-ui'
//  import {mapState} from 'vuex'
  import {mapGetters} from 'vuex'
  import * as types from '../../store/mutation-types'
  import {checkActivityInfo} from '../../assets/js/editActivity'
  export default {
    components: {
      Upload
    },
    filters: {
      data (val) {
        return moment(val).format('YYYY-MM-DD HH:mm')
      }
    },
//    computed: mapState({
//      eventInfo: state => state.eventInfo
//    }),
    computed: mapGetters({
      mytagsIdList: types.GETTAGS
    }),
    data () {
      return {
        birthday: '',
        shortname: '',
        pictures: [],
        actions: [
          {name: '拍照'},
          {name: '相册'}
        ],
        retime: '',
        gps: '',
        address: '',
        userCount: '',
        charge: '',
        isOpen: true,
        limiter: '',
        description: '',
        phoneNo: '',
        friends: [],
        options: [{label: '我请客', value: 'free'}, {label: 'AA制', value: 'dutch'}]
      }
    },
    created () {
      let mt = this.mytagsIdList
      if (typeof mt !== 'undefined') {
        let l = this.mytagsIdList.length
        let newMyTags = []
        for (var i = 0; i < l; i++) {
          if (typeof (mt[i]) === 'number') {
            newMyTags.push(mt[i])
          }
        }
        this.mytagsIdList = newMyTags
      }
    },
    methods: {
      getFromData (e) {
        this.pictures = e
      },
//      openUpload () {
//        this.pictures = true
//      },
      // 日期选择组件
      openPicker () {
        this.$refs.picker.open()
      },
      // 日期选择组件
      handleConfirm () {
        this.$refs.picker.close()
      },
        // 发布活动
      editActivities () {
        let data = {
          isOpen: this.isOpen,
          tags: this.mytagsIdList,
          name: this.shortname,
          startTime: this.retime.valueOf(),
          userCount: this.userCount,
          charge: this.charge,
          cost: 1,
          gps: '上海市',
          address: this.address,
          description: this.description,
          limiter: this.limiter, // 限定条件
          pictures: this.pictures,
          friends: [],
          phoneNo: this.phoneNo
        }
        // 请求start
        if (checkActivityInfo(this.shortname, this.userCount, this.charge, this.address, this.phoneNo)) {
          this.axios({
            method: 'post',
            url: '/activity/launchActivity',
            data: data,
            test: 'www',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            timeout: 50000
          }).then(res => {
            if (res.data.status === 'ERROR') {
              Toast(res.data.message)
            } else {
              Toast({
                message: '发布活动成功！',
                duration: 500
              })
              let lists = res.data.result
              if (lists.status === '1') {
                lists.status = '进行中'
              } else if (lists.status === '2') {
                lists.status = '正在报名'
              } else if (lists.status === '3') {
                lists.status = '好友参与'
              } else if (lists.status === '0') {
                lists.status = '已关闭'
              }
              this.$store.commit(types.SETINFO, lists)
              this.$router.push({'path': '/eventDetails'})
            }
          }).catch(error => {
            Toast({
              message: '请求失败！',
              duration: 500
            })
            console.log(error)
          }
          )
        }
        // 请求end
      }
    }
  }

</script>
<style scoped>
  @import '../../assets/css/common.css';
  div {
    text-align: left;
  }
  .mint-actionsheet {
    text-align: center;
  }
  .dinglian-editActivities-head {
    background-color: #ffd200 ;
    color: #333333;
    margin:0 auto;
    width: 100%;
    height: 64px;
    position: fixed;
    top: 0;
    font-size: 17px;
    z-index: 8;
    padding-top: 20px;
  }
  .dinglian-editActivities-theme{
    margin-top: 64px;
    background-color: #ffffff;
    text-align: left;
    height: 69px;

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
    margin-top: 3%;
    font-size: 17px;
  }
  .dinglian-editActivities-bodyInfo{
    /*border:1px solid red;*/
    background-color: #ffffff;
    margin:10px auto;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
  }
  .dinglian-editActivities-upload{
    width: 100%;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 0;
  }
  .dinglian-editActivities-upload img {
    height: 110px;
    width: 100%;
  }
  .dinglian-editActivities-bodyInfo > div{
    height: 50px;
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
    height: 50px;
    color: #999999;
    font-size: 14px;
  }
  /*时间、人数、联系方式*/
  .mui-input-row label, .mui-card label{
    height: 50px;
    line-height: 34px;
    color: #999999;
    font-size: 14px;
  }
  /*时间*/
  .dinglian-editActivities-time time {
    position: relative;
    top: 16px;
    font-size: 14px;
    color: #666666;
  }
  /*地址*/
  .mui-table-view-cell:after {
    height: 0;
  }
  /*人数、手机号码*/
  .mui-input-row input{
    height: 50px;
    color: #999999;
    font-size: 14px;
  }
  .mui-card label{
    width: 35%;
    float: left;
    padding: 11px 15px;
    font-family: 'Helvetica Neue',Helvetica,sans-serif;
    font-size: 18px;
  }
  /*费用*/
  .dinglian-editActivities-bodyInfo .dinglian-editActivities-costForm {
    height: 122px;
    border-bottom:1px solid #dddddd;
  }
  .dinglian-editActivities-costFormTitle {
    background-color: #f2f2f2;
    padding-left: 15px;
    color: #999999;
    font-size: 14px;
  }
  .dinglian-editActivities-costFormRadio {
    color: #999999;
  }
  .dinglian-editActivities-costForm {
    background-color: #f2f2f2;
    overflow: hidden;
  }
  .mui-input-row .dinglian-editActivities-switch{
    margin-left: 30%;
    padding-left: 16%;

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
    height: 115px;
    border: 0;
    color: #999999;
  }
  .mint-field {
    /*background-color: red;*/
    border-top:1px solid #dddddd;
    border-bottom:1px solid #dddddd;
  }
  .dinglian-editActivities-bodyInfo .mint-radiolist-title {
    color: red;
    background-color: red;
  }
  .mint-field.is-textarea .mint-cell-value {
    padding: 0;
  }
</style>
