<template>
    <div class="widget-2-container">
        <div class="tittle-items-graph-container">
            <div class="tittle-items-container">
                <h3 class="tittle">Estado actual postes</h3>
                <div class="items-container">
                    <ItemComponent :data="props.active" :type="`Activo`" :color="`27AB90`" />
                    <ItemComponent :data="props.repose" :type="`No reporta hace 3 días`" :color="`FEB05D`" />
                    <ItemComponent :data="props.inactive" :type="`Sin reportes`" :color="`FF433D`" />
                </div>
            </div>
            <div class="graph-container">
                <DonutComponent :id="'1'" :timeAnimation="'0'" :arrayData="data_back"
                    :url="`https://res.cloudinary.com/dimcnbuqs/image/upload/v1708494958/Vector_8_eaobqg.png`" />

                <DonutComponent :id="'0'" :timeAnimation="'3000'" :arrayData="data"
                    :url="'https://res.cloudinary.com/dimcnbuqs/image/upload/v1708494958/Vector_8_eaobqg.png'" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import ItemComponent from '@/components/home/ItemComponent.vue';
import DonutComponent from '@/components/home/DonutComponent.vue';

const props = defineProps({
    active: {
        type: String,
        require: true
    },
    repose: {
        type: String,
        require: true
    },
    inactive: {
        type: String,
        require: true
    },
})

interface items {
    data: string,
    type: string,
    color: string,
    cutout: string
}

interface doughnut {
    data: Array<number>,
    backgroundColor: Array<string>,
    borderRadius: number
    borderColor: string,
}

const itemsArray: Array<items> = [
    {
        data: props.active || '',
        type: 'Activo',
        color: '27AB90',
        cutout: '60%'
    },
    {
        data: props.repose || '',
        type: 'No reporta hace 3 días',
        color: 'FEB05D',
        cutout: '40%'
    },
    {
        data: props.inactive || '',
        type: 'Sin reportes',
        color: 'FF433D',
        cutout: '30%'
    }
]

const totalData = itemsArray.reduce((acc, item) => acc + parseInt(item.data), 0);
console.log(`total data: ${totalData}`)

const data: Array<doughnut> = itemsArray.map((item, i) => ({
    data: [parseInt(item.data), totalData - parseInt(item.data)],
    backgroundColor: [`#${item.color}`, 'rgba(0, 0, 0, 0)'],
    cutout: parseInt(item.cutout),
    //cutout: 80 - i * (10 - i),
    outerRadius: 0,
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 0 - i*(20/3) ,
}));

const data_back: Array<doughnut> = itemsArray.map((item, i) => ({
    data: [totalData],
    backgroundColor: [`#E0DDDD`],
    cutout: parseInt(item.cutout),
    //cutout: 80 - i * (10 - i),
    outerRadius: 0,
    borderRadius: 0,
    borderColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 0 - i*(20/3)
}));

</script>
<style scoped>
.widget-2-container {
    background: white;
    border-radius: 16px;
    padding: 16px 50px;
}

.tittle-items-graph-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.tittle-items-container {
    position: relative;
    top: 0px;
    width: 80%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 25px
}

.tittle-items-container .tittle {
    font-size: 21px;
    font-family: "Ubuntu", sans-serif;
    font-weight: 500;
    color: #34354B;
}

.items-container {
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    gap: 15px
}

.graph-container {
    width: 50%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>