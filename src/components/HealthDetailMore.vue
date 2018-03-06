<template>
  <div class="more-healthdetail">
    <div class="content">
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li v-for="(val,index) in list" :key='index'>
          <div class="left">
            <router-link :to="'/Health/detail/' + val.id">
              <img :src='val.img'>
            </router-link>
          </div>
          <div class="right">
            <p class="title">
              <span>【{{val.tname}}】</span>
              {{val.title}}
            </p>
            <p class="remarks">
              <span>来自{{val.author}}</span>
              <span>时间：{{val.time}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <Loading :isTrue="moreLoading"></Loading>
    <div class="loaded" v-if="loaded">
      已全部加载完毕
    </div>
    <Error :isTrue="err" :errText='error'></Error>
  </div>
</template>
<script>
import Error from './Error'
import Loading from './Loading'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      msg: 'more-healthdetail',
      error: '',
      err: false,
      moreLoading: false,
      list: [],
      loading: false,
      page: '0',
      allPages: '',
      loaded: false,
      loadMores: false
    }
  },
  components: {
    Error,
    Loading
  },
  computed: {
    ...mapState(['health'])
  },
  mounted() {},
  methods: {
    loadMore() {
      this.loading = true
      if (this.health.healthDetailMore.length === 0) {
        this.page++
        var params = {
          tid: '',
          keyword: '',
          page: this.page
        }
        askHealth(this, params)
      } else if (this.loadMores) {
        this.page = this.health.currentPage
        this.list = this.health.healthDetailMore
        this.page++
        var param = {
          tid: '',
          keyword: '',
          page: this.page
        }
        askHealth(this, param)
      } else {
        this.page = this.health.currentPage
        this.list = this.health.healthDetailMore
        this.loadMores = true
        this.loading = false
      }
    }
  }
}
function askHealth(that, obj) {
  that.data = false
  that.err = false
  that.moreLoading = true
  that.lunbo = false
  that.P.request(
    '96-109',
    obj,
    function(data) {
      that.moreLoading = false
      // console.log(data)
      if (data.ret_code !== 0 || data.pagebean.contentlist.length === 0) {
        that.error = '请输入正确的关键字'
        that.data = false
        that.err = true
      } else {
        that.err = false
        that.data = true
        that.list = that.list.concat(data.pagebean.contentlist)
        that.lunbo = true
        that.loading = false
        that.allPages = data.pagebean.allPages
        that.$store.commit('CHANGEHEALTH', that.list)
        that.$store.commit('CHANGECURRENTPAGE', data.pagebean.currentPage)
        if (that.page >= +that.allPages) {
          that.loading = true
          that.loaded = true
        }
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
.more-healthdetail {
  .content {
    background-color: #fff;
    ul {
      li {
        display: flex;
        align-items: center;
        padding: px2rem(20) px2rem(10);
        border-bottom: px2rem(0.5) solid #ccc;
        .left {
          img {
            width: px2rem(140);
            height: px2rem(120);
            margin-right: px2rem(5);
            vertical-align: bottom;
          }
        }
        .right {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .title {
            margin-top: px2rem(10);
            span {
              color: #7d1413;
              font-weight: bold;
            }
          }
          .remarks {
            font-size: px2rem(12);
            margin-top: px2rem(25);
            color: #999;
          }
        }
      }
    }
  }
  .loaded {
    line-height: px2rem(30);
    color: #666;
    text-align: center;
  }
}
</style>
