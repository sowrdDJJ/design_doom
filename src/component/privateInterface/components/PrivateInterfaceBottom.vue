<template>
    <div class="contraner privateInterface-title">
      <div class="row">
        <div class="col-12 text-center">
            <a href="javascript:;" class="btn  btn-light mx-1" @click="submisstionRequest('addFriend')">加好友</a>
            <!-- <a href="javascript:;" class="btn btn-dark mx-1" @click="submisstionRequest('dialogue')">发消息</a> -->
        </div>
      </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'PrivateInterfaceBottom',
  props: {
    privateInformations: Object
  },
  methods: {
    submisstionRequest (action) {
      if (action === 'dialogue') {
        this.$router.push(`/dialogue&user=` + this.currUserData.user_Id + `/objectUserId=` + this.privateInformations.user_Id + `/dialogueBox`)
      } else {
        Axios.post('/data/postFriend', {
          firendId: this.privateInformations.user_Id,
          userId: this.currUserData.user_Id
        }).then(res => {
          res = res.data
          if (res.ret) {
            this.$router.push('/dialogue&user=' + this.currUserData.user_Id)
          }
        })
      }
    }
  },
  computed: {
    ...mapState(['currUserData'])
  }
}
</script>

<style lang="stylus" scoped>
.privateInterface-title
  .out
    width: .8rem
    height: .6rem
    padding-right: .1rem
    line-height: .5rem
    .iconfont
      font-size: .5rem
      font-weight: 600
      color: white
  .privateInterface-tag
    color: white
    font-size: .5rem
</style>
