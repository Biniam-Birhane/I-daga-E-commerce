<template>
	<nav class="bg-white h-16 w-full">
		<header class="flex justify-between items-center py-4 px-6 border-b-4 border-primary">
			<div class="flex items-center">
				<button @click="toggleSidebar" class="text-gray-500 focus:outline-none /*lg:hidden*/">
					<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
							stroke-linejoin="round" />
					</svg>
				</button>
				<div class="relative mx-12 /*lg:mx-0*/">
					<span class="absolute inset-y-0 left-0 pl-3 flex items-center">
						<svg class="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
							<path
								d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
								stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</span>

					<input class="w-32 sm:w-64 p-2 pl-10 pr-4 focus:border-indigo-600 bg-blueGray"
						style="outline-color: #00aeff" type="text" placeholder="Search" />
				</div>
			</div>
			<div class="flex items-center">
				<button class="flex mx-4 text-gray-600 focus:outline-none">
					<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
							stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</button>

				<div class="cursor-pointer pr-2 font-bold text-primary" @mouseenter="dropdownOpen = !dropdownOpen"
					@click="dropdownOpen = !dropdownOpen">
					{{ firstName }}
				</div>
				<div class="relative">
					<button @mouseenter="dropdownOpen = !dropdownOpen" @click="dropdownOpen = !dropdownOpen"
						class="relative z-10 block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none cursor-pointer">
						<img class="h-full w-full object-cover" :src="imageUrl(user.profilePic)" alt="Your avatar" />
					</button>

					<div v-show="dropdownOpen" @click="dropdownOpen = false" class="fixed inset-0 h-full w-full z-10"></div>
					<!-- TODO Create routes -->
					<div
					v-show="dropdownOpen" @mouseleave="dropdownOpen = false"
					class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-20"
				>
					<router-link v-if="user.role == 'Admin'"
						:to="{name: 'Profile'}"
						class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 hover:font-semibold hover:text-white"
						>Profile</router-link
					>
					<router-link v-if="user.role == 'User'"
							:to="{name: 'UserProfile'}"
							class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 hover:font-semibold hover:text-white"
							>Profile</router-link
						>
					<router-link
						:to="{name: 'Login'}"
						@click="logout"
						class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 hover:font-semibold hover:text-white"
						>Log out</router-link
					>
				</div>
				</div>
			</div>
		</header>

		<!-- Mobile menu, show/hide based on menu state. -->
		<div class="sm:hidden" id="mobile-menu">
			<div class="space-y-1 px-2 pb-3 pt-2">
				<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
				<a href="#" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
					aria-current="page">Dashboard</a>
				<a href="#"
					class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
				<a href="#"
					class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
				<a href="#"
					class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
			</div>
		</div>
	</nav>
</template>

<script setup>
import { ref, computed } from "vue";
import imageUrl from "../services/baseImageUrl";

const dropdownOpen = ref(false)
const emit = defineEmits(["toggle-sidebar"])

const toggleSidebar = () => {
	emit("toggle-sidebar")
}
const user = JSON.parse(localStorage.getItem('user'))
const firstName = computed(() => {
	let user = JSON.parse(localStorage.getItem('user'))
	if (user) {
		return user.firstName
	}
})

const logout = () => {
	localStorage.removeItem("token")
	localStorage.removeItem("user")
}
</script>

<style scoped></style>