<template>
    <!-- Vista de eventos -->
    <div class="settings-view-container">

        <div class="inputs-buttons-container">
            <DropDown id="select-setting-container" :options="['Registro postes', 'Registro evento', 'Registro derivado', 'Registro persona', 'Registro vehículo']"
                :name="''" :value="selectedReportType"  :identifier="'report_settings'" @optionIsChange="updateReportType" />
        </div>

        <div v-if="selectedReportType === 'Registro postes'" id="register-post-container" class="register-container">
            <form id="register-post-form">
                <!-- Campos de entrada para Poste, Número, Operador, Progresiva y Ruta -->
                <input class="input-container" id="input-1" type="text" placeholder="Poste" v-model="post"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('numpost') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('numpost') || store.state.blocked.includes('all')) }">

                <input class="input-container" id="input-2" type="text" placeholder="Número" v-model="number"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('number') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('number') || store.state.blocked.includes('all')) }">

                <input class="input-container" id="input-3" type="text" placeholder="Operador" v-model="operator"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('operator') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('operator') || store.state.blocked.includes('all')) }">

                <input class="input-container" id="input-4" type="text" placeholder="Progresiva" v-model="progresive"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('progresive') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('progresive') || store.state.blocked.includes('all')) }">

                <input class="input-container" id="input-5" type="text" placeholder="Ruta" v-model="route"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('route') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('route') || store.state.blocked.includes('all')) }">

                <!-- Contenedor de botones -->
                <div class="buttons-container" id="buttons-1-container">
                    <!-- Botón guardar -->
                    <div class="icon-save-button-container" @click="registerData(dataPost, 'post_register', 'Registro_Poste', ['all'])"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_16_j4ihaq.png"
                            alt="icon-save-button">
                    </div>

                    <!-- Botón limpiar -->
                    <div class="icon-clear-button-container" @click="() => {post = ''; number = ''; operator = ''; progresive = '', route = ''}"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_17_mrwof7.png"
                            alt="icon-clear-button">
                    </div>
                </div>
            </form>
        </div>
        <div v-if="selectedReportType === 'Registro evento'" id="register-event-container" class="register-container">
            <form id="register-event-form">
                <input class="input-container" id="input-6" type="text" placeholder="Evento" v-model="event"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('eventname') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('eventname') || store.state.blocked.includes('all')) }">

                <!-- Contenedor de botones -->
                <div class="buttons-container" id="buttons-2-container">
                    <!-- Botón guardar -->
                    <div class="icon-save-button-container" @click="registerData(dataEvent, 'event_types', 'Tipos_Evento', ['all'])"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_16_j4ihaq.png"
                            alt="icon-save-button">
                    </div>

                    <!-- Botón limpiar -->
                    <div class="icon-clear-button-container" @click="() => {event = ''}"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_17_mrwof7.png"
                            alt="icon-clear-button">
                    </div>
                </div>
            </form>
        </div>
        <div v-if="selectedReportType === 'Registro derivado'" id="register-derived-container" class="register-container">
            <form id="register-derived-form">
                <input class="input-container" id="input-7" type="text" placeholder="Derivado" v-model="derived"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('derived') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('derived') || store.state.blocked.includes('all')) }">

                <!-- Contenedor de botones -->
                <div class="buttons-container" id="buttons-3-container">
                    <!-- Botón guardar -->
                    <div class="icon-save-button-container" @click="registerData(dataDerived, 'derived_types', 'Tipos_Derivado', ['all'])"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_16_j4ihaq.png"
                            alt="icon-save-button">
                    </div>

                    <!-- Botón limpiar -->
                    <div class="icon-clear-button-container" @click="() => {derived = ''}"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_17_mrwof7.png"
                            alt="icon-clear-button">
                    </div>
                </div>
            </form>
        </div>
        <div v-if="selectedReportType === 'Registro vehículo'" id="register-vehicle-container" class="register-container">
            <form id="register-vehicle-form">
                <input class="input-container" id="input-8" type="text" placeholder="Vehículo" v-model="vehicle"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('vehicles') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('vehicles') || store.state.blocked.includes('all')) }">

                <!-- Contenedor de botones -->
                <div class="buttons-container" id="buttons-4-container">
                    <!-- Botón guardar -->
                    <div class="icon-save-button-container" @click="registerData(dataVehicle, 'vehicle_types', 'Tipos_Vehiculo', ['all'])"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_16_j4ihaq.png"
                            alt="icon-save-button">
                    </div>

                    <!-- Botón limpiar -->
                    <div class="icon-clear-button-container" @click="() => {vehicle = ''}"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_17_mrwof7.png"
                            alt="icon-clear-button">
                    </div>
                </div>
            </form>
        </div>
        <div v-if="selectedReportType === 'Registro persona'" id="register-persons-container" class="register-container">
            <form id="register-persons-form">
                <input class="input-container" id="input-9" type="text" placeholder="Persona" v-model="person"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('persons') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('persons') || store.state.blocked.includes('all')) }">

                <!-- Contenedor de botones -->
                <div class="buttons-container" id="buttons-5-container">
                    <!-- Botón guardar -->
                    <div class="icon-save-button-container" @click="registerData(dataPerson, 'person_types', 'Tipos_Persona', ['all'])"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_16_j4ihaq.png"
                            alt="icon-save-button">
                    </div>

                    <!-- Botón limpiar -->
                    <div class="icon-clear-button-container" @click="() => {person = ''}"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_17_mrwof7.png"
                            alt="icon-clear-button">
                    </div>
                </div>
            </form>
        </div>

       <div class="table-reports-container" ref="table">
            <!-- Aquí se insertará la tabla de reportes -->
        </div>

    </div>
