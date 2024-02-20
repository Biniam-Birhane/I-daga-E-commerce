<template>
  <div>
    <nav class=" bg-nav2  z-0 ">
    <div class="max-w-screen-xl px-4 py-3 mx-auto">
      <div class="flex items-center space-x-6">
        <!-- <ul class="flex space-x-1">
          <button
            class="block order-1 mr-0 items-end rounded focus:outline-none hover:bg-gray-2"
          >
            <div class="w-5 h-1 bg-white mb-1"></div>
            <div class="w-5 h-1 bg-white mb-1"></div>
            <div class="w-5 h-1 bg-white"></div>
          </button>
          <span class="order-2 text-white">ALL</span>
        </ul> -->

        <ul
          class="hidden md:flex font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm"
        >
          <li>
            <router-link
              :to="{name:'home'}"
              class="text-white hover:box"
              aria-current="page"
              
              >HOME</router-link
            >
          </li>
          <li>
            <router-link :to="{name:'shop'}" class="text-white hover:box">SHOP</router-link>
          </li>
          <li>
            <router-link :to="{name:'contact'}" class="text-white hover:box">CONTACT US</router-link>
          </li>
          <li>
            <div class="group inline-block">
              <button
                class="outline-none focus:outline-none  text-white flex items-center min-w-32"
              >
                <span class="pr-1 font-semibold flex-1">PRODUCT CATEGORY</span>
                <span>
                  <svg
                    class="fill-current h-4 w-4 transform group-hover:-rotate-180
                    transition duration-150 ease-in-out bg-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </span>
              </button>
              <ul
                class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
              transition duration-150 ease-in-out origin-top min-w-32 mt-3"
              >
                
                <li  class="rounded-sm relative p-2 hover:bg-gray-100 cursor-pointer">
                  <button
                    class="w-full text-left flex items-center outline-none focus:outline-none"
                  >
                    <span class=" flex-1 "><button @click="seeLists('Electronics')">Electronics</button> </span>
                    <span class="mr-auto">
                      <svg
                        class="fill-current h-4 w-4
                        transition duration-150 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                        />
                      </svg>
                    </span>
                  </button>
                  <ul class="bg-white border rounded-sm absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left min-w-32">
                    <li @click="seeTargetedList('Electronics','Male')" class="p-2 hover:bg-gray-100 cursor-pointer">Men</li>
                    <li @click="seeTargetedList('Electronics','Female')" class="p-2 hover:bg-gray-100 cursor-pointer">Women</li>
                    <li @click="seeTargetedList('Electronics','Kids')" class="p-2 hover:bg-gray-100 cursor-pointer">Kids</li>
                  </ul>
                </li>
                <li  class="rounded-sm relative p-2 hover:bg-gray-100 cursor-pointer">
                  <button
                    class="w-full text-left flex items-center outline-none focus:outline-none"
                  >
                    <span class=" flex-1 "><button @click="seeLists('Shoes')">Shoes</button> </span>
                    <span class="mr-auto">
                      <svg
                        class="fill-current h-4 w-4
                        transition duration-150 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                        />
                      </svg>
                    </span>
                  </button>
                  <ul class="bg-white border rounded-sm absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left min-w-32">
                    <li @click="seeTargetedList('Shoes','Male')" class="p-2 hover:bg-gray-100 cursor-pointer">Men</li>
                    <li @click="seeTargetedList('Shoes','Female')" class="p-2 hover:bg-gray-100 cursor-pointer">Women</li>
                    <li @click="seeTargetedList('Shoes','Kids')" class="p-2 hover:bg-gray-100 cursor-pointer">Kids</li>
                  </ul>
                </li>
                <li  class="rounded-sm relative p-2 hover:bg-gray-100 cursor-pointer">
                  <button
                    class="w-full text-left flex items-center outline-none focus:outline-none"
                  >
                    <span class=" flex-1 "><button @click="seeLists('Clothes')">Clothes</button> </span>
                    <span class="mr-auto">
                      <svg
                        class="fill-current h-4 w-4
                        transition duration-150 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                        />
                      </svg>
                    </span>
                  </button>
                  <ul class="bg-white border rounded-sm absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left min-w-32">
                    <li @click="seeTargetedList('Clothes','Male')" class="p-2 hover:bg-gray-100 cursor-pointer">Men</li>
                    <li @click="seeTargetedList('Clothes','Female')" class="p-2 hover:bg-gray-100 cursor-pointer">Women</li>
                    <li @click="seeTargetedList('Clothes','Kids')" class="p-2 hover:bg-gray-100 cursor-pointer">Kids</li>
                  </ul>
                </li>
                <li  class="rounded-sm relative p-2 hover:bg-gray-100 cursor-pointer">
                  <button
                    class="w-full text-left flex items-center outline-none focus:outline-none"
                  >
                    <span class=" flex-1 "><button @click="seeLists('Books')">Books</button> </span>
                    <span class="mr-auto">
                      <svg
                        class="fill-current h-4 w-4
                        transition duration-150 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                        />
                      </svg>
                    </span>
                  </button>
                  <ul class="bg-white border rounded-sm absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left min-w-32">
                    <li @click="seeTargetedList('Books','Male')" class="p-2 hover:bg-gray-100 cursor-pointer">Men</li>
                    <li @click="seeTargetedList('Books','Female')" class="p-2 hover:bg-gray-100 cursor-pointer">Women</li>
                    <li @click="seeTargetedList('Books','Kids')" class="p-2 hover:bg-gray-100 cursor-pointer">Kids</li>
                  </ul>
                </li>
                <li  class="rounded-sm relative p-2 hover:bg-gray-100 cursor-pointer">
                  <button
                    class="w-full text-left flex items-center outline-none focus:outline-none"
                  >
                    <span class=" flex-1 "><button @click="seeLists('Sports')">Sports</button> </span>
                    <span class="mr-auto">
                      <svg
                        class="fill-current h-4 w-4
                        transition duration-150 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                        />
                      </svg>
                    </span>
                  </button>
                  <ul class="bg-white border rounded-sm absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left min-w-32">
                    <li @click="seeTargetedList('Sports','Men')" class="p-2 hover:bg-gray-100 cursor-pointer">Men</li>
                    <li @click="seeTargetedList('Sports','Women')" class="p-2 hover:bg-gray-100 cursor-pointer">Women</li>
                    <li @click="seeTargetedList('Sports','Kids')" class="p-2 hover:bg-gray-100 cursor-pointer">Kids</li>
                  </ul>
                </li>
                <li  class="rounded-sm relative p-2 hover:bg-gray-100 cursor-pointer">
                  <button
                    class="w-full text-left flex items-center outline-none focus:outline-none"
                  >
                    <span class=" flex-1 "><button @click="seeLists('Cosmetics')">Cosmetics</button> </span>
                    <span class="mr-auto">
                      <svg
                        class="fill-current h-4 w-4
                        transition duration-150 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                        />
                      </svg>
                    </span>
                  </button>
                  <ul class="bg-white border rounded-sm absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left min-w-32">
                    <li @click="seeTargetedList('Cosmetics','Male')" class="p-2 hover:bg-gray-100 cursor-pointer">Men</li>
                    <li @click="seeTargetedList('Cosmetics','Female')" class="p-2 hover:bg-gray-100 cursor-pointer">Women</li>
                    <li @click="seeTargetedList('Cosmetics','Kids')" class="p-2 hover:bg-gray-100 cursor-pointer">Kids</li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
          
        </ul>
        <ul class="md:hidden fixed right-4">
          <button
            class="block mr-0 r-5 items-end rounded focus:outline-none hover:bg-gray-2"
            @click="ToggleNav"
          >
            <div class="w-5 h-1 bg-white mb-1"></div>
            <div class="w-5 h-1 bg-white mb-1"></div>
            <div class="w-5 h-1 bg-white"></div>
          </button>
        </ul>
      </div>
    </div>
  </nav>
  <!-- <div
    id="dropdownHover"
    class="z-20 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
  >
    <ul
      class="py-2 text-sm text-gray-700 bg-transparent"
    >
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100">Settings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100">Earnings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100">Sign out</a>
      </li>
    </ul>
  </div> -->
 
  <ul
    class="font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm bg-transparent z-10"
    v-if="toggle"
  >
    <li>
      <a href="#" class="hover:box" aria-current="page"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover">HOME</a>
    </li>
    <li>
      <a href="#" class="hover:box">SHOP</a>
    </li>
    <li>
      <a href="#" class="hover:box">CONTACT US</a>
    </li>
    <li>
      <a href="#" class="hover:box">PRODUCT CATEGORY</a>
    </li>
  </ul>
  </div>
  
