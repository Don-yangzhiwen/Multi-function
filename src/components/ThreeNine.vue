<template>
  <div class="threeNine">
    <div class="search">
      <i class="iconfont icon-xiangzuo" @click="goback"></i>
      <div class="search-input">
        <input type="text" placeholder="请输入关键词" @input='input($event)' v-model="keyword" @keydown.enter='gokeyword'>
        <i class="iconfont icon-qingchu" v-if="isClear" @click="clear"></i>
      </div>
      <span @click="gokeyword">搜索</span>
    </div>
    <div class="function">
      <div class="choice">
        <ul>
          <li @click="open(0)">
            <span>{{brand}}</span>
            <i class="iconfont icon-xiangxia"></i>
          </li>
          <li @click="open(1)">
            <span>{{priceTop}}</span>
            <i class="iconfont icon-xiangxia"></i>
          </li>
          <li @click="open(2)">
            <span>{{back_cameraTop}}</span>
            <i class="iconfont icon-xiangxia"></i>
          </li>
          <li class="screen" @click="openNav">
            <span>筛选</span>
            <i class="iconfont icon-iconfontzhizuobiaozhun023125"></i>
          </li>
        </ul>
      </div>
      <div class="shadow" v-if="display">
        <div class="sha"></div>
        <div class="brand">
          <ul class="" v-if="temp==0">
            <li @click="gobrand(0,'','品牌')">
              <p :class="[btn == 0?'on':'']">品牌</p>
            </li>
            <li v-for="(val,index) in data.brandList" :key='index' @click="gobrand(index + 1,val.id,val.name)">
              <P :class="[btn == index+1 ?'on':'']">{{val.name}}</P>
            </li>
          </ul>
          <ul class="" v-if="temp==1">
            <li @click="goprice(0,'','价格')">
              <p :class="[price == 0?'on':'']">全部</p>
            </li>
            <li v-for="(val,index) in data.priceList" :key='index' @click="goprice(index + 1,val[0],val[0])">
              <P :class="[price == index+1 ?'on':'']">{{val[0]}}</P>
            </li>
          </ul>
          <ul class="" v-if="temp==2">
            <li @click="goback_camera(0,'','后置摄像头')">
              <p :class="[back_camera == 0?'on':'']">全部</p>
            </li>
            <li v-for="(val,index) in data.back_cameraList" :key='index' @click="goback_camera(index + 1,val.id,val.name)">
              <P :class="[back_camera == index+1 ?'on':'']">{{val.name}}</P>
            </li>
          </ul>
          <Loading :isTrue="moreLoading"></Loading>
          <Error :isTrue="err" :errText='error'></Error>
        </div>
      </div>
    </div>
    <MobileGoods :params='params' :jieshu='jieshu'></MobileGoods>
    <MobilScreen :data='data' :params='params' :isTrue='isTrue' v-if="data"></MobilScreen>
  </div>
