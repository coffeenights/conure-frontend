import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { getError } from './errors'
import { notify } from './notifications'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = getError(error)
    notify('Error', errorMessage)
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
