<template>
  <div class="health">
    <div class="head">
      <i class="iconfont icon-fangdajing"></i>
      <h2>健康资讯</h2>
      <i class="iconfont icon-zhankai" @click="open"></i>
    </div>
    <div class="side" @click="close" v-show="side">
      <div class="mask" v-show="mask"></div>
      <div class="slide" @click.stop ref='slide'>
        <ul>
          <li data-id='1'>
            <span>综合资讯</span>
          </li>
          <li data-id='2'>
            <span>疾病资讯</span>
          </li>
          <li data-id='3'>
            <span>食品资讯</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="main">
      <div class="lunbo">
        <swiper :options='swiperOption' ref='mySwiper' v-if="lunbo">
          <swiper-slide v-for="(val,index) in list" :key='index'>
            <router-link :to="'/Health/detail/' + val.id">
              <img :src='val.img'>
            </router-link>
            <div class="mark">
              <div class="mark-content">
                <p>{{'【'+val.tname+'】' + val.title}}</p>
                <p>&nbsp;来自{{val.author}}&nbsp;&nbsp;时间：{{val.time}}</p>
              </div>
            </div>
          </swiper-slide>
          <!-- 轮播小圆点 -->
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        </swiper>
      </div>
      <div class="content">
        <ul>
          <li v-for="(val,index) in list.slice(0,3)" :key='index'>
            <div class="left">
              <router-link :to="'/Health/detail/' + val.id">
                <img :src='val.img'>
              </router-link>
            </div>
            <div class="right">
              <p class="title">
                <span>【{{val.tname}}】</span>
                {{val.title}}
              </p>
              <p class="remarks">
                <span>来自{{val.author}}</span>
                <span>时间：{{val.time}}</span>
              </p>
            </div>
          </li>
        </ul>
        <div class="more">
          点击查看更多
        </div>
      </div>
      <Loading :isTrue="moreLoading"></Loading>
      <Error :isTrue="err" :errText='error'></Error>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import Error from './Error'
import Loading from './Loading'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data() {
    return {
      msg: 'health',
      side: false,
      mask: false,
      error: '',
      err: false,
      moreLoading: false,
      list: '',
      lunbo: false,
      swiperOption: {
        notNextTick: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        effect: 'fade',
        grabCursor: true,
        setWrapperSize: true,
        loop: true,
        // autoplayDisableOnInteraction: false,
        speed: 500,
        // pagination: '.swiper-pagination',
        // paginationClickable: true,
        // prevButton: '.swiper-button-prev',
        // nextButton: '.swiper-button-next',
        // scrollbar: '.swiper-scrollbar',
        // grabCursor: true,
        // autoHeight: true,
        // paginationType:'bullets',
        // mousewheelControl: true,
        // observeParents: true,
        // if you need use plugins in the swiper, you can config in here like this
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下
        debugger: true
        // swiper callbacks
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        // onTransitionStart(swiper){
        //   console.log(swiper)
        // },
      }
    }
  },
  components: {
    Error,
    Loading,
    swiper,
    swiperSlide
  },
  beforeCreate() {
    document.documentElement.style.backgroundColor = '#F5F5F5'
  },
  beforeDestroy() {
    document.documentElement.style.backgroundColor = '#FFF'
  },
  mounted() {
    var params = {
      tid: '',
      keyword: '',
      page: ''
    }
    askHealth(this, params)
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    close() {
      var that = this
      this.mask = false
      var obj = this.$refs.slide
      $(obj).animate(
        {
          right: '-50%'
        },
        200,
        function() {
          that.side = false
        }
      )
    },
    open() {
      this.side = true
      this.mask = true
      var obj = this.$refs.slide
      $(obj).animate(
        {
          right: '0%'
        },
        200
      )
    }
  }
}
function askHealth(that, obj) {
  that.data = false
  that.err = false
  that.moreLoading = true
  that.lunbo = false
  that.P.request(
    '96-109',
    obj,
    function(data) {
      that.moreLoading = false
      // console.log(data)
      if (data.ret_code !== 0 || data.pagebean.contentlist.length === 0) {
        that.error = '请输入正确的关键字'
        that.data = false
        that.err = true
      } else {
        that.err = false
        that.data = true
        that.list = data.pagebean.contentlist.slice(0, 8)
        that.lunbo = true
        // console.log(that.list)
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
.health {
  .head {
    z-index: 100;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: px2rem(38);
    background-color: #21292c;
    .icon-fangdajing {
      position: absolute;
      left: px2rem(8);
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
      font-size: px2rem(20);
    }
    h2 {
      text-align: center;
      line-height: px2rem(38);
      color: #fff;
      font-size: px2rem(18);
    }
    .icon-zhankai {
      position: absolute;
      right: px2rem(8);
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
      font-size: px2rem(20);
    }
  }
  .side {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    .mask {
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000, $alpha: 0.3);
    }
    .slide {
      position: absolute;
      top: 0;
      right: -50%;
      width: 50%;
      height: 100%;
      background-color: #fff;
      border-left: px2rem(0.5) solid #ccc;
      ul {
        padding: px2rem(20) px2rem(15);
        li {
          border-bottom: px2rem(0.5) solid #ccc;
          span {
            display: inline-block;
            line-height: px2rem(30);
          }
        }
      }
    }
  }
  .main {
    margin-top: px2rem(38);
    .lunbo {
      position: relative;
      height: px2rem(200);
      .swiper-slide {
        width: 100%;
        img {
          width: 100%;
          height: px2rem(200);
          display: block;
        }
      }
      .mark {
        z-index: 10;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: rgba($color: #000, $alpha: 0.3);
        .mark-content {
          color: #fff;
          padding: px2rem(5);
          p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: px2rem(12);
            line-height: px2rem(18);
          }
        }
      }
    }
    .content {
      background-color: #fff;
      ul {
        li {
          display: flex;
          align-items: center;
          padding: px2rem(20) px2rem(10);
          border-bottom: px2rem(0.5) solid #ccc;
          .left {
            img {
              width: px2rem(140);
              height: px2rem(120);
              margin-right: px2rem(5);
              vertical-align: bottom;
            }
          }
          .right {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .title {
              margin-top: px2rem(10);
              span {
                color: #7d1413;
                font-weight: bold;
              }
            }
            .remarks {
              font-size: px2rem(12);
              margin-top: px2rem(25);
              color: #999;
            }
          }
        }
      }
    }
    .more {
      text-align: center;
      line-height: px2rem(30);
      color: #e01b1b;
      text-decoration: underline;
    }
  }
}
</style>
