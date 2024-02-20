<!-- ParentComponent.vue -->

<template>
    <div>
        <button @click="openModal" class="bg-blue-500 text-white px-4 py-2 rounded">Open Modal</button>

        <Modal :isOpen="modalOpen" @onConfirm="handleConfirm" @onClose="handleClose">
            <!-- Content for the modal -->
            <p class="text-lg">Are you sure you want to perform this action?</p>
        </Modal>
    </div>
</template>

<script>
import { ref } from 'vue';
import Modal from '@/components/Modal.vue'; // Adjust the path based on your project structure

export default {
    components: {
        Modal,
    },
    data() {
        return {
            modalOpen: false,
        };
    },
    methods: {
        openModal() {
            this.modalOpen = true;
        },
        handleConfirm() {
            console.log('Confirmed');
            // Add your logic for handling confirmation
        },
        handleClose() {
            console.log('Closed');
            // Add your logic for handling closure
            this.modalOpen = false;
        },
    },
};
</script>

<style>
/* Add your custom styles or TailwindCSS classes here */
</style>
