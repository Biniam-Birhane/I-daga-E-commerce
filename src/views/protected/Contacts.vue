<!-- App.vue -->

<template>
	<div class="container mx-auto my-1">
		<h1 class="text-2xl font-bold mb-4 ml-6">Contacts Table</h1>
		<!-- Confirm Modal for deletion -->
		<Confirm :show-confirm="showConfirm" @close="closeConfirm" @yesDelete="deleteContact()" />
		<!-- Use the Table component with v-bind to pass data and columns -->
		<Table :columns="columns" :data="contactData" @showModal="openModal" @edit="editItem" @delete="deleteItem" @item-detail="goTodetail" />
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import Table from "../../components/BaseTable.vue";
import Confirm from "../../components/BaseConfirm.vue";
import apiService from "../../services/apiService";

const router = useRouter()
const showConfirm = ref(false);
const editedIndex = ref(-1)
const editedItem = ref({ _id: null, name: '', email: '', feedback: '',  })
const defaultValue = ref({ _id: null, name: '', email: '', feedback: '',  })
const contactData = ref([])

const openModal = () => showModal.value = !showModal.value;

const closeConfirm = () => {
	showConfirm.value = false;
}
const editItem = (itemId) => {
	editedIndex.value = 1
	const userToEdit = contactData.value.find(item => item.id === itemId);
	editedItem.value = { ...userToEdit }
	showModal.value = true
}
const deleteItem = (itemId) => {
	editedItem.value = itemId
	editedItem.value._id = itemId._id
	showConfirm.value = true
}
const goTodetail = (itemId) => {
	router.push({ name: 'ContactDetail', params: { id: itemId } })
}

const getAllContacts = async () => {
	try {
		let response = await apiService.all('feedback')
		contactData.value = response.data.data
		console.log("All contacts: ", response.data);
	} catch (error) {
		console.log("Error: ", error);
	}
}

const deleteContact = async () => {
	console.log("Product to be deleted: ", editedItem.value._id);
	try {
		let response = await apiService.delete(`feedback/${editedItem.value._id}`)
		if (response.data.error == false) {
			showConfirm.value = false
			toast.success(response.data.message)
			getAllContacts()
		}
	} catch (error) {
		showConfirm.value = false
		console.log("error: ", error);
		toast.error(error.response.data.message)
	}
}

onMounted(() => {
	getAllContacts()
})

const columns = ref([
	// { key: "_id", label: "ID" },
	{ key: "name", label: "Name" },
	{ key: "email", label: "Email" },
	{ key: "feedback", label: "Feedback" }
]);

</script>

<style>
/* Add your global styles here */
</style>
