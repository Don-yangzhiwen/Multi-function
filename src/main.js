// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './../static/hotcss/hotcss'
import './common/css/my-mint.scss'
import P from './common/js/public'
import 'swiper/dist/css/swiper.css'
import './common/css/over.scss'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import {
  InfiniteScroll,
  Spinner,
  Loadmore
} from 'mint-ui';

Vue.use(InfiniteScroll);
Vue.component(Spinner.name, Spinner);
Vue.component(Loadmore.name, Loadmore);
Vue.use(VueAwesomeSwiper)
Vue.prototype.P = P
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
