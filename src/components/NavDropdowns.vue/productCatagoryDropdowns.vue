<template>
  <ul class="py-2 text-sm text-gray-700 bg-transparent">
    <li data-dropdown-toggle="ElectronicsDropdown"
        data-dropdown-trigger="hover"
        @mouseover="showDropdown('ElectronicsDropdown')"
        @mouseleave="hideDropdown()" 
        class=" cursor-pointer ">
      <button
        @click="seeLists('Electronics')"
        class="block px-4 py-2 hover:bg-gray-100"
        
      >
        Electronics
      </button>
    </li>
    <li>
      <button @click="seeLists('Clothes')" class="block px-4 py-2 hover:bg-gray-100">Clothes</button>
    </li>
    <li>
      <button @click="seeLists('Shoes')" class="block px-4 py-2 hover:bg-gray-100">Shoes</button>
    </li>
    <li>
      <button @click="seeLists('Books')" class="block px-4 py-2 hover:bg-gray-100">Books</button>
    </li>
  </ul>

  <div
    id="ElectronicsDropdown"
    class="absolute z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 origin-top-left left-0 mt-2"
    style="top: 0; left: 100%;"
  >
    <ul class="py-2 text-sm text-gray-700 bg-transparent">
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100">Mobile</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100">Laptops</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100">Television</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100">Other Electronics</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function seeLists(name) {
  router.push({ name: 'productCatagory', params: { name: name } });
}

function showDropdown(dropdownId) {
  document.getElementById(dropdownId).classList.remove('hidden');
}


</script>
