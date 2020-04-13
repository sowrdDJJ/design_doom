<template>
  <div class="orderDetalis-box">
    <div class="blackScreen"></div>
    <div class="whiteScreen">
      <div class="orderDetalis-img">
        <img class="img" :src='orderDetalisList.orderDetalistImg' alt />
      </div>
      <div class="orderDetalis-title">
        <span>{{orderDetalisList.orderDetalistTitle}}</span>
      </div>
      <div class="orderDetalis-cls" @click="orderDetalisCls">
        <span class="iconfont">&#xe6fe;</span>
      </div>
      <div class="orderDetalis-price">
          价格：￥<span>{{orderDetalisList.orderDetalisPrice}}</span>
      </div>
      <div class="orderDetalis-size">
          规格：<span>{{orderDetalisList.orderDetalisSize}}</span>
      </div>
      <div class="orderDetalis-number">
            <div class="orderDetalis-reduce-value" @click="orderDetalisNumberValue('reduec')">-</div>
            <div class="orderDetalis-number-value" v-text="orderDetalisList.orderDetalisNumber"></div>
            <div class="orderDetalis-add-value" @click="orderDetalisNumberValue('add')">+</div>
      </div>
      <div class="orderDetalis-priceSum">
          总价：<span class="priceSum-value">￥{{orderDetalisList.orderDetalisPriceSum}}</span>
      </div>
      <div class="orderDetalis-address">
          <div class="orderDetalis-address-addressDetalis">地址:{{orderDetalisList.orderDetalisAddress.addressDetalis}}</div>
          <div class="orderDetalis-address-contacts">{{orderDetalisList.orderDetalisAddress.contacts}}</div>
          <div class="orderDetalis-address-telephonNumber">电话：{{orderDetalisList.orderDetalisAddress.telephonNumber}}</div>
          <router-link :to="`payId=`+ this.$route.params.payId +`/EmitAddress`" tag="div" class="orderDetalis-address-edit">编辑</router-link>
      </div>
    </div>
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'OrderDetalis',
  data () {
    return {
      changeState: true,
      orderDetalisList: {
        orderDetalisNumber: 1,
        orderDetalistImg: '',
        orderDetalistTitle: '',
        orderDetalisPrice: 0,
        orderDetalisSize: '',
        orderDetalisPriceSum: 0,
        orderDetalisAddress: {
          addressDetalis: '',
          contacts: '',
          telephonNumber: ''
        }
      }
    }
  },
  methods: {
    orderDetalisNumberValue (state) {
      if (state === 'add') {
        this.orderDetalisList.orderDetalisNumber < 99 ? this.orderDetalisList.orderDetalisNumber += 1 : this.orderDetalisList.orderDetalisNumber = this.orderDetalisList.orderDetalisNumber
      } else {
        this.orderDetalisList.orderDetalisNumber > 1 ? this.orderDetalisList.orderDetalisNumber -= 1 : this.orderDetalisList.orderDetalisNumber = this.orderDetalisList.orderDetalisNumber
      }
      this.orderDetalisList.orderDetalisNumber = this.orderDetalisList.orderDetalisNumber
    },
    reqOrderDetalis () {
      Axios.get('/data/getOrderDetalis', {
        params: {
          userId: this.currUserData.user_Id,
          payId: this.$route.params.payId
        }
      }).then(this.getorderDetalisData)
    },
    getorderDetalisData (res) {
      res = res.data
      console.log(res)
      if (res.ret) {
        let orderDetalisAddressInformation = res.orderDetaillsInformation.orderDetalisAddress
        console.log(JSON.parse(orderDetalisAddressInformation))
        this.orderDetalisList = res.orderDetaillsInformation
        this.orderDetalisList.orderDetalisAddress = JSON.parse(orderDetalisAddressInformation)[0]
        console.log(this.orderDetalisList.orderDetalisAddress)
      }
    },
    orderDetalisCls () {
      console.log(this.changeState)
      if (this.changeState) {
        this.$dialog.confirm({
          title: '是否保存'
        }).then(() => {
          console.log(this.orderDetalisList, 55555)
          Axios.post('/data/postOrderDetalis', {
            orderInformation: this.orderDetalisList,
            userId: this.currUserData.user_Id,
            orderId: this.$route.params.payId
          })
            .then(this.whetherSavedSuccess)
        }).catch(() => {
          this.$toast('失败保存')
          this.$router.push(`/personal/user=` + this.$route.params.UserId + `/Order/orderpay`)
        })
      } else {
        this.$router.push(`/personal/user=` + this.$route.params.UserId + `/Order/orderpay`)
      }
    },
    whetherSavedSuccess (res) {
      res = res.data
      if (res.ret) {
        this.$router.push(`/personal/user=` + this.$route.params.UserId + `/Order/orderpay`)
        this.$toast('成功保存')
      } else {
        this.$toast('失败保存')
      }
    }
  },
  computed: {
    orderDetailPriceSum () {
      const Sum = this.orderDetalisList.orderDetalisNumber * this.orderDetalisList.orderDetalisPrice
      return Sum
    },
    ...mapState(['currUserData'])
  },
  watch: {
    orderDetalisList: {
      handler () {
        console.log(this.changeState)
        this.changeState = !this.changeState
      },
      deep: true
    }
  },
  mounted () {
    this.reqOrderDetalis()
    console.log(this.$router)
  },
  activated () {
    this.reqOrderDetalis()
    this.changeState = !this.changeState
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl'
.orderDetalis-box
  z-index: 100
  position: fixed
  top: 0
  height: 13.3rem
  width: 100vw
  .blackScreen
    background: #060606c2
    width: 100%
    height: 100%
  .whiteScreen
    position: absolute
    top: 5rem
    background: white
    width: 100%
    height: 8.3rem
    display: flex
    flex-wrap: wrap
    justify-content: space-around
    box-sizing: border-box
    border-radius: .2rem .2rem 0 0
    padding: 1% 2%
    .orderDetalis-img
      position: relative
      top: -1rem
      width: 25%
      height: 1.8rem
      border-radius: .2rem
      .img
        border-radius: .2rem
        height: 100%
        width: 100%
    .orderDetalis-cls
      width: .5rem
      height: .5rem
      border: .01rem solid #333
      text-align: center
      line-height: .5rem
      border-radius: 50%
      .iconfont
        margin-left: .05rem
        color: #333
        font-size: .25rem
    .orderDetalis-title
      width: 50%
      height: 1.8rem
      text-align: center
      line-height: 1.8rem
      font-size: .3rem
      color: #666
    .orderDetalis-price
      width: 40%
      height: 1.5rem
      text-align: center
      line-height: 1.5rem
      color: #f9b583c2
    .orderDetalis-size
      width: 40%
      height: 1.5rem
      text-align: center
      line-height: 1.5rem
      color: #bbb
    .orderDetalis-number
      width: 40%
      height: 1rem
      text-align: center
      box-sizing: border-box
      padding-top: .25rem
      line-height: 1.5rem
      color: #bbb
      .orderDetalis-reduce-value
          float: left
          width: 30%
          height: 1rem
          line-height: 1rem
          text-align: center
          background: $bgColorFifth
          border-top-left-radius: .1rem
          border-bottom-left-radius: .1rem
      .orderDetalis-number-value
          float: left
          width: 40%
          height: 1rem
          line-height: 1rem
          text-align: center
          color: #666
          border-top: .01rem solid #ccc
          border-bottom: .01rem solid #ccc
      .orderDetalis-add-value
          float: left
          width: 30%
          height: 1rem
          line-height: 1rem
          text-align: center
          background: $bgColorFifth
          border-top-right-radius: .1rem
          border-bottom-right-radius: .1rem
    .orderDetalis-priceSum
      width: 40%
      height: 1.5rem
      text-align: center
      line-height: 1.5rem
      color: #bbb
      .priceSum-value
        color: $bgColorFirst
        font-size: .4rem
    .orderDetalis-address
      width: 100%
      height: 2rem
      text-align: center
      line-height: 1.5rem
      color: #bbb
      border: .01rem solid #ccc
      box-shadow: .01rem .01rem .2rem #999
      display: flex
      flex-wrap: wrap
      justify-content: space-around
      .orderDetalis-address-addressDetalis
        height: 1rem
        width: 100%
        color: #666
        font-size: .25rem
        box-sizing: border-box
        padding: .1rem .2rem
        line-height: 1rem
      .orderDetalis-address-contacts
        height: 1rem
        width: 40%
        color: #666
        font-size: .25rem
        box-sizing: border-box
        padding: .1rem .2rem
        line-height: 1rem
      .orderDetalis-address-telephonNumber
        height: 1rem
        width: 40%
        color: #666
        font-size: .25rem
        box-sizing: border-box
        padding: .1rem .2rem
        line-height: 1rem
      .orderDetalis-address-edit
        height: 1rem
        width: 15%
        color: #666
        font-size: .2rem
        box-sizing: border-box
        padding: .1rem .2rem
        line-height: 1rem
</style>
