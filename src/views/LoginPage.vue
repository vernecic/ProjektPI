<template>
  <div class="flex items-center justify-center gap-8" >
    <div class="flex min-h-screen items-center justify-end  flex-1/2">
      <h1 class="text-6xl text-zinc-700 font-semibold">Welcome to Boovljak</h1>
    </div>
    <div class="flex min-h-screen items-center justify-start flex-1/2">
      <div class="flex flex-col">
      <h1 class="text-4xl font-semibold text-zinc-700">Login</h1>
        <div class="grid grid-cols-2 gap-4 mt-5">
         
          
             <div class="flex flex-col ">
               <label for="username">Email</label>
               <input type="email" class="border rounded focus:outline-none p-1" v-model="email">
              </div> 
              <div class="flex flex-col ">
           <label for="username">Password</label>
           <input type="password" class="border rounded focus:outline-none p-1" v-model="password">
            </div> 
        
           
          
        </div>
    
        <div class="mt-5">
          <button class="rounded border px-2 py-1 text-2xl cursor-pointer hover:bg-zinc-200 shadow-md" @click="handleLogin">Login</button>

        </div>
        <div class="mt-5">
          <span>Don't have an account?</span> 
          <router-link to="/register">
          <button class="rounded border text-lg px-2 py-1 ml-2 hover:bg-zinc-200 transition duration-200 cursor-pointer shadow-md">Register</button></router-link>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebase/config'

const password = ref('')
const email = ref('')

const router = useRouter()

const handleLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log("Login uspješan", userCredential.user);

    router.push("/feed");
  } catch (error) {
    console.error("Login neuspješan:", error);
    
  }
};

</script>

