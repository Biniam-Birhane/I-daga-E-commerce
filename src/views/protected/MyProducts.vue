<!-- App.vue -->

<template>
	<div class="container mx-auto my-1">
		<h1 class="text-2xl font-bold mb-4 ml-6">My Products Table</h1>
		<!-- Modal For Adding and Updating Products -->
		<BaseModal :show="showModal" @close="closeModal">
			<template v-slot:header>
				<div class="flex justify-between pb-3 mb-6">
					<h2 class="text-xl font-semibold">
						{{ modalTitle }}
					</h2>
					<button @click="closeModal" class="text-red-500 hover:text-red-700 font-bold text-2xl">
						&times;
					</button>
				</div>
			</template>
			<template v-slot:body>
				<div>
					<form class="w-full">
						<div class="flex flex-wrap -mx-3 mb-6">
							<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-product-name">
									Product Name
								</label>
								<input
									class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									v-model="editedItem.productName" id="grid-product-name" type="text"
									placeholder="Enter your product name">
								<p v-for="error in $v.productName.$errors" :key="error.$uid" class="text-red-500 text-xs italic">
										{{error.$message}}</p>
							</div>
							<div class="w-full md:w-1/2 px-3">
								<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-brand">
									Product Brand
								</label>
								<input
									class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									v-model="editedItem.brand" id="grid-brand" type="text"
									placeholder="Enter product brand">
									<p v-for="error in $v.brand.$errors" :key="error.$uid" class="text-red-500 text-xs italic">
										{{error.$message}}</p>
							</div>
						</div>
						<div class="flex flex-wrap -mx-3 mb-6">
							<div class="w-full md:w-1/3 px-3">
								<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-price">
									Price
								</label>
								<input
									class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									v-model="editedItem.price" id="grid-price" type="number"
									placeholder="Enter product price">
								<p v-for="error in $v.price.$errors" :key="error.$uid" class="text-red-500 text-xs italic">
										{{error.$message}}</p>
							</div>
							<div class="w-full md:w-1/3 px-3">
								<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-quantity">
									Quantity
								</label>
								<input
									class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									v-model="editedItem.quantity" id="grid-quantity" type="number"
									placeholder="Enter product quantity">
									<p v-for="error in $v.quantity.$errors" :key="error.$uid" class="text-red-500 text-xs italic">
										{{error.$message}}</p>
							</div>
							<div class="w-full md:w-1/3 px-3">
								<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-date">
									Production Date
								</label>
								<input
									class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									v-model="editedItem.productionDate" id="grid-date" type="date"
									placeholder="Enter product price">
								<p v-for="error in $v.productionDate.$errors" :key="error.$uid" class="text-red-500 text-xs italic">
										{{error.$message}}</p>
							</div>
						</div>
						<div class="flex flex-wrap -mx-3 mb-2">
							<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
								<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-category">
									Select a Category
								</label>
								<div class="relative">
									<select
										class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="grid-category" v-model="editedItem.categoryId">
										<option v-for="category in categories" :key="category._id" :value="category._id">{{
											category.name }}
										</option>
									</select>
									<div
										class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
										<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20">
											<path
												d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
										</svg>
									</div>
								</div>
							</div>
							<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
								<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-target">
									Select a Target
								</label>
								<div class="relative">
									<select
										class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="grid-target" v-model="editedItem.target">
										<option v-for="target in targets" :key="target.id" :value="target.name">{{
											target.name }}
										</option>
									</select>
									<div
										class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
										<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20">
											<path
												d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
										</svg>
									</div>
								</div>
							</div>
							<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
								<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-photo">
									Photo
								</label>
								<input
									class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
									id="grid-photo" type="file" @change="handleFileChange" />
								<p v-for="error in $v.image.$errors" :key="error.$uid" class="text-red-500 text-xs italic">
									{{error.$message}}</p>
							</div>
						</div>
						<div class="flex flex-wrap -mx-3 mb-6">
							<div class="w-full md:w-1/2 px-3">
								<span class="font-semibold text-gray-700 mr-4">Is Available?</span>
								<RadioGroup :options="availabilityOptions" v-model="editedItem.isAvailable"
									name="availability" @update:modelValue="handleAvailabilityChange" />
								<p class="text-gray-600 text-xs italic"></p>
							</div>
							<div class="w-full md:w-1/2 px-3">
								<span class="font-semibold text-gray-700 mr-4">Is Featured?</span>
								<RadioGroup :options="featuredOptions" v-model="editedItem.isFeatured" name="feature"
									@update:modelValue="handleFeaturedChange" />
								<!-- <p class="text-gray-600 text-xs italic">For Error Handling</p> -->
							</div>
						</div>
						<div class="flex flex-wrap -mx-3 mb-6">
							<div class="w-full md:w-9/12 px-3 mb-6 md:mb-0">
								<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-product-name">
									Product Description
								</label>
								<textarea v-model="editedItem.description" name="textarea-name" rows="5"
									placeholder="Write some desctiption about this product here... You can make it as long as you like."
									class="focus:shadow-soft-primary-outline min-h-unset text-sm leading-5.6 ease-soft block h-auto w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"></textarea>
							</div>
						</div>

						<div class="w-full flex justify-end">
							<button
								class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
								type="button" @click="closeModal">
								Cancel
							</button>
							<button
								class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
								type="button" @click="editedIndex == -1 ? saveProduct() : updateProduct()">
								{{ buttonName}}
							</button>
						</div>
					</form>
				</div>
			</template>
		</BaseModal>
		<!-- Confirm Modal for deletion -->
		<Confirm :show-confirm="showConfirm" @close="closeConfirm" @yesDelete="deleteProduct()" />
		<!-- Use the Table component with v-bind to pass data and columns -->
		<Table :columns="columns" :data="products" button-text="Add New Product" @showModal="openModal" @edit="editItem"
			@delete="deleteItem" @item-detail="goTodetail" />
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


