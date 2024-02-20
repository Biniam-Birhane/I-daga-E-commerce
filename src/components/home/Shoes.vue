<template>
  <div>
    <h1
      class="text-xl font-semibold uppercase md:ml-2 border-b-4 border-gray-900"
    >
      Shoes
    </h1>
    <swiper
      :slidesPerView="1"
      :spaceBetween="30"
      :breakpoints="{
        300: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        // when window width is >= 1024px
        1024: {
          slidesPerView: 5,
          spaceBetween: 40,
        },
      }"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :modules="modules"
      class="mySwiper ml-3 my-6 mx-6"
    >
      <swiper-slide
        v-for="(item, index) in ShoesList"
        :key="index"
        class="flex flex-col bg-white cursor: pointer; box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06), 0 2px 2px 0 rgba(40s, 44, 53, 0.08); background-color: #fff; border-radius: 4px; z-index: 3; margin-bottom: 2px;  hover:-translate-y-2 hover:scale-105 duration-300 hover:bg-red-600 shadow-xl shadow-gray-300 hover:shadow-gray-300 hover:shadow-md pb-2"
      >
        <img
          :src="imageUrl(item.image)"
          alt="Card Image"
          @click="productDetail(item)"
          class="w-full h-40 mb-4 rounded flex-shrink-0 cursor-pointer"
        />
        <div class="text-center">
          <p class="text-xl font-semibold mb-2">{{ item.productName }}</p>
          <div class="flex justify-center">
            <p class="text-bold">Birr {{ item.price }}</p>
          </div>
        </div>
        <button
          @click="BuyNow(item)"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Buy Now
        </button>
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
import { useRouter } from "vue-router";
import imageUrl from "../../services/baseImageUrl";
const router = useRouter();

const product = useProductStore();
const ShoesList = product.GetBasedCategory("Shoes");
console.log(ShoesList);

function productDetail(item) {
  product.SetProductDetail(item);
  router.push({
    name: "shopDetail",
    params: { name: item.productName },
  });
}

function BuyNow(productOne) {
  product.AddToCart(productOne);
  console.log(productOne);
  router.push({
    name: "cart",
  });
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
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
}
</style>
  