<template>
    <div class=" p-8 flex justify-around items-center bg-slate-50">
        <h1 class="text-4xl font-semibold">Boovljak</h1>
        <div class="text-xl ">
            <ul class="flex space-x-8">
                <li class="cursor-pointer">Home</li>
                <li class="cursor-pointer">Orders</li>
                <li class="cursor-pointer " @click="handleSignOut">Log out</li>
                <div v-if="isProfile" class="border flex flex-col ">
                    <p>Sign out</p>
                    
                </div>
            </ul>
        </div>

    </div>
</template>

<script setup>


</script>