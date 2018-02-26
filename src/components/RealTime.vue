<template>
  <div class="realTime">
    <div v-if="data">
      <ul>
        <li v-for="(item,index) in lists" :key="index">
          <a :href="item.url">{{item.title}}</a>
        </li>
      </ul>
    </div>
    <Loading :isTrue="moreLoading"></Loading>
    <Error :isTrue="err" :errText='error'></Error>
  </div>
</template>
<script>
import Error from './Error'
import Loading from './Loading'
export default {
  data() {
    return {
      allLoaded: false,
      data: false,
      error: '',
      err: false,
      moreLoading: false,
      lists: []
    }
  },
  components: {
    Error,
    Loading
  },
  mounted() {
    askHistory(this)
  }
}
function askHistory(that) {
  that.data = false
  that.err = false
  that.moreLoading = true
  that.P.request(
    '738-1',
    {
      n: 50
    },
    function(data) {
      that.moreLoading = false
      if (data.ret_code < 0) {
        that.error = data.error_info
        that.data = false
        that.err = true
      } else {
        that.err = false
        that.data = true
        that.lists = data.list
      }
    },
    function(error) {
      that.moreLoading = false
      that.data = false
      that.err = true
      that.error = error.error_info
    }
  )
}
</script>
<style lang="scss" scoped>
@import './../../static/hotcss/px2rem.scss';
.realTime {
  ul {
    li {
      height: 100%;
      line-height: px2rem(40);
      padding-left: px2rem(20);
      border-bottom: px2rem(0.5) solid #ccc;
      a {
        display: block;
        color: #333;
      }
    }
  }
}
</style>
