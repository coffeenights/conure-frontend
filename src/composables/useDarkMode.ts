import { onMounted, ref } from 'vue'
import { GetSettings, SetSettings, Settings } from '@/storage/settings'

export function useDarkMode() {
  const isDarkMode = ref(false)

  onMounted(() => {
    const settings: Settings = GetSettings()

    if (settings.isDarkMode !== '') {
      // Use the saved value
      isDarkMode.value = settings.isDarkMode === 'true'
      document.documentElement.classList.toggle('dark', isDarkMode.value)
    } else {
      // Save the system preference to local storage
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        document.documentElement.classList.add('dark')
        isDarkMode.value = true
      } else {
        document.documentElement.classList.remove('dark')
        isDarkMode.value = false
      }
      SetSettings({ isDarkMode: String(isDarkMode.value) })
    }
  })

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    document.documentElement.classList.toggle('dark', isDarkMode.value)
    SetSettings({ isDarkMode: String(isDarkMode.value) })
  }

  return { isDarkMode, toggleDarkMode }
}
