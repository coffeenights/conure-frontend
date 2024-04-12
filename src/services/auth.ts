import api, { ApiResponse } from './api'
import { z } from 'zod'

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type UserLoginData = z.infer<typeof UserLoginSchema>

// Regex for one lowercase letter, one uppercase letter, one number
const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/
export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        passwordRegex,
        'Password must contain at least one lowercase letter, one uppercase letter, and one number',
      ),
    password2: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['password2'],
      })
    }
  })

export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>

export type AuthenticatedUserData = {
  token: string
}

export type ChangePasswordResponseData = {
  message: string
  error?: string
}

export type ChangePasswordResponse = ApiResponse<ChangePasswordResponseData>
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

export const changePassword = async ({
  oldPassword,
  password,
  password2,
}: ChangePasswordData): Promise<ChangePasswordResponse> => {
  try {
    const response = await api.patch('/auth/change-password', {
      old_password: oldPassword,
      password,
      password2,
    })
    const data = {
      message: response.data.message,
      error: response.data.error,
    } as ChangePasswordResponseData
    return { data: data, isError: false } as ChangePasswordResponse
  } catch (error) {
    return Promise.reject(error)
  }
}
