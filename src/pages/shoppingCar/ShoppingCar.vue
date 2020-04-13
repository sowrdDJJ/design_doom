<template>
 <div>
   <div class="shoppingCar-box">
     <shoppingCar-header @cleaCommdityStateData='clearCommodityData'></shoppingCar-header>
     <shoppingCar-middel :commodityList='commodityList' @commodityNumberChange='commodityNumberComputed'></shoppingCar-middel>
   </div>
 </div>
</template>

<script>
// import Bscroll from 'better-scroll'
// import Bus from 'bus'
import axios from 'axios'
import ShoppingCarHeader from './compeonts/Header'
import ShoppingCarMiddel from './compeonts/Middel'
import { mapState } from 'vuex'
export default {
  name: 'PersonalShoppingCar',
  components: {
    ShoppingCarHeader,
    ShoppingCarMiddel
  },
  data () {
    return {
      commodityList: []
    }
  },
  methods: {
    getCityInfo () {
      axios.get('/data/getUserShoppingCar', {
        params: {
          userId: this.currUserData.user_Id
        }
      })
        .then(this.getWheelPantionInfoSucc)
    },
    getWheelPantionInfoSucc (res) {
      res = res.data
      console.log(res.data)
      if (res.ret && res.data) {
        res.data.forEach(element => {
          this.$set(element, 'state', true)
        })
        this.commodityList = res.data
      }
    },
    commodityNumberComputed (letter) {
      this.commodityList = this.commodityList.map((e) => {
        if (e.id === letter.id) {
          if (letter.style === 'add') {
            let value = e.number + 1
            if (value < 10) {
              e.number = value
            }
            return e
          } else {
            let value = e.number - 1
            if (value > 0) {
              e.number = value
            }
            return e
          }
        } else {
          return e
        }
      })
    },
    clearCommodityData () {
      const delList = this.commodityList.filter((e) => e.state === true)
      this.commodityList = this.commodityList.filter((e) => e.state !== true)
      console.log(delList)
      axios.post('/data/postUserShoppingCar', {
        data: delList,
        actionStyle: 'del',
        userId: this.currUserData.user_Id
      }).then(res => {
        res = res.data
        if (res.ret && res.code === 200) {
          this.$toast.success('删除成功')
        }
      })
    }
  },
  computed: {
    ...mapState(['currUserData'])
  },
  mounted () {
    this.getCityInfo()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
.shoppingCar-box
  position: absolute
  z-index: 3
  background: white
  height: 100vh
  width: 100vw
</style>
