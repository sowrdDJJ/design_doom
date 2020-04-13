<template>
  <div>
     <div class="personal-middel">
      <div class="user-head">
        <img class="user-head-img" :src="`${currUserDataUser_Img}`" alt="">
      </div>
      <div class="presonal-navigation">
        <router-link tag="div" :to='`/personal/user=`+ 1 +`/order`' class="presonal-navigation-tag">
            <span>
                我的订单
            </span>
        </router-link>
      </div>
      <div class="personal-collection" v-show="optionShowCollection">
        <transition-group
        name="custom-classes-transition"
        enter-active-class="animated bounceInLeft"
        leave-active-class="animated bounceOutLeft"
        :duration='1000'>
        <div class="personal-collention-btn" :key="0">
          <div class="personal-collention-btn-object">
            <span class="iconfont">我的收藏</span>
          </div>
        </div>
            <personal-collection :collection='collectionList' :colloectionImg='colloectionImg' v-show="optionShowCollection" :key="1"></personal-collection>
        </transition-group>
      </div>
      <div class="personal-shoppingCar-btn">
          <router-link tag="div" :to='`/personal/user=`+ 1 +`/shoppingCar`' class="personal-shoppingCar-btn-object" >
            <span>我的购物车</span>
          </router-link>
      </div>
     </div>
  </div>
</template>

<script>
import PersonalCollection from './Collection'
import { mapState } from 'vuex'
import Bus from 'bus'
export default {
  name: 'PersonalMiddel',
  components: {
    PersonalCollection
  },
  data () {
    return {
      optionShowCollection: true,
      optionShowShoppingCar: false,
      currOptionPosition: 0,
      currUserDataUser_Img: ''
    }
  },
  props: {
    collectionList: Array,
    colloectionImg: Array
  },
  methods: {
    setupdateUserHeadImg (e) {
      this.currUserDataUser_Img = e
    }
  },
  computed: {
    ...mapState(['currUserData'])
  },
  created () {
    this.currUserDataUser_Img = this.currUserData.user_Img
    console.log(this.currUserData)
    Bus.$on('updateUserHeadImg', this.setupdateUserHeadImg)
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl';
.personal-middel
  display: flex
  position: absolute
  top: 18vh
  height: 75vh
  width: 100vw
  .user-head
    position: absolute
    top: 2%
    left: 35%
    height: 17vh
    width: 30vw
    background: $bgColorFirst
    border-radius: 1.5rem
    .user-head-img
      width: 100%
      height: 100%
      border-radius: 1.5rem
      box-shadow: 1vh 1vh 1vh #888
  .presonal-navigation
    position:absolute
    top: 20vh
    width: 45vw
    height: 11.5vh
    background: $bgColorFifth
    border-radius: 2vw
    .presonal-navigation-tag
      width: 100%
      height: 100%
      font-size: 16px
      box-sizing: border-box
      padding: .2rem .1rem
      line-height: 9vh
      text-align: center
      font-weight: 600
      color: white
  .personal-collection
    background: white
    position: absolute
    top: 35vh
    height: 48%
    width: 100%
    // background-image: linear-gradient($bgColorSecond,white)
    box-shadow: 1vh 1vh 6vh #888
    border-radius: 2vw
  .personal-collention-btn
    display: flex
    position: absolute
    top: -.1rem
    width: 3rem
    height: 1rem
    .personal-collention-btn-object
      width: 100%
      height: 100%
      box-sizing: border-box
      line-height: .5rem
      text-align: center
      padding: .3rem .2rem
      .iconfont
        font-weight: 600
        color: #ccc
        font-size: .5rem
  .personal-shoppingCar-btn
    display: flex
    background: $bgColorFifth
    position: absolute
    top: 20vh
    right: 0
    width: 45vw
    height: 11.5vh
    border-radius: 2vw
    .personal-shoppingCar-btn-object
      width: 100%
      height: 100%
      font-size: 16px
      box-sizing: border-box
      line-height: 9vh
      text-align: center
      color: white
      padding: .2rem .1rem
      font-weight: 600
</style>
