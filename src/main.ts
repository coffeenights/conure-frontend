import { createApp } from 'vue'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './styles/style.css'
import App from './App.vue'
import PageNotFound from  './views/404.vue'
import Applications from './views/applications/ApplicationList.vue'
import ApplicationDetails from './views/applications/ApplicationDetails.vue'
import ApplicationDetailsEnv from './views/applications/ApplicationDetailsEnv.vue'


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
        component: ApplicationDetails,
        name: 'applicationDetails',
        children: [
            {
              // UserProfile will be rendered inside User's <router-view>
              // when /user/:id/profile is matched
              path: 'environment',
              component: ApplicationDetailsEnv,
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
