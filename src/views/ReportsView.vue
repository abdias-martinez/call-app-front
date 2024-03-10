<template>
    <!-- Vista de reportes -->
    <div class="reports-view-container">
        <!-- Formulario de entrada y botones -->
        <form class="inputs-buttons-container">
            <!-- Desplegable (dropdown) para seleccionar el tipo de reporte -->
            <DropDown id="select-report-container" :options="['Postes', 'Estado postes', 'Llamadas']"
                :name="'Tipo reporte'" :height="'auto'" :identifier="'report'" @optionIsChange="updateReportType" />

            <!-- Desplegable (dropdown) para seleccionar la fecha -->
            <DropDown id="select-date-container"
                :options="['01-03-22', '28-02-22', '27-02-22', '26-02-22', '25-02-22', '24-02-22', '23-02-22', '22-02-22', '21-02-22', '20-02-22', '19-02-22', '18-02-22', '17-02-22', '16-02-22', '15-02-22', '14-02-22', '13-02-22', '12-02-22', '11-02-22', '10-02-22']"
                :name="'Filtrar por fecha'" :height="'149px'" :identifier="'date'" @optionIsChange="updateDate" />

            <!-- Desplegable (dropdown) para seleccionar el poste -->
            <DropDown id="select-post-container" :options="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']"
                :name="'Filtrar por poste'" :height="'149px'" :identifier="'post'" @optionIsChange="updatePost" />

            <!-- Desplegable (dropdown) para seleccionar un audio -->
            <DropDown id="select-audio-container"
                :options="['audio_1.mp3', 'audio_2.mp3', 'audio_3.mp3', 'audio_4.mp3', 'audio_5.mp3', 'audio_6.mp3', 'audio_7.mp3', 'audio_8.mp3', 'audio_9.mp3', 'audio_10.mp3']"
                :name="'Audio disponible'" :height="'149px'" :identifier="'audio'" @optionIsChange="updateAudio" />

            <!-- Botón guardar -->
            <div class="button-container" id="icon-play-button">
                <h3>Reproducir grabación</h3>
                <img src="../assets/images/icon-play.png" alt="icon-play-button">
            </div>

            <!-- Botón limpiar -->
            <div class="button-container" id="icon-export-button">
                <h3>Exportar reporte</h3>
                <img src="../assets/images/icon-export.png" alt="icon-export-button">
            </div>
        </form>

        <!-- Contenedor de tabla de reportes -->
        <div class="table-reports-container" ref="table">
            <!-- Aquí se insertará la tabla de reportes -->
        </div>
    </div>
</template>

<script lang="ts" setup>
// IMPORTACIONES NECESARIAS
import DropDown from '@/components/DropDown.vue'
import TableType2 from '@/components/TableType2.vue'
import TableType3 from '@/components/TableType3.vue'
import { ref, createApp, watch, onBeforeMount, onMounted } from 'vue'
// DEFINICIÓN DE CONSTANTES
const report = ref()
const date = ref()
const post = ref()
const audio = ref()
const table = ref()
const tables = ref()
const postsTable = ref()
const actualPostTable = ref()
const callsTable = ref()

