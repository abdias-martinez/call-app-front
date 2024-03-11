<template>
    <div class="table-2-container">
        <div class="table-wrapper">
            <table class="exportable-table">
                <thead :style="{ background: `#${props.color}` }">
                    <th v-for="column in columns.slice(0, -1)" :key="column" :style="{ width: `${100 / (columns.length + 2)}%` }">
                        {{ column.replace(/_/g, ' ').toUpperCase() }}
                    </th>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in data" :key="rowIndex" :id="`row-${rowIndex}-${props.nameTable}`">
                        <td v-for="column in columns.slice(0, columns.length - 1)" :key="column" :style="{ background: `#${row.color}` }">
                            <div class="centered-td-content">
                                <input type="text" :value="row[column]" readonly>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="(_, i) in additionalRows" :key="i">
                        <td v-for="column in columns" :key="column" :style="{ background: `#${data[-1].color}` }"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, onBeforeMount } from 'vue';
const columns = ref();
const additionalRows = ref([]);
const numAdditionalRows = ref(0);
const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    minRows: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    }
});

onBeforeMount(() => {
    columns.value = props.data.length > 0 ? Object.keys(props.data[0]) : [];
    if (props.data.length < props.minRows) {
        numAdditionalRows.value = props.minRows - props.data.length;
        for (let i = 0; i <= numAdditionalRows.value; i++) {
            additionalRows.value.push(i + props.data.length);
        }
    }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400..800');

.table-2-container {
    width: 100%;
    height: 100%;
    border-radius: .4rem .4rem;
    display: flex;
    justify-content: center;
    overflow: hidden;
}

.table-wrapper {
    overflow-y: auto;
    height: auto;
    width: 98%;
    display: flex;
    justify-content: center;
    overflow: auto;
    border-radius: 10px 10px 0 0;
}

.table-wrapper::-webkit-scrollbar {
    width: 0px;
}

table {
    width: 100%;
    height: auto;
    border: none;
    border-spacing: 0px;
    outline: none;
    margin: none;
    border-collapse: separate;
    border-radius: 10px;
    overflow: auto;
    background: #F3F3F3;
}

thead {
    position: sticky;
    top: 0px;
    z-index: 1;
    width: 100%;
    height: 30px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: #fff;
}

thead th {
    width: auto;
    max-width: 120px;
    max-height: 30px;
    color: #fff;
    font-family: "Baloo 2", sans-serif;
    font-size: 15px;
    font-weight: 500;
    border-right: 3px solid #D5DFFA;
}

thead th:first-of-type {
    border-top-left-radius: 10px;
    border-right: 3px solid #D5DFFA
}

thead th:last-of-type {
    border: 0px;
    border-top-right-radius: 10px;
}

tbody {
    width: 100%;
    height: auto;
    background: #F3F3F3;
    row-gap: 5px;
}

tbody tr:first-of-type {
    border: 0px;
}

tbody tr td:last-of-type {
    border: 0px;
}

tbody tr:last-of-type td:first-of-type {
    border-bottom-left-radius: 10px;
}

tbody tr:last-of-type td:last-of-type {
    border-bottom-right-radius: 10px;
}

td {
    width: auto;
    height: 30px;
    text-align: center;
    padding: 0;
    overflow: hidden;
    border-right: 3px solid #D5DFFA;
}

.centered-td-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}

.centered-td-content input {
    border: none;
    outline: none;
    width: 100%;

    max-height: 30px;
    background: transparent;
    padding: 0 20px 0 20px;

    font-family: "Baloo 2", sans-serif;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    text-overflow: ellipsis;
}
</style>