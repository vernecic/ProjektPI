<template>
    <div class=" p-8 flex justify-around items-center bg-slate-50">
        <h1 class="text-4xl font-semibold">Boovljak</h1>
        <div>
          Welcome, {{ username }}
        </div>
        <div class="text-xl ">
            <ul class="flex space-x-8">
              <router-link to="/buyer-feed">
                <li class="cursor-pointer">Home</li>
              </router-link>
              <router-link to="/buyer-orders">
                <li class="cursor-pointer">Orders</li>
              </router-link>
                
                <li class="cursor-pointer relative" >
                  <div role="button" @click="dropdown = !dropdown" class="flex space-x-4">
                    <p>Profile </p><img src="../assets/keydown.svg" alt="" :class="{'rotate-180' : dropdown}" class="transition duration-200">
                  </div>
                <div v-if="dropdown" class="absolute z-4 border py-2 px-2 rounded border-zinc-500 text-sm w-max flex flex-col space-y-4 bg-white">
                  <div class="hover:underline">

                  
                  <p role="button" @click="handleSignOut">Sign Out</p>
                  </div>
                 
                  <div class="flex flex-col space-y-1">
                     <p>Balance: <span class="font-semibold">{{ balance }}€</span></p>
                    <input type="number" v-model="amount" class="border rounded w-24">
                    <div>
                      <button class="py-1 px-2 bg-green-500 rounded cursor-pointer" @click="handleDeposit">Deposit</button>
                    </div>
                    <div v-if="isError">
                      {{ errorMessage }}
                    </div>
                  </div>

                </div></li>
           
            </ul>
        </div>

    </div>
</template>

<script setup>
import { auth, db } from '@/firebase/config'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/users'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { doc, updateDoc } from 'firebase/firestore'

const router = useRouter()
const userStore = useUserStore()
const dropdown = ref(false)

const amount = ref('')
const isError = ref(false)
const errorMessage = ref('')

const { username } = storeToRefs(userStore)
const { balance } = storeToRefs(userStore)

const handleSignOut = () =>{
  signOut(auth)
  userStore.clearUser()
  router.push('/login')
}

const handleDeposit = async() =>{
    const depositAmount = parseFloat(amount.value)

    if(depositAmount <= 0 || !depositAmount){
      isError.value = true;
      errorMessage.value = 'Deposit must be greater than 0'
      return
    }

    const user = auth.currentUser
    try {
      const userRef = doc(db, 'users', user.uid)
      const updatedBalance = (balance.value || 0) + depositAmount

      await updateDoc(userRef, {balance: updatedBalance})

      userStore.balance = updatedBalance

      amount.value = ''
    } catch (err){
      isError.value = true;
      errorMessage.value = err.message
    }

}

onMounted(async ()=>{
  const user = auth.currentUser
  if(user && !username.value){
    await userStore.fetchUserInfo(user.uid)
  }
})

</script>