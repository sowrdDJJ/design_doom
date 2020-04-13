<template>
  <div class="Collocetion-title-box">
    <div class="Collocetion-title-Top">
      <div class="return-btn">
        <router-link :to="`/personal/user=` + currUserId" tag="span" class="iconfont">&#xe61d;</router-link>
      </div>
      <div class="Collocetion-title-content">
        <span>{{colloectionTitle}}</span>
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
  name: 'CollocetionHeader',
  data () {
    return {
      CollocetionHeaderShow: false,
      commodityStateList: [],
      currUserId: this.$route.params.Userid
    }
  },
  props: {
    colloectionTitle: String
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
.Collocetion-title-box
  display: flex
  position: absolute
  top: 0
  left: 0
  width: 100vw
  height: 10vh
  .Collocetion-title-Top
    z-index: 2
    display: flex
    postion: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    .return-btn
      margin: .2rem .4rem
      width: 6.5%
      height: 100%
      line-height: 1rem
      text-align: center
      .iconfont
        font-size: .4rem
        color: #333
        font-weight: 600
        box-sizing: border-box
        padding-right: .07rem
    .Collocetion-title-content
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
      height: 100%
      line-height: 1rem
      text-align: center
      .iconfont
        font-size: .4rem
        color: #333
        font-weight: 600
        box-sizing: border-box
        padding-right: .07rem
</style>
