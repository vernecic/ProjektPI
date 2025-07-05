<template>
    <BuyerNavbar/>
    <div class="flex items-center justify-center">
        <div class="mt-5">
            <h1>Balance</h1>
            <p>Current amount: {{ balance }}€</p>
            <div class="flex gap-4">
                <input type="number" v-model="amount" class="border rounded mt-2">
                <button class="rounded mt-2 bg-green-500 text-white cursor-pointer font-semibold py-1 px-2" @click="handleDeposit">Deposit</button>
                <div v-if="isError" class="text-font-500 text-lg">
                  {{ errorMessage }}

                </div>
            </div>
        </div>

    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue'
import BuyerNavbar from '@/components/BuyerNavbar.vue'
import { useUserStore } from '@/stores/users'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase/config'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { balance } = storeToRefs(userStore)

const amount = ref('')
const isError = ref(false)
const errorMessage = ref('')

onMounted(async ()=>{
  const user = auth.currentUser
  if(user){
    await userStore.fetchUserInfo(user.uid)
  }
})

// funkcije
const handleDeposit = async () =>{
  isError.value = false
  const depositAmount = parseFloat(amount.value)

  if(depositAmount <= 0 || !depositAmount){
    isError.value = true;
    errorMessage.value = 'Deposit must be larger than 0'
    return
  }
  
  const user = auth.currentUser
  if(!user) return

  try {
    const userRef = doc(db, 'users', user.uid)
    const updateBalance = (balance.value || 0 ) + depositAmount
  
    await updateDoc(userRef, {balance: updateBalance})

    userStore.balance = updateBalance

    amount.value = ''
  } catch (error){
    isError.value = true;
    errorMessage.value = error.message
  }


}

</script>