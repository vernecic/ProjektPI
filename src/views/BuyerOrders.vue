<template>
    <BuyerNavbar></BuyerNavbar>
      <div class="p-6 max-w-2xl mx-auto ">
          <div>
            <h1 class="text-2xl font-semibold">Orders</h1>
          </div> 
          <div class="mt-5">
                <div v-for="order in ordersStore.orders" :key="order.orderId" class="border p-2 flex flex-col space-y-2 my-2 rounded-md">
                    <div>
                        You have made an order for <span class="font-bold">{{ order.title }}</span> by <span class="font-bold">{{ order.seller }}</span>. Price: <span class="font-bold">{{ order.price }}€  </span>                  </div>
                       
                </div>
                <div v-for="order in ordersStore.sellerConfirmedOrders" :key="order.orderId" class="border p-2 flex flex-col space-y-2 my-2 rounded-md">
                    <div>
                        Seller has confirmed your order {{order.title}} !
                    </div>
                    <div>
                        Have you received the order?
                    </div>
                    <div>
                        <button class="bg-green-600 py-1 px-2 rounded-md text-white cursor-pointer" @click="handleConfirm(order)">Confirm</button>
                    </div>
                </div>
          </div>
            
          </div>
</template>

<script setup>
import BuyerNavbar from '@/components/BuyerNavbar.vue';
import { useUserStore } from '@/stores/users'
import { useOrdersStore } from '@/stores/orders';
import { onMounted } from 'vue'

const userStore = useUserStore()
const ordersStore = useOrdersStore()

onMounted(async() => {
    if(userStore.username){
        await ordersStore.fetchBuyerOrders(userStore.username)
        await ordersStore.fetchSellerApproved(userStore.username)
    }
})

// funkcije

</script>