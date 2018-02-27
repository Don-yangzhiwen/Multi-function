<template>
  <div class="MobileDetails">
    <Loading :isTrue="moreLoading"></Loading>
    <div class="desc" v-html="desc">
      {{desc}}
    </div>
  </div>
</template>
<script>
import Error from './Error'
import Loading from './Loading'
export default {
  data() {
    return {
      msg: 'MobileDetails',
      error: '',
      err: false,
      moreLoading: false,
      desc: ''
    }
  },
  components: {
    Error,
    Loading
  },
  mounted() {
    var params = {
      productId: this.$route.params.id,
      needDesc: 1
    }
    askDetails(this, params)
  }
}

//  请求手机商品详情
function askDetails(that, obj) {
  that.data = false
  that.err = false
  that.moreLoading = true
  that.P.request(
    '908-3',
    obj,
    function(data) {
      that.moreLoading = false
      if (data.ret_code !== 0 || data.paraList.length === 0) {
        that.error = data.error
        that.data = false
        that.err = true
      } else {
        that.err = false
        that.data = true
        that.desc = data.desc
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
.MobileDetails {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
