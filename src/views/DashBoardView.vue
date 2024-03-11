<template>
    <!-- Panel de control -->
    <div class="container-dashboard">
        <!-- Menú de navegación -->
        <div class="menu">
            <div class="icon-logo-container">
                <img src="../assets/images/logo.png" alt="Logo">
            </div>
            <div class="options-container">
                <!-- Enlaces de navegación -->
                <nav class="views-container">
                    <!-- Enlace Inicio -->
                    <router-link to="/dashboard/home" class="menu-button"
                        :class="{ 'active': $route.path === '/dashboard/home' }">
                        <svg width="23" height="23" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M23.7083 3.29167V6.20833H17.875V3.29167H23.7083ZM9.125 3.29167V12.0417H3.29167V3.29167H9.125ZM23.7083 14.9583V23.7083H17.875V14.9583H23.7083ZM9.125 20.7917V23.7083H3.29167V20.7917H9.125ZM26.625 0.375H14.9583V9.125H26.625V0.375ZM12.0417 0.375H0.375V14.9583H12.0417V0.375ZM26.625 12.0417H14.9583V26.625H26.625V12.0417ZM12.0417 17.875H0.375V26.625H12.0417V17.875Z"
                                fill="white" />
                        </svg>
                        <h3>Inicio</h3>
                    </router-link>

                    <!-- Enlace Eventos -->
                    <router-link to="/dashboard/events" class="menu-button"
                        :class="{ 'active': $route.path === '/dashboard/events' }">
                        <svg width="28" height="28" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.5 17.5H19.6875V21.6125L23.2458 23.6687L22.1521 25.5646L17.5 22.8813V17.5ZM23.3333 10.2083H2.91667V26.25H9.72708C9.1 24.9229 8.75 23.4354 8.75 21.875C8.75 19.1676 9.82552 16.5711 11.74 14.6566C13.6544 12.7422 16.2509 11.6667 18.9583 11.6667C20.5187 11.6667 22.0062 12.0167 23.3333 12.6437V10.2083ZM2.91667 29.1667C1.29792 29.1667 0 27.8542 0 26.25V5.83333C0 4.21458 1.29792 2.91667 2.91667 2.91667H4.375V0H7.29167V2.91667H18.9583V0H21.875V2.91667H23.3333C24.1069 2.91667 24.8487 3.22396 25.3957 3.77094C25.9427 4.31792 26.25 5.05978 26.25 5.83333V14.7292C28.0583 16.5667 29.1667 19.0896 29.1667 21.875C29.1667 24.5824 28.0911 27.1789 26.1767 29.0934C24.2623 31.0078 21.6658 32.0833 18.9583 32.0833C16.1729 32.0833 13.65 30.975 11.8125 29.1667H2.91667ZM18.9583 14.8021C17.0825 14.8021 15.2835 15.5473 13.957 16.8737C12.6306 18.2001 11.8854 19.9991 11.8854 21.875C11.8854 25.7833 15.05 28.9479 18.9583 28.9479C19.8872 28.9479 20.8069 28.765 21.665 28.4095C22.5231 28.0541 23.3029 27.5331 23.9596 26.8763C24.6164 26.2195 25.1374 25.4398 25.4929 24.5817C25.8483 23.7236 26.0312 22.8038 26.0312 21.875C26.0312 17.9667 22.8667 14.8021 18.9583 14.8021Z"
                                fill="white" />
                        </svg>
                        <h3>Eventos</h3>
                    </router-link>

                    <!-- Enlace Reportes -->
                    <router-link to="/dashboard/reports" class="menu-button"
                        :class="{ 'active': $route.path === '/dashboard/reports' }">
                        <svg width="23" height="23" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.75 20.4167H5.83333V10.2083H8.75V20.4167ZM14.5833 20.4167H11.6667V5.83333H14.5833V20.4167ZM20.4167 20.4167H17.5V14.5833H20.4167V20.4167ZM23.3333 23.3333H2.91667V2.91667H23.3333V23.4792M23.3333 0H2.91667C1.3125 0 0 1.3125 0 2.91667V23.3333C0 24.9375 1.3125 26.25 2.91667 26.25H23.3333C24.9375 26.25 26.25 24.9375 26.25 23.3333V2.91667C26.25 1.3125 24.9375 0 23.3333 0Z"
                                fill="white" />
                        </svg>
                        <h3>Reportes</h3>
                    </router-link>

                    <!-- Enlace Usuarios (visible solo para administradores) -->
                    <router-link v-if="userRole == 'administrador'" to="/dashboard/users" class="menu-button"
                        :class="{ 'active': $route.path === '/dashboard/users' }">
                        <svg width="28" height="28" viewBox="0 0 35 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18.9583 8.75C19.8236 8.75 20.6695 8.49341 21.389 8.01268C22.1084 7.53195 22.6692 6.84867 23.0003 6.04924C23.3314 5.24981 23.4181 4.37015 23.2493 3.52148C23.0805 2.67281 22.6638 1.89326 22.0519 1.28141C21.4401 0.669555 20.6605 0.252877 19.8119 0.0840664C18.9632 -0.084744 18.0835 0.00189563 17.2841 0.333029C16.4847 0.664162 15.8014 1.22492 15.3207 1.94438C14.8399 2.66385 14.5833 3.50971 14.5833 4.375C14.5833 5.53532 15.0443 6.64812 15.8647 7.46859C16.6852 8.28907 17.798 8.75 18.9583 8.75ZM18.9583 2.91667C19.2468 2.91667 19.5287 3.0022 19.7685 3.16244C20.0084 3.32269 20.1953 3.55045 20.3057 3.81692C20.416 4.0834 20.4449 4.37662 20.3886 4.65951C20.3324 4.9424 20.1935 5.20225 19.9895 5.4062C19.7856 5.61015 19.5257 5.74904 19.2428 5.80531C18.96 5.86158 18.6667 5.8327 18.4003 5.72233C18.1338 5.61195 17.906 5.42503 17.7458 5.18521C17.5855 4.94539 17.5 4.66343 17.5 4.375C17.5 3.98823 17.6536 3.6173 17.9271 3.3438C18.2006 3.07031 18.5716 2.91667 18.9583 2.91667ZM24.9521 8.54583C25.8053 7.32234 26.2627 5.86661 26.2627 4.375C26.2627 2.88339 25.8053 1.42767 24.9521 0.204168C25.3715 0.0691461 25.8094 0.000265351 26.25 1.66469e-06C27.4103 1.66469e-06 28.5231 0.460938 29.3436 1.28141C30.1641 2.10188 30.625 3.21468 30.625 4.375C30.625 5.53532 30.1641 6.64812 29.3436 7.46859C28.5231 8.28907 27.4103 8.75 26.25 8.75C25.8094 8.74974 25.3715 8.68086 24.9521 8.54583ZM18.9583 11.6667C10.2083 11.6667 10.2083 17.5 10.2083 17.5V20.4167H27.7083V17.5C27.7083 17.5 27.7083 11.6667 18.9583 11.6667ZM13.125 17.5C13.125 17.0771 13.5917 14.5833 18.9583 14.5833C24.0625 14.5833 24.7042 16.8583 24.7917 17.5M35 17.5V20.4167H30.625V17.5C30.5909 16.4159 30.3413 15.3495 29.8906 14.363C29.4399 13.3765 28.7972 12.4896 28 11.7542C35 12.4688 35 17.5 35 17.5ZM11.6667 10.2083H7.29167V14.5833H4.375V10.2083H0V7.29167H4.375V2.91667H7.29167V7.29167H11.6667V10.2083Z"
                                fill="white" />
                        </svg>
                        <h3>Usuarios</h3>
                    </router-link>

                    <!-- Enlace Configuración -->
                    <router-link to="/dashboard/settings" class="menu-button"
                        :class="{ 'active': $route.path === '/dashboard/settings' }">
                        <svg width="28" height="28" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.1886 8.75C15.7357 8.75 17.2194 9.36458 18.3134 10.4585C19.4074 11.5525 20.0219 13.0362 20.0219 14.5833C20.0219 16.1304 19.4074 17.6142 18.3134 18.7081C17.2194 19.8021 15.7357 20.4167 14.1886 20.4167C12.6415 20.4167 11.1578 19.8021 10.0638 18.7081C8.96986 17.6142 8.35528 16.1304 8.35528 14.5833C8.35528 13.0362 8.96986 11.5525 10.0638 10.4585C11.1578 9.36458 12.6415 8.75 14.1886 8.75ZM14.1886 11.6667C13.4151 11.6667 12.6732 11.974 12.1262 12.5209C11.5792 13.0679 11.2719 13.8098 11.2719 14.5833C11.2719 15.3569 11.5792 16.0987 12.1262 16.6457C12.6732 17.1927 13.4151 17.5 14.1886 17.5C14.9622 17.5 15.704 17.1927 16.251 16.6457C16.798 16.0987 17.1053 15.3569 17.1053 14.5833C17.1053 13.8098 16.798 13.0679 16.251 12.5209C15.704 11.974 14.9622 11.6667 14.1886 11.6667ZM11.2719 29.1667C10.9074 29.1667 10.6011 28.9042 10.5428 28.5542L10.0032 24.6896C9.08444 24.325 8.29694 23.8292 7.53861 23.2458L3.90736 24.7188C3.58653 24.8354 3.19278 24.7187 3.01778 24.3979L0.101109 19.3521C-0.0884748 19.0312 -0.000974607 18.6375 0.276109 18.4187L3.35319 15.9979L3.25111 14.5833L3.35319 13.125L0.276109 10.7479C-0.000974607 10.5292 -0.0884748 10.1354 0.101109 9.81458L3.01778 4.76875C3.19278 4.44792 3.58653 4.31667 3.90736 4.44792L7.53861 5.90625C8.29694 5.3375 9.08444 4.84167 10.0032 4.47708L10.5428 0.6125C10.6011 0.2625 10.9074 0 11.2719 0H17.1053C17.4699 0 17.7761 0.2625 17.8344 0.6125L18.374 4.47708C19.2928 4.84167 20.0803 5.3375 20.8386 5.90625L24.4699 4.44792C24.7907 4.31667 25.1844 4.44792 25.3594 4.76875L28.2761 9.81458C28.4657 10.1354 28.3782 10.5292 28.1011 10.7479L25.024 13.125L25.1261 14.5833L25.024 16.0417L28.1011 18.4187C28.3782 18.6375 28.4657 19.0312 28.2761 19.3521L25.3594 24.3979C25.1844 24.7187 24.7907 24.85 24.4699 24.7188L20.8386 23.2604C20.0803 23.8292 19.2928 24.325 18.374 24.6896L17.8344 28.5542C17.7761 28.9042 17.4699 29.1667 17.1053 29.1667H11.2719ZM13.0949 2.91667L12.5553 6.72292C10.8053 7.0875 9.25944 8.02083 8.13653 9.31875L4.62194 7.80208L3.52819 9.69792L6.60528 11.9583C6.02194 13.6646 6.02194 15.5167 6.60528 17.2083L3.51361 19.4833L4.60736 21.3792L8.15111 19.8625C9.27403 21.1458 10.8053 22.0792 12.5407 22.4292L13.0803 26.25H15.2969L15.8365 22.4437C17.5719 22.0792 19.1032 21.1458 20.2261 19.8625L23.7699 21.3792L24.8636 19.4833L21.7719 17.2229C22.3553 15.5167 22.3553 13.6646 21.7719 11.9583L24.849 9.69792L23.7553 7.80208L20.2407 9.31875C19.1178 8.02083 17.5719 7.0875 15.8219 6.7375L15.2824 2.91667H13.0949Z"
                                fill="white" />
                        </svg>
                        <h3>Configuración</h3>
                    </router-link>
                </nav>

                <!-- Botón de cierre de sesión -->
                <button @click="logout" class="menu-button">
                    <svg width="23" height="23" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.1583 18.3604L19.9354 14.5833H5.83333V11.6667H19.9354L16.1583 7.88958L18.2292 5.83333L25.5208 13.125L18.2292 20.4167L16.1583 18.3604ZM23.3333 0C24.1069 0 24.8487 0.307291 25.3957 0.854272C25.9427 1.40125 26.25 2.14312 26.25 2.91667V9.72708L23.3333 6.81042V2.91667H2.91667V23.3333H23.3333V19.4396L26.25 16.5229V23.3333C26.25 24.1069 25.9427 24.8487 25.3957 25.3957C24.8487 25.9427 24.1069 26.25 23.3333 26.25H2.91667C1.29792 26.25 0 24.9375 0 23.3333V2.91667C0 1.29792 1.29792 0 2.91667 0H23.3333Z"
                            fill="white" />
                    </svg>
                    <h3>Cerrar Sesión</h3>
                </button>
            </div>
        </div>

        <!-- Content section -->
        <div class="main-content">
            <!-- Alerts container -->
            <div class="alerts-container" ref="alertsContainer"></div>

            <!-- User information section -->
            <div class="info-user-container">
                <h3>Central de Atención de Emergencias</h3>
                <!-- Widgets displaying user information -->
                <div class="widgets-info-container">
                    <!-- Widget for notifications count -->
                    <div class="widget-data-new" @click="newNotificationSeen('call')">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708482404/Vector_2_s6mnwk.png"
                            alt="icon-new-calls">
                        <div class="data-new" style="background: #27AB90">{{ newCalls }}</div>
                    </div>

                    <div class="widget-data-new" @click="newNotificationSeen('message')">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708482404/Vector_3_qm18sd.png"
                            alt="icon-new-calls">
                        <div class="data-new" style="background: #FF433D">{{ newMessages }}</div>
                    </div>

                    <!-- Widget for user icon and name user -->
                    <div class="widget-username">
                        <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708482405/Vector_4_saaici.png"
                            alt="icon-username">
                        <div class="username-container">
                            <h3>{{ userName }}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <!-- View content section -->
            <div class="info-view-container">
                <router-view />
            </div>

            <!-- Session information section -->
            <div class="info-session">
                <h3>{{ dateTimeSession }}</h3>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// IMPORTACIONES NECESARIAS
