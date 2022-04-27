import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/style/main.sass";

createApp(App).use(createPinia()).use(router).mount("#app");
