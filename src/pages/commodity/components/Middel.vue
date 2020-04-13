<template>
  <div>
    <div class="commodity-middel-box">
      <div class="commodity-name">
        <span>{{commodityInformation.title}}</span>
      </div>
      <div class="commodity-img">
        <img :src="commodityInformation.imgUrl" @click="imgShow">
        <div class="seach-sign">
                <img src="~imgs/out.png" alt="商品状态标识" v-if='commodityInformation.commodityState' class="commodity-sign">
        </div>
      </div>
      <div class="commodity-size">
        <ul>
          <li class="commodity-size-title">尺寸：</li>
          <li class="commodity-size-content" v-for='(item,index) of sizeList' :key="index" @click="commoditySize(index,item)"  :class='{sizeSelection: index === selectionId}'>
            {{item}}
          </li>
        </ul>
      </div>
      <div class="commodity-middel-box-second">
        <div class="commodity-evaluate">
          <div class="commodity-evaluate-title">
            <span>推荐度：</span>
          </div>
          <van-rate
          class="commodity-evaluate-content"
          v-model="commodityGuaranteeValue"
          allow-half
          void-icon="star"
          void-color="#eee"
          :readonly='true'
          />
        </div>
        <div class="commodity-middel-box-third">
          <div class="commodity-price">
            <span class="commodity-price-title">价格:</span>
            <br/><br/>
            <span class="commodity-price-content">￥{{commodityData.price}}</span>
          </div>
          <div class="commodity-number">
            <div class="commodity-reduce-value" @click="commodityNumberValue('reduec')">-</div>
            <div class="commodity-number-value" v-text="NumberValue"></div>
            <div class="commodity-add-value" @click="commodityNumberValue('add')">+</div>
          </div>
        </div>
        <div class="commodity-ovder" @click="commodityAction('ovder')">
          <span>立即购买</span>
        </div>
        <div class="commodity-shoppingCar" @click="commodityAction('shoppingCar')">
          <span>加入购物车</span>
        </div>
        <div class="commodity-conllection" @click="commodityAction('conllection')">
          <span v-if="commodityData.conllectionState">
            <span class="iconfont">&#xe8c3;</span>
            已收藏
          </span>
          <span v-else>
            <span class="iconfont">&#xe8ab;</span>
              收藏
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from 'bus'
import Axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'CommodityMiddel',
  data () {
    return {
      commodityInformation: [],
      NumberValue: 1,
      sizeList: ['S', 'M', 'L', 'XL', 'XXL', '常规'],
      selectionId: 0,
      commodityData: {
        'commodity_Class': '雕塑手办',
        'conllectionState': true,
        'id': '0002',
        'imgUrl': 'https://game.gtimg.cn/images/daojushop/zb/ad/201910/20191020223019_649439.jpg',
        'number': 1,
        'price': '400',
        'state': true,
        'title': '卡莎1/4大型高端雕塑',
        'size': 'S'
      },
      commodityGuaranteeValue: 4,
      timer: null
    }
  },
  created () {
    Bus.$on('commodityInformation', this.commodityInformationcarrier)
  },
  computed: {
    ...mapState(['currUserData'])
  },
  methods: {
    commodityInformationcarrier (e) {
      this.commodityInformation = e[0]
      console.log(this.commodityInformation)
      this.commodityData.id = this.commodityInformation.id
      this.commodityData.conllectionState = this.commodityInformation.conllectionState
      this.commodityData.imgUrl = this.commodityInformation.imgUrl
      this.commodityData.price = this.commodityInformation.price
      this.commodityData.title = this.commodityInformation.title
      this.NumberValue = this.commodityData.number
      console.log(this.commodityInformation.commodity_Presonality)
      this.sizeList = this.sizeList.filter(e => {
        if (this.commodityInformation.commodity_Presonality.indexOf('手办') >= 0 || (this.commodityInformation.commodity_Presonality.indexOf('玩偶')) >= 0 || (this.commodityInformation.commodity_Presonality.indexOf('手')) >= 0) {
          if (e !== '常规') {
            return true
          } else {
            return false
          }
        } else {
          if (e === '常规') {
            return true
          } else {
            return false
          }
        }
      })
      console.log(this.sizeList)
      this.commodityData.size = this.sizeList[0]
      this.sizeList.forEach((sizeListelement, i) => {
        if (e.size === sizeListelement) {
          this.selectionId = i
        }
      })
    },
    commodityNumberValue (state) {
      if (state === 'add') {
        this.NumberValue < 99 ? this.NumberValue += 1 : this.NumberValue = this.NumberValue
      } else {
        this.NumberValue > 1 ? this.NumberValue -= 1 : this.NumberValue = this.NumberValue
      }
      this.commodityData.number = this.NumberValue
    },
    commoditySize (index, item) {
      const currendSize = this.sizeList.filter(e => {
        if (e === item) {
          return e
        }
      })
      this.commodityData.size = currendSize
      this.selectionId = index
    },
    commodityAction (action) {
      if (this.commodityInformation.commodityState) {
        this.$toast.fail('该商品已下架')
      } else {
        if (action === 'shoppingCar') {
          this.commodityData.commodityActionState = 'shoppingCar'
          if (this.currUserData) {
            this.$toast.loading({
              message: '加载中...',
              forbidClick: true
            })
            const informationCommodityData = {
              number: this.commodityData.number,
              size: this.commodityData.size,
              commodityId: this.commodityData.id
            }
            Axios.post('/data/postUserShoppingCar', {
              informationCommodityData: informationCommodityData,
              userId: this.currUserData.user_Id,
              actionStyle: this.commodityData.commodityActionState
            })
              .then(this.judgeJoinShoppingCarState)
          } else {
            this.$router.push('/Account/Login')
          }
        } else if (action === 'ovder') {
          this.commodityData.commodityActionState = 'ovder'
          const informationCommodityData = {
            number: this.commodityData.number,
            size: this.commodityData.size,
            commodityId: this.commodityData.id
          }
          if (this.currUserData) {
            this.$toast.loading({
              message: '加载中...',
              forbidClick: true
            })
            Axios.post('/data/postUserOrderColumn', {
              commodity: informationCommodityData,
              userId: this.currUserData.user_Id,
              action: 'addpay'
            }).then(this.jumpPay)
          } else {
            this.$router.push('/Account/Login')
          }
        } else {
          if (this.currUserData) {
            this.commodityData.conllectionState = !this.commodityData.conllectionState
            if (this.timer) {
              clearTimeout(this.timer)
            }
            this.timer = setTimeout(() => {
              this.$toast.loading({
                message: '加载中...',
                forbidClick: true
              })
              this.commodityData.commodityActionState = 'conllection'
              Axios.post('/data/postUserColloection', {
                commodity: this.commodityData.id,
                userId: this.currUserData.user_Id
              }).then(this.judgeJoinConllection)
            }, 1000)
          } else {
            this.$router.push('/Account/Login')
          }
        }
      }
    },
    jumpPay (res) {
      res = res.data
      if (res.ret) {
        if (res.code === 200) {
          this.$toast.clear()
          this.$router.push(`/commodity/commodityId=` + this.commodityData.id + `/userId=` + this.currUserData.user_Id + `/passwordBtn/action=pay&number=` + res.orderNumber)
        }
      }
    },
    judgeJoinShoppingCarState (res) {
      res = res.data
      if (res.ret) {
        if (res.code === 200) {
          this.$toast.clear()
          this.$toast.success('加入成功')
        } else {
          this.$toast.clear()
          this.$toast.fail('加入失败')
        }
      }
    },
    judgeJoinConllection (res) {
      res = res.data
      if (res.ret) {
        if (res.code === 200) {
          this.$toast.clear()
          this.$toast.success('修改成功')
        } else {
          this.$toast.clear()
          this.$toast.fail('修改失败')
        }
      }
    },
    imgShow () {
      const imgData = []
      imgData.push(this.commodityInformation.imgUrl)
      Bus.$emit('showImgData', imgData)
      Bus.$emit('showImgState', true)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl';
.commodity-middel-box
  display: flex
  position: absolute
  top: 1rem
  width: 100%
  height: 93%
  background: white
  border-top-left-radius: .9rem
  border-top-right-radius: .9rem
  .commodity-name
    position: absolute
    top: .1rem
    left: 25%
    width: 50%
    height: 1rem
    line-height: 1rem
    color: #666
    font-size: .3rem
    font-weight: 600
    text-align: center
  .commodity-img
    overflow: hidden
    position: absolute
    top: 1rem
    left: 15%
    height: 4rem
    width: 70%
    img
      height: 100%
      width: 100%
    .seach-sign
      position: absolute
      top: 2rem
      right: 0
      height: 1.5rem
      width: 2rem
      .commodity-sign
        width: 100%
        height: 100%
  .commodity-size
    position: absolute
    top: 5.5rem
    left: 7.5%
    height: 1rem
    width: 85%
    box-sizing: border-box
    padding: .3rem
    text-align: center
    line-height: .5rem
    .commodity-size-title
      float: left
      height: 100%
      width: 20%
    .commodity-size-content
      float: left
      height: 100%
      width: 14%
      margin-left: 1%
      box-shadow: 0.1rem 0.1rem 0.2rem #888;
    .sizeSelection
      background: $bgColorFirst
      color: white
  .commodity-middel-box-second
    display: flex
    position: absolute
    top: 6.7rem
    width: 100%
    height: 44%
    background:  $bgColorFirst
    border-radius: .5rem
    .commodity-evaluate
      position: absolute
      top: .5rem
      right: 5%
      width: 40%
      height: 20%
      color: white
      font-size: .4rem
      font-weight: 500
      .commodity-evaluate-content
        margin-top: 10%
    .commodity-middel-box-third
      position: absolute
      top: 10%
      left: 6%;
      width: 40%;
      height: 80%
      background: $bgColorSecond
      border-radius: .3rem
      .commodity-price
        position: absolute
        top: .5rem
        left: 10%
        width: 85%
        height: 1.3rem
        .commodity-price-title
          color: white
          font-size: .4rem
        .commodity-price-content
          margin-left: .1rem
          color: white
          font-size: .6rem
      .commodity-number
        position: absolute
        bottom: .3rem
        left: 7.5%
        width: 85%
        height: 1.3rem
        color: white
        font-size: .4rem
        font-weight: 400
        border-radius: .1rem
        background: white
        .commodity-reduce-value
          position: absolute
          top: 0
          left: 0
          width: 30%
          height: 100%
          line-height: 1.3rem
          text-align: center
          background: $bgColorThird
          border-top-left-radius: .1rem
          border-bottom-left-radius: .1rem
        .commodity-number-value
          position: absolute
          top: 0
          left: 30%
          width: 40%
          height: 100%
          line-height: 1.3rem
          text-align: center
          color: #666
        .commodity-add-value
          position: absolute
          top: 0
          right: 0
          width: 30%
          height: 100%
          line-height: 1.3rem
          text-align: center
          background: $bgColorThird
          border-top-right-radius: .1rem
          border-bottom-right-radius: .1rem
    .commodity-ovder
      position: absolute
      bottom: 1.5rem
      border-radius: .3rem
      right: 5%
      width: 40%
      height: 1rem
      background: $bgColorFourth
      color: #fff
      text-align: center
      line-height: 1rem
    .commodity-shoppingCar
      position: absolute
      bottom: 2.6rem
      border-radius: .3rem
      right: 5%
      width: 40%
      height: 1rem
      background: $bgColorThird
      color: #fff
      text-align: center
      line-height: 1rem
    .commodity-conllection
      position: absolute
      bottom: .2rem
      border-radius: .3rem
      right: 5%
      width: 40%
      height: 1rem
      color: #fff
      font-size: .2rem
      text-align: center
      line-height: 1rem
      .iconfont
        font-size: .8rem
        color: #ffeb3b
</style>
