import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Views/Home.vue'
import Login from '../Views/Login.vue'
import Register from '../Views/Register.vue'
import User from '../Views/User.vue'
import Logout from '../Views/Logout.vue'
import Help from '../Views/Help.vue'
import Doctors from '../Views/Doctors.vue'
import SingleDoctor from '../Views/SingleDoctor.vue'
import Tests from '../Views/Tests.vue'
import Team from '../Views/Team.vue';



const routes = [
  { path: '/',name:'home', component: Home},
  { path: '/login',name: 'login', component: Login },
  { path: '/register',name: 'register', component: Register },
  { path: '/users/profile', component: User },
  { path: '/logout', component: Logout },
  { path: '/help', component: Help },
  { path: '/doctors', component: Doctors },
  { path: '/doctors/:user', component: SingleDoctor },
  { path: '/tests', component: Tests },
  { path: '/team', component: Team },
  ]
  

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

router.beforeEach((to, from) => {
  localStorage.setItem('lastVisitTime', Date.now())
  window.scrollTo({
    top: 0,
    behavior: 'instant'
  });
});

  export default router