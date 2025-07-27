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
import SellerOrders from "@/views/SellerOrders.vue";
import BuyerOrders from "@/views/BuyerOrders.vue";
import AdminDisputes from "@/views/AdminDisputes.vue";

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
    path: '/buyer-feed', // guard
    component: BuyerFeed
  },
   {
    path: '/seller-feed', // guard
    component: SellerFeed
  },
  {
    path: '/admin-feed', // guard
    component: AdminFeed
  },
  {
    path: '/create-listing', // guard
    component: CreateListing
  },
  {
    path: '/seller-orders',
    component: SellerOrders
  },
  {
    path: '/buyer-orders',
    component: BuyerOrders
  },
  {
    path: '/disputes',
    component: AdminDisputes
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//route guards
router.beforeEach(async (to, from, next) => {
  const allowedPages = ['/', '/login', '/register'];
  const needsAuth = !allowedPages.includes(to.path); // rute kojima treba auth

  if (!needsAuth) {
  
    return next();
  }

  const user = auth.currentUser;
  if (!user) {
 
    return next('/register');
  }

  const userStore = useUserStore();

  
  if (!userStore.role) {
    try {
      await userStore.fetchRole(user.uid);
    } catch (error) {
      console.error('Greška s dohvatom uloge', error);
      return next(false);
    }
  }
  if (to.path === '/buyer-feed' && userStore.role !== 'buyer') {
    
    return next(false);
    
  }
   if (to.path === '/create-listing' && userStore.role !== 'seller') {
    
    return next(false);
    
  }
  if (to.path === '/seller-feed' && userStore.role !== 'seller') {
    
    return next(false);
  }
  if (to.path === '/admin-feed' && userStore.role !== 'admin') {
    
    return next(false);
  }
  {
    if(to.path === '/disputes' && userStore.role !== 'admin'){
      return next(false)
    }
  }
  next();
});


export default router;
