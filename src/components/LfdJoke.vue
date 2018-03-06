<template>
  <div class="lfdJoke">
    {{msg}}
    <Foot></Foot>
  </div>
</template>
<script>
import Foot from './JokeFoot'
export default {
  data() {
    return {
      msg: 'lfdJoke'
    }
  },
  components: {
    Foot
  }
}
</script>
<style lang="scss" scoped>
@import './../../static/hotcss/px2rem.scss';
.lfdJoke {
}
</style>
