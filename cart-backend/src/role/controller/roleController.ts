import { Request, Response } from 'express'
import RoleService from '../service/roleService'
import { createRoleSchema, updateRoleSchema } from '../validation/schema'

class RoleController {
  private roleService: RoleService

  constructor() {
    this.roleService = new RoleService()
  }

  createRole = async (req: Request, res: Response): Promise<Response> => {
    const { userId, roleIds } = createRoleSchema.parse(req.body)
    const result = await this.roleService.createRole(userId, roleIds)

    if (!result) {
      return res.status(400).json({ error: 'Failed to create role' })
    }
    return res.status(200).json({ message: 'Role successfully created' })
  }

  updateRole = async (req: Request, res: Response): Promise<Response> => {
    const { userId, roleIds } = updateRoleSchema.parse(req.body)
    const result = await this.roleService.updateRole(userId, roleIds)

    if (!result) {
      return res.status(400).json({ error: 'Failed to update role' })
    }
    return res.status(200).json({ message: 'Role successfully updated' })
  }

  getRole = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params
    const result = await this.roleService.getRoles(Number(userId))

    if (!result) {
      return res.status(400).json({ error: 'Failed to retrieve role' })
    }
    return res.status(200).json({ message: 'Role successfully updated' })
  }
}

export default RoleController
