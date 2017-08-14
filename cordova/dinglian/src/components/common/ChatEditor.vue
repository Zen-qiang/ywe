<template>
  <div class="m-chat-editor">
    <chat-emoji
      v-bind:type="type"
      v-bind:scene="scene"
      v-bind:to="to"
      v-show="isEmojiShown"
      v-on:add-emoji="addEmoji"
      v-on:hide-emoji="hideEmoji"
    ></chat-emoji>
    <div class="m-chat-editor-main">
      <span class="u-editor-input">
        <textarea v-model="msgToSent"></textarea>
      </span>
      <span class="u-editor-icons">
        <span class="u-editor-icon" @click.stop="showEmoji">
          <i class="u-icon-img"><img :src="icon1"></i>
        </span>
        <span class="u-editor-send" @click="sendTextMsg">发 送</span>
      </span>
    </div>
  </div>
</template>
<script>
import ChatEmoji from './ChatEmoji'
// import util from '../../utils'
import config from '../../configs'
import { Toast } from 'mint-ui'
import * as types from '../../store/mutation-types'
export default {
  components: {
    ChatEmoji
  },
  updated () {
    window.document.body.addEventListener('click', () => {
      this.isEmojiShown = false
    })
  },
  props: {
    type: String,
    scene: String,
    to: String
  },
  data () {
    return {
      isEmojiShown: false,
      msgToSent: '',
      icon1: `${config.resourceUrl}/im/chat-editor-1.png`,
      icon2: `${config.resourceUrl}/im/chat-editor-2.png`,
      icon3: `${config.resourceUrl}/im/chat-editor-3.png`
    }
  },
  methods: {
    sendTextMsg () {
      if (/^\s*$/.test(this.msgToSent)) {
        Toast('请不要刷屏')
        return
      } else if (this.msgToSent.length > 800) {
        Toast('请不要超过800个字')
        return
      }
      if (this.type === 'session') {
        let nim = this.$store.state.nim
        nim.sendText({
          scene: 'p2p',
          to: this.to,
          text: this.msgToSent,
          done: (error, msg) => {
            console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient, error, msg)
            this.$store.dispatch(types.UPDATECURSESSIONS, msg)
            this.$emit('msgs-loaded')
          }
        })
      } else if (this.type === 'chatroom') {
        let chatroom = this.$store.state.chatroom
        chatroom.sendText({
          text: this.msgToSent,
          done: (error, msg) => {
            console.log('发送聊天室' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient, error, msg)
          }
        })
      }
      this.msgToSent = ''
    },
    sendPlayMsg () {
      // 发送猜拳消息
      if (this.type === 'session') {
        this.$store.dispatch('sendMsg', {
          type: 'custom',
          scene: this.scene,
          to: this.to,
          pushContent: '[猜拳]',
          content: {
            type: 1,
            data: {
              value: Math.ceil(Math.random() * 3)
            }
          }
        })
      } else if (this.type === 'chatroom') {
        this.$store.dispatch('sendChatroomMsg', {
          type: 'custom',
          pushContent: '[猜拳]',
          content: {
            type: 1,
            data: {
              value: Math.ceil(Math.random() * 3)
            }
          }
        })
      }
    },
    sendFileMsg () {
      let ipt = this.$refs.fileToSent
      if (ipt.value) {
        if (this.type === 'session') {
          this.$store.dispatch('sendFileMsg', {
            scene: this.scene,
            to: this.to,
            fileInput: ipt
          })
        } else if (this.type === 'chatroom') {
          this.$store.dispatch('sendChatroomFileMsg', {
            fileInput: ipt
          })
        }
      }
    },
    showEmoji () {
      this.isEmojiShown = true
    },
    hideEmoji () {
      this.isEmojiShown = false
    },
    addEmoji (emojiName) {
      this.msgToSent += emojiName
      this.hideEmoji()
    }
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
$backgroundColor: #ffd200;
$fontColor: #333333;
.m-chat-editor {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  z-index: 1000;
  background-color: #ffffff;
}
.m-chat-editor-main .u-editor-input{
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  padding: 0.2rem;
  padding-right: 10rem;
  width: 100%;
  height: 4rem;
}
.m-chat-editor-main .u-editor-input textarea{
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  padding: 0.2rem;
  font-size: 1rem;
  width: 100%;
  height: 100%;
  text-align: left;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
}
.m-chat-editor-main .u-editor-icons {
  position: absolute;
  display: inline-block;
  right: 0;
  top: 0;
  width: 9rem;
  height: 4rem;
}
.m-chat-editor-main .u-editor-icons .u-editor-icon {
  position: relative;
  display: inline-block;
  top: .65rem;
  width: 2.6rem;
  height: 2.6rem;
  margin-right: 17rem;
  vertical-align: middle;
}
.u-icon-img {
  position: relative;
  width: inherit;
  height: inherit;
}
.u-icon-img img {
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.m-chat-editor-main .u-editor-send {
  position: relative;
  display: inline-block;
  top: -2rem;
  margin-left: 2.2rem;
  width: 5rem;
  height: 3rem;
  line-height: 3rem;
  // padding: 0.1rem 0.2rem;
  border-radius: 0.2rem;
  font-size: 0.9rem;
  color: $fontColor;
  background-color: $backgroundColor;
  text-align: center;
}
</style>
