<template>
  <div class="foot">
    <ul>
      <li>
        <i class="iconfont icon-file"></i>
        <p>笑话</p>
      </li>
      <li>
        <i class="iconfont icon-tupian"></i>
        <p>图片</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {}
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
        color: #0066FF;
      }
    }
  }
}
</style>
