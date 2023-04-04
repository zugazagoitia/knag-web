import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import VerifyEmailView from "../views/VerifyEmailView.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "home", component: HomeView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/verifyEmail/:token", name: "verifyEmail", component: VerifyEmailView },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
