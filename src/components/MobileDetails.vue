<template>
  <div class="MobileDetails" v-html="desc">
    {{desc}}
  </div>
</template>
<script>
import Error from './Error'
import Loading from './Loading'
import $ from 'jquery'
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
    // $('head meta').remove()
    // var meta =
    //   '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    // setTimeout(function() {
    //   $('html').removeAttr('data-dpr')
    //   $('html').removeAttr('max-width')
    //   $('head').append(meta)
    //   $('html').css({
    //     fontSize: '29px'
    //   })
    //   $('body').css({
    //     fontSize: '29px'
    //   })
    // }, 1000)

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
      console.log(data)
      that.moreLoading = false
      if (data.ret_code !== 0 || data.paraList.length === 0) {
        that.error = data.error
        that.data = false
        that.err = true
      } else {
        that.err = false
        that.data = true
        that.desc = data.desc
        console.log(that.desc)
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
}
</style>
