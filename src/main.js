import Vue from 'vue';
import Buefy from 'buefy';
import Vuelidate from 'vuelidate';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome, faThLarge, faChartLine, faUsers, faEdit, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import App from './App';
import store from './store';
import 'buefy/dist/buefy.css';

library.add(faHome, faThLarge, faChartLine, faUsers, faEdit, faTimes);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// Register Vuelidate for validation
Vue.use(Vuelidate);

Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
