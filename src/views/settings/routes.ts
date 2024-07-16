import { RouteRecordRaw } from 'vue-router'
import Integrations from './Integrations.vue'
import GeneralSettings from './GeneralSettings.vue'
import SettingsMenu from './SettingsMenu.vue'
import Limits from './Limits.vue'
import Security from './Security.vue'
import NewIntegration from './NewIntegration.vue'

const settingsRoutes: Array<RouteRecordRaw> = [
  {
    path: '/settings/:organizationId',
    component: SettingsMenu,
    name: 'settingsMenu',
    meta: { requiresAuth: true, requiresBreadcrumbState: true },
    redirect: { name: 'settingsGeneral' },
    children: [
      {
        path: 'general',
        component: GeneralSettings,
        name: 'settingsGeneral',
        meta: { requiresAuth: true, requiresBreadcrumbState: true },
      },
      {
        path: 'integrations',
        component: Integrations,
        name: 'settingsIntegrations',
        meta: { requiresAuth: true, requiresBreadcrumbState: true },
      },
      {
        path: 'integrations/new',
        component: NewIntegration,
        name: 'settingsNewIntegration',
        meta: { requiresAuth: true, requiresBreadcrumbState: true },
      },
      {
        path: 'limits',
        component: Limits,
        name: 'settingsLimits',
        meta: { requiresAuth: true, requiresBreadcrumbState: true },
      },
      {
        path: 'security',
        component: Security,
        name: 'settingsSecurity',
        meta: { requiresAuth: true, requiresBreadcrumbState: true },
      },
    ],
  },
]

export default settingsRoutes
