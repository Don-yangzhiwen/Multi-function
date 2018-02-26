<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './../static/hotcss/px2rem.scss';
@import './common/css/reset.scss';
@import './common/iconfont/iconfont.css';
@import './common/LCalendar/css/LCalendar.css';
.active {
  background-color: #f5f5f5;
}
</style>
