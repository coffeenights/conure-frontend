import { createApp } from 'vue'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './styles/style.css'
import App from './App.vue'
import PageNotFound from  './views/404.vue'
import Applications from './views/applications/ApplicationList.vue'
import ApplicationDetails from './views/applications/ApplicationDetails.vue'
import ApplicationDetailsVariables from './views/applications/ApplicationDetailsVariables.vue'
import ComponentList from './views/applications/ComponentList.vue'
import ComponentDetails from './views/applications/ComponentDetails.vue'
import ComponentDetailsTab from './views/applications/ComponentDetailsTab.vue'
import ComponentSettingsTab from './views/applications/ComponentSettingsTab.vue'


const routes: Array<RouteRecordRaw>  = [
    { 
        path: '/', 
        component: PageNotFound,
        name: 'home' 
    },
    { 
        path: '/organizations/:organizationId', 
        component: PageNotFound,
        name: 'organization',
        children: [
            { 
                path: 'applications', 
                component: Applications,
                name: 'applications' 
            },
            { 
                path: 'applications/:applicationId/:environment', 
                component: ApplicationDetails,
                name: 'applicationDetails',
                redirect: { name: 'componentList' },
                children: [
                    {
                        path: 'variables',
                        component: ApplicationDetailsVariables,
                        name: 'applicationDetailsVariables'
                    },
                    {
                        path: 'components',
                        component: ComponentList,
                        name: 'componentList',
                        children: [
                            {
                                path: ':componentId',
                                redirect: { name: 'componentDetailsTab' },
                                component: ComponentDetails,
                                name: 'componentDetails',
                                children: [
                                    {
                                        path: 'details',
                                        component: ComponentDetailsTab,
                                        name: 'componentDetailsTab'
                                    },
                                    {
                                        path: 'settings',
                                        component: ComponentSettingsTab,
                                        name: 'componentSettingsTab'
                                    }
                                ]
                            }
                        ]
                    }
                  ]
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes, 
})

const pinia = createPinia()
const app = createApp(App);
app.use(router);
app.use(pinia);
router.isReady().then(() => app.mount('#app'))
