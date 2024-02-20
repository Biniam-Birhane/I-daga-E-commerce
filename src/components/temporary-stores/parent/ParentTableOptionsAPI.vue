<!-- ParentComponent.vue -->

<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">Employee Data</h1>

        <TableComponent :data="employeeData" :columns="tableColumns" :itemsPerPage="10" />
    </div>
</template>

<script>
import TableComponent from '@/components/TableComponent.vue'; // Adjust the path based on your project structure

export default {
    components: {
        TableComponent,
    },
    data() {
        return {
            employeeData: [
                { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'Engineering' },
                { id: 2, name: 'Jane Smith', position: 'Product Manager', department: 'Product' },
                // Add more data as needed
            ],
            tableColumns: ['id', 'name', 'position', 'department'],
        };
    },
};
</script>

<style>
/* Add your custom styles or TailwindCSS classes here */
</style>
