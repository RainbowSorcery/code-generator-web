import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import axios from 'axios';

import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css';
import axios from 'axios';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')

axios.defaults.baseURL = import.meta.env.BASE_URL