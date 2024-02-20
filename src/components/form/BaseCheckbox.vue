<template>
    <input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)">
    <label v-if="label"> {{ label }} </label>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        default: ''
    },
    modelValue: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped></style>