<template>
        <div class="border border-zinc-400 p-2 flex flex-col space-y-2 my-2 rounded-md shadow">
                    <div>
                        <span class="font-bold">{{order.seller}}</span> has confirmed the shipment of your order <span class="font-bold">{{order.title}}</span>!
                    </div>
                    <div>
                        Have you received the order?
                    </div>
                    <div>
                        <button class="bg-emerald-500 py-1 px-2 rounded-md  cursor-pointer shadow-md hover:-translate-y-0.5 transition duration-200 hover:shadow-lg" @click="$emit('confirm', order)">Confirm</button>
                    </div>
                </div>
</template>

<script setup>

const props = defineProps({
    order: Object
})

const emits = defineEmits(['confirm'])
</script>