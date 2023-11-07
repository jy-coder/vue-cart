import { Request, Response } from 'express'
import CartService from '../services/cartService'
import { cartUpdateCartSchema } from '../../validation/cartValidation'

class CartController {
  private cartService: CartService

  constructor() {
    this.cartService = new CartService()
  }

  getCart = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params
    const cart = await this.cartService.getCartByUserId(parseInt(userId))
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' })
    } else {
      return res.status(200).json(cart)
    }
  }

  createCart = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params
    const cartExists = await this.cartService.getCartByUserId(parseInt(userId))
    if (!cartExists) {
      const cart = await this.cartService.createCart(parseInt(userId))
      if (!cart) {
        return res.status(404).json({ error: 'Failed to create cart' })
      } else {
        return res.status(201).json(cart)
      }
    }
    return res.status(400).json({ error: 'Cart already exists' })
  }

  updateCart = async (req: Request, res: Response): Promise<Response> => {
    const { cartItems } = cartUpdateCartSchema.parse(req.body)
    const { cartId } = req.params
    if (!cartId || !cartItems) {
      return res.status(400).json({ error: 'cartId and cartData required' })
    }
    const cart = await this.cartService.updateCart(parseInt(cartId), cartItems)

    if (!cart) {
      return res.status(400).json({ error: 'Cart not found or update failed' })
    }

    return res.status(200).json({ message: 'Cart updated successfully' })
  }
}

export default CartController