</template>

<script lang="ts" setup>
// IMPORTACIONES NECESARIAS
import { ref, createApp, onMounted, watch, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import DropDown from '@/components/DropDown.vue'
import TableType1 from '@/components/TableType1.vue'
// DEFINICIÓN DE CONSTANTES
const store = useStore()
const post = ref('')
const number = ref('')
const operator = ref('')
const progresive = ref('')
const route = ref('')
const event = ref('')
const derived = ref('')
const vehicle = ref('')
const person = ref('')

const table = ref()
const tables = ref()
const postTable = ref()
const eventTable = ref()
const derivedTable = ref()
const vehicleTable = ref()
const personTable = ref()

const selectedReportType = ref('Registro postes');
// DEFINIMOS LA ESTRUCTURA REACTIVA QUE ALMACENARÁ LOS DATOS DEL FORMULARIO POSTE
const dataPost = ref({
    "num_poste": post,
    "tel_numero": number,
    "operador": operator,
    "progresiva": progresive,
    "ruta": route,
})
// DEFINIMOS LA ESTRUCTURA REACTIVA QUE ALMACENARÁ LOS DATOS DEL FORMULARIO EVENTO
const dataEvent = ref({
    "evento": event,
})
// DEFINIMOS LA ESTRUCTURA REACTIVA QUE ALMACENARÁ LOS DATOS DEL FORMULARIO DERIVADO
const dataDerived = ref({
    "derivado": derived,
})
// DEFINIMOS LA ESTRUCTURA REACTIVA QUE ALMACENARÁ LOS DATOS DEL FORMULARIO VEHICULO
const dataVehicle = ref({
    "vehiculo": vehicle,
})
// DEFINIMOS LA ESTRUCTURA REACTIVA QUE ALMACENARÁ LOS DATOS DEL FORMULARIO PERSONA
const dataPerson = ref({
    "persona": person,
})


onBeforeMount(() => {
    const tablesJSON = localStorage.getItem('tables')
    if (tablesJSON) {
        tables.value = tablesJSON

        postTable.value = JSON.parse(tables.value)["CAE"]["Registro_Poste"]["records"]
        eventTable.value = JSON.parse(tables.value)["CAE"]["Tipos_Evento"]["records"]
        derivedTable.value = JSON.parse(tables.value)["CAE"]["Tipos_Derivado"]["records"]
        vehicleTable.value = JSON.parse(tables.value)["CAE"]["Tipos_Vehiculo"]["records"]
        personTable.value = JSON.parse(tables.value)["CAE"]["Tipos_Persona"]["records"]
    }
})

const createInsertTable1 = (tableData: object, nameObject: string, nameTable: string ) => {
    if (tableData) {
        const propsData = {
            data: tableData,
            urls: ['https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_18_dx7tlk.png', 'https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_17_mrwof7.png'],
            nameTable: nameTable, //'events',
            nameObject: nameObject, // Eventos',
            minRows: 7,
            identifier: 'id',
            convertLow: true
        }
        const newTable = createApp(TableType1, propsData)
        console.log(`newTable: ${newTable}`)
        if (table.value) {
            newTable.mount(table.value)
            console.log(`table: ${table.value}`)
        }
    }
}

onMounted(() => {
    createInsertTable1(postTable.value, 'Registro_Poste', 'post_register');

    watch(() => selectedReportType.value, () => {
        console.log(`reporte mostrado: ${selectedReportType.value}`)
        post.value = ''

        switch (selectedReportType.value) {
            case 'Registro postes':
                console.log('poste')
                createInsertTable1(postTable.value, 'Registro_Poste', 'post_register');
                break;
            case 'Registro evento':
                console.log('evento')
                createInsertTable1(eventTable.value, 'Tipos_Evento', 'event_types');
                break;
            case 'Registro derivado':
                console.log('derivado')
                createInsertTable1(derivedTable.value, 'Tipos_Derivado', 'derived_types');
                break;
            case 'Registro vehículo':
                createInsertTable1(vehicleTable.value, 'Tipos_Vehiculo', 'vehicle_types');
                break;
            case 'Registro persona':
                createInsertTable1(personTable.value, 'Tipos_Persona', 'person_types');
                break;
        }
    });

})

const updateReportType = (selectedOption: string) => {
    selectedReportType.value = selectedOption;
};

// FUNCIONALIDAD PARA REGISTRAR UN NUEVO USUARIO
const registerData = async (data: object, nameTable: string, nameObject: string, blocked: string[]) => {
    if (!store.state.isLoading) {
        store.state.isLoading = true
        const dataConst = data;
        store.state.blocked = blocked
        // ENVIAMOS 'dataConst' AL BACKEND PARA INSERTARLO EN LA TABLA 'nameTable' DE LA BASE DE DATOS
        await store.dispatch('insertRecordTable', { "recordToInsert": dataConst, "nameTable": nameTable });
        // SI EL REGISTRO SE HIZO SIN PROBLEMAS
        if (store.state.alertMessage["type"] == "success") {
            // OBTENEMOS EL JSON 'tables' ALMACENADO LOCAL-STORAGE
            const tables = localStorage.getItem('tables');
            // SI EL OBJETO EXISTE
            if (tables) {
                // CONVERTIMOS EL JSON 'tables' EN UN OBJETO
                const tablesObject = JSON.parse(tables);
                // ACTUALIZAMOS EL ARRAY 'records' DEL OBJETO 'nameObject' DEL OBJETO 'tablesObject'
                tablesObject["CAE"][nameObject]["records"].push(dataConst);
                // ACTUALIZAMOS EL VALOR DEL JSON 'tables' ALMACENADO EN EL LOCAL-STORAGE
                localStorage.setItem('tables', JSON.stringify(tablesObject));
            }
        }
        store.state.blocked = []
        store.state.isLoading = false
    }
};

</script>

<style scoped>
/* importamos la fuente 'Ubuntu' */
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

.inputs-buttons-container {
    padding: 10px;
    grid-column: 1;
    grid-row: 1;
    background: #fff;
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(4, 1fr) repeat(2, 0.8fr);
    grid-template-rows: 1fr;
    gap: 10px;
}

#select-report-container {
    grid-column: 5;
    grid-row: 1;
}
#select-setting-container {
    height: 50px;
}

