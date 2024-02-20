<!-- Icon.vue -->

<template>
    <div :class="iconClasses">
        <svg v-if="isCustomIcon" :class="customIconClasses" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <slot></slot>
        </svg>
        <i v-else :class="defaultIconClasses"></i>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    props: {
        type: {
            type: String,
            default: 'default', // 'default' or 'custom'
        },
        size: {
            type: String,
            default: 'md', // 'sm', 'md', 'lg', etc.
        },
        color: {
            type: String,
            default: 'currentColor',
        },
        customIconClasses: {
            type: String,
            default: '', // Add custom classes for custom icons
        },
    },
    setup(props) {
        const isCustomIcon = computed(() => props.type === 'custom');

        const iconClasses = computed(() => {
            return {
                'text-sm': props.size === 'sm',
                'text-lg': props.size === 'lg',
                'text-xl': props.size === 'xl',
                [`text-${props.color}`]: true,
            };
        });

        const defaultIconClasses = computed(() => {
            return {
                'text-sm': props.size === 'sm',
                'text-lg': props.size === 'lg',
                'text-xl': props.size === 'xl',
                'text-gray-600': true, // Default color for default icons
            };
        });

        return {
            isCustomIcon,
            iconClasses,
            defaultIconClasses,
        };
    },
};
</script>

<style scoped>
/* Add your custom styles or TailwindCSS classes here */
</style>
