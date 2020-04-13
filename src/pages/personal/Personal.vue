<template>
  <div class="commodity-data-box">
    <transition-group
    enter-active-class="animated slideInRight"
    leave-active-class="animated zoomOut"
    :duration='400'
    mode="in-out">
    <personal-header  :key="0"></personal-header>
    <personal-middel :colloectionImg='colloectionImg' :collectionList='collectionList'  :key="1"></personal-middel>
    <navigation :key="2"></navigation>
    </transition-group>
    <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutLeft" >
      <router-view ></router-view>
    </transition>
  </div>
</template>

<script>
import PersonalHeader from './components/Header'
import PersonalMiddel from './components/Middel'
import Navigation from 'component/navigation/Navigation'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'presonal',
  components: {
    PersonalHeader,
    PersonalMiddel,
    Navigation
  },
  data () {
    return {
      collectionList: [],
      colloectionImg: []
    }
  },
  methods: {
    getPersonalData () {
      axios.get('/data/getUserColloection', {
        params: {
          userId: this.currUserData.user_Id
        }
      })
        .then(this.getPersonalInfoSucc)
    },
    getPersonalInfoSucc (res) {
      console.log(res.data.data)
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.collectionList = data
        this.colloectionImg = res.colloectionImg
      }
    }
  },
  computed: {
    ...mapState(['currUserData'])
  },
  mounted () {
    this.getPersonalData()
  },
  activated () {
    this.getPersonalData()
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl';
  .commodity-data-box
    z-index: 1
    position: absolute
    top: 0
    width: 100vw
    height:  100vh
    background: white
</style>
