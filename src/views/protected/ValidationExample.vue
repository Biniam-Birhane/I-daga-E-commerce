<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">User CRUD App</h1>

        <!-- Button to open the modal -->
        <button @click="openModal" class="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>

        <!-- User List -->
        <div v-if="users.length > 0" class="mt-4">
            <div v-for="user in users" :key="user.id" class="mb-2">
                {{ user.firstName }} {{ user.lastName }}
                <button @click="editUser(user)" class="ml-2 text-blue-500">Edit</button>
                <button @click="deleteUser(user.id)" class="ml-2 text-red-500">Delete</button>
            </div>
        </div>

        <!-- User Modal -->
        <div v-if="showModal" class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div class="bg-white p-4 rounded shadow-md">
                <h2 class="text-lg font-bold mb-2">{{ editingUser ? 'Edit User' : 'Add User' }}</h2>

                <!-- User Form -->
                <form @submit.prevent="saveUser">
                    <div class="mb-4">
                        <label for="firstName" class="block text-sm font-semibold text-gray-600">First Name:</label>
                        <input v-model="userForm.firstName" type="text" id="firstName"
                            class="w-full p-2 border border-gray-300 rounded" />
                        <span v-show="errors.has('firstName')" class="text-red-500">{{ errors.first('firstName') }}</span>
                    </div>

                    <div class="mb-4">
                        <label for="lastName" class="block text-sm font-semibold text-gray-600">Last Name:</label>
                        <input v-model="userForm.lastName" type="text" id="lastName"
                            class="w-full p-2 border border-gray-300 rounded" />
                        <span v-show="errors.has('lastName')" class="text-red-500">{{ errors.first('lastName') }}</span>
                    </div>

                    <div class="mb-4">
                        <label for="email" class="block text-sm font-semibold text-gray-600">Email:</label>
                        <input v-model="userForm.email" type="email" id="email"
                            class="w-full p-2 border border-gray-300 rounded" />
                        <span v-show="errors.has('email')" class="text-red-500">{{ errors.first('email') }}</span>
                    </div>

                    <div class="mb-4">
                        <label for="password" class="block text-sm font-semibold text-gray-600">Password:</label>
                        <input v-model="userForm.password" type="password" id="password"
                            class="w-full p-2 border border-gray-300 rounded" />
                        <span v-show="errors.has('password')" class="text-red-500">{{ errors.first('password') }}</span>
                    </div>

                    <!-- Add more fields as needed -->

                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                    <button @click="closeModal" type="button" class="ml-2 text-gray-500">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

// User data
const users = ref([
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'secret' },
    { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', password: 'password' },
]);

// Modal state
const showModal = ref(false);
const editingUser = ref(null);

// User form schema
const userSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
    // Add more fields as needed
});

// User form fields
const userForm = {
    firstName: useField('firstName', userSchema.fields.firstName),
    lastName: useField('lastName', userSchema.fields.lastName),
    email: useField('email', userSchema.fields.email),
    password: useField('password', userSchema.fields.password),
    // Add more fields as needed
};

// Form validation
const { handleSubmit, errors } = useForm({
    validationSchema: userSchema,
});
const validateUserForm = handleSubmit(async () => {
    // Perform form validation logic here
    if (editingUser.value) {
        // Update existing user
        const index = users.value.findIndex((user) => user.id === editingUser.value.id);
        users.value[index] = { ...editingUser.value, ...userForm };
    } else {
        // Add new user
        users.value.push({ id: users.value.length + 1, ...userForm });
    }

    // Close the modal
    closeModal();
});

// Modal methods
const openModal = () => {
    showModal.value = true;
    // Reset form when opening modal
    userForm.firstName.value = '';
    userForm.lastName.value = '';
    userForm.email.value = '';
    userForm.password.value = '';
    // Reset other form fields as needed
};

const editUser = (user) => {
    showModal.value = true;
    editingUser.value = user;
    // Initialize form fields with user data
    userForm.firstName.value = user.firstName;
    userForm.lastName.value = user.lastName;
    userForm.email.value = user.email;
    userForm.password.value = ''; // Password is not displayed for security reasons
    // Initialize other form fields as needed
};

const closeModal = () => {
    showModal.value = false;
    editingUser.value = null;
    // Reset form when closing modal
    userForm.firstName.value = '';
    userForm.lastName.value = '';
    userForm.email.value = '';
    userForm.password.value = '';
    // Reset other form fields as needed
};

// Delete user
const deleteUser = (userId) => {
    users.value = users.value.filter((user) => user.id !== userId);
};

// Save user (trigger form validation)
const saveUser = () => {
    validateUserForm();
};
</script>

<style>/* Add TailwindCSS styles here or import your stylesheets */</style>
