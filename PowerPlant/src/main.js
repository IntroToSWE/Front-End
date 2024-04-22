import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Axios } from 'axios'

const app = createApp(App)

app.use(router, Axios)

app.mount('#app')
