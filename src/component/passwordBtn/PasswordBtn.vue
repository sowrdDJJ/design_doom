<template>
    <div class="payPassword">
      <div class="signOutPay">
        <span @click='outPassword' class="iconfont">&#xe61d;</span>
      </div>
      <div class="payPasswordShowBox">
        <van-password-input
        :value="value"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
        />
      </div>
      <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      :hide-on-click-outside='false'
      />
    </div>
</template>

<script>
import Axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'PasswordBtn',
  data () {
    return {
      value: '',
      showKeyboard: true,
      orderList: []
    }
  },
  methods: {
    getSubmisstionOrder (e) {
      this.orderList = e
      console.log(this.orderList)
    },
    onInput (key) {
      this.value = (this.value + key).slice(0, 6)
      if (this.value.length === 6) {
        Axios.post('/data/postUserBillPay', {
          UserId: this.currUserData.user_Id,
          value: this.value,
          orderId: this.$route.params.number || this.currOrderList,
          action: this.$route.params.action
        })
          .then(this.combinationPassword)
      }
    },
    onDelete () {
      this.value = this.value.slice(0, this.value.length - 1)
    },
    combinationPassword (res) {
      res = res.data
      if (res.ret) {
        if (this.$route.params.action === 'pay' || this.$route.params.action === 'ShoppingCar') {
          this.$router.push(`/personal/user=` + this.$route.params.UserId + `/Order/orderReceiv`)
          this.$toast.success('支付成功')
        } else {
          this.$router.push(`/personal/user=` + this.$route.params.UserId + `/Order/orderReceiv`)
          this.$toast.success('收货成功')
        }
      } else {
        this.$toast.fail('密码错误')
      }
      this.value = ''
    },
    outPassword () {
      if (this.$route.params.action === 'pay' || this.$route.params.action === 'ShoppingCar') {
        this.$dialog.confirm({
          title: '是否取消支付',
          width: '320px'
        }).then(() => {
          this.$router.push(`/personal/user=` + this.$route.params.UserId + `/Order/orderpay`)
          this.$toast.fail('支付失败')
        }).catch(() => {
        })
      } else {
        this.$dialog.confirm({
          title: '是否取消收货',
          width: '320px'
        }).then(() => {
          this.$router.push(`/personal/user=` + this.$route.params.UserId + `/Order/orderReceiv`)
          this.$toast.fail('收货失败')
        }).catch(() => {
        })
      }
    }
  },
  computed: {
    ...mapState(['currUserData']),
    ...mapState(['currOrderList'])
  }
}
</script>

<style lang='stylus' scoped>
.payPasswordShowBox >>> .van-password-input
  box-sizing: border-box
  border: .01rem  solid #999
  padding: 1%
  margin: 5% 10%
  height: 1rem
  border-radius: .2rem
.payPasswordShowBox >>> .van-password-input__security
  height: 100%
  box-sizing: border-box
  padding: 1%
.payPasswordShowBox >>> .van-password-input__security li
  border: .01rem solid #bfbbbb
.payPassword >>> .van-key
  height: 1.3rem
  line-height: 1.3rem
  box-sizing: border-box;
  border: .001rem solid #e6e6e6
 .payPassword
    z-index: 99
    position: fixed
    top: 0
    left: 0
    height: 13.2rem
    width: 100vw
    background: #211f1fc7
    .payPasswordShowBox
      position: absolute
      top:6rem
      width: 100vw
      height: 2.23rem
      border: .02rem 0 solid #333
      background: white
    .signOutPay
      margin: .2rem .4rem
      width: 6.5%
      height: 1rem
      line-height: 1rem
      text-align: center
      .iconfont
        font-size: .4rem
        color: #fff
        font-weight: 600
        box-sizing: border-box
        padding-right: .07rem
</style>
