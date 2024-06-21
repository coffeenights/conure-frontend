import { Variable } from 'lucide-vue-next'
import { ApiResponse, deleteData, fetchData, postData } from './api'
import { z } from 'zod'

export const VariableSchema = z.object({
  name: z.string().max(50),
  value: z.string(),
  isEncrypted: z.boolean().default(false),
})

export const ComponentSettingsSchema = z.object({
  name: z.string().max(50),
  description: z.string().max(255).optional(),
  resourcesCpu: z.array(z.number().min(0.1).max(4.0)),
  resourcesMemory: z.array(z.number().min(128).max(4096)),
  resourcesReplicas: z.array(z.number().min(0).max(60)),
  networkPorts: z.array(
    z.object({
      hostPort: z.number().min(0).max(65535),
      targetPort: z.number().min(0).max(65535),
      portProtocol: z.enum(['TCP', 'UDP']),
    }),
  ),
  storage: z.array(
    z.object({
      name: z.string().max(50),
      mountPath: z.string().max(100),
      size: z.number().min(1).max(100),
    })
  )
})

export type Variable = {
  id: string
  name: string
  value: string
  type: string
  organization_id: string
  application_id: string
  environment_id: string
  component_id: string
  is_encrypted: boolean
  created_at: string
  updated_at: string
}

export type VariableCreateRequest = {
  name: string
  value: string
  type: string
  organization_id: string
  application_id: string
  environment_id: string
  component_id: string
  is_encrypted: boolean
}

export type VariableListResponse = ApiResponse<Variable[]>
export type VariableCreateResponse = ApiResponse<Variable>

export const listOrganizationVariables = async (
  organizationId: string,
): Promise<VariableListResponse> => {
  return fetchData<VariableListResponse>(`/variables/${organizationId}`)
}

export const listApplicationVariables = async (
  organizationId: string,
  applicationId: string,
  environment: string,
): Promise<VariableListResponse> => {
  return fetchData<VariableListResponse>(
    `/variables/${organizationId}/${applicationId}/e/${environment}`,
  )
}

export const listComponentVariables = async (
  organizationId: string,
  applicationId: string,
  environment: string,
  componentId: string,
): Promise<VariableListResponse> => {
  return fetchData<VariableListResponse>(
    `/variables/${organizationId}/${applicationId}/e/${environment}/c/${componentId}`,
  )
}

export const createVariable = async (
  data: VariableCreateRequest,
): Promise<VariableCreateResponse> => {
  let url: string = ''
  switch (data.type) {
    case 'organization':
      url = `/variables/${data.organization_id}`
      break
    case 'application':
      url = `/variables/${data.organization_id}/${data.application_id}/e/${data.environment_id}`
      break
    case 'component':
      url = `/variables/${data.organization_id}/${data.application_id}/e/${data.environment_id}/c/${data.component_id}`
  }
  return postData<VariableCreateResponse>(url, data)
}

export const deleteVariable = async (
  organizationId: string,
  id: string,
): Promise<ApiResponse<null>> => {
  return deleteData<ApiResponse<null>>(`/variables/${organizationId}/${id}`)
}
