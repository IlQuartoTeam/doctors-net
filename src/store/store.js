import { reactive } from "vue";
import { useToast } from "vue-toastification"

export const store = reactive({
  API_URL: "/api/",
  isAuthenticated: false,
  doctor: null,
  user: null,
  newUser: true,
  userDoctor: null,
  singleDoctor: null,
  contactForm: false,
  reviewOrdered: null,
  addReview: false,
  citySearched: 'Roma',
  doctorsQueried: null,
  dashboard:{
    sidebarOpen: false,
    heroOpen: true,
    messaggesOpen: false,
    reviewsOpen: false,
    settingsOpen: false,
    generalInfo: false,
    experiences: false,
    performances: false,
    changePassword: false,
    chartsOpen: true,
    sponsor: false,
  },
  specialization: '',
  specializationsSet: [],
  toast: useToast(),
});
