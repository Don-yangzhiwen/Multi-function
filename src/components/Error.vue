<template>
  <div class="error" v-if="isTrue">
    <p>{{errText}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: ['isTrue', 'errText'],
  mounted() {},
  watch: {
    isTrue(newVal, oldVal) {},
    errText(newVal, oldVal) {}
  }
}
</script>
<style lang="scss" scoped>
@import './../../static/hotcss/px2rem.scss';
.error {
  padding: px2rem(150) 0;
  text-align: center;
  p {
    font-size: px2rem(22);
    font-weight: bold;
  }
}
</style>
