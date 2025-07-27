<template>
  <div class="border border-zinc-400 p-2 flex flex-col space-y-2 my-2 rounded-md shadow ">
                    <div>
                        You have made an order for <span class="font-bold">{{ order.title }}</span> by <span class="font-bold">{{ order.seller }}</span>. Price: <span class="font-bold">{{ order.price }}€  </span>                  </div>
                        <div class="text-slate-500">
                            Your dispute code: <span class="text-black font-semibold">{{order.disputeCode}}</span></div>
                         <div v-if="!isDisputed"><button class="bg-amber-300 py-1 px-2 rounded-md cursor-pointer shadow-md hover:-translate-y-0.5 transition duration-200 hover:shadow-lg" @click="emitDisputed">Dispute</button></div>
                         <div v-if="isDisputed">Order has been disputed</div>
                </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    order: Object
})

const isDisputed = ref(false)

const emits = defineEmits(['dispute'])

const emitDisputed = () =>{
    emits('dispute', props.order);
    isDisputed.value = true;
}
</script>