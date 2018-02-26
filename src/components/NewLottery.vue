<template>
  <div class="newlottery">
    <SearchBox @child-value='get' :remarks='remarks' placeholder='请输入彩票类型'></SearchBox>
    <Loading :isTrue="moreLoading"></Loading>
    <Error :isTrue="err" :errText='error'></Error>
    <div class="content" v-if="data">
      <ul>
        <li v-for="(val,index) in lists" :key='index'>
          <p>彩票名称：{{val.name}}</p>
          <p>彩票类型编码：{{val.code}}</p>
          <p>中将号码：{{val.openCode}}</p>
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
import SearchBox from './SearchBox'
export default {
  data() {
    return {
      data: false,
      error: '',
      err: false,
      moreLoading: false,
      remarks: '彩票类型：查询多个以“|”分隔，无则返回全部彩票最新开奖信息',
      lists: []
    }
  },
  components: {
    Error,
    Loading,
    SearchBox
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
    '44-1',
    {
      code: value
    },
    function(data) {
      that.moreLoading = false
      if (data.ret_code < 0 || data.result.length === 0) {
        that.error = '错误彩票类型'
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
.newlottery {
  .searchbox {
    position: fixed;
    top: px2rem(38);
    left: 0;
  }
  .content {
    color: #333;
    ul {
      li {
        padding: px2rem(2) 0 px2rem(10) px2rem(10);
        border-bottom: px2rem(0.5) solid #ccc;
        p {
          height: px2rem(24);
          line-height: px2rem(24);
        }
      }
    }
  }
  .content,
  .loading {
    margin-top: px2rem(80);
  }
}
</style>
