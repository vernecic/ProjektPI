import { createWebHistory, createRouter } from "vue-router";

import RegisterPage from "@/views/RegisterPage.vue";

const routes = [
  {
    path: "/",
    component: RegisterPage,
  },
  {
    path: '/register',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
