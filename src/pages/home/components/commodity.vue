<template>
  <div class="commodity-region">
      <div class="commodity-region-title">
          <p class="titel">猜您喜欢</p>
      </div>
      <div class="commodity-box" >
        <div class="coomodity-region-centent" v-for="item of commodityArray" :key="item.id" >
            <div class="commodity-img">
                <img :src="item.commodity_Img" alt="商品图片">
            </div>
            <div class="commodity-name">
                <p>{{item.commodity_Name}}</p>
            </div>
            <div class="commodity-price">
                <p>{{item.commodity_Per}}</p>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HomeCommodityRegion',
  data () {
    return {
      commodityArray: [],
      screenHeight: document.documentElement.clientHeight,
      currHeight: 0,
      numberOne: 10,
      numberTwo: 19
    }
  },
  methods: {
    getCommodityData () {
      axios.get('data/homeCommodity', {
        params: {
          numberOne: this.numberOne,
          numberTwo: this.numberTwo
        }
      }).then(resulte => {
        resulte = resulte.data
        if (resulte.code === 202) {
          resulte.data.forEach(element => {
            this.commodityArray.push(element)
          })
        } else {
          this.$toast.fail('没有了')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getCommodityData()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .commodity-region
    position: absolute
    background: $bgColorFirst
    top: 94vh
    width: 100vw
    height: 100%
    .commodity-region-title
      box-shadow: $box-shadow
      background: $bgColorSecond
      height: .8rem
      width: 100%
      padding: .1rem .2rem
      margin-bottom: .3rem
      font-size: .45rem
      color: white
      font-weight: 600
    .commodity-box
      display: flex
      flex-wrap: wrap
      justify-content: space-around
      width: 100%
      height: 10rem
      .coomodity-region-centent
        width: 45%
        margin: .1rem 0
        height: 3rem
        background: white
        border: 1px solid #cecdcd
        border-radius: .3rem
        box-shadow: $box-shadow
        .commodity-img
          position: relative
          width:  75%
          height: 1.8rem
          box-sizing: border-box
          padding: .15rem
          margin: 0 12.5%
          img
            width: 100%
            height: 100%
      .commodity-name
        width: 100%
        height: .6rem
        box-sizing: border-box
        color: #666
        font-size: .2rem
        text-align: center
        line-height: .6rem
      .commodity-price
        width: 100%
        height: .6rem
        box-sizing: border-box
        color: #e2af36
        font-size: .3rem
        text-align: center
        line-height: .6rem
</style>
