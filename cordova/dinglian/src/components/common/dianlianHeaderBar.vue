<template>
  <mt-header :title="title" class="dinglian-header-bar">
    <router-link :to = "rollUrl" slot="left">
      <mt-button icon="back" @click="historyBack"></mt-button>
    </router-link>
    <mt-button slot="right" v-show="rightTitle" @click="goNext">{{rightTitle}}</mt-button>
  </mt-header>
</template>
<script>
export default {
  name: 'DianlianHeaderBar',
  props: {
    title: {
      type: String
    },
    rightTitle: {
      type: String
    },
    rollUrl: {
      type: String
    }
  },
  created () {},
  methods: {
    historyBack () {
      if (!this.rollUrl) {
        this.$router.go(-1)
      }
    },
    goNext () {
      this.$parent.goNextPage()
    }
  }
}
</script>
<style lang="scss" scoped type="text/css">
$backgroundColor: #ffd300;
.dinglian-header-bar {
  background-color: $backgroundColor;
  color: #333333;
  margin:0 auto;
  height: 0.64rem;
  position: fixed;
  z-index: 8;
  width: 100%;
  top: 0;
  padding-top: 0.2rem;
}
</style>
