<template>
    <div class="table-2-container">
        <div class="table-wrapper">
            <table>
                <thead :style="{ background: `#${props.color}` }">
                    <th v-for="column in columns" :key="column" :style="{ width: `${100 / (columns.length + 2)}%` }">
                        {{ column.toUpperCase() }}
                    </th>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in data" :key="rowIndex" :id="`row-${rowIndex}-${props.nameTable}`">
                        <td v-for="column in columns" :key="column" :style="{ background: `#${row.color}` }">
                            <div class="centered-td-content">
                                <input type="text" :value="row[column]" readonly>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="(_, i) in additionalRows" :key="i">
                        <td v-for="column in columns" :key="column" :style="{ background: `#${data[data.length() - 1].color}` }">
                            <div class="centered-td-content"></div>
                        </td>
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
    nameTable: {
        type: String,
        required: true,
    },
    nameObject: {
        type: String,
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
    columns.value = Object.keys(props.data[0])
    if (props.data.length < props.minRows) {
        numAdditionalRows.value = props.minRows - props.data.length
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
    width: 97.5%;
    display: flex;
    justify-content: center;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    overflow: auto;
}

.table-wrapper::-webkit-scrollbar {
    width: 0px;
}

table {
    width: 100%;
    height: auto;
    border: none;
    border-spacing: 3px;
    border-radius: 20px;
    outline: none;
    margin: none;
    background: #7DB6FF;
}

thead {
    position: sticky;
    top: 0px;
    z-index: 1;
    width: 100%;
    height: 45px;
    border-radius: 0 20px 20px 0;
    background: #070a10;
}

thead th {
    width: auto;
    max-width: 120px;
    max-height: 45px;
    color: #fff;
    font-family: "Baloo 2", sans-serif;
    font-size: 23px;
    font-weight: 500;
}

thead th:first-of-type {
    border-top-left-radius: 20px;
}

thead th:last-of-type {
    border-top-right-radius: 20px;
}

tbody {
    width: 100%;
    height: auto;
    background: #F3F3F3;
    border-radius: 0 20px 20px 0;
    row-gap: 5px;
}


tbody tr:last-of-type td:first-of-type {
    border-bottom-left-radius: 20px;
}

tbody tr:last-of-type td:last-of-type {
    border-bottom-right-radius: 20px;
}

td {
    width: auto;
    height: 45px;
    text-align: center;
    padding: 0;
    overflow: hidden;
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

    max-height: 45px;
    background: transparent;
    padding: 0 20px 0 20px;

    font-family: "Baloo 2", sans-serif;
    font-size: 19px;
    font-weight: 700;
    cursor: pointer;
    text-overflow: ellipsis;
}
</style>