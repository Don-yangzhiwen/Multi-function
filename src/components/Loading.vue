<template>
  <div class="loading" v-if="isTrue">
    <mt-spinner type="fading-circle" color="#26a2ff"></mt-spinner>
    <span>加载中</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: 'loading'
    }
  },
  props: ['isTrue'],
  //  监听数据的变化
  watch: {
    isTrue(newVal, oldVal) {
      this.isTrue = newVal
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../static/hotcss/px2rem.scss';
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: px2rem(6) 0;
  span {
    margin-right: px2rem(8);
  }
}
</style>
