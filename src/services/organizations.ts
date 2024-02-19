import api from './api'

// Create an object for the applications and its response

export interface ApplicationResponse {
  applications: Application[]
}

export interface Application {
  id: string
  name: string
  description: string
  environment: string
  created_by: string
  account_id: string
  total_components: number
  status: string
  created: string
  revision: number
  last_updated: string
}

export const listApplications = async (id: string) => {
  try {
    const response = await api.get(`/organizations/${id}/`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export function getDaysAgo(date: string) {
  const today = new Date()
  const ago = new Date(date)
  const diff = today.getTime() - ago.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}