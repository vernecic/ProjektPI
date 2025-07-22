<template>
        <div class="border p-2 flex flex-col space-y-2 my-2 rounded-md">
                    <div>
                        <span class="font-bold">{{order.seller}}</span> has confirmed the shipment of your order <span class="font-bold">{{order.title}}</span>!
                    </div>
                    <div>
                        Have you received the order?
                    </div>
                    <div>
                        <button class="bg-green-600 py-1 px-2 rounded-md text-white cursor-pointer" @click="$emit('confirm', order)">Confirm</button>
                    </div>
                </div>
</template>

<script setup>

const props = defineProps({
    order: Object
})

const emits = defineEmits(['confirm'])
</script>