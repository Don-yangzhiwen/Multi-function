<template>
  <div class="multi">
    <Loading :isTrue="moreLoading"></Loading>
    <Error :isTrue="err" :errText='error'></Error>
    <div class="content" v-if="data">
      <table>
        <tr>
          <th style="width:4em;">彩票类型</th>
          <th style="width:4em;">彩票类型编码</th>
          <th style="width:4em;">彩票范围</th>
          <th style="width:4em;">彩票分类</th>
          <th style="width:2em;">热门</th>
          <th style="width:2em;">高频</th>
          <th style="width:8em;">彩票范围</th>
        </tr>
        <tr v-for="(val,index) in lists" :key='index'>
          <td>{{val.descr}}</td>
          <td>{{val.code}}</td>
          <td>{{val.area}}</td>
          <td>{{val.issuer}}</td>
          <td v-if="val.hots==='true'" class='yes'>
            <span>是</span>
          </td>
          <td v-else class='no'>
            <span>否</span>
          </td>
          <td v-if="val.high==='true'" class='yes'>
            <span>是</span>
          </td>
          <td v-else class='no'>
            <span>否</span>
          </td>
          <td>{{val.notes}}</td>
        </tr>
      </table>
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
      lists: []
    }
  },
  components: {
    Error,
    Loading,
    MoreSearch
  },
  mounted() {
    askHistory(this)
  },
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
    '44-6',
    {},
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
    table {
      width: 100%;
      border-collapse: collapse;
      tr {
        font-size: px2rem(13);
        th {
          background-color: #eef1f6;
          border: px2rem(0.5) solid #ccc;
          line-height: px2rem(34);
          color: #000;
        }
        td {
          vertical-align: middle;
          text-align: center;
          font-size: px2rem(14);
          border: px2rem(0.5) solid #ccc;
          padding: px2rem(5) 0;
        }
        .yes {
          span {
            background-color: rgba(32, 160, 255, 0.1);
            padding: px2rem(2) px2rem(3);
            border: px2rem(0.5) solid rgba(32, 160, 255, 0.3);
            color: #20a0ff;
          }
        }
        .no {
          span {
            padding: px2rem(2) px2rem(3);
            background-color: #e4e8f1;
            border-color: #e4e8f1;
            color: #48576a;
          }
        }
      }
    }
  }
  .loading,
  .error {
    margin-top: px2rem(155);
  }
}
</style>
