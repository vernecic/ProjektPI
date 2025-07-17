<template>
    <SellerNavbar/>
        <div class="flex items-center justify-center flex-col">
        <div class="mt-5">
            <router-link to="/create-listing">
            <button class="rounded bg-blue-500 text-white py-1 px-2 text-xl cursor-pointer">Add listing</button></router-link>
        </div>
            <div class="mt-5">
          <h1 class="font-bold text-2xl mb-5">Listings</h1>
          <div class="grid grid-cols-3 gap-4">
          <ListingCard
        v-for="listing in listings"
        :key="listing.id"
        :listing="listing"
          ><div class="flex gap-4">
          <button 
            class="bg-red-600 text-white rounded-sm py-1 px-2 cursor-pointer" 
            
          >
            Remove
          </button>
       
        </div></ListingCard>
       </div>
        </div>

    </div>
</template>

<script setup>
import SellerNavbar from '@/components/SellerNavbar.vue'
import ListingCard from '@/components/ListingCard.vue'
import { useListingsStore } from '@/stores/listings'
import { onMounted } from 'vue'
import { auth } from '@/firebase/config'
import { useUserStore } from '@/stores/users'


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
</script>