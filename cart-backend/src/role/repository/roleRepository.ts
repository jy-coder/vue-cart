import db from '../../database/db'

class RoleRepository {
  async update(userId: number, roleIds: number[]): Promise<boolean> {
    await db('user_roles').where({ user_id: userId }).del()

    for (const roleId of roleIds) {
      const result = await db('user_roles').insert({
        user_id: userId,
        role_id: roleId
      })
      if (result.length === 0) {
        return false
      }
    }
    return true
  }

  async create(userId: number, roleIds: number[]): Promise<boolean> {
    for (const roleId of roleIds) {
      const result = await db('user_roles').insert({
        user_id: userId,
        role_id: roleId
      })
      if (result.length === 0) {
        return false
      }
    }
    return true
  }

  async findByUserId(userId: number): Promise<number[]> {
    const roleRows = await db('user_roles')
      .where('user_id', userId)
      .select('role_id')
    const roleIds = roleRows.map((row) => row.role_id)
    return roleIds
  }
}

export default RoleRepository
