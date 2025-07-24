<template>
    <SellerNavbar>
         
    </SellerNavbar>
     <div class="p-6 max-w-2xl mx-auto ">
          <div>
            <h1 class="text-2xl font-semibold">Orders</h1>
          </div> 
          <div class="mt-5">
            <OrderReceivedCard v-for="order in ordersStore.orders" :key="order.orderId" :order="order" @confirm="handleConfirm"></OrderReceivedCard>
          </div>
            
          </div>
</template>
<script setup>
import SellerNavbar from '@/components/SellerNavbar.vue'
import { useOrdersStore } from '@/stores/orders';
import { useUserStore } from '@/stores/users';
import { onMounted } from 'vue'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import OrderReceivedCard from '@/components/OrderReceivedCard.vue';



const userStore = useUserStore()
const ordersStore = useOrdersStore()

onMounted(async()=>{
    if(userStore.username){
        await ordersStore.fetchSellerOrders(userStore.username)
    }
})

// funkcije


const handleConfirm = async (order) =>{
    try {
        const orderRef = doc(db, 'orders', order.id)
        await updateDoc(orderRef, {
            sellerApproved: true,
            status: 'sent'
        
        
        })
        console.log('Slanje potvrđeno')
    } catch (err){
        console.error('Greška kod potvđivanja:', err)
    }
}
</script>
