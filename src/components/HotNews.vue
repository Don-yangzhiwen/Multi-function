<template>
  <div class="hotNews">
    <ul class="head">
      <li v-for="(val,index) in titles" :key='index' @click="change(index)" ref='news'>
        <p>{{val}}</p>
      </li>
    </ul>
    <RealTime v-if="temp===0"></RealTime>
    <ThisWeek v-if="temp===1"></ThisWeek>
  </div>
</template>
<script>
import RealTime from './RealTime'
import ThisWeek from './ThisWeek'
export default {
  data() {
    return {
      msg: 'HotNews',
      titles: ['实时新闻热搜榜', '本周新闻热搜榜'],
      index: 0,
      temp: 0
    }
  },
  components: {
    RealTime,
    ThisWeek
  },
  mounted() {
    var a = this.$refs.news
    a[this.index].className = 'on'
  },
  methods: {
    change: function(indexes) {
      var a = this.$refs.news
      for (var i = 0; i < a.length; i++) {
        a[i].className = ''
      }
      a[indexes].className = 'on'
      this.temp = indexes
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../static/hotcss/px2rem.scss';
.hotNews {
  padding-top: px2rem(38);
  .head {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    height: px2rem(38);
    line-height: px2rem(38);
    padding: 0 px2rem(10);
    box-sizing: border-box;
    border-bottom: px2rem(0.5) solid #26a2ff;
    li {
      text-align: center;
      flex: 1;
      P {
        height: px2rem(38);
        box-sizing: border-box;
        display: inline-block;
        color: #333;
      }
    }
    .on {
      p {
        color: #0094ff;
        border-bottom: px2rem(2) solid #26a2ff;
      }
    }
  }
}
</style>
