<template>
	<div>
		<label :for="uuid" class="font-semibold text-gray-700">{{ label }}</label>
		<input
			v-bind="$attrs"
			:id="uuid"
			:value="modelValue"
			:aria-describedby="error ? `${uuid}-error` : null"
			:aria-invalid="error ? true : null"
			@input="$emit('update:modelValue', $event.target.value)"
			class="shadow mt-2 mb-2 block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-sky-500 focus:shadow-outline"
		/>
		<p v-if="error" :id="`${uuid}-error`" aria-live="assertive" class="text-red-500 p-1">{{ error }}</p>
	</div>
</template>

<script setup>
	import uniqueID from "../../features/uniqueID.js";
	defineProps({
		label: {
			type: String,
			default: "",
		},
		modelValue: {
		type: [String, Number, Object]
	},
		error: {
			type: String,
			default: "",
		},
	});

	const uuid = uniqueID.getID;
</script>

<style scoped></style>
