<template>
  <div id="PM">
    <header>
      <div class="single" :class="{on:isSingle}" @click='tab(0)'>
        单个城市及其监测点PM数据
      </div>
      <div class="whole" :class="{on:isWhole}" @click='tab(1)'>
        全国城市空气质量排行榜
      </div>
    </header>
    <pmsingle v-if="isSingle"></pmsingle>
    <pmwhole v-if="isWhole"></pmwhole>
  </div>
</template>
<script>
import pmsingle from './PMsingle'
import pmwhole from './PMwhole'
export default {
  data() {
    return {
      msg: 'qwe',
      pm: '',
      siteList: '',
      isSingle: true,
      isWhole: false
    }
  },
  components: {
    pmsingle,
    pmwhole
  },
  mounted() {},
  methods: {
    tab: function(e) {
      return e === 0
        ? ((this.isSingle = true), (this.isWhole = false))
        : ((this.isSingle = false), (this.isWhole = true))
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../static/hotcss/px2rem.scss';
#PM {
  color: #333;
  padding-top: px2rem(40);
  header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    line-height: px2rem(40);
    padding: 0 px2rem(10);
    border-bottom: px2rem(0.5) solid #26a2ff;
    .single,
    .whole {
      text-align: center;
      flex: 1;
      box-sizing: border-box;
    }
    .on {
      color: #0094ff;
      border-bottom: px2rem(2) solid #26a2ff;
    }
  }
}
</style>
