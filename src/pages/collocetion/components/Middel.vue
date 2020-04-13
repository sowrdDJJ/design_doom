<template>
  <div class="Collocetion-middel" >
    <div class="Collocetion-middel-content" ref="CollocetionCommodity">
      <div :style="{'height':(wapperHeight +'rem')}">
        <ul >
            <li  class="Collocetion-commodity-T" v-for="item of commodityList" :key="item.id" >
              <div class="Collocetion-middel-commodity" >
                <router-link  :to="`/personal/user=`+(currUserId) +`/commodityId=`+item.id">
                  <div class="Collocetion-middel-commodity-img">
                      <img class="img" :src="item.imgUrl" >
                  </div>
                  <div class="Collocetion-middel-commodity-title">
                      <span>{{item.title}}</span>
                  </div>
                </router-link>
                  <div class="Collocetion-middel-commodity-parameter">
                      <div class="Collocetion-middel-commodity-size">
                          <span>规格:常规</span>
                      </div>
                          <div class="Collocetion-middel-commodity-price">
                              <span>${{item.price}}</span>
                          </div>
                  </div>
                  <div class="Collocetion-middel-commodity-option" >
                    <van-checkbox
                    v-model="item.state"
                    checked-color="red"
                    class="commodity-option"
                    ></van-checkbox>
                  </div>
              </div>
            </li>
            <li class="Collocetion-commodity-F" v-if="!commodityList.length">
              <span>空空如也</span>
            </li>
        </ul>
      </div>
    </div>
    <van-row
    class="Collocetion-middel-navigataion"
    type="flex"
    justify="space-between">
      <van-col class="commodity-optionAll">
        <van-checkbox
        class="commodityOptionAll-btns"
        v-model="commoidtyOption"
        @click="commodityOptionAllFs"
        checked-color="red"
        ></van-checkbox>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import Bus from 'bus'
export default {
  name: 'CollocetionMiddel',
  data () {
    return {
      commoidtyOption: true,
      commoidtyDataList: [],
      commodityPriceSumVal: 0,
      wapperHeight: 0,
      currUserId: this.$route.params.UserId
    }
  },
  props: {
    commodityList: Array
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.CollocetionCommodity, { mouseWheel: true, click: true, tap: true })
  },
  methods: {
    commodityNumberComputed (style, id) {
      let parameter = {
        'style': style,
        'id': id
      }
      this.$emit('commodityNumberChange', parameter)
    },
    commodityOptionAllFs () {
      this.commoidtyOption = !this.commodityOptionState
      this.commodityList.forEach(e => {
        e.state = this.commoidtyOption
      })
    }
  },
  computed: {
    commodityPriceSum () {
      let sumPrice = 0
      this.commodityList.forEach(e => {
        if (e.state === true) {
          sumPrice += (e.number * e.price)
        }
      })
      return sumPrice
    },
    commodityOptionState () {
      return this.commodityList.every(e => {
        return e.state
      })
    },
    commodityStateDataList () {
      let list = []
      this.commodityList.forEach(e => {
        list.push(e.state)
      })
      return list
    }
  },
  watch: {
    commodityOptionState () {
      this.commoidtyOption = this.commodityOptionState
      Bus.$emit('commodityListChange', this.commodityStateDataList)
    },
    commodityList () {
      if (!this.commodityList.length) {
        this.commoidtyOption = false
      }
      this.wapperHeight = this.commodityList.length * 3.3
    }
  }
}
</script>

<style lang='stylus' scoped>
.Collocetion-middel-commodity-option >>> .van-icon
  border: 1px solid #999;
.Collocetion-middel-commodity-option >>> .van-checkbox__icon
  line-height: 1.1em
  height: 1.1em
.commodityOptionAll-btns >>> .van-icon
  border: 1px solid #999;
.Collocetion-middel
  display: flex
  position: absolute
  top: 10vh
  left: 0
  width: 100%
  height: 90vh
  .Collocetion-middel-content
    height: auto
    width: 100%
    overflow: hidden
    .Collocetion-middel-commodity
      width: 100%
      height: 2.5rem
      box-sizing: border-box
      padding: .2rem
      margin: .3rem 0
      background: #e2e0e0c7
      border-radius: .3rem
      .Collocetion-middel-commodity-img
        float: left
        height: 100%
        width: 35%
        box-sizing: border-box
        padding: .3rem
        .img
          borde-radius: .2rem
          width: 100%
          height: 100%
      .Collocetion-middel-commodity-title
        float: left
        height: 30%
        width: 65%
        text-align: center
        font-size: .3rem
        font-weight: 600
        line-height: .6rem
        color: #666
      .Collocetion-middel-commodity-parameter
        float: left
        height: 30%
        width: 30%
        text-align: center
        font-size: .3rem
        font-weight: 600
        line-height: .6rem
        color: #666
      .Collocetion-middel-commodity-Number
        float: left
        height: 50%
        width: 20%
        font-size: .3rem
        font-weight: 600
        line-height: 1rem
        color: #333
        border-radius: .1rem
        border: 1px solid #666
        .reduce-btns
          float: left
          width: 30%
          height: 100%
          font-size: .4rem
          text-align: center
        .Number-value
          float: left
          width: 40%
          height: 100%
          font-size: .4rem
          text-align: center
        .add-btns
          float: left
          width: 30%
          height: 100%
          font-size: .4rem
          text-align: center
      .Collocetion-middel-commodity-option
        float: left
        height: 50%
        width: 9%
        text-align: center
        padding-left: .2rem
        padding-top: .3rem
        box-sizing: border-box
  .Collocetion-commodity-F
    width: 100%
    font-size: 3rem
    text-align: center
    color: #999
  .Collocetion-middel-navigataion
    display: flex
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    height: 10vh
    background: #e8e7e7
    .commodity-optionAll
      width: 30%
      height: 100%
      box-sizing: border-box
      padding: .25rem
      .commodityOptionAll-btns
        width: 25%
        height: 83%
    .commodity-price-computed
      width: 50%
      height: 100%
      box-sizing: border-box
      padding: .25rem
      line-height: .6rem
      font-size: .3rem
      .btns
        margin-top: .1rem
</style>
