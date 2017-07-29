<template>
  <div style="width: 100%;">
    <div class="mui-content">
      <dianlian-header-bar :title="headerTitle"></dianlian-header-bar>
        <input type="file" @change="onFileChange($event)" ref="upload" name="upload">
        <mt-button type="default" size="large" class="dianlian-signLog-button" @click="changePicture($event)">确认</mt-button>
      <img :src='imgUrl' alt="" style="border: 1px solid red;width: 100px;height: 100px;">
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import DianlianHeaderBar from '../../components/common/dianlianHeaderBar'
// import $ from 'jquery'
export default {
  components: { DianlianHeaderBar },
  data () {
    return {
      headerTitle: '修改头像',
      file: '',
      imgUrl: ''
    }
  },
  created () {
    this.getUserPicture()
  },
  methods: {
    onFileChange (event) {
      event.preventDefault()
      this.file = event.target.files[0]
    },
    changePicture (event) {
      let formData = new FormData()
      formData.append('file', this.file)
      this.axios({
        method: 'post',
        url: '/user/updatePicture',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(res => {
        if (res.data.status === 'ERROR') {
          Toast(res.data.message)
        } else {
          Toast('头像修改成功！')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getUserPicture () {
      this.axios({
        method: 'get',
        url: '/user/getUser',
        params: {}
      }).then(res => {
        this.imgUrl = this.globalUrl.imgUrl + res.data.result.picture
      }).catch()
    }
  }
}
</script>
<style lang="scss" scoped type="text/css">
$backgroundColor: #ffd300;
.dianlian-signLog-button {
  background-color: $backgroundColor;
  color: #ffffff;
  position: relative;
  top: 100px;
}
  .dianlian-changePicture-upload {
    position: relative;
  }
  .dianlian-changePicture-upload > input {
    position: absolute;
    left: -9999px;
  }
  .dianlian-changePicture-upload > label {
    position: absolute;
    top: 0;left: 0;right: 0;bottom: 0;
    z-index: 10;
  }
</style>