.disabled {
    opacity: 0.5;
    pointer-events: none;
}

/* estilos para el contenedor de la vista home */
.settings-view-container {
    width: 90%;
    height: 100%;
    /* display: grid; */
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(10, 1fr);
    gap: 40px;
}

.input-container {
    border: 2px solid #1877F2;
    border-radius: 8px;
    overflow: hidden;
    font-size: 16px;
    display: flex;
    padding: 0 15px 0 15px;
    color: #5B5B5B;
    font-family: "Baloo 2", sans-serif;
    height: 36px;
}

.input-container::placeholder {
    color: #5B5B5B;
}

.input-container:focus {
    outline: none;
    color: #1877F2;
}

.register-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0px;
    background: #fff;
    border-radius: 10px;
}

#register-post-container {
    grid-column: 1;
    grid-row: 1 / 5;
}

#register-post-form {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    /* grid-template-rows: repeat(3, 1fr); */
    padding: 10px;
    gap: 10px;
}

.buttons-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.buttons-container div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
}

.buttons-container div img {
    height: 50%;
    width: auto;
}

.icon-save-button-container {
    grid-column: 1;
    background: #2ABBA7;
    transition: background 0.3s ease;
}

.icon-save-button-container:hover {
    background: #27a794;
}

.icon-clear-button-container {
    grid-column: 2;
    background: #F0284A;
    transition: background 0.3s ease;
}

.icon-clear-button-container:hover {
    background: #e50b30;
}

#buttons-1-container {
    grid-column: 6;
    grid-row: 1;
}

#register-event-container {
    grid-column: 2;
    grid-row: 1 / 3;
    padding: 10px;
}

#register-event-form {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

#input-6 {
    grid-column: 1;
    grid-row: 1;
}

#buttons-2-container {
    grid-column: 2;
    grid-row: 1;
}

#register-derived-container {
    grid-column: 2;
    grid-row: 3 / 5;
    padding: 10px;
}

#register-derived-form {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

#input-7 {
    grid-column: 1;
    grid-row: 1;
}

#buttons-3-container {
    grid-column: 2;
    grid-row: 1;
}

#register-vehicle-container {
    grid-column: 1;
    grid-row: 5 / 7;
    padding: 10px;
}

#register-vehicle-form {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

#input-8 {
    grid-column: 1;
    grid-row: 1;
}

#buttons-4-container {
    grid-column: 2;
    grid-row: 1;
}

#register-persons-container {
    grid-column: 2;
    grid-row: 5 / 7;
    padding: 10px;
}

#register-persons-form {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

#input-9 {
    grid-column: 1;
    grid-row: 1;
}

#buttons-5-container {
    grid-column: 2;
    grid-row: 1;
}
.table-reports-container {
    grid-column: 1;
    grid-row: 2;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    height: 100%;
}
</style>