<template>
  <div class="oil-price">
    <Header title='今日油价' ref='header'></Header>
    <div class="main">
      <div class="search" ref='search'>
        <input type="text" placeholder="省名，比如北京，广西" v-model="prov">
        <button class="ss-btn" @click="product">搜索</button>
      </div>
      <div class="content" ref='content'>
        <ul v-if="data">
          <li v-for='(val,index) in list' :key='index'>
            <p>省份名称：
              <span>{{val.prov}}</span>
            </p>
            <p>90号汽油：{{val.p90}}</p>
            <p>93号汽油：{{val.p93}}</p>
            <p>97号汽油：{{val.p97}}</p>
            <p>0号柴油：{{val.p0}}</p>
            <p>89号汽油：{{val.p89}}</p>
            <p>92号汽油：{{val.p92}}</p>
            <p>95号汽油：{{val.p95}}</p>
          </li>
        </ul>
        <Loading :isTrue="moreLoading"></Loading>
        <Error :isTrue="err" :errText='error'></Error>
      </div>
    </div>
  </div>
</template>
<script>
import Header from './Header'
import Error from './Error'
import Loading from './Loading'
export default {
  data() {
    return {
      msg: 'oil-price',
      prov: '',
      error: '',
      err: false,
      moreLoading: false,
      data: false,
      list: ''
    }
  },
  components: {
    Header,
    Error,
    Loading
  },
  mounted() {
    var h = document.documentElement.clientHeight
    var a = this.$refs.header.$el.offsetHeight
    var s = this.$refs.search.offsetHeight
    var obj = this.$refs.content
    obj.style.height = h - a - s + 'px'
    var params = {
      prov: ''
    }
    askOilPrice(this, params)
  },
  methods: {
    product() {
      var params = {
        prov: this.prov
      }
      askOilPrice(this, params)
    }
  }
}

function askOilPrice(that, obj) {
  that.data = false
  that.err = false
  that.moreLoading = true
  that.P.request(
    '138-46',
    obj,
    function(data) {
      that.moreLoading = false
      // console.log(data)
      if (data.ret_code !== 0 || data.list.length === 0) {
        that.error = '请输入正确的关键字'
        that.data = false
        that.err = true
      } else {
        that.err = false
        that.data = true
        that.list = data.list
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
.oil-price {
  .main {
    .search {
      display: flex;
      align-items: center;
      height: px2rem(34);
      padding: px2rem(10) px2rem(15);
      box-shadow: 0 px2rem(2) px2rem(2) #999;
      input {
        width: 100%;
        height: 100%;
        line-height: px2rem(33);
        font-size: px2rem(14);
        border: px2rem(0.5) solid #ccc;
        padding-left: px2rem(5);
        border-radius: px2rem(3);
        color: #333;
        box-sizing: border-box;
        border-radius: px2rem(3) 0 0 px2rem(3);
        border-right: none;
      }
      button {
        line-height: px2rem(34);
        width: px2rem(66);
        font-size: px2rem(15);
        color: white;
        background-color: #5d6146;
        padding: 0;
        border: none;
        border-radius: 0 px2rem(3) px2rem(3) 0;
      }
    }
    .content {
      overflow: auto;
      ul {
        margin: 0 px2rem(15);
        li {
          padding: px2rem(10) 0;
          border-bottom: px2rem(0.5) solid #ccc;
          height: 100%;
          p:first-child {
            font-size: px2rem(16);
            margin-bottom: px2rem(3);
          }
          p {
            line-height: px2rem(21);
            span {
              color: #0094ff;
            }
          }
        }
      }
    }
  }
}
</style>
