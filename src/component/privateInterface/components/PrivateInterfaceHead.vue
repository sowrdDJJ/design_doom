<template>
    <div class="contraner privateInterface-title">
      <div class="row">
        <div class="col-2">
          <div class="out" @click="goBack">
              <span class="iconfont">&#xe697;</span>
          </div>
        </div>
        <div class="col-4 offset-2 text-center ">
              <span class="privateInterface-tag">个人资料</span>
        </div>
      </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
export default {
  name: 'PrivateInterfaceHead',
  data () {
    return {
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
  mounted () {
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
