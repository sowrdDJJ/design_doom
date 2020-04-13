<template>
  <div class="commodityBox">
    <commodity-header></commodity-header>
    <commodity-middel></commodity-middel>
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration='300'>
      <gallery v-show="galleryShow"></gallery>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import Bus from 'bus'
import Gallery from 'component/gallery/Gallery'
import CommodityHeader from './components/Header'
import CommodityMiddel from './components/Middel'
import { mapState } from 'vuex'
export default {
  name: 'Commodity',
  components: {
    CommodityHeader,
    CommodityMiddel,
    Gallery
  },
  data () {
    return {
      commodityKey: '',
      commodityInformation: [],
      galleryShow: false,
      keepAliveId: 0
    }
  },
  computed: {
    ...mapState(['currUserData']),
    currUserDataList () {
      return this.$store.state.currUserData
    }
  },
  methods: {
    obtainLetter (id) {
      this.commodityKey = id
      this.commodityData.forEach(e => {
        if (e.id === id) {
          this.commodityInformation = e
        }
      })
    },
    showImgStateFs (state) {
      this.galleryShow = state
    },
    getCommodityData () {
      console.log(this.$route.params.commodityId)
      if (this.currUserDataList) {
        axios.get('/data/getCommodity', {
          params: {
            commodityId: this.$route.params.commodityId,
            userId: this.currUserData.user_Id
          }
        })
          .then(this.getCommodityDataSucc)
      } else {
        axios.get('/data/getCommodity', {
          params: {
            commodityId: this.$route.params.commodityId
          }
        })
          .then(this.getCommodityDataSucc)
      }
    },
    getCommodityDataSucc (res) {
      if (res.data) {
        res = res.data
        if (res.ret && res.data) {
          const data = res.data
          this.commodityInformation = data
        }
        console.log(this.commodityInformation)
        Bus.$emit('commodityInformation', this.commodityInformation)
      } else {
        this.$route.go(-1)
      }
    }
  },
  created () {
    Bus.$on('showImgState', this.showImgStateFs)
  },
  mounted () {
    this.getCommodityData()
    this.keepAliveId = this.$route.params.commodityId
  },
  activated () {
    if (this.$route.params.commodityId !== this.keepAliveId) {
      this.getCommodityData()
    }
  }
}
</script>

<style lang='stylus' scoped>
.commodityBox
  position:fixed
  z-index: 99
  height: 13.3rem
  width: 100vw
  background: white
</style>
