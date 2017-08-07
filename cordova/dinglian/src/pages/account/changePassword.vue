<template>
  <div style="width: 100%;">
    <div class="mui-content">
      <dianlian-header-bar :title="headerTitle"></dianlian-header-bar>
      <div class="dianlian-signLog-main">
        <div class="mui-row" style="height:12px;width:100%;background-color:transparent"></div>
        <mt-field class= "dianlian-changepassword" label="原始密码" placeholder="请输入密码" type="password" v-model="originPassword"></mt-field>
        <mt-field class= "dianlian-changepassword" label="新密码" placeholder="请输入密码" type="password" v-model="newPassword"></mt-field>
        <mt-field class= "dianlian-changepassword" label="确认密码" placeholder="请输入密码" type="password" v-model="comfirePassword"></mt-field>
        <mt-button type="default" size="large" class="dianlian-signLog-button" @click="changePassword">确认</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import DianlianHeaderBar from '../../components/common/dianlianHeaderBar'
import {judgmentpsw} from '../../assets/js/tool'
export default {
  components: { DianlianHeaderBar },
  data () {
    return {
      headerTitle: '修改密码',
      originPassword: '',
      newPassword: '',
      comfirePassword: ''
    }
  },
  methods: {
    changePassword () {
      if (judgmentpsw(this.newPassword)) {
        if (this.newPassword === this.comfirePassword) {
          this.axios({
            method: 'get',
            url: '/user/changePassword',
            data: {
              newPassword: this.newPassword
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          }).then(res => {
            if (res.data.status === 'ERROR') {
              Toast(res.data.message)
            } else {
              Toast('修改密码成功！')
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          Toast('确认密码需要跟新密码保持一致！')
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
$backgroundColor: #ffd300;
.dianlian-signLog-button {
  background-color: $backgroundColor;
  color: #ffffff;
  position: relative;
  top: 100px;
}
.dianlian-changepassword input {
  margin-bottom: 8px !important;
}
  .dianlian-signLog-main {
    margin-top: 64px;
  }
</style>
