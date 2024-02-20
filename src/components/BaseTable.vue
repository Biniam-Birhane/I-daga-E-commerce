<!-- Table.vue -->

<template>
    <div class="bg-gray-100 rounded-md p-4">
        <div class="flex justify-between mb-4">
            <div class="relative mx-12 /*lg:mx-0*/">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg class="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>

                <!-- <input class="w-32 sm:w-64 p-2 pl-10 pr-4 focus:border-indigo-600 bg-blueGray"
    						style="outline-color: #00aeff" type="text" placeholder="Search" /> -->
                <Input v-model="searchQuery" class="w-72 pl-10 pr-4" placeholder="Search..." />
            </div>
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
                type="button" @click="showModal">{{ buttonText }}</button>
        </div>
        <div class="p-6 overflow-scroll px-0">
            <table class="border-b-2 border-b-blue-300 w-full min-w-max table-auto text-left">
                <thead class="align-bottom border-b-2 border-blue-500 bg-gray-200">
                    <tr>
                        <th><slot name="photo-header"></slot></th>
                        <th v-for="(column, index) in columns" :key="index"
                            class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <button
                                class="block antialiased font-sans text-blue-gray-900 font-bold leading-none opacity-70">{{
                                column.label }} <span class="text-sm" @click="sortBy(column)">
                                    {{ sortOrder.direction === 'asc' ? '&#x25BC' : '&#x25B2' }}
                                </span></button>
                            <!-- <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span> -->

                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody v-if="paginatedData.length">
                    <tr v-for="(item, index) in paginatedData" :key="index" class="odd:bg-white even:bg-slate-200">
                        <!-- <td v-for="(column, colIndex) in columns" :key="colIndex" class="p-3">
                            <slot name="image"></slot>
                            {{ item[column.key] }}
                        </td> -->
                        <!-- <td><img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" :src="imageUrl(item.profilePic)" alt=""></td> -->
                        <td><slot name="photo-data" :item="item"></slot></td>
                        <td v-for="(column, colIndex) in columns" :key="colIndex" class="p-4 border-b border-blue-gray-50">
                            <!-- <p class="block antialiased font-sans leading-normal text-blue-gray-900 font-normal">{{ item[column.key] }}</p> -->
                            {{ getPropertyValue(item, column.key) }}
                        </td>
                        <td class="p-4 space-x-2 whitespace-nowrap">
                            <button type="button" @click="editItem(item._id)"
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z">
                                    </path>
                                    <path fill-rule="evenodd"
                                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                            <button type="button" @click="deleteItem(item)"
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                            <button type="button" @click="detail(item._id)"
                                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-green-900">
                                    <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor"  viewBox="0 0 24 24"><path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.21 0-4 1.791-4 4s1.79 4 4 4c2.209 0 4-1.791 4-4s-1.791-4-4-4zm-.004 3.999c-.564.564-1.479.564-2.044 0s-.565-1.48 0-2.044c.564-.564 1.479-.564 2.044 0s.565 1.479 0 2.044z"/></svg>
                                </button>
                        </td>
                    </tr>
                </tbody>
                <p v-else class="text-red-600 font-semibold text-center my-3">No data found</p>
            </table>
        </div>

        <div class="flex justify-between">

            <div class="mt-4">
                <button @click="previousPage" :disabled="currentPage === 1"
                    class="mr-2 px-4 py-2 bg-gray-200 inline-flex"><svg class="w-5 h-5 mr-1 -ml-1" fill=" currentColor"
                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"></path>
                    </svg>
                    Previous</button> <span class="mx-4">Page {{ currentPage }} of {{ totalPages }}</span>
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
                    <select v-model="pageSize" name="" id="" class="ml-2 w-20 font-semibold">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Input from "../components/form/BaseInput.vue";
import imageUrl from "../services/baseImageUrl";

const props = defineProps({
    columns: Array,
    data: Array,
    buttonText: String
})
const emit = defineEmits(['edit', 'delete', 'showModal', 'item-detail'])
const showModal = (itemId) => {
    emit('showModal', itemId)
}
const editItem = (itemId) => {
    // Emit an event to the parent component with the item ID for editing
    emit('edit', itemId)
}

const deleteItem = (itemId) => {
    // Emit an event to the parent component with the item ID for deletion
    emit('delete', itemId)
}
const detail = (itemId) => {
    console.log("item-id from detail: ", itemId);
    emit('item-detail', itemId)
}
// const columns = ref([
//     { key: 'name', label: 'Name' },
//     { key: 'age', label: 'Age' },
//     { key: 'email', label: 'Email' },
// ]);

// const data = ref([
//     { name: 'John Doe', age: 25, email: 'john@example.com' },
//     { name: 'Jane Doe', age: 30, email: 'jane@example.com' },
//     { name: 'Jane Doe', age: 30, email: 'jane@example.com' },
//     { name: 'Jane Doe', age: 30, email: 'jane@example.com' },
//     { name: 'Jane Doe', age: 30, email: 'jane@example.com' },
//     { name: 'Jane Doe', age: 30, email: 'jane@example.com' },
//     { name: 'Jane Doe', age: 30, email: 'jane@example.com' },
//     { name: 'Jane Doe', age: 30, email: 'jane@example.com' },
//     // Add more data as needed
// ]);

const pageSize = ref(5);
const currentPage = ref(1);
const searchQuery = ref('');
const sortOrder = ref({ column: '', direction: 'asc' });
// const searchOrders = ref(props.columns.reduce((o, key) => ((o[key] = 1), o),{}))

const sortedData = computed(() => {
    if (!sortOrder.value.column) return props.data;

    return [...props.data].sort((a, b) => {
        const modifier = sortOrder.value.direction === 'desc' ? -1 : 1;
        return modifier * (a[sortOrder.value.column] > b[sortOrder.value.column] ? 1 : -1);
    });
});

const filteredData = computed(() => {
    return sortedData.value.filter(item =>
        Object.values(item).some(value =>
            String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    );
});

const paginatedData = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return filteredData.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(filteredData.value.length / pageSize.value));

const sortBy = (column) => {
    if (sortOrder.value.column === column.key) {
        sortOrder.value.direction = sortOrder.value.direction === 'asc' ? 'desc' : 'asc';
    } else {
        sortOrder.value.column = column.key;
        sortOrder.value.direction = 'asc';
    }
};

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
watch(pageSize, () => {
	currentPage.value = 1
})
const getPropertyValue = (obj, path) => {
    const keys = path.split('.');
    let value = obj;

    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            return undefined;
        }
    }

    return value;
};
</script>

<style scoped>
/* Add your TailwindCSS styles here */
.arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
}

.arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
}

.arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
}</style>
