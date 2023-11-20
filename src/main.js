import { createApp } from 'vue'
import { createPinia } from 'pinia'
import  router from './router'
import App from './App.vue'
import './components/app.js'
import './components/style.css' 
import store from './stores'
import iziToast from 'izitoast'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import {
    abilitiesPlugin
} from "@casl/vue";
import ability from "./stores/services/abilities"

const app = createApp(App)
app.use(iziToast).use(createPinia()).use(router).use(store).use(VueSweetalert2).use(VCalendar, {}).use(abilitiesPlugin, ability, {
    useGlobalProperties:true
}).mount('#app')

