<template>
  <div class="lottery">
    <ul class="head">
      <li v-for="(val,index) in sites" :key='index' @click="change(index)" ref='kaijiang'>
        <p>{{val}}</p>
      </li>
    </ul>
    <NewLottery v-if="temp===subcomponent.newl"></NewLottery>
    <MultiPeriod v-if="temp===subcomponent.multi"></MultiPeriod>
    <SingleLottery v-if="temp===subcomponent.single"></SingleLottery>
    <SupportLottery v-if="temp===subcomponent.support"></SupportLottery>
  </div>
</template>
<script>
import $ from 'jquery'
import NewLottery from './NewLottery'
import MultiPeriod from './MultiPeriod'
import SingleLottery from './SingleLottery'
import SupportLottery from './SupportLottery'

export default {
  data() {
    return {
      msg: 'lottery',
      sites: [
        '最新开奖查询',
        '多期开奖查询',
        '单期开奖查询',
        '支持彩票类型查询'
      ],
      index: 0,
      temp: 0,
      subcomponent: {
        newl: 0,
        multi: 1,
        single: 2,
        support: 3
      }
    }
  },
  components: {
    NewLottery,
    MultiPeriod,
    SingleLottery,
    SupportLottery
  },
  mounted() {
    var a = this.$refs.kaijiang
    a[this.index].className = 'on'
  },
  methods: {
    change: function(indexes) {
      var a = this.$refs.kaijiang
      var width = 0
      for (var i = 0; i < a.length; i++) {
        a[i].className = ''
        if (indexes > i + 1) {
          width += a[i].offsetWidth
        }
      }
      $('.head').animate(
        {
          scrollLeft: width
        },
        200
      )
      a[indexes].className = 'on'
      this.temp = indexes
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../static/hotcss/px2rem.scss';
.lottery {
  padding-top: px2rem(38);
  .head {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 px2rem(2) px2rem(2) #ccc;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: auto;
    overflow-y: hidden;
    background-color: #fafafa;
    li {
      display: inline-block;
      text-align: center;
      padding: 0 px2rem(10);
      p {
        color: #ccc;
        height: px2rem(38);
        line-height: px2rem(38);
        font-size: px2rem(14);
        box-sizing: border-box;
      }
    }
    .on {
      p {
        color: #333;
        border-bottom: px2rem(3) solid #26a2ff;
      }
    }
  }
}
</style>
