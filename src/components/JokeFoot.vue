<template>
  <div class="foot">
    <ul>
      <li v-for='(val,index) in list' :key='index' :class='num==index?"on": ""' @click="getNum(index)">
        <i :class="'iconfont '+val.i"></i>
        <p>{{val.p}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: 0,
      list: [
        {
          i: 'icon-file',
          p: '笑话'
        },
        {
          i: 'icon-tupian',
          p: '图片'
        }
      ]
    }
  },
  methods: {
    getNum(index) {
      this.num = index
      this.$emit('getIndex', index)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../static/hotcss/px2rem.scss';
.foot {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #fff;
  box-shadow: px2rem(-1) 0 px2rem(2) #ccc;
  ul {
    height: px2rem(55);
    display: flex;
    align-items: center;
    li {
      flex: 1;
      text-align: center;
      i {
        font-size: px2rem(22);
      }
    }
    .on {
      color: #0066ff;
    }
  }
}
</style>
