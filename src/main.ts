import { createApp } from 'vue'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './styles/style.css'
import App from './App.vue'
import PageNotFound from  './views/404.vue'
import Applications from './views/applications/ApplicationList.vue'
import ApplicationDetails from './views/applications/ApplicationDetails.vue'
import ApplicationDetailsVariables from './views/applications/ApplicationDetailsVariables.vue'
import ApplicationDetailsComponentList from './views/applications/ApplicationDetailsComponentList.vue'


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
        path: '/applications/:id', 
        components: {
            default: ApplicationDetails,
        },
        name: 'applicationDetails',
        children: [
            {
              path: 'variables',
              component: ApplicationDetailsVariables,
              name: 'applicationDetailsVariables'
            },
            {
                path: 'components',
                component: ApplicationDetailsComponentList,
                name: 'applicationDetailsComponentList'
            }
          ],
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
