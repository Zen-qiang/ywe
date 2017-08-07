<template>
  <div style="width: 100%;">
    <div class="mui-content">
      <dianlian-header-bar :title="headerTitle"></dianlian-header-bar>
      <mt-field label="签名" placeholder="请填入我的签名" type="textarea" rows="4" v-model="signLog"></mt-field>
      <mt-button type="default" size="large" class="dianlian-signLog-button" @click="changeSignlog">确认</mt-button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import DianlianHeaderBar from '../../components/common/dianlianHeaderBar'
export default {
  components: { DianlianHeaderBar },
  data () {
    return {
      headerTitle: '修改签名',
      signLog: ''
    }
  },
  methods: {
    changeSignlog () {
      if (this.signLog === '') {
        Toast('请输入签名，再确认！')
        return
      }
      this.axios({
        method: 'post',
        url: '/user/changeSignLog',
        data: {
          signLog: this.signLog
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        if (res.data.status === 'ERROR') {
          Toast(res.data.message)
        } else {
          Toast('签名添加成功！')
        }
      }).catch(error => {
        console.log(error)
      })
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
.mint-field.is-textarea {
  margin-top: 64px;
}
</style>
