import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createPinia, PiniaVuePlugin } from "pinia";
import VueCompositionAPI from "@vue/composition-api";

Vue.use(PiniaVuePlugin);
const pinia = createPinia();
Vue.use(VueCompositionAPI);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  pinia,
  render: (h) => h(App),
}).$mount("#app");
