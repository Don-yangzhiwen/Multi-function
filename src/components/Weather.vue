<template>
  <div class="weather">
    <Header title='爱天气插件'></Header>
    <div v-if="data" v-html="lists">
      {{lists}}
    </div>
    <Loading :isTrue="moreLoading"></Loading>
    <Error :isTrue="err" :errText='error'></Error>
  </div>
</template>
<script>
import Header from './Header'
import Error from './Error'
import Loading from './Loading'
export default {
  data() {
    return {
      data: false,
      error: '',
      err: false,
      moreLoading: false,
      lists: []
    }
  },
  components: {
    Error,
    Loading,
    Header
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
    '833-1',
    {
      appId: 36610,
      key: 'f05f78810a8443fb8e007a267523e30c'
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
        that.lists = data.iframe
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
<style lang="scss">
@import './../../static/hotcss/px2rem.scss';
.weather {
  iframe {
    position: absolute;
    top: px2rem(38);
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
