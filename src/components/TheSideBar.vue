<template>
	<div class="h-screen flex">
		<!-- Backdrop -->
		<!-- /Backdrop -->
		<div :class="isOpen1 ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
			class=" bg-gray-300 fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
			style="/*background-color: dark-gray*/">
			<div class="flex items-center justify-center mt-4">
				<div class="flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" class="h-12 w-12">
						<!-- Example: Shopping bag icon -->
						<path d="M20 20 H180 V80 H20 Z" fill="#3498db" />
						<path d="M20 20 L100 0 L180 20 Z" fill="#2c3e50" />
					</svg>
					<span class="text-black text-2xl mx-2 font-semibold">E-Commerce</span>
				</div>
			</div>
			<nav class="mt-5">
				<hr>
				<div class="text-center my-4">
					<img class="h-16 w-16 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-3"
						:src="imageUrl(user.profilePic)" :alt="`${user.firstName}'s image`">
					<div class="py-2">
						<h3 v-if="user.role == 'Admin'">
							<router-link v-if="role == 'Admin'" :to="{ name: 'Profile' }" class="font-bold text-gray-800 dark:text-white mb-1">{{ fullName }}</router-link>
						</h3>
						<h3 v-if="role == 'User'">
								<router-link :to="{ name: 'UserProfile' }" class="font-bold text-gray-800 dark:text-white mb-1">{{ fullName }}</router-link>
							</h3>
						<div class="inline-flex text-blue-700 dark:text-gray-300 items-center font-semibold">
							
							{{ role }}
						</div>
					</div>
				</div>
				<ul class="pb-2 space-y-2">
					<li v-if="role == 'Admin'">
						<router-link :to="{ name: 'AdminDashboard' }"
							class="flex items-center p-2 text-base text-gray-900 rounded-lg px-4"
							:class="[$route.name === 'AdminDashboard' ? activeClass : inactiveClass]">

							<svg class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
								fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
								<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
							</svg>
							<span class="ml-3 font-semibold">Dashboard</span>
						</router-link>
					</li>
					<li v-if="role == 'User'">
						<router-link :to="{ name: 'UserDashboard' }"
							class="flex items-center p-2 text-base text-gray-900 rounded-lg px-4"
							:class="[$route.name === 'UserDashboard' ? activeClass : inactiveClass]">

							<svg class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
								fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
								<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
							</svg>
							<span class="ml-3 font-semibold">Dashboard</span>
						</router-link>
					</li>
					<li v-if="role == 'Admin'">
						<router-link :to="{ name: 'Users' }"
							class="flex items-center p-2 text-base text-gray-900 rounded-lg px-4"
							:class="[$route.name === 'Users' ? activeClass : inactiveClass]">

							<svg class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
								fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
								<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
							</svg>
							<span class="ml-3 font-semibold">Users</span>
						</router-link>
					</li>
					<li v-if="role == 'Admin'">
						<button type="button" @click="productDropdown = !productDropdown"
							class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 pl-4 pr-2">
							<svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd"
									d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
									clip-rule="evenodd"></path>
							</svg>
							<span class="flex-1 ml-3 text-left whitespace-nowrap font-semibold">Product
								Management</span>
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"></path>
							</svg>
						</button>
						<ul v-show="productDropdown" class="py-2 space-y-2">
							<li>
								<router-link :to="{ name: 'Products'}"
									class="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
									:class="[$route.name === 'Products' ? activeClass : inactiveClass]">View
									Products</router-link>
							</li>
							<li>
								<a href="#"
									class="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Maintenance</a>
							</li>
						</ul>
					</li>
					<li v-if="role == 'User'">
							<button type="button" @click="productDropdown = !productDropdown"
								class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 pl-4 pr-2">
								<svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
									fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
										d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
										clip-rule="evenodd"></path>
								</svg>
								<span class="flex-1 ml-3 text-left whitespace-nowrap font-semibold">Product
									Management</span>
								<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd"></path>
								</svg>
							</button>
							<ul v-show="productDropdown" class="py-2 space-y-2">
								<li>
									<router-link :to="{ name: 'UserProducts'}"
										class="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
										:class="[$route.name === 'UserProducts' ? activeClass : inactiveClass]">View
										Products</router-link>
								</li>
								<li>
									<a href="#"
										class="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Maintenance</a>
								</li>
							</ul>
						</li>

					<li v-if="role == 'Admin'">
						<router-link :to="{ name: 'Categories' }"
							class="flex items-center p-2 text-base text-gray-900 rounded-lg px-4"
							:class="[$route.name === 'Categories' ? activeClass : inactiveClass]">

							<svg class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
								fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
								<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
							</svg>
							<span class="ml-3 font-semibold">Categories</span>
						</router-link>
					</li>
					<li v-if="role == 'Admin'">
						<router-link :to="{ name: 'Orders'}"
							class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 px-4"
							:class="[$route.name === 'Orders' ? activeClass : inactiveClass]">
							<svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd"
									d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
									clip-rule="evenodd"></path>
							</svg>
							<span class="flex-1 ml-3 mr-1 text-left whitespace-nowrap font-semibold">Orders</span>
						</router-link>
					</li>
					<li v-if="role == 'Admin'">
						<router-link :to="{ name: 'PaymentOptions' }"
							class="flex items-center p-2 text-base text-gray-900 rounded-lg px-4"
							:class="[$route.name === 'PaymentOptions' ? activeClass : inactiveClass]">

							<svg class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
								fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
								<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
							</svg>
							<span class="ml-3 font-semibold">Payment Options</span>
						</router-link>
					</li>
					<li v-if="role == 'Admin'">
						<router-link :to="{ name: 'Contacts' }"
							class="flex items-center p-2 text-base text-gray-900 rounded-lg px-4"
							:class="[$route.name === 'Contacts' ? activeClass : inactiveClass]">

							<svg class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
								fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
								<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
							</svg>
							<span class="ml-3 font-semibold">Contacts</span>
						</router-link>
					</li>
				</ul>
				<router-link v-if="role == 'Admin'"
						class="flex items-center text-black font-semibold duration-200 mt-4 py-1 px-6 border-l-4 border-l-gray-300 rounded-md mb-6"
						:class="[$route.name === 'MyProducts' ? activeClass : inactiveClass]" :to="{ name: 'MyProducts', params: {id: user._id} }">
						<svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5Z"
								fill="currentColor" />
							<path
								d="M5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5Z"
								fill="currentColor" />
							<path
								d="M11 5C11 3.89543 11.8954 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 8.10457 16.1046 9 15 9H13C11.8954 9 11 8.10457 11 7V5Z"
								fill="currentColor" />
							<path
								d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z"
								fill="currentColor" />
						</svg>

						<span class="mx-4">My Products</span>
					</router-link>
				<router-link v-if="role == 'Admin'"
					class="flex items-center text-black font-semibold duration-200 mt-4 py-1 px-6 border-l-4 border-l-gray-300 rounded-md mb-6"
					:class="[$route.name === 'Profile' ? activeClass : inactiveClass]" :to="{ name: 'Profile' }">
					<svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5Z"
							fill="currentColor" />
						<path
							d="M5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5Z"
							fill="currentColor" />
						<path
							d="M11 5C11 3.89543 11.8954 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 8.10457 16.1046 9 15 9H13C11.8954 9 11 8.10457 11 7V5Z"
							fill="currentColor" />
						<path
							d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z"
							fill="currentColor" />
					</svg>

					<span class="mx-4">Profile</span>
				</router-link>
				<router-link v-if="role == 'User'"
						class="flex items-center text-black font-semibold duration-200 mt-4 py-1 px-6 border-l-4 border-l-gray-300 rounded-md mb-6"
						:class="[$route.name === 'UserProfile' ? activeClass : inactiveClass]" :to="{ name: 'UserProfile' }">
						<svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5Z"
								fill="currentColor" />
							<path
								d="M5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5Z"
								fill="currentColor" />
							<path
								d="M11 5C11 3.89543 11.8954 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 8.10457 16.1046 9 15 9H13C11.8954 9 11 8.10457 11 7V5Z"
								fill="currentColor" />
							<path
								d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z"
								fill="currentColor" />
						</svg>

						<span class="mx-4">Profile</span>
					</router-link>
			</nav>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import imageUrl from "../services/baseImageUrl";

const isOpen1 = ref(true)
const activeClass = ref("bg-gray-100 bg-opacity-100 border-white");
const inactiveClass = ref("border-gray-700 hover:border-white hover:bg-gray-100 hover:bg-opacity-100");
const productDropdown = ref(false)
const user = JSON.parse(localStorage.getItem('user'))
const role = user.role
const fullName = user.firstName + ' ' + user.lastName
// const sidebarItems = ref([
// 	{
// 		title: "Dashboard",
// 		to: { name: "AdminDashboard" },
// 		icon: faAddressBook,
// 	},
// 	{
// 		title: "Profile",
// 		to: { name: "Profile" },
// 		icon: "account",
// 	},
// 	{
// 		title: "Users",
// 		to: { name: "Users" },
// 		icon: "accounts",
// 	},
// 	{
// 		title: "Categories",
// 		to: { name: "Category" },
// 		icon: faObjectGroup,
// 	},
// 	{
// 		title: "Products",
// 		to: { name: "Products" },
// 		icon: faTablets,
// 	},
// 	{
// 		title: "Orders",
// 		to: { name: "Orders" },
// 		icon: faMoneyBill,
// 	},
// ])

</script>

<style scoped></style>