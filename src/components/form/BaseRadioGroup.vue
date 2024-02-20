<template>
    <component v-for="option in options" :key="option.value" :is="vertical ? 'div' : 'span' " :class="{ horizontal: !vertical }">

        <Radio :label="option.label" :value="option.value" :name="name"
            :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)" />
    </component>
</template>

<script setup>
import Radio from "../../components/form/BaseRadio.vue";

defineProps({
    options: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    modelValue: {
        type: [String, Number, Boolean],
        required: true
    },
    vertical: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped>
.horizontal {
    margin-right: 20px;
}
</style>