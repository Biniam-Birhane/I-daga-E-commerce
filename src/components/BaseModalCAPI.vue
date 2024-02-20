<!-- ModalComponent.vue -->

<template>
	<div
		v-if="show"
		class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-auto"
	>
		<div class="bg-white px-8 py-5 rounded shadow-md max-w-4xl mx-auto mt-8">
			<button
				@click="close"
				class="absolute top-4 right-4 text-white hover:text-gray-700 font-bold text-2xl"
			>
				&times;
			</button>
			<slot name="header">default header</slot>
			<slot name="body">default body</slot>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		show: Boolean,
	});
	const emit = defineEmits(['close'])
const close = () => {
		emit('close')
	}
</script>

<style scoped>
	/* Add your custom styles or TailwindCSS classes here */
</style>
