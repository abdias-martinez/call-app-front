<template>
    <div class="container">
        <div class="data-item" :style="{ background: `#${props.color}` }">{{ props.data }}</div>
        <div class="type-item">{{ props.type }}</div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
    data: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    }
})
</script>

<style scoped>
.container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;

    font-size: 19px;
    font-family: "Ubuntu", sans-serif;
    font-weight: 500;
    color: #34354B;
}

.data-item {
    font-size: 21px;
    height: 10px;
    width: auto;
    min-width: 40px;
    padding: 7px 5px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
}

.data-type {
    color: #1F2D52;
    margin: 0;
    padding: 0;
}
</style>