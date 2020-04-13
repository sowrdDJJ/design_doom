<template>
<div>
        <div class="register-box">
             <van-popup
            v-model="popupState"
            round
            :style="{ height: '10%', width: '40%',fontSize: '.4rem', textAlign: 'center', lineHeight: '1.3rem'}">注册成功</van-popup>
             <router-link tag="div" to="Login" class="cls">
                <span class="iconfont">&#xe697;</span>
             </router-link>
            <div class="register-title">
                <span>注&nbsp;&nbsp;册</span>
                <div class="register-title-ornaments"></div>
            </div>
            <div class="register-content">
                <div class="register-account">
                    <input type="text" id="register-account-content" placeholder="昵称" v-model="registerInformtion.name">
                </div>
                <div class="register-password">
                    <input type="password" id="register-password-content" placeholder="密码" v-model="registerInformtion.password">
                </div>
                <div class="register-telephone">
                    <input type="number" id="register-telephone-content" placeholder="电话号码" v-model="registerInformtion.telephone">
                </div>
                <div class="register-passwordPer">
                    <input type="password" id="register-passwordPer-content" placeholder="支付密码" v-model="registerInformtion.passwordPer">
                </div>
            </div>
            <div class="register-btn" @click="submission">
                <a href="javascript:;" class="btn-content" >
                    注册
                </a>
            </div>
      </div>
 </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Accountregister',
  data () {
    return {
      registerInformtion: {
        name: null,
        password: null,
        telephone: null,
        passwordPer: null,
        actionState: 'register'
      },
      popupState: false,
      AccountData: 0,
      show: false
    }
  },
  methods: {
    submission () {
      axios.post('/data/postUserInformation', this.registerInformtion)
        .then(this.getAccount)
    },
    getAccount (res) {
      if (res.data) {
        const data = res.data
        this.AccountData = data.code
        if (this.AccountData === 200 & data.data === 'success') {
          this.popupState = true
          this.$router.push('/Account/Login')
        } else {
          this.$toast.fail('电话号码已注册')
        }
      } else {
        return console.log('error')
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
  .register-box
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    background-image: linear-gradient(#423b3b69, #000000);
    .cls
      width: .6rem
      height: .5rem
      margin: .3rem
      padding-right: .1rem
      line-height: .4rem
      font-size: .4rem
      font-weight: 600
      border: .05rem solid white
      border-radius: .2rem
      background: white
      color:white
      .iconfont
        font-size: .5rem
        font-weight: 600
        color: black
    .register-title
      position: absolute
      top: 25%
      width: 100%
      height: 10%
      line-height: 1.5rem
      text-align: center
      font-size: 1rem
      color: white
    .register-content
      position: absolute
      top: 40%
      left: 10%
      width: 80%
      height: 45%
      .register-account
        position: absolute
        top: 0
        left: 5%
        width: 90%
        height: 20%
        box-sizing: border-box
        line-height: 1.3rem
        font-size: .38rem
        font-weight: 600
        color: white
        #register-account-content
          background: none
          border-bottom: .1rem solid white
          border-radius: .1rem
          font-size: .5rem
          text-align: center
          color: white
          width: 100%
      .register-password
        position: absolute
        top: 20%
        left: 5%
        width: 90%
        height: 20%
        box-sizing: border-box
        line-height: 1.3rem
        font-size: .38rem
        font-weight: 600
        color: white
        #register-password-content
          background: none
          border-bottom: .1rem solid white
          border-radius: .1rem
          font-size: .5rem
          text-align: center
          color: white
          width: 100%
      .register-telephone
        position: absolute
        top: 40%
        left: 5%
        width: 90%
        height: 20%
        box-sizing: border-box
        line-height: 1.3rem
        font-size: .38rem
        font-weight: 600
        color: white
        #register-telephone-content
          background: none
          border-bottom: .1rem solid white
          border-radius: .1rem
          font-size: .5rem
          text-align: center
          color: white
          width: 100%
      .register-passwordPer
        position: absolute
        top: 60%
        left: 5%
        width: 90%
        height: 20%
        box-sizing: border-box
        line-height: 1.3rem
        font-size: .38rem
        font-weight: 600
        color: white
        #register-passwordPer-content
          background: none
          border-bottom: .1rem solid white
          border-radius: .1rem
          font-size: .5rem
          text-align: center
          color: white
          width: 100%
    .register-btn
       position: absolute
       bottom: 7.5%
       left: 10%
       width: 80%
       height: 8%
       background: white
       color: black
       border-radius: .2rem
       text-align: center
       .btn-content
         width: 100%
         line-height: 1rem
         font-size: .4rem
         color: black
         font-weight: 600
</style>
