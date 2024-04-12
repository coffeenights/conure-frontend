import { useUserStore } from '@/stores/UserStore'
import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const userStore = useUserStore()

    if (error.response?.status === 401) {
      userStore.logout()
    }
    return Promise.reject(error)
  },
)

export type ApiResponse<Data> = {
  data: Data
  isError: boolean
}

export default instance
