<template>
  <div class="border border-slate-400 rounded-lg shadow">
    <img
      :src="listing.imageUrl"
      alt="Listing Image"
      class="w-full h-48 object-fit rounded-t-lg mb-1"
    />
    <div class="p-2">

    <div class="flex justify-between">

   
    <h2 class="text-base text-zinc-800 font-semibold">{{ listing.title }}</h2>
  <p class="text-emerald-500 font-bold mb-2">€{{ listing.price }}</p> </div>
    <p class="text-slate-600 mb-2 text-sm">{{ listing.description }}</p>
    

  
     <slot></slot>
     </div>
        
   
  </div>
</template>

<script setup>

import { useListingsStore } from '@/stores/listings'

const listingsStore = useListingsStore()

const props = defineProps({
  listing: {
    type: Object,
    required: true
  }
})


</script>
