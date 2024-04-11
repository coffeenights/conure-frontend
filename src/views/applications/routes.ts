import EmptyState from '../EmptyState.vue'
import Applications from './ApplicationList.vue'
import ApplicationDetails from './ApplicationDetails.vue'
import ApplicationDetailsVariables from './ApplicationDetailsVariables.vue'
import ComponentList from './ComponentList.vue'
import ComponentDetails from './ComponentDetails.vue'
import ComponentDetailsTab from './ComponentDetailsTab.vue'
import ComponentSettingsTab from './ComponentSettingsTab.vue'
import { RouteRecordRaw } from 'vue-router'

const applicationRoutes: Array<RouteRecordRaw> = [
  {
    path: '/organizations/:organizationId',
    component: EmptyState,
    name: 'organization',
    meta: { requiresAuth: true },
  },
  {
    path: '/organizations/:organizationId/applications',
    component: Applications,
    name: 'applications',
    meta: { requiresAuth: true },
  },
  {
    path: '/organizations/:organizationId/applications/:applicationId/:environment',
    component: ApplicationDetails,
    name: 'applicationDetails',
    meta: { requiresAuth: true },
    redirect: { name: 'componentList' },
    children: [
      {
        path: 'variables',
        component: ApplicationDetailsVariables,
        name: 'applicationDetailsVariables',
        meta: { requiresAuth: true },
      },
      {
        path: 'components',
        component: ComponentList,
        name: 'componentList',
        meta: { requiresAuth: true },
        children: [
          {
            path: ':componentName',
            redirect: { name: 'componentDetailsTab' },
            component: ComponentDetails,
            name: 'componentDetails',
            meta: { requiresAuth: true },
            children: [
              {
                path: 'details',
                component: ComponentDetailsTab,
                name: 'componentDetailsTab',
                meta: { requiresAuth: true },
              },
              {
                path: 'settings',
                component: ComponentSettingsTab,
                name: 'componentSettingsTab',
                meta: { requiresAuth: true },
              },
            ],
          },
        ],
      },
    ],
  },
]

export default applicationRoutes
