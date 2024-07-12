import { RouteRecordRaw } from 'vue-router'
import Integrations from './Integrations.vue'
import GeneralSettings from './GeneralSettings.vue'
import SettingsMenu from './SettingsMenu.vue'

const settingsRoutes: Array<RouteRecordRaw> = [
  {
    path: '/settings',
    component: SettingsMenu,
    name: 'settingsMenu',
    meta: { requiresAuth: true, requiresBreadcrumbState: false },
    redirect: { name: 'settingsGeneral' },
    children: [
      {
        path: 'general',
        component: GeneralSettings,
        name: 'settingsGeneral',
        meta: { requiresAuth: true, requiresBreadcrumbState: false },
      },
      {
        path: 'integrations',
        component: Integrations,
        name: 'settingsIntegrations',
        meta: { requiresAuth: true, requiresBreadcrumbState: false },
      },
    ],
  },
]

export default settingsRoutes
