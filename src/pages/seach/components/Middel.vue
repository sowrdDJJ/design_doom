<template>
<div class="seach-middel-showBox" ref="seachContentBox">
  <div class="seach-middel-box" :style="{'height':(seachBoxHeight +'rem')}" >
    <div class="seach-commodity-box" v-for="item of seachList" :key="item.id">
      <router-link :to="`/commodity/commodityId=`+item.id + '/userId=' + currUserData.user_Id " v-if="userState">
          <div class="seach-commodity-img">
              <img class="seach-img" :src="item.imgUrl">
              <div class="seach-sign">
                 <img src="~imgs/out.png" alt="商品状态标识" v-if='item.commodityState' class="commodity-sign">
              </div>
          </div>
          <div class="seach-commodity-title">
              <span>{{item.title}}</span>
          </div>
          <div class="seach-commodity-price">
              <span>￥{{item.price}}</span>
          </div>
      </router-link>
      <router-link :to="`/commodity/commodityId=`+item.id" v-else>
          <div class="seach-commodity-img">
              <img class="seach-img" :src="item.imgUrl">
              <div class="seach-sign">
                <img src="~imgs/out.png" alt="商品状态标识" v-if='item.commodityState' class="commodity-sign">
              </div>
          </div>
          <div class="seach-commodity-title">
              <span>{{item.title}}</span>
          </div>
          <div class="seach-commodity-price">
              <span>￥{{item.price}}</span>
          </div>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import Bscroll from 'better-scroll'
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  name: 'SeachMiddel',
  data () {
    return {
      seachBoxHeight: 0,
      userState: false,
      seachKeyWord: '',
      seachList: []
    }
  },
  watch: {
    seachList () {
      this.seachBoxHeight = this.seachList.length / 2 * 4
      console.log(1)
    }
  },
  computed: {
    ...mapState(['currUserData'])
  },
  created () {
    if (this.currUserData) {
      this.userState = true
      console.log(this.currUserData)
    } else {
      this.userState = false
    }
  },
  mounted () {
    this.getData()
    this.scroll = new Bscroll(this.$refs.seachContentBox, { mouseWheel: true, click: true, tap: true })
  },
  befordestroy () {
    console.log('销毁')
    this.userState = false
  },
  methods: {
    getData () {
      axios.get('/data/getSeach', {
        params: {
          key: `%` + this.$route.params.seachKeyWord + `%`
        }
      })
        .then(this.inputData)
    },
    inputData (res) {
      console.log(res.data)
      this.seachKeyWord = this.$route.params.seachKeyWord
      if (res.data) {
        res = res.data
        if (res.ret) {
          const data = res.data
          this.seachList = data
          console.log(this.seachList)
        }
      } else {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      }
    }
  },
  activated () {
    if (this.$route.params.seachKeyWord !== this.seachKeyWord && this.seachKeyWord) {
      this.getData()
    }
  }
}
</script>

<style lang='stylus' seoped>
@import '~styles/varibles.styl'
.seach-middel-showBox
  overflow: hidden
  display: flex
  flex-grow: 1
  flex-wrap: wrap
  position: absolute
  top: 2.5rem
  left: 0
  width: 100%
  height: 11rem
  .seach-middel-box
    display: flex
    flex-wrap: wrap
    position: absolute
    left: 0
    width: 100%
    .seach-commodity-box
      width: 40%
      margin: .1rem .3rem
      height: 4.5rem
      background: white
      border: 1px solid #cecdcd
      border-radius: .3rem
      box-shadow: $box-shadow
      .seach-commodity-img
        position: relative
        width: 100%
        height: 60%
        box-sizing: border-box
        padding: 5%
        .seach-img
          width: 100%
          height: 100%
        .seach-sign
          position: absolute
          top: 1.5rem
          width: 80%
          height: 1.5rem
          right: 0px
          .commodity-sign
           width: 100%
           height: 100%
      .seach-commodity-title
        width: 100%
        height: 20%
        box-sizing: border-box
        padding: 5%
        color: #666
        font-size: .2rem
        text-align: center
        line-height: .6rem
      .seach-commodity-price
        width: 100%
        height: 20%
        box-sizing: border-box
        padding: 5%
        color: #e2af36
        font-size: .3rem
        text-align: center
        line-height: .6rem
</style>
