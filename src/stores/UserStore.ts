import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORE_NAME = 'UserStore'

export const useUserStore = defineStore(STORE_NAME, () => {
  const authenticated = ref(false)

  function login() {
    authenticated.value = true
  }
  function logout() {
    authenticated.value = false
  }

  return {
    authenticated,
    login,
    logout,
  }
})
