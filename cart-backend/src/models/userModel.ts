export interface User {
  id: number
  username: string
  email: string
  password?: string
  roleIds: number[]
}

export interface RegisterDto {
  username: string
  email: string
  password: string
  roleIds: number[]
}

export interface LoginDto {
  email: string
  password: string
}
