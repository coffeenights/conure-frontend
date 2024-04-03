import api, { ApiResponse } from './api'
import { z } from 'zod'

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type UserLoginData = z.infer<typeof UserLoginSchema>

export type AuthenticatedUserData = {
  token: string
}

export type AuthenticatedUserResponse = ApiResponse<AuthenticatedUserData>

export const authenticateUser = async ({
  email,
  password,
}: UserLoginData): Promise<AuthenticatedUserResponse> => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    })
    const token = { token: response.data.token }
    return { data: token, isError: false } as AuthenticatedUserResponse
  } catch (error) {
    return Promise.reject(error)
  }
}
