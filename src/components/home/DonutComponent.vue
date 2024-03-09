<template>
    <div class="chart-container" :id="`chart-container-${props.id}`">
        <canvas class="myChart" :id="`myChart-${props.id}`"></canvas>
    </div>
</template>
  
<script setup>
import { onMounted, defineProps } from 'vue';
import { Chart, DoughnutController, ArcElement } from 'chart.js/auto';

const props = defineProps({
    id: {
        type: String,
        require: true
    },
    arrayData: {
        type: Array,
        require: true,
    },
    url: {
        type: String,
        require: false,
    },
    timeAnimation: {
        type: String,
        require: true
    }
});

onMounted(() => {
    Chart.register(DoughnutController, ArcElement);

    const ctx2 = document.getElementById(`myChart-${props.id}`);

    if (ctx2) {
        new Chart(ctx2.getContext('2d'), {
            type: 'doughnut',
            options: {
                animation: {
                    duration: props.timeAnimation,
                },
            },
            plugins: [{
                afterDraw: chart => {
                    if (props.url != '') {
                        var ctx = chart.ctx;
                        ctx.save();
                        var image = new Image();
                        image.src = props.url;
                        let imageSize = 21;
                        const { top, left, width, height } = chart.chartArea;
                        const x = left + width / 2 - imageSize / 2;
                        const y = top + height / 2 - imageSize / 2;
                        ctx.drawImage(image, x, y, imageSize, imageSize);
                        ctx.restore();
                    }
                }
            }],
            data: {
                datasets: props.arrayData,
            },
        });
    }
});
</script>
  
<style scoped>
.chart-container {
    position: absolute;
    top: 0;
    height: 100%;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
}

.myChart {
    height: 100%;
    width: auto;
    background: transparent;
}
</style>
  