import AlertComponent from '@/components/dashboard/AlertComponent.vue';
import { onBeforeMount, onMounted, ref, watch, createApp } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import VueJwtDecode from 'vue-jwt-decode';

// DEFINICIÓN DE CONSTANTES
const userRole = ref();  // Rol del usuario
const userName = ref();  // Nombre de usuario
const dateTimeSession = ref();  // Fecha y hora de la sesión
const router = useRouter();  // Instancia del enrutador
const newCalls = ref(0);  // Contador de nuevas llamadas
const newMessages = ref(0);  // Contador de nuevos mensajes
const store = useStore();  // Almacenamiento Vuex
const alertsContainer = ref(null);  // Contenedor de alertas

// CONFIGURACIÓN ANTES DE MONTAR EL DASHBOARD
onBeforeMount(() => {
    // OBTENEMOS EL JWT ALMACENADO EN EL LOCAL-STORAGE
    const token = localStorage.getItem('jwt');
    // SI EL JWT ESTÁ ALMACENADO EN EL LOACL-STORAGE
    if (token) {
        // DECODIFICAMOS EL JWT OBTENIDO DEL LOCAL-STORAGE
        const decodedToken = VueJwtDecode.decode(token);
        // SI LA DECODIFICACIÓN ES NO NULA
        if (decodedToken) {
            // OBTENEMOS EL ROL DEL USUARIO, PARA MOSTRAR O NO LA RUTA '/dashboard/users'
            userRole.value = decodedToken["user_rol"];
            // OBTENEMOS EL USERNAME DEL USUARIO, PARA MOSTRARLO EN EL DASHBOARD
            userName.value = decodedToken["user_name"]
        }
    }
    // OBTENEMOS LA HORA Y FECHA ALMACENADA EN EL LOCAL-STORAGE, PARA MOSTRARLO EN EL DASHBOARD
    dateTimeSession.value = localStorage.getItem('dateTimeSession');
    // OBTENEMOS EL OBJETO 'table' ALMACENADO EN EL LOCAL-STORAGE
    const tables = localStorage.getItem('tables');
    if (tables) {
        newCalls.value = JSON.parse(tables)["CAE"]["Notificaciones"]["records"][0]["llamadas"]
        newMessages.value = JSON.parse(tables)["CAE"]["Notificaciones"]["records"][0]["mensajes"]
    }
});

