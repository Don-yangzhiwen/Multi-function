<template>
  <div class="header">
    {{title}}
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: ['title']
}
</script>
<style lang="scss" scoped>
@import './../../static/hotcss/px2rem.scss';
.header {
  width: 100%;
  height: px2rem(38);
  line-height: px2rem(38);
  text-align: center;
  font-size: px2rem(18);
  background: linear-gradient(to right, #0066ff, #00c2de);
  color: white;
  letter-spacing: px2rem(3);
}
</style>
