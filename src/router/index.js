import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import layOut from '../views/layOut.vue'
import indexPage from '../views/pages/homePage/indexPage.vue'
import searchResult from '../views/pages/homePage/searchResult.vue'



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
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    children: [
      {
        path: '/',
        name: 'indexPage',
        component: indexPage,
      },
      {
        path: '/result',
        name: 'searchResult',
        component: searchResult,
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