// FUNCIONALIDAD DE CIERRE DE SESIÓN
const logout = () => {
    // ELIMINAMOS EL JWT ALMACENADO EN EL LOCAL-STORAGE
    localStorage.removeItem('jwt');
    // ELIMINAMOS LAS TABLAS ALMACENADAS EN EL LOCAL-STORAGE
    localStorage.removeItem('tables');
    // ELIMINAMOS LA HORA Y FECHA ALMACENADA EN EL LOCAL-STORAGE
    localStorage.removeItem('dateTimeSession');
    // REDIRIGIMOS AL USUARIO A LA RUTA '/login'
    router.push('/login');
};

// FUNCIONALIDAD PARA ELIMINAR EL ÚLTIMO COMPONENTE 'AlertComponent' DENTRO DE '<div class="alerts-container"></div>'
const removeLastNotification = () => {
    // OBTENEMOS EL ÚLTIMO ELEMENTO HIJO DE LA CLASE '<div class="alerts-container"></div>'
    const lastChild = document.querySelector('.alerts-container')?.lastChild
    // SI '<div class="alerts-container"></div>' TIENE AL MENOS UN HIJO
    if (lastChild) {
        // ELIMINAMOS EL ÚLTIMO ELEMENTO HIJO DE '<div class="alerts-container"></div>'
        document.querySelector('.alerts-container')?.removeChild(lastChild)
    }
};

