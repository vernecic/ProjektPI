<template>
  <div class="border rounded-lg p-4 shadow">
    <img
      :src="listing.imageUrl"
      alt="Listing Image"
      class="w-full h-48 object-fit rounded mb-3"
    />
    <h2 class="text-xl text-zinc-800 font-semibold">{{ listing.title }}</h2>
    <p class="text-slate-600 mb-2">{{ listing.description }}</p>
    <p class="text-green-700 font-bold mb-2">€{{ listing.price }}</p>

  
     <slot></slot>
        
   
  </div>
</template>

<script setup>
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { useListingsStore } from '@/stores/listings'

const listingsStore = useListingsStore()

const props = defineProps({
  listing: {
    type: Object,
    required: true
  }
})


</script>
