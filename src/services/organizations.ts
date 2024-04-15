import { ApiResponse, fetchData } from './api'

export type Revision = {
  revision_number: number
  created_at: string
}

export type Environment = {
  id: string
  name: string
}

export type Application = {
  id: string
  name: string
  description: string
  created_by: string
  account_id: string
  total_components: number
  status: string
  created_at: string
  environments: Environment[]
  revisions: Revision[]
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

export type ComponentService = {
  id: string
  application_id: string
  created_at: string
  description: string
  properties: Object
  traits: Object
  type: string
}


export type ComponentStatus = {
  component: ComponentService
  properties: ComponentProperties
}

export type ComponentProperties = {
  network: {
    ip: string
    external_ip: string
    host: string
    port: number[]
  }
  resources: {
    cpu: string
    memory: string
    replicas: number
  }
  storage: {
    size: string
  }
  source: {
    container_image: string
  }
}

export type ApplicationListResponse = ApiResponse<{organization: Organization, applications: Application[]}>
export type ApplicationResponse = ApiResponse<{ application: Application }>
export type OrganizationResponse = ApiResponse<Organization>
export type ComponentListResponse = ApiResponse<{
  components: ComponentService[]
}>
export type ComponentStatusResponse = ApiResponse<ComponentStatus>


export const detailOrganization = async (
  id: string,
): Promise<OrganizationResponse> => {
  return fetchData<OrganizationResponse>(`/organizations/${id}/`)
}

export const listApplications = async (
  id: string,
): Promise<ApplicationListResponse> => {
  return fetchData<ApplicationListResponse>(`/organizations/${id}/a/`)
}

export const detailApplication = async (
  organizationId: string,
  applicationId: string,
  environment: string,
): Promise<ApplicationResponse> => {
  return fetchData<ApplicationResponse>(`/organizations/${organizationId}/a/${applicationId}/e/${environment}/`)
}

export const listComponents = async (
  organizationId: string,
  applicationId: string,
  environment: string,
): Promise<ComponentListResponse> => {
  return fetchData<ComponentListResponse>(`/organizations/${organizationId}/a/${applicationId}/e/${environment}/c/`)
}

export const detailComponent = async (
  organizationId: string,
  applicationId: string,
  environment: string,
  componentId: string,
) => {
  try {
    const response = await api.get(
      `/organizations/${organizationId}/a/${applicationId}/e/${environment}/c/${componentId}/`,
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const statusComponent = async (
  organizationId: string,
  applicationId: string,
  environment: string,
  componentId: string,
): Promise<ComponentStatusResponse> => {
  return fetchData<ComponentStatusResponse>(`/organizations/${organizationId}/a/${applicationId}/e/${environment}/c/${componentId}/status/`)
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
  } else if (seconds >= 604800) {
    total = Math.floor(seconds / 604800)
    frame = 'week'
  } else if (seconds >= 86400) {
    total = Math.floor(seconds / 86400)
    frame = 'day'
  } else if (seconds >= 3600) {
    total = Math.floor(seconds / 3600)
    frame = 'hour'
  } else if (seconds >= 60) {
    total = Math.floor(seconds / 60)
    frame = 'minute'
  }

  if (total > 1) {
    return `${total} ${frame}s`
  }
  return `${total} ${frame}`
}

export function getLatestRevision(application: Application): Revision | null {
  const revisions = application.revisions
  if (revisions.length === 0) {
    return null
  }
  return revisions[0]
}
