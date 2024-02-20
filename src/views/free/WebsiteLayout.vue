<template>
    <div class=" bg-gray-200">
        <div class=" fixed right-0 top-0 left-0 md:mx-10 z-20">
        <NavBar />
        <SecondNav class=" max-md:hidden " /> 
        </div>
        <div class="z-0 mt-32 mb-10 md:ml-16 md:mr-16 mx-2">
          <RouterView />
        </div> 
        <div class="bottom-0 md:mx-10 ">
          <footer1 />
        </div>
      </div>
</template>

<script setup>
import NavBar from "../../components/NavBar.vue";
import SecondNav from "../../components/SecondNav.vue";
import footer1 from "../../components/footer.vue";

</script>

<style scoped>

</style>