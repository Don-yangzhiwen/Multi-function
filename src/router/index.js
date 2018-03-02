import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import PM from '@/components/PMkqzlzs'
import TodayInHistory from '@/components/TodayInHistory'
import Lottery from '@/components/Lottery'
import IDNumber from '@/components/IDNumber'
import HotNews from '@/components/HotNews'
import Weather from '@/components/Weather'
import ThreeNine from '@/components/ThreeNine'
import MobileDetails from '@/components/MobileDetails'
import Acrostic from '@/components/Acrostic'
import OilPrice from "@/components/Today'sOilPrice"
import Health from '@/components/Health'
import HealthDetail from '@/components/HealthDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/PM',
    name: 'PM',
    component: PM
  }, {
    path: '/TodayInHistory',
    name: 'TodayInHistory',
    component: TodayInHistory
  }, {
    path: '/Lottery',
    name: 'Lottery',
    component: Lottery
  }, {
    path: '/IDNumber',
    name: 'IDNumber',
    component: IDNumber
  }, {
    path: '/HotNews',
    name: 'HotNews',
    component: HotNews
  }, {
    path: '/Weather',
    name: 'Weather',
    component: Weather
  }, {
    path: '/threeNine',
    name: 'ThreeNine',
    component: ThreeNine
  }, {
    path: '/threeNine/details/:id',
    name: 'MobileDetails',
    component: MobileDetails
  }, {
    path: '/Acrostic',
    name: 'Acrostic',
    component: Acrostic
  }, {
    path: '/OilPrice',
    name: 'OilPrice',
    component: OilPrice
  }, {
    path: '/Health',
    name: 'Health',
    component: Health
  }, {
    path: '/Health/detail/:id',
    name: 'HealthDetail',
    component: HealthDetail
  }, {
    path: '*',
    directives: '/'
  }]
})
