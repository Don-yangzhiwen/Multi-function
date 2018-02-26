<template>
  <div class="searchbox">
    <div class="search-input">
      <label>
        <p>
          彩票类型
          <span>*</span>
        </p>
        <input type="text" :placeholder="placeholder[0]" ref="code">
      </label>
      <p class="remarks">{{remarks[0]}}</p>
    </div>
    <div class="search-input">
      <label>
        <p>
          截止时间
        </p>
        <input type="text" id="endTime" readonly=true ref="endtime" :placeholder="placeholder[1]">
      </label>
      <p class="remarks">{{remarks[1]}}</p>
    </div>
    <div class="search-btn">
      <button @click="search">搜索</button>
    </div>
  </div>
</template>
<script>
import './../common/LCalendar/js/LCalendar'
export default {
  data() {
    return {}
  },
  props: ['placeholder', 'remarks'],
  mounted() {
    var calendar = new window.LCalendar()
    calendar.init({
      trigger: '#endTime',
      type: 'datetime', //  date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择
      minDate: new Date().getFullYear() - 1 + '-' + 11 + '-' + 1, //  最小日期
      maxDate:
        new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1) +
        '-' +
        new Date().getDate() //  最大日期
    })
  },
  methods: {
    search() {
      var obj = {}
      obj['code'] = this.$refs.code.value
      obj['endtime'] = this.$refs.endtime.value
      this.$emit('child-value', obj)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../static/hotcss/px2rem.scss';
.searchbox {
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 px2rem(2) px2rem(5) #666;
  padding: px2rem(10);
  padding-left: px2rem(15);
  .search-input {
    height: 100%;
    label {
      margin-bottom: px2rem(5);
      display: flex;
      align-items: center;
      color: #333;
      input {
        flex: 7;
        height: px2rem(30);
        line-height: px2rem(30);
        font-size: px2rem(14);
        border: px2rem(0.5) solid #999;
        padding: 0 px2rem(5);
        outline: none;
        color: #333;
        border-radius: px2rem(5);
        margin: 0 px2rem(5);
      }
      p {
        flex: 2;
        span {
          color: red;
        }
      }
    }
    .remarks {
      margin-top: px2rem(4);
      font-size: px2rem(12);
      color: #666;
    }
  }
  .search-btn {
    text-align: center;
    button {
      width: px2rem(70);
      font-size: px2rem(16);
      background-color: #26a2ff;
      color: #f0f0f0;
      line-height: px2rem(32);
      border: none;
      border-radius: px2rem(6);
      padding: 0;
    }
  }
}
</style>
