import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ComponentStatus } from '@/services/organizations'

export const useComponentStore = defineStore('ComponentStore', () => {
  const componentStatus = ref<ComponentStatus>({} as ComponentStatus)

  return {
    componentStatus
  }
})
