<template>
    <div class=" p-8 flex justify-around items-center bg-slate-50">
        <h1 class="text-4xl font-semibold">Boovljak</h1>
        <div>
          Welcome, {{ username }}
        </div>
        <div class="text-xl ">
            <ul class="flex space-x-8">
                <li class="cursor-pointer">Home</li>
                
                <li class="cursor-pointer " >
                  <p role="button" @click="handleSignOut">
                    Sign out
                  </p></li>
           
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

const router = useRouter()
const userStore = useUserStore()

const { username } = storeToRefs(userStore)

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