<template>
  <mt-header :title="title" class="dinglian-header-bar">
    <router-link to = "" slot="left">
      <mt-button icon="back" @click="historyBack"></mt-button>
    </router-link>
  </mt-header>
</template>
<script>
export default {
  name: 'DianlianHeaderBar',
  props: {
    title: {
      type: String
    }
  },
  methods: {
    historyBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
$backgroundColor: #ffd300;
.dinglian-header-bar {
  background-color: $backgroundColor;
  color: #333333;
  margin:0 auto;
  height: 45px;
}
</style>
