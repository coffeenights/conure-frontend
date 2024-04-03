import { createApp } from 'vue'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './styles/style.css'
import App from './App.vue'
import PageNotFound from './views/404.vue'
import EmptyState from './views/EmptyState.vue'
import applicationRoutes from './views/applications/routes'
import authRoutes from './views/auth/routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: EmptyState,
    name: 'home',
  },
  {
    path: '/not-found',
    component: PageNotFound,
    name: '404',
  },
]

routes.push(...applicationRoutes)
routes.push(...authRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
router.isReady().then(() => app.mount('#app'))
