import { z } from 'zod'

const cartItemSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  price: z.number(),
  quantity: z.number()
})

export const cartUpdateCartSchema = z.object({
  cartItems: z.array(cartItemSchema)
})

export const addItemToCartSchema = z.object({
  title: z.string(),
  price: z.number(),
  quantity: z.number()
})
