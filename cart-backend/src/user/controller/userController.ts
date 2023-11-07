import UserService from '../service/userService'
import { Request, Response } from 'express'
import { createUserSchema, emailSchema } from '../validation/schema'

class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  userByEmail = async (req: Request, res: Response): Promise<Response> => {
    const email = emailSchema.parse(req.query.email)
    const user = await this.userService.getUserByEmail(email)

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }
    return res.status(201).json(user)
  }

  userById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const user = await this.userService.getUserById(Number(id))

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }
    return res.status(201).json(user)
  }

  createUser = async (req: Request, res: Response): Promise<Response> => {
    const user = createUserSchema.parse(req.body)
    const { id } = await this.userService.createUser(user)

    if (!id) {
      return res.status(400).json({ error: 'Failed to create user' })
    }
    return res.status(201).json({ userId: id })
  }
}

export default UserController
