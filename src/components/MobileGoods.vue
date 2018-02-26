<template>
  <div class="mobileGoods" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    <div class="item" v-for="(val,index) in goods" :key='index'>
      <router-link :to="'/threeNine/details/' + val.id">
        <div class="zsimg">
          <img :src="'http://' + val.img">
        </div>
        <div class="infor">
          <p>{{val.name}}</p>
          <p class="price">
            约
            <span>{{val.nowPrice}}</span>
          </p>
        </div>
      </router-link>
    </div>
    <Loading :isTrue="moreLoading"></Loading>
    <Error :isTrue="err" :errText='error'></Error>
    <div class="whole" v-if="whole">
      全部已加载完毕
    </div>
  </div>
</template>
<script>
import Error from './Error'
import Loading from './Loading'
export default {
  data() {
    return {
      msg: 'mobileGoods',
      error: '',
      err: false,
      moreLoading: false,
      goods: [],
      allPages: '',
      allNum: '',
      page: 1,
      isScroll: true,
      whole: false
    }
  },
  components: {
    Error,
    Loading
  },
  props: ['params', 'jieshu'],
  watch: {
    params: {
      handler(newVal, oldVal) {
        if (newVal.page <= 1) {
          this.goods = []
        }
        this.whole = false
        askGoods(this, this.params)
      },
      deep: true
    },
    jieshu(newVal, oldVal) {
      this.goods = []
      this.whole = false
      askGoods(this, this.params)
    }
  },
  mounted() {
    askGoods(this, this.params)
  },
  methods: {
    loadMore() {
      if (this.goods.length > 0 && this.isScroll) {
        this.isScroll = false
        this.params.page++
        askGoods(this, this.params)
      }
    }
  }
}

//  请求手机商品查询
function askGoods(that, obj) {
  that.data = false
  that.err = false
  that.moreLoading = true
  that.P.request(
    '908-2',
    obj,
    function(data) {
      that.moreLoading = false
      if (data.ret_code < 0) {
        that.error = '请求错误，请稍后加载'
        that.data = false
        that.err = true
      } else {
        data = data.phonePagebean
        that.err = false
        that.data = true
        that.isScroll = true
        if (data.allPages === '0') {
          that.err = true
          that.error = '没有该商品'
        } else if (
          data.contentlist.length === 0 ||
          that.params.page > that.allPages
        ) {
          that.isScroll = false
          that.whole = true
        }
        if (that.params.page <= data.allPages) {
          that.whole = true
          that.goods = that.goods.concat(data.contentlist)
          that.allNum = data.allNum
          that.allPages = data.allPages
        } else {
          that.isScroll = false
        }
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
.mobileGoods {
  margin-top: px2rem(80);
  input {
    line-height: px2rem(28);
    font-size: px2rem(14);
    border: 1px solid #ccc;
  }
  .item {
    padding: 0 px2rem(10);
    a {
      display: block;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .zsimg {
      img {
        display: block;
        width: px2rem(108);
        height: px2rem(108);
      }
    }
    .infor {
      margin-left: px2rem(8);
      padding: px2rem(20) 0;
      border-bottom: px2rem(0.5) solid #ccc;
      p {
        color: #333;
        margin: px2rem(4) 0;
        span {
          font-size: px2rem(16);
          color: #ff462b;
        }
      }
      .price {
        color: #666;
        font-size: px2rem(12);
      }
    }
  }
  .whole {
    line-height: px2rem(30);
    text-align: center;
    color: #333;
    border-top: px2rem(0.5) solid #ccc;
  }
}
</style>
