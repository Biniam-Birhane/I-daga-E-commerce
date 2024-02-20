<!-- ParentComponent.vue -->

<template>
    <div>
        <button @click="openModal" class="bg-blue-500 text-white px-4 py-2 rounded">
            Open Modal
        </button>

        <ModalComponent v-if="isModalOpen" @closeModal="closeModal">
            <!-- Content for the modal goes here -->
            <h2 class="text-2xl font-bold mb-4">Modal Content</h2>
            <p>This is the content of the modal.</p>
        </ModalComponent>
    </div>
</template>

<script setup>
import ModalComponent from '@/components/ModalComponent.vue'; // Adjust the path based on your project structure
import { ref } from 'vue';

const isModalOpen = ref(false);

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};
</script>

<style>
/* Add your custom styles or TailwindCSS classes here */
</style>
