
<template>
	<div class="container mx-auto my-1">
		<h1 class="text-2xl font-bold mb-4 ml-6">Payment Options Table</h1>
		<!-- Modal For Adding and Updating Products -->
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
						<div class="mb-6 w-full">
							<div class="w-full columns-3 px-3 mb-6 md:mb-0">
								<Input type="text" v-model="editedItem.bankName" label="Bank Name"
									placeholder="Enter  bank name" />
								<Input type="text" v-model="editedItem.bankAccountNumber" label="Bank Acc. Number"
									placeholder="Enter  bank account number" />
								<Input type="text" v-model="editedItem.bankAccountHolder" label="Bank Acc. Holder"
									placeholder="Enter  bank account holder" />
							</div>
						</div>
						<div class="w-full flex justify-between">
							<button
								class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
								type="button" @click="close">
								Cancel
							</button>
							<button
								class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
								type="button" @click="editedIndex == -1 ? savePayment() : updatePayment()">
								{{ buttonName }}
							</button>
						</div>
					</form>
				</div>
			</template>
		</BaseModal>
		<!-- Confirm Modal for deletion -->
		<Confirm :show-confirm="showConfirm" @close="closeConfirm" @yesDelete="deletePayments()" />
		<!-- Use the Table component with v-bind to pass data and columns -->
		<Table :columns="columns" :data="paymentData" button-text="Add New Payment" @showModal="openModal" @edit="editItem" @delete="deleteItem" @item-detail="goTodetail" />
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router';

import Table from "../../components/BaseTable.vue";
import Confirm from "../../components/BaseConfirm.vue";
import BaseModal from "../../components/BaseModalCAPI.vue";
import Input from "../../components/form/BaseInput.vue";
import apiService from "../../services/apiService.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const router = useRouter()
const showModal = ref(false);
const showConfirm = ref(false);
const editedIndex = ref(-1);
const editedItem = ref({ _id: null, bankName: '', bankAccountNumber: '', bankAccountHolder: '' })
const defaultValue = ref({ _id: null, bankName: '', bankAccountNumber: '', bankAccountHolder: '' })
const paymentData = ref([])

const openModal = () => {
	showModal.value = !showModal.value;
};
const close = () => {
	showModal.value = false;
	editedItem.value = defaultValue
	editedIndex.value = -1
}
const closeConfirm = () => {
	showConfirm.value = false;
}
const editItem = (itemId) => {
	editedIndex.value = 1
	const paymentToEdit = paymentData.value.find(item => item._id === itemId);
	console.log("payment to edit: ", paymentToEdit);
	editedItem.value = { ...paymentToEdit }
	showModal.value = true
	console.log("Payment to be edited: ", editedItem.value);
}
const deleteItem = (itemId) => {
	editedItem.value = itemId
	editedItem.value._id = itemId._id
	showConfirm.value = true
}
const goTodetail = (itemId) => {
	router.push({ name: 'PaymentDetail', params: { id: itemId } })
}
const modalTitle = computed(() => editedIndex.value == -1 ? 'Add New Payment Option' : 'Update Payment Option')
const buttonName = computed(() => editedIndex.value == -1 ? 'Save' : 'Update')

const savePayment = async () => {
	let data = {
		bankName: editedItem.value.bankName,
		bankAccountNumber: editedItem.value.bankAccountNumber,
		bankAccountHolder: editedItem.value.bankAccountHolder
	}
	try {
		let response = await apiService.store('paymentoptions', data);
		if (response.data.error == false) {
			showModal.value = false
			editedItem.value = defaultValue.value
			toast.success(response.data.message)
			getAllPayments()
		}
		console.log("Response: ", response.data);
	} catch (error) {
			toast.error(error.response.data.message)
		console.log("Error: ", error.response.data);
	}
}
const updatePayment = async () => {
	let data = {
		bankName: editedItem.value.bankName,
		bankAccountNumber: editedItem.value.bankAccountNumber,
		bankAccountHolder: editedItem.value.bankAccountHolder
	}
	try {
		let response = await apiService.update(`paymentOptions/update/${editedItem.value._id}`, data);
		if (response.data.error == false) {
			showModal.value = false
			editedItem.value = defaultValue.value
			editedIndex.value = -1
			toast.success(response.data.message)
			getAllPayments()
		}
		console.log("Response: ", response);
	} catch (error) {
		toast.error(error.response.data.message)
		console.log("Error: ", error.response.data);
	}
}

const deletePayments = async () => {
	try {
		let response = await apiService.delete(`paymentOptions/delete/${editedItem.value._id}`)
		if (response.data.error == false) {
			showConfirm.value = false
			toast.success(response.data.message)
			getAllPayments()
		}
	} catch (error) {
		showConfirm.value = false
		toast.error(error.response.data.message)
	}
}

const getAllPayments = async () => {
	try {
		let response = await apiService.all('paymentoptions')
		paymentData.value = response.data.data
		console.log("Get all payments response: ", response.data);
	} catch (error) {
		toast.error(error)
		console.log("Error: ", error);
	}
}

onMounted(() => {
	getAllPayments()
})
const columns = ref([
	{ key: "_id", label: "ID" },
	{ key: "bankName", label: "Name" },
	{ key: "bankAccountNumber", label: "Bank Account Number" },
	{ key: "bankAccountHolder", label: "Bank Account Holder" }
]);

</script>

<style>
/* Add your global styles here */
</style>
