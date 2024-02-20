<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/counter";
import imageUrl from "../services/baseImageUrl";
import apiService from "../services/apiService";
const router = useRouter();
const product = useProductStore();
let Relateded =ref('')
// let ItemOne =ref('')
// ItemOne=product.GetProductDetail.categoryId.name

// console.log(ItemOne)
console.log(product.GetProductDetail)

const CategoryName=product.GetProductDetail.categoryId.name
const CategoryTarget=product.GetProductDetail.target
const formData={
  category:CategoryName,
  target:CategoryTarget
}
console.log(formData)


onMounted(()=>{
   getRelatedProduct(Relateded)
})

const getRelatedProduct = async (Relateded) =>{
  try {
    const result = await apiService.store('/products/findByBoth',{category:CategoryName,target:CategoryTarget})
    Relateded.value = result.data.data
    console.log(Relateded.value)
    
  } catch (error) {
    console.log(error)
  }
}


function ProductDetail(productDetail) {
  product.SetProductDetail(productDetail);
  console.log(productDetail)
  router.push({
    name: "shopDetail",
    params: { name: productDetail.productName },
  });
  
}

function BuyNow(BuyProduct) {
  product.AddToCart(BuyProduct);
  router.push({
    name: "cart",
  });
}


</script>
<template>
  <div class="flex flex-col right-0 flex-wrap space-y-3">
    <h1 class="text-2xl uppercase font-semibold border-b-4 border-gray-900 ">Related products</h1>
    <div
      class="grid md:grid-cols-4 max-sm:grid-cols-2 gap-3  items-center md:space-y-3 space-x-2"
    >
      <div
        v-for="data in Relateded"
        :key="data.id"
        class="md:w-full hover:shadow-lg shadow-xl shadow-gray-400 md:h-88 md:flex-col bg-white"
      >
        <button
          class="flex flex-col rounded-md overflow-hidden md:mt-5 lg:mr-8 cursor-pointer items-center md:pl-10"
        >
          <div class="relative" @click="ProductDetail(data)">
            <!-- {{ data.imageSrc }}
        <img :src="'/img/ + data.imageSrc'" alt="no img" /> -->
            <img
              :src="imageUrl(data.image)"
              alt=""
              class="w-full h-48 object-cover mb-2 rounded flex-shrink-0"
            />
            <!-- <img class="w-full" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Product Image"> -->
            <div
              class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium"
            >
              SALE
            </div>
          </div>
          <div class="flex flex-col items-center h-full">
            <p class="text-gray-600 text-md mb-1">{{ data.description.substring(0,80) }}</p>
            <div class="flex flex-col items-center justify-between mb-1">
              <span class="font-bold text-lg">Birr {{ data.price }}</span>
              <button
                @click="BuyNow(data)"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Buy Now
              </button>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
