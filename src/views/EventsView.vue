<template>
    <!-- Vista de eventos -->
    <div class="events-view-container">
        <!-- Formulario de entrada y botones -->
        <form class="inputs-buttons-area-container">
            <div class="inputs-buttons-container">
                <!-- Desplegable (dropdown) para seleccionar el poste -->
                <DropDown id="select-post-container" :options="['1', '2', '3', '4', '5']" :name="'Poste'"
                    :identifier="'post'" :height="'129px'" @optionIsChange="updatePost" />
                <!-- Desplegable (dropdown) para seleccionar el evento -->
                <DropDown id="select-event-container" :options="['PRUEBAS', 'FALLA MECÁNICA', 'ACCIDENTE']" :name="'Evento'"
                    :identifier="'event'" :height="'auto'" @optionIsChange="updateEvent" />
                <!-- Desplegable (dropdown) para seleccionar el derivado -->
                <DropDown id="select-derived-container" :options="['NO', 'OP GRUA', 'BOMBEROS']" :name="'Derivado'"
                    :identifier="'derived'" :height="'auto'" @optionIsChange="updateDerived" />
                <!-- Desplegable (dropdown) para seleccionar el vehículo -->
                <DropDown id="select-vehicle-container" :options="['NO', 'CAMIÓN', 'AUTO']" :name="'Vehículo'"
                    :identifier="'vehicle'" :height="'auto'" @optionIsChange="updateVehicle" />
                <!-- Desplegable (dropdown) para seleccionar presencia de personas -->
                <DropDown id="select-persons-container" :options="['SI', 'NO']" :name="'Personas'" :height="'auto'"
                    :identifier="'persons'" @optionIsChange="updatePersons" />

                <!-- Contenedor de botones -->
                <div id="buttons-container">
                    <!-- Botón guardar -->
                    <div class="button-container" id="icon-save-button" @click="registerEvent">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_16_j4ihaq.png"
                            alt="icon-save-button">
                    </div>

                    <!-- Botón limpiar -->
                    <div class="button-container" id="icon-clear-button" @click="clearDataEvent">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_17_mrwof7.png"
                            alt="icon-clear-button">
                    </div>
                </div>
            </div>
            <textarea class="description-container" placeholder="DESCRIPCIÓN:" v-model="description"
                :class="{ 'disabled': store.state.loading }"></textarea>
        </form>

        <!-- Contenedor de tabla de eventos -->
        <div class="table-events-container" ref="table">
            <!-- Aquí se insertará la tabla de eventos -->
        </div>
    </div>
</template>

