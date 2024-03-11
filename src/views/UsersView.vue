<template>
    <!-- Vista de usuarios -->
    <div class="users-view-container">
        <!-- Formulario de entrada y botones -->
        <form class="inputs-buttons-container">
            <!-- Desplegable (dropdown) para seleccionar el perfil -->
            <DropDown id="select-profile-container" :options="['administrador', 'operador']" :name="'Perfil'"
                :identifier="`profile`" @optionIsChange="updateProfile" />

            <!-- Campos de entrada para Nombres, Apellidos, Usuario y Contraseña -->
            <input class="input-container" id="input-1" type="text" placeholder="Nombres" v-model="name"
                :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('names') || store.state.blocked.includes('all'))"
                :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('names') || store.state.blocked.includes('all')) }">

            <input class="input-container" id="input-2" type="text" placeholder="Apellidos" v-model="lastname"
                :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('lastnames') || store.state.blocked.includes('all'))"
                :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('lastnames') || store.state.blocked.includes('all')) }">

            <input class="input-container" id="input-3" type="text" placeholder="Usuario" v-model="username"
                :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('username') || store.state.blocked.includes('all'))"
                :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('username') || store.state.blocked.includes('all')) }">

            <input class="input-container" id="input-4" type="text" placeholder="Contraseña" v-model="password"
                :disabled="Array.isArray(store.state.blocked) && (store.state.blocked.includes('password') || store.state.blocked.includes('all'))"
                :class="{ 'disabled': Array.isArray(store.state.blocked) && (store.state.blocked.includes('password') || store.state.blocked.includes('all')) }">

            <!-- Contenedor de botones -->
            <div id="buttons-container">
                <!-- Botón guardar -->
                <div class="button-container" id="icon-save-button" @click="registerUser" :class="{ 'disabled': store.state.isLoading }">
                    <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_16_j4ihaq.png"
                        alt="icon-save-button">
                </div>

                <!-- Botón limpiar -->
                <div class="button-container" id="icon-clear-button" @click="clearDataUser" :class="{ 'disabled': store.state.isLoading }">
                    <img src="https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_17_mrwof7.png"
                        alt="icon-clear-button">
                </div>
            </div>
        </form>

        <!-- Contenedor de tabla de usuarios -->
        <div class="table-users-container" ref="table">
            <!-- Aquí se insertará la tabla de usuarios -->
        </div>
    </div>
</template>

