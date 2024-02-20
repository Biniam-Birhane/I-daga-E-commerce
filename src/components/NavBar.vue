<template>
  <nav class="bg-white border-gray-200 top-0">
    <div class="flex flex-wrap items-center justify-between mx-auto p-4">
      <!-- this is the name and logo of the website -->
      <router-link
        :to="{name:'home'}"
        class="flex items-center space-x-3 rtl:space-x-reverse md:w-1/4"
      >
        <img
          src="../assets/img/ecommerce.png"
          class="h-10"
          alt="Flowbite Logo"
        />
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >I'daga E-commerce</span
        >
      </router-link>

      <!-- This Handeles the Toggle of the nav bar when on mobile verison -->
      <button
        @click="toggle = !toggle"
        @focus="handleToggleFocus" 
        @blur="handleToggleblur"
        class="block order-2 mr-0 items-end md:hidden rounded focus:outline-none hover:bg-gray-2"
      >
        <div class="w-5 h-1 bg-gray-600 mb-1"></div>
        <div class="w-5 h-1 bg-gray-600 mb-1"></div>
        <div class="w-5 h-1 bg-gray-600"></div>
      </button>

      <!-- This is the search input field and the searched result -->
      <div class="flex flex-col flex-wrap max-md:order-1 max-md:items-end md:order-1 md:w-2/4">
        <div class="relative block md:block justify-center md:w-full">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span class="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            id="search-navbar"
            v-model="searched"
            @input="getSearchResults"
            @focus="handleFocus" @blur="handleBlur"
            class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search a product"
          />

          <ul
            class="absolute bg-gray-600 text-white w-full shadow-md py-2 px-1 mt-1" v-if="isActive" 
          >
            <div>
              <li
                v-for="searchResult in filtered"
                :key="searchResult.id"
                class="py-2 cursor-pointer"
                @click="productDetail(searchResult)"
              >
                {{ searchResult.productName }}
              </li>
            </div>
          </ul>
        </div>
      </div>

    
      <div
        class="hidden items-center justify-end md w-full md:flex md:order-2 md:w-1/4"
        id="navbar-search"
      >
        <div class="relative mt-3 md:hidden">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="search-navbar"
            class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
          />
        </div>
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white"
        >
          <li>
            <button
              @click="$router.push({ name: 'home' })"
              class="block py-2 px-3 md:hover:text-blue-700 focus:text-red-900 text-gray-900 active:bg-blue-700 rounded md:bg-transparent md:p-0"
              aria-current="page"
            >
              <svg
                class="h-8 w-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </li>
          <!-- for  Cart -->
          <li>
            <button
              @click="$router.push({ name: 'cart' })"
              class="block py-2 px-3 rounded focus:text-red-900 hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500"
            >
              <svg
                class="h-8 w-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </li>
          <!-- for notification -->
          
        </ul>
      </div>

    </div>
  </nav>
  <!-- The Toggled values of mobile version -->
  <ul
    class="flex flex-col  md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white z-10 w-full "
    v-if="toggle && isToggleActive"
  >
    <div class=" md:flex flex flex-col items-end justify-between">
      <li >
        <router-link
          :to="{name:'home'}"
          class="block py-2 px-3 md:hover:text-blue-700 focus:text-red-900 text-gray-900 active:bg-blue-700 rounded md:bg-transparent md:p-0"
          aria-current="page"
        >
          <svg
            class="h-8 w-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span></span>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'cart' }"
          class="block py-2 px-3 rounded focus:text-red-900 hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:hover:text-blue-700 md:dark:hover:text-blue-500"
        >
          <svg
            class="h-8 w-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </router-link>
      </li>
     
    </div>

    <div>
      <ul
          class=" flex flex-col md:flex items-end justify-end right-0 font-medium mt-0 space-y-1  md:rtl:space-x-reverse text-sm"
        >
          <li>
            <router-link
              :to="{name:'home'}"
              
              aria-current="page"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              >HOME</router-link
            >
          </li>
          <li>
            <router-link :to="{name:'shop'}" >SHOP</router-link>       </li>
          <li>
            <router-link :to="{name:'contact'}" >CONTACT US</router-link>   </li>
          <li>
            <a data-dropdown-toggle="ProductCatagoryDropdown" data-dropdown-trigger="hover" >PRODUCT CATEGORY</a></li>
         
  </ul>
      
      
</div>
    
    <!-- <product-catagory-dropdowns class="w-1/2"/> -->
  </ul>

</template>
<script setup>
import { ref, watch } from "vue";
import productCatagoryDropdowns from "./NavDropdowns.vue/productCatagoryDropdowns.vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/counter";
const products = useProductStore();
const router = useRouter();
const searched = ref("");
let toggle = ref(false);
let isActive = ref(false)
let filtered = ref[""];

let isToggleActive =ref(false)

watch(searched, (newSearchInput, oldSearchInput) => {
  // Your filtering logic here
  filtered = newSearchInput
    ? products.GetAllProducts.filter((item) =>
        item.productName.toLowerCase().includes(newSearchInput.toLowerCase())
      )
    : [];
});

function productDetail(item){
  products.SetProductDetail(item)
  router.push({
    name: "shopDetail",
    params: { name: item.productName },
  })
}

function productlist() {
  router.push({
    name: "productCatagory",
    params: { name: "all" },
  });
}
function handleFocus() {
  isActive.value = true;
}
const handleBlur=()=> {
  const blurTimeout= setTimeout(()=>{
    isActive.value = false;
  },200)
}

function handleToggleFocus(){
  isToggleActive.value=true;
}

const handleToggleblur=()=>{
  const blurTimeout =setTimeout(()=>{
    isToggleActive.value=false
  })
  
}

// function getSearchResults(){
//   filtered=[]
//   console.log(searched.value)
//   if(searched.value!==""){
//     console.log(searched.value)
//     filtered=(products.GetShoes.filter(item=>item.productTitle.toLowerCase().includes(searched.value.toLowerCase())))
//     console.log(filtered)
//   }
// }
</script>