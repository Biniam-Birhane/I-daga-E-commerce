<script setup>
import {onBeforeMount, ref, watch} from 'vue'
import RelatedProduct from './RelatedProduct.vue';
import { useProductStore } from '@/stores/counter';
import { useRouter} from "vue-router";
import imageUrl from '../services/baseImageUrl';
const productDetail =useProductStore()
const router =useRouter()
const isloaded =ref(false)
let ItemOne=ref('')
console.log(productDetail.GetProductDetail)

watch(()=>productDetail.GetProductDetail,(newItem)=>{
    ItemOne=newItem
    console.log(ItemOne)
})

onBeforeMount(async()=>{
    ItemOne = await productDetail.GetProductDetail
    console.log(ItemOne)
    isloaded.value=true
})


function BuyProduct(productOne){
    productDetail.AddToCart(productOne)
    router.push({
        name:'cart'
    })

}



</script>
<template>
    <div class="md:z-0 right-0">
        <section class="overflow-hidden  py-1 font-poppins dark:bg-gray-800 z-0">
        <div class="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6 ">
            <div class="flex flex-wrap  -mx-4 z-0">
                <div class="w-full px-4 md:w-1/2  items-center justify-center">
                    <div class=" top-0 ">
                        <div class="relative items-center ">
                            <img :src="imageUrl(ItemOne.image)" alt=""
                                class=" h-72 mx-auto ">
                        </div>
                    </div>       
                </div>
                <div class="w-full bg-white px-4 md:w-1/2 ">
                    <div class="lg:pl-20">
                        <div class="mb-8 ">
                            <span class="text-lg font-medium text-rose-500 dark:text-rose-200">New</span>
                            <h2 class="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                                {{ ItemOne.productName }}</h2>
                           
                            <p class="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                                {{ ItemOne.description }}
                            </p>
                            <p class="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                                <span> Birr {{ItemOne.price}}  </span>
                                <span
                                    class="text-base font-normal text-gray-500 line-through dark:text-gray-400"> 1500.99</span>
                            </p>
                        </div>   
                        <div class="flex flex-wrap items-center -mx-4 ">
                            <div class="w-full p-4 mb-4 lg:w-1/2 lg:mb-0">
                                <button
                                    @click="BuyProduct(ItemOne)"
                                    class="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">
                                    Purchase
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
        <RelatedProduct class="right-0" v-show="isloaded" />
    </div>
</template>

<style scoped>

</style>