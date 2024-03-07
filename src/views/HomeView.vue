<template>
  <!-- Vista de inicio -->
  <div class="home-view-container">
    <!-- Widgets de tipo 1 -->
    <WidgetType1 v-for="widget1, i in widgets1" :key="i" :class="'widget-1-' + i" :url="widget1.url"
      :color="widget1.color" :name="widget1.name" :tittle="widget1.tittle" :month="widget1.month" :data="widget1.data" />

    <!-- Widget de tipo 2 -->
    <WidgetType2 id="widget-2" />

    <!-- Widget de tipo 3 -->
    <WidgetType3 id="widget-3"
      :url="`https://res.cloudinary.com/dimcnbuqs/image/upload/v1708494958/Vector_7_x6auj2.png`" :color="`405189`"
      :name="`icon-Help`" :tittle="`Ayuda`" />
  </div>
</template>

<script lang="ts" setup>
// IMPORTACIONES NECESARIAS
import WidgetType1 from '@/components/home/WidgetType1.vue'
import WidgetType2 from '@/components/home/WidgetType2.vue'
import WidgetType3 from '@/components/home/WidgetType3.vue'
// DEFINICIÓN DE INTERFAZ NECESARIA
interface widget1 {
  url: string,
  color: string,
  name: string,
  tittle: string,
  month: string,
  data: string
}
// DEFINICIÓN DE ARREGLO USADO PARA LLENAR DATOS DE LOS WIDGETS DE TIPO 1, 2 Y 3
const widgets1: Array<widget1> = [
  {
    url: "https://res.cloudinary.com/dimcnbuqs/image/upload/v1708224703/Vector_rluzyd.png",
    color: "FF7556",
    name: "iconPhone",
    tittle: "Total llamadas",
    month: "Enero",
    data: "150"
  },
  {
    url: "https://res.cloudinary.com/dimcnbuqs/image/upload/v1708224703/message-alert-outline_lftjoy.png",
    color: "39A1EA",
    name: "iconMessage",
    tittle: "Total reportes",
    month: "Enero",
    data: "30"
  },
  {
    url: "https://res.cloudinary.com/dimcnbuqs/image/upload/v1708224703/Vector_1_ygwnv8.png",
    color: "27AB90",
    name: "iconDevice",
    tittle: "Total postes",
    month: "",
    data: "50"
  },
]
</script>

<style scoped>
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
}
</style>