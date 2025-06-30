import { createWebHistory, createRouter } from "vue-router";

import RegisterPage from "@/views/RegisterPage.vue";
import LoginPage from "@/views/LoginPage.vue"

const routes = [
  {
    path: "/",
    component: RegisterPage,
  },
  {
    path: '/register',
    redirect: '/'
  },
  {
    path: '/login',
    component: LoginPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
