import Vue from 'vue'
import App from './App'
import api from './api/index.js'
import store from './store/index.js'  
Vue.prototype.$store = store  
// 底部菜单
import home from './pages/home/index.vue'
Vue.component('home',home)

import family from './pages/family/index.vue'
Vue.component('family',family)

import circles from './pages/circles/index.vue'
Vue.component('circles',circles)

import shop from './pages/shop/index.vue'
Vue.component('shop',shop)

import mine from './pages/mine/index.vue'
Vue.component('mine',mine)

import cuCustom from './colorui/components/cu-custom.vue'
import LbPicker from '@/components/lb-picker'
Vue.component("lb-picker", LbPicker)
Vue.component('cu-custom',cuCustom)
Vue.config.productionTip = false
Vue.prototype.$api = api
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

 



