import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORE_NAME = 'UserStore'

export const useUserStore = defineStore(STORE_NAME, () => {
  const authenticated = ref(false)

  const initAuthState = () => {
    const user = localStorage.getItem(STORE_NAME)
    authenticated.value = user ? JSON.parse(user) : false
  }

  initAuthState()

  function login() {
    authenticated.value = true
    localStorage.setItem(STORE_NAME, JSON.stringify(true))
  }
  function logout() {
    authenticated.value = false
    localStorage.setItem(STORE_NAME, JSON.stringify(false))
  }

  return {
    authenticated,
    login,
    logout,
  }
})
