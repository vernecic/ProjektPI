<template>
    <SellerNavbar>
         
    </SellerNavbar>
     <div class="p-6 max-w-2xl mx-auto ">
          <div>
            <h1 class="text-2xl font-semibold">Orders</h1>
          </div> 
          <div class="mt-5">
                <div v-for="order in ordersStore.orders" :key="order.orderId" class="border p-2 flex flex-col space-y-2 my-2 rounded-md">
                    <div><span class="font-bold">{{ order.buyer }}</span> made an order for <span class="font-bold">{{ order.title }}</span> - <span class="font-bold">{{ order.price }}€</span></div>
                    <div class="text-xs">ID: {{ order.listingId }}</div>
                    <div class="">
                        <p class="text-sm">
                            Confirm shipment?
                        </p><button class="bg-green-600 py-1 px-2 rounded text-white font-semibold cursor-pointer " @click="handleConfirm(order)">Confirm </button></div>
                </div>
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
            sellerApproved: true
        
        
        })
        console.log('Slanje potvrđeno')
    } catch (err){
        console.error('Greška kod potvđivanja:', err)
    }
}
</script>
