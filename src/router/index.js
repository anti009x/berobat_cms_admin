import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes';
import Cookies from 'js-cookie'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes,
  linkActiveClass: "active"
})

router.beforeEach((to, from, next) => {
  const token = Cookies.get("token")
  if (to.name !== 'LoginUser' && !token) next({ name: 'LoginUser' })
  if (to.name === "LoginUser" && token) next({ name: "Dashboard" });
  else{
    const middleware = to.meta.middleware;
    if(middleware){
      middleware(to, from, next)
    }else{
      next()
    }
  }
})


export default router
