import db from '../../database/db'
import { Cart } from '../models/cartModel'
import { CartItem } from '../models/cartItemModel'

class CartService {
  async createCart(userId: number): Promise<number | null> {
    const [cartId] = await db<Cart>('carts').returning('id').insert({ userId })

    return cartId
  }

  async addItemToCart(
    cartId: number,
    title: string,
    price: number,
    quantity: number
  ): Promise<number> {
    const [itemId] = await db<CartItem>('cart_items').returning('id').insert({
      cartId,
      title,
      price,
      quantity
    })
    return itemId
  }

  async getCartByCartId(cartId: number): Promise<Cart | undefined> {
    const cart = await db<Cart>('carts').where('id', cartId).first()

    return cart
  }

  async getCartItems(cartId: number): Promise<CartItem[]> {
    const items = await db<CartItem>('cart_items').where('cartId', cartId)
    return items
  }

  async getCartByUserId(userId: number): Promise<Cart | null> {
    const cart = await db<Cart>('carts').where({ userId }).first()

    if (!cart) {
      return null
    }

    const cartItems = await db<CartItem>('cart_items').where({
      cartId: cart.id
    })

    cart.cartItems = cartItems

    return cart
  }

  async updateCart(
    cartId: number,
    cartItems: CartItem[]
  ): Promise<Cart | null> {
    const existingCart = await db<Cart>('carts').where({ id: cartId }).first()

    if (!existingCart) {
      return null
    }

    await db<CartItem>('cart_items').where({ cartId }).del()
    await db<CartItem>('cart_items').insert(
      cartItems.map((item) => ({ ...item, cartId }))
    )
    const updatedCart =
      (await db<Cart>('carts').where({ id: cartId }).first()) ?? null
    return updatedCart
  }
}

export default CartService
