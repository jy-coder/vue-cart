import { z } from 'zod'

export const emailSchema = z.string().email()

export const createUserSchema = z.object({
  username: z.string().min(6),
  email: emailSchema,
  password: z.string().min(6)
})
