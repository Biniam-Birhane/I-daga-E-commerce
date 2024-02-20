<template>
  <div>
     <h1
      class="text-xl font-semibold uppercase md:ml-2 border-b-2 border-gray-900"
    >
      BOOKS
    </h1>
    <swiper
    :slidesPerView="3"
    :spaceBetween="4"
    :slides-per-group="4"
    :breakpoints="{

      300: {
        slidesPerView: 3,
        spaceBetween: 4,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 3,
        spaceBetween: 4,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 10,
        spaceBetween: 4,
      },
    }"
    
    :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
    :modules="modules"
    class="mySwiper  my-6 mx-6"
  >
    <swiper-slide
      v-for="(item, index) in ClothesList"
      :key="index"
      class="flex flex-col bg-white cursor: pointer;  background-color: #fff;  z-index: 3; margin-bottom: 2px;    hover:-translate-y-2 hover:scale-105 duration-300 hover:bg-red-600 shadow-xl   shadow-gray-300 hover:shadow-gray-300 hover:shadow-md"
    > 
      <img
        :src="imageUrl(item.image)"
        alt="Card Image"
        @click="productDetail(item)"
        class=" w-full  h-40  rounded flex-shrink-0 cursor-pointer"
      />
    
    </swiper-slide>
    <!-- Previous Button -->
    <div class="swiper-button-prev"></div>
      <!-- Next Button -->
    <div class="swiper-button-next"></div>
  </swiper>
  </div>
   
  </template>
    <script setup>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { useProductStore } from "@/stores/counter";
  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/navigation";
  
  // import required modules
  import { Pagination } from "swiper/modules";
  import { Navigation } from "swiper/modules";
  import { ref } from "vue";
  import { useRouter} from "vue-router";
  import imageUrl from "../../services/baseImageUrl";
  
  const router =useRouter()
  const product = useProductStore();

  const ClothesList = product.GetBasedCategory('Books')

  function productDetail(item){
    product.SetProductDetail(item)
    router.push({
    name: "shopDetail",
    params: { name: item.productName },
  });
  }
  
  function BuyNow(productOne){
    product.AddToCart(productOne)
    console.log(productOne)
    router.push({
      name:'cart'
    })
  }
  const modules = [Navigation, Pagination];
  
  </script>
  <style scoped>
    .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    top: 50%;
    width: 40px;
    height: 40px;
    margin-top: -20px;
    background-color: #333333;
    color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  .swiper-button-prev {
    left: 10px;
  }
  
  .swiper-button-next {
    right: 10px;
  }
  .swiper {
    width: 100%;
    height: 100%;
  }
  
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
  
    /* Center slide text vertically */
    display: flex;
    
  }
  
 
  </style>
    