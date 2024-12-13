import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetail from '../views/MovieDetail.vue'
import Register from '../views/Register.vue'
import ActivateEmail from '../views/ActivateEmail.vue'
import Reset_password from '../views/ResetPassword.vue'
import PasswordReset from '../views/PasswordReset.vue'
import ChangePassword from '../views/ChangePassword.vue'
import Login from '../views/Login.vue'
import Personal from '../views/Personal.vue'
import store from '@/store'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/reset_password',
    name: 'Reset_password',
    component: Reset_password
  },
  {
    path: '/password_reset/:uid/:token',
    name: 'PasswordReset',
    component: PasswordReset
  },
  {
    path: '/activate/:uid/:token',
    name: 'ActivateEmail',
    component: ActivateEmail
  },
  {
    path: '/change_password',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/Personal',
    name: 'Personal',
    component: Personal,
    meta: {
      requireLogin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const token = localStorage.getItem('token')
if(token){
  store.commit('setLoginStatus',true)
}
//路由守卫
router.beforeEach((to, from, next) => {
  //判断在login 和 register 页面是否已经登录，已经登录跳转到首页
  if(store.state.isLogin && (to.name === 'Login' || to.name === 'Register')){
    next({name:'home'})
  }
  else if (to.matched.some(record => record.meta.requireLogin) && !store.state.isLogin) {
    next({ name:'Login', query: {jump: to.path} });
  } else {
    next()
  }
})
export default router
