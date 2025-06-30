<template>
  <div class="flex items-center justify-center gap-8" >
    <div class="flex min-h-screen items-center justify-end  flex-1/2">
      <h1 class="text-6xl text-zinc-700 font-semibold">Welcome to Boovljak</h1>
    </div>
    <div class="flex min-h-screen items-center justify-start flex-1/2">
      <div class="flex flex-col">
      <h1 class="text-4xl font-semibold text-zinc-800">Register</h1>
        <div class="grid grid-cols-2 gap-4 mt-5">
         
             <div class="flex flex-col ">
            <label for="username">Username</label>
            <input type="text" class="border rounded focus:outline-none p-1" v-model="username">
             </div> 
             <div class="flex flex-col ">
               <label for="username">Email</label>
               <input type="email" class="border rounded focus:outline-none p-1" v-model="email">
              </div> 
              <div class="flex flex-col ">
           <label for="username">Password</label>
           <input type="password" class="border rounded focus:outline-none p-1" v-model="password">
            </div> 
               <div class="flex flex-col ">
            <label for="username">Confirm Password</label>
            <input type="password" class="border rounded focus:outline-none p-1" v-model="confirmPassword">
             </div> 
           
          
        </div>
        <div class="mt-5">
          Account type: <button class="cursor-pointer hover:shadow-md hover:bg-zinc-300 p-2">Buyer </button> / <button class="cursor-pointer hover:shadow-md hover:bg-zinc-300 p-2">Seller</button> 
        </div>
        <div class="mt-5">
          <button class="rounded border px-2 py-1 text-xl cursor-pointer hover:bg-zinc-200 shadow-md">Register</button>

        </div>
        <div class="mt-5">
          <span>Already have an account?</span> <button class="rounded border px-2 py-1 ml-2 hover:bg-zinc-200 transition duration-200 cursor-pointer shadow-md">Login</button>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const email = ref('')

/* const type = ref('Buyer') */

</script>

