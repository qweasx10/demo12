import Vue from 'vue'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import MyPage from '@/components/MyPage'
import VueRouter from 'vue-router'
import store from "../store"
const beforeAuth = isAuth => (from, to, next) => {
  const isAuthenticated = store.getters["isAuthenticated"]
  if((isAuthenticated && isAuth)||(!isAuthenticated && !isAuth)){
    return next()
  }else{
    next("/login")
  }
}

Vue.use(VueRouter)


  
const routes= [
    
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: beforeAuth(false),
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      beforeEnter: beforeAuth(false),
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: MyPage,
      beforeEnter: beforeAuth(true),
    }
  ]
  const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  })
  
  export default router
