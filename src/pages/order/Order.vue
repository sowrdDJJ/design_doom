<template>
 <div class="order-box">
   <order-head></order-head>
   <order-middle></order-middle>
 </div>
</template>

<script>
import OrderHead from './components/OrderHead'
import OrderMiddle from './components/OrderMiddle'
export default {
  name: 'Order',
  components: {
    OrderHead,
    OrderMiddle
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl'
.order-box
  position: absolute
  height: 100vh
  width: 100vw
  background: white
</style>
