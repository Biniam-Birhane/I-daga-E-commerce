<script setup>
import {onMounted, ref} from 'vue'
import { useProductStore } from '@/stores/counter';
import { useRouter } from 'vue-router';
import imageUrl from '../services/baseImageUrl';
import apiService from '../services/apiService';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const router =useRouter()
const cartItemList =useProductStore()

const firstName =ref("")
const lastName =ref('')
const email=ref('')
const phoneNumber =ref('')
const city =ref('')
const address =ref('')
const paymentOption =ref('')
const description =ref('')


function process(){
    console.log(firstName)
}

let datas = ref([''])
let paymentKinds =ref('')
 const paymentMethod = async(paymentKinds)=>{
   const res = await apiService.all('/paymentOptions') 
   paymentKinds.value =res.data.data
   console.log(paymentKinds)
   console.log(res.data)
}
onMounted(() => {
    paymentMethod(paymentKinds)
})

async function sendData (){
    try {
        
        let ItemProduct =[]
        datas =cartItemList.GetCart
        for (const key of datas) {
           let itemObject={
                productId:key._id,
                quantity:9
            }
            console.log(itemObject)
            ItemProduct.push(itemObject)
        }
        let orderDetail={
            email:email.value,
            address:{
                firstName:firstName.value,
                lastName:lastName.value,
                phoneNumber:phoneNumber.value,
                city:city.value,
                specificAddress:address.value
            },
            products:ItemProduct,
            paymentOption:paymentOption.value
        }
        console.log(orderDetail)
        const response = await apiService.store('/order/addorder',orderDetail)
        if(response.data.statusCode===200){
            cartItemList.SetSuccessMessage(true)
            cartItemList.DeleteCartItem
            toast.success(response.data.message)
            firstName.value =''
            lastName.value=''
            email.value =''
            phoneNumber.value=''
            city.value=''
            address.value=''
            paymentOption.value=''
            description.value=''
            cartItemList.DeleteAllCartItem
        }
        if(response.data.error===true){
            toast.error(response.data.message)
        }

        console.log(response.data.message)
    } catch (error) {
        toast.success(error)
        console.log(error)
    }
}


</script>
<template>
    <div>
        <div class="mt-20">
            <h1 class="flex items-center justify-center font-bold text-md lg:text-3xl">
                Payment Check out
            </h1>
        </div>
        <div class="container p-12 mx-auto">
            <div class="flex flex-col w-full px-0 mx-auto md:flex-row">
                <div class="flex flex-col md:w-full">
                    
                    <form class="justify-center w-full mx-auto" method="post" @submit.prevent="sendData" >
                        <div class="">
                            <h2 class="mb-4 font-bold md:text-xl text-heading w-full ">Contact Information</h2>
                            <div class="mt-4 mb-4">
                                <div >
                                    <label for="email"  class="block mb-3 text-sm font-semibold text-gray-500">E-mail</label>
                                    <input type="text" name="email" v-model="email" placeholder="Email" class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600  ">

                                </div>
                            </div>
                            <h2 class="mb-4 font-bold md:text-xl text-heading w-full ">Shipping Address
                            </h2>
                            <div class="space-x-0 lg:flex lg:space-x-4">
                                
                                <div class="w-full lg:w-1/2">
                                    <label for="firstName" class="block mb-3 text-sm font-semibold text-gray-500">First
                                        Name</label>
                                    <input name="firstName" type="text" v-model="firstName" placeholder="First Name"
                                        class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600">
                                </div>
                                <div class="w-full lg:w-1/2 ">
                                    <label for="firstName" class="block mb-3 text-sm font-semibold text-gray-500">Last
                                        Name</label>
                                    <input name="Last Name" type="text" v-model="lastName" placeholder="Last Name"
                                        class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600">
                                </div>
                            </div>
                            <div class="mt-4">
                                <div class="w-full">
                                    <label for="phone"
                                        class="block mb-3 text-sm font-semibold text-gray-500">Phone Number</label>
                                    <input name="phone" type="text" v-model="phoneNumber" placeholder="Phone number"
                                        class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600">
                                </div>
                            </div>
                            <div class="mt-4">
                                <div class="w-full">
                                    <label for="Address"
                                        class="block mb-3 text-sm font-semibold text-gray-500">Address</label>
                                    <textarea v-model="address"
                                        class="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        name="Address" cols="20" rows="4" placeholder="Address"></textarea>
                                </div>
                            </div>
                            <div class="space-x-0 lg:flex lg:space-x-4">
                                <div class="w-full lg:w-1/2">
                                    <label for="city"
                                        class="block mb-3 text-sm font-semibold text-gray-500">City</label>
                                    <input name="city" type="text" v-model="city" placeholder="City"
                                        class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600">
                                </div>
                                <div class="w-full lg:w-1/2 ">
                                    <label for="Payment" class="block mb-3 text-sm font-semibold text-gray-500">
                                        Payment Option</label>
                                    <select name="payment" v-model="paymentOption" placeholder="Payment Option"
                                        class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600">
                                        <option value="">Choose Payment Option</option>
                                        
                                        <option v-for="payment in paymentKinds" :key="payment.id" :value="payment._id" class="text-sm">{{ payment.bankName }} {{ payment.bankAccountNumber }}</option>
                                       
                                    </select>
                                </div>
                            </div>
                            <div class="flex items-center mt-4">
                                <label class="flex items-center text-sm group text-heading">
                                    <input type="checkbox"
                                        class="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1">
                                    <span class="ml-2">Save this information for next time</span></label>
                            </div>
                            <div class="relative pt-3 xl:pt-6"><label for="note"
                                    class="block mb-3 text-sm font-semibold text-gray-500"> Notes
                                    (Optional)</label><textarea name="note" v-model="description"
                                    class="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    rows="4" placeholder="Notes for delivery"></textarea>
                            </div>
                            <div class="mt-4">
                                <button
                                class="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900" @click="process" >Process</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
                    <div class="pt-12 md:pt-0 2xl:ps-4">
                        <h2 class="text-xl font-bold">Order Summary
                        </h2>
                        <div class="mt-8">
                            <div class="flex flex-col space-y-4">
                                <div class="flex space-x-4" v-for="item in cartItemList.GetCart" :key="item.id">
                                    <div>
                                        <img :src="imageUrl(item.image) " alt="image"
                                            class="sm:w-36 sm:h-36">
                                    </div>
                                    <div>
                                        <h2 class="text-xl font-bold">{{ item.productName}}</h2>
                                        <p class="text-sm">best product</p>
                                        <span class="text-red-600">Price</span> Birr {{ item.price }}
                                    </div>
                                    <button @click="cartItemList.DeleteCartItem(item._id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                               
                            </div>
                        </div>
                        <div
                            class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Subtotal<span class="ml-2">{{ cartItemList.GetTotalCartPrice }}</span></div>
                        <div
                            class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Shipping Tax<span class="ml-2">0</span></div>
                        <div
                            class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Total<span class="ml-2">Birr {{ cartItemList.GetTotalCartPrice }}</span></div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
        