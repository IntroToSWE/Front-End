import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Axios } from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)

app.use(router, Axios)

app.mount('#app')
