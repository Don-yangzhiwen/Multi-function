<template>
  <div class="single">
    <div class="search">
      <input type="text" id="search-input" placeholder="请输入城市名" ref="search_input">
      <button id="btn-search" @click="search">搜索</button>
    </div>
    <div class="content" v-if="data">
      <div class="item">
        <h3>PM结构数据：</h3>
        <ul class="pm-jg">
          <li>
            城市名称：
            <span>{{pm.area}}</span>
          </li>
          <li>
            空气质量指数(AQI)：
            <span>{{pm.aqi}}</span>
          </li>
          <li>
            一氧化碳1小时平均：
            <span>{{pm.co}}</span>
            mg/m³
          </li>
          <li>
            二氧化氮1小时平均：
            <span>{{pm.no2}}</span>
            μg/m³
          </li>
          <li>
            臭氧1小时平均：
            <span>{{pm.o3}}</span>
            μg/m³
          </li>
          <li>
            臭氧8小时滑动平均：
            <span>{{pm.o3_8h}}</span>
            μg/m³
          </li>
          <li>
            颗粒物（粒径小于等于10μm）1小时平均：
            <span>{{pm.pm10}}</span>
            μg/m³
          </li>
          <li>
            颗粒物（粒径小于等于2.5μm）1小时平均：
            <span>{{pm.pm2_5}}</span>
            μg/m³
          </li>
          <li>
            首要污染物：
            <span>{{pm.primary_pollutant}}</span>
          </li>
          <li>
            空气质量指数类别：
            <span>{{pm.quality}}</span>
          </li>
          <li>
            二氧化硫一小时平均：
            <span>{{pm.so2}}</span>
            μg/m³
          </li>
          <li>发布时间：{{pm.ct}}</li>
        </ul>
      </div>
      <div class="item">
        <h3>下属的监测站的PM数据：</h3>
        <ul class="pm-xs">
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
    <div class="error" v-if="err">
      <p>{{error}}</p>
    </div>
    <div class="animate" v-if="moreLoading">
      <mt-spinner type="fading-circle" color="#26a2ff"></mt-spinner>
      <span>加载中</span>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      pm: '',
      siteList: '',
      data: false,
      err: false,
      error: '',
      moreLoading: false
    }
  },
  mounted() {},
  methods: {
    search: function() {
      var value = this.$refs.search_input.value.trim()
      if (value) {
        var that = this
        that.data = false
        that.err = false
        that.moreLoading = true
        that.P.request(
          '104-29',
          {
            city: value
          },
          function(data) {
            that.moreLoading = false
            if (data.ret_code < 0) {
              that.error = data.error_info
              that.data = false
              that.err = true
            } else {
              that.err = false
              that.data = true
              that.pm = data.pm
              that.siteList = data.siteList
            }
          },
          function(error) {
            that.moreLoading = false
            that.data = false
            that.err = true
            that.error = error.error_info
          }
        )
      } else {
        Toast({
          message: '请输入城市名',
          position: 'bottom',
          duration: 1500
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../static/hotcss/px2rem.scss';
.single {
  .search {
    position: fixed;
    top: px2rem(85/2);
    left: 0;
    width: 100%;
    padding: px2rem(10);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    box-shadow: 0 px2rem(3) px2rem(4) #999;
    #search-input {
      width: 100%;
      height: px2rem(38);
      line-height: px2rem(38);
      font-size: px2rem(14);
      border: px2rem(0.5) solid #999;
      padding: 0 px2rem(10);
      outline: none;
      color: #333;
      background-color: #fff;
      border-radius: px2rem(6) 0 0 px2rem(6);
    }
    #btn-search {
      width: px2rem(80);
      font-size: px2rem(16);
      background-color: #26a2ff;
      color: #fff;
      line-height: px2rem(39);
      border: none;
      border-radius: 0 px2rem(6) px2rem(6) 0;
      padding: 0;
    }
  }
  .content {
    height: 100%;
    border-top: px2rem(0.5) dashed #000;
    h3 {
      padding-left: px2rem(10);
      line-height: px2rem(30);
      font-size: px2rem(16);
    }
    .pm-jg {
      height: 100%;
      padding: 0 0 px2rem(10) px2rem(10);
      border-bottom: px2rem(0.5) solid #ccc;
      li {
        line-height: px2rem(24);
      }
    }
    .pm-xs {
      height: 100%;
      li {
        padding: px2rem(2) 0 px2rem(10) px2rem(10);
        border-bottom: px2rem(0.5) solid #ccc;
        p {
          line-height: px2rem(24);
        }
      }
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
  .animate {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: px2rem(6) 0;
    > span {
      margin-left: px2rem(8);
    }
  }
  .content,
  .error,
  .animate {
    margin-top: px2rem(65);
  }
}
</style>
