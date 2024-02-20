<!-- Icon.vue -->

<template>
    <span class="inline-flex items-center" :class="sizeClass">
        <svg v-if="icon" class="fill-current" :class="iconClasses" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <use :href="'#icon-' + icon"></use>
        </svg>
        <slot></slot>
    </span>
</template>

<script setup>
const props = defineProps(['icon', 'size']);

const sizeClass = computed(() => {
    return {
        'text-xs': props.size === 'xs',
        'text-sm': props.size === 'sm',
        'text-lg': props.size === 'lg',
        'text-xl': props.size === 'xl',
    };
});

const iconClasses = computed(() => {
    return {
        'h-4 w-4': props.size === 'xs',
        'h-5 w-5': props.size === 'sm',
        'h-8 w-8': props.size === 'lg',
        'h-10 w-10': props.size === 'xl',
    };
});
</script>

<style scoped>
/* Add your custom styles or TailwindCSS classes here */
</style>
