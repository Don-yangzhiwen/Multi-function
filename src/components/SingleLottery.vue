<template>
  <div class="multi">
    <div class="searchbox">
      <div class="search-input">
        <label>
          <p>
            彩票类型
            <span>*</span>
          </p>
          <input type="text" placeholder="请输入彩票类型" ref="code">
        </label>
      </div>
      <div class="search-input">
        <label>
          <p>
            第几期彩票
          </p>
          <input type="text" ref="expect" placeholder="格式为2018022,无则表示查询最新一期">
        </label>
      </div>
      <div class="search-btn">
        <button @click="search">搜索</button>
      </div>
    </div>
    <Loading :isTrue="moreLoading"></Loading>
    <Error :isTrue="err" :errText='error'></Error>
    <div class="content" v-if="data">
      <ul>
        <li>
          <p>彩票名称：{{lists.name}}</p>
          <p>彩票类型编码：{{lists.code}}</p>
          <p>
            中将号码：
            <span>{{lists.openCode}}</span>
          </p>
          <p>开奖时间：{{lists.time}}</p>
          <p>多少区开奖编号：{{lists.expect}}</p>
          <p>开奖时间戳：{{lists.timestamp}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Error from './Error'
import Loading from './Loading'
import MoreSearch from './MoreSearch'
export default {
  data() {
    return {
      data: false,
      error: '',
      err: false,
      moreLoading: false,
      lists: [],
      remarks: [
        '',
        '该参数为过滤条件，表示只查询该时间前的开奖信息，无则使用服务器当前时间'
      ]
    }
  },
  components: {
    Error,
    Loading,
    MoreSearch
  },
  mounted() {},
  methods: {
    search() {
      askHistory(this)
    }
  }
}

function askHistory(that) {
  that.data = false
  that.err = false
  that.moreLoading = true
  that.P.request(
    '44-3',
    {
      code: that.$refs.code.value,
      expect: that.$refs.expect.value
    },
    function(data) {
      that.moreLoading = false
      if (data.ret_code !== 0 || data.result.length === 0) {
        that.error = data.error
        that.data = false
        that.err = true
      } else {
        that.err = false
        that.data = true
        that.lists = data.result
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
.multi {
  .searchbox {
    position: fixed;
    top: px2rem(38);
    left: 0;
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
  .content {
    color: #333;
    height: 100%;
    ul {
      li {
        height: 100%;
        padding: px2rem(2) 0 px2rem(10) px2rem(10);
        border-bottom: px2rem(0.5) solid #ccc;
        p {
          line-height: px2rem(24);
          span {
            color: red;
          }
        }
      }
    }
  }
  .content,
  .loading,
  .error {
    margin-top: px2rem(155);
  }
  .content {
    margin-top: px2rem(124);
  }
}
</style>
