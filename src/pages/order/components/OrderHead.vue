<template>
  <div class="Order-title-box">
    <div class="Order-title-Top">
      <div class="return-btn">
        <router-link :to="`/personal/user=` + this.$route.params.UserId" tag="span" class="iconfont">&#xe61d;</router-link>
      </div>
      <div class="Order-title-content">
        <span>我的订单</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderHeader'
}
</script>

<style lang='stylus' scoped>
.Order-title-box
  display: flex
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 1.5rem
  .Order-title-Top
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
    .Order-title-content
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
