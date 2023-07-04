import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
  API_URL: "/api/",
  isAuthenticated: false,
  doctor: null,
  user: null,
  newUser: true,
  userDoctor: null,
  citySearched: null,
  doctorsQueried: null,
  dashboard:{
    sidebarOpen: false,
    heroOpen: true,
    messaggesOpen: false,
    reviewsOpen: false,
    settingsOpen: false,
    chartsOpen: true
  }
});
