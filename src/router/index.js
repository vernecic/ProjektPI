import { createWebHistory, createRouter } from "vue-router";

import RegisterPage from "@/views/RegisterPage.vue";
import LoginPage from "@/views/LoginPage.vue"
import HomePage from "@/views/HomePage.vue"

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
  },
  {
    path: '/feed',
    component: HomePage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
