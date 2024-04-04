import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
})

export type ApiResponse<Data> = {
  data: Data
  isError: boolean
}

export default instance
