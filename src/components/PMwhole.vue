<template>
  <div class="whole" v-infinite-scroll="loadMore" infinite-scroll-disabled='loading' infinite-scroll-distance="10">
    <div class="content" v-if="data">
      <div class="item">
        <ul>
          <li v-for="(val,index) in siteList" :key='index'>
            <p>
              监测点名称：
              <span>{{val.site_name}}</span>
            </p>
            <p>
              空气质量指数(AQI)：
              <span>{{val.aqi}}</span>
            </p>
            <p>
              一氧化碳1小时平均：
              <span>{{val.co}}</span>
              mg/m³
            </p>
            <p>
              二氧化氮1小时平均：
              <span>{{val.no2}}</span>
              μg/m³
            </p>
            <p>
              臭氧1小时平均：
              <span>{{val.o3}}</span>
              μg/m³
            </p>
            <p>
              臭氧8小时滑动平均：
              <span>{{val.o3_8h}}</span>
              μg/m³
            </p>
            <p>
              颗粒物（粒径小于等于10μm）1小时平均：
              <span>{{val.pm10}}</span>
              μg/m³
            </p>
            <p>
              颗粒物（粒径小于等于2.5μm）1小时平均：
              <span>{{val.pm2_5}}</span>
              μg/m³
            </p>
            <p>
              首要污染物：
              <span>{{val.primary_pollutant}}</span>
            </p>
            <p>
              空气质量指数类别：
              <span>{{val.quapty}}</span>
            </p>
            <p>
              二氧化硫一小时平均：
              <span>{{val.so2}}</span>
              μg/m³
            </p>
            <p>发布时间：{{val.ct}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="animate">
      <mt-spinner type="fading-circle" v-if="moreLoading" color="#26a2ff"></mt-spinner>
      <span v-if="moreLoading">加载中</span>
      <span v-if="allLoaded">已全部加载</span>
    </div>
    <div class="error" v-if="err">
      <p>{{error}}123</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pm: '',
      items: [],
      siteList: [],
      loading: false,
      data: false,
      err: false,
      error: '',
      btn: 8,
      step: 8,
      length: 0,
      moreLoading: false,
      allLoaded: false,
      isTrue: true
    }
  },
  mounted() {},
  methods: {
    loadMore() {
      var that = this
      that.loading = true
      if (that.btn === 8) {
        that.moreLoading = true
        this.P.request(
          '104-41',
          '',
          function(data) {
            if (data.ret_code < 0) {
              that.error = data.error_info
              that.data = false
              that.err = true
            } else {
              that.err = false
              that.data = true
              that.items = data.list
              that.length = data.list.length
              that.siteList = data.list.slice(0, that.btn)
              that.btn += that.step
              that.loading = false
            }
          },
          function(error) {
            that.data = false
            that.err = true
            that.error = error.error_info
          }
        )
        return true
      }
      if (that.isTrue) {
        that.isTrue = false
        that.moreLoading = true
        setTimeout(function() {
          that.isTrue = true
          that.loading = false
          if (that.btn >= that.length) {
            that.btn = that.length
            that.moreLoading = false
            that.allLoaded = true
            that.isTrue = false
          }
          that.siteList = that.items.slice(0, that.btn)
          that.btn += that.step
        }, 500)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../static/hotcss/px2rem.scss';
.whole {
  .content {
    h3 {
      padding-left: px2rem(10);
      line-height: px2rem(32);
      font-size: px2rem(16);
    }
    ul {
      height: 100%;
      li {
        padding: 0 0 px2rem(10) px2rem(10);
        border-bottom: px2rem(0.5) solid #ccc;
        p {
          line-height: px2rem(24);
        }
      }
    }
  }
  .animate {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: px2rem(6) 0;
    > span {
      margin-left: px2rem(8);
    }
  }
  .error {
    padding: px2rem(150) 0;
    text-align: center;
    p {
      font-size: px2rem(26);
      font-weight: bold;
    }
  }
}
</style>
