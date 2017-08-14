<template>
  <ul id="chat-list" class="m-chat-list p-chat-list">
      <li class="u-msg item-time" v-if="canLoadMore">
        ---- 上拉加载更多 ----
      </li>
      <li class="u-msg item-time" v-else>
        ---- 已无更多记录 ----
      </li>
      <chat-item
        v-for="msg in msglist"
        :type="type"
        :rawMsg="msg"
        :isRobot="isRobot"
        :userInfos="userInfos"
        :robotInfos="robotInfos"
        :myInfo="myInfo"
        :key="msg.idClient"
        @msg-loaded="msgLoaded"
      ></chat-item>
    </ul>
</template>
<script type="text/javascript">
  // import util from '../../utils'
  // import config from '../../configs'
  // import emojiObj from '../../configs/emoji'
  import ChatItem from './ChatItem'

  export default {
    components: {
      ChatItem
    },
    props: {
      type: String, // 类型，chatroom, session
      canLoadMore: [String, Boolean],
      isRobot: {
        type: Boolean,
        default () {
          return false
        }
      },
      msglist: {
        type: Array,
        default () {
          return []
        }
      },
      userInfos: {
        type: Object,
        default () {
          return {}
        }
      },
      myInfo: {
        type: Object,
        default () {
          return {}
        }
      },
      robotInfos: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        isFullImgShow: false,
        msgLoadedTimer: null,
        topStatus: ''
      }
    },
    mounted () {
      this.msgLoaded()
    },
    methods: {
      showFullImg (src) {
        this.$store.dispatch('showFullscreenImg', {
          src
        })
      },
      msgLoaded () {
        clearTimeout(this.msgLoadedTimer)
        this.msgLoadedTimer = setTimeout(() => {
          this.$emit('msgs-loaded')
        }, 20)
      }
    }
  }
</script>

<style type="text/css">
  .m-chat-list {
    position: relative;
    display: block;
    box-sizing: border-box;
    padding: 1rem 2%;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .p-chat-list {
    .u-icon {
      width: 1.4rem;
      height: 1.6rem;
      margin-right: 0.2rem;
      vertical-align: bottom;
    }
  }
</style>