// FUNCIONALIDAD PARA USAR LA FUNCIÓN MUTATION 'serRemoveLastNotification' 
const changeStateRemoveLastNotifiaction = () => {
    // USO DE LA FUNCION MUTATION 'serRemoveLastNotification' DEL STORE
    store.commit('setRemoveLastNotification')
}

// FUNCIONALIDAD PARA MARCAR NOTIFICACIONES NUEVAS COMO YA VISTAS
const newNotificationSeen = async (typeWidget: string) => {
    console.log(`Boton para marcar notificacion ${typeWidget} vista, presionada`)
    // OBTENEMOS 'table' ALMACENADO EN EL LOCAL-STORAGE
    const tables = localStorage.getItem('tables');
    if (tables) {
        const tablesJSON = JSON.parse(tables)
        const records = tablesJSON["CAE"]["Notificaciones"]["records"]
        let originalRecord = records[0]
        const calls = typeWidget == 'call' ? '0' : originalRecord["llamadas"]
        const messages = typeWidget == 'message' ? '0' : originalRecord["mensajes"]
        const editedRecord = {"llamadas": calls, "mensajes": messages}
        const identifier = typeWidget == 'message' ? 'mensajes' : 'llamadas'
        await store.dispatch('editRecordTable', { "editRecord": editedRecord, "originalRecord": originalRecord, "identifier": identifier, "nameTable": "notifications" })
        // ACTUALIZAMOS EL OBJETO 'table' CON LOS VALORES MODIFICADOS
        tablesJSON["CAE"]["Notificaciones"]["records"] = [{ llamadas: calls, mensajes: messages }];

        // ALMACENAMOS EL OBJETO MODIFICADO EN EL LOCAL-STORAGE
        localStorage.setItem('tables', JSON.stringify(tablesJSON));
        
        // RESETEAMOS EL CONTADOR DE NOTIFICACIONES PARA EL WIDGET ESPECÍFICO
        newCalls.value = typeWidget == 'calls' ? '0' : originalRecord["llamadas"]
        newMessages.value = typeWidget == 'message' ? '0' : originalRecord["mensajes"]
    }
}

