import { detailApplication, detailOrganization } from '@/services/organizations'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBreadCrumbStore = defineStore('BreadCrumbStore', () => {
  const environment = ref('')
  const applicationId = ref('')
  const application = ref('')
  const organizationId = ref('')
  const organization = ref('')
  const isLoading = ref(false)

  const loadBreadCrumb = async (
    orgId: string,
    appId: string,
    env: string,
  ): Promise<void[]> => {
    let orgResponse: Promise<void> | undefined
    let appResponse: Promise<void> | undefined
    const callStack: Promise<void>[] = []
    isLoading.value = true
    if (orgId) {
      orgResponse = detailOrganization(orgId)
        .then((response) => {
          organization.value = response.data.name
          organizationId.value = response.data.id
        })
        .catch((error) => {
          if (error.response.status === 404) {
            throw error
          }
        })
    }
    if (applicationId.value) {
      appResponse = detailApplication(orgId, appId, env)
        .then((response) => {
          application.value = response?.data.name as string
          applicationId.value = response?.data.id as string
        })
        .catch((error) => {
          if (error.response.status === 404) {
            throw error
          }
        })
    }
    if (env) {
      environment.value = env
    }

    if (orgResponse) {
      callStack.push(orgResponse)
    }

    if (appResponse) {
      callStack.push(appResponse)
    }
    return Promise.all(callStack)
      .catch((error) => {
        throw error
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const isLoaded = computed(() => {
    return !(
      environment.value === '' &&
      applicationId.value === '' &&
      organizationId.value === ''
    )
  })

  return {
    environment,
    application,
    applicationId,
    organization,
    organizationId,
    isLoaded,
    isLoading,
    loadBreadCrumb,
  }
})
