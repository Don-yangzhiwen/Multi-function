<template>
  <div class="lfdJoke">
    <section>
      <ul v-if="index==0">
        <li v-for="(val,index) in list" :key='index'>
          <a :href="val.url">
            <div class="title">{{val.title}}</div>
            <div class="content" v-html="val.content">{{val.content}}</div>
          </a>
        </li>
      </ul>
      <ul v-if="index==1">
        <li v-for="(val,index) in items" :key='index'>
          <div class="title-tu">
            <p>{{val.title}}</p>
          </div>
          <div class="thumburl">
            <a :href="val.url">
              <img :src="val.thumburl" :style="'width:'+val.width+'px;height:'+val.height+'px;'">
            </a>
          </div>
        </li>
      </ul>
    </section>
    <Loading :isTrue="moreLoading"></Loading>
    <Error :isTrue="err" :errText='error'></Error>
    <Foot @getIndex='indexs'></Foot>
  </div>
</template>
<script>
import Error from './Error'
import Loading from './Loading'
import Foot from './JokeFoot'
export default {
  data() {
    return {
      msg: 'lfdJoke',
      error: '',
      err: false,
      moreLoading: false,
      list: [],
      index: 0,
      items: []
    }
  },
  components: {
    Foot,
    Error,
    Loading
  },
  methods: {
    indexs(data) {
      this.index = data
    }
  },
  mounted() {
    var that = this
    askJoke(this, '107-32', {}, function(data) {
      that.list = data
    })
    askJoketu(this, '107-33', {}, function(data) {
      that.items = data
    })
  }
}
function askJoketu(that, num, obj, callback) {
  that.data = false
  that.err = false
  that.moreLoading = true
  that.P.request(
    num,
    obj,
    function(data) {
      that.moreLoading = false
      // console.log(data)
      if (data.ret_code !== 0 || data.list.length === 0) {
        that.error = '网络延迟，请求失败'
        that.data = false
        that.err = true
      } else {
        that.err = false
        that.data = true
        callback(data.list)
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
function askJoke(that, num, obj, callback) {
  that.data = false
  that.err = false
  that.moreLoading = true
  that.P.request(
    num,
    obj,
    function(data) {
      that.moreLoading = false
      // console.log(data)
      if (data.ret_code !== 0 || data.list.length === 0) {
        that.error = '网络延迟，请求失败'
        that.data = false
        that.err = true
      } else {
        that.err = false
        that.data = true
        callback(data.list)
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
.lfdJoke {
  margin-bottom: px2rem(55);
  ul {
    li {
      height: 100%;
      padding: px2rem(15) px2rem(10);
      border-bottom: px2rem(0.5) solid #ccc;
      a {
        display: block;
        color: #333;
        .title {
          font-size: px2rem(16);
          font-weight: bold;
          margin-bottom: px2rem(10);
        }
      }
      .title-tu {
        p {
          font-size: px2rem(16);
          font-weight: bold;
          margin-bottom: px2rem(10);
        }
      }
      .thumburl {
        a {
          display: inline-block;
        }
      }
    }
  }
}
</style>
