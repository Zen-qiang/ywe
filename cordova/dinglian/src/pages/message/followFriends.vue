<template>
  <div style="width: 100%;" class="dinglian-contacts">
    <div class = "mui-content">
      <dianlian-header-bar :title="headerTitle"></dianlian-header-bar>
      <div   v-for="(item, index) in attentionList" :key="index">
        <mt-cell-swipe
        :icon="item.picture"
        :title="item.nickName"
        is-link
        :to="'friendCard/' + item.accid  "
        :right="[
        {
          content: '删除',
          style: { background: 'red', color: '#fff' },
          handler: () => this.$messagebox('delete')
        }
        ]"></mt-cell-swipe>
      </div>
    </div>
  </div>
</template>
<script>
// import * as types from '../../store/mutation-types'
import { Toast } from 'mint-ui'
import config from '../../configs'
import DianlianHeaderBar from '../../components/common/dianlianHeaderBar'
export default {
  components: { DianlianHeaderBar },
  data () {
    return {
      headerTitle: '我关注的',
      attentionList: []
    }
  },
  created () {
    this.getUserAttention()
  },
  methods: {
    historyBack () {
      this.$router.go(-1)
    },
    addFriend () {
      this.$router.push({ path: 'addFriend' })
    },
    getUserAttention () {
      let data = {
        isAttention: true,
        start: 0,
        pagesize: 1000
      }
      this.axios({
        method: 'get',
        url: '/user/getUserAttention?isAttention=true',
        data: data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        if (res.data.status === 'ERROR') {
          Toast(res.data.message)
        } else {
          this.attentionList = res.data.result.lists
          this.attentionList.map(item => {
            item.picture = config.pictureServer + item
          })
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
$backgroundColor: #ffd200;
$fontColor: #333333;
.dinglian-header-bar{
  background-color: $backgroundColor;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 8;
  text-align: center;
  color: $fontColor;
}
.dinglian-message-header-contacts {
  font-size: 16px;
}
.dinglian-message-header-contacts button{
  background-color: $backgroundColor;
}
.dinglian-header-main {
  font-size: 20px;
}
.dinglian-header-add  > .mui-icon {
  font-size: 32px;
}
.dinglian-message-navbar > .mint-tab-item {
  color: $fontColor;
}
.dinglian-message-navbar > .is-selected {
  border-bottom: 2px solid $backgroundColor;
}
</style>
