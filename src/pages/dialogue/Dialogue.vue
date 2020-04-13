<template>
  <div>
    <dialogue-head></dialogue-head>
    <dialogue-middel :dialogueContentAllList='dialogueContentAll'></dialogue-middel>
    <navigation></navigation>
    <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft" >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import DialogueHead from './components/DialogueHead'
import DialogueMiddel from './components/DialogueMieddel'
import Navigation from 'component/navigation/Navigation'
import Axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'dialogue',
  components: {
    DialogueHead,
    DialogueMiddel,
    Navigation
  },
  data () {
    return {
      dialogueContentAll: []
    }
  },
  methods: {
    getDislogueData () {
      Axios.get('/data/getUserDialogues', {
        params: {
          userId: this.currUserData.user_Id
        }
      })
        .then(this.distrbutionData)
    },
    distrbutionData (res) {
      res = res.data
      console.log(res.ret)
      if (res.ret) {
        this.dialogueContentAll = res.data
        console.log(this.dialogueContentAll)
      }
    }
  },
  computed: {
    ...mapState(['currUserData'])
  },
  mounted () {
    this.getDislogueData()
  },
  activated () {
    this.getDislogueData()
  }
}
</script>

<style lang='stylus' scoped>
</style>
