<template>
    <!-- component -->
    <!-- <div class="flex flex-col justify-center h-screen">
        <div
            class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
            <div class="w-full md:w-1/3 bg-white grid place-items-center">
                <img src="https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt="tailwind logo" class="rounded-xl" />
            </div>
            <div class="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                <div class="flex justify-between item-center">
                    <p class="text-gray-500 font-medium hidden md:block">Vacations</p>
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <p class="text-gray-600 font-bold text-sm ml-1">
                            4.96
                            <span class="text-gray-500 font-normal">(76 reviews)</span>
                        </p>
                    </div>
                    <div class="">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pink-500" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                        Superhost</div>
                </div>
                <h3 class="font-black text-gray-800 md:text-3xl text-xl">The Majestic and Wonderful Bahamas</h3>
                <p class="md:text-lg text-gray-500 text-base">The best kept secret of The Bahamas is the country’s sheer
                    size and diversity. With 16 major islands, The Bahamas is an unmatched destination</p>
                <p class="text-xl font-black text-gray-800">
                    $110
                    <span class="font-normal text-gray-600 text-base">/night</span>
                </p>
            </div>
        </div>
    </div> -->

    <div class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-semibold">{{ editMode ? 'Edit Profile' : 'My Profile' }}</h2>
            <button v-if="!editMode" @click="editMode = true" class="text-blue-500 hover:underline font-semibold">
            Edit Profile
          </button>
        </div>

        <div v-if="!editMode">
            <!-- Display Mode -->
            <div class="flex items-center mb-4">
                <img :src="imageUrl(userData.profilePic)" alt="Profile" class="w-20 h-20 rounded-full mr-4">
                <div>
                    <h3 class="text-xl font-semibold">{{ userData.firstName + ' ' + userData.lastName }}</h3>
                    <p class="text-gray-600">Wherever you go, leave footprints of love.</p>
                </div>
            </div>
            <div class="mb-4">
                <p class="text-gray-700 font-semibold">Email: <a href="#" class="text-blue-500"> {{ userData.email }}
                        </a></p>
                <p class="text-gray-700 font-semibold">Mobile Number: +251{{ userData.mobileNumber }}</p>
                <p class="text-gray-700 font-semibold">Role: {{ userData.role }}</p>
            </div>
            <div class="flex justify-center text-blue-500 dark:text-gray-300 font-semibold mt-10">
                <svg class="h-5 w-5 text-red-500 dark:text-gray-600 mr-1" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path class=""
                        d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                </svg>
                <a href="#" class="text-center">Mekelle Institute of Technology, Mekelle</a>
            </div>
        </div>

        <form v-else @submit.prevent="saveProfile">
            <!-- Edit Mode -->
            <div class="flex items-center mb-4">
                <img :src="imageUrl(userData.profilePic)" alt="Profile" class="w-12 h-12 rounded-full mr-4">
                <div class="flex flex-col ml-4">
                    <div class="flex justify-center">
                        <label class="text-gray-700 font-semibold w-32">First Name</label>
                        <input v-model="userData.firstName" class="w-full mb-2 p-2 rounded-md border"
                            placeholder="First Name" />
                    </div>
                    <div class="flex justify-center">
                        <label class="text-gray-700 font-semibold w-32">Last Name</label>
                        <input v-model="userData.lastName" class="w-full mb-2 p-2 rounded-md border"
                            placeholder="Last Name" />
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <div class="flex flex-row">
                    <div class="flex flex-col mx-2">
                        <label class="text-gray-700 font-semibold">Email</label>
                        <input v-model="userData.email" type="email" class="w-full mb-2 p-2 rounded-md ml-2"
                            placeholder="Email" />
                    </div>
                    <div class="flex flex-col mx-2">
                        <label class="text-gray-700 font-semibold">Phone</label>
                        <input v-model="userData.mobileNumber"
                            class="w-full mb-2 p-2 rounded-md border focus:border-red-500" placeholder="Mobile Number" />
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <label class="text-gray-700 font-semibold">Photo</label>
                <input type="file" class="w-full p-2 rounded-md" placeholder="Profile Picture URL"
                    @change="handleFileChange" />
            </div>
            <div class="flex justify-end">
                <button type="submit" class="text-blue-500 hover:underline font-semibold mr-2">Update Profile</button>
                <button @click="editMode = false" class="text-blue-500 hover:underline font-semibold ml-1">
                    Cancel
                </button>
            </div>
        </form>
    </div>

    <!-- <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg mt-12 mx-auto">
        <div class="border-b px-4 pb-6">
            <div class="text-center my-4">
                <img class="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                    :src="imageUrl(user.profilePic)" alt="User image">
                <div class="py-2">
                    <h3 class="font-bold text-2xl text-gray-800 dark:text-white mb-1">{{ fullName }}</h3>
                    <div class="inline-flex text-blue-500 dark:text-gray-300 items-center font-semibold">
                        <svg class="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1" fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path class=""
                                d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                        </svg>
                        Mekelle Institute of Technology, Mekelle
                    </div>
                </div>
            </div>
            <div class="flex gap-2 px-2">
                    <button
                        class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                        Follow
                    </button>
                    <button
                        class="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
                        Message
                    </button>
                </div>
        </div>
        <div class="px-4 py-5 sm:px-6 text-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                About Me
            </h3>
            <p class="mt-1 max-w-2xl text-gray-500">
                Details and informations about me.
            </p>
        </div>
        <div class="border-t border-gray-200">
            <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Full name
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ fullName }}
                    </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Job
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        Software Developer
                    </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Email address
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ user.email }}
                    </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Salary
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        $10,000
                    </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        About
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        To get social media testimonials like these, keep your customers engaged with your social media
                        accounts by posting regularly yourself
                    </dd>
                </div>
            </dl>
        </div>
    </div> -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import imageUrl from "../../services/baseImageUrl";
import apiService from "../../services/apiService";

const user = JSON.parse(localStorage.getItem('user'))
const fullName = user.firstName + ' ' + user.lastName

const userData = ref({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    role: '',
    profilePic: '',
});

const editMode = ref(false);

const handleFileChange = (e) => {
    userData.value.profilePic = e.target.files[0]
    console.log("Selected File: ", userData.value.profilePic);
}

const saveProfile = async () => {

    const user = JSON.parse(localStorage.getItem('user'))
    const formData = new FormData()
    formData.append('profilePic', userData.value.profilePic)
    formData.append('firstName', userData.value.firstName)
    formData.append('lastName', userData.value.lastName)
    formData.append('email', userData.value.email)
    formData.append('mobileNumber', userData.value.mobileNumber)
    let response = await apiService.update(`users/update/${user._id}`, formData)
    console.log('Profile saved:', response);
    editMode.value = false;
};
const getUserData = async () => {

    const user = JSON.parse(localStorage.getItem('user'))
    let response = await apiService.getOne(`users/${user._id}`)
    console.log("user data: ", response);
    userData.value = response.data.data
}

onMounted(() => {
    getUserData()
})

</script>

<style scoped></style>