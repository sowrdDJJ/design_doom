<template>
  <div class="ordePay-box">
    <div class="orderPay-show" ref="orderPayShow">
        <div class="orderPay-content" :style="{'height':(orderPayContentHeight + 'rem')}">
            <div class="payContent" v-for="item of orderPayList" :key="item.id">
              <div class="payContent-img">
                  <img :src="item.imgUrl" class="img">
              </div>
               <div class="payContent-title">
                  <span class="title">{{item.title}}</span>
              </div>
              <div class="payContent-information">
                  <span class="price">价格：￥{{item.price}}</span>
                  <span class="number">数量：{{item.number}}</span>
                  <span class="size">型号：常规</span>
              </div>
              <div class="sum-price">
                  合计：<span class="sum">￥{{pirceSum(item.price, item.number)}}</span>
              </div>
              <div class="payContent-btns">
                  <ul>
                    <router-link :to="`orderPay/orderDetalis/payId=` + item.id">
                      <li class="btns details">查看详情</li>
                    </router-link>
                    <!-- <router-link :to="`orderPay/passwordBtn/action=pay&number=` + item.id"> -->
                      <li class="btns pay" @click="transtionOrderNavigation(item.id)">立即付款</li>
                    <!-- </router-link> -->
                      <li class="btns cancel" @click="destructionPayOrder(item.id)">取消订单</li>
                  </ul>
              </div>
            </div>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import Axios from 'axios'
import Bus from 'bus'
import { mapState } from 'vuex'
export default {
  name: 'OrderPay',
  data () {
    return {
      orderPayList: []
    }
  },
  methods: {
    getOrderPay () {
      Axios.get('/data/getUserOrderColumn', {
        params: {
          userId: this.currUserData.user_Id,
          action: 'pay'
        }
      }).then(this.inputOrderPay)
    },
    detailsBtn (id) {
      this.$router.push(`/commodity/id=` + id)
    },
    inputOrderPay (res) {
      res = res.data
      console.log(res)
      if (res.data && res.ret) {
        this.orderPayList = res.data
      }
    },
    transtionOrderNavigation (payId) {
      console.log(payId)
      Axios.get('/data/getEmitAddress', {
        params: {
          userId: this.currUserData.user_Id,
          payId: payId
        }
      }).then(res => {
        res = res.data
        if (res.EmitAddressData.addressDetail === '' || res.EmitAddressData.areaCode === '' || res.EmitAddressData.name === '') {
          this.$toast.fail('请完善收货信息')
          this.$router.push(`orderPay/orderDetalis/payId=` + payId)
        } else {
          this.$router.push(`orderPay/passwordBtn/action=pay&number=` + payId)
        }
      })
      Bus.$emit('transtionOrderNavigation', 'OrderReceiv')
    },
    destructionPayOrder (id) {
      this.$dialog.confirm({
        title: '是否取消订单',
        width: '320px'
      }).then(() => {
        Axios.post('/data/postUserOrderColumn', {
          userId: this.currUserData.user_Id,
          orderId: id,
          action: 'delpay'
        }).then(this.destructionPayOrderList)
      }).catch(() => {
      })
    },
    destructionPayOrderList (res) {
      res = res.data
      if (res.ret) {
        this.$toast.fail('取消成功')
        console.log(res.orderNumber)
        this.orderPayList = this.orderPayList.filter(e => {
          if (res.orderNumber === e.id) {
            return false
          } else {
            return true
          }
        })
      }
    }
  },
  computed: {
    pirceSum () {
      return (number, pirce) => {
        let sum = number * pirce
        return sum
      }
    },
    orderPayContentHeight () {
      const val = this.orderPayList.length * 4
      return val
    },
    ...mapState(['currUserData'])
  },
  mounted () {
    console.log(this.$route.params)
    this.getOrderPay()
    this.scroll = new Bscroll(this.$refs.orderPayShow, { mouseWheel: true, click: true, tap: true })
  },
  activated () {
    this.getOrderPay()
  }
}
</script>

<style lang='stylus' scoped>
.ordePay-box
  position: absolute
  top: 1rem
  width: 100vw
  height: 10.8rem
  .orderPay-show
    height: 10rem
    padding: .3rem
    overflow: hidden
    .orderPay-content
      transition: 1s
      width: 100%
      .payContent
        width: 100%
        height: 3.5rem
        box-shadow: .1rem .1rem .2rem #ccc
        margin-top: .2rem
        border: .01rem solid #ccc
        border-radius: .3rem
        .payContent-title
          float: left
          margin: 5% 0 2.5%  0
          width: 56%
          height: .5rem
          text-align: center
          font-size: .26rem
          font-weight: 500
          color: #666
          line-height: .5rem
        .payContent-img
          float: left
          width: 30%
          height: 2rem
          margin: 5%  7%  1%  7%
          .img
            height: 100%
            width: 100%
            border-radius: .3rem
        .payContent-information
          float: left
          width: 44%
          height: 1.1rem
          margin: 1% 2%
          text-align: center
          line-height: .5rem
          .price
            font-size: .3rem
            margin-right: 2%
        .sum-price
          float: left
          width: 40%
          height: .5rem
          margin: 1% 5%
          text-align: center
          line-height: .5rem
          color: #999
          .sum
            color: #666
            font-size: .35rem
        .payContent-btns
          float: left
          width: 65%
          height: .5rem
          margin: 1% 5% 1% 35%
          text-align: center
          line-height: .5rem
          .btns
            margin: 0 2%
            font-size: .2rem
            float: left
            width: 26%
            height: .4rem
            border: .01rem solid #ccc
            border-radius: .1rem
            line-height: .4rem
            text-align: center
          .details
            color: #666
          .pay
            color: red
          .cancel
            color: #999
</style>
