import { onMounted, ref } from 'vue'

export function useDarkMode() {
  const isDarkMode = ref(false)

  onMounted(() => {
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
  })

  return { isDarkMode }
}
