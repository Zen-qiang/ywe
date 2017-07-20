<template>
  <div>
    <button @click="getVideo">video</button>
    <div id="text"></div>
  </div>
</template>
<script>
  import {takePhoto} from '../../assets/js/video'
  export default{
    data () {
      return {
      }
    },
    methods: {
      getVideo () {
        takePhoto()
      }
    }
  }
</script>
<style>

</style>
