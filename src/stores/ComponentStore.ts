import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ComponentService } from '@/services/organizations'

export const useComponentStore = defineStore('ComponentStore', () => {
  const component = ref<ComponentService>({} as ComponentService)

  return {
    component
  }
})
