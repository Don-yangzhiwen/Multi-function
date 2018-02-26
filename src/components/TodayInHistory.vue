<template>
  <div class="history">
    <Header :title='title'></Header>
    <div class="search">
      <input type="text" id="search-input" placeholder="日期格式0705,不写默认当天" ref="search_input">
      <button id="btn-search" @click="search">搜索</button>
    </div>
    <div class="content" v-if="data">
      <ul>
        <li v-for="(val,index) in lists" :key='index'>
          <p class="title">{{val.title}}</p>
          <img :src="val.img" :alt="val.title" v-if="val.img">
          <span>时间：{{val.year}}-{{val.month}}-{{val.day}}</span>
        </li>
      </ul>
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
import Header from './Header'
export default {
  data() {
    return {
      title: '历史上的今天',
      moreLoading: false,
      err: false,
      lists: [],
      data: false
    }
  },
  components: {
    Header
  },
  mounted() {
    askHistory(this)
  },
  methods: {
    search: function() {
      askHistory(this)
    }
  }
}

function askHistory(that) {
  var value = that.$refs.search_input.value.trim()
  that.data = false
  that.err = false
  that.moreLoading = true
  that.P.request(
    '119-42',
    {
      date: value
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
        that.lists = data.list
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
.history {
  .header {
    position: fixed;
    top: 0;
    left: 0;
  }
  .search {
    position: fixed;
    top: px2rem(37);
    left: 0;
    width: 100%;
    padding: px2rem(10);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    box-shadow: 0 px2rem(3) px2rem(4) #666;
    #search-input {
      width: 100%;
      height: px2rem(35);
      line-height: px2rem(35);
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
      line-height: px2rem(36);
      border: none;
      border-radius: 0 px2rem(6) px2rem(6) 0;
      padding: 0;
    }
  }
  .content {
    ul {
      text-align: center;
      li {
        height: 100%;
        padding: px2rem(5) px2rem(20);
        display: block;
        background-color: #fff;
        border-bottom: px2rem(0.5) solid #999;
        img {
          display: block;
          width: px2rem(330);
        }
        p {
          line-height: px2rem(30);
          font-size: px2rem(16);
        }
        span {
          display: inline-block;
          width: 100%;
          text-align: left;
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
    margin-top: px2rem(96);
  }
}
</style>
