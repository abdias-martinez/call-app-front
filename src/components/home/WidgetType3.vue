<template>
    <div class="widget-3-container">
        <div class="icon-tittle-container">
            <div class="icon-container" :style="{background: `#${props.color}`}">
                <img :src="props.url" :alt="props.name">
            </div>
            <div class="tittle-container">
                <h2 class="tittle">{{ props.tittle }}</h2>
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
    link: {
        type: String,
        require: true
    }
})
</script>

<style scoped>
.widget-3-container {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-tittle-container {
    height: 80%;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.icon-container {
    width: 95px;
    height: 95px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50% 50%;
}

.icon-container img {
    width: 40%;
    height: auto;
}

.tittle-container {
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
}

.tittle-container h2 {
    margin: 0;
    padding: 0;
    font-size: 30px;
    font-family: "Ubuntu", sans-serif;
    font-weight: 500;
    color: #34354B;
}
</style>