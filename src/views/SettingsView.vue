<template>
    <!-- Vista de eventos -->
    <div class="settings-view-container">
        <div id="register-post-container" class="register-container">
            <form id="register-post-form">
                <!-- Campos de entrada para Poste, Número, Operador, Progresiva y Ruta -->
                <input class="input-container" id="input-1" type="text" placeholder="Poste" v-model="post"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('namepost') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('namepost') || store.state.blocked.includes('all')) }">

                <input class="input-container" id="input-2" type="text" placeholder="Número" v-model="number"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('number') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('number') || store.state.blocked.includes('all')) }">

                <input class="input-container" id="input-3" type="text" placeholder="Operador" v-model="operator"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('operator') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('operator') || store.state.blocked.includes('all')) }">

                <input class="input-container" id="input-4" type="text" placeholder="Pregresiva" v-model="progresive"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('progresive') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('progresive') || store.state.blocked.includes('all')) }">

                <input class="input-container" id="input-5" type="text" placeholder="Ruta" v-model="route"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('route') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('route') || store.state.blocked.includes('all')) }">

                <!-- Contenedor de botones -->
                <div class="buttons-container" id="buttons-1-container">
                    <!-- Botón guardar -->
                    <div class="icon-save-button-container" @click="registerUser"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_16_j4ihaq.png"
                            alt="icon-save-button">
                    </div>

                    <!-- Botón limpiar -->
                    <div class="icon-clear-button-container" @click="clearDataUser"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_17_mrwof7.png"
                            alt="icon-clear-button">
                    </div>
                </div>
            </form>
        </div>
        <div id="register-event-container" class="register-container">
            <form id="register-event-form">
                <input class="input-container" id="input-6" type="text" placeholder="Evento" v-model="event"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('eventname') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('eventname') || store.state.blocked.includes('all')) }">

                <!-- Contenedor de botones -->
                <div class="buttons-container" id="buttons-2-container">
                    <!-- Botón guardar -->
                    <div class="icon-save-button-container" @click="registerUser"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_16_j4ihaq.png"
                            alt="icon-save-button">
                    </div>

                    <!-- Botón limpiar -->
                    <div class="icon-clear-button-container" @click="clearDataUser"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_17_mrwof7.png"
                            alt="icon-clear-button">
                    </div>
                </div>
            </form>
        </div>
        <div id="register-derived-container" class="register-container">
            <form id="register-derived-form">
                <input class="input-container" id="input-7" type="text" placeholder="Derivado" v-model="derived"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('derived') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('derived') || store.state.blocked.includes('all')) }">

                <!-- Contenedor de botones -->
                <div class="buttons-container" id="buttons-3-container">
                    <!-- Botón guardar -->
                    <div class="icon-save-button-container" @click="registerUser"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_16_j4ihaq.png"
                            alt="icon-save-button">
                    </div>

                    <!-- Botón limpiar -->
                    <div class="icon-clear-button-container" @click="clearDataUser"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_17_mrwof7.png"
                            alt="icon-clear-button">
                    </div>
                </div>
            </form>
        </div>
        <div id="register-vehicle-container" class="register-container">
            <form id="register-vehicle-form">
                <input class="input-container" id="input-8" type="text" placeholder="Vehículo" v-model="vehicles"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('vehicles') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('vehicles') || store.state.blocked.includes('all')) }">

                <!-- Contenedor de botones -->
                <div class="buttons-container" id="buttons-4-container">
                    <!-- Botón guardar -->
                    <div class="icon-save-button-container" @click="registerUser"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_16_j4ihaq.png"
                            alt="icon-save-button">
                    </div>

                    <!-- Botón limpiar -->
                    <div class="icon-clear-button-container" @click="clearDataUser"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_17_mrwof7.png"
                            alt="icon-clear-button">
                    </div>
                </div>
            </form>
        </div>
        <div id="register-persons-container" class="register-container">
            <form id="register-persons-form">
                <input class="input-container" id="input-9" type="text" placeholder="Persona" v-model="persons"
                    :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('persons') || store.state.blocked.includes('all'))"
                    :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('persons') || store.state.blocked.includes('all')) }">

                <!-- Contenedor de botones -->
                <div class="buttons-container" id="buttons-5-container">
                    <!-- Botón guardar -->
                    <div class="icon-save-button-container" @click="registerUser"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_16_j4ihaq.png"
                            alt="icon-save-button">
                    </div>

                    <!-- Botón limpiar -->
                    <div class="icon-clear-button-container" @click="clearDataUser"
                        :class="{ 'disabled': store.state.isLoading }">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_17_mrwof7.png"
                            alt="icon-clear-button">
                    </div>
                </div>
            </form>
        </div>

    </div>
