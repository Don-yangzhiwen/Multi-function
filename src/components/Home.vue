<template>
  <div class="home">
    <header id='header'>{{msg}}</header>
    <div id="content">
      <ul>
        <li v-for='(item,index) in items' :key='index'>
          <router-link :to="item.linkTo">
            <img :src='"/../../static/img/"+item.src' :alt="item.text">
            <p>{{item.text}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '多功能应用',
      items: [
        {
          number: '01',
          src: 'PM2.5.png',
          text: 'PM2.5空气质量指数',
          linkTo: '/PM'
        },
        {
          number: '02',
          src: 'history.png',
          text: '历史上的今天',
          linkTo: '/TodayInHistory'
        },
        {
          number: '03',
          src: 'lottery.png',
          text: '彩票开奖查询',
          linkTo: '/Lottery'
        },
        {
          number: '04',
          src: 'IDNumber.png',
          text: '身份证查询',
          linkTo: '/IDNumber'
        },
        {
          number: '05',
          src: 'HotNews.jpg',
          text: '身份证查询',
          linkTo: '/HotNews'
        },
        {
          number: '06',
          src: 'weather.png',
          text: '爱飞天气插件',
          linkTo: '/weather'
        },
        {
          number: '07',
          src: 'threeNine.jpg',
          text: '三九手机网',
          linkTo: '/threeNine'
        },
        {
          number: '08',
          src: 'acrostic.jpg',
          text: '藏头诗生成',
          linkTo: '/Acrostic'
        },
        {
          number: '09',
          src: 'oilPrice.png',
          text: '今日油价',
          linkTo: '/OilPrice'
        },
        {
          number: '10',
          src: 'Health.png',
          text: '健康资讯',
          linkTo: '/Health'
        }
      ]
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import './../../static/hotcss/px2rem.scss';
#header {
  height: px2rem(38);
  line-height: px2rem(38);
  text-align: center;
  font-size: px2rem(20);
  background: linear-gradient(to right, #0066ff, #00c2de);
  color: white;
  letter-spacing: px2rem(6);
}
#content {
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      flex: 33.33%;
      text-align: center;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      overflow: hidden;
      a {
        display: block;
        img {
          width: px2rem(64);
          height: px2rem(64);
        }
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #333;
        }
      }
    }
    li:nth-of-type(3n) {
      border-right: none;
    }
  }
}
</style>
