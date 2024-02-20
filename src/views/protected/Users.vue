<!-- App.vue -->

<template>
	<div class="container mx-auto my-1">
		<h1 class="text-2xl font-bold mb-4 ml-6">Users Table</h1>
		<!-- Modal for create and update -->
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
							<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
								<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-first-name">
									First Name
								</label>
								<input
									class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									:class="$v.firstName.$error ? 'border-red-500' : 'border-gray-200'"
									v-model="editedItem.firstName" id="grid-first-name" type="text"
									placeholder="Enter first name">
								<p v-for="error in $v.firstName.$errors" :key="error.$uid" class="text-red-500 text-xs italic">{{error.$message}}</p>
							</div>
							<div class="w-full md:w-1/3 px-3">
								<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-last-name">
									Last Name
								</label>
								<input
									class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									:class="$v.lastName.$error ? 'border-red-500' : 'border-gray-200'"
									v-model="editedItem.lastName" id="grid-last-name" type="text" placeholder="Enter last name">
									<p v-for="error in $v.lastName.$errors" :key="error.$uid" class="text-red-500 text-xs italic">{{error.$message}}</p>
							</div>
							<div class="w-full md:w-1/3 px-3">
								<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-phone">
									Phone Number
								</label>
								<input
									class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									:class="$v.mobileNumber.$error ? 'border-red-500' : 'border-gray-200'"
									v-model="editedItem.mobileNumber" id="grid-phone" type="number"
									placeholder="Enter phone number">
									<p v-for="error in $v.mobileNumber.$errors" :key="error.$uid" class="text-red-500 text-xs italic">{{error.$message}}</p>
							</div>
						</div>
						<div class="flex flex-wrap -mx-3 mb-6">
							<div class="w-full md:w-1/2 px-3">
								<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-email">
									Email
								</label>
								<input
									class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									:class="$v.email.$error ? 'border-red-500' : 'border-gray-200'"
									v-model="editedItem.email" id="grid-email" type="email"
									placeholder="Enter email">
								<p class="text-gray-600 text-xs italic"></p>
								<p v-for="error in $v.email.$errors" :key="error.$uid" class="text-red-500 text-xs italic">{{error.$message}}</p>
							</div>
							<div v-if="editedIndex == -1" class="w-full md:w-1/2 px-3">
								<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-password">
									Password
								</label>
								<input
									class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									:class="$v.password.$error ? 'border-red-500' : 'border-gray-200'"
									v-model="editedItem.password" id="grid-password" type="password"
									placeholder="******************">
								<p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
								<p v-for="error in $v.password.$errors" :key="error.$uid" class="text-red-500 text-xs italic">{{error.$message}}</p>
							</div>
						</div>
						<div class="flex flex-wrap -mx-3 mb-2">
							<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-role">
									Select a Role
								</label>
								<div class="relative">
									<select
										class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										:class="$v.role.$error ? 'border-red-500' : 'border-gray-200'"
										id="grid-role" v-model="editedItem.role">
										<option v-for="role in roles" :key="role.id" :value="role.value">{{ role.name }}
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
									<p v-for="error in $v.role.$errors" :key="error.$uid" class="text-red-500 text-xs italic">{{error.$message}}</p>
								</div>
							</div>
							<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-photo">
									Photo
								</label>
								<input
										class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
										id="grid-photo" type="file" @change="handleFileChange" />
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
								type="button" @click="editedIndex == -1 ? saveUser() : updateUser()">
								{{ buttonName}}
							</button>
						</div>
					</form>
				</div>
			</template>
		</BaseModal>
		<!-- Confirm delete modal -->
		<Confirm :show-confirm="showConfirm" @close="closeConfirm" @yesDelete="deleteUser()" />
		<!-- Use the Table component with v-bind to pass data and columns -->
		<Table :columns="columns" :data="userData" button-text="Add New User" @showModal="openModal" @edit="editItem" @delete="deleteItem" @item-detail="goToDetail">
			<template #photo-header>
		        Photo
		      </template>
			<template v-slot:photo-data="{ item }">
	        <!-- Customize the image display here -->
	        <img :src="imageUrl(item.profilePic)" alt="Image" class="w-12 h-12 object-cover rounded-full mr-2">
	      </template>
		</Table>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router';
import Table from "../../components/BaseTable.vue";
import BaseModal from "../../components/BaseModalCAPI.vue";
import Confirm from "../../components/BaseConfirm.vue";
// import Input from "../../components/form/BaseInput.vue";
// import Select from "../../components/form/BaseSelect.vue";
import apiService from "../../services/apiService.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import imageUrl from "../../services/baseImageUrl";

