<template>
    <AdminNavbar></AdminNavbar>
    <div class="p-6 max-w-2xl mx-auto ">
    <div v-for="order in orderStore.orders" :key="order.id" class="border border-slate-300 py-1 px-2 rounded shadow">
        <span class="font-semibold">{{order.seller}}</span> hasn't sent the package for <span class="font-semibold">{{ order.title }} </span>. <span class="font-semibold">{{ order.buyer }}</span> made a dispute.
        <div class="text-sm text-slate-500">
            Listing ID: {{ order.listingId }}
        </div>
        <div>
            <button class="rounded bg-blue-500 text-white py-1 px-2 cursor-pointer mt-2 hover:-translate-y-0.5 transition duration-200 shadow" @click="handleRefund(order)">Refund buyer</button>
        </div>
    </div>
    </div>
</template>

<script setup>
import AdminNavbar from '@/components/AdminNavbar.vue';
import { onMounted } from 'vue'
import { useOrdersStore } from '@/stores/orders';
import { auth, db } from '@/firebase/config'
import { useUserStore } from '@/stores/users';
import { query, collection, where, getDocs, updateDoc, doc} from 'firebase/firestore'

const orderStore = useOrdersStore()
const userStore = useUserStore()

onMounted(async()=>{
    const user = auth.currentUser
    if(user && !userStore.role){
        await userStore.fetchUserInfo(user.uid)
    }
    await orderStore.fetchDisputedOrders()
})

const handleRefund = async(order) =>{
    try {
        const price = order.price
        console.log(price)

        const adminQ = query(collection(db, 'users'),
        where('role', '==', 'admin'))
        
        const adminSnap = await getDocs(adminQ)
        const adminDoc = adminSnap.docs[0]
        const adminRef = doc(db, 'users', adminDoc.id)
        const admin = adminDoc.data()

        const buyerQ = query(collection(db, 'users'),
        where('username', '==', order.buyer))

        const buyerSnap = await getDocs(buyerQ)
        const buyerDoc = buyerSnap.docs[0]
        const buyerRef = doc(db, 'users', buyerDoc.id)
        const buyer = buyerDoc.data()

        const orderRef = doc(db, 'orders', order.id)
        

        await updateDoc(adminRef, {
            balance: (admin.balance || 0 ) - price
        })

        await updateDoc(buyerRef, {
            balance: (buyer.balance || 0 ) + price
        })

        await updateDoc(orderRef, {
            refunded: true,
            status: 'refunded'
        })
    } catch (err){
        console.error(err)
    }
   

}
</script>