<template>
    <BuyerNavbar/>
    <div class="p-6 max-w-2xl mx-auto">
        <div class="mt-5">
            <h1>Balance</h1>
            <p>Current amount: {{ balance }}€</p>
            <div class="flex gap-4">
                <input type="number" v-model="amount" class="border rounded mt-2">
                <button class="rounded mt-2 bg-green-500 text-white cursor-pointer font-semibold py-1 px-2" @click="handleDeposit">Deposit</button>
                <div v-if="isError" class="text-font-500 text-lg">
                  {{ errorMessage }}

                </div>
            </div>
        </div>
        <div class="mt-5">
          <h1 class="font-bold text-2xl mb-5">Listings</h1>
          <div class="grid  lg:grid-cols-3 gap-4">
          <ListingCard
        v-for="listing in listings"
        :key="listing.id"
        :listing="listing"
          ><div class="flex gap-4">
          <button 
            class="bg-green-600 text-white rounded-sm py-1 px-2 cursor-pointer" 
            
         @click="handleBuy(listing)" >
            Buy
          </button>
       
        </div></ListingCard>
       </div>
        </div>

    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue'
import BuyerNavbar from '@/components/BuyerNavbar.vue'
import { useUserStore } from '@/stores/users'
import { collection, doc, updateDoc, addDoc, query, where, getDocs } from 'firebase/firestore'
import { auth, db } from '@/firebase/config'
import { storeToRefs } from 'pinia'
import ListingCard from '@/components/ListingCard.vue'
import { useListingsStore } from '@/stores/listings'


const listingsStore = useListingsStore()
const listings = listingsStore.listings


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

// funkcije
const handleDeposit = async () => {
  isError.value = false
  const depositAmount = parseFloat(amount.value)

  if(depositAmount <= 0 || !depositAmount){
    isError.value = true;
    errorMessage.value = 'Deposit must be larger than 0'
    return
  }
  
  const user = auth.currentUser
  if(!user) return

  try {
    const userRef = doc(db, 'users', user.uid)
    const updateBalance = (balance.value || 0 ) + depositAmount
  
    await updateDoc(userRef, {balance: updateBalance})

    userStore.balance = updateBalance

    amount.value = ''
  } catch (error){
    isError.value = true;
    errorMessage.value = error.message
  }


}

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