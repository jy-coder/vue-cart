import { getMockReq, getMockRes } from '@jest-mock/express'
import { Cart } from '../../cart/models/cartModel'
import CartController from '../../cart/controller/cartController'
import { cartUpdateCartSchema } from '../../validation/cartValidation'

jest.mock('../../database/db.ts', () => {
  const fn = () => {
    return {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      first: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      raw: jest.fn().mockReturnThis(),
      then: jest.fn(function (done) {
        done(null)
      })
    }
  }
  return fn
})

const mockCart: Cart = { id: 1, userId: 123, cartItems: [] }
const cart = new CartController()

jest.mock('../../services/cartService.ts', () => {
  return jest.fn().mockImplementation(() => ({
    getCartByUserId: jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(mockCart))
      .mockImplementationOnce(() => Promise.resolve(null)),

    createCart: jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(1))
      .mockImplementationOnce(() => Promise.resolve(null)),

    updateCart: jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(1))
      .mockImplementationOnce(() => Promise.resolve(null))
  }))
})

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getCart', () => {
  const userId = '1'
  const req = getMockReq({ params: { userId } })
  const { res } = getMockRes()

  test('Cart successfully retrieved', async () => {
    await cart.getCart(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockCart)
  })

  test('Cart not found', async () => {
    await cart.getCart(req, res)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ error: 'Cart not found' })
  })
})

describe('createCart', () => {
  const userId = '1'
  const req = getMockReq({ params: { userId } })
  const { res } = getMockRes()

  test('Cart successfully created', async () => {
    await cart.getCart(req, res)
    await cart.createCart(req, res)
    expect(res.status).toHaveBeenCalledWith(201)
  })

  test('Cart not found', async () => {
    await cart.createCart(req, res)
    expect(res.status).toHaveBeenCalledWith(404)
  })
})

describe('updateCart', () => {
  const cartId = '1'
  const cartUpdateReq = {
    cartItems: [
      {
        name: 'Updated Item 1',
        price: 12.99,
        quantity: 3
      },
      {
        name: 'Updated Item 2',
        price: 9.99,
        quantity: 5
      }
    ]
  }
  const req = getMockReq({ params: { cartId }, body: { ...cartUpdateReq } })
  const { res } = getMockRes()

  test('Cart successfully updated', async () => {
    cartUpdateCartSchema.parse = jest.fn().mockImplementationOnce(() => {
      return cartUpdateReq
    })
    await cart.updateCart(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test('Cart not updated', async () => {
    cartUpdateCartSchema.parse = jest.fn().mockImplementationOnce(() => {
      return cartUpdateReq
    })
    await cart.updateCart(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
  })
})
