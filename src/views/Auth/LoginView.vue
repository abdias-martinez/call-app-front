<template>
    <!-- Vista de inicio de sesión  -->
    <div class="login-view-container">
        <!-- Contenedor del logo -->
        <div class="logo-container">
            <img src="../../assets/images/logo.png" alt="">
        </div>

        <!-- Formulario de inicio de sesión -->
        <form class="login-form">
            <!-- Grupo de entrada para el nombre de usuario -->
            <div class="input-group">
                <!-- Contenedor del ícono de usuario -->
                <div class="icon-container">
                    <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708208828/icons8-user-90_l6a7qg.png"
                        alt="">
                </div>
                <!-- Entrada de texto para el nombre de usuario -->
                <input v-model="username" type="text" id="username" placeholder="Ingresa tu usuario"
                    :disabled="store.state.blockedInputs" :class="{ 'disabled': store.state.blockedInputs }"
                    @keydown.enter="login" />
            </div>

            <!-- Grupo de entrada para la contraseña -->
            <div class="input-group">
                <!-- Contenedor del ícono de contraseña -->
                <div class="icon-container">
                    <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708209522/icons8-password-90_1_qakjdf.png"
                        alt="">
                </div>
                <!-- Entrada de texto para la contraseña -->
                <input v-model="password" type="password" id="password" placeholder="Ingresa tu contraseña"
                    :disabled="store.state.blockedInputs" :class="{ 'disabled': store.state.blockedInputs }"
                    @input="handlePasswordInput" @keydown.enter="login" />
            </div>

            <!-- Mensaje de error en caso no lograr iniciar sesión -->
            <div v-if="showMessageError" class="result-message">Error: Nombre de usuario y/o contraseña incorrectas.
            </div>

            <!-- Botón de inicio de sesión -->
            <button type="button" :disabled="store.state.loading" :class="{ 'disabled': store.state.blockedButtons }"
                @click="login">Iniciar Sesión</button>
        </form>
    </div>
</template>

<script setup>
// IMPORTACIONES NECESARIAS
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import VueJwtDecode from 'vue-jwt-decode'
// DEFINICIÓN DE CONSTANTES
const store = useStore();
const router = useRouter();
const timeoutId = ref();
const username = ref("")
const password = ref("")
const showMessageError = ref(false)
// DEFINIMOS LA ESTRUCTURA REACTIVA QUE ALMACENARÁ LOS DATOS DEL FORMULARIO '<form id="login-form"></form>'
const dataUser = ref({
    "username": username,
    "password": password
})
// FUNCIONALIDAD PARA HACER NO VISIBLE EL CONTENIDO DEL INPUT DE CONTRASEÑA LUEGO DE 1 SEGUNDO DE INACTIVIDAD
const handlePasswordInput = () => {
    // LIMPIAMOS CUALQUIER TEMPORIZADOR EXISTENTE
    clearTimeout(timeoutId.value);
    // HACEMOS VISIBLE EL CONTENIDO DEL INPUT DEFINIENDO 'type' COMO 'text'
    document.getElementById('password').type = 'text';
    // INICIAMOS UN TEMPORIZADOR QUE SE EJECUTARÁ LUEGO DE 1 SEGUNDO
    timeoutId.value = setTimeout(() => {
        // HACEMOS NO VISIBLE EL CONTENIDO DEL INPUT DEFINIENDO 'type' COMO 'password'
        document.getElementById('password').type = 'password';
    }, 1000);
};
// FUNCIONALIDAD DE INICIO DE SESIÓN
const login = async () => {
    if (!store.state.blockedButtons) {
        // OCULTAMOS EL MENSAJE 'Error: Nombre de usuario y/o contraseña incorrectas.'
        showMessageError.value = false
        // ENVIAMOS 'dataUser.value' AL BACKEND PARA VERIFICAR SI EXISTE EN LA BASE DE DATOS
        await store.dispatch('authUser', dataUser.value);
        // OBTENEMOS EL JWT ALMACENADO EN EL LOCAL-STORAGE
        const token = localStorage.getItem('jwt')
        // SI EL JWT ESTÁ ALMACENADO EN EL LOACL-STORAGE
        if (token) {
            // DECODIFICAMOS EL JWT OBTENIDO DEL LOCAL-STORAGE 
            const decodedToken = VueJwtDecode.decode(token);
            // SI LA DECODIFICACIÓN ES NO NULA
            if (decodedToken) {
                // REDIRIGIMOS AL USUARIO A LA RUTA '/dashboard'
                router.push('/dashboard');
            } else {
                // MOSTRAMOS EL MENSAJE 'Error: Nombre de usuario y/o contraseña incorrectas.'
                showMessageError.value = true
            }
        } else {
            // MOSTRAMOS EL MENSAJE 'Error: Nombre de usuario y/o contraseña incorrectas.'
            showMessageError.value = true
        }
    }
}
</script>

<style scoped>
.login-view-container {
    width: 30%;
    min-width: 400px;
    height: auto;
    padding: 50px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 70px;
}

.logo-container {
    height: 55px;
    width: auto;

}

.logo-container img {
    height: 100%;
}

.login-form {
    height: auto;
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}

.input-group {
    width: 100%;
    height: 55px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 0.5rem 0.5rem;
    overflow: hidden;
}

.input-group .icon-container {
    height: 100%;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-container img {
    height: 80%;
}

.input-group input {
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    padding: 0 20px 0 20px;
    background: #5d6d78;
    font-size: 22px;
    color: #ffffff;
}

.input-group input::placeholder {
    color: #b4b2b9;
}

button {
    width: 100%;
    height: 55px;
    outline: none;
    border: none;
    background: #11193c;
    font-family: sans-serif;
    color: #ffffff;
    cursor: pointer;
    border-radius: 0.2rem 0.2rem;
    font-size: 23px;
    transition: background ease 0.3s;
}

button:hover {
    background: #13141e;
}

.result-message {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 18px;
    font-family: sans-serif;
    color: #b5c7d4
}
</style>