import { createApp } from 'vue'
import './axios'
import './assets/styles/master.scss'
import "vue-toastification/dist/index.css";
import App from './App.vue'
import router from "./router/router";
import VueCookies from 'vue-cookies';
import Toast from "vue-toastification";

const options = {
    // You can set your default options here
};


createApp(App).use(router).use(VueCookies).use(Toast, options).mount('#app');