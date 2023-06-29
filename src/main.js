import { createApp } from 'vue'
import './assets/styles/master.scss'
import App from './App.vue'
import router from "./router/router";
import VueCookies from 'vue-cookies';

createApp(App).use(router).use(VueCookies).mount('#app');