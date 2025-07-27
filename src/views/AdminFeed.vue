<template>
  <AdminNavbar />

  <div class="p-6 max-w-2xl mx-auto ">
    <h1 class="text-2xl font-bold mb-5">Pending listings</h1>
  
    <div class="grid  lg:grid-cols-3 gap-4">
      <ListingCard
        v-for="listing in listings"
        :key="listing.id"
        :listing="listing"
      ><div class="flex gap-4">
          <button 
            class="bg-green-600 text-white rounded-sm py-1 px-2 cursor-pointer" 
            @click="handleApprove(listing)"
          >
            Approve
          </button>
          <button 
            class="bg-red-600 text-white rounded-sm py-1 px-2 cursor-pointer"
            @click="handleReject(listing)"
          >
            Reject
          </button>
        </div></ListingCard>
    </div>
  </div>
</template>

<script setup>
import AdminNavbar from '@/components/AdminNavbar.vue'
import ListingCard from '@/components/ListingCard.vue'
import { useListingsStore } from '@/stores/listings'
import { onMounted } from 'vue'
import { auth } from '@/firebase/config'
import { useUserStore } from '@/stores/users'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

const listingsStore = useListingsStore()
const listings = listingsStore.listings
const userStore = useUserStore()

onMounted(async () => {
  const user = auth.currentUser
  if (user && !userStore.role) {
    await userStore.fetchUserInfo(user.uid)
  }
  await listingsStore.fetchListings()
})


async function handleApprove(listing) {
  try {
    const listingRef = doc(db, 'listings', listing.id)
    await updateDoc(listingRef, { approved: true })
    await listingsStore.fetchListings()
  } catch (err) {
    console.error('Error:', err)
  }
}

async function handleReject(listing) {
  try {
    const listingRef = doc(db, 'listings', listing.id)
    await deleteDoc(listingRef)
    await listingsStore.fetchListings()
  } catch (err) {
    console.error('Error:', err)
  }
}
</script>
