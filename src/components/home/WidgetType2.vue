<template>
    <div class="widget-2-container">
        <div class="tittle-items-graph-container">
            <div class="tittle-items-container">
                <div class="tittle">Estado actual postes</div>
                <div class="items-container">
                    <ItemComponent v-for="item, i in itemsArray" :key="i" :data="item.data" :type="item.type"
                        :color="item.color" />
                </div>
            </div>
            <div class="graph-container">
                <DonutComponent :id="'1'" :timeAnimation="'0'" :arrayData="data_back" :url="''"/>
                <DonutComponent :id="'0'" :timeAnimation="'3000'" :arrayData="data" :url="'https://res.cloudinary.com/dimcnbuqs/image/upload/v1708494958/Vector_8_eaobqg.png'"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ItemComponent from '@/components/home/ItemComponent.vue';
import DonutComponent from '@/components/home/DonutComponent.vue';

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
        data: '4',
        type: 'Activo',
        color: '27AB90',
        cutout: '80%'
    },
    {
        data: '4',
        type: 'No reporta hace 3 días',
        color: 'FEB05D',
        cutout: '65%'
    },
    {
        data: '2',
        type: 'Sin reportes',
        color: 'FF433D',
        cutout: '56%'
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
    borderWidth: 20 - i * 10,
}));

const data_back: Array<doughnut> = itemsArray.map((item, i) => ({
    data: [totalData],
    backgroundColor: [`#E0DDDD`],
    cutout: parseInt(item.cutout),
    //cutout: 80 - i * (10 - i),
    outerRadius: 0,
    borderRadius: 0,
    borderColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 20 - i * 10,
}));



</script>
<style scoped>
.widget-2-container {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
}

.tittle-items-graph-container {
    height: 80%;
    width: 90%;
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
    gap: 30px
}

.tittle-items-container .tittle {
    font-size: 30px;
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
    gap: 20px
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