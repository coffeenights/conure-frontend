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
  status: number
}

export const fetchData = async <T>(url: string) => {
  try {
    const r = await instance.get(url)
    return {
      data: r.data,
      status: r.status,
    } as T
  } catch (error) {
    return Promise.reject(error)
  }
}

export default instance
