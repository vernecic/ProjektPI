<template>
    <BuyerNavbar></BuyerNavbar>
      <div class="p-6 max-w-2xl mx-auto ">
          <div>
            <h1 class="text-2xl font-semibold">Orders</h1>
          </div> 
          <div class="mt-5">
                <OrderMadeCard v-for="order in ordersStore.orders" :key="order.id" :order="order" @dispute="handleDispute"></OrderMadeCard>
                <SellerConfirmedOrder v-for="order in ordersStore.sellerConfirmedOrders" :key="order.id" :order="order" @confirm="handleConfirm"></SellerConfirmedOrder>
          </div>
            
          </div>
</template>

<script setup>
import BuyerNavbar from '@/components/BuyerNavbar.vue';
import { useUserStore } from '@/stores/users'
import { useOrdersStore } from '@/stores/orders';
import { onMounted } from 'vue'
import { collection, doc, updateDoc, getDocs, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { query, where } from "firebase/firestore";

import OrderMadeCard from '@/components/OrderMadeCard.vue';
import SellerConfirmedOrder from '@/components/SellerConfirmedOrder.vue';

const userStore = useUserStore()
const ordersStore = useOrdersStore()

onMounted(async() => {
    if(userStore.username){
        await ordersStore.fetchBuyerOrders(userStore.username)
        await ordersStore.fetchSellerApproved(userStore.username)
    }
})

// funkcije
const handleConfirm = async (order) =>{
    try {
        const orderRef = doc(db, 'orders', order.id)
        await updateDoc(orderRef, {
            buyerApproved: true,
            status: 'completed'
        })
        const adminQ = query(collection(db, 'users'),
    where('role', '==', 'admin'))
        const adminSnap = await getDocs(adminQ)

        const adminDoc = adminSnap.docs[0]
        const adminRef = doc(db, 'users', adminDoc.id)
        const adminData = adminDoc.data()

        const sellerQ = query(collection(db, 'users'),
    where('username', '==', order.seller))
        
        const sellerSnap = await getDocs(sellerQ)

        const sellerDoc = sellerSnap.docs[0]
        const sellerRef = doc(db, 'users', sellerDoc.id)
        const sellerData = sellerDoc.data()

        const price = order.price
        await updateDoc(adminRef,{
            balance: (adminData.balance || 0) - price
        })

        await updateDoc(sellerRef, {
            balance: (sellerData.balance || 0 ) + price
        }) 
        
        
        
    } catch (err){
        console.log('Error kod confirmanja', err)
    }
}

const handleDispute = async (order) =>{
    try {
        const orderRef = doc(db, 'orders', order.id)
        const orderSnap = await getDoc(orderRef)
        console.log(order.id)

        if (orderSnap.exists()) {
        await updateDoc(orderRef, {
        status: 'disputed'
        })
}
        
    } catch (err){
        console.log('Error while disputing', err)
    }

}
</script>