</template>
<script>
import Error from './Error'
import Loading from './Loading'
import MobileGoods from './MobileGoods'
import MobilScreen from './MobilScreen'
// import $ from 'jquery'
export default {
  data() {
    return {
      isClear: false,
      keyword: '',
      temp: 2,
      display: false,
      brand: '品牌',
      priceTop: '价格',
      back_cameraTop: '后置摄像头',
      data: [],
      error: '',
      err: false,
      moreLoading: false,
      btn: 0,
      price: 0,
      back_camera: 0,
      params: {
        brand: '',
        price: '',
        camera: '',
        page: 1,
        q: '',
        net: '',
        system: '',
        cpu: ''
      },
      jieshu: 0,
      isTrue: {
        a: false
      }
    }
  },
  components: {
    Error,
    Loading,
    MobileGoods,
    MobilScreen
  },
  mounted() {
    askHistory(this)
  },
  methods: {
    goback() {
      history.go(-1)
    },
    input() {
      this.isClear = false
      if (this.keyword.trim()) {
        this.isClear = true
      }
    },
    clear() {
      this.keyword = ''
      this.isClear = false
    },
    open(event) {
      var b = document
        .getElementsByClassName('choice')[0]
        .getElementsByClassName('iconfont')
      for (var i = 0; i < b.length; i++) {
        if (event !== i) {
          b[i].style = 'transform:rotate(0deg)'
        }
      }
      var rotate = b[event].style.transform
      this.temp = event
      if (rotate === 'rotate(180deg)') {
        b[event].style = 'transform:rotate(0deg)'
        this.display = false
      } else {
        b[event].style.transform = 'rotate(180deg)'
        this.display = true
      }
    },
    //  品牌
    gobrand(index, params, value) {
      this.params.brand = params
      this.btn = index
      closeHistory(this, 0)
      this.brand = value
    },
    //  价格
    goprice(index, params, value) {
      this.params.price = params
      this.price = index
      closeHistory(this, 1)
      this.priceTop = value
    },
    //  后置摄像头
    goback_camera(index, params, value) {
      this.params.camera = params
      this.back_camera = index
      closeHistory(this, 2)
      this.back_cameraTop = value
    },
    gokeyword() {
      this.params.q = this.keyword
    },
    openNav() {
      this.isTrue.a = true
      document.getElementsByTagName('body')[0].style = 'overflow:hidden;'
    }
  }
}
//  关闭
function closeHistory(that, event) {
  that.jieshu++
  that.params.page = 1
  that.display = false
  var b = document
    .getElementsByClassName('choice')[0]
    .getElementsByClassName('iconfont')
  b[event].style = 'transform:rotate(0deg)'
}
//  请求参数
function askHistory(that) {
  that.err = false
  that.moreLoading = true
  that.P.request(
    '908-1',
    {},
    function(data) {
      that.moreLoading = false
      if (data.ret_code < 0) {
        that.error = data.error_info
        that.err = true
      } else {
        that.err = false
        that.data = data
      }
    },
    function(error) {
      that.moreLoading = false
      that.err = true
      that.error = error.error_info
    }
  )
}
</script>
<style lang="scss" scoped>
@import './../../static/hotcss/px2rem.scss';

.threeNine {
  .search {
    z-index: 10;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    display: flex;
    background-color: #ff462b;
    padding: px2rem(8);
    align-items: center;
    i {
      display: inline-block;
      text-align: center;
      color: #fff;
      font-size: px2rem(20);
    }
    > i {
      width: px2rem(40);
      margin-right: px2rem(10);
    }
    .search-input {
      width: 100%;
      background-color: #fff;
      border-radius: px2rem(3);
      display: flex;
      align-items: center;
      input::-webkit-input-placeholder {
        color: #999;
      }
      input {
        width: 100%;
        line-height: px2rem(28);
        font-size: px2rem(14);
        padding: 0 px2rem(6);
        border-radius: px2rem(3);
      }
      i {
        margin-right: px2rem(5);
        color: #ccc;
      }
    }
    span {
      width: px2rem(70);
      text-align: center;
      background-color: #fff;
      margin-left: px2rem(10);
      line-height: px2rem(28);
      border-radius: px2rem(28);
    }
  }
  .function {
    position: fixed;
    top: px2rem(44);
    left: 0;
    width: 100%;
    .choice {
      position: relative;
      z-index: 10;
      ul {
        display: flex;
        padding: 0 px2rem(16);
        border-bottom: px2rem(0.5) solid #ccc;
        background-color: #fff;
        li {
          flex: 5;
          line-height: px2rem(34);
          box-sizing: border-box;
          color: #ff462b;
          i {
            display: inline-block;
            font-size: px2rem(10);
            vertical-align: middle;
          }
        }
        li:nth-of-type(1) {
          flex: 4;
        }
        li:nth-of-type(3) {
          flex: 7;
        }
        .screen {
          flex: 3;
          color: #333;
          text-align: right;
          padding-right: px2rem(5);
          border-left: px2rem(0.5) solid #ccc;
          i {
            font-size: px2rem(12);
            color: #000;
          }
        }
      }
    }
    .shadow {
      .brand {
        z-index: 100;
        width: 100%;
        height: px2rem(150);
        position: absolute;
        top: px2rem(30);
        left: 0;
        background-color: #fff;
        overflow: auto;
      }
      ul {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        padding: 0 px2rem(20);
        box-sizing: border-box;
        li {
          flex: 50%;
          height: px2rem(34);
          line-height: px2rem(34);
          font-size: px2rem(14);
          .on {
            color: #ff462b;
          }
        }
      }
      .sha {
        z-index: 1;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000000, $alpha: 0.3);
      }
    }
  }
}
</style>
