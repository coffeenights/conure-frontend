import {ApiResponse, deleteData, fetchData, postData, putData} from './api'
import { z } from 'zod'

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

export type ApplicationStatus = {
  status: string
}

export type Organization = {
  id: string
  name: string
  created_at: string
  status: string
}

export type OrganizationCreateRequest = {
  name: string
}

export const OrganizationSchema = z.object({
  name: z.string().min(4).max(25).trim(),
})

export type ComponentService = {
  name: string
  type: string
  description: string
  settings: {
    resources_settings: Resources
    network_settings: Network
    storage_settings: Storage[]
    source_settings: {
      repository: string
      command: string
    }
  }
}

export type ComponentCreateRequest = {
  name: string
  type: string
  description: string
}

export type ComponentProperties = {
  network: {
    ip: string
    external_ip: string
    host: string
    port: number[]
    ports: Port[]
  }
  resources: {
    cpu: string
    memory: string
    replicas: number
  }
  storage: {
    volumes: Storage[]
    healthy: boolean
  }
  source: {
    container_image: string
    command: string
  }
  health: ComponentStatusHealth
}

export type ComponentPodCondition = {
  type: string
  status: string
  reason: string
  message: string
}

export type ComponentPod = {
  name: string
  phase: string
  conditions: Array<ComponentPodCondition>
}

export type ComponentStatus = {
  component: ComponentService
  properties: ComponentProperties
}

export type ComponentStatusHealth = {
  healthy: boolean
  message: string
  updated: string
}

export type Port = {
  host_port: number | undefined
  target_port: number | undefined
  protocol: 'tcp' | 'udp'
}

export type Network = {
  exposed: boolean
  type: 'private' | 'public'
  ports: Port[]
}

export type Storage = {
  name: string | undefined
  mount_path: string | undefined
  size: number
}

export type Resources = {
  cpu: number
  memory: number
  replicas: number
}

export type ResourcesArrays = {
  cpu: number[]
  memory: number[]
  replicas: number[]
}

export type ApplicationListResponse = ApiResponse<{
  organization: Organization
  applications: Application[]
}>
export type ApplicationResponse = ApiResponse<Application>
export type ApplicationStatusResponse = ApiResponse<ApplicationStatus>
export type OrganizationResponse = ApiResponse<Organization>
export type OrganizationListResponse = ApiResponse<{
  organizations: Organization[]
}>
export type ComponentListResponse = ApiResponse<{
  components: ComponentService[]
}>
export type ComponentResponse = ApiResponse<ComponentService>
export type ComponentStatusResponse = ApiResponse<ComponentStatus>
export type ComponentStatusHealthResponse = ApiResponse<ComponentStatusHealth>
export type ComponentPodsResponse = ApiResponse<{
  pods: ComponentPod[]
}>

export const detailOrganization = async (
  id: string,
): Promise<OrganizationResponse> => {
  return fetchData<OrganizationResponse>(`/organizations/${id}`)
}

export const listOrganizations =
  async (): Promise<OrganizationListResponse> => {
    return fetchData<OrganizationListResponse>('/organizations/')
  }

export const createOrganization = async (
  data: OrganizationCreateRequest,
): Promise<OrganizationResponse> => {
  return postData('/organizations/', data)
}

export const listApplications = async (
  id: string,
): Promise<ApplicationListResponse> => {
  return fetchData<ApplicationListResponse>(`/organizations/${id}/a`)
}

export const detailApplication = async (
  organizationId: string,
  applicationId: string,
  environment: string,
): Promise<ApplicationResponse> => {
  return fetchData<ApplicationResponse>(
    `/organizations/${organizationId}/a/${applicationId}/e/${environment}`,
  )
}

export const statusApplication = async (
  organizationId: string,
  applicationId: string,
  environment: string,
): Promise<ApplicationStatusResponse> => {
  return fetchData<ApplicationStatusResponse>(
    `/organizations/${organizationId}/a/${applicationId}/e/${environment}/status`,
  )
}

export const listComponents = async (
  organizationId: string,
  applicationId: string,
  environment: string,
): Promise<ComponentListResponse> => {
  return fetchData<ComponentListResponse>(
    `/organizations/${organizationId}/a/${applicationId}/e/${environment}/c`,
  )
}

export const detailsComponent = async (
  organizationId: string,
  applicationId: string,
  environment: string,
  componentId: string,
): Promise<ComponentResponse> => {
  return fetchData<ComponentResponse>(
    `/organizations/${organizationId}/a/${applicationId}/e/${environment}/c/${componentId}`,
  )
}

export const statusComponent = async (
  organizationId: string,
  applicationId: string,
  environment: string,
  componentId: string,
): Promise<ComponentStatusResponse> => {
  return fetchData<ComponentStatusResponse>(
    `/organizations/${organizationId}/a/${applicationId}/e/${environment}/c/${componentId}/status`,
  )
}
export const statusComponentHealth = async (
  organizationId: string,
  applicationId: string,
  environment: string,
  componentId: string,
): Promise<ComponentStatusHealthResponse> => {
  return fetchData<ComponentStatusHealthResponse>(
    `/organizations/${organizationId}/a/${applicationId}/e/${environment}/c/${componentId}/status/health`,
  )
}

export const createComponent = async (
  organizationId: string,
  applicationId: string,
  environment: string,
  componentId: string,
  data: ComponentCreateRequest,
): Promise<ComponentResponse> => {
  return postData<ComponentResponse>(
    `/organizations/${organizationId}/a/${applicationId}/e/${environment}/c/${componentId}`,
    data,
  )
}

export const deleteComponent = async (
  organizationId: string,
  applicationId: string,
  environment: string,
  componentId: string,
): Promise<ComponentResponse> => {
  return deleteData<ApiResponse<never>>(
    `/organizations/${organizationId}/a/${applicationId}/e/${environment}/c/${componentId}`,
  )
}

export const updateComponent = async (
  organizationId: string,
  applicationId: string,
  environment: string,
  componentId: string,
  data: ComponentService,
): Promise<ComponentResponse> => {
  return putData<ComponentResponse>(
    `/organizations/${organizationId}/a/${applicationId}/e/${environment}/c/${componentId}`,
    data,
  )
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

export function getComponentPods(
  organizationId: string,
  applicationId: string,
  environment: string,
  componentId: string,
): Promise<ComponentPodsResponse> {
  return fetchData<ComponentPodsResponse>(
    `/organizations/${organizationId}/a/${applicationId}/e/${environment}/c/${componentId}/status/pods`,
  )
}
