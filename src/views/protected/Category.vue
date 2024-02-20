<!-- App.vue -->

<template>
	<div class="container mx-auto my-1">
		<h1 class="text-2xl font-bold mb-4 ml-6">Category Table</h1>
		<BaseModal :show="showModal" @close="close">
			<template v-slot:header>
				<div class="flex justify-between pb-3 mb-6">
					<h2 class="text-xl font-semibold">
						{{ modalTitle }}
					</h2>
					<button @click="close" class="text-red-500 hover:text-red-700 font-bold text-2xl">
						&times;
					</button>
				</div>
			</template>
			<template v-slot:body>
				<div>
					<form action="" class="w-full">
						<div class="-mx-3 mb-6">
							<div class="w-full px-3 mb-6 md:mb-0">
								<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-category-name">
									Category Name
								</label>
								<input
									class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									:class="$v.name.$error ? 'border-red-500' : 'border-gray-200'"
									v-model="editedItem.name" id="grid-category-name" type="text"
									placeholder="Enter category name">
								<p v-for="error in $v.name.$errors" :key="error.$uid" class="text-red-500 text-xs italic">{{error.$message}}</p>
							</div>
							<div class="my-6 w-full px-3">
								<label for="formFileLg"
									class="mb-2 inline-block uppercase text-xs font-bold text-gray-700 dark:text-neutral-200">Image</label>
								<input
									class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
									id="formFileLg" type="file" @change="handleFileChange" />
							</div>
						</div>
						<div class="w-full flex justify-end">
							<button
								class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
								type="button" @click="close">
								Cancel
							</button>
							<button
								class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
								type="button" @click="editedIndex == -1 ? saveCategory() : updateCategory()">
								{{ buttonName}}
							</button>
						</div>
					</form>
				</div>
			</template>
		</BaseModal>
		<!-- Confirm Modal for deletion -->
		<Confirm :show-confirm="showConfirm" @close="closeConfirm" @yesDelete="deleteCategory()" />
		<!-- Use the Table component with v-bind to pass data and columns -->
		<Table :columns="columns" :data="categoryData" button-text="Add New Category" @showModal="openModal"
			@edit="editItem" @delete="deleteItem" />
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


import Table from "../../components/BaseTable.vue";
import BaseModal from "../../components/BaseModalCAPI.vue";
import Confirm from "../../components/BaseConfirm.vue";
import Input from "../../components/form/BaseInput.vue";
import apiService from "../../services/apiService.js";

const showModal = ref(false);
const showConfirm = ref(false);
const editedIndex = ref(-1)
const editedItem = ref({ _id: null, name: '', image: '' })
const defaultValue = ref({ _id: null, name: '', image: '' })
const categoryData = ref([]);


const openModal = () => showModal.value = !showModal.value;
const close = () => {
	showModal.value = false;
	editedItem.value = defaultValue
	editedIndex.value = -1
	getAllCategories()
}
const closeConfirm = () => {
	showConfirm.value = false;
}
const editItem = (itemId) => {
	editedIndex.value = 1
	const userToEdit = categoryData.value.find(item => item._id === itemId);
	editedItem.value = { ...userToEdit }
	showModal.value = true
}
const deleteItem = (itemId) => {
	editedItem.value = itemId
	editedItem.value._id = itemId._id
	showConfirm.value = true
	console.log("showConfirm.value: ", showConfirm.value);
}
const handleFileChange = (e) => {
	editedItem.value.image = e.target.files[0]
	console.log("Selected File: ", editedItem.value.image);
}

const rules = computed(() => {
	return {
		name: { required}
	}
})

const $v = useVuelidate(rules, editedItem.value);

const saveCategory = async () => {
	const validationResult = await $v.value.$validate(); // returns true or false
	if (validationResult) {
		let formData = new FormData()
		formData.append('name', editedItem.value.name)
		formData.append('image', editedItem.value.image)
		console.log("Form data: ", formData);
		try {
			let response = await apiService.store('category', formData)
			console.log('Create category response: ', response);
			if (response.data.error == false) {
				showModal.value = false;
				toast.success(response.data.message)
				editedItem.value = ''
				getAllCategories()
			}
		} catch (error) {
			toast.error(error.response.data.message)
			console.log("error: ", error.response.data);
		}
	}
}
const updateCategory = async () => {
	let formData = new FormData()
	formData.append('name', editedItem.value.name)
	formData.append('image', editedItem.value.image)
	console.log("Form data: ", formData);
	try {
		let response = await apiService.update(`category/update/${editedItem.value._id}`, formData);
		if (response.data.error == false) {
			showModal.value = false
			editedItem.value = defaultValue.value
			editedIndex.value = -1
			toast.success(response.data.message)
			getAllCategories()
		}
		console.log("Response: ", response);
	} catch (error) {
		toast.error(error.response.data.message)
		console.log("Error: ", error.response.data);
	}
}

const deleteCategory = async () => {
	console.log("Category to be deleted: ", editedItem.value._id);
	try {
		let response = await apiService.delete(`category/delete/${editedItem.value._id}`)
		if (response.data.error == false) {
			showConfirm.value = false
			toast.success(response.data.message)
			getAllCategories()
		}
	} catch (error) {
		showConfirm.value = false
		toast.error(error.response.data.message)
	}
}

const getAllCategories = async () => {
	try {
		let response = await apiService.all('category')
		categoryData.value = response.data.data
		console.log("All users: ", response.data);
	} catch (error) {
		console.log("Error: ", error.response.data);
	}
}
const modalTitle = computed(() => editedIndex.value == -1 ? 'Add New Category' : 'Update Category')
const buttonName = computed(() => editedIndex.value == -1 ? 'Save' : 'Update')

onMounted(() => {
	getAllCategories()
})

const columns = ref([
	// TODO make the table accept objects by editing the BaseTable
	{ key: "_id", label: "ID" },
	{ key: "name", label: "Category Name" }
]);

</script>

<style>
/* Add your global styles here */
</style>
