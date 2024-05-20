import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { getError } from './errors'
import { useUserStore } from '@/stores/UserStore'
import { useToast } from '@/components/ui/toast'
import { useRouter } from 'vue-router'

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
    } else if (error.response?.status === 404) {
      const router = useRouter()
      router.push({ name: '404' })
    } else {
      const { toast } = useToast()
      const errorMessage = getError(error)
      toast({
        title: 'Error',
        description: errorMessage,
      })
    }
    return Promise.reject(error)
  },
)

export type ApiResponse<Data> = {
  data: Data
  status: number
}

const request = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: object,
): Promise<T> => {
  try {
    const r: AxiosResponse = await instance.request({
      url,
      method,
      data,
    })
    return {
      data: r.data,
      status: r.status,
    } as T
  } catch (error) {
    return Promise.reject(error)
  }
}

export const fetchData = async <T>(url: string): Promise<T> => {
  return request<T>(url, 'GET')
}

export const deleteData = async <T>(url: string): Promise<T> => {
  return request<T>(url, 'DELETE')
}

export const postData = async <T>(url: string, data: object): Promise<T> => {
  return request<T>(url, 'POST', data)
}

export const putData = async <T>(url: string, data: object): Promise<T> => {
  return request<T>(url, 'PUT', data)
}

export default instance
