<template>
  <div class="order-middle">
    <div class="order-navgation-box">
        <ul>
            <router-link :to='`/personal/user=`+ 1 +`/order/orderPay`'>
              <li class="order-navgation" :class="{'action':orderNavigationShowList==='OrderPay'}" @click="orderNavgation('OrderPay')">代付款</li>
            </router-link>
            <router-link :to='`/personal/user=`+ 1 +`/order/orderReceiv`'>
              <li class="order-navgation" :class="{'action':orderNavigationShowList==='OrderReceiv'}" @click="orderNavgation('OrderReceiv')">待收货</li>
            </router-link>
            <router-link :to='`/personal/user=`+ 1 +`/order/orderEvaluate`'>
              <li class="order-navgation" :class="{'action':orderNavigationShowList==='OrderEvaluate'}" @click="orderNavgation('OrderEvaluate')">待评价</li>
            </router-link>
        </ul>
    </div>
    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" mode="out-in" duration='1000'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Bus from 'bus'
export default {
  name: 'OrderMiddle',
  data () {
    return {
      orderNavigationShowList: 'OrderPay',
      transtionOrderNavigationValue: ''
    }
  },
  methods: {
    orderNavgation (object) {
      const orderNavigationList = ['OrderPay', 'OrderReceiv', 'OrderEvaluate']
      orderNavigationList.forEach(e => {
        if (object === e) {
          this.orderNavigationShowList = e
        }
      })
    },
    initialOrderNavgation () {
      const initialOrderNavgationList = ['OrderPay', 'OrderReceiv', 'OrderEvaluate']
      initialOrderNavgationList.forEach(e => {
        if (this.$route.name === e) {
          this.orderNavigationShowList = e
        }
      })
    },
    transtionOrderNavigation (e) {
      this.transtionOrderNavigationValue = e
    }
  },
  created () {
    Bus.$on('transtionOrderNavigation', this.transtionOrderNavigation)
  },
  mounted () {
    this.initialOrderNavgation()
  },
  activated () {
    console.log(this.transtionOrderNavigationValue)
    this.orderNavigationShowList = this.transtionOrderNavigationValue
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl'
@keyframes orderNavgationAinmation {
    from {
        transform: rotateY(0)
    }
    to {
        transform: rotateY(360deg)
    }
}
.order-middle
  position: absolute
  top: 1.5rem
  height: 11.8rem
  width: 100vw
  .order-navgation-box
    position: absolute
    top: 0
    width: 100vw
    height: 1rem
    background: $bgColorSecond
    .order-navgation
      float: left
      width: 33.3vw
      height: 1rem
      text-align: center
      line-height: 1rem
      font-size: .3rem
      font-weight: 500
      color: white
    .action
        animation: orderNavgationAinmation 3s
        background: $bgColorFirst
        text-shadow: .1rem .1rem .2rem #ccc
</style>
