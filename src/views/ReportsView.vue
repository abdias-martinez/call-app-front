<template>
    <!-- Vista de reportes -->
    <div class="reports-view-container">
        <!-- Formulario de entrada y botones -->
        <form class="inputs-buttons-container">
            <!-- Desplegable (dropdown) para seleccionar el tipo de reporte -->
            <DropDown id="select-report-container" :options="['Postes', 'Estado postes', 'Llamadas']"
                :name="'Tipo reporte'" :identifier="'report'" @optionIsChange="updateReportType" />

            <!-- Desplegable (dropdown) para seleccionar la fecha -->
            <DropDown id="select-date-container" :options="dateOptions" :name="'Filtrar por fecha'" :identifier="'date'"
                @optionIsChange="updateDate" />

            <!-- Desplegable (dropdown) para seleccionar el poste -->
            <DropDown id="select-post-container" :options="postOptions" :name="'Filtrar por poste'" :identifier="'post'"
                @optionIsChange="updatePost" />

            <!-- Desplegable (dropdown) para seleccionar un audio -->
            <DropDown id="select-audio-container" :options="audioOptions" :name="'Audio disponible'"
                :identifier="'audio'" @optionIsChange="updateAudio" />

            <!-- Botón guardar -->
            <div class="button-container" id="icon-play-button"
                :class="{ 'disabled': Array.isArray(store.state.blocked) && store.state.blocked.includes('play button') }">
                <h3>Reproducir grabación</h3>
                <img src="../assets/images/icon-play.png" alt="icon-play-button">
            </div>


            <!-- Botón limpiar -->
            <div class="button-container" id="icon-export-button" @click="exportReport"
                :class="{ 'disabled': Array.isArray(store.state.blocked) && store.state.blocked.includes('play export') }">
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
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import DropDown from '@/components/DropDown.vue'
import TableType2 from '@/components/TableType2.vue'
import TableType3 from '@/components/TableType3.vue'
import { ref, createApp, watch, onBeforeMount, onMounted } from 'vue'
import { useStore } from 'vuex'
// DEFINICIÓN DE CONSTANTES
const store = useStore()
const table = ref()
const tables = ref()

// OPCIONES SELECCIONADAS
const report = ref('')
const date = ref('')
const post = ref('')
const audio = ref('')

// TABLAS LISTAS PARA RENDERIZAR LUEGO DE PASAR POR FILTROS 
const postsTable = ref()
const actualPostTable = ref()
const callsTable = ref()

// OPCIONES CALCULADAS PARA LOS DROPDOWN
const dateOptions = ref<string[]>([])
const postOptions = ref<string[]>([])
const audioOptions = ref<string[]>([])

//
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
const obtainDates = (reportTable: Array<{ fecha?: string; fecha_sms?: string }>): string[] => {
    const dates: string[] = [];
    reportTable.forEach((record: { fecha?: string; fecha_sms?: string }) => {
        const dateString = record?.fecha || record?.fecha_sms;
        if (dateString) {
            const formatedDateString = dateString.split(' ')[0];
            if (!dates.includes(formatedDateString)) {
                dates.push(formatedDateString);
            }
        }
    });
    return dates;
};

const obtainPosts = (reportTable: Array<{ poste?: string }>): string[] => {
    const posts: string[] = [];
    reportTable.forEach((record: { poste?: string }) => {
        if (record["poste"] && !posts.includes(record["poste"])) {
            posts.push(record["poste"])
        }
    })
    return posts
}

const obtainAudioNames = (reportTable: Array<{ nombre_audio?: string }>): string[] => {
    return reportTable.map((record: { nombre_audio?: string }) => record["nombre_audio"] || '');
}

const filterTableByDate = (records: Array<{ fecha?: string; fecha_sms?: string }>, date: string): Array<{ fecha?: string; fecha_sms?: string }> => {
    return records.filter((record: { fecha?: string; fecha_sms?: string }) => {
        const dateString = record?.fecha || record?.fecha_sms;
        if (dateString) {
            const formatedDateString = dateString.split(' ')[0];
            return date === formatedDateString;
        }
        return false;
    });
};

const filterTableByPost = (records: Array<{ poste: string }>, post: string): Array<{ poste: string }> => {
    return records.filter((record: { poste: string }) => {
        const postValue = record?.poste
        return postValue === post;
    });
};

