import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import register from '../views/register.vue'
import forgetPassword from '../views/forgetPas.vue'
import layOut from '../views/layOut.vue'
import Dheader from '../views/Dheader.vue'
import indexPage from '../views/pages/homePage/indexPage.vue'
import searchResult from '../views/pages/homePage/searchResult.vue'
import dataManage from '../views/pages/dataManage/index.vue'
import dataEdit from '../views/pages/dataManage/dataEdit.vue'
import upData from '../views/pages/dataManage/updataFile.vue'
import userManage from '../views/pages/userManage/index.vue'
import dataStructure from '../views/pages/dataStructure/index.vue'
import personalCenter from '../views/pages/personalCenter/index.vue'






Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/forgetPas',
    name: 'forgetPas',
    component: forgetPassword,
  },
  {
    path: '/data-cen',
    name: 'header',
    component: Dheader,
    children: [
      {
        path: '/data-cen/dataManage/dataEdit',
        name: 'dataEdit',
        component: dataEdit,
      },
      {
        path: '/data-cen/user/personalCenter',
        name: 'personalCenter',
        component: personalCenter,
      },
      {
        path: '/data-cen/dataManage/updata',
        name: 'upData',
        component: upData,
      },
    ]
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
      {
        path: '/dataManage',
        name: 'dataManage',
        component: dataManage,
      },
      {
        path: '/userManage',
        name: 'userManage',
        component: userManage,
      },
      {
        path: '/dataStructure',
        name: 'dataStructure',
        component: dataStructure,
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
