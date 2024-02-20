<template>
    <div>
        <label v-if="label" class="font-semibold text-gray-700"> {{ label }} </label>
        <select :value="modelValue"
            v-bind="{ ...$attrs, onChange: (event) => { $emit('update:modelValue', event.target.value) } }" class="shadow w-44 mt-2 mb-2 block border rounded-md py-2 px-3 focus:outline-sky-500 text-gray-700">
            <option v-for="option in options" :value="option" :key="option" :selected="option === modelValue" class="p-1">{{ option }}</option>
        </select>
    </div>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        default: ''
    },
    optionLabels: {
        type: String,
        default: ''
    },
    modelValue: {
        type: [String, Number],
        default: ''
    },
    options: {
        type: Array,
        required: true
    }
})
</script>

<style scoped></style>