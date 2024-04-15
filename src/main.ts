import { createApp } from 'vue'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './styles/style.css'
import App from './App.vue'
import PageNotFound from './views/404.vue'
import EmptyState from './views/EmptyState.vue'
import applicationRoutes from './views/applications/routes'
import authRoutes from './views/auth/routes'
import { useUserStore } from '@/stores/UserStore'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { detailOrganization, detailApplication } from '@/services/organizations'
import { authenticationStatus } from '@/services/auth'

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



router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const breadCrumbStore = useBreadCrumbStore()
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !userStore.authenticated
  ) {

    // check if the user is authenticated against the server
    authenticationStatus()
    .then((response) => {
      console.log(response)
    })
    .catch()
    // Redirect to the login page if the user is not authenticated
    const nextUrl = to.fullPath
    next({ path: '/auth/login', query: { next: nextUrl } })
  } else if (
    to.matched.some((record) => record.meta.requiresBreadcrumbState) &&
    !breadCrumbStore.isLoaded
  ) {
    let orgResponse: Promise<any> | undefined
    let appResponse: Promise<any> | undefined
    if (to.params.organizationId) {
      orgResponse = detailOrganization(to.params.organizationId as string)
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
    if (to.params.applicationId) {
      appResponse = detailApplication(
        to.params.organizationId as string,
        to.params.applicationId as string,
        to.params.environment as string,
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
    if (to.params.environment) {
      breadCrumbStore.environment = to.params.environment as string
    }
    Promise.all([orgResponse, appResponse])
      .then(() => {
        breadCrumbStore.isStoreLoaded = true
      })
      .catch((error) => {
        throw error
      }
    )
    next()
  } else {
    next()
  }
})

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
router.isReady().then(() => app.mount('#app'))
