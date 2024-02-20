<script setup >
import { ref  } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const product = ref([
  {
    productTitle: "Axum Nebia",
    imageSrc: "shoe1.jpg",
    description: "this is the book of nega zerue",
    price: 400,
  },
  {
    productTitle: "jacket",
    imageSrc: "jacket1.jpg",
    description: "this is for mens jacket",
    price: 1400,
  },
  {
    productTitle: "Boss baby",
    imageSrc: "jacket2.jpg",
    description: "this is the film of boss baby ",
    price: 400,
  },
  {
    productTitle: "Nike Shoes",
    imageSrc: "jacket3.jpg",
    description: "this is for womens shoes",
    price: 1500,
  },
  {
    productTitle: "Nike Shoes",
    imageSrc: "shoe2.jpg",
    description: "this is for womens shoes",
    price: 1500,
  },
  {
    productTitle: "Nike Shoes",
    imageSrc: "shoe3.jpg",
    description: "this is for womens shoes",
    price: 1500,
  },
  {
    productTitle: "Nike Shoes",
    imageSrc: "jacket1.jpg",
    description: "this is for womens shoes",
    price: 1500,
  },
]);

function ProductDetail(productTitle) {
  router.push({
    name: "shoeDetail",
    params: { name: productTitle }
  });
};
const getImageUrl = (path) => {
 return new URL(`../assets/img/${path}`, import.meta.url).href;
};

</script>
<template>
  <div class=" grid grid-cols-1 md:grid-cols-4   lg:ml-3">
    <div
      v-for="data in product"
      :key="data.id"
      class="flex flex-col rounded-md overflow-hidden shadow-md hover:shadow-lg shadow-cyan-500/50  lg:mr-8 mb-3 "
    >
      <div class="relative">
        <!-- {{ data.imageSrc }}
        <img :src="'/img/ + data.imageSrc'" alt="no img" /> -->
        <img :src="getImageUrl(data.imageSrc)" alt="">
        <!-- <img class="w-full" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Product Image"> -->
        <div
          class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium"
        >
          SALE
        </div>
      </div>
      <div class="p-4">
        <h3 class="text-lg font-medium mb-2">{{ data.productTitle }}</h3>
        <p class="text-gray-600 text-sm mb-4">{{ data.description }}</p>
        <div class="flex items-center justify-between">
          <span class="font-bold text-lg">${{ data.price }}</span>
          <button
            @click="ProductDetail(data.productTitle)"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
  <router-view/>
  <!-- <div class="w-full max-w-sm bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="p-8 rounded-t-lg h-60 w-auto " src="../assets/img/clothe.jpg" alt="product image" />
    </a>
    <div class="px-5 pb-5">
        <a href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
        </a>
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
            <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
        </div>
    </div>
</div> -->
</template>