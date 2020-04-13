<template>
<div>
        <div class="login-box">
            <div class="cls" @click="registerCls">
              <span class="iconfont">&#xe697;</span>
            </div>
            <div class="login-title">
                <span>H&nbsp;E&nbsp;L&nbsp;L&nbsp;O</span>
                <div class="login-title-ornaments"></div>
            </div>
            <div class="login-content">
                <div class="login-account">
                    <input type="text" id="account-content" placeholder="账号" v-model="account">
                </div>
                <div class="login-password">
                    <input type="password" id="password-content" placeholder="密码" v-model="password">
                </div>
            </div>
            <div class="login-btn" @click="submission">
                <a href="javascript:;" class="btn-content" >
                    登录
                </a>
            </div>
            <div class="register-btn">
                <router-link to="Register" class="btn-content" >
                    注册
                </router-link>
            </div>
      </div>
 </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AccountLogin',
  data () {
    return {
      account: null,
      password: null,
      AccountData: []
    }
  },
  methods: {
    submission () {
      axios.post('/data/getUserInformation', {
        account: this.account,
        password: this.password,
        actionState: 'login',
        userIdentity: 'user'
      })
        .then(this.getAccount)
    },
    getAccount (res) {
      res = res.data
      if (res.code === 200) {
        if (res.ret) {
          const data = res.data
          this.AccountData = data[0]
          console.log(this.AccountData)
          this.account = ''
          this.password = ''
          this.$store.dispatch('obtionCurrUserData', this.AccountData)
          this.$router.push(`/personal/user=` + this.AccountData.user_Id)
        } else {
          this.$toast.fail('输入有误')
        }
      } else {
        this.$toast.fail('请求失败')
        console.log('error')
      }
    },
    registerCls () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang='stylus' scoped>
  .login-box
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
    .login-title
      position: absolute
      top: 25%
      width: 100%
      height: 10%
      line-height: 1.5rem
      text-align: center
      font-size: 1rem
      color: white
    .login-content
      position: absolute
      top: 35%
      left: 10%
      width: 80%
      height: 40%
      .login-account
        position: absolute
        top: 30%
        left: 5%
        width: 90%
        height: 20%
        box-sizing: border-box
        line-height: 1.3rem
        font-size: .38rem
        font-weight: 600
        color: white
        #account-content
          background: none
          border-bottom: .1rem solid white
          border-radius: .1rem
          font-size: .5rem
          text-align: center
          color: white
          width: 100%
      .login-password
        position: absolute
        top: 50%
        left: 5%
        width: 90%
        height: 20%
        box-sizing: border-box
        line-height: 1.3rem
        font-size: .38rem
        font-weight: 600
        color: white
        #password-content
          background: none
          border-bottom: .1rem solid white
          border-radius: .1rem
          font-size: .5rem
          text-align: center
          color: white
          width: 100%
    .login-btn
       position: absolute
       bottom: 25%
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
    .register-btn
      position: absolute
      top: 3%
      right: 4%
      width: 20%
      height: 5%
      background: white
      color: black
      border-radius: .2rem
      text-align: center
      .btn-content
        width: 100%
        line-height: .7rem
        font-size: .3rem
        color: black
        font-weight: 600
</style>
