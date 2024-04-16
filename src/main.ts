import { createApp } from 'vue'
import {
  RouteRecordRaw,
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
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
import { detailApplication, detailOrganization } from '@/services/organizations'

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

const loadBreadCrumb = async (
  route: RouteLocationNormalized,
): Promise<void[]> => {
  let orgResponse: Promise<void> | undefined
  let appResponse: Promise<void> | undefined
  const callStack: Promise<void>[] = []
  const breadCrumbStore = useBreadCrumbStore()

  if (route.params.organizationId) {
    orgResponse = detailOrganization(route.params.organizationId as string)
      .then((response) => {
        breadCrumbStore.organization = response.data.name
        breadCrumbStore.organizationId = response.data.id
      })
      .catch((error) => {
        if (error.response.status === 404) {
          router.push({ name: '404' })
        } else {
          throw error
        }
      })
  }
  if (route.params.applicationId) {
    appResponse = detailApplication(
      route.params.organizationId as string,
      route.params.applicationId as string,
      route.params.environment as string,
    )
      .then((response) => {
        breadCrumbStore.application = response?.data.name as string
        breadCrumbStore.applicationId = response?.data.id as string
      })
      .catch((error) => {
        if (error.response.status === 404) {
          router.push({ name: '404' })
        } else {
          throw error
        }
      })
  }
  if (route.params.environment) {
    breadCrumbStore.environment = route.params.environment as string
  }

  if (orgResponse) {
    callStack.push(orgResponse)
  }

  if (appResponse) {
    callStack.push(appResponse)
  }
  return Promise.all(callStack).catch((error) => {
    throw error
  })
}

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !userStore.authenticated
  ) {
    const result = await authenticationStatus()
    if (result.status === 200) {
      userStore.authenticated = true
      if (to.meta.requiresBreadcrumbState) {
        await loadBreadCrumb(to)
      }
      return true
    } else {
      userStore.authenticated = false
      return { name: 'login', query: { next: to.fullPath } }
    }
  }
})

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
router.isReady().then(() => app.mount('#app'))
