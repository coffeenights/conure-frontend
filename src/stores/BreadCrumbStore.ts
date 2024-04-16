import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBreadCrumbStore = defineStore('BreadCrumbStore', () => {
  const environment = ref('')
  const applicationId = ref('')
  const application = ref('')
  const organizationId = ref('')
  const organization = ref('')
  const isStoreLoaded = ref(false)

  const isLoaded = computed(() => {
    if (
      environment.value === '' &&
      applicationId.value === '' &&
      organizationId.value === ''
    ) {
      return false
    }
    return true
  })

  return {
    environment,
    application,
    applicationId,
    organization,
    organizationId,
    isLoaded,
    isStoreLoaded,
  }
})
