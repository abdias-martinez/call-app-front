<template>
    <div class="widget-notification-container">
        <img :src="props.url" :alt="props.name">
        <div class="data" :style="{ background: `#${props.color}` }">{{ props.data }}</div>
    </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
    url: {
        type: String,
        require: true
    },
    data: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: false
    }
})
</script>

<style scoped>
.widget-notification-container {
    height: 100%;
    background: #fff;
    border-radius: 20px;
    display: flex;
    align-items: center;
}

.widget-notification-container img {
    position: relative;
    width: 40px;
    height: auto;
    margin: 10px;
    top: 0%;
    left: 20%;
}

.widget-notification-container .data {
    position: relative;
    top: -40px;
    right: -10px;
    width: 40px;
    height: 40px;
    border-radius: 50% 50%;
    font-family: "Ubuntu", sans-serif;
    font-size: 24px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>