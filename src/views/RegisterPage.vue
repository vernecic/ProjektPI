<template>
  <div class="flex items-center justify-center gap-8" >
    <div class="flex min-h-screen items-center justify-end  flex-1/2">
      <h1 class="text-6xl text-zinc-700 font-semibold">Welcome to Boovljak</h1>
    </div>
    <div class="flex min-h-screen items-center justify-start flex-1/2">
      <div class="flex flex-col">
      <h1 class="text-4xl font-semibold text-zinc-700">Register</h1>
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
          Account type: <button class="cursor-pointer hover:shadow-md hover:bg-zinc-300 p-2 " :class="{'bg-zinc-300': role === 'buyer'}" @click="selectType('buyer')">Buyer </button> / <button class="cursor-pointer hover:shadow-md hover:bg-zinc-300 p-2" :class="{'bg-zinc-300': role === 'seller'}" @click="selectType('seller')">Seller</button> 
        </div>
        <div v-if="isError">
          <span class="text-xl text-red-500">{{ errorMessage }}</span>

        </div>
        <div class="mt-5">
          <button class="rounded border px-2 py-1 text-2xl cursor-pointer hover:bg-zinc-200 shadow-md" @click="handleRegister">Register</button>

        </div>
        <div class="mt-5">
          <span>Already have an account?</span> 
          <router-link to="/login">
          <button class="rounded border text-lg px-2 py-1 ml-2 hover:bg-zinc-200 transition duration-200 cursor-pointer shadow-md">Login</button></router-link>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { auth } from '@/firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { errorMessages } from 'vue/compiler-sfc'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const email = ref('')
const role = ref('')
const isError = ref(false)
const errorMessage = ref('')


// Funkcije
function selectType(type){
    role.value = type
}

const handleRegister = async() => {
  errorMessage.value = ''
  if(!username.value || !email.value || !password.value || !confirmPassword.value){
    isError.value = true;
    errorMessage.value = 'All fields required!'
    return
  }
  if(password.value !== confirmPassword.value){
    isError.value = true;
    errorMessage.value = 'Passwords do not match!'
  }
  if(!role.value){
    isError.value = true;
    errorMessage.value = 'Select an account type!'
  }

  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    await setDoc(doc(db, 'users', user.uid),{
      username: username.value,
      email: email.value,
      role: role.value,
      createdAt: new Date(),
      balance: 0
    });
    console.log('Register uspješan!: ', user)
  } catch (error){
    isError.value = true;
    errorMessage.value = error
  }


}

</script>

