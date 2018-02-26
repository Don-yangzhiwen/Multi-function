<template>
  <div class="MobilScreen" @click="goHide">
    <div class="navslide" @click.stop>
      <h2>筛选</h2>
      <div class="system common">
        <div class="com" @click="gorotate($event)">
          <p>操作系统</p>
          <i class="iconfont icon-down"></i>
        </div>
        <ul>
          <li v-for="(val,index) in data.phoneSystemList" :key='index' ref='system'>
            <p @click="seSystem($event,index,val.id)" :class='[temp==index?"on":""]'>{{val.name}}</p>
            <i class="iconfont icon-tabguanbi" v-if="temp==index"></i>
          </li>
        </ul>
      </div>
      <div class="net common">
        <div class="com" @click="gorotate($event)" ref='net'>
          <p>网络类型</p>
          <i class="iconfont icon-down"></i>
        </div>
        <ul>
          <li v-for="(val,index) in data.netList" :key='index' ref='net'>
            <p @click="seNet($event,index,val.id)" :class='[net==index?"on":""]'>{{val.name}}</p>
            <i class="iconfont icon-tabguanbi" v-if="net==index"></i>
          </li>
        </ul>
      </div>
      <div class="cpu common">
        <div class="com" @click="gorotate($event)">
          <p>CPU类型</p>
          <i class="iconfont icon-down"></i>
        </div>
        <ul>
          <li v-for="(val,index) in data.cpu_numList" :key='index' ref='cpu'>
            <p @click="seCPU($event,index,val.id)" :class='[cpu==index?"on":""]'>{{val.name}}</p>
            <i class="iconfont icon-tabguanbi" v-if="cpu==index"></i>
          </li>
        </ul>
      </div>
      <div class="button">
        <span @click="reset">重置</span>
        <span @click="goHide">完成</span>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data() {
    return {
      msg: 'MobilScreen',
      temp: -1,
      net: -1,
      cpu: -1
    }
  },
  props: ['data', 'params', 'isTrue'],
  watch: {
    data: {
      handler(newVal, oldVal) {}
    },
    isTrue: {
      handler(newVal, oldVal) {
        if (newVal.a) {
          $('.MobilScreen').show()
          $('.MobilScreen').css({
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          })
          $('.navslide').animate(
            {
              right: 0
            },
            300
          )
        } else {
          $('.MobilScreen').css({
            backgroundColor: 'rgba(0, 0, 0, 0)'
          })
          $('.navslide').animate(
            {
              right: '-100%'
            },
            300,
            function() {
              $('.MobilScreen').hide()
            }
          )
        }
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    gorotate(event) {
      var e = event.currentTarget
      var i = e.getElementsByTagName('i')[0]
      var rotate = i.style.transform
      if (rotate === 'rotate(180deg)') {
        i.style = 'transform:rotate(0deg)'
      } else {
        i.style = 'transform:rotate(180deg)'
      }
      $(event.currentTarget)
        .parents('.common')
        .find('ul')
        .slideToggle(10)
    },
    goHide() {
      this.isTrue.a = false
      document.getElementsByTagName('body')[0].style = 'overflow:auto;'
    },
    seSystem(event, index, id) {
      this.temp = index
      var a = this.$refs.system
      sele(a, index)
      this.params.system = id
    },
    seNet(event, index, id) {
      this.net = index
      var a = this.$refs.net
      sele(a, index)
      this.params.net = id
    },
    seCPU(event, index, id) {
      this.cpu = index
      var a = this.$refs.cpu
      sele(a, index)
      this.params.cpu = id
    },
    reset() {
      this.params.system = ''
      this.params.net = ''
      this.params.cpu = ''
      this.temp = -1
      this.net = -1
      this.cpu = -1
      var a = this.$refs.system
      sele(a, 0, true)
      var b = this.$refs.net
      sele(b, 0, true)
      var c = this.$refs.cpu
      sele(c, 0, true)
    }
  }
}

function sele(ele, index, show) {
  for (var i = 0; i < ele.length; i++) {
    if (i !== index) {
      ele[i].classList.add('hide')
    }
    if (show) {
      ele[i].classList.remove('hide')
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../static/hotcss/px2rem.scss';
.MobilScreen {
  position: fixed;
  top: 0;
  right: 0;
  display: none;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000, $alpha: 0.3);
  .navslide {
    position: relative;
    right: -100%;
    width: 70%;
    height: 100%;
    float: right;
    background-color: #fff;
    font-size: px2rem(12);
    overflow: auto;
    h2 {
      line-height: px2rem(34);
      background-color: #f0f0f0;
      padding: 0 px2rem(10);
      color: #999;
    }
    .common {
      padding-right: px2rem(10);
      border-bottom: px2rem(0.5) solid #ccc;
      color: #666;
      .com {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: px2rem(10);
        p {
          line-height: px2rem(38);
        }
        i {
          font-size: px2rem(17);
          color: #333;
        }
      }
      ul {
        display: none;
        color: #333;
        overflow: hidden;
        li {
          width: px2rem(126);
          float: left;
          text-align: center;
          position: relative;
          p {
            background-color: #f0f0f0;
            line-height: px2rem(34);
            margin-left: px2rem(10);
            margin-bottom: px2rem(10);
            border-radius: px2rem(4);
          }
          .on {
            background-color: #ffebe1;
          }
          i {
            position: absolute;
            bottom: px2rem(10);
            right: 0;
            font-size: px2rem(14);
            color: #ff5000;
          }
        }
        .hide {
          display: none;
        }
      }
    }
    .button {
      position: fixed;
      bottom: 0;
      width: 70%;
      display: flex;
      justify-content: space-between;
      span {
        flex: 1;
        text-align: center;
        line-height: px2rem(38);
        color: #fff;
        font-size: px2rem(16);
      }
      span:nth-of-type(1) {
        background-color: #f4d041;
      }
      span:nth-of-type(2) {
        background-color: #ff462b;
      }
    }
  }
}
</style>