</template>

<script lang="ts" setup>
// IMPORTACIONES NECESARIAS
import { ref } from 'vue'
import { useStore } from 'vuex'
// DEFINICIÓN DE CONSTANTES
const store = useStore()
const post = ref('')
const number = ref('')
const operator = ref('')
const progresive = ref('')
const route = ref('')
</script>

<style scoped>
/* importamos la fuente 'Ubuntu' */
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

/* estilos para el contenedor de la vista home */
.settings-view-container {
    width: 90%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(10, 1fr);
    gap: 40px;
}

.input-container {
    border: 2px solid #1877F2;
    border-radius: 8px;
    overflow: hidden;
    font-size: 16px;
    display: flex;
    padding: 0 15px 0 15px;
    color: #5B5B5B;
    font-family: "Baloo 2", sans-serif;
}

.input-container::placeholder {
    color: #5B5B5B;
}

.input-container:focus {
    outline: none;
    color: #1877F2;
}

.register-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0px;
    background: #fff;
    border-radius: 10px;
}

#register-post-container {
    grid-column: 1;
    grid-row: 1 / 5;
}

#register-post-form {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    padding: 10px;
    gap: 10px;
}

.buttons-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.buttons-container div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
}

.buttons-container div img {
    height: 50%;
    width: auto;
}

.icon-save-button-container {
    grid-column: 1;
    background: #2ABBA7;
    transition: background 0.3s ease;
}

.icon-save-button-container:hover {
    background: #27a794;
}

.icon-clear-button-container {
    grid-column: 2;
    background: #F0284A;
    transition: background 0.3s ease;
}

.icon-clear-button-container:hover {
    background: #e50b30;
}

#buttons-1-container {
    grid-column: 2;
    grid-row: 1;
}

#input-1 {
    grid-column: 1;
    grid-row: 1;
}

#input-2 {
    grid-column: 1;
    grid-row: 2;
}

#input-3 {
    grid-column: 1;
    grid-row: 3;
}

#input-4 {
    grid-column: 2;
    grid-row: 2;
}

#input-5 {
    grid-column: 2;
    grid-row: 3;
}

#register-event-container {
    grid-column: 2;
    grid-row: 1 / 3;
    padding: 10px;
}

#register-event-form {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

#input-6 {
    grid-column: 1;
    grid-row: 1;
}

#buttons-2-container {
    grid-column: 2;
    grid-row: 1;
}

#register-derived-container {
    grid-column: 2;
    grid-row: 3 / 5;
    padding: 10px;
}

#register-derived-form {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

#input-7 {
    grid-column: 1;
    grid-row: 1;
}

#buttons-3-container {
    grid-column: 2;
    grid-row: 1;
}

#register-vehicle-container {
    grid-column: 1;
    grid-row: 5 / 7;
    padding: 10px;
}

#register-vehicle-form {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

#input-8 {
    grid-column: 1;
    grid-row: 1;
}

#buttons-4-container {
    grid-column: 2;
    grid-row: 1;
}

#register-persons-container {
    grid-column: 2;
    grid-row: 5 / 7;
    padding: 10px;
}

#register-persons-form {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

#input-9 {
    grid-column: 1;
    grid-row: 1;
}

#buttons-5-container {
    grid-column: 2;
    grid-row: 1;
}
</style>