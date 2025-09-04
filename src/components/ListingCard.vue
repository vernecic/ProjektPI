<template>
  <div class="rounded-lg shadow">
    <img
      :src="listing.imageUrl"
      alt="Listing Image"
      class="w-full h-48 object-center rounded-t-lg mb-1"
    />
    <div class="p-2">

    

   <div class="flex flex-col space-y-2 justify-between">
    <h2 class="text-base text-zinc-800 font-semibold">{{ listing.title }}</h2>
  <p class="text-emerald-500 font-bold ">€{{ listing.price }}</p> 
    <p class="text-slate-600 text-xs">{{ listing.description }}</p>
   
    

  
     <slot></slot> </div>
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
