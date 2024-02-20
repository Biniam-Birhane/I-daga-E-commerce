<script setup >
import { onBeforeMount, ref,watch } from "vue";
import { useRouter,useRoute } from "vue-router";
import { useProductStore } from "@/stores/counter";
import imageUrl from "../services/baseImageUrl";
const router = useRouter();
const route =useRoute()
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

let itemsList =ref([])
console.log(route.params.name)

watch(()=>route.params.name,async(newParams)=>{
  itemsList.value = await productList.GetBasedCategory(newParams)
  // ItemsCategory(newParams)
},{ immediate: true }
)
// onBeforeMount(()=>{
//   ItemsCategory(itemsList)
// })
// console.log(route.params.name)
// // console.log(routee.name)
// const ItemsCategory = async (itemsList)=> {
//   itemsList.value = await productList.GetBasedCategory(route.params.name)
// }

// productList.SetElectronics(product);

</script>
<template>
  <div class=" flex  flex-col flex-wrap space-y-2 mt-5">
  <h1 class=" text-xl font-semibold uppercase md:ml-2 border-b-4 border-gray-900  "> {{ $route.params.name }}</h1>
  <div class=" grid md:grid-cols-4 grid-cols-1  lg:ml-3">
    <button
      v-for="data in itemsList "
      :key="data.id"
      class="flex flex-col rounded-md overflow-hidden shadow-md hover:shadow-lg shadow-cyan-500/50  lg:mr-8 mb-3 items-center transition duration-300 hover:scale-105 hover:shadow-gray-500"
      
    >
      <div class="relative">
        <!-- {{ data.imageSrc }}
        <img :src="'/img/ + data.imageSrc'" alt="no img" /> -->
        <img :src="imageUrl(data.image)" @click="ProductDetail(data)" class="md:h-48 object-cover" alt="">
        <!-- <img class="w-full" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Product Image"> -->
        <div
          class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium"
        >
          SALE
        </div>
      </div>
      <div class="md:flex flex-col items-center  h-full">
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