<script setup>
import carousel from '@/components/home/carousel.vue';
import fixedFile from '@/components/home/fixedFile.vue';
import CategoryCard from '@/components/home/CategoryCard.vue';
import Electronics from '@/components/home/Electronics.vue';
import Shoes from '@/components/home/Shoes.vue';
import clothes from '@/components/home/clothes.vue'
import featured from '../../components/home/featured.vue';
import books from '../../components/home/books.vue';
import homeCard from '../../components/home/homeCard.vue';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { onBeforeMount, onMounted,ref } from 'vue';
import{useProductStore} from '../../stores/counter'
const isLoaded =ref(false)
let a =ref(false)
const product =useProductStore()
onBeforeMount(async()=>{ 
  try {
    await product.SetAllProducts('products')
    isLoaded.value=true
  } catch (error) {
    console.log(error)
  }
  
})

</script> 
<template>
  <div v-if="isLoaded">
    <div class="container flex flex-wrap space-y-2 mt-2  space-x-0" >
      <carousel class="max-md:w-full md:w-2/3 z-0" />
      <fixedFile class="max-md:w-full  md:w-1/3 md:ml-0   " />
    </div> 
    <CategoryCard />
  <!-- <carouselCard/> -->
  <!-- <cards/> -->
    <featured/>
    <Shoes />
    <homeCard/>
    <clothes/>
    <Electronics/>
    <books/>
    
  </div>
  
  
</template>


