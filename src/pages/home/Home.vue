<template>
  <div>
    <div class="home">
       <home-menu :menuList="menuList"></home-menu>
       <home-header></home-header>
       <home-swipre :list="swiperList"></home-swipre>
       <home-recomment :recomment="recomment" ></home-recomment>
       <home-commodityRegion></home-commodityRegion>
       <navigation></navigation>
    </div>
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeSwipre from './components/Swiper'
import HomeRecomment from './components/Recommend'
import HomeCommodityRegion from './components/commodity'
import HomeMenu from './components/Menu'
import Navigation from 'component/navigation/Navigation'
import axios from 'axios'
export default {
  name: 'home',
  components: {
    HomeHeader,
    HomeMenu,
    HomeSwipre,
    HomeRecomment,
    HomeCommodityRegion,
    Navigation
  },
  data () {
    return {
      keyWord: '',
      swiperList: [],
      recomment: [],
      menuList: []
    }
  },
  methods: {
    getCityInfo () {
      axios.get('/data/home')
        .then(this.getWheelPlantingInfoSucc)
    },
    getWheelPlantingInfoSucc (res) {
      console.log(res)
      res = res.data
      if (res.ret) {
        const data = res.data
        for (let i in data) {
          if (data[i].commodity_Class === '轮播广告') {
            this.swiperList.push(data[i])
          } else {
            this.recomment.push(data[i])
          }
        }
        this.menuList = res.menuList
      }
      console.log(this.menuList)
    },
    handleKeyWord (KeyWord) {
      this.keyWord = KeyWord
      console.log(this.KeyWord)
    }
  },
  mounted () {
    this.getCityInfo()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.home
  height: 13.3rem
  width: 100vh
  background-image: linear-gradient($bgColorFirst, $bgColorSecond)
</style>
