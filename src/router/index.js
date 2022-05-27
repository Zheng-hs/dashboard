import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import First from '../components/First.vue'
import Second from '../components/Second.vue'
import Third from '../components/Third.vue'
import Agv from '../components/Agv.vue'
import Agvc from '../components/Agvc.vue'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/third',
    component: Third
  },
  {
    path: '/agv',
    component: Agv
  },
  {
    path: '/agvc',
    component: Agvc
  },
  {
    path: '/second',
    component: Second
  },
  {
    path: '/home',
    component: Home,
    redirect: './first',
    children: [
      { path: '/first', component: First },
      
      
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
