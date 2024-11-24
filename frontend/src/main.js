import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/tailwind.css'
import 'flowbite'; // 引入 Flowbite 的 JavaScript

createApp(App).use(store).use(router).mount('#app')
