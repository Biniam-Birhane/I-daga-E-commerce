<!-- ParentComponent.vue -->

<template>
    <div>
        <Icon icon="heart" size="sm" class="text-red-500" />
        <Icon icon="star" size="lg" class="text-yellow-500" />
        <Icon icon="check" size="xl" class="text-green-500">
            <!-- You can add additional content or customization here -->
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
