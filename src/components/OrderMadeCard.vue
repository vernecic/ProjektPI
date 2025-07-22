<template>
  <div class="border p-2 flex flex-col space-y-2 my-2 rounded-md">
                    <div>
                        You have made an order for <span class="font-bold">{{ order.title }}</span> by <span class="font-bold">{{ order.seller }}</span>. Price: <span class="font-bold">{{ order.price }}€  </span>                  </div>
                       
                </div>
</template>

<script setup>

const props = defineProps({
    order: Object
})
</script>