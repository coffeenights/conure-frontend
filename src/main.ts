import { createApp } from 'vue'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './styles/style.css'
import App from './App.vue'
import PageNotFound from  './views/404.vue'
import Applications from './views/Applications.vue'
import axios from 'axios'


const routes: Array<RouteRecordRaw>  = [
    { 
        path: '/', 
        component: PageNotFound,
        name: 'home' 
    },
    { 
        path: '/applications', 
        component: Applications,
        name: 'applications' 
    },
    { 
        path: '/databases', 
        component: PageNotFound,
        name: 'databases' 
    },
    { 
        path: '/pubsub', 
        component: PageNotFound,
        name: 'pubsub' 
    },
    { 
        path: '/cache', 
        component: PageNotFound,
        name: 'cache' 
    },
    { 
        path: '/settings', 
        component: PageNotFound,
        name: 'settings' 
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes, 
})

const pinia = createPinia()
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');
