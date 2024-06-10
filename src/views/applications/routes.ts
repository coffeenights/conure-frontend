import EmptyState from '../EmptyState.vue'
import ApplicationList from './ApplicationList.vue'
import ApplicationDetails from './ApplicationDetails.vue'
import ApplicationDetailsVariables from './ApplicationDetailsVariables.vue'
import ComponentList from './ComponentList.vue'
import ComponentDetails from './ComponentDetails.vue'
import ComponentDetailsTab from './ComponentDetailsTab.vue'
import ComponentVariablesTab from './ComponentVariablesTab.vue'
import OrganizationList from './OrganizationList.vue'
import { RouteRecordRaw } from 'vue-router'
import ComponentLogsTab from '@/views/applications/ComponentLogsTab.vue'
import ComponentSelection from './ComponentSelection.vue'

const applicationRoutes: Array<RouteRecordRaw> = [
  {
    path: '/organizations',
    component: OrganizationList,
    name: 'organizations',
    meta: { requiresAuth: true, requiresBreadcrumbState: false },
  },
  {
    path: '/organizations/:organizationId',
    component: EmptyState,
    name: 'organization',
    meta: { requiresAuth: true, requiresBreadcrumbState: true },
  },
  {
    path: '/organizations/:organizationId/applications',
    component: ApplicationList,
    name: 'applications',
    meta: { requiresAuth: true, requiresBreadcrumbState: true },
  },
  {
    path: '/organizations/:organizationId/applications/:applicationId/:environment',
    component: ApplicationDetails,
    name: 'applicationDetails',
    meta: { requiresAuth: true, requiresBreadcrumbState: true },
    redirect: { name: 'componentList' },
    children: [
      {
        path: 'variables',
        component: ApplicationDetailsVariables,
        name: 'applicationDetailsVariables',
        meta: { requiresAuth: true, requiresBreadcrumbState: true },
      },
      {
        path: 'components',
        component: ComponentList,
        name: 'componentList',
        meta: { requiresAuth: true, requiresBreadcrumbState: true },
        children: [
          {
            path: 'create',
            component: ComponentSelection,
            name: 'componentSelection',
            meta: { requiresAuth: true, requiresBreadcrumbState: true },
          },
          {
            path: ':componentId',
            redirect: { name: 'componentDetailsTab' },
            component: ComponentDetails,
            name: 'componentDetails',
            meta: { requiresAuth: true, requiresBreadcrumbState: true },
            children: [
              {
                path: 'details',
                component: ComponentDetailsTab,
                name: 'componentDetailsTab',
                meta: { requiresAuth: true, requiresBreadcrumbState: true },
              },
              {
                path: 'variables',
                component: ComponentVariablesTab,
                name: 'componentVariablesTab',
                meta: { requiresAuth: true, requiresBreadcrumbState: true },
              },
              {
                path: 'logs',
                component: ComponentLogsTab,
                name: 'componentLogsTab',
                meta: { requiresAuth: true, requiresBreadcrumbState: true },
              },
            ],
          },
        ],
      },
    ],
  },
]

export default applicationRoutes
