<template>
  <div class="acrostic">
    <Header title='藏头诗生成' ref='header'></Header>
    <div class="main">
      <div class="search" ref='search'>
        <label>
          <span>几言诗</span>
          <input type="number" placeholder="5:五言,7:七言" v-model="num">
        </label>
        <label>
          <span>藏诗类型</span>
          <input type="number" placeholder="1:藏头,2:藏尾,3:藏中,4:递增" v-model="type">
        </label>
        <label>
          <span>押韵类型</span>
          <input type="number" placeholder="1:双句一压,2:双句押韵,3:一三四押" v-model="yayuntype">
        </label>
        <label>
          <span>关键字</span>
          <input type="text" placeholder="藏头诗中要包括的句子，最多八个子" v-model="key">
        </label>
        <div class="btn" @click="product">生成</div>
      </div>
      <div class="content" ref='content'>
        <ul v-if="data">
          <li v-for="(val,index) in list" :key='index'>
            <p v-for="(cont,index) in val.split('。')" :key='index' v-if="cont != ''">
              {{cont+ '。' }}
            </p>
          </li>
        </ul>
      </div>
      <Loading :isTrue="moreLoading"></Loading>
      <Error :isTrue="err" :errText='error'></Error>
    </div>
  </div>
</template>
<script>
import Header from './Header'
import Error from './Error'
import Loading from './Loading'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      msg: 'acrostic',
      error: '',
      err: false,
      moreLoading: false,
      data: false,
      list: '',
      num: '',
      type: '',
      yayuntype: '',
      key: ''
    }
  },
  components: {
    Header,
    Error,
    Loading
  },
  mounted() {},
  methods: {
    product() {
      if (this.num !== '5' && this.num !== '7') {
        toast('请输入正确的言试')
      } else if (
        this.type !== '1' &&
        this.type !== '2' &&
        this.type !== '3' &&
        this.type !== '4'
      ) {
        toast('请输入正确的藏诗类型')
      } else if (
        this.yayuntype !== '1' &&
        this.yayuntype !== '2' &&
        this.yayuntype !== '3' &&
        this.yayuntype !== '4'
      ) {
        toast('请输入正确的押韵类型')
      } else if (this.key.trim() === '') {
        toast('请输入正确的关键字')
      } else {
        var params = {
          num: this.num,
          type: this.type,
          yayuntype: this.yayuntype,
          key: this.key
        }
        askAcrostic(this, params)
      }
    }
  }
}

function toast(msg) {
  Toast({
    message: msg,
    position: 'bottom',
    duration: 1000
  })
}
function askAcrostic(that, obj) {
  that.data = false
  that.err = false
  that.moreLoading = true
  that.P.request(
    '950-1',
    obj,
    function(data) {
      that.moreLoading = false
      if (data.ret_code !== 0 || data.list.length === 0) {
        that.error = '请输入正确的关键字'
        that.data = false
        that.err = true
      } else {
        that.err = false
        that.data = true
        that.list = data.list
        var h = document.documentElement.clientHeight
        var a = that.$refs.header.$el.offsetHeight
        var s = that.$refs.search.offsetHeight
        var obj = that.$refs.content
        obj.style.height = h - a - s + 'px'
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
.acrostic {
  .main {
    position: relative;
    .search {
      border-bottom: px2rem(0.5) solid #ccc;
      padding-bottom: px2rem(15);
      label {
        display: flex;
        align-items: center;
        padding: 0 px2rem(15);
        padding-top: px2rem(10);
        span {
          display: block;
          width: px2rem(90);
        }
        input {
          line-height: px2rem(30);
          font-size: px2rem(14);
          color: #333;
          border: px2rem(0.5) solid #ccc;
          width: 100%;
          padding-left: px2rem(5);
          border-radius: px2rem(3);
        }
        ::-webkit-input-placeholder {
          font-size: px2rem(12);
        }
        :-moz-placeholder {
          font-size: px2rem(12);
        }
        :-ms-input-placeholder {
          font-size: px2rem(12);
        }
      }
      .btn {
        width: 86%;
        line-height: px2rem(30);
        margin: 0 auto;
        color: #fff;
        font-size: px2rem(16);
        margin-top: px2rem(10);
        text-align: center;
        background-color: #5d6146;
        border-radius: px2rem(5);
      }
    }
    .content {
      overflow: auto;
      ul {
        width: 100%;
        text-align: center;
        padding-top: px2rem(10);
        li {
          height: 100%;
          margin-bottom: px2rem(20);
          p {
            line-height: px2rem(20);
          }
        }
      }
    }
    .error {
      padding: px2rem(66) 0;
    }
  }
}
</style>
