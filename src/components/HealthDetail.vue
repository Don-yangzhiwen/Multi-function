<template>
  <div class="health-detail">
    <div class="content">
      <div class="top">
        <h2>{{list.title}}</h2>
        <p>
          <span>{{list.time}}</span>{{list.author}}</p>
      </div>
      <section>
        <div class="img">
          <img :src="list.img">
        </div>
        <p>{{list.content}}</p>
      </section>
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
      msg: 'health-detail',
      error: '',
      err: false,
      moreLoading: false,
      list: ''
    }
  },
  components: {
    Error,
    Loading
  },
  mounted() {
    var params = {
      id: this.$route.params.id
    }
    askDetail(this, params)
  }
}
function askDetail(that, obj) {
  that.data = false
  that.err = false
  that.moreLoading = true
  that.lunbo = false
  that.P.request(
    '96-36',
    obj,
    function(data) {
      that.moreLoading = false
      // console.log(data)
      if (data.ret_code !== 0 || data.item === '') {
        that.error = '查询错误'
        that.data = false
        that.err = true
      } else {
        that.err = false
        that.data = true
        that.list = data.item
        that.lunbo = true
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
.health-detail {
  .content {
    padding: 0 px2rem(10);
    .top {
      height: 100%;
      padding: px2rem(15) 0;
      h2 {
        font-size: px2rem(16);
        font-weight: bold;
      }
      p {
        margin-top: px2rem(5);
        font-size: px2rem(12);
        color: #999;
        span {
          margin-right: px2rem(8);
        }
      }
    }
    section {
      height: 100%;
      .img {
        text-align: center;
        img {
          vertical-align: bottom;
          width: 100%;
        }
      }
      p {
        margin-top: px2rem(10);
        line-height: px2rem(20);
        text-indent: px2rem(28);
        color: #666;
      }
    }
  }
}
</style>
