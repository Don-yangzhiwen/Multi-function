<template>
  <div class="public">
    {{msg}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: 'public'
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../static/hotcss/px2rem.scss';
.public {
}
</style>
