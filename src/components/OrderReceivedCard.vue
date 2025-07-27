<template>
          <div class="border border-zinc-400 p-2 flex flex-col space-y-2 my-2 rounded-md shadow-md">
                    <div><span class="font-bold">{{ order.buyer }}</span> made an order for <span class="font-bold">{{ order.title }}</span> - <span class="font-bold">{{ order.price }}€</span></div>
                    <div class="text-xs">ID: {{ order.listingId }}</div>
                    <div class="">
                        <p class="text-sm">
                            Confirm shipment?
                        </p><button class="bg-emerald-500 text-white py-1 px-2 rounded  font-semibold cursor-pointer shadow-md hover:-translate-y-0.5 transition duration-200 hover:shadow-lg" @click="$emit('confirm', order)">Confirm </button></div>
                </div>
</template>

<script setup>

const props = defineProps({
    order: Object
})

</script>