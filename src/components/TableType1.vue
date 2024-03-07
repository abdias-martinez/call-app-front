<template>
    <div class="table-1-container">
        <div class="table-wrapper">
            <table>
                <thead :style="{ background: '#FFF' }">
                    <th v-for="column in columns" :key="column" :style="{ width: `${100 / (columns.length + 2)}%` }">
                        {{ column.toUpperCase() }}
                    </th>
                    <th :style="{ width: `${100 / (columns.length + 2)}%` }">EDITAR</th>
                    <th :style="{ width: `${100 / (columns.length + 2)}%` }">BORRAR</th>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in data" :key="rowIndex"
                        :class="{ 'even-row': rowIndex % 2 === 0, 'odd-row': rowIndex % 2 !== 0 }" :id="`row-${rowIndex}-${props.nameTable}`">
                        <td v-for="column in columns" :key="column">
                            <div class="centered-td-content">
                                <input type="text" :value="row[column]" :class="`input-${props.nameTable}-row-${rowIndex}`"
                                    :id="`input-${column.charAt(0).toUpperCase() + column.slice(1)}-row-${rowIndex}`" />
                            </div>
                        </td>
                        <td :class="`td-${rowIndex}`">
                            <div class="centered-td-content">
                                <div :class="['icon-container', 'icon-update-record-container']" @click="editRecord(rowIndex)"
                                    :id="`button-row-${rowIndex}`">
                                    <img :src="props.urls[0]" id="icon-update-record">
                                </div>
                            </div>
                        </td>
                        <td :class="`td-${rowIndex}`">
                            <div class="centered-td-content">
                                <div :class="['icon-container', 'icon-remove-record-container']" @click="deleteRecord(rowIndex)">
                                    <img :src="props.urls[1]" id="icon-remove-record">
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="(row, i) in additionalRows" :key="i"
                        :class="{ 'even-row': row % 2 == 0, 'odd-row': row % 2 !== 0 }">
                        <td v-for="column in columns" :key="column">
                            <div class="centered-td-content">
                            </div>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>  
  
<script setup>
import { defineProps, ref, onBeforeMount, onMounted } from 'vue';
import store from '@/store'
const columns = ref();
const additionalRows = ref([]);
const numAdditionalRows = ref(0);
let editRecord
let deleteRecord
const props = defineProps({
    data: {
        type: Array,
        required: true,
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
    minRows: {
        type: Number,
        required: true
    },
    identifier: {
        type: String,
        require: true
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
onMounted(() => {
    const obtainValueInputsRecord = (rowIndex) => {
        const inputs = document.querySelectorAll(`.input-${props.nameTable}-row-${rowIndex}`)
        const editedRecord = {}
        inputs.forEach(input => {
            const name = input.id.split('-')[1]
            const value = input.value
            editedRecord[name] = value
        })
        return editedRecord
    }

    editRecord = async (rowIndex) => {
        const dataEditedInputRecord = obtainValueInputsRecord(rowIndex)
        const recordsNameTable = await store.dispatch('obtainRecordsTable', props.nameTable)
        const dataOriginalInputRecord = recordsNameTable[rowIndex]
        await store.dispatch('editRecordTable', { "editRecord": dataEditedInputRecord, "originalRecord": dataOriginalInputRecord, "identifier": props.identifier, "nameTable": props.nameTable })
        // OBTENEMOS EL JSON 'tables' ALMACENADO LOCAL-STORAGE
        const tables = localStorage.getItem('tables');
        // SI EL JSON EXISTE Y LA EDICIÓN SE DIO CORRECTAMENTE
        if (tables && store.state.alertMessage["type"] == "success") {
            // CONVERTIMOS EL JSON 'tables' EN UN OBJETO
            const tablesObject = JSON.parse(tables);
            //tablesObject["CAE"][props.nameObject]["records"] = await store.dispatch('obtainRecordsTable', props.nameTable)
            // OBTENEMOS LOS REGISTROS DEL OBJETO 'tablesObject'
            const records = tablesObject["CAE"][props.nameObject]["records"]
            // EDITAMOS EL REGISTRO
            records[rowIndex] = dataEditedInputRecord
            // ACTUALIZAMOS EL VALOR DEL JSON 'tables' ALMACENADO EN EL LOCAL-STORAGE
            localStorage.setItem('tables', JSON.stringify(tablesObject));
        }
        store.state.loading = false
    }

    deleteRecord = async (rowIndex) => {
        const dataDeletedInputRecord = obtainValueInputsRecord(rowIndex)
        const identifier = dataDeletedInputRecord[props.identifier]
        await store.dispatch('deleteRecordTable', { "recordIdentifier": identifier, "identifier": props.identifier, "nameTable": props.nameTable })
        // OBTENEMOS EL JSON 'tables' ALMACENADO LOCAL-STORAGE
        const tables = localStorage.getItem('tables');
        // SI EL JSON EXISTE Y LA ELIMINACIÓN SE DIO CORRECTAMENTE
        if (tables && store.state.alertMessage["type"] == "success") {
            // CONVERTIMOS EL JSON 'tables' EN UN OBJETO
            const tablesObject = JSON.parse(tables);
            // OBTENEMOS LOS REGISTROS DEL OBJETO 'tablesObject'
            const records = tablesObject["CAE"][props.nameObject]["records"]
            // ELIMINAMOS EL REGISTRO
            records.splice(rowIndex, 1);
            // ACTUALIZAMOS EL VALOR DEL JSON 'tables' ALMACENADO EN EL LOCAL-STORAGE
            localStorage.setItem('tables', JSON.stringify(tablesObject));

            store.state.rowDeleteEdit = true
        }
        store.state.loading = false
    }
})
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400..800');

.table-1-container {
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
    width: 100%;
    display: flex;
    justify-content: center;
}

.table-wrapper::-webkit-scrollbar {
    width: 0px;
}

table {
    width: 98%;
    height: auto;
    border: none;
    border-spacing: 5px 0px;
    border-radius: 20px;
    outline: none;
    margin: none;
}

thead {
    position: sticky;
    top: 0;
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
    background: #687FBB;
    color: #fff;
    font-family: "Baloo 2", sans-serif;
    font-size: 25px;
    font-weight: 500;
}

thead th:first-of-type {
    border-top-left-radius: 10px;
}

thead th:last-of-type {
    border-top-right-radius: 10px;
}

tbody {
    width: 100%;
    height: auto;
    background: #6078bb;
    border-radius: 0 20px 20px 0;
}

.even-row {
    background: #6078bb;
    width: 100%;
    max-height: 45px;
}

.odd-row {
    background: #6078bb;
    width: 100%;
    max-height: 45px;
}

tbody tr:last-of-type td:first-of-type {
    border-bottom-left-radius: 10px;
}

tbody tr:last-of-type td:last-of-type {
    border-bottom-right-radius: 10px;
}

td {
    width: auto;
    height: 45px;
    text-align: center;
    padding: 0;
    overflow: hidden;
}

.even-row td {
    background: #fff;
}

.odd-row td {
    background: #DAE3FA;
}

.centered-td-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}

input {
    border: none;
    outline: none;
    width: 100%;

    max-height: 45px;
    background: transparent;
    padding: 0 20px 0 20px;

    font-family: "Baloo 2", sans-serif;
    font-size: 20px;
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
    height: 70%;
    width: auto;
}

.icon-update-record-container {
    background: #2ABBA7
}

.icon-remove-record-container {
    background: #F0284A
}

.icon-update-record-container:hover {
    background: #00DABC
}

.icon-remove-record-container:hover {
    background: #ff002b
}
</style>
