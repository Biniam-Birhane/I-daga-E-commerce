<template>
    <div class="flex justify-center items-center h-screen bg-gray-100 px-6">
        <div class="w-full max-w-xs">
            <h2 class="text-2xl mb-5 text-center">Create your account</h2>
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <fieldset>
                        <BaseInput type="text" v-model="form.firstName" label="First Name" placeholder="Enter your first name" :error="firstNameError" />
                        <BaseInput type="text" v-model="form.lastName" label="Last Name" placeholder="Enter your last name" :error="lastNameError" />
                </fieldset>
                <fieldset>
                    <BaseInput type="email" v-model="form.email" label="Email" placeholder="Enter your email" :error="emailError" />
                    <BaseInput type="password" v-model="form.password" label="Password" placeholder="Enter your password" :error="passwordError" />
                </fieldset>
                <fieldset>
                    <div class="flex items-center justify-between mt-5 mb-2">
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button" @click="register">
                            Sign Up
                        </button>
                    </div>
                    <p>Already have account? Sign in <span><router-link :to="{ name: 'Login' }" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">here.</router-link></span></p>
                    
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import BaseInput from "../../components/form/BaseInput.vue";
import apiService from "../../services/apiService.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const form = ref({ firstName: '', lastName: '', email: '', password: ''})
let firstNameError = ref('')
let lastNameError = ref('')
let emailError = ref('')
let passwordError = ref('')

const register = async () => {
    if (form.value.email == '') {
        console.log("Email is required");
       return emailError.value = "Email is required."
    }
    else if (form.value.password == '') {
        console.log("Password is required");
        usernameError.value = ''
        return passwordError.value = "Password is required."
    }
    else {
       try {
           let response = await apiService.store('user/selfregister', form.value)
           toast.success(response.data.message, { position: toast.POSITION.TOP_CENTER, autoClose: 5000})
           form.value = ''
        console.log("Login response: ", response.data);
       } catch (error) {
           toast.error(error.response.data.message, { position: toast.POSITION.TOP_CENTER, autoClose: 5000})
        console.log("Login error: ", error.response.data);
    } 
    }
    
}

</script>

<style scoped></style>