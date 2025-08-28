<template>
    <BuyerNavbar/>
    <div class="p-6 max-w-2xl mx-auto">
        <div class="mt-5">
          <h1 class="font-bold text-2xl mb-5">Listings</h1>
          <div class="mb-2 flex gap-2 items-center">
            <h2>Filter</h2> 
            <div class="flex flex-col relative">

            <div @click="openFilterOptions = !openFilterOptions" class="cursor-pointer border border-slate-400 py-1 px-2 rounded flex gap-1"> 
              <span>{{ curFilter }}</span><img src="../assets/keydown.svg" alt="" class="transition duration-200" :class="openFilterOptions ? 'rotate-180' : 'rotate-0'">
               </div>
               <div v-if="openFilterOptions" class="flex flex-col absolute border border-slate-400 py-1 px-2 rounded top-full bg-white mt-1">
                <div v-for="filter in filterOptions" class="cursor-pointer hover:bg-slate-100 text-sm" @click="chooseFilter(filter)">{{ filter }}</div>
              </div></div>
              
           
          </div>
          <div class="grid  lg:grid-cols-3 gap-4">
          <ListingCard
        v-for="listing in filteredListings"
        :key="listing.id"
        :listing="listing"
          ><div class="flex gap-4">
          <button 
            class="bg-green-500 text-white rounded-sm py-1 px-2 cursor-pointer hover:bg-green-600 transition duration-200 shadow" 
            
         @click="handleBuy(listing)" >
            Buy
          </button>
       
        </div></ListingCard>
       </div>
        </div>

    </div>

</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import BuyerNavbar from '@/components/BuyerNavbar.vue'
import { useUserStore } from '@/stores/users'
import { collection, doc, updateDoc, addDoc, query, where, getDocs } from 'firebase/firestore'
import { auth, db } from '@/firebase/config'
import { storeToRefs } from 'pinia'
import ListingCard from '@/components/ListingCard.vue'
import { useListingsStore } from '@/stores/listings'


const listingsStore = useListingsStore()
const listings = listingsStore.listings

const curFilter = ref('Default')
const filterOptions = ['Default', 'Price Up', 'Price Down']
const openFilterOptions = ref(false)

const filteredListings = computed(() =>{
  if(curFilter.value === 'Price Up'){
    return [...listings].sort((a,b) => a.price - b.price)
  } else if (curFilter.value === 'Price Down'){
    return [...listings].sort((a,b) => b.price - a.price)
  }
  return listings
})

const chooseFilter = (filter) =>{
  curFilter.value = filter
  openFilterOptions.value = false

} 



onMounted(async () => {
  const user = auth.currentUser
  if (user && !userStore.role) {
    await userStore.fetchUserInfo(user.uid)
  }
  await listingsStore.fetchListings()
})

const userStore = useUserStore()
const { balance } = storeToRefs(userStore)

const amount = ref('')
const isError = ref(false)
const errorMessage = ref('')

onMounted(async ()=>{
  const user = auth.currentUser
  if(user){
    await userStore.fetchUserInfo(user.uid)
  }
})


const handleBuy = async (listing) => {

  const user = auth.currentUser

  if(balance.value < listing.price){
    isError.value = true;
    errorMessage.value = 'You have insufficient funds! Deposit more.'
    return
  }

  try {
    const disputeCode = Math.floor(Math.random() * 90000) + 10000;
    console.log(disputeCode)

    await addDoc(collection(db, 'orders'), {
      seller: listing.seller,
      buyer: userStore.username,
      price: listing.price,
      title: listing.title,
      description: listing.description,
      listingId: listing.id,
      disputeCode: disputeCode,
      sellerApproved: false,
      buyerApproved: false,
      status: 'pending',
      refunded: false
    })
    const buyerRef = doc(db, 'users', user.uid)
    await updateDoc(buyerRef, {
      balance: balance.value - listing.price
    })
    userStore.balance = userStore.balance - listing.price
  
    // update listinga
    const listingRef = doc(db, 'listings', listing.id)
    await updateDoc(listingRef, {
    buyer: userStore.username
   })

    // dodavanje novaca adminu
    const adminQ = query(collection(db, 'users'), where('role', '==', 'admin'))
    const adminSnap = await getDocs(adminQ)
   
    const adminDoc = adminSnap.docs[0]
    const adminRef = doc(db, 'users', adminDoc.id)
    const adminBalance = adminDoc.data().balance 

    await updateDoc(adminRef, {
    balance: adminBalance + listing.price })
  

  } catch(err){
    isError.value = true;
    errorMessage.value = err.message
  }

}
</script>