import Table from "../../components/BaseTable.vue";
import Confirm from "../../components/BaseConfirm.vue";
import BaseModal from "../../components/BaseModalCAPI.vue";
import Input from "../../components/form/BaseInput.vue";
import Select from "../../components/form/BaseSelect.vue";
import RadioGroup from "../../components/form/BaseRadioGroup.vue";
import apiService from "../../services/apiService.js";

const router = useRouter()
const showModal = ref(false);
const showConfirm = ref(false);
const editedIndex = ref(-1);
const editedItem = ref({ _id: null, productName: '', categoryId: null, description: '', price: null, brand: '', target: '', productionDate: null, image: '', quantity: null, isFeatured: '', isAvailable: '' })
const defaultValue = ref({ _id: null, productName: '', categoryId: null, description: '', price: null, brand: '', target: '', productionDate: null, image: '', quantity: null, isFeatured: '', isAvailable: '' })

const products = ref([])
const openModal = () => {
	showModal.value = !showModal.value;
};
const closeModal = () => {
	showModal.value = false;
	editedItem.value = defaultValue
	editedIndex.value = -1
}
const closeConfirm = () => {
	showConfirm.value = false;
}
const editItem = (itemId) => {
	editedIndex.value = 1
	console.log("editedIndex: ", editedIndex.value);
	const userToEdit = products.value.find(item => item._id === itemId);
	editedItem.value = { ...userToEdit }
	console.log("Product to be updated: ", editedItem.value);
	showModal.value = true
}
const deleteItem = (itemId) => {
	editedItem.value = itemId
	editedItem.value._id = itemId._id
	showConfirm.value = true
	console.log("showConfirm.value: ", showConfirm.value);
}
const goTodetail = (itemId) => {
	console.log("Item detail: ", itemId);
	let user = JSON.parse(localStorage.getItem('user'))
	router.push({ name: 'MyProductDetail', params: { id: user._id, productId: itemId } })
}
const handleFileChange = (e) => {
	editedItem.value.image = e.target.files[0]
	console.log("Selected File: ", editedItem.value.image);
}
const categories = ref([])
const targets = computed(() => {
	let target = [
		{ id: "1", name: "Male" },
		{ id: "2", name: "Female" },
		{ id: "3", name: "Kids" },
		{ id: "4", name: "All" }
	]

	return target
})
const availabilityOptions = ref([
	{ label: 'Yes', value: 'Yes' },
	{ label: 'No', value: 'No' }
])
const featuredOptions = ref([
	{ label: 'Yes', value: 'Yes' },
	{ label: 'No', value: 'No' }
])
const handleAvailabilityChange = (e) => {
	editedItem.value.isAvailable = e
	console.log("Is Available?: ", editedItem.value.isAvailable);
}
const handleFeaturedChange = (e) => {
	editedItem.value.isFeatured = e
	console.log("Is Featured?: ", editedItem.value.isFeatured);
}
const modalTitle = computed(() => editedIndex.value == -1 ? 'Add New Product' : 'Update Product')
const buttonName = computed(() => editedIndex.value == -1 ? 'Save' : 'Update')

