<template>
    <SellerNavbar/>
        <div class="flex items-center justify-center flex-col">
        <div class="mt-5">
            <router-link to="/create-listing">
            <button class="rounded bg-blue-500 text-white py-1 px-2 text-xl cursor-pointer">Add listing</button></router-link>
        </div>

    </div>
</template>

<script setup>
import SellerNavbar from '@/components/SellerNavbar.vue'
</script>