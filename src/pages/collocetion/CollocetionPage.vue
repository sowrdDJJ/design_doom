<template>
 <div>
   <div class="Collocetion-box">
     <Collocetion-header @cleaCommdityStateData='clearCommodityData' :colloectionTitle='colloectionTitle'></Collocetion-header>
     <Collocetion-middel :commodityList='commodityList' @commodityNumberChange='commodityNumberComputed'></Collocetion-middel>
   </div>
 </div>
</template>

<script>
// import Bscroll from 'better-scroll'
// import Bus from 'bus'
import axios from 'axios'
import CollocetionHeader from './components/Header'
import CollocetionMiddel from './components/Middel'
import { mapState } from 'vuex'
export default {
  name: 'CollocetionPage',
  components: {
    CollocetionHeader,
    CollocetionMiddel
  },
  data () {
    return {
      commodityList: [],
      commodityClass: [],
      colloectionTitle: ''
    }
  },
  methods: {
    getCityInfo () {
      axios.get('/data/getUserColloection', {
        params: {
          userId: this.currUserData.user_Id
        }
      })
        .then(this.getWheelPantionInfoSucc)
    },
    getWheelPantionInfoSucc (res) {
      res = res.data
      console.log(res)
      if (res.ret && res.data) {
        res.data.forEach(element => {
          this.$set(element, 'state', true)
        })
        this.commodityList = res.data
        this.commodityClass = res.colloectionImg
      }
      this.commodityClass = this.commodityClass.filter(e => {
        if (this.$route.params.collocetionId === e.id) {
          return e
        }
      })
      this.commodityList = this.commodityList.filter(e => {
        for (let i of this.commodityClass) {
          if (i.class === e.commodity_Class) {
            return true
          }
        }
      })
      console.log(this.commodityList)
      if (this.commodityClass && this.commodityList) {
        this.colloectionTitle = this.commodityList[0].commodity_Class
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
      axios.post('/data/postUserColloection', {
        colloectionList: delList,
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
.Collocetion-box {
  z-index: 3
  position: absolute
  top: 0
  background: white
  height: 100vh
  width: 100vw
}
</style>
