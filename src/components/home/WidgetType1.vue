<template>
    <div class="widget-1-container">
        <div class="icon-text-data-container">
            <div class="icon-text-container">
                <div class="icon-container" :style="{background: `#${props.color}`}">
                    <img :src="props.url" :alt="props.name">
                </div>
                <div class="text-container">
                    <h2 class="tittle">{{ props.tittle }}</h2>
                    <h2 class="month">{{ props.month }}</h2>
                </div>
            </div>
            <div class="data-container">
                <h2 class="data">{{ props.data }}</h2>
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
            type: String,
            require: true
        }
    })
</script>

<style scoped>
.widget-1-container {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-text-data-container {
    height: 80%;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.icon-text-container {
    height: 70%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.icon-container {
    width: 95px;
    height: 105px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50% 50%;
}

.icon-container img {
    width: 40%;
    height: auto;
}

.text-container {
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
}

.text-container h2 {
    margin: 0;
    padding: 0;
    font-size: 30px;
    font-family: "Ubuntu", sans-serif;
    font-weight: 500;
}

.text-container .tittle {
    color: #34354B;
}

.text-container .month {
    color: #9F9D9D
}

.data-container {
    height: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.data-container h2 {
    margin: 0;
    padding: 0;
    font-size: 70px;
    color: #34354B;
}
</style>