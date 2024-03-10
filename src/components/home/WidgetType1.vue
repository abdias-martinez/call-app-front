<template>
    <div class="widget-1-container">
        <div class="icon-text-data-container">
            <div class="icon-text-container">
                <div class="icon-container" :style="{ background: `#${props.color}` }">
                    <img :src="props.url" :alt="props.name">
                </div>
                <div class="text-container">
                    <h3 class="tittle">{{ props.tittle }}</h3>
                    <h3 class="month">{{ props.month }}</h3>
                </div>
            </div>
            <div class="data-container">
                <h3 class="data">{{ props.data }}</h3>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
    url: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    tittle: {
        type: String,
        require: true
    },
    month: {
        type: String,
        require: false
    },
    data: {
        type: Number,
        require: true
    }
})
</script>

<style scoped>
.widget-1-container {
    background: white;
    border-radius: 16px;
    padding: 12px 20px 10px 20px;
}

.icon-text-data-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.icon-text-container {
    width: auto;
    height: 115px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

}

.icon-container {
    height: 65px;
    width: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
}

.icon-container img {
    height: 35%;
    width: auto;
}

.text-container {
    width: auto;
    height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.text-container h3 {
    font-family: "Ubuntu", sans-serif;
    font-size: 21px;
    font-weight: 500;
    color: #32334F;
}

.text-container .month {
    color: #9F9D9D
}

.icon-text-data-container .data-container h3 {
    font-family: "Ubuntu", sans-serif;
    font-size: 53px;
    font-weight: 500;
    color: #32334F;
}
</style>