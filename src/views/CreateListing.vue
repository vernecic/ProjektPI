<template>
  <SellerNavbar/>
  <div class="flex justify-center items-center ">
    <div class="flex flex-col mt-5">
      <h1 class="text-2xl">Create listing</h1>
      <form @submit.prevent="submitListing">
        <div class="mb-4">
          <label
            for="image"
            class="block text-sm font-medium  mb-1"
            >Upload image:</label
          >
          <input
            id="image"
            
            type="file" 
            class=" w-full  rounded-lg border  cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
          />

   
        </div>
        <div class="flex flex-col">
          <label for="title">Title</label>
          <input type="text" v-model="title" id="title" class="border rounded text-lg" />
        </div>
        <div class="flex flex-col">
          <label for="price">Price</label>
          <input type="number" v-model="price" id="price" class="border rounded text-lg" />
        </div>
        <div class="flex flex-col">
          <label for="desc">Description</label>
          <textarea v-model="desc" id="desc" class="border rounded text-lg"></textarea>
        </div>
        <div v-if="isError">
          {{ errorMessage }}

        </div>
        <div class="flex mt-5 justify-center">
          <button type="submit" class="bg-blue-500 text-white py-1 px-2 rounded-md text-lg " >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import SellerNavbar from '@/components/SellerNavbar.vue'
import { useUserStore } from '@/stores/users'
import { ref, onMounted } from 'vue'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from '@/firebase/config'

const userStore = useUserStore()

const title = ref('')
const price = ref(null)
const desc = ref('')
const isError = ref(false)
const errorMessage = ref('')


// zove pinia userinfo
onMounted(async () => {
  const user = auth.currentUser
  if(user && !userStore.username) {
    await userStore.fetchUserInfo(user.uid)
  }
})

const submitListing = async () =>{

  if(!title.value || !desc.value || !price.value){
    isError.value = true;
    errorMessage.value = 'Please fill in all fields'
    return
  }
   try {
    const listingsRef = collection(db, "listings")

    await addDoc(listingsRef, {
      title: title.value,
      description: desc.value,
      price: parseFloat(price.value),
      createdAt: serverTimestamp(),
      approved: false,
      seller: userStore.username, 
      buyer: null,
    })
    title.value = ''
  desc.value = ''
  price.value = null
  isError.value = false
errorMessage.value = ''
} catch(error){
  isError.value = true;
  errorMessage.value = error.message
}
}
</script>
