<!-- ParentComponent.vue -->

<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">Icon Examples</h1>

        <Icon type="default" size="lg" color="blue-500" />

        <Icon type="default" size="sm" color="red-500" />

        <Icon type="custom" size="xl" color="green-500" customIconClasses="w-8 h-8">
            <!-- Content for custom icon -->
            <circle cx="12" cy="12" r="10" stroke="black" stroke-width="2" fill="white" />
        </Icon>
    </div>
</template>

<script>
import Icon from '@/components/Icon.vue'; // Adjust the path based on your project structure

export default {
    components: {
        Icon,
    },
};
</script>

<style>
/* Add your custom styles or TailwindCSS classes here */
</style>
