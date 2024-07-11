import { RouteRecordRaw } from 'vue-router'
import Integrations from './Integrations.vue'
import General from './General.vue'

const settingsRoutes: Array<RouteRecordRaw> = [
  {
    path: '/settings/general',
    component: General,
    name: 'settingsGeneral',
    meta: { requiresAuth: true },
  },
  {
    path: '/settings/integrations',
    component: Integrations,
    name: 'settingsIntegrations',
    meta: { requiresAuth: true },
  },
]

export default settingsRoutes
