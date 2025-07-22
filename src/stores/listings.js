import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/firebase/config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useUserStore } from './users'


export const useListingsStore = defineStore('listings', () =>{
    
    const listings = ref([])
    const userStore = useUserStore()
  
    
    const fetchListings = async()=>{
    let queryRef  

    if(userStore.role === 'admin'){
        queryRef = query(
            collection(db, 'listings'),
            where('approved', '==', false)
        )
    } else if (userStore.role === 'buyer'){
        queryRef = query(
            collection(db, 'listings'),
            where('approved', '==', true),
            where('buyer', '==', null)

        )
    }  else if(userStore.role === 'seller'){
        queryRef = query(
            collection(db, 'listings'),
            where('approved', '==', true),
            where('seller', '==', userStore.username)
        );
    }

    const querySnap = await getDocs(queryRef)
    listings.value = querySnap.docs.map(doc => ({id: doc.id, ...doc.data()}))

    }

    return {
        listings,
        fetchListings
    }
})