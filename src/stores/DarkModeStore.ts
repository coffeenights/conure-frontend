import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GetSettings, Settings } from '@/storage/settings'

export const useDarkModeStore = defineStore('DarkModeStore', () => {
  const settings: Settings = GetSettings()
  const isDarkMode = ref(false)

  isDarkMode.value = settings.isDarkMode === 'true'

  const setDarkMode = (value: boolean) => {
    isDarkMode.value = value
  }

  return {
    isDarkMode,
    setDarkMode,
  }
})
