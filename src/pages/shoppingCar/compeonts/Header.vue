<template>
  <div class="shoppingCar-title-box">
    <div class="shoppingCar-title-Top">
      <div class="return-btn">
        <router-link :to="`/personal/user=` + this.$route.params.UserId" tag="span" class="iconfont">&#xe61d;</router-link>
      </div>
      <div class="shoppingCar-title-content">
        <span>我的购物车</span>
      </div>
      <div class="cls-btn">
        <span class="iconfont" @click="clearCommodity">&#xe8b6;</span>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from 'bus'
export default {
  name: 'ShoppingCarHeader',
  data () {
    return {
      shoppingCarHeaderShow: false,
      commodityStateList: []
      // retreatRouter: this.$router.
    }
  },
  mounted () {
    Bus.$on('commodityListChange', this.watchCommodityStateDataList)
  },
  methods: {
    watchCommodityStateDataList (e) {
      this.commodityStateList = e
    },
    clearCommodity () {
      this.$dialog.confirm({
        title: '删除',
        message: '是否删除所选内容'
      }).then(() => {
        // on confirm
        console.log('确定')
        console.log(this.commodityStateList)
        this.$emit('cleaCommdityStateData', this.commodityStateList)
      }).catch(() => {
        // on cancel
        console.log('取消')
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
.shoppingCar-title-box
  display: flex
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 10vh
  .shoppingCar-title-Top
    z-index: 99
    display: flex
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    .return-btn
      margin: .2rem .4rem
      width: 6.5%
      height: 1rem
      line-height: 1rem
      text-align: center
      .iconfont
        font-size: .4rem
        color: #333
        font-weight: 600
        box-sizing: border-box
        padding-right: .07rem
    .shoppingCar-title-content
      height: 100%
      width: 66%
      box-sizing: border-box
      color: #333
      text-align: center
      line-height: 1.5rem
      font-size: .5rem
      font-weight: 600
    .cls-btn
      margin: .2rem .4rem
      width: 6.5%
      height: 1rem
      line-height: 1rem
      text-align: center
      .iconfont
        font-size: .4rem
        color: #333
        font-weight: 600
        box-sizing: border-box
        padding-right: .07rem
</style>
