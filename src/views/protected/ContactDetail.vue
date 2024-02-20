<template>
    <div>
        <div class="px-4 py-5 sm:px-6 text-center">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        About This Contact
                    </h3>
                    <p class="mt-1 max-w-2xl text-gray-500">
                        Details and informations about this contact.
                    </p>
                </div>
                <div class="border-t border-gray-200">
                    <dl>
                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                Order name
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ order.buyer }}
                            </dd>
                        </div>
                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                Job
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                Software Developer
                            </dd>
                        </div>
                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                Email address
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ order.quantity }}
                            </dd>
                        </div>
                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                Salary
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                $10,000
                            </dd>
                        </div>
                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                About
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                To get social media testimonials like these, keep your customers engaged with your social media
                                accounts by posting regularly yourself
                            </dd>
                        </div>
                    </dl>
                </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';

import apiService from '../../services/apiService.js';

const route = useRoute();
const order = ref([])

const getOrder = async () => {
    console.log("route params: ", route.params.id);
    try {
        let response = await apiService.getOne(`order/${route.params.id}`)
        console.log("order response: ", response.data);
        order.value = response.data.data
    } catch (error) {
        console.log("Error: ", error.response.data);
    }
    
}

onMounted(() => {
    getOrder()
})

</script>

<style scoped>

</style>