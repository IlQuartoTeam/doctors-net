import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Views/Home.vue'
import Login from '../Views/Login.vue'
import Register from '../Views/Register.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
  ]
  

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  export default router