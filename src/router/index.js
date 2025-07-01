import { createWebHistory, createRouter } from "vue-router";
import { auth } from '@/firebase/config'
import { useUserStore } from "@/stores/users";
import { onAuthStateChanged } from "firebase/auth"

import RegisterPage from "@/views/RegisterPage.vue";
import LoginPage from "@/views/LoginPage.vue"
import BuyerFeed from "@/views/BuyerFeed.vue"
import SellerFeed from "@/views/SellerFeed.vue";
import AdminFeed from "@/views/AdminFeed.vue";
import CreateListing from "@/views/CreateListing.vue"

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
  },
  {
    path: '/create-listing',
    component: CreateListing
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
