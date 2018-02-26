<template>
  <div class="multi">
    <MoreSearch @child-value='get' :remarks='remarks' :placeholder='placeholder'></MoreSearch>
    <Loading :isTrue="moreLoading"></Loading>
    <Error :isTrue="err" :errText='error'></Error>
    <div class="content" v-if="data">
      <ul>
        <li v-for="(val,index) in lists" :key='index'>
          <p>彩票名称：{{val.name}}</p>
          <p>彩票类型编码：{{val.code}}</p>
          <p>
            中将号码：
            <span>{{val.openCode}}</span>
          </p>
          <p>开奖时间：{{val.time}}</p>
          <p>多少区开奖编号：{{val.expect}}</p>
          <p>开奖时间戳：{{val.timestamp}}</p>
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
      placeholder: ['请输入彩票类型', '格式为:"2015-02-26 21:35:00"的形式'],
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
    get(msg) {
      askHistory(this, msg)
    }
  }
}

function askHistory(that, value) {
  that.data = false
  that.err = false
  that.moreLoading = true
  that.P.request(
    '44-2',
    {
      code: value.code,
      endTime: value.endTime,
      count: 50
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
}
</style>
