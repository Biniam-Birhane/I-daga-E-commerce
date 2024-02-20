<!-- BaseButton.vue -->

<template>
    <button :class="computedClasses" @click="handleClick" :disabled="disabled">
        {{ label }}
    </button>
</template>

<script setup>
import { ref, computed } from 'vue';

// Props
const props = defineProps(['label', 'disabled']);

// Computed classes for the button
const computedClasses = computed(() => {
    return [
        'py-2 px-4 rounded',
        disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white',
    ];
});

// Click event handler
const handleClick = () => {
    if (!disabled) {
        emit('click');
    }
};
</script>

<style scoped>
/* Add your custom styles or use TailwindCSS classes */
</style>