// CONFIGURACIÓN NECESARIA LUEGO DE SER MONTADO EN LA APP
onMounted(() => {
    // FUNCIONALIDAD QUE VIGILA SI HUBO ALGÚN CAMBIO EN EL ESTADO 'alertMMessage'
    watch(() => store.state.alertMessage, () => {
        // OBTENEMOS EL NUEVO VALOR DE 'type' DEL ESTADO 'alertMMessage'
        const typeMessage = store.state.alertMessage["type"]
        // OBTENEMOS DEL NUEVO VALOR DE 'message' DEL ESTADO 'alertMMessage'
        const message = store.state.alertMessage["message"]
        // DEFINIMOS EL OBJETO 'propsData'
        let propsData = {
            url: "",
            message: message,
            bgColor: "",
            marginColor: "",
            shadowColor: "",
            onRemove: changeStateRemoveLastNotifiaction,
        }
        // LLENAMOS 'propsData' DEPENDIENDO DEL VALOR QUE TENGA 'typeMessage'
        switch (typeMessage) {
            case 'error':
                propsData["url"] = 'https://res.cloudinary.com/dimcnbuqs/image/upload/v1708962605/33_orcb55.png'
                propsData["bgColor"] = "fcede9"
                propsData["marginColor"] = "efcac0"
                propsData["shadowColor"] = "fef5f7"
                break;
            case 'success':
                propsData["url"] = "https://res.cloudinary.com/dimcnbuqs/image/upload/v1708962605/30_m1yobd.png"
                propsData["bgColor"] = "eaf7ee"
                propsData["marginColor"] = "c0e4c9"
                propsData["shadowColor"] = "e7efe7"
                break;
        }
        // CREAMOS UNA INSTANCIA DE 'AlertComponent' Y LE PASAMOS 'propsData' QUIEN TIENE LAS PROPS QUE NECESITA
        const alert = createApp(AlertComponent, propsData);
        // SI EL ELEMENTO '<div class="alerts-container"></div>' AL QUE 'alertsContainer' HACE REFERENCIA, EXISTE 
        if (alertsContainer.value) {
            // MONTAMOS LA INSTANCIA DE 'AlertComponent' EN EL ELEMENTO QUE REFERENCIA 'alertsContainer'
            alert.mount(alertsContainer.value);
        }
    });
    
    // FUNCIONALIDAD QUE VIGILA SI HUBO ALGÚN CAMBIO EN EL ESTADO 'removeLastNotification'
    watch(() => store.state.removeLastNotification, () => {
        // SI EL ESTADO 'removeLastNotification' ES VERDADERO
        if (store.state.removeLastNotification) {
            // ELIMINAMOS EL ÚLTIMO COMPONENTE 'AlertComponent' DENTRO DE '<div class="alerts-container"></div>'
            removeLastNotification()
            // CAMBIAMOS EL VALOR DEL ESTADO 'removeLastNotification' A 'false'
            store.commit('setRemoveLastNotification')
        }
    })
})
</script>

