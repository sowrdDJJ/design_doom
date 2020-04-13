<template>
  <div class="dialogueBox-contrainer">
    <div class="dialogueBox-head">
      <div class="head-out" @click="outdialogue">
        <span class="iconfont">&#xe61d;</span>
      </div>
      <div class="head-userTitle">
        <span class="userTitle">{{dialogueBoxName}}</span>
      </div>
    </div>
    <div class="dialogueBox-dialogueContent" ref="dialogueContent">
        <div class="dialogueContent-warpped" ref="dialogueContentWarpped" :style="{'height': dialogueContentWarppedHeight() + 'px'}">
          <div v-for="item of bulleList" :key="item.id">
            <div class="dialogueContent-bulleReceive" v-if="item.bulleObject === 'receive'">
                <div class="bulleReceive-img">
                <img :src="item.userHeadImg"  class="img">
                </div>
                <span class="bulleReceive-userName">{{item.userName}}</span>
                <div class="bulleReceive-container">
                  <span class="bulleReceive-content">{{item.userBulleContent}}</span>
                </div>
            </div>
            <div class="dialogueContent-bulleSend" v-else>
                <div class="bulleSend-img">
                <img :src="item.userHeadImg"  class="img">
                </div>
                <span class="bulleSend-userName">{{item.userName}}</span>
                <div class="bulleSend-container">
                  <span class="bulleSend-content">{{item.userBulleContent}}</span>
                </div>
            </div>
          </div>
        </div>
    </div>
    <div class="dialogueBox-userInput">
      <div class="userInput-InputBox">
            <input type="text" class="InputBox-contnet" v-model="currUserDataInformation.userDialogueContent">
      </div>
      <div class="userInput-sendBtn">
        <a href="javascript:" class="sendBtn" @click="sendInformation">发送</a>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import Bscroll from 'better-scroll'