onBeforeMount(() => {
    const tablesJSON = localStorage.getItem('tables')
    if (tablesJSON) {
        tables.value = tablesJSON

        postsTable.value = JSON.parse(tables.value)["CAE"]["Reporte_postes"]["records"]
        actualPostTable.value = JSON.parse(tables.value)["CAE"]["Reporte_actual_postes"]["records"]
        callsTable.value = JSON.parse(tables.value)["CAE"]["Reporte_llamadas"]["records"]
    }
})
// FUNCIONALIDAD PARA ACTUALIZAR EL VALOR DE 'report.value'
const updateReportType = (newReport: string) => {
    report.value = newReport
}
// FUNCIONALsIDAD PARA ACTUALIZAR EL VALOR DE 'report.value'
const updateDate = (newDate: string) => {
    date.value = newDate
}
// FUNCIONALIDAD PARA ACTUALIZAR EL VALOR DE 'post.value'
const updatePost = (newPost: string) => {
    post.value = newPost
}
// FUNCIONALIDAD PARA ACTUALIZAR EL VALOR DE 'audio.value'
const updateAudio = (newAudio: string) => {
    audio.value = newAudio
}
const createInsertTableType3 = (colorHead: string, tableData: object) => {
    // SI EL OBJETO EXISTE
    if (tableData) {
        const propsData = {
            data: tableData,
            minRows: 9,
            color: colorHead,
        }
        // CREAMOS UNA INSTANCIA DEL COMPONENTE 'TableType3'
        const newTable = createApp(TableType3, propsData)
        console.log(`newTable: ${newTable}`)
        // SI EL ELEMENTO '<div class="table-reports-container"></div>' AL QUE 'table' HACE REFERENCIA, EXISTE 
        if (table.value) {
            // MONTAMOS LA INSTANCIA DE 'TableType3' EN EL ELEMENTO QUE REFERENCIA 'table'
            newTable.mount(table.value)
            console.log(`table: ${table.value}`)
        }
    }
}

const createInsertTableType2 = (colorHead: string, tableData: object) => {
    // SI EL OBJETO EXISTE
    if (tableData) {
        const propsData = {
            data: tableData,
            minRows: 9,
            color: colorHead,
        }
        // CREAMOS UNA INSTANCIA DEL COMPONENTE 'TableType2'
        const newTable = createApp(TableType2, propsData)
        console.log(`newTable: ${newTable}`)
        // SI EL ELEMENTO '<div class="table-reports-container"></div>' AL QUE 'table' HACE REFERENCIA, EXISTE 
        if (table.value) {
            // MONTAMOS LA INSTANCIA DE 'TableType2' EN EL ELEMENTO QUE REFERENCIA 'table'
            newTable.mount(table.value)
            console.log(`table: ${table.value}`)
        }
    }
}
onMounted(() => {
    watch(() => report.value, () => {
        switch (report.value) {
            case 'Postes':
                createInsertTableType3('27AB90', postsTable.value);
                break;
            case 'Estado postes':
                createInsertTableType2('1877F2', actualPostTable.value);
                break;
            case 'Llamadas':
                createInsertTableType3('1877F2', callsTable.value);
        }
    });

    report.value = "Estado postes"
})
</script>

<style scoped>
/* importamos la fuente 'Baloo 2' */
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400..800');

/* estilos para el contendor de la vista usuarios */
.reports-view-container {
    width: 90%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.16fr 1fr;
    gap: 40px;
}

.inputs-buttons-container {
    padding: 10px;
    grid-column: 1;
    grid-row: 1;
    background: #fff;
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr;
    gap: 10px;
}

.disabled {
    opacity: 0.5;
    pointer-events: none;
}

#select-report-container {
    grid-column: 1;
    grid-row: 1;
}

#select-date-container {
    grid-column: 2;
    grid-row: 1;
}

#select-post-container {
    grid-column: 3;
    grid-row: 1;
}

#select-audio-container {
    grid-column: 4;
    grid-row: 1;
}


#icon-play-button {
    grid-column: 5;
    grid-row: 1;
    border-radius: 10px;
    background: #2ABBA7;
}

#icon-play-button:hover {
    background: #00DABC;
}

#icon-export-button {
    grid-column: 6;
    grid-row: 1;
    border-radius: 10px;
    background: #F0284A;
}

#icon-export-button:hover {
    background: #ff002b;
}

.button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 8px;
    cursor: pointer;
}

.button-container h3 {
    font-size: 14px;
    font-family: "Baloo 2", sans-serif;
    font-weight: 300;
    color: #fff;
    margin: 0;
    padding: 0;
    word-wrap: break-word;
    height: auto;
    line-height: 1
}

#icon-play-button h3 {
    width: 70px;
}

#icon-export-button h3 {
    width: 55px
}

.button-container img {
    height: 50%;
    width: auto;
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
}
</style>