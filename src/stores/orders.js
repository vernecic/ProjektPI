import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, getDocs, query, where} from 'firebase/firestore'
import { db} from '@/firebase/config'

export const useOrdersStore = defineStore('orders', ()=>{
    const orders = ref([])
    const sellerConfirmedOrders = ref([])

    const fetchSellerOrders = async(seller) =>{
        try {
            const orderQ = query(collection(db, 'orders'),
        where('seller', '==', seller))
        
        const querySnap = await getDocs(orderQ)
        orders.value = querySnap.docs.map(doc =>({
            id: doc.id,
                ...doc.data()
        }))
    } catch (err){
        console.error('Greška pri dohvatu ordera: ', err)
        throw err
    }
}
       const fetchBuyerOrders = async(buyer) =>{
        try {
            const orderQ = query(collection(db, 'orders'),
        where('buyer', '==', buyer))
        
        const querySnap = await getDocs(orderQ)
        orders.value = querySnap.docs.map(doc =>({
                 id: doc.id,
                ...doc.data()
        }))
    } catch (err){
        console.error('Greška pri dohvatu ordera: ', err)
        throw err
    }
}   
    const fetchSellerApproved = async(buyer) => {
        try {
            const confirmedQ = query(
                collection(db, 'orders'),
                where('buyer', '==', buyer),
                where('sellerApproved', '==', true)
            )
            const confirmedSnap = await getDocs(confirmedQ)

            sellerConfirmedOrders.value = confirmedSnap.docs.map(doc =>({
                id: doc.id,
                ...doc.data()
            })
            )
        } catch (err){
            console.error('Greška kod dohvaćanja ordera: ', err)
        }
    }
    return {
        orders,
        fetchSellerOrders,
        fetchBuyerOrders,
        sellerConfirmedOrders,
        fetchSellerApproved
    }
})