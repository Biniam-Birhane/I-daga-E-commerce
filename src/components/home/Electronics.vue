<script setup >
import { computed, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/counter";
import imageUrl from "../../services/baseImageUrl";
const router = useRouter();
const Electronics = useProductStore();

const ElectronicsLists =Electronics.GetBasedCategory('Electronics').slice(0,4)
console.log(ElectronicsLists)

function ProductDetail(productDetail) {
  console.log(productDetail)
  Electronics.SetProductDetail(productDetail)
  router.push({
    name: "shopDetail",
    params: { name: productDetail.productName },
  });
}

function SeeAll() {
  router.push({
    name: "productCatagory",
    params: { name: "Electronics" },
  });
}
function BuyNow(BuyProduct) {
  Electronics.AddToCart(BuyProduct);
  router.push({
    name: "cart",
  });
}
</script>
<template>
  <div class="flex flex-col flex-wrap  ">
    <h1
      class="text-xl font-semibold uppercase md:ml-2 border-b-4 border-gray-900 mb-2"
    >
      Electronics
    </h1>
    <div class="flex flex-wrap  lg:ml-3 md:justify-center md:items-center  md:space-y-2 md:space-x-4  ">
      <div
        v-for="data in ElectronicsLists"
        :key="data.id"
        class=" flex  bg-white md:w-1/4 max-sm:w-1/2 hover:shadow-lg shadow-xl shadow-gray-400  md:h-72  hover:-translate-y-1 hover:scale-105 duration-300 max-md:mb-1  "
      >
        <button
          class="flex flex-col rounded-md overflow-hidden md:mt-5 lg:mr-8 cursor-pointer items-center md:pl-10 "
        >
          <div class="relative" @click="ProductDetail(data)">
            <!-- {{ data.imageSrc }}
        <img :src="'/img/ + data.imageSrc'" alt="no img" /> -->
            <img :src="imageUrl(data.image)" alt="hello" class="w-full md:h-32 h-36 object-cover mb-2 rounded flex-shrink-0" />
            <!-- <img class="w-full" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Product Image"> -->
            <div
              class="absolute  top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium"
            >
              SALE
            </div>
          </div>
          <div class="md:flex flex-col items-center text-center  h-full">
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
        <!-- <div class="p-4 ">
          <p class="text-gray-600 text-sm mb-4">{{ data.description }}</p>
          <div class="flex items-center justify-between">
            <span class="font-bold text-lg">${{ data.price }}</span>
            <button
              @click="BuyNow(data)"
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Buy Now
            </button>
          </div>
        </div> -->
      </div>
    </div>
    <div class="flex justify-end md:mr-6">
      <button
        @click="SeeAll"
        class="bg-green-600 border p-2 pl-7 pr-7 rounded hover:shadow-sm font-semibold mb-3"
      >
        See All
      </button>
    </div>
  </div>
</template>