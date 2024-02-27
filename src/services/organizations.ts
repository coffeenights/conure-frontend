import api, { ApiResponse } from './api'

export type Application = {
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

export type Organization = {
  id: string
  name: string
  created_at: string
  status: string
}

export type ComponentShort = {
  name: string
  type: string
}

export type ComponentStatus = {
  updated_replicas: string,
  ready_replicas: string,
  available_replicas: string,
  condition_available: string,
  condition_progressing: string,
  created: string,
  updated: string
}

export type ApplicationListResponse = ApiResponse<Application[]>
export type ApplicationResponse = ApiResponse<{ application: Application }>
export type OrganizationResponse = ApiResponse<Organization>
export type ComponentListResponse = ApiResponse<{ components: ComponentShort[] }>
export type ComponentStatusResponse = ApiResponse<ComponentStatus>

export const detailOrganization = async (id: string): Promise<OrganizationResponse> => {
  try {
    const response = await api.get(`/organizations/${id}/`)
    return { data: response.data, isError: false }
  } catch (error) {
    throw(error)
  }
}

export const listApplications = async (id: string): Promise<ApplicationListResponse> => {
  try {
    const r = await api.get(`/organizations/${id}/a/`)
    return {
      data: r.data,
      isError: false
    } as ApplicationListResponse;
  } catch (error) {
    throw(error)
  }
}

export const detailApplication = async (organizationId: string, applicationId: string, environment: string) => {
  try {
    const r = await api.get(`/organizations/${organizationId}/a/${applicationId}/e/${environment}/`)
    return {
      data: r.data,
      isError: false
    } as ApplicationResponse;
  } catch (error) {
    throw(error)
  }
}

export const listComponents = async (organizationId: string, applicationId: string, environment: string) => {
  try {
    const r = await api.get(`/organizations/${organizationId}/a/${applicationId}/e/${environment}/c/`)
    return {
      data: r.data,
      isError: false
    } as ComponentListResponse
  } catch (error) {
    throw(error)
  }
}

export const detailComponent = async (organizationId: string, applicationId: string, environment: string, componentId: string) => {
  try {
    const response = await api.get(`/organizations/${organizationId}/a/${applicationId}/e/${environment}/c/${componentId}/`)
    return response.data
  } catch (error) {
    throw(error)
  }
}

export const statusComponent = async (organizationId: string, applicationId: string, environment: string, componentId: string) => {
  try {
    const r = await api.get(`/organizations/${organizationId}/a/${applicationId}/e/${environment}/c/${componentId}/status/`)
    return {
      data: r.data,
      isError: false
    } as ComponentStatusResponse;
  } catch (error) {
    throw(error)
  }
}

export function getTimeAgo(date: string): string {
  const today = new Date()
  const ago = new Date(date)
  const diff = today.getTime() - ago.getTime()
  const seconds = Math.floor(diff / 1000)
  let frame: string = 'second'
  let total: number = seconds

  if (seconds >= 2592000) {
    total = Math.floor(seconds / 2592000)
    frame = 'month'
  }
  else if (seconds >= 604800) {
    total = Math.floor(seconds / 604800)
    frame = 'week'
  }
  else if (seconds >= 86400) {
    total = Math.floor(seconds / 86400)
    frame = 'day'
  }
  else if (seconds >= 3600) {
    total = Math.floor(seconds / 3600)
    frame = 'hour'
  }
  else if (seconds >= 60) {
    total = Math.floor(seconds / 60)
    frame = 'minute'
  }

  if (total > 1) {
    return `${total} ${frame}s`
  }
  return `${total} ${frame}`
}