const router = useRouter()
const showModal = ref(false)
const showConfirm = ref(false)
const editedIndex = ref(-1)
const editedItem = ref({ _id: null, firstName: '', lastName: '', email: '', password: '', role: '', mobileNumber: null, profilePic: '' })
const defaultValue = ref({ _id: null, firstName: '', lastName: '', email: '', password: '', role: '', mobileNumber: null, profilePic: '' })
const roles = ref([
	{ name: 'Admin', value: 'Admin' },
	{ name: 'User', value: 'User' }
])
// const selectedFile = ref(null)

const openModal = () => showModal.value = !showModal.value;
const closeModal = () => {
	showModal.value = false;
	editedItem.value = defaultValue.value
	editedIndex.value = -1
}
const closeConfirm = () => {
	showConfirm.value = false
}
const editItem = (itemId) => {
	editedIndex.value = 1
	const userToEdit = userData.value.find(item => item._id === itemId);
	editedItem.value = { ...userToEdit }
	console.log("edited Item: ", editedItem.value);
	showModal.value = true
}
const deleteItem = (itemId) => {
	editedItem.value = itemId
	// editedItem.value = itemId._id
	showConfirm.value = true
}
const goToDetail = (itemId) => {
	router.push({ name: 'UserDetail', params: { id: itemId } })
}
const handleFileChange = (e) => {
	editedItem.value.profilePic = e.target.files[0]
	console.log("Selected File: ", editedItem.value.profilePic);
}
// custom validation
// const upperCase = (v) => {
// 	//TODO eventhough this returns an error, the error message is empty. Work on how to set the error message value
// 	return v.charAt(0).uppercase()
// }
const rules = computed(() => {
	return {
		firstName: { required, /*upperCase*/ },
		lastName: { required },
		mobileNumber: { required },
		email: { required, email },
		password: { required, minLength: minLength(6) },
		role: { required },
		// Add more validations as needed
	}
})  
// Vuelidate setup
const $v = useVuelidate( rules, editedItem.value);

const saveUser = async () => {
	const validationResult = await $v.value.$validate(); // returns true or false
	if (validationResult) {
		let formData = new FormData()
		formData.append('profilePic', editedItem.value.profilePic)
		formData.append('firstName', editedItem.value.firstName)
		formData.append('lastName', editedItem.value.lastName)
		formData.append('email', editedItem.value.email)
		formData.append('password', editedItem.value.password)
		formData.append('mobileNumber', editedItem.value.mobileNumber)
		formData.append('role', editedItem.value.role)
		console.log("Form data: ", formData);
		try {
			let response = await apiService.store('users/adduser', formData)
			console.log('Create user response: ', response.data);
			if (response.data.error == false) {
				editedItem.value = defaultValue.value
				showModal.value = false;
				toast.success(response.data.message)
				getAllUsers()
			}
		} catch (error) {
			toast.error(error.response.data.message)
			console.log("error: ", error.response.data);
		}
	} else {
		// alert("Failure, form not submitted")
	}
	
}
const updateUser = async () => {
	let formData = new FormData()
	formData.append('profilePic', editedItem.value.profilePic)
	formData.append('firstName', editedItem.value.firstName)
	formData.append('lastName', editedItem.value.lastName)
	formData.append('email', editedItem.value.email)
	formData.append('role', editedItem.value.role)
	formData.append('mobileNumber', editedItem.value.mobileNumber)
	console.log('User ID to be edited: ', editedItem.value._id);

	try {
		let response = await apiService.update(`users/update/${editedItem.value._id}`, formData);
		if (response.data.error == false) {
			showModal.value = false
			editedItem.value = defaultValue.value
			editedIndex.value = -1
			toast.success(response.data.message)
			getAllUsers()
		}
	} catch (error) {
		toast.error(error.response.data.message)
		console.log("Error: ", error.response.data);
	}
}
const deleteUser = async () => {
	try {
		let response = await apiService.delete(`users/delete/${editedItem.value._id}`)
		showConfirm.value = false
		toast.success(response.data.message)
		getAllUsers()
	} catch (error) {
		toast.error(error.response.data.message)
		showConfirm.value = false
	}
}

const getAllUsers = async () => {
	try {
		let response = await apiService.all('users')
		userData.value = response.data.data
		console.log("All users: ", response.data);
	} catch (error) {
		console.log("Error: ", error.response.data);
	}
}
const modalTitle = computed(() => editedIndex.value == -1 ? 'Add New User' : 'Update User')
const buttonName = computed(() => editedIndex.value == -1 ? 'Save' : 'Update')

onMounted(() => {
	getAllUsers()
})

const columns = ref([
	// TODO make the table accept objects by editing the BaseTable
	// { key: "_id", label: "ID" },
	// { key: "profilePic", label: "Photo" },
	{ key: "firstName", label: "First Name" },
	{ key: "lastName", label: "Last Name" },
	{ key: "email", label: "Email" },
	{ key: "mobileNumber", label: "Phone" },
	{ key: "role", label: "Role" },
]);

const userData = ref([]);
</script>

<style>/* Add your global styles here */</style>
