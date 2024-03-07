<template>
    <div class="container">
        <img :src="props.url" :alt="props.name">
        <h3>{{ props.nameUser }}</h3>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
    url: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: false
    },
    nameUser: {
        type: String,
        requiere: true
    }
})
</script>

<style scoped>
.container {
    width: auto;
    min-width: 280px;
    height: 100%;
    background: #fff;
    border-radius: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

img {
    width: 24px;
    height: auto;
}

h3 {
    font-family: "Ubuntu", sans-serif;
    font-size: 30px;
    font-weight: 600;
}
</style>