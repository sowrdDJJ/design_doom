<template>
  <div class="dialogueHead-box">
      <div class="dialogueHead-userHeadImg">
        <img class="userHeadImg" :src="currUserData.user_Img">
      </div>
      <div class="search-input">
        <span class="iconfont header-iconfont">&#xe8bb;</span>
        <input type="text" class="search-keyword"  v-model="keyWord"  placeholder="搜索">
      </div>
      <div class="dialogueHead-add">
        <router-link :to="`/dialogue&user=` + currUserData.user_Id  +`/AddFriend`">
          <span class="iconfont">&#xe641;</span>
        </router-link>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Bus from 'bus'
export default {
  name: 'DialogueHead',
  data () {
    return {
      keyWord: null
    }
  },
  watch: {
    keyWord: {
      handler (newValue) {
        Bus.$emit('dialogueSearchKeyWord', newValue)
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['currUserData'])
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/varibles.styl'
.dialogueHead-box
  display: flex
  justify-content: space-between
  position: absolute
  top: 0
  height: 1.5rem
  width: 100vw
  box-sizing: border-box
  border-radius: 0 0 .2rem .2rem
  padding: .35rem
  background-image: linear-gradient($bgColorFirst, $bgColorSecond)
  .dialogueHead-userHeadImg
    width: .8rem
    height: .8rem
    .userHeadImg
      width: 100%
      height: 100%
      border-radius: .4rem
  .search-input
    display: flex
    width: 4.5rem
    height: .6rem
    line-height: .6rem
    margin-top: .1rem
    color: #fff
    box-sizing: border-box
    .header-iconfont
      background: #fff
      color: #666
      padding-left: .12rem
      border-radius:  .2rem 0 0 .2rem
    .search-keyword
      padding: 0 .12rem
      border-radius: 0 .2rem .2rem 0
      width: 88%
      color: #333
  .dialogueHead-add
    width: .8rem
    height: .8rem
    border-radius: .4rem
    text-align: center
    line-height: .8rem
    color: white
    .iconfont
      font-size: .4rem
</style>
