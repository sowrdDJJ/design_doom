<template>
  <div>
    <div class="Recomment">
          <transition-group
          name="custom-classes-transition"
          enter-active-class="animated zoomIn"
          leave-active-class="animated bounceOutRight">
          <div class="recomment-content" v-for="item of recomment" :key="item.id">
              <a :href="item.commodity_link">
                <img :src="item.commodity_img" class="recomment-content-img">
                <label class="recomment-content-title">{{item.commodity_Name}}</label>
              </a>
          </div>
         </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecomment',
  props: {
    recomment: Array
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.Recomment
  position: absolute
  top: 38.5vh
  height: 54.5vh
  width: 100vw
  background: $bgColorFirst
  .recomment-content
    float: left
    width: 45%
    margin: 1% 2.5%
    height: 45%
    text-align: center
    background: white
    box-shadow: .1rem .1rem .2rem #888888
    border-radius: .2rem
    .recomment-content-img
      width: 100%
      margin: 10% 0
      border-radius: .1rem
    .recomment-content-title
      color: #666
      line-height: 5%
    .recomment-content-perice
      color: #d4b61d
</style>
