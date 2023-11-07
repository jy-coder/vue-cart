import { Request, Response } from 'express'
import CartService from '../services/cartService'
import { addItemToCartSchema } from '../../validation/cartValidation'

class CartItemController {
  private cartService: CartService

  constructor() {
    this.cartService = new CartService()
  }

  addItemsToCart = async (req: Request, res: Response): Promise<Response> => {
    const { cartId } = req.params
    const { title, price, quantity } = addItemToCartSchema.parse(req.body)

    const itemId = await this.cartService.addItemToCart(
      parseInt(cartId),
      title,
      price,
      quantity
    )
    if (!itemId) {
      return res.status(400)
    }
    return res.status(201).json({ itemId })
  }
}

export default CartItemController