<script lang="ts" setup>
// IMPORTACIONES NECESARIAS
import DropDown from '@/components/DropDown.vue'
import TableType1 from '@/components/TableType1.vue'
import { ref, onMounted, createApp, watch } from 'vue'
import { useStore } from 'vuex'
// DEFINICIÓN DE CONSTANTES
const store = useStore()
const profile = ref('')
const name = ref('')
const lastname = ref('')
const username = ref('')
const password = ref('')
const table = ref()
// DEFINIMOS LA ESTRUCTURA REACTIVA QUE ALMACENARÁ LOS DATOS DEL FORMULARIO '<form class="inputs-buttons-container"></form>'
const dataUser = ref({
    "Perfil": profile,
    "Nombre": name,
    "Apellidos": lastname,
    "Usuario": username,
    "Contraseña": password,
})
// CONFIGURACIÓN NECESARIA LUEGO DE SER MONTADO EN LA APP
onMounted(() => {
    // CREAMOS Y MONTAMOS EL COMPONENTE 'TableType1' EN '<div class="table-users-container"></div>'
    createInsertTable()
    watch(() => store.state.rowDeleteEdit, () => {
        if (store.state.rowDeleteEdit) {
            createInsertTable()
            store.commit('restoreRowDeleteEdit')
        }
    })
})
// FUNCIONALIDAD PARA CREAR UNA INSTANCIA DEL COMPONENTE 'TableType1' Y MONTARLO EN '<div class="table-users-container"></div>'
const createInsertTable = () => {
    // OBTENEMOS EL OBJETO 'tables' DEL LOCAL-STORAGE
    const tables = localStorage.getItem('tables')
    // SI EL OBJETO EXISTE
    if (tables) {
        const usersTable = JSON.parse(tables)["CAE"]["Usuarios"]["records"]
        const propsData = {
            data: usersTable,
            urls: ['https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_18_dx7tlk.png', 'https://res.cloudinary.com/dimcnbuqs/image/upload/v1708724359/Vector_17_mrwof7.png'],
            nameTable: 'users',
            nameObject: 'Usuarios',
            minRows: 10,
            identifier: 'Usuario'
        }
        // CREAMOS UNA INSTANCIA DEL COMPONENTE 'TableType1'
        const newTable = createApp(TableType1, propsData)
        console.log(`newTable: ${newTable}`)
        // SI EL ELEMENTO '<div class="table-users-container"></div>' AL QUE 'table' HACE REFERENCIA, EXISTE 
        if (table.value) {
            // MONTAMOS LA INSTANCIA DE 'TableType1' EN EL ELEMENTO QUE REFERENCIA 'table'
            newTable.mount(table.value)
            console.log(`table: ${table.value}`)
        }
    }
}
// FUNCIONALIDAD PARA ACTUALIZAR EL VALOR DE 'profile.value'
const updateProfile = (newProfile: string) => {
    profile.value = newProfile
}
// FUNCIONALIDAD PARA REGISTRAR UN NUEVO USUARIO
const registerUser = async () => {
    if (!store.state.isLoading) {
        store.state.isLoading = true
        const dataUserConst = dataUser.value;
        store.state.blocked = ['all']
        // ENVIAMOS 'dataUserConst' AL BACKEND PARA INSERTARLO EN LA TABLA 'users' DE LA BASE DE DATOS
        await store.dispatch('insertRecordTable', { "recordToInsert": dataUserConst, "nameTable": "users" });
        // SI EL REGISTRO SE HIZO SIN PROBLEMAS
        if (store.state.alertMessage["type"] == "success") {
            // OBTENEMOS EL JSON 'tables' ALMACENADO LOCAL-STORAGE
            const tables = localStorage.getItem('tables');
            // SI EL OBJETO EXISTE
            if (tables) {
                // CONVERTIMOS EL JSON 'tables' EN UN OBJETO
                const tablesObject = JSON.parse(tables);
                // ACTUALIZAMOS EL ARRAY 'records' DEL OBJETO 'Usuarios' DEL OBJETO 'tablesObject'
                tablesObject["CAE"]["Usuarios"]["records"].push(dataUserConst);
                // ACTUALIZAMOS EL VALOR DEL JSON 'tables' ALMACENADO EN EL LOCAL-STORAGE
                localStorage.setItem('tables', JSON.stringify(tablesObject));
            }
            createInsertTable()
        }
        store.state.blocked = []
        store.state.isLoading = false
    }
};
//FUNCIONALIDAD PARA LIMPIAR LOS CAMPOS DE ENTRADA DEL FORMULARIO
const clearDataUser = () => {
    if (!store.state.isLoading) {
        // CAMBIAMOS EL ESTADO PARA QUE EL COMPONENTE '<DropDown/>' LO DETECTE Y BORRE LA OPCIÓN QUE TIENE SELECCIONADA
        store.state.cleaned = []
        store.state.cleaned = ['profile']
        // BORRAMOS EL VALOR DE LOS INPUTS QUE SON REFERENCIANDOS POR 'name', 'lastname', 'username', 'password'
        name.value = ''
        lastname.value = ''
        username.value = ''
        password.value = ''
    }
}
</script>

<style scoped>
/* importamos la fuente 'Baloo 2' */
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400..800');

.disabled {
    opacity: 0.5;
    pointer-events: none;
}

/* estilos para el contendor de la vista usuarios */
.users-view-container {
    width: 90%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.16fr 1fr;
    gap: 40px;
}

.inputs-buttons-container {
    padding: 10px;
    grid-column: 1;
    grid-row: 1;
    background: #fff;
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr;
    gap: 10px;
}

#select-profile-container {
    grid-column: 1;
    grid-row: 1;
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

.disabled {
    opacity: 0.5;
    pointer-events: none;
}

#input-1 {
    grid-column: 2;
    grid-row: 1;
}

#input-2 {
    grid-column: 3;
    grid-row: 1;
}

#input-3 {
    grid-column: 4;
    grid-row: 1;
}

#input-4 {
    grid-column: 5;
    grid-row: 1;
}

#buttons-container {
    grid-column: 6;
    grid-row: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.button-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
}

#icon-save-button {
    background: #2ABBA7;
    transition: background 0.3s ease;
}

#icon-save-button:hover {
    background: #27a794;
}

#icon-clear-button {
    background: #F0284A;
    transition: background 0.3s ease;
}

#icon-clear-button:hover {
    background: #e50b30;
}

.button-container img {
    height: 50%;
    width: auto;
}

.table-users-container {
    grid-column: 1;
    grid-row: 2;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    padding: 10px 0;
}
</style>