<template>
  <div class="Account">
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration='1000'
    >
    <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Account'
}
</script>

<style lang='stylus' scoped>
.Account
  position: absolute
  height: 13.3rem
  left: 0
  right: 0
  background: url('https://game.gtimg.cn/images/lol/act/a20191028senna/senna_1920_1080.jpg') center no-repeat
  background-size: 13.3rem 100%
</style>