<style scoped>
/* importamos la fuente 'Ubuntu' */
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

/* estilos para el contendor del dashboard */
.container-dashboard {
    display: flex;
    grid-template-columns: 800px 1fr;
    grid-template-areas: "menu content";
    width: 100%;
    height: 100%;
}

/* estilos para el menu lateral */
.menu {
    grid-area: menu;
    height: 100vh;
    background: #1F2D52;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    flex: 0 0 18%;
}

/* estilos para el contenedor del logo del menu */
.icon-logo-container {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* estilos para el logo del menu */
.icon-logo-container img {
    height: 100%;
    width: auto;
}


/* estilos para el contenedor de opciones (rutas y cierre de sesión) */
.options-container {
    width: 92%;
    height: 77%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* estilos para el contenedor de rutas */
.views-container {
    width: 100%;
    height: 53%;
    max-height: 463px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* estilos para los botones de las rutas y cierre se sesión */
.menu-button {
    position: relative;
    all: unset;
    width: 100%;
    height: 45px;
    text-decoration: none;
    color: #ffffff;
    display: flex;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
    border-radius: 10px;
    transition: background 0.2s ease, color 0.3s ease;
}

/* estilos para el texto de los botones de las rutas y cierre se sesión */
.menu-button h3 {
    position: absolute;
    left: 6%;
    font-family: "Ubuntu", sans-serif;
    font-size: 21px;
    font-weight: 500;
}

/* estilos 'hover' para de los botones de las rutas y cierre se sesión  */
.menu-button:hover {
    background: #ffffff;
    color: #1F2D52;
}

/* estilos para el botón de la ruta que ha sido seleccionada */
.menu-button.active {
    background-color: #fff;
    color: #1F2D52;
}

/* estilos para los íconos de los botones de las rutas y cierre de sesión */
.menu-button svg {
    position: relative;
    left: 11.95%;
    fill: #fff;
}

.menu-button svg path {
    transition: fill 0.2s ease;
}

/* estilos 'hover' para los íconos de los botones de las rutas y cierre de sesión */
.menu-button:hover svg path {
    fill: #1F2D52;
}

/* estilos 'hover' para el ícono del botón de la ruta que ha sido seleccionada */
.menu-button.active svg path {
    fill: #1F2D52;
}

/* estilos para el área principal */
.main-content {
    flex: 1;
    background: #F3F3F3;
    word-wrap: break-word;
    overflow-y: auto;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

/* estilos para el contenedor de información de fecha y hora de inicio se sesión */
.info-session {
    color: #32334F;
    font-family: "Ubuntu", sans-serif;
    font-size: 15px;
    font-weight: 500;
}

/* estilos para el contenedor de alertas o notificaciones */
.alerts-container {
    position: fixed;
    top: 0px;
    height: 0%;
    z-index: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* estilos para el contenedor de la información del usuario  */
.info-user-container {
    width: 90%;
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

/* estilos para los textos del contenedor de la información del usuario */
.info-user-container h3 {
    font-family: "Ubuntu", sans-serif;
    font-size: 21px;
    font-weight: 500;
    color: #32334F;
}

/* estilos para los widgets del contenedor de la información del usuario */
.widgets-info-container {
    height: 100%;
    width: auto;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 40px;
}

/* estilos para los widget de notificación */
.widget-data-new {
    position: relative;
    height: 100%;
    width: 70px;
    background: #fff;
    border-radius: 16px;
    display: flex;
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

/* estilos para el icono de los widget de notificación */
.widget-data-new img {
    position: relative;
    width: 25px;
    height: auto;
}

/* estilos para el valor mostrado por los widget de notificación */
.widget-data-new .data-new {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-family: "Ubuntu", sans-serif;
    font-size: 21px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* estilos para el widget de nombre de usuario */
.widget-username {
    height: 100%;
    width: 200px;
    background: #fff;
    border-radius: 16px;
    display: flex;
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 40px;
}

/* estilos para el ícono del widgete de nombre de usuario */
.widget-username img {
    position: relative;
    left: 30px;
}

/* estilos para el contendor de texto del widget de nombre de usuario */
.widget-username .username-container {
    width: 55%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* estilos para el contenedor de la información de las rutas */
.info-view-container {
    width: 100%;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>