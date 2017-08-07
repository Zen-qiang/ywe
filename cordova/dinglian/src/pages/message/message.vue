<template>
  <div style="width: 100%;" class="dinglian-message">
    <div class = "mui-content">
      <div class="mui-row dinglian-header-bar">
        <div class="mui-col-sm-2 mui-col-xs-2 dinglian-message-header-contacts">
          联系人
        </div>
        <div class="mui-col-sm-8 mui-col-xs-8 dinglian-header-main">
          消息
        </div>
        <div class="mui-col-sm-2 mui-col-xs-2 dinglian-header-add" @click="addChat">
          <div class="mui-icon mui-icon-plusempty"></div>
        </div>
      </div>
      <mt-navbar v-model="selectedTab" class="dinglian-message-navbar" style="margin-top: 66px;margin-bottom: 5px;">
        <mt-tab-item id="all" @click="getChatList('all')">全部消息</mt-tab-item>
        <mt-tab-item id="activity" @click="getChatList('activity')">活动消息</mt-tab-item>
        <mt-tab-item id="system" @click="getChatList('system')">系统消息</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selectedTab">
        <mt-tab-container-item id="all">
          <mt-cell v-for="(n, index) in allMessage" :key="index" :title="'内容 ' + n" />
        </mt-tab-container-item>
        <mt-tab-container-item id="activity">
          <mt-cell v-for="(n, index) in activityMessage" :key="index" :title="'测试 ' + n" />
        </mt-tab-container-item>
        <mt-tab-container-item id="system">
          <mt-cell v-for="(n, index) in systemMessage" :key="index" :title="'选项 ' + n" />
        </mt-tab-container-item>
      </mt-tab-container>

    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      searchFriendValue: '',
      selectedTab: 'all',
      allMessage: [],
      activityMessage: [],
      systemMessage: []
    }
  },
  methods: {
    getChatList (type) {
    },
    addChat () {
    }
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
$backgroundColor: #ffd200;
$fontColor: #333333;
.dinglian-header-bar {
  background-color: $backgroundColor;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 8;
  text-align: center;
  color: $fontColor;
  padding-top: 20px;
}
.dinglian-message-header-contacts {
  font-size: 16px;
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
