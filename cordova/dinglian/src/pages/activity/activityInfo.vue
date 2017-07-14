<template>
  <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore">
    <div>
      <ul style="border: 1px solid red">
        <li v-for="item in list">{{ item }}</li>
      </ul>
    </div>
  </mt-loadmore>
</template>
<script>
  export default{
    data () {
      return {
        list: ['q', 'w', 'd']
      }
    },
    methods: {
      loadTop () {
        console.log('下拉')
        this.$refs.loadmore.onTopLoaded()
      },
      loadBottom () {
        console.log('上拉拉加载')
        this.$refs.loadmore.onBottomLoaded()
      }
    }
  }
</script>
<style>

</style>
