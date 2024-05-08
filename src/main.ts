import { createApp } from 'vue'
import {
  RouteRecordRaw,
  createRouter,
  createWebHistory,
} from 'vue-router'
import { createPinia } from 'pinia'
import './styles/style.css'
import App from './App.vue'
import PageNotFound from './views/404.vue'
import EmptyState from './views/EmptyState.vue'
import applicationRoutes from './views/applications/routes'
import authRoutes from './views/auth/routes'
import { useUserStore } from '@/stores/UserStore'
import { authenticationStatus } from '@/services/auth'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import axios from 'axios'

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

// Navigation guards
router.beforeEach(async (to) => {
  const userStore = useUserStore()
  const breadCrumbStore = useBreadCrumbStore()

  // Authenticated routes
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !userStore.authenticated
  ) {
    try {
      const result = await authenticationStatus()
      if (result.status === 200) {
        userStore.authenticated = true
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.code === 'ERR_BAD_REQUEST') {
        userStore.authenticated = false
        return { name: 'login', query: { next: to.fullPath } }
      } else {
        return false
      }
    }
  }

  // Load breadcrumb state
  if (to.meta.requiresBreadcrumbState && !breadCrumbStore.isLoaded) {
    try {
      await breadCrumbStore.loadBreadCrumb(
        to.params.organizationId as string,
        to.params.applicationId as string,
        to.params.environment as string,
      )
    } catch (error) {
      console.log(error)
    }
  }
})

router.afterEach((to, from, failure) => {
  if (failure) {
    console.log(to, from, failure)
  }
})

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
router.isReady().then(() => app.mount('#app'))
