<template>
  <div>
    <div class="dialogueMiddel-box">
      <transition-group enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft" mode="out-in" :dropzone="1000">
        <div class="dialogueMiddel-content" v-for="item of dialogueContent" :key="item.id">
          <router-link :to="`/dialogue&user=` + currUserData.userId +`/objectUserId=`+ item.id +`/dialogueBox`">
            <div class="dialogueMiddel-userRelationHeadImg">
                <img :src="item.userRelationHeadImg" class="userRelationHeadImg">
            </div>
            <div class="dialogueMiddel-userData">
              <div class="userName">
                  <span>{{item.userName}}</span>
              </div>
            </div>
          </router-link>
        </div>
      </transition-group>
    </div>
  </div>

</template>

<script>
import Bus from 'bus'
import { mapState } from 'vuex'
export default {
  name: 'DialogueMiddel',
  data () {
    return {
      keyWord: null,
      // currUserData: {
      //   'userId': this.currUserData.user_Id,
      //   'userHeadImg': this.currUserData.user_Img,
      //   'userName': this.currUserData.user_Name
      // },
      dialogueContent: [],
      dialogueContentAll: []
    }
  },
  props: {
    dialogueContentAllList: Array
  },
  created () {
    Bus.$on('dialogueSearchKeyWord', this.getKeyWord)
  },
  watch: {
    keyWord: {
      handler (newValue) {
        this.screenDialogue(newValue)
      },
      deep: true
    },
    dialogueContentAllList: {
      handler (newValue) {
        this.dialogueContentAll = newValue
        this.dialogueContent = this.dialogueContentAll
        console.log(this.dialogueContent)
      }
    }
  },
  methods: {
    screenDialogue (keyWord) {
      let dislogueContentNew = []
      dislogueContentNew = this.dialogueContentAll.filter(e => e.userName.indexOf(this.keyWord) > -1)
      this.dialogueContent = dislogueContentNew
    },
    getKeyWord (e) {
      this.keyWord = e
    }
  },
  computed: {
    ...mapState(['currUserData'])
  }
}
</script>

<style lang='stylus' scoped>
.dialogueMiddel-box
  position: absolute
  top: 1.5rem
  left: 0
  height: 11rem
  width: 100vw
  box-sizing: border-box
  padding: .1rem
  .dialogueMiddel-content
    height: 1.3rem
    width: 100%
    box-sizing: border-box
    padding: .1rem
    line-height: 1.1rem
    .dialogueMiddel-userRelationHeadImg
      float: left
      width: 1.1rem
      height: 1.1rem
      .userRelationHeadImg
        border-radius: .2rem
        width: 100%
        height: 100%
    .dialogueMiddel-userData
      float: left
      margin-left: .3rem
      width: 5rem
      height: 1.1rem
      .userName
        color: #333
        font-size: .3rem
        width: 100%
        height: 70%
        line-height: .77rem
        box-sizing: border-box
        padding: .1rem
      .userLastWord
        height: 30%
        width: 100%
        color: #999
        font-size: .2rem
        line-height: .3rem
</style>
