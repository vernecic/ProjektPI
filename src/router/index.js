import { createWebHistory, createRouter } from "vue-router";

import RegisterPage from "@/views/RegisterPage.vue";
import LoginPage from "@/views/LoginPage.vue"
import BuyerFeed from "@/views/BuyerFeed.vue"

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
    path: '/buyer-feed',
    component: BuyerFeed
  },
   {
    path: '/seller-feed',
    component: SellerFeed
  },
  {
    path: '/admin-feed',
    component: AdminFeed
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
