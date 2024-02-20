<!-- App.vue -->

<template>
    <div class="container mx-auto my-8">
        <h1 class="text-2xl font-bold mb-4">User Table</h1>

        <!-- Use the Table component with v-bind to pass data and columns -->
        <Table :columns="columns" :data="userData" />
    </div>
</template>

<script setup>
import Table from './components/Table.vue';

const columns = ref([
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'email', label: 'Email' },
]);

const userData = ref([
    { name: 'John Doe', age: 25, email: 'john@example.com' },
    { name: 'Jane Doe', age: 30, email: 'jane@example.com' },
    // Add more user data as needed
]);
</script>

<style>
/* Add your global styles here */
</style>