<script lang="ts" setup>
// IMPORTACIONES NECESARIAS
import DropDown from '@/components/DropDown.vue'
import TableType1 from '@/components/TableType1.vue'
import { ref, onMounted, createApp, watch } from 'vue'
import { useStore } from 'vuex'
// DEFINICIÓN DE CONSTANTES
const store = useStore()
const date = ref()
const post = ref('')
const event = ref('')
const derived = ref('')
const vehicle = ref('')
const persons = ref('')
const description = ref('')
const table = ref()
// DEFINIMOS LA ESTRUCTURA REACTIVA QUE ALMACENARÁ LOS DATOS DEL FORMULARIO '<form class="inputs-buttons-area-container"></form>'
const dataEvent = ref({
    'Fecha': date,
    "Poste": post,
    "Evento": event,
    "Derivado": derived,
    "Vehiculo": vehicle,
    "Personas": persons,
    "Descripcion": description
})
onMounted(() => {
    // CREAMOS Y MONTAMOS EL COMPONENTE 'TableType1' EN '<div class="table-events-container"></div>'
    createInsertTable()
    watch(() => store.state.rowDeleteEdit, () => {
        if (store.state.rowDeleteEdit) {
            createInsertTable()
            store.commit('restoreRowDeleteEdit')
        }
    })
})
// FUNCIONALIDAD PARA CREAR UNA INSTANCIA DEL COMPONENTE 'TableType1' Y MONTARLO EN '<div class="table-events-container"></div>'
const createInsertTable = () => {
    // OBTENEMOS EL OBJETO 'tables' DEL LOCAL-STORAGE
    const tables = localStorage.getItem('tables')
    // SI EL OBJETO EXISTE
    if (tables) {
        const eventsTable = JSON.parse(tables)["CAE"]["Eventos"]["records"]
        const propsData = {
            data: eventsTable,
            urls: ['https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_18_dx7tlk.png', 'https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_17_mrwof7.png'],
            nameTable: 'events',
            nameObject: 'Eventos',
            minRows: 7,
            identifier: 'Fecha'
        }
        // CREAMOS UNA INSTANCIA DEL COMPONENTE 'TableType1'
        const newTable = createApp(TableType1, propsData)
        console.log(`newTable: ${newTable}`)
        // SI EL ELEMENTO '<div class="table-events-container"></div>' AL QUE 'table' HACE REFERENCIA, EXISTE 
        if (table.value) {
            // MONTAMOS LA INSTANCIA DE 'TableType1' EN EL ELEMENTO QUE REFERENCIA 'table'
            newTable.mount(table.value)
            console.log(`table: ${table.value}`)
        }
    }
}
// FUNCIONALIDAD PARA ACTUALIZAR EL VALOR DE 'profile.value'
const updatePost = (newPost: string) => {
    post.value = newPost
}
// FUNCIONALIDAD PARA ACTUALIZAR EL VALOR DE 'event.value'
const updateEvent = (newEvent: string) => {
    event.value = newEvent
}
// FUNCIONALIDAD PARA ACTUALIZAR EL VALOR DE 'derived.value'
const updateDerived = (newDerived: string) => {
    derived.value = newDerived
}
// FUNCIONALIDAD PARA ACTUALIZAR EL VALOR DE 'vehicle.value'
const updateVehicle = (newVehicle: string) => {
    vehicle.value = newVehicle
}
// FUNCIONALIDAD PARA ACTUALIZAR EL VALOR DE 'persons.value'
const updatePersons = (newPersons: string) => {
    persons.value = newPersons
}
// FUNCIONALIDAD PARA REGISTRAR UN NUEVO EVENTO
const registerEvent = async () => {
    if (!store.state.loading) {
        store.state.loading = true
        date.value = obtainDateTimeRegister()
        const dataEventConst = dataEvent.value;
        // ENVIAMOS 'dataEventConst' AL BACKEND PARA INSERTARLO EN LA TABLA 'events' DE LA BASE DE DATOS
        await store.dispatch('insertRecordTable', { "recordToInsert": dataEventConst, "nameTable": "events" });
        // SI EL REGISTRO SE HIZO SIN PROBLEMAS
        if (store.state.alertMessage["type"] == "success") {
            // OBTENEMOS EL JSON 'tables' ALMACENADO LOCAL-STORAGE
            const tables = localStorage.getItem('tables');
            // SI EL OBJETO EXISTE
            if (tables) {
                // CONVERTIMOS EL JSON 'tables' EN UN OBJETO
                const tablesObject = JSON.parse(tables);
                // ACTUALIZAMOS EL ARRAY 'records' DEL OBJETO 'Eventos' DEL OBJETO 'tablesObject'
                tablesObject["CAE"]["Eventos"]["records"].push(dataEventConst);
                // ACTUALIZAMOS EL VALOR DEL JSON 'tables' ALMACENADO EN EL LOCAL-STORAGE
                localStorage.setItem('tables', JSON.stringify(tablesObject));
            }
            createInsertTable()
        }
        store.state.loading = false
    }
}
//FUNCIONALIDAD PARA LIMPIAR LOS CAMPOS DE ENTRADA DEL FORMULARIO
const clearDataEvent = () => {
    if (!store.state.loading) {
        // CAMBIAMOS EL ESTADO 'shouldCleanEntries' A 'true' PARA QUE LOS COMPONENTES '<DropDown/>'
        // LO DETECTEN Y BORREN LA OPCIÓN QUE TIENEN SELECCIONADA
        store.commit('changeShouldCleanEntries')

        date.value = ''
        post.value = ''
        event.value = ''
        derived.value = ''
        vehicle.value = ''
        persons.value = ''
        description.value = ''
    }
}
//
const obtainDateTimeRegister = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
};
</script>

<style scoped>
/* importamos la fuente 'Baloo 2' */
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400..800');

/* estilos para el contendor de la vista eventos */
.events-view-container {
    width: 90%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.2fr 1fr;
    gap: 40px;
}

.inputs-buttons-area-container {
    padding: 10px;
    grid-column: 1;
    grid-row: 1;
    background: #fff;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 1fr;
    gap: 10px;
}

.inputs-buttons-container {
    grid-column: 1;
    grid-row: 1;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr;
    gap: 10px;
    font-family: "Baloo 2", sans-serif;
    font-size: 25px;
}

#select-profile-container {
    grid-column: 1;
    grid-row: 1;
}

#select-event-container {
    grid-column: 2;
    grid-row: 1;
}

#select-derived-container {
    grid-column: 3;
    grid-row: 1;
}

#select-vehicle-container {
    grid-column: 4;
    grid-row: 1;
}

#select-persons-container {
    grid-column: 5;
    grid-row: 1;
}

#buttons-container {
    height: 35.8px;
    width: auto;
    grid-column: 6;
    grid-row: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.button-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
}

#icon-save-button {
    background: #2ABBA7;
}

#icon-save-button:hover {
    background: #00DABC;
}

#icon-clear-button {
    background: #F0284A;
}

#icon-clear-button:hover {
    background: #ff002b;
}

.button-container img {
    height: 50%;
    width: auto;
}

.description-container {
    appearance: none;
    border: 2px solid #1877F2;
    outline: none;
    grid-column: 1;
    grid-row: 2;
    padding: 5px 10px;
    border-radius: 8px;
    font-family: "Baloo 2", sans-serif;
    font-size: 16px;
    resize: none;
}

.description-container::placeholder {
    color: #5B5B5B;
}

.description-container:focus {
    outline: none;
    color: #1877F2;
}

.disabled {
    opacity: 0.5;
    pointer-events: none;
}

.table-events-container {
    grid-column: 1;
    grid-row: 2;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    padding: 10px 0;
}
</style>