const createInsertTableType3 = (colorHead: string, tableData: object, tableName: string, blocked: string[]): void => {
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
            dateOptions.value = obtainDates(JSON.parse(tables.value)["CAE"][tableName]["records"])
            postOptions.value = obtainPosts(JSON.parse(tables.value)["CAE"][tableName]["records"])
            audioOptions.value = obtainAudioNames(JSON.parse(tables.value)["CAE"]["Reporte_llamadas"]["records"])
        }
        store.state.blocked = []
        store.state.blocked = blocked
    }
}
const createInsertTableType2 = (colorHead: string, tableData: object, tableName: string, blocked: string[]) => {
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
            dateOptions.value = obtainDates(JSON.parse(tables.value)["CAE"][tableName]["records"])
            postOptions.value = obtainPosts(JSON.parse(tables.value)["CAE"][tableName]["records"])
            audioOptions.value = obtainAudioNames(JSON.parse(tables.value)["CAE"]["Reporte_llamadas"]["records"])
        }
        store.state.blocked = []
        store.state.blocked = blocked
    }
}
onMounted(() => {
    createInsertTableType2('1877F2', actualPostTable.value, 'Reporte_actual_postes', ['date', 'post', 'audio', 'play button']);
    watch(() => report.value, () => {
        console.log(`reporte mostrado: ${report.value}`)
        date.value = ''
        post.value = ''
        audio.value = ''

        store.state.cleaned = []
        store.state.cleaned = ['date', 'post', 'audio']
        switch (report.value) {
            case 'Postes':
                createInsertTableType3('27AB90', postsTable.value, 'Reporte_postes', ['audio', 'play button']);
                break;
            case 'Estado postes':
                createInsertTableType2('1877F2', actualPostTable.value, 'Reporte_actual_postes', ['date', 'post', 'audio', 'play button']);
                break;
            case 'Llamadas':
                createInsertTableType3('1877F2', callsTable.value, 'Reporte_llamadas', []);
                break;
        }
    });

    watch(() => date.value, () => {
        if (date.value !== '') {
            console.log(`Filtrar por fecha ${date.value}`)

            store.state.cleaned = []
            store.state.cleaned = ['post', 'audio']
            let tableName
            switch (report.value) {
                case 'Postes': tableName = 'Reporte_postes'; break;
                case 'Estado postes': tableName = 'Reporte_actual_postes'; break;
                case 'Llamadas': tableName = 'Reporte_llamadas'; break;
            }

            if (tableName == 'Reporte_postes' || tableName == 'Reporte_llamadas') {
                const tableToFilter = JSON.parse(tables.value)["CAE"][tableName]["records"]
                const fiteredTable = filterTableByDate(tableToFilter, date.value)
                const color = tableName == 'Reporte_postes' ? '27AB90' : '1877F2'
                createInsertTableType3(color, fiteredTable, tableName, ['audio', 'play button'])
            }
        }
    })

    watch(() => post.value, () => {
        if (post.value !== '') {
            store.state.cleaned = []
            store.state.cleaned = ['date', 'audio']
            let tableName
            switch (report.value) {
                case 'Postes': tableName = 'Reporte_postes'; break;
                case 'Estado postes': tableName = 'Reporte_actual_postes'; break;
                case 'Llamadas': tableName = 'Reporte_llamadas'; break;
            }

            if (tableName == 'Reporte_postes' || tableName == 'Reporte_llamadas') {
                const tableToFilter = JSON.parse(tables.value)["CAE"][tableName]["records"]
                const fiteredTable = filterTableByPost(tableToFilter, post.value)
                const color = tableName == 'Reporte_postes' ? '27AB90' : '1877F2'
                const blocked = tableName == 'Reporte_postes' ? ['audio', 'play button'] : []
                createInsertTableType3(color, fiteredTable, tableName, blocked)
            }
        }
    })

    watch(() => audio.value, () => {
        store.state.cleaned = []
        store.state.cleaned = ['date', 'post']
    })
})

const exportReport = () => {
    const report = table.value
    const tableHTML = report?.querySelector('div .table-wrapper table')
    const clonedTable = tableHTML.cloneNode(true)
    document.body.appendChild(clonedTable);

    clonedTable.style.borderRadius = '0'
    clonedTable.querySelector('thead').style.borderRadius = '0'
    clonedTable.querySelector('thead th:first-of-type').style.borderTopLeftRadius = '0'
    clonedTable.querySelector('thead th:last-of-type').style.borderTopRightRadius = '0'
    clonedTable.querySelector('tbody tr:last-of-type td:first-of-type').style.borderBottomLeftRadius = '0'
    clonedTable.querySelector('tbody tr:last-of-type td:last-of-type').style.borderBottomRightRadius = '0'

    const inputs = clonedTable.querySelectorAll('tbody tr td .centered-td-content input') as HTMLTableCellElement[]
    inputs.forEach(input => {
        input.style.width = 'auto'
    })
    const rect = clonedTable.getBoundingClientRect()
    const realWidth = rect.width
    const realHeight = rect.height
    const PDF_Width = realWidth
    const PDF_Height = realHeight
    const canvas_image_width = PDF_Width
    const canvas_image_height = PDF_Height
    const scaleFactor = 4
    html2canvas(clonedTable, { scale: scaleFactor }).then(function (canvas) {
        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF('landscape', 'pt', [PDF_Width, PDF_Height])
        pdf.addImage(imgData, 'PNG', 0, 0, canvas_image_width, canvas_image_height, '', 'FAST')
        pdf.save("Reporte.pdf")
    })
    document.body.removeChild(clonedTable);
}

</script>

<style scoped>
/* importamos la fuente 'Baloo 2' */
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400..800');

.disabled {
    opacity: 0.5;
    pointer-events: none;
}

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
    grid-template-columns: repeat(4, 1fr) repeat(2, 0.8fr);
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
    transition: background 0.3s ease;
}

#icon-play-button:hover {
    background: #27a794;
}

#icon-export-button {
    grid-column: 6;
    grid-row: 1;
    border-radius: 10px;
    background: #F0284A;
    transition: background 0.3s ease;
}

#icon-export-button:hover {
    background: #e50b30;
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