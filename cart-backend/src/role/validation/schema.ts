import { z } from 'zod'

export const updateRoleSchema = z.object({
  userId: z.number(),
  roleIds: z.array(z.number())
})

export const createRoleSchema = z.object({
  userId: z.number(),
  roleIds: z.array(z.number())
})
