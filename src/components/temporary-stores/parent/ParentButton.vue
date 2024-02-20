<!-- App.vue -->

<template>
    <div class="container mx-auto my-8">
        <h1 class="text-2xl font-bold mb-4">Parent Component with BaseButton</h1>

        <!-- Use the BaseButton component with v-bind to pass label and disabled props -->
        <BaseButton label="Click me" @click="handleButtonClick" :disabled="isButtonDisabled" />
    </div>
</template>

<script setup>
import BaseButton from './components/BaseButton.vue';

// Data and methods for the parent component
const isButtonDisabled = ref(false);

const handleButtonClick = () => {
    console.log('Button clicked!');
    // Add your button click logic here
};
</script>

<style>
/* Add your global styles here */
</style>
