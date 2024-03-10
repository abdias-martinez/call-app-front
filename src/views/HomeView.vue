<template>
  <!-- Vista de inicio -->
  <div class="home-view-container">
    <!-- Widgets de tipo 1 -->
    <WidgetType1 :url="`https://res.cloudinary.com/dimcnbuqs/image/upload/v1708224703/Vector_rluzyd.png`"
      :color="`FF7556`" :name="`iconCall`" :tittle="`Total llamadas`" :month="months[actualMonth - 1]"
      :data="totalMonthCalls" />
    <WidgetType1 :url="`https://res.cloudinary.com/dimcnbuqs/image/upload/v1708224703/message-alert-outline_lftjoy.png`"
      :color="`39A1EA`" :name="`iconReport`" :tittle="`Total reportes`" :month="months[actualMonth - 1]"
      :data="totalMonthReports" />
    <WidgetType1 :url="`https://res.cloudinary.com/dimcnbuqs/image/upload/v1708224703/Vector_1_ygwnv8.png`"
      :color="`27AB90`" :name="`iconPost`" :tittle="`Total postes`" :month="``" :data="totalPosts" />

    <!-- Widgets de tipo 2 -->
    <WidgetType2 id="widget-2" :active="activePosts.toString()" :repose="reposePosts.toString()"
      :inactive="inactivePosts.toString()" />

    <!-- Widgets de tipo 3 -->
    <div id="widget-3">
      <div class="icon-title-container">
        <div class="icon-container">
          <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708494958/Vector_7_x6auj2.png">
        </div>
        <h3 class="tittle">Ayuda</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// IMPORTACIONES NECESARIAS
import { ref, onBeforeMount } from 'vue'
import WidgetType1 from '@/components/home/WidgetType1.vue'
import WidgetType2 from '@/components/home/WidgetType2.vue'

const totalMonthCalls = ref(0);
const totalMonthReports = ref(0);
const totalPosts = ref(0);
const actualMonth = ref();
const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const activePosts = ref(0);
const reposePosts = ref(0);
const inactivePosts = ref(0);

onBeforeMount(() => {
  const tables = localStorage.getItem('tables')
  if (tables) {
    console.log('Before sortPostsActualState');
    sortPostsActualState(tables);
    console.log('After sortPostsActualState');

    totalMonthCalls.value = countRecordActualMonth(JSON.parse(tables)["CAE"]["Reporte_llamadas"])
    totalMonthReports.value = countRecordActualMonth(JSON.parse(tables)["CAE"]["Reporte_postes"])
    totalPosts.value = JSON.parse(tables)["CAE"]["Registro_Poste"]["records"].length
    const tablesUpdate = localStorage.getItem('tables')
    if (tablesUpdate) {
      const records = JSON.parse(tablesUpdate)["CAE"]["Reporte_actual_postes"]["records"];
      activePosts.value = records.filter((record: { color: string }) => record['color'] === '27AB90').length
      reposePosts.value = records.filter((record: { color: string }) => record['color'] === 'FEB557').length
      inactivePosts.value = records.filter((record: { color: string }) => record['color'] === 'FF433D').length
    }
  }
})

const countRecordActualMonth = (data: { table_name: string; records: object[] }): number => {
  const date = new Date();
  actualMonth.value = date.getMonth() + 1;
  const actualYear = date.getFullYear();
  const recordsActualMonth = data.records.filter((record: { fecha_sms?: string; fecha?: string }) => {
    const dateString = record.fecha_sms || record.fecha;
    const recordDate = dateString ? new Date(dateString) : null;
    if (recordDate) {
      const recordMonth = recordDate.getMonth() + 1;
      const recordYear = recordDate.getFullYear();
      return recordMonth === actualMonth.value && recordYear === actualYear;
    }
    return false;
  });
  return recordsActualMonth.length > 0 ? recordsActualMonth.length : 0;
};
const dateCompare = (object1: { fecha_llamada: string }, object2: { fecha_llamada: string }): number => {
  const date1 = new Date(object1["fecha_llamada"]);
  const date2 = new Date(object2["fecha_llamada"]);
  return date2.getTime() - date1.getTime();
};

const sortPostsActualState = (tables: string): void => {
  try {
    console.log('Received tables:', tables);
    const tablesObject = JSON.parse(tables);
    const reporteActualPostes = tablesObject?.CAE?.Reporte_actual_postes
    if (reporteActualPostes && Array.isArray(reporteActualPostes["records"])) {
      const records = reporteActualPostes["records"]
      records.sort(dateCompare)
      const actualDate = new Date();
      records.forEach((record: { fecha_llamada: string, color: string }) => {
        const dateRecord = new Date(record["fecha_llamada"]);
        const difference = actualDate.getTime() - dateRecord.getTime();
        const differenceDays = Math.floor(difference / (1000 * 60 * 60 * 24))
        if (differenceDays == 0) {
          record["color"] = '27AB90';
        } else if (differenceDays <= 3) {
          record["color"] = 'FEB557';
        } else {
          record["color"] = 'FF433D';
        }
      })
      localStorage.setItem('tables', JSON.stringify(tablesObject));
    } else {
      console.error('Invalid or missing "Reporte_actual_postes" table or records property.');
    }
  } catch (error) {
    console.error('Error parsing JSON or processing data:', error);
  }
};
</script>

<style scoped>
/* importamos la fuente 'Ubuntu' */
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

/* estilos para el contenedor de la vista home */
.home-view-container {
  width: 90%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 40px;
  row-gap: 40px;
}

/* estilos para el primer widget tipo 1 que muestra datos de llamadas */
#widget-1-0 {
  grid-column: 1;
  grid-row: 1;
}

/* estilos para el segundo widget tipo 1 que muestra datos de reportes */
#widget-1-1 {
  grid-column: 2;
  grid-row: 1;
}

/* estilos para el tercer widget tipo 1 que muestra datos de postes */
#widget-1-2 {
  grid-column: 3;
  grid-row: 1;
}

/* estilos para el widget tipo 2 */
#widget-2 {
  grid-column: 1 / span 2;
  grid-row: 2;
}

/* estilos para el widget tipo 3 */
#widget-3 {
  grid-column: 3;
  grid-row: 2;
  background: white;
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
}

#widget-3 .icon-title-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px
}

.icon-title-container h3 {
  font-family: "Ubuntu", sans-serif;
  font-size: 21px;
  font-weight: 500;
  color: #32334F;
}

.icon-title-container .icon-container {
  width: 65px;
  height: 65px;
  background: #405189;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-container img {
  height: 35%;
  width: auto;
}
</style>