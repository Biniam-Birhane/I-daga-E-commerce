<template>
    <!-- component -->
    <div class="flex flex-col justify-center h-screen">
        <div
            class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
            <div class="w-full md:w-1/3 bg-white grid place-items-center">
                <img :src="imageUrl(product.image)" :alt="`${product.productName}'s image`" class="rounded-xl" />
            </div>
            <div class="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                <div class="flex justify-between items-center">
                    <p class="text-gray-500 text-2xl font-medium hidden md:block"> <span class="text-blue-600">{{
                            product.brand }}</span> Brand</p>
                    <div class="px-3 py-1 font-medium text-gray-500 hidden md:block">
                        For {{ product.target }}</div>
                </div>
                <div class="py-4">
                    <h3 class="font-black text-gray-800 md:text-3xl text-xl pb-3">{{ product.productName }}</h3>
                    <p class="md:text-lg text-gray-500 text-base pb-3">{{ product.description }}</p>
                    <p class="text-xl font-semibold text-gray-700">
                        ${{ product.price }}
                    </p>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-gray-500 font-medium hidden md:block">Owner: {{ owner.firstName }}</p>
                    <p class="text-gray-500 font-medium hidden md:block">Category: {{ category.name }}</p>
                </div>
                <div class="pt-6">
                    <router-link :to="{name: 'MyProducts'}" class="font-semibold hover:underline text-blue-500">Go to my products</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';

import apiService from '../../services/apiService.js';
import imageUrl from '../../services/baseImageUrl.js';

const route = useRoute();
const product = ref([])
const owner = ref('')
const category = ref('')

const getProduct = async () => {
    console.log("route params: ", route.params.productId);
    try {
        let response = await apiService.getOne(`products/${route.params.productId}`)
        console.log("product response: ", response.data.data);
        product.value = response.data.data
        owner.value = product.value.productOwner
        category.value = product.value.categoryId
    } catch (error) {
        console.log("Error: ", error.response.data);
    }

}

onMounted(() => {
    getProduct()
})

</script>

<style scoped></style>