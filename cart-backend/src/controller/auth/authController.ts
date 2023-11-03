import { Request, Response } from 'express'
import AuthService from '../../services/authService'
import {
  loginSchema,
  registrationSchema
} from '../../validation/authValidation'

class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    const userData = loginSchema.parse(req.body)
    const user = await this.authService.login(userData)

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }
    return res.status(201).json(user)
  }

  register = async (req: Request, res: Response): Promise<Response> => {
    const userData = registrationSchema.parse(req.body)
    const user = await this.authService.register(userData)

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }
    return res.status(201).json(user)
  }
}

export default AuthController