const rules = computed(() => {
	return {
		productName: { required },
		brand: { required },
		price: { required },
		quantity: { required },
		productionDate: { required },
		image: { required }
	}
})

const $v = useVuelidate(rules, editedItem.value);

const saveProduct = async () => {
	const validationResult = await $v.value.$validate();
	if (validationResult) {
		let user = JSON.parse(localStorage.getItem('user'))
		let formData = new FormData()
		formData.append('productName', editedItem.value.productName)
		formData.append('image', editedItem.value.image)
		formData.append('description', editedItem.value.description)
		formData.append('productOwner', user._id)
		formData.append('price', editedItem.value.price)
		formData.append('brand', editedItem.value.brand)
		formData.append('categoryId', editedItem.value.categoryId)
		formData.append('target', editedItem.value.target)
		formData.append('productionDate', editedItem.value.productionDate)
		formData.append('quantity', editedItem.value.quantity)
		formData.append('isFeatured', editedItem.value.isFeatured)
		formData.append('isAvailable', editedItem.value.isAvailable)
		try {
			console.log("Data to be saved: ", formData);
			console.log("User Id: ", user._id);
			let response = await apiService.store('products/addproduct', formData);
			if (response.data.error == false) {
				editedItem.value = defaultValue.value
				showModal.value = false
				toast.success(response.data.message, {
					// onTime: 1000,
					// position: center
				})
				getMyProducts()
			}
			console.log("Create response: ", response.data);
		} catch (error) {
			console.log("add product Error: ", error.response.data.message);
			toast.error(error.response.data.message)
		}
	}
}
const updateProduct = async () => {

	let user = JSON.parse(localStorage.getItem('user'))

	let formData = new FormData()
	formData.append('productName', editedItem.value.productName)
	formData.append('image', editedItem.value.image)
	formData.append('description', editedItem.value.description)
	formData.append('productOwner', user._id)
	formData.append('price', editedItem.value.price)
	formData.append('brand', editedItem.value.brand)
	formData.append('categoryId', editedItem.value.categoryId)
	formData.append('target', editedItem.value.target)
	formData.append('productionDate', editedItem.value.productionDate)
	formData.append('quantity', editedItem.value.quantity)
	formData.append('isFeatured', editedItem.value.isFeatured)
	formData.append('isAvailable', editedItem.value.isAvailable)
	console.log("Updated product: ", formData);

	try {
		let response = await apiService.update(`products/update/${editedItem.value._id}`, formData);
		if (response.data.error == false) {
			showModal.value = false
			editedItem.value = defaultValue.value
			editedIndex.value = -1
			toast.success(response.data.message, {
				// onTime: 1000
			})
			getMyProducts()
		}
		console.log("Update response: ", response);
	} catch (error) {
		console.log("Error: ", error.response.data.message);
		toast.error(error.response.data.message, {
			// set time
		})
	}
}
const deleteProduct = async () => {
	console.log("Product to be deleted: ", editedItem.value._id);
	try {
		let response = await apiService.delete(`products/delete/${editedItem.value._id}`)
		if (response.data.error == false) {
			showConfirm.value = false
			toast.success(response.data.message)
			getMyProducts()
		}
	} catch (error) {
		showConfirm.value = false
		toast.error(error.response.data.message)
	}
}
const getMyProducts = async () => {
	let loggedInUser = JSON.parse(localStorage.getItem('user'))
	try {
		let response = await apiService.all(`products/getbyowner/${loggedInUser._id}`)
		products.value = response.data.data
		console.log("Get all products of a particular user response: ", response.data);
	} catch (error) {
		toast
		console.log("Error: ", error.response.data.message);
	}
}

const getCategories = async () => {
	try {
		let res = await apiService.all('category')
		console.log("Category res.data: ", res.data);
		categories.value = res.data.data;
		console.log("Categories: ", categories.value);
	} catch (error) {
		toast.error(error.response.data.message)
	}
	// return res.data
}

onMounted(() => {
	getMyProducts(),
		getCategories()
})
const columns = ref([
	{ key: "productName", label: "Product Name" },
	{ key: "brand", label: "Brand" },
	{ key: "categoryId.name", label: "Category" },
	{ key: "productOwner.firstName", label: "Owner" },
	{ key: "target", label: "Target" },
	// { key: "productionDate", label: "Production Date" },
	{ key: "quantity", label: "Quantity" },
	{ key: "price", label: "Price" },
	{ key: "isAvailable", label: "Available?" },
	// { key: "isFeatured", label: "Featured?" },
]);

// const userData = ref([
// ]);
</script>

<style>
/* Add your global styles here */
</style>
