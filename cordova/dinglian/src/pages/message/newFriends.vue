<template>
  <div style="width: 100%;" class="dinglian-contacts">
    <div class = "mui-content">
      <dianlian-header-bar :title="headerTitle"></dianlian-header-bar>
      <div  v-for="(item, index) in friendslist" :key="index" style="margin-top: 67px;">
        <mt-cell-swipe
        :icon="item.icon"
        :title="item.accid"
        is-link
        :to="'friendCard?account='+item.accid "
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
import * as types from '../../store/mutation-types'
import { Toast } from 'mint-ui'
import DianlianHeaderBar from '../../components/common/dianlianHeaderBar'
export default {
  components: { DianlianHeaderBar },
  data () {
    return {
      headerTitle: '新朋友'
    }
  },
  computed: {
    friendslist () {
      return this.$store.state.friendslist
    }
  },
  created () {
    let friendslist = this.$store.state.friendslist
    console.log(friendslist)
    if (friendslist.length === 0) {
      this.getFriendsList()
    }
  },
  methods: {
    historyBack () {
      this.$router.go(-1)
    },
    addFriend () {
      this.$router.push({ path: 'addFriend' })
    },
    getFriendsList () {
      let nim = this.$store.state.nim
      if (!nim || nim === null) {
        this.axios({
          method: 'get',
          url: '/user/getUser',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(res => {
          if (res.data.status === 'ERROR') {
            Toast(res.data.message)
          } else {
            this.$store.dispatch(types.GETUSERINFO, res.data.result)
            this.$store.dispatch(types.INITNIMSDK, res.data.result)
            nim = this.$store.state.nim
            nim.getFriends({
              done: (error, friends) => {
                console.log('获取好友列表' + (!error ? '成功' : '失败'), error, friends)
                if (!error) {
                  this.friendsList = friends
                  this.$store.state.friendslist = friends
                  console.log(this.friendsList)
                  //  onFriends(friends)
                }
              }
            })
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        nim.getFriends({
          done: (error, friends) => {
            console.log('获取好友列表' + (!error ? '成功' : '失败'), error, friends)
            if (!error) {
              console.log(friends)
              this.friendsList = friends
              this.$store.state.friendslist = friends
              // onFriends(friends)
            }
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
$backgroundColor: #ffd200;
$fontColor: #333333;
</style>
