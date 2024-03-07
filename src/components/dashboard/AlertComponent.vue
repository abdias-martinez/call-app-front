<template>
    <div class="notification-container"
        :style="{ background: `#${props.bgColor}`, border: `2px solid #${props.marginColor}`, boxShadow: `0px 0px 10px #${props.shadowColor}` }">
        <div class="icon-notification-container">
            <img :src="props.url">
        </div>
        <div class="message-container">
            <h3>{{ props.message }}</h3>
        </div>
        <div class="icon-close-container" @click="props.onRemove">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="64px" height="64px">
                <path
                    d="M 19 15 C 17.977 15 16.951875 15.390875 16.171875 16.171875 C 14.609875 17.733875 14.609875 20.266125 16.171875 21.828125 L 30.34375 36 L 16.171875 50.171875 C 14.609875 51.733875 14.609875 54.266125 16.171875 55.828125 C 16.951875 56.608125 17.977 57 19 57 C 20.023 57 21.048125 56.609125 21.828125 55.828125 L 36 41.65625 L 50.171875 55.828125 C 51.731875 57.390125 54.267125 57.390125 55.828125 55.828125 C 57.391125 54.265125 57.391125 51.734875 55.828125 50.171875 L 41.65625 36 L 55.828125 21.828125 C 57.390125 20.266125 57.390125 17.733875 55.828125 16.171875 C 54.268125 14.610875 51.731875 14.609875 50.171875 16.171875 L 36 30.34375 L 21.828125 16.171875 C 21.048125 15.391875 20.023 15 19 15 z" />
            </svg>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';


// DEFINICIÓN DE PROPS
const props = defineProps({
    url: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    bgColor: {
        type: String,
        require: true
    },
    marginColor: {
        type: String,
        require: true
    },
    shadowColor: {
        type: String,
        require: true
    },
    onRemove: {
        type: Function,
        require: true,
    }
})

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

.notification-container {
    width: auto;
    padding: 8px 20px 8px 8px;
    height: 47px;
    border-radius: 19px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    animation-name: fadeInUp;
    animation-duration: 1.5s;
    transform: translateY(50px);
}

@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(0);
    }

    100% {
        opacity: 1;
        transform: translateY(51px);
    }
}

.icon-notification-container {
    height: 100%;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    overflow: hidden;
}

.icon-notification-container img {
    height: 100%;
    width: auto;
}

.message-container {
    font-size: 20px;
    color: #1a1818;
    width: auto;
    margin: 0;
    padding: 0;
}

.message-container h3 {
    margin: 0;
    padding: 0;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    color: #41474e;
}

.icon-close-container {
    height: 35px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background ease 0.3s;
    border-radius: 0.3rem;
}

.icon-close-container svg {
    height: 70%;
    width: auto;
    fill: #67717c;
    transition: fill ease 0.3s;
}

.icon-close-container:hover {
    background: #fff;
}

.icon-close-container:hover svg {
    fill: #191a1c;
}
</style>