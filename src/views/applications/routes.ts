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
  },
  {
    path: '/organizations/:organizationId/applications',
    component: Applications,
    name: 'applications',
  },
  {
    path: '/organizations/:organizationId/applications/:applicationId/:environment',
    component: ApplicationDetails,
    name: 'applicationDetails',
    redirect: { name: 'componentList' },
    children: [
      {
        path: 'variables',
        component: ApplicationDetailsVariables,
        name: 'applicationDetailsVariables',
      },
      {
        path: 'components',
        component: ComponentList,
        name: 'componentList',
        children: [
          {
            path: ':componentName',
            redirect: { name: 'componentDetailsTab' },
            component: ComponentDetails,
            name: 'componentDetails',
            children: [
              {
                path: 'details',
                component: ComponentDetailsTab,
                name: 'componentDetailsTab',
              },
              {
                path: 'settings',
                component: ComponentSettingsTab,
                name: 'componentSettingsTab',
              },
            ],
          },
        ],
      },
    ],
  },
]

export default applicationRoutes
