import { createApp, watch } from 'vue'
import { createPinia, storeToRefs } from 'pinia'

import App from './App.vue'
import router from './router'


const app = createApp(App)
const pinia = createPinia()

if (localStorage.getItem('invoiceState')) {
  pinia.state.value = JSON.parse(localStorage.getItem('invoiceState'))
}

watch(pinia.state, (state) => {
  localStorage.setItem('invoiceState', JSON.stringify(state))
},
{ deep : true }
)

app.use(pinia)
app.use(router)

app.mount('#app')
console.log("launched ...")
