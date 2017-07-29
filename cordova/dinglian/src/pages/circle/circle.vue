<template>
  <div>
      <mt-header fixed title="圈子"></mt-header>
      <span class="dinglian-circle-headerSearch" @click="gotoSearch"></span>
    <div class="dinglian-circle-carousel">
      <mt-swipe :auto="5000">
        <mt-swipe-item v-for="(item, index) in circleCarousel" :key="index">
          <img :src="item.imageUrl" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="0">全部</mt-tab-item>
      <mt-tab-item id="1">街舞</mt-tab-item>
      <mt-tab-item id="2">桌游</mt-tab-item>
      <mt-tab-item id="3">其他</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="0">
        <ul class="dinglian-circle-tagList clearfix">
          <li v-for="(myItem,id) in tagList" :class="{'dinglian-circle-tags':!myItem.show,'dinglian-circle-changetags':myItem.show}" @click="getMyTag(myItem,id)" >
            <span>{{myItem.tagName}}</span>
          </li>
        </ul>
        <circleInfo :lists="coterieList"></circleInfo>
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
        <ul class="dinglian-circle-tagList clearfix">
          <li v-for="(myItem,id) in tagList" :class="{'dinglian-circle-tags':!myItem.show,'dinglian-circle-changetags':myItem.show}" @click="getMyTag(myItem,id,'街舞')" >
            <span>{{myItem.tagName}}</span>
          </li>
        </ul>
        <circleInfo :lists="coterieList"></circleInfo>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <ul class="dinglian-circle-tagList clearfix">
          <li v-for="(myItem,id) in tagList" :class="{'dinglian-circle-tags':!myItem.show,'dinglian-circle-changetags':myItem.show}" @click="getMyTag(myItem,id,'桌游')" >
            <span>{{myItem.tagName}}</span>
          </li>
        </ul>
        <circleInfo :lists="coterieList"></circleInfo>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <ul class="dinglian-circle-tagList clearfix">
          <li v-for="(myItem,id) in tagList" :class="{'dinglian-circle-tags':!myItem.show,'dinglian-circle-changetags':myItem.show}" @click="getMyTag(myItem,id,'其他')" >
            <span>{{myItem.tagName}}</span>
          </li>
        </ul>
        <circleInfo :lists="coterieList"></circleInfo>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  import homeData from '../../mock/home-mock.js'
  import { Toast } from 'mint-ui'
  import Vue from 'vue'
  import circleInfo from './circleInfo.vue'
  import * as types from '../../store/mutation-types'
  import {mapGetters} from 'vuex'
  export default {
    components: {circleInfo},
    watch: {
      selected: function (val, oldVal) {
        if (val === '0') {
          this.getTagList()
          this.getCoterieList()
        } else {
          this.getTagList(val)
          if (val === '1') {
            this.getCoterieList('街舞')
          } else if (val === '2') {
            this.getCoterieList('桌游')
          } else if (val === '3') {
            this.getCoterieList('其他')
          }
        }
      }
    },
    data () {
      return {
        selected: '0',
        circleCarousel: [],
        tagList: [],
        coterieList: [],
        pagesize: 5,
        start: 0
      }
    },
    computed: mapGetters({
      circleTagsInfo: types.GETCIRCLEINFO
    }),
    created () {
      switch (this.circleTagsInfo) {
        case '街舞': this.selected = '1'
          break
        case '桌游': this.selected = '2'
          break
        case '其他': this.selected = '3'
          break
      }
      this.circleCarousel = homeData.carouselList
      this.getCoterieList()
      this.getTagList()
    },
    methods: {
      getMyTag (myItem, id, typename) {
        console.log(id)
        console.log(typeof id)
        for (var item in this.tagList) {
          if (item !== (id + '')) {
            Vue.set(this.tagList[item], 'show', false)
          } else {
            if (typeof myItem.show === 'undefined') {
              Vue.set(this.tagList[item], 'show', false)
            }
          }
        }
        if (myItem.show === true) {
          Vue.set(myItem, 'show', false)
          this.getCoterieList(typename)
        } else if (myItem.show === false) {
          Vue.set(myItem, 'show', true)
          this.getCoterieList(typename, myItem.tagId)
        }
      },
      getTagList (e) {
        let data = {
          typeNameId: e
        }
        this.axios({
          method: 'post',
          url: '/activity/getTagList',
          data: data
        }).then(
          res => {
            this.tagList = res.data.result
          }
        ).catch(
          err => {
            console.log(err)
          }
        )
      },
//      获取圈子列表
      getCoterieList (typename, tagid) {
        let data = {
          typename: typename,
          tagid: tagid,
          pagesize: this.pagesize,
          orderby: '',
          start: this.start
        }
        this.axios({
          method: 'post',
          url: '/discover/getCoterieList',
          data: data
        }).then(res => {
          console.log(res)
          if (res.data.status === 'ERROR') {
            Toast(res.data.message)
          } else {
            this.coterieList = res.data.result.lists
          }
        }).catch()
      },
      gotoSearch () {
        this.$router.push({'path': '/searchTopic'})
      }
    }
  }
</script>
<style scoped>
  div {
    width: 100%;
  }
  .dinglian-circle-carousel {
    width: 100%;
    height: 170px;
  }
  .dinglian-circle-carousel > .mint-swipe >.mint-swipe-items-wrap > .mint-swipe-item{
    width: 100%;
    height: 170px;
  }
  .dinglian-circle-carousel > .mint-swipe >.mint-swipe-items-wrap > .mint-swipe-item > img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .mint-header {
    background-color: #ffd200;
    color: #333333;
    height: 44px;
  }
  .dinglian-circle-carousel {
    margin-top: 44px;
    width: 100%;
    height: 170px;
  }
  .dinglian-circle-headerSearch {
    position: fixed;
    z-index: 2;
    right: 2rem;
    top: 1.2rem;
    background: url(../../assets/images/search.svg) no-repeat center center;
    width: 16px;
    height: 16px;
  }
  .dinglian-circle-tagList {
    padding-left: 0;
  }
  .dinglian-circle-tagList > li {
    list-style: none;
    float: left;
  }
  .dinglian-circle-tags {
    color: #999999;
    border: 1px solid #999999;
    font-size: 12px;
    padding: 5px;
    border-radius: 8px;
  }
  .dinglian-circle-changetags {
    background-color: #333333;
    color: #ffffff;
    border: 1px solid #333333;
    font-size: 12px;
    padding: 5px;
    border-radius: 8px;
  }
</style>