</template>
<script setup>
import { ref } from "vue";
import productCatagoryDropdowns from "./NavDropdowns.vue/productCatagoryDropdowns.vue";
import { useRouter } from 'vue-router';
const router = useRouter();
let toggle = ref(false);
function ToggleNav() {
  toggle.value = !toggle.value;
}



function seeLists(name) {
  router.push({ name: 'productCatagory', params: { name: name } });
}

function seeTargetedList(name,target){
  router.push({name:'productTarget',params:{name:name,target:target}})
}
</script>
<style scoped>
  /* since nested groupes are not supported we have to use 
     regular css for the nested dropdowns 
  */
  li>ul                 { transform: translatex(100%) scale(0) }
  li:hover>ul           { transform: translatex(101%) scale(1) }
  li > button svg       { transform: rotate(-90deg) }
  li:hover > button svg { transform: rotate(-270deg) }

  /* Below styles fake what can be achieved with the tailwind config
     you need to add the group-hover variant to scale and define your custom
     min width style.
  	 See https://codesandbox.io/s/tailwindcss-multilevel-dropdown-y91j7?file=/index.html
  	 for implementation with config file
  */
  .group:hover .group-hover\:scale-100 { transform: scale(1) }
  .group:hover .group-hover\:-rotate-180 { transform: rotate(180deg) }
  .scale-0 { transform: scale(0) }
  .min-w-32 { min-width: 8rem }
</style>