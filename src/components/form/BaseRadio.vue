<template>
        <input type="radio" :checked="modelValue === value" :value="value" @change="$emit('update:modelValue', value)" v-bind="$attrs" class="mr-2 font-semibold">
        <label v-if="label" class="font-semibold">{{ label }}</label>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        default: ''
    },
    modelValue: {
        type: [String, Number, Boolean],
        default: ''
    },
    value: {
        type: [String, Number, Boolean],
        required: true
    }
})
</script>

<style scoped></style>