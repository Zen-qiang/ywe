<template>
  <div>
    <mt-header title="编辑内容">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <mt-field label="人数" placeholder="请输入参加人数" type="number" v-model="number"></mt-field>
    <mt-field label="联系方式" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    <mt-field placeholder="活动备注" type="textarea" rows="4" v-modal="introduction"></mt-field>


    <router-link to="/eventsList"><mt-button type="default" size="large">发布</mt-button></router-link>
  </div>
</template>
<script>

</script>
<style>

</style>
