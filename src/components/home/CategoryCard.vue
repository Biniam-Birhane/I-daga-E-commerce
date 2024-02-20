<script setup>
import { ref,onMounted } from "vue";
import { useRouter } from "vue-router";
import apiService from "../../services/apiService";
import imageUrl from "../../services/baseImageUrl"
const router =useRouter()
let categoryData =ref('')

onMounted(() => {
      GetCategoryitems(categoryData);
    });
async function GetCategoryitems(categoryData){
  try {
    const result =await apiService.all('category')
    categoryData.value=result.data.data
  } catch (error) {
    console.log(error)
  }
}

console.log(categoryData.value)
// const Category = ref([
//     {name:'SHOES',image:'shoe1.jpg'},
//     {name:'ELECTRONICS',image:'electronics.jpg'},
//     {name:'CLOTHES',image:'jacket1.jpg'},
//     {name:'BOOKS',image:'book.jpg'},
//     {name:'TELEVISION',image:'television.jpg'},
//     {name:'HABESHA',image:'habesha_kidan.jpg'},
    
// ]);

// const getImageUrl = (path) => {
//  return new URL(`../assets/img/${path}`, import.meta.url).href;
// };


function SeeList(name){
  router.push({
    name:'productCatagory',
    params:{name:name}
  })
}

</script>
<template>
  <div class="flex flex-wrap max-sm:mt-72 space-y-2 md:justify-between m-3">
  <button
    @click="SeeList(data.name)"
    class="bg-white p-2 md:p-6  rounded-lg shadow-lg hover:-translate-y-1 hover:scale-105 duration-300 hover:mt-2 flex items-center sm:max-w-sm max-md:w-1/2 sm:h-full max-md:flex-col   md:w-full "
    v-for="data in categoryData"
    :key="data.id"
  >
    <div class="flex-shrink-0">
      <img
        class="object-cover  h-16  sm:h-24 rounded w-full "
        :src="imageUrl(data.image)"
        alt="Category Image"
      />
    </div>
    <div class="ml-3 text-center">
      <div class="text-lg font-medium text-black">
        {{ data.name }}
      </div>
    </div>
  </button>
</div>

  <!-- <div class="flex flex-wrap sm:col-span-1 w-full space-y-2   justify-between ">
    <button
      @click="SeeList(data.name)"
      class="p-3 md:mx-auto bg-white rounded-xl shadow-lg hover:-translate-y-1 hover:scale-110 duration-300 hover:mt-3 flex md:space-x-4 space-y-5  sm:h-auto "
      v-for="data in Category"
      :key="data.id"
    >
      <div class="">
        <img
          class="object-cover sm:w-full  rounded"
          src="../assets/img/jacket2.jpg"
          alt="Category Image"
        />
      </div>
      <div class="sm:ml-2 text-center">
        <div class="text-xl font-medium text-black">
          {{ data.name }}
        </div>
      </div>
    </button>
  </div> -->
</template>
