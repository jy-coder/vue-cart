import { z } from "zod";

const cartItemSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const cartItemsSchema = z.array(cartItemSchema);

export const cartUpdateCartSchema = z.object({
  cartItems: cartItemsSchema,
});

export const addItemToCartSchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});
