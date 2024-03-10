import { createStore } from 'vuex'

const apiUrl = 'https://mysql-dashboard-api.onrender.com/';

const store = createStore({
  state: {
    isLoggedIn: true,
    errorLogin: false,
    loading: false,
    blocked: [],
    cleaned: [],
    isLoading: false,
    //typeUser: '',
    shouldCleanEntries: false,
    alertMessage: {},
    rowDeleteEdit: false,
    removeLastNotification: false,
    //dataTables: {} as Record<string, object>,
  },
  getters: {
  },
  mutations: {
    restoreErrorLogin(state) {
      state.errorLogin = false
    },

    checkErrorLogin(state) {
      state.errorLogin = true
    },

    setLoading(state, value) {
      state.loading = value;
    },

    changeShouldCleanEntries(state) {
      state.shouldCleanEntries = !state.shouldCleanEntries
    },

    setAlertMessage(state, newMessage) {
      console.log(`Cambiando alertMessage: ${JSON.stringify(newMessage)}`)
      state.alertMessage = newMessage
    },

    restoreRowDeleteEdit(state) {
      state.rowDeleteEdit = false
    },

    setRemoveLastNotification(state) {
      state.removeLastNotification = !state.removeLastNotification
      console.log(`removeLastNotification ha sido cambiado a: ${state.removeLastNotification}`)
    },

  },
  actions: {
    async authUser(context, userData) {
      try {
        context.commit('setLoading', true)
        const sendData = userData
        console.log(`sendData: ${JSON.stringify(userData)}`)

        const response = await fetch(`${apiUrl}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        });

        const { token } = await response.json();

        localStorage.setItem('jwt', token);
        context.commit('setLoading', false);
        const checkDateSession = () => {
          const dateOptions: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          };

          const hourOptions: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          };

          const date = new Date();

          const dateFormat = new Intl.DateTimeFormat('es-ES', dateOptions).format(date);
          const hourFormat = new Intl.DateTimeFormat('en-US', hourOptions).format(date)

          return `${hourFormat}, ${dateFormat.replace(/,/g, '')}`
        }
        localStorage.setItem('dateTimeSession', checkDateSession())
      } catch (error) {
        context.commit('setLoading', false);
        context.commit('checkErrorLogin');
        console.error('Error en la autenticación', error);
      }
    },
    async insertRecordTable(context, { recordToInsert, nameTable }) {
      try {
        context.commit('setLoading', true);
        const sendData = { "insertRecord": recordToInsert, "nameTable": nameTable };
        console.log(`Enviando dataToInsert: ${JSON.stringify(sendData)}`);
        // OBTENEMOS EL JWT ALMACENADO EN EL LOCAL-STORAGE
        const token = localStorage.getItem('jwt');
        // SI EL JWT ESTÁ ALMACENADO EN EL LOACL-STORAGE
        if (token) {
          const response = await fetch(`${apiUrl}/dashboard/${nameTable}/${token}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            context.commit('setAlertMessage', responseData)
          } else {
            console.error('Error en la respuesta del servidor:', response.status, response.statusText);
          }
        }
      } catch (error) {
        context.commit('setLoading', false);
        console.error(`Error en la petición: ${error}`);
      } finally {
        console.log('Petición completada');
      }
    },

    async obtainAllTablesRecords(context, nameView) {
      try {
        console.log("OBTENIENDO DATOS DEL BACKEND")
        context.commit('setLoading', true);
        // OBTENEMOS EL JWT ALMACENADO EN EL LOCAL-STORAGE
        const token = localStorage.getItem('jwt');
        // SI EL JWT ESTÁ ALMACENADO EN EL LOACL-STORAGE
        if (token) {
          const response = await fetch(`${apiUrl}/dashboard/${nameView}/${token}`);
          const data = await response.json();
          console.log(`data received: ${JSON.stringify(data)}`);
          localStorage.setItem('tables', data)
          context.commit('setLoading', false);
        }
      } catch (error) {
        context.commit('setLoading', false);
        console.log(`error: ${error}`);
      }
      console.log('Petición correcta');
    },

    async obtainRecordsTable(context, nameView) {
      try {
        console.log("OBTENIENDO DATOS DEL BACKEND")
        context.commit('setLoading', true);
        // OBTENEMOS EL JWT ALMACENADO EN EL LOCAL-STORAGE
        const token = localStorage.getItem('jwt');
        // SI EL JWT ESTÁ ALMACENADO EN EL LOACL-STORAGE
        if (token) {
          const response = await fetch(`${apiUrl}/dashboard/${nameView}/${token}`);
          const data = await response.json();
          console.log(`data received: ${JSON.stringify(data)}`);
          return JSON.parse(data)
        }
      } catch (error) {
        context.commit('setLoading', false);
        console.log(`error: ${error}`);
        return {}
      }
      console.log('Petición correcta');
    },
    async editRecordTable(context, { editRecord, originalRecord, identifier, nameTable }) {
      try {
        context.commit('setLoading', true)
        const sendData = {
          "editedRecord": editRecord,
          "originalRecord": originalRecord,
          "identifier": identifier,
        }
        console.log(`sendData: ${JSON.stringify(sendData)}`)
        // OBTENEMOS EL JWT ALMACENADO EN EL LOCAL-STORAGE
        const token = localStorage.getItem('jwt');
        // SI EL JWT ESTÁ ALMACENADO EN EL LOACL-STORAGE
        if (token) {
          const response = await fetch(`${apiUrl}/dashboard/${nameTable}/${token}`, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(sendData)
          })

          if (response.ok) {
            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            if (nameTable !== 'notifications') {
              context.commit('setAlertMessage', responseData)
            }
          } else {
            console.error('Error en la respuesta del servidor:', response.status, response.statusText);
          }
        }
      } catch (error) {
        context.commit('setLoading', false);
        console.error(`Error en la petición: ${error}`);
      } finally {
        console.log('Petición completada');
      }
    },
    async deleteRecordTable(context, { recordIdentifier, identifier, nameTable }) {
      try {
        context.commit('setLoading', true)
        const sendData = {
          "recordIdentifier": recordIdentifier,
          "identifier": identifier,
          "nameTable": nameTable
        }
        console.log(`sendData: ${JSON.stringify(sendData)}`)
        // OBTENEMOS EL JWT ALMACENADO EN EL LOCAL-STORAGE
        const token = localStorage.getItem('jwt');
        // SI EL JWT ESTÁ ALMACENADO EN EL LOACL-STORAGE
        if (token) {
          const response = await fetch(`${apiUrl}/dashboard/${nameTable}/${token}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(sendData)
          })
          if (response.ok) {
            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            context.commit('setAlertMessage', responseData)
          } else {
            console.error('Error en la respuesta del servidor:', response.status, response.statusText);
          }
        }
      } catch (error) {
        context.commit('setLoading', false);
        console.error(`Error en la petición: ${error}`);
      } finally {
        console.log('Petición completada');
      }
    },
  },
  modules: {
  }
})

export default store;