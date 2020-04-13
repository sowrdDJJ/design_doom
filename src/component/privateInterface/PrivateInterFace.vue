<template>
  <div class="privateInterface-box">
    <div class="privateInterface-head">
        <privateInterface-head :privateInformations='privateInformations'></privateInterface-head>
    </div>
    <div class="privateInterface-mieddle">
        <privateInterface-mieddle :privateInformations='privateInformations'></privateInterface-mieddle>
    </div>
    <div class="privateInterface-bottom">
      <PrivateInterface-bottom :privateInformations='privateInformations'></PrivateInterface-bottom>
    </div>
    <div class="frostedGlass"></div>
  </div>
</template>

<script>
import privateInterfaceHead from './components/PrivateInterfaceHead'
import privateInterfaceMieddle from './components/PrivateInterfaceMiddle'
import PrivateInterfaceBottom from './components/PrivateInterfaceBottom'
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  name: 'privateInterFace',
  data () {
    return {
      privateInformations: {}
    }
  },
  components: {
    privateInterfaceHead,
    privateInterfaceMieddle,
    PrivateInterfaceBottom
  },
  methods: {
    getPrivateInformations () {
      axios.get('/data/getFriend', {
        params: {
          selectAccountNumber: this.$route.params.selectAccountNumber,
          actionState: 'select'
        }
      }).then(this.setPrivateInformations)
    },
    setPrivateInformations (res) {
      res = res.data
      console.log(res.data)
      if (res.code === 200) {
        console.log(res.ret)
        if (res.ret) {
          const data = res.data
          this.privateInformations = data[0]
        } else {
          // this.$router.push(`/dialogue&user=` + this.currUserData.user_Id + `/AddFriend`)
          this.$toast.fail('查询失败')
        }
      } else {
        this.$toast.fail('请求失败')
        console.log('error')
      }
    }
  },
  computed: {
    ...mapState(['currUserData'])
  },
  mounted () {
    console.log(this.$route.params.selectAccountNumber)
    this.getPrivateInformations()
  }
}
</script>

<style lang='stylus' scoped>
.privateInterface-box
  width: 100vw
  height: 13.3rem
  background-size: 13.3rem 100%
  .privateInterface-head
    z-index: 2
    position: relative
    top: 0
    width: 100vw
    height: 1rem
    box-sizing: border-box
    padding: .3rem
    background: rgba(1,1,1,0.7)
  .privateInterface-mieddle
    z-index: 2
    position: relative
    top: 0
    width: 100vw
    height: 10.3rem
    box-sizing: border-box
  .privateInterface-bottom
    z-index: 2
    position: relative
    top: 0
    width: 100vw
    height: 2.3rem
    box-sizing: border-box
  .frostedGlass
    z-index: 1
    position: absolute
    top: 0
    height: 100%
    width: 100%
    background: url('https://game.gtimg.cn/images/lol/act/a20191028senna/senna_1920_1080.jpg') center no-repeat
    filter: blur(.05rem)
    background-size: 13.3rem 100%
</style>
