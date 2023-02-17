import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import * as echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import 'lib-flexible'
import './util/rem'
import "./util/shuffling";
import vueMiniPlayer from 'vue-mini-player'
import 'vue-mini-player/lib/vue-mini-player.css'
import fullscreen from 'vue-fullscreen'


const BASE_URL = "";
// 创建 axios 实例
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 20000 // 请求超时时间
});
// axios.defaults.baseURL = 'http://127.0.0.1:9000/'
// 在request拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 在response拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  return config
})


Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(vueMiniPlayer)
Vue.use(fullscreen)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
