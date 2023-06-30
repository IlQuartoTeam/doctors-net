import { reactive } from "vue";

export const store = reactive({
   API_URL: '/api/',
   isAuthenticated: false,
   doctor: null,
   user: null,
   userDoctor: null
 
});