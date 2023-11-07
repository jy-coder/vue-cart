import RoleRepository from '../repository/roleRepository'

class RoleService {
  private roleRepository: RoleRepository

  constructor() {
    this.roleRepository = new RoleRepository()
  }
  async createRole(id: number, roleIds: number[]): Promise<boolean> {
    return await this.roleRepository.create(id, roleIds)
  }

  async updateRole(id: number, roleIds: number[]): Promise<boolean> {
    return await this.roleRepository.update(id, roleIds)
  }

  async getRoles(userId: number): Promise<number[]> {
    return await this.roleRepository.findByUserId(userId)
  }
}
export default RoleService
