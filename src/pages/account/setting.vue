<template>
  <div style="width: 100%;">
    <div class="mui-content">
      <dianlian-header-bar :title="headerTitle"></dianlian-header-bar>
      <!-- 修改头像 -->
      <mt-cell title="修改头像" is-link to="changePicture"></mt-cell>
      <!-- 修改密码 -->
      <mt-cell title="修改密码" is-link to="changePassword"></mt-cell>
      <mt-button type="default" size="large" class="dianlian-logout-button" @click="logout">退出</mt-button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import DianlianHeaderBar from '../../components/common/dianlianHeaderBar'
import * as types from '../../store/mutation-types'
export default {
  components: { DianlianHeaderBar },
  data () {
    return {
      headerTitle: '设置'
    }
  },
  methods: {
    logout () {
      this.axios({
        method: 'get',
        url: '/user/logout',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        if (res.data.status === 'ERROR') {
          Toast(res.data.message)
        } else {
          this.$store.commit(types.LOGOUT)
          this.$router.replace('/login')
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
.dianlian-logout-button {
  background-color: $backgroundColor;
  color: #ffffff;
  position: relative;
  top: 100px;
}
</style>
