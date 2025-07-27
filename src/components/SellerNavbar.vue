<template>
    <div class=" p-8 flex justify-around items-center bg-slate-50">
        <h1 class="text-4xl font-semibold">Boovljak</h1>
        <div>
          Welcome, {{ username }}
        </div>
        <div class="text-xl ">
            <ul class="flex space-x-8">
              <router-link to="/seller-feed">
                 <li class="cursor-pointer">Home</li>
              </router-link>
               
                <router-link to="/seller-orders">
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
                 
                  <div>
                     <p>Balance:
                     <span class="font-semibold">{{ balance }}€</span></p>
                   
                  </div>

                </div></li>
           
            </ul>
        </div>

    </div>
</template>

<script setup>
import { auth } from '@/firebase/config'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/users'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const router = useRouter()
const userStore = useUserStore()
const dropdown = ref(false)
const { username } = storeToRefs(userStore)
const { balance } = storeToRefs(userStore)

const handleSignOut = () =>{
  signOut(auth)
  userStore.clearUser()
  router.push('/login')
}

onMounted(async ()=>{
  const user = auth.currentUser
  if(user && !username.value){
    await userStore.fetchUserInfo(user.uid)
  }
})

</script>