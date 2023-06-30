import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Views/Home.vue'
import Login from '../Views/Login.vue'
import Register from '../Views/Register.vue'
import User from '../Views/User.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/users/profile', component: User}
  ]
  

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  export default router