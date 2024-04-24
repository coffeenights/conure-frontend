import { onMounted, ref } from 'vue'

export function useDarkMode() {
  const isDarkMode = ref(false)

  onMounted(() => {
    const savedIsDarkMode = localStorage.getItem('isDarkMode')

    if (savedIsDarkMode !== null) {
      // Use the saved value
      isDarkMode.value = savedIsDarkMode === 'true'
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
      localStorage.setItem('isDarkMode', String(isDarkMode.value))
    }
  })

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    document.documentElement.classList.toggle('dark', isDarkMode.value)
    localStorage.setItem('isDarkMode', String(isDarkMode.value))
  }

  return { isDarkMode, toggleDarkMode }
}
