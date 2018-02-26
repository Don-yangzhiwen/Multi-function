<template>
  <div class="searchbox">
    <div class="search">
      <input type="text" id="search-input" :placeholder="placeholder" ref="search_input">
      <button id="btn-search" @click="search">搜索</button>
    </div>
    <p class="remarks">{{remarks}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: ['placeholder', 'remarks'],
  methods: {
    search() {
      this.$emit('child-value', this.$refs.search_input.value.trim())
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../static/hotcss/px2rem.scss';
.searchbox {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 px2rem(2) px2rem(5) #666;
  padding: px2rem(10);
  box-sizing: border-box;
  .remarks {
    margin-top: px2rem(4);
    font-size: px2rem(12);
    color: #666;
  }
  .search {
    width: 100%;
    display: flex;
    justify-content: space-between;
    #search-input {
      width: 100%;
      height: px2rem(35);
      line-height: px2rem(35);
      font-size: px2rem(14);
      border: px2rem(0.5) solid #999;
      padding: 0 px2rem(10);
      outline: none;
      color: #333;
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
}
</style>
