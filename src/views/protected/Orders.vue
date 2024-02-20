<!-- App.vue -->

<template>
	<div class="container mx-auto my-1">
		<h1 class="text-2xl font-bold mb-4 ml-6">Orders Table</h1>
		<div class="flex flex-col">
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="searchInput">
					Search Order:
				</label>
				<input
					class="appearance-none block w-72 bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
					v-model="searchTerm" id="searchInput" type="text" placeholder="Enter order details">
			</div>

			<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
					<div class="p-6 overflow-scroll px-0">
						<table class="border-b-2 border-b-blue-300 w-full min-w-max table-auto text-left">
							<thead class="align-bottom border-b-2 border-blue-500 bg-gray-200">
								<tr>
									<th scope="col" class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">Buyer Name
									</th>
									<th scope="col" class="px-6 py-4">
										<span>Ordered Items</span><br>
										<span><span class="pr-2">product name</span> | <span>quantity</span></span>
									</th>
									<th scope="col" class="px-6 py-4">Payment Status</th>
									<th scope="col" class="px-6 py-4">Delivery Status</th>
									<!-- <th colspan="2" class="px-6 py-4">Actions</th> -->
								</tr>
							</thead>
							<tbody v-if="paginatedData.length">
								<tr v-for="order in paginatedData" :key="order._id"
									class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
									<td class="whitespace-nowrap px-6 py-4 font-medium">{{ order.address.firstName }} {{
										order.address.lastName }}</td>
									<td>
										<span v-for="product in order.products" :key="product._id">
											<router-link :to="{name: 'ProductDetail', params: { id: product._id}}"
												class="pr-2">{{ product.productId.productName }}</router-link>
											<!-- make this link to details, which shows the detail of the product -->
											<span>{{ product.quantity }}</span> |
										</span>
									</td>
									<td class="whitespace-nowrap px-6 py-4"><button class="font-bold rounded-md p-2"
											:class="order.paymentStatus == 'Pending' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'"
											@click="approvePayment(order._id)">{{ order.paymentStatus }}</button></td>
									<td class="whitespace-nowrap px-6 py-4"><button class="font-bold rounded-md p-2"
											:class="order.deliveryStatus == 'Pending' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'"
											@click="approveDelivery(order._id)">{{ order.deliveryStatus }}</button></td>
								</tr>
							</tbody>
							<p v-else class="font-bold text-xl text-red"> No data found</p>
						</table>
					</div>
					<div class="flex justify-between">

						<div class="mt-4">
							<button @click="previousPage" :disabled="currentPage === 1"
								class="mr-2 px-4 py-2 bg-gray-200 inline-flex"><svg class="w-5 h-5 mr-1 -ml-1"
									fill=" currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
										d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
										clip-rule="evenodd"></path>
								</svg>
								Previous</button>
							<span class="mx-4">Page {{ currentPage }} of {{ totalPages }}</span>
							<button @click="nextPage" :disabled="currentPage === totalPages"
								class="px-4 py-2 bg-gray-200 inline-flex">Next
								<svg class="w-5 h-5 ml-1 -mr-1" fill="currentColor" viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
										d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
										clip-rule="evenodd"></path>
								</svg>
							</button>
						</div>
						<div class="flex mt-4 ml-4">
							<p class="font-semibold">Items Per Page</p>
							<span>
								<select v-model="itemsPerPage" name="" id="" class="ml-2 w-20 font-semibold">
									<option value="5">5</option>
									<option value="10">10</option>
									<option value="15">15</option>
								</select>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from 'vue-router';

import apiService from "../../services/apiService.js"

const router = useRouter()
const orderData = ref([])
const searchTerm = ref('');


const approvePayment = async (id) => {
	let paymentStatus = {
		paymentStatus: 'Paid'
	}
	try {
		let res = await apiService.update(`order/update/${id}`, paymentStatus)
		console.log("response: ", res);
		getAllOrders()
	} catch (error) {
		console.log("Error: ", error);
	}

}
const approveDelivery = async (id) => {
	let deliveryStatus = {
		deliveryStatus: 'Delivered'
	}
	try {
		let res = await apiService.update(`order/update/${id}`, deliveryStatus)
		console.log("response: ", res);
		getAllOrders()
	} catch (error) {
		console.log("Error: ", error);
	}
}

// Modify the computed property for filteredOrders
const filteredOrders = computed(() => {
	console.log("orderData value: ", orderData.value);
	return orderData.value.filter(order => {
		const buyerFirstName = order.address.firstName.toLowerCase();
		const buyerLastName = order.address.lastName.toLowerCase();
		const productNames = order.products.map(product => product.productId.productName.toLowerCase()).join(' ');
		return buyerFirstName.includes(searchTerm.value.toLowerCase()) || buyerLastName.includes(searchTerm.value.toLowerCase()) || productNames.includes(searchTerm.value.toLowerCase());
	});
});

const itemsPerPage = ref(5)
const currentPage = ref(1);

const paginatedData = computed(() => {
	const startIndex = (currentPage.value - 1) * itemsPerPage.value;
	const endIndex = startIndex + itemsPerPage.value;
	return filteredOrders.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage.value));

const nextPage = () => {
	if (currentPage.value < totalPages.value) {
		currentPage.value++;
	}
};

const previousPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--;
	}
};

watch(itemsPerPage, () => {
	currentPage.value = 1
})
const getAllOrders = async () => {
	try {
		let response = await apiService.all('order')
		orderData.value = response.data.data
		console.log("All orders: ", response.data);
	} catch (error) {
		console.log("Error: ", error.response.data.message);
	}
}

onMounted(() => {
	getAllOrders()
})


</script>

<style>/* Add your global styles here */</style>
