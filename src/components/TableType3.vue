<template>
    <div class="table-3-container">
        <div class="table-wrapper">
            <table class="exportable-table">
                <thead :style="{ background: `#${props.color}` }">
                    <tr>
                        <th v-for="column in columns" :key="column" :style="{ width: `${100 / (columns.length + 2)}%` }">
                            {{ column.toUpperCase() }}
                        </th>
                        <th v-if="props.nameTable === 'calls_report'" :style="{ width: `${100 / (columns.length + 2)}%` }">EDITAR</th>
                        <th v-if="props.nameTable === 'calls_report'" :style="{ width: `${100 / (columns.length + 2)}%` }">BORRAR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in localData" :key="rowIndex">
                        <td v-for="column in columns" :key="column">
                            <div class="centered-td-content">
                                <input type="text" :value="row[column]" :class="`input-${props.nameTable}-row-${rowIndex}`"
                                    :id="`input-${column.charAt(0).toUpperCase() + column.slice(1)}-row-${rowIndex}`" 
                                    :disabled="!editingRows.includes(rowIndex)" />
                            </div>
                        </td>
                        <td v-if="props.nameTable === 'calls_report'">
                            <div class="centered-td-content">
                                <div class="icon-container icon-update-record-container" @click="editRecord(rowIndex)">
                                    <img :src="props.urls[0]" id="icon-update-record">
                                </div>
                            </div>
                        </td>
                        <td v-if="props.nameTable === 'calls_report'">
                            <div class="centered-td-content">
                                <div class="icon-container icon-remove-record-container" @click="deleteRecord(rowIndex)">
                                    <img :src="props.urls[1]" id="icon-remove-record">
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="(_, i) in additionalRows" :key="i">
                        <td v-for="column in columns" :key="column">
                            <div class="centered-td-content"></div>
                        </td>
                        <td v-if="props.nameTable === 'calls_report'"></td>
                        <td v-if="props.nameTable === 'calls_report'"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, onBeforeMount, watch, onMounted } from 'vue';
import store from '@/store'
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
    },
    urls: {
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
    identifier: {
        type: String,
        require: true
    }
});
const columns = ref();
const additionalRows = ref([]);
const numAdditionalRows = ref(0);

let editRecord
let deleteRecord
const editingRows = ref([]);
const localData = ref([]);


onBeforeMount(() => {
    localData.value = JSON.parse(JSON.stringify(props.data));
    console.log(props.nameTable)

    columns.value = props.data.length > 0 ? Object.keys(props.data[0]) : [];
    if (props.data.length < props.minRows) {
        numAdditionalRows.value = props.minRows - props.data.length;
        for (let i = 0; i <= numAdditionalRows.value; i++) {
            additionalRows.value.push(i + props.data.length);
        }
    }
})
watch(() => props.data, (newData) => {
    localData.value = JSON.parse(JSON.stringify(newData));
});

function convertKeysToLowerCase(obj) {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value])
    );
}

onMounted(() => {
    const obtainValueInputsRecord = (rowIndex) => {
        const inputs = document.querySelectorAll(`.input-${props.nameTable}-row-${rowIndex}`);
        const editedRecord = {};
        inputs.forEach(input => {
            const name = input.id.split('-')[1];
            const value = input.value;
            editedRecord[name] = value;
        });
        return editedRecord;
    };

    editRecord = async (rowIndex) => {
        if (!editingRows.value.includes(rowIndex)) {
            editingRows.value.push(rowIndex);
            return;
        }

        const dataEditedInputRecord = obtainValueInputsRecord(rowIndex);
        const recordsNameTable = await store.dispatch('obtainRecordsTable', props.nameTable);
        const dataOriginalInputRecord = recordsNameTable[rowIndex];
        await store.dispatch('editRecordTable', {
            "editRecord": dataEditedInputRecord,
            "originalRecord": {id: dataEditedInputRecord.Id},
            "identifier": props.identifier,
            "nameTable": props.nameTable
        });

        const tables = localStorage.getItem('tables');
        if (tables && store.state.alertMessage["type"] === "success") {
            const tablesObject = JSON.parse(tables);
            const records = tablesObject["CAE"][props.nameObject]["records"];
            records[rowIndex] = convertKeysToLowerCase(dataEditedInputRecord);
            localStorage.setItem('tables', JSON.stringify(tablesObject));

            localData.value[rowIndex] = convertKeysToLowerCase(dataEditedInputRecord);
        }

        editingRows.value = editingRows.value.filter(index => index !== rowIndex);
        store.state.loading = false;
    };

    deleteRecord = async (rowIndex) => {
        const dataDeletedInputRecord = obtainValueInputsRecord(rowIndex);
        const identifier = dataDeletedInputRecord[props.identifier];
        await store.dispatch('deleteRecordTable', {
            "recordIdentifier": dataDeletedInputRecord.Id,
            "identifier": props.identifier,
            "nameTable": props.nameTable
        });

        const tables = localStorage.getItem('tables');
        if (tables && store.state.alertMessage["type"] === "success") {
            const tablesObject = JSON.parse(tables);
            const records = tablesObject["CAE"][props.nameObject]["records"];
            records.splice(rowIndex, 1);
            localStorage.setItem('tables', JSON.stringify(tablesObject));

            localData.value.splice(rowIndex, 1);
            store.state.rowDeleteEdit = true;
        }
        store.state.loading = false;
    };
});

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400..800');

:root {
    --margin-color: #{{ props.color }}
}

.table-3-container {
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
    border-top: 2px solid --margin-color;
    border-bottom: 2px solid --margin-color;
    border-right: 3px solid #7EB6FF;
}

thead th:first-of-type {
    border-top-left-radius: 10px;
    border-left: 2px solid --margin-color;
    border-right: 3px solid #7EB6FF
}

thead th:last-of-type {
    border-top-right-radius: 10px;
    border-right: 0px;
    border-right: 2px solid --margin-color;
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

tbody tr td {
    border-bottom: 2px solid #7EB6FF;
}

tbody tr td:first-of-type {
    border-left: 2px solid #7EB6FF;
}

tbody tr td:last-of-type {
    border-right: 0px;
    border-right: 2px solid #7EB6FF;
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
    border-right: 3px solid #7EB6FF;
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
.icon-container {
    width: 40%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
}

#icon-update-record,
#icon-remove-record {
    height: 50%;
    width: auto;
}

.icon-update-record-container {
    background: #2ABBA7;
    transition: background 0.3s ease;
}

.icon-remove-record-container {
    background: #F0284A;
    transition: background 0.3s ease;
}

.icon-update-record-container:hover {
    background: #27a794
}

.icon-remove-record-container:hover {
    background: #e50b30
}
</style>