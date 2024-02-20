<template>
    <div class="flex h-screen bg-gray-900 font-roboto">
        <TheSideBar v-show="showSidebar" />
        <!-- Backdrop -->
        <div @click="toggleSidebar" v-show="showSidebar"
            class="fixed z-10 inset-0 bg-gray-800 opacity-50 transition-opacity lg:hidden">
        </div>
        <!-- /Backdrop -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <TheAppBar @toggle-sidebar="toggleSidebar" />
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div class="container mx-auto px-6 py-4">
                    <router-view></router-view>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>

import { ref } from "vue";
import { RouterView } from "vue-router";
import TheAppBar from "../../components/TheAppBar.vue";
import TheSideBar from "../../components/TheSideBar.vue";

const showSidebar = ref(true)

const toggleSidebar = () => showSidebar.value = !showSidebar.value

</script>

<style scoped></style>