import { mapState } from 'vuex'
export default {
  name: 'DialogueBox',
  data () {
    return {
      currUserDataInformation: {
        userId: '',
        userName: '',
        dialogueObject: this.$route.params.objectUserId,
        userHeadImg: '',
        userDialogueContent: ''
      },
      bulleList: [],
      inputDialogueBoxContentData: [],
      dialogueBoxName: '',
      compressFrequency: 0,
      id: '',
      scrollY: 0
    }
  },
  methods: {
    compressFunction  (e) {
      let image = new Image()
      // image.setAttribute('crossOrigin', 'anonymous')
      image.src = e
      let val = ''
      let canvas = document.createElement('canvas')
      let context = canvas.getContext('2d')
      let imageWidth = image.width / 2
      let imageHeight = image.height / 2
      let data = ''
      if (canvas.height > 200 && canvas.width > 200) {
        canvas.width = imageWidth
        canvas.height = imageHeight
        context.drawImage(image, 0, 0, imageWidth, imageHeight)
      } else {
        canvas.width = image.width
        canvas.height = image.height
        context.drawImage(image, 0, 0, image.width, image.height)
      }
      data = canvas.toDataURL('image/jpeg')
      val = data
      return val
    },
    async sendInformation () {
      const compressImg = await this.compressFunction(this.currUserDataInformation.userHeadImg)
      this.$set(this.currUserDataInformation, 'userHeadImg', compressImg)
      this.$socket.emit('connection', this.currUserDataInformation)
      this.currUserDataInformation.userDialogueContent = ''
    },
    judgeInformationClass (data, list) {
      data.id = list
      let userName = ''
      let userHeadImg = ''
      if (data.userId === parseInt(this.currUserDataInformation.userId)) {
        data.bulleObject = 'send'
        userName = this.currUserDataInformation.userName
        userHeadImg = this.currUserDataInformation.userHeadImg
      } else {
        data.bulleObject = 'receive'
        userName = data.userName
        userHeadImg = data.userHeadImg
      }
      let value = {
        'id': data.id,
        'userId': data.userId,
        'userName': userName,
        'userHeadImg': userHeadImg,
        'userBulleContent': data.userDialogueContent,
        'bulleObject': data.bulleObject
      }
      return value
    },
    receiveInformation (data) {
      let value = this.judgeInformationClass(data, this.bulleList.length)
      this.bulleList.push(value)
    },
    outdialogue () {
      this.$router.go(-1)
    },
    getDialogueBoxContent () {
      console.log(111)
      Axios.get('/data/dialogueBox', {
        params: {
          userId: this.currUserData.user_Id,
          objectUserId: this.$route.params.objectUserId
        }
      })
        .then(this.inputDialogueBoxContent)
    },
    inputDialogueBoxContent (res) {
      res = res.data
      console.log(res.data)
      if (res.ret) {
        const data = res.data
        if (res.content !== null) {
          this.inputDialogueBoxContentData = data
          this.inputDialogueBoxContentData.forEach(element => {
            let value = this.judgeInformationClass(element, this.bulleList.length)
            this.bulleList.push(value)
            if (element.userId !== this.currUserDataInformation.userId) {
              this.dialogueBoxName = element.userName
            }
          })
        } else {
          this.dialogueBoxName = data[0].userName
        }
      }
    },
    dialogueContentWarppedHeight () {
      const val = 200 + this.dialogueContentBulleSendHeight() + this.dialogueContentBulleReceiveHeight()
      return val
    },
    dialogueContentBulleReceiveHeight () {
      const dialogueContentBulleReceiveDom = document.querySelectorAll('.dialogueContent-bulleReceive')
      let val = 0
      dialogueContentBulleReceiveDom.forEach(e => {
        val += e.offsetHeight
      })
      return val
    },
    dialogueContentBulleSendHeight () {
      const dialogueContentBulleSendDom = document.querySelectorAll('.dialogueContent-bulleSend')
      let val = 0
      dialogueContentBulleSendDom.forEach(e => {
        val += e.offsetHeight
      })
      return val
    }
  },
  computed: {
    ...mapState(['currUserData'])
  },
  sockets: {
    connect: function () {
      this.id = this.$socket.id
      this.$socket.emit('Bconnection', this.currUserData.user_Id)
    },
    airContent (data) {
      this.$nextTick(this.receiveInformation(data))
    }
  },
  watch: {
    bulleList: {
      handler () {
        this.scroll = new Bscroll(this.$refs.dialogueContent, {mouseWheel: true, click: true, tap: true})
        if ((this.$refs.dialogueContent.offsetHeight - this.$refs.dialogueContentWarpped.offsetHeight) < 100) {
          this.scroll.scrollTo(0, this.$refs.dialogueContent.offsetHeight - this.$refs.dialogueContentWarpped.offsetHeight, 1000)
        }
        this.dialogueContentWarppedHeight()
      },
      deep: true
    }
  },
  mounted () {
    this.getDialogueBoxContent()
    this.$socket.emit('connect')
    this.currUserDataInformation.userId = this.currUserData.user_Id
    this.currUserDataInformation.userName = this.currUserData.user_Name
    this.currUserDataInformation.userHeadImg = this.currUserData.user_Img
  },
  activated () {
    this.$socket.emit('Bconnection', this.currUserData.user_Id)
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl'
.dialogueBox-contrainer
  position: relative
  left: 0
  top: 0
  height: 100vh
  width: 100vw
  background: white
  .dialogueBox-head
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 1rem
    background-image: linear-gradient($bgColorFirst,$bgColorFifth)
    border-radius: 0 0 .2rem .2rem
    .head-out
      position: absolute
      left: .25rem
      top: .25rem
      width: .5rem
      height: .5rem
      .iconfont
        font-size: .4rem
        color: white
        font-weight: 600
    .head-userTitle
      position: absolute
      top: .25rem
      left: 20%
      width: 60%
      height: .5rem
      .userTitle
        text-align: center
        line-height: .5rem
        color: white
        font-size: .4rem
  .dialogueBox-dialogueContent
    overflow: hidden
    position: absolute
    top: 1rem
    left: 0
    height: 11.3rem
    width: 100%
    .dialogueContent-warpped
      position: absolute
      left: 0
      width: 100%
      .dialogueContent-bulleReceive
        position: relative
        float: left
        top: .3rem
        left: .2rem
        width: 100%
        min-height: 2.1 rem
        text-align: left
        box-sizing: border-box
        .bulleReceive-img
          float: left
          width: .8rem
          height: .8rem
          .img
            width: 100%
            height: 100%
            border-radius: .5rem
        .bulleReceive-userName
          margin-top: .3rem
          margin-left:.2rem
          float: left
          width: 80%
          height: .5rem
          color: #666
        .bulleReceive-container
          float: left
          margin:  0 0 .1rem 1rem
          min-height: .5rem
          max-width: 5rem
          line-height: .5rem
          word-wrap:break-word
          background: $bgColorFirst
          text-align: right
          padding: .1rem
          border-radius: .1rem .4rem .4rem .4rem
          .bulleReceive-content
            font-size: .4rem
            color: #333
            font-weight: 500
      .dialogueContent-bulleSend
        position: relative
        float: right
        top: .3rem
        right: .2rem
        width: 100%
        min-height: 2.1 rem
        text-align: right
        box-sizing: border-box
        .bulleSend-img
          float: right
          width: .8rem
          height: .8rem
          .img
            width: 100%
            height: 100%
            border-radius: .5rem
        .bulleSend-userName
          margin-top: .3rem
          margin-right:.2rem
          float: right
          width: 80%
          height: .5rem
          color: #666
        .bulleSend-container
          float: right
          margin: .1rem 1rem 0 0
          min-height: .5rem
          max-width: 5rem
          line-height: .5rem
          word-wrap:break-word
          background: $bgColorFirst
          text-align: left
          padding: .1rem
          border-radius: .4rem .1rem .4rem .4rem / .4rem .1rem .4rem .4rem
          .bulleSend-content
            font-size: .4rem
            color: #333
            font-weight: 500
  .dialogueBox-userInput
    position: absolute
    bottom: 0
    left: 0
    height: 1rem
    width: 100%
    box-sizing: border-box
    padding: .2rem
    border-radius: .2rem  .2rem 0 0
    background: #d4cfcf
    .userInput-InputBox
      float: left
      width:  80%
      height: .6rem
      .InputBox-contnet
        width: 100%
        height: 100%
        box-sizing: border-box
        border-radius: .2rem
        padding: .1rem .2rem
        color: #666
    .userInput-sendBtn
      float: right
      width: 15%
      height: .6rem
      background: $bgColorFifth
      border-radius: .5rem
      text-align: center
      line-height: .6rem
      .sendBtn
        color: white
</style>
