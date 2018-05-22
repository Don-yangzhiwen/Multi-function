<template>
  <div class="IDNumber">
    <Header :title='title'></Header>
    <SearchBox @child-value='get' placeholder='请输入身份证'></SearchBox>
    <Loading :isTrue="moreLoading"></Loading>
    <Error :isTrue="err" :errText='error'></Error>
    <div class="content" v-if="data">
      <ul>
        <li>
          <p>生日：{{lists.birthday}}</p>
          <p v-if="lists.sex='M'">性别：男</p>
          <p v-else>性别：女</p>
          <p>籍贯：{{lists.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Error from './Error'
import Loading from './Loading'
import SearchBox from './SearchBox'
import Header from './Header'
export default {
  data () {
    return {
      title: '身份证查询',
      data: false,
      error: '',
      err: false,
      moreLoading: false,
      lists: ''
    }
  },
  components: {
    Error,
    Loading,
    SearchBox,
    Header
  },
  mounted () { },
  methods: {
    get (msg) {
      askHistory(this, msg)
    }
  }
}

function askHistory (that, value) {
  that.data = false
  that.err = false
  that.moreLoading = true
  that.P.request(
    '25-3',
    {
      id: value
    },
    function (data) {
      that.moreLoading = false
      if (data.ret_code < 0 || !data.retData) {
        that.error = data.remark || data.retMsg
        that.data = false
        that.err = true
      } else {
        that.err = false
        that.data = true
        that.lists = data.retData
      }
    },
    function (error) {
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
.IDNumber {
  .content {
    color: #333;
    height: 100%;
    ul {
      li {
        height: 100%;
        padding: px2rem(2) 0 px2rem(10) px2rem(10);
        p {
          line-height: px2rem(24);
        }
      }
    }
  }
  .content,
  .loading {
    margin-top: px2rem(20);
  }
}
</style>
