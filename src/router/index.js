import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import layOut from '../views/layOut.vue'
import indexPage from '../views/pages/indexPage.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login,
    // childen
  },
  {
    path: '/',
    name: 'layOut',
    component: layOut,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    children: [
      {
        path: '/',
        name: 'indexPage',
        component: indexPage,
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
