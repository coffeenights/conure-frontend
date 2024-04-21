import { Variable } from 'lucide-vue-next'
import { ApiResponse, fetchData, postData } from './api'

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
