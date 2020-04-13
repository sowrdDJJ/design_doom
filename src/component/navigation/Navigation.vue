<template>
  <div class="navigation-box">
    <div class="navigation-title home">
        <router-link to="/">
        <div class="navigation-title-content">
            <span class="iconfont">&#xe8ba;</span>
            <br/>
            <span>首页</span>
        </div>
        </router-link>
        <transition enter-active-class="animated rubberBand">
          <div class="navigation-animate-home" v-show="navigationList[0].state"></div>
        </transition>
    </div>
    <div class="navigation-title dialogue" @click="judgeLoginState(`/dialogue&user=`)">
            <a href="javascript:;">
              <div class="navigation-title-content">
                <span class="iconfont">&#xe8bf;</span>
                <br/>
                <span>信息</span>
              </div>
            </a>
        <transition enter-active-class="animated rubberBand">
          <div class="navigation-animate-dialogue" v-show="navigationList[1].state"></div>
        </transition>
    </div>
    <div class="navigation-title presonal" @click="judgeLoginState(`/personal/user=`)">
            <a href="javascript:;">
              <div class="navigation-title-content">
                <span class="iconfont">&#xe6b8;</span>
                <br/>
                <span>我的联盟</span>
              </div>
            </a>
        <transition enter-active-class="animated rubberBand">
          <div class="navigation-animate-personal" v-show="navigationList[2].state"></div>
        </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeNavigation',
  data () {
    return {
      navigationList: [{
        'name': 'Home',
        'state': false
      }, {
        'name': 'Dialogue',
        'state': false
      }, {
        'name': 'Personal',
        'state': false
      }],
      oldRouter: 'Home'
    }
  },
  methods: {
    judgeLoginState (object) {
      if (this.currUserDataList) {
        if (this.oldRouter !== object) {
          this.oldRouter = object
          this.$router.push(object + this.currUserDataList.user_Id)
        }
      } else {
        this.$router.push(`/Account`)
        this.oldRouter = object
      }
    },
    judgeMoveTag () {
      let matching = null
      if (this.$route.name === 'ShoppingCar' || this.$route.name === 'CollocetionPage' || this.$route.name === 'OrderPay' || this.$route.name === 'OrderEvaluate' || this.$route.name === 'OrderReceiv') {
        matching = this.navigationList[2].name
      } else if (this.$route.name === 'DialogueBox') {
        matching = this.navigationList[1].name
      } else {
        matching = this.$route.name
      }
      this.navigationList = this.navigationList.map(e => {
        if (e.name === matching) {
          e.state = true
          return e
        } else {
          e.state = false
          return e
        }
      })
    }
  },
  computed: {
    currUserDataList () {
      return this.$store.state.currUserData
    }
  },
  mounted () {
    this.judgeMoveTag()
  },
  activated () {
    this.judgeMoveTag()
  },
  deactivated () {
    this.navigationList = this.navigationList.map(e => {
      e.state = false
      return e
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.navigation-box
  display: flex
  position: fixed
  bottom: 0
  height: 8vh
  width: 100vw
  background: $bgColorSecond
  border-radius: .2rem .2rem 0 0
  .navigation-title
    position: relative
    float: left
    width: 33.33%
    height: 100%
    padding-top: .1rem
    line-height: 0.4rem
    text-align: center
    .navigation-title-content
      color: #fff
      font-size: .2rem
      font-weight: 400
      .iconfont
        font-size: .4rem
    .navigation-animate-home,.navigation-animate-dialogue,.navigation-animate-personal
      z-index: -1
      position: absolute
      top: 0
      width: 100%
      padding-top: .1rem
      height: 100%
      border-radius: .1rem
      background: $bgColor
</style>
