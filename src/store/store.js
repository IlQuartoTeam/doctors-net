import { reactive } from "vue";

export const store = reactive({
   API_URL: '/api/',
   isAuthenticated: false,
   doctor: null,
   user: null,
   userDoctor: null,
   privacyIndex : [
      "Informazioni relative alla Privacy del sito",
      "Titolare del trattamento",
      "Luogo trattamento dati",
      "Base giuridica del trattamento",
      "Cookies",
      "Tipologia di trattamento dati",
      "Tipologia di dati acquisti",
      "Dati forniti dall'utente",
      "Finalità del trattamento dati",
      "Conservazione Dati",
      "Pagamenti",
      "Moduli di contatto",
      "Diritti dell'utente"
    ],
});