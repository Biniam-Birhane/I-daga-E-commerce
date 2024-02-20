<script setup >
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/counter";
import imageUrl from "../services/baseImageUrl";
const router = useRouter();
const productList =useProductStore();
 
function ProductDetail(item) {
  productList.SetProductDetail(item)
  router.push({
    name: "shopDetail",
    params: { name: item.productName },
    query:''
  });
  
}
function BuyNow(item){
  productList.AddToCart(item)
  router.push({
    name:'cart'
  })
}




</script>
<template>
  <div class=" flex  flex-col flex-wrap  mt-10 ">
  <div class=" grid md:grid-cols-4 grid-cols-1 space-y-4  lg:ml-3 bg-white">
    <button
      v-for="data in productList.GetAllProducts "
      :key="data.id"
      class="flex flex-col rounded-md overflow-hidden bg-white shadow-md hover:shadow-lg shadow-cyan-500/50  lg:mr-8 mb-3 items-center transition duration-400 hover:translate-y-2 hover:shadow-gray-500"
      
    >
      <div class="relative">
        <!-- {{ data.imageSrc }}
        <img :src="'/img/ + data.imageSrc'" alt="no img" /> -->
        <img :src="imageUrl(data.image)" class="md:h-48 object-cover" alt="" @click="ProductDetail(data)" >
        <!-- <img class="w-full" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Product Image"> -->
        <div
          class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium"
        >
          SALE
        </div>
      </div>
      <div class="md:flex flex-col items-center  h-full">
        <p class="text-red-800 text-md mb-1">{{ data.productName }}</p>
        <p class="text-gray-600 text-md mb-1">{{ data.description.substring(0,60) }}</p>
        <div class="flex flex-col items-center justify-between mb-1">
          <span class="font-bold text-lg">Birr {{ data.price }}</span>
          <button
            @click="BuyNow(data)"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded "
          >
            Buy Now
          </button>
        </div>
      </div>
    </button>
  </div>
  </